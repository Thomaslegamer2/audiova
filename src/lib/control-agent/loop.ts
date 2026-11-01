import { postHeartbeat, pullConfig, controlAgentEnabled } from "@/lib/control-agent/client";
import { writeSiteTheme } from "@/lib/site-config";
import { isSiteTheme } from "@/lib/theme-catalog";

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
    const themeId = result.config.theme.activeId;
    if (isSiteTheme(themeId)) {
      await writeSiteTheme(themeId);
    }
  } catch {
    // hub unreachable — keep last local theme
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
