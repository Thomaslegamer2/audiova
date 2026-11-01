import { postHeartbeat, pullConfig, controlAgentEnabled } from "@/lib/control-agent/client";
import { writeSiteConfig } from "@/lib/site-config";

const HEARTBEAT_MS = 60_000;
const CONFIG_MS = 120_000;

let started = false;
let configEtag: string | null = null;

async function tickHeartbeat() {
  const pkgVersion = process.env.npm_package_version ?? "0.1.0";
  await postHeartbeat({
    status: "ok",
    version: pkgVersion,
    uptimeSec: Math.floor(process.uptime()),
    nodeEnv: process.env.NODE_ENV,
  });
}

async function tickConfig() {
  try {
    const result = await pullConfig(configEtag);
    configEtag = result.etag;
    if (result.status !== 200 || !result.config) {
      return;
    }
    const authority = process.env.OW_CONFIG_AUTHORITY?.trim() || "hub";
    if (authority !== "hub") {
      return;
    }
    // Thème ignoré (automatique). Seuls les toggles hub utiles sont repris.
    const flags = result.config as {
      adsEnabled?: unknown;
      analyticsEnabled?: unknown;
      urlImportEnabled?: unknown;
      discordEnabled?: unknown;
    };
    await writeSiteConfig({
      adsEnabled: flags.adsEnabled === true,
      analyticsEnabled: flags.analyticsEnabled !== false,
      urlImportEnabled: flags.urlImportEnabled !== false,
      discordEnabled: flags.discordEnabled !== false,
    });
  } catch {
    // hub unreachable
  }
}

export function startControlAgent() {
  if (started || !controlAgentEnabled() || typeof window !== "undefined") {
    return;
  }
  started = true;

  void tickHeartbeat();
  void tickConfig();

  setInterval(() => {
    void tickHeartbeat();
  }, HEARTBEAT_MS);

  setInterval(() => {
    void tickConfig();
  }, CONFIG_MS);
}
