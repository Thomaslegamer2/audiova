import { MAX_FILE_BYTES } from "@/lib/constants";
import type { ErrorCode } from "@/types/audio";

export const URL_IMPORT_TIMEOUT_MS = 3 * 60 * 1000;
export const URL_IMPORT_RATE_LIMIT = 5;
export const URL_IMPORT_RATE_WINDOW_MS = 60_000;

export type UrlImportErrorCode = Extract<
  ErrorCode,
  "url-invalid" | "url-blocked" | "url-fetch" |   "url-unavailable" | "url-busy" | "url-rate" | "too-large" | "empty" | "unsupported" | "too-many"
>;

const PRIVATE_HOSTS = new Set(["localhost", "localhost.", "metadata.google.internal"]);

function isPrivateIpv4(hostname: string): boolean {
  const parts = hostname.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }
  const [a, b] = parts as [number, number, number, number];
  if (a === 10 || a === 127 || a === 0) {
    return true;
  }
  if (a === 169 && b === 254) {
    return true;
  }
  if (a === 172 && b >= 16 && b <= 31) {
    return true;
  }
  if (a === 192 && b === 168) {
    return true;
  }
  return false;
}

function isPrivateIpv6(hostname: string): boolean {
  const value = hostname.toLowerCase();
  return (
    value === "::1" ||
    value === "::" ||
    value.startsWith("fc") ||
    value.startsWith("fd") ||
    value.startsWith("fe80") ||
    value.startsWith("::ffff:127.") ||
    value.startsWith("::ffff:10.") ||
    value.startsWith("::ffff:192.168.") ||
    /^::ffff:172\.(1[6-9]|2\d|3[0-1])\./.test(value)
  );
}

export function parseImportUrl(raw: string): { ok: true; url: URL } | { ok: false; code: UrlImportErrorCode } {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 2048) {
    return { ok: false, code: "url-invalid" };
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return { ok: false, code: "url-invalid" };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, code: "url-invalid" };
  }
  if (url.username || url.password) {
    return { ok: false, code: "url-blocked" };
  }

  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!host || PRIVATE_HOSTS.has(host) || host.endsWith(".localhost") || host.endsWith(".local")) {
    return { ok: false, code: "url-blocked" };
  }
  if (isPrivateIpv4(host) || isPrivateIpv6(host)) {
    return { ok: false, code: "url-blocked" };
  }

  return { ok: true, url };
}

export function sanitizeDownloadBaseName(title: string | undefined, fallback = "audio"): string {
  const segment = (title ?? fallback).split(/[/\\]/).pop() ?? fallback;
  const cleaned = segment
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[\\/:*?"<>|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  return cleaned || fallback;
}

export function classifyYtDlpFailure(message: string): UrlImportErrorCode {
  const text = message.toLowerCase();
  if (/file is larger than max-filesize|max.?filesize|too large/.test(text)) {
    return "too-large";
  }
  if (/unsupported url|no suitable|unable to download webpage|is not a valid url/.test(text)) {
    return "url-unavailable";
  }
  if (/private video|sign in|login required|confirm your age|members.?only|http error 40[13]/.test(text)) {
    return "url-unavailable";
  }
  if (/timed? ?out|timeout/.test(text)) {
    return "url-fetch";
  }
  return "url-fetch";
}

export function assertWithinSize(bytes: number): UrlImportErrorCode | null {
  if (bytes <= 0) {
    return "empty";
  }
  if (bytes > MAX_FILE_BYTES) {
    return "too-large";
  }
  return null;
}
