import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  ACCEPTED_EXTENSIONS,
  BITRATES,
  CONVERSION_TIMEOUT_MS,
  COPYRIGHT_YEAR,
  INPUT_FORMATS,
  MAX_FILE_BYTES,
  MAX_FILES,
  MAX_HISTORY,
  OUTPUT_FORMATS,
} from "@/lib/constants";
import { getMetricsSnapshot } from "@/lib/admin/metrics";
import { getSecurityEvents } from "@/lib/admin/security-log";
import { contactEmail, getSiteUrl } from "@/lib/site";
import { THEME_CATALOG, type SiteTheme } from "@/lib/theme-catalog";
import { readSiteConfig } from "@/lib/site-config";
import { buildAnalyticsReport } from "@/lib/analytics/store";
import {
  URL_IMPORT_RATE_LIMIT,
  URL_IMPORT_RATE_WINDOW_MS,
  URL_IMPORT_TIMEOUT_MS,
} from "@/lib/audio/url-import";

async function readPackageVersion(): Promise<string> {
  try {
    const raw = await readFile(path.join(process.cwd(), "package.json"), "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return parsed.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function formatBytes(value: number): string {
  if (value < 1024) {
    return `${value} o`;
  }
  if (value < 1024 * 1024) {
    return `${(value / 1024).toFixed(1)} Ko`;
  }
  return `${(value / (1024 * 1024)).toFixed(1)} Mo`;
}

export async function buildAdminStats() {
  const memory = process.memoryUsage();
  const config = await readSiteConfig();
  const metrics = getMetricsSnapshot();
  const version = await readPackageVersion();
  const todayAnalytics = await buildAnalyticsReport("today");

  return {
    generatedAt: new Date().toISOString(),
    site: {
      name: "Audiova",
      version,
      url: getSiteUrl(),
      copyrightYear: COPYRIGHT_YEAR,
      adsEnabled: config.adsEnabled,
      analyticsEnabled: config.analyticsEnabled,
      urlImportEnabled: config.urlImportEnabled,
      contactEmail: contactEmail(),
      nodeEnv: process.env.NODE_ENV ?? "development",
      adminPath: "/av-ctl",
    },
    theme: {
      current: config.theme as SiteTheme,
      updatedAt: config.updatedAt,
      catalog: THEME_CATALOG,
    },
    today: todayAnalytics.totals,
    runtime: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      uptimeSeconds: Math.floor(process.uptime()),
      cwd: process.cwd(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      memory: {
        rss: memory.rss,
        heapUsed: memory.heapUsed,
        heapTotal: memory.heapTotal,
        external: memory.external,
        rssLabel: formatBytes(memory.rss),
        heapUsedLabel: formatBytes(memory.heapUsed),
        heapTotalLabel: formatBytes(memory.heapTotal),
      },
    },
    limits: {
      maxFileBytes: MAX_FILE_BYTES,
      maxFileLabel: formatBytes(MAX_FILE_BYTES),
      maxFiles: MAX_FILES,
      maxHistory: MAX_HISTORY,
      conversionTimeoutMs: CONVERSION_TIMEOUT_MS,
      bitrates: [...BITRATES],
      acceptedExtensions: ACCEPTED_EXTENSIONS,
      inputFormats: INPUT_FORMATS.length,
      outputFormats: OUTPUT_FORMATS.map((format) => format.id),
      urlImport: {
        rateLimit: URL_IMPORT_RATE_LIMIT,
        rateWindowMs: URL_IMPORT_RATE_WINDOW_MS,
        timeoutMs: URL_IMPORT_TIMEOUT_MS,
      },
    },
    metrics,
    security: {
      recentEvents: getSecurityEvents().slice(0, 40),
    },
  };
}

export type AdminStats = Awaited<ReturnType<typeof buildAdminStats>>;
