import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminCookieOptions,
  adminPasswordConfigured,
  createAdminToken,
  verifyAdminPassword,
} from "@/lib/admin/auth";
import {
  adminLoginRetryAfterSeconds,
  clearAdminLoginFailures,
  isAdminLoginLocked,
  recordAdminLoginFailure,
} from "@/lib/admin/login-rate-limit";
import { recordSecurityEvent } from "@/lib/admin/security-log";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

export async function POST(request: Request) {
  if (!adminPasswordConfigured()) {
    return NextResponse.json(
      {
        error: "admin-unconfigured",
        message: "Définissez ADMIN_PASSWORD (au moins 8 caractères) dans les variables d’environnement.",
      },
      { status: 503 },
    );
  }

  const ip = clientKey(request);
  if (isAdminLoginLocked(ip)) {
    const retryAfter = adminLoginRetryAfterSeconds(ip);
    recordSecurityEvent({ type: "login-locked", ip });
    return NextResponse.json(
      { error: "locked", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const password =
    typeof body === "object" && body && "password" in body
      ? String((body as { password: unknown }).password ?? "")
      : "";

  if (!verifyAdminPassword(password)) {
    recordAdminLoginFailure(ip);
    recordSecurityEvent({ type: "login-failure", ip });
    const locked = isAdminLoginLocked(ip);
    if (locked) {
      const retryAfter = adminLoginRetryAfterSeconds(ip);
      return NextResponse.json(
        { error: "locked", retryAfter },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      );
    }
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  clearAdminLoginFailures(ip);
  recordSecurityEvent({ type: "login-success", ip });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), adminCookieOptions(8 * 60 * 60));
  return response;
}
