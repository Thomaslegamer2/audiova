import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

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
  if (a === 100 && b >= 64 && b <= 127) {
    // CGNAT
    return true;
  }
  return false;
}

function isPrivateIpv6(hostname: string): boolean {
  const value = hostname.toLowerCase().replace(/^\[|\]$/g, "");
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

export function isBlockedIpLiteral(host: string): boolean {
  const normalized = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (isIP(normalized) === 4) {
    return isPrivateIpv4(normalized);
  }
  if (isIP(normalized) === 6) {
    return isPrivateIpv6(normalized);
  }
  return false;
}

/** Résout le nom d'hôte et refuse les IP privées / loopback (anti-SSRF DNS). */
export async function assertPublicHostname(hostname: string): Promise<void> {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  if (!host) {
    throw new Error("host-empty");
  }
  if (isBlockedIpLiteral(host)) {
    throw new Error("host-private");
  }

  try {
    const records = await lookup(host, { all: true, verbatim: true });
    if (records.length === 0) {
      throw new Error("host-unresolved");
    }
    for (const record of records) {
      if (isBlockedIpLiteral(record.address)) {
        throw new Error("host-private");
      }
    }
  } catch (error) {
    if (error instanceof Error && (error.message === "host-private" || error.message === "host-unresolved")) {
      throw error;
    }
    throw new Error("host-unresolved");
  }
}
