import { describe, expect, it } from "vitest";
import { DEFAULT_SITE_CONFIG, parseSiteConfig } from "@/lib/site-config";
import { liveTools, TOOL_REGISTRY, toolBySlug } from "@/lib/tools/registry";

describe("parseSiteConfig", () => {
  it("returns defaults for empty input", () => {
    const config = parseSiteConfig(null);
    expect(config.theme).toBe("default");
    expect(config.adsEnabled).toBe(false);
    expect(config.analyticsEnabled).toBe(true);
    expect(config.urlImportEnabled).toBe(true);
    expect(config.discordEnabled).toBe(true);
    expect(config.localesEnabled.length).toBeGreaterThan(0);
  });

  it("parses toggles and theme", () => {
    const config = parseSiteConfig(
      JSON.stringify({
        theme: "halloween",
        adsEnabled: true,
        analyticsEnabled: false,
        urlImportEnabled: false,
        discordEnabled: false,
        localesEnabled: ["fr", "en", "xx"],
      }),
    );
    expect(config.theme).toBe("halloween");
    expect(config.adsEnabled).toBe(true);
    expect(config.analyticsEnabled).toBe(false);
    expect(config.urlImportEnabled).toBe(false);
    expect(config.discordEnabled).toBe(false);
    expect(config.localesEnabled).toEqual(["fr", "en"]);
  });

  it("rejects unknown themes", () => {
    const config = parseSiteConfig(JSON.stringify({ theme: "neon-cyber" }));
    expect(config.theme).toBe(DEFAULT_SITE_CONFIG.theme);
  });
});

describe("tool registry", () => {
  it("never marks planned tools as live hrefs outside hub", () => {
    for (const tool of TOOL_REGISTRY) {
      if (tool.status === "planned") {
        expect(tool.href === "/outils" || tool.href.startsWith("/#")).toBe(true);
      }
    }
  });

  it("exposes live tools only via liveTools()", () => {
    expect(liveTools().every((tool) => tool.status === "live")).toBe(true);
    expect(toolBySlug("convertisseur-mp3")?.status).toBe("live");
    expect(toolBySlug("decoupeur-mp3")?.status).toBe("planned");
  });
});
