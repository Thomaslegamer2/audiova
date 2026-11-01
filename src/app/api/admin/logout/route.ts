import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, assertSameOrigin } from "@/lib/admin/auth";
import { recordSecurityEvent } from "@/lib/admin/security-log";

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  recordSecurityEvent({ type: "logout", ip: clientKey(request) });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "", { ...adminCookieOptions(0), maxAge: 0 });
  return response;
}
