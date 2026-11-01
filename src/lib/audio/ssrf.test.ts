import { describe, expect, it } from "vitest";
import { isBlockedIpLiteral } from "@/lib/audio/ssrf";

describe("isBlockedIpLiteral", () => {
  it("bloque les plages privées IPv4", () => {
    expect(isBlockedIpLiteral("127.0.0.1")).toBe(true);
    expect(isBlockedIpLiteral("10.0.0.8")).toBe(true);
    expect(isBlockedIpLiteral("192.168.1.1")).toBe(true);
    expect(isBlockedIpLiteral("172.16.0.1")).toBe(true);
    expect(isBlockedIpLiteral("169.254.1.1")).toBe(true);
  });

  it("autorise une IP publique", () => {
    expect(isBlockedIpLiteral("8.8.8.8")).toBe(false);
    expect(isBlockedIpLiteral("1.1.1.1")).toBe(false);
  });
});
