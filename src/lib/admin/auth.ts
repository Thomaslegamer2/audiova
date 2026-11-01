import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/admin/constants";

export { ADMIN_COOKIE, ADMIN_PATH } from "@/lib/admin/constants";

const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const MIN_PASSWORD_LENGTH = 8;

function readPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() ?? "";
}

function readSessionSecret(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  if (explicit.length >= 32) {
    return explicit;
  }
  const password = readPassword();
  if (password.length >= MIN_PASSWORD_LENGTH) {
    return createHmac("sha256", "audiova-admin-session-v1").update(password).digest("hex");
  }
  return "";
}

export function adminPasswordConfigured(): boolean {
  return readPassword().length >= MIN_PASSWORD_LENGTH && readSessionSecret().length >= 32;
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
    // lax = connexion fiable derrière proxy / nouvel onglet
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  };
}

/** Conservé pour les routes mutantes ; volontairement permissif (cookie SameSite=lax). */
export function assertSameOrigin(_request: Request): boolean {
  return true;
}
