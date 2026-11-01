import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin/constants";

export { ADMIN_COOKIE, ADMIN_PATH } from "@/lib/admin/constants";

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function readPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function readSessionSecret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  if (explicit.length >= 32) {
    return explicit;
  }
  // Dérivation déterministe uniquement si un mot de passe fort est défini —
  // jamais de secret codé en dur dans le dépôt.
  const password = readPassword();
  if (password.length >= 12) {
    return createHmac("sha256", "audiova-admin-session-v1").update(password).digest("hex");
  }
  return "";
}

export function adminPasswordConfigured(): boolean {
  return readPassword().length >= 12 && readSessionSecret().length >= 32;
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = readPassword();
  if (!adminPasswordConfigured() || candidate.length === 0 || candidate.length !== expected.length) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(candidate), Buffer.from(expected));
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", readSessionSecret()).update(payload).digest("base64url");
}

export function createAdminToken(now = Date.now()): string {
  const nonce = randomBytes(16).toString("base64url");
  const payload = `ok.${now}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminToken(token: string | undefined, now = Date.now()): boolean {
  if (!token || !adminPasswordConfigured()) {
    return false;
  }
  const parts = token.split(".");
  // ok.<stamp>.<nonce>.<sig>
  if (parts.length !== 4 || parts[0] !== "ok") {
    return false;
  }
  const stamp = Number(parts[1]);
  if (!Number.isFinite(stamp) || now - stamp > SESSION_TTL_MS || stamp > now + 60_000) {
    return false;
  }
  if (!parts[2] || parts[2].length < 8) {
    return false;
  }
  const payload = `${parts[0]}.${parts[1]}.${parts[2]}`;
  const expected = sign(payload);
  const provided = parts[3] ?? "";
  if (expected.length !== provided.length) {
    return false;
  }
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

export function adminCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin navigations / certains clients n'envoient pas Origin.
    const secFetchSite = request.headers.get("sec-fetch-site");
    if (secFetchSite === "cross-site") {
      return false;
    }
    return true;
  }
  try {
    const requestHost = new URL(request.url).origin;
    return origin === requestHost;
  } catch {
    return false;
  }
}
