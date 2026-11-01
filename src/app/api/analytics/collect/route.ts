import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import {
  hashVisitor,
  recordAnalyticsEvent,
  type IncomingAnalyticsEvent,
  type AnalyticsEventName,
} from "@/lib/analytics/store";
import { consumeAnalyticsSlot } from "@/lib/analytics/rate-limit";
import { readSiteConfig } from "@/lib/site-config";

const EVENT_NAMES = new Set<AnalyticsEventName>([
  "pageview",
  "session_start",
  "conversion_ok",
  "conversion_fail",
  "url_import_ok",
  "url_import_fail",
]);

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

function siteHost(request: Request): string {
  try {
    return new URL(request.url).hostname;
  } catch {
    return "localhost";
  }
}

export async function POST(request: Request) {
  const config = await readSiteConfig();
  if (!config.analyticsEnabled) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const ip = clientIp(request);
  if (!consumeAnalyticsSlot(ip)) {
    return NextResponse.json({ error: "rate" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const consent =
    typeof body === "object" && body && "consent" in body
      ? String((body as { consent: unknown }).consent ?? "")
      : "";
  if (consent !== "analytics" && consent !== "all") {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const rawEvent =
    typeof body === "object" && body && "event" in body
      ? (body as { event: IncomingAnalyticsEvent }).event
      : null;
  if (!rawEvent || !EVENT_NAMES.has(rawEvent.name)) {
    return NextResponse.json({ error: "invalid-event" }, { status: 400 });
  }

  const visitorCookie = request.headers.get("cookie")?.match(/(?:^|;\s*)audiova_vid=([^;]+)/)?.[1];
  let visitorId = visitorCookie && /^[a-zA-Z0-9_-]{16,64}$/.test(visitorCookie) ? visitorCookie : "";
  const setVisitor = !visitorId;
  if (!visitorId) {
    visitorId = hashVisitor(`${ip}:${randomBytes(8).toString("hex")}:${Date.now()}`);
  }

  const ua = request.headers.get("user-agent") ?? "";
  const country =
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    undefined;

  const isNewSession =
    typeof body === "object" && body && "newSession" in body
      ? Boolean((body as { newSession?: unknown }).newSession)
      : false;

  await recordAnalyticsEvent({
    event: {
      name: rawEvent.name,
      path: typeof rawEvent.path === "string" ? rawEvent.path.slice(0, 200) : undefined,
      referrer: typeof rawEvent.referrer === "string" ? rawEvent.referrer.slice(0, 300) : undefined,
      locale: typeof rawEvent.locale === "string" ? rawEvent.locale.slice(0, 12) : undefined,
      formatIn: typeof rawEvent.formatIn === "string" ? rawEvent.formatIn.slice(0, 20) : undefined,
      formatOut: typeof rawEvent.formatOut === "string" ? rawEvent.formatOut.slice(0, 20) : undefined,
      bytes: typeof rawEvent.bytes === "number" ? rawEvent.bytes : undefined,
      durationMs: typeof rawEvent.durationMs === "number" ? rawEvent.durationMs : undefined,
      errorCode: typeof rawEvent.errorCode === "string" ? rawEvent.errorCode.slice(0, 40) : undefined,
    },
    visitorId: createHash("sha256").update(visitorId).digest("hex").slice(0, 24),
    userAgent: ua,
    country: country && /^[a-zA-Z]{2}$/.test(country) ? country : undefined,
    siteHost: siteHost(request),
    isNewSession,
  });

  const response = NextResponse.json({ ok: true });
  if (setVisitor) {
    response.cookies.set("audiova_vid", visitorId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });
  }
  return response;
}
