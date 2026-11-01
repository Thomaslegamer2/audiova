import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { locales, type Locale, isLocale } from "@/i18n";
import { isSiteTheme, type SiteTheme } from "@/lib/theme-catalog";

export interface SiteConfig {
  theme: SiteTheme;
  updatedAt: string | null;
  adsEnabled: boolean;
  analyticsEnabled: boolean;
  urlImportEnabled: boolean;
  discordEnabled: boolean;
  localesEnabled: Locale[];
}

const CONFIG_DIR = path.join(process.cwd(), "data");
const CONFIG_PATH = path.join(CONFIG_DIR, "site-config.json");
const PUBLIC_THEME_FILE = path.join(process.cwd(), "public", "audiova-theme.json");

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  theme: "default",
  updatedAt: null,
  adsEnabled: false,
  analyticsEnabled: true,
  urlImportEnabled: true,
  discordEnabled: true,
  localesEnabled: [...locales],
};

export function parseSiteConfig(raw: string | null): SiteConfig {
  if (!raw) {
    return { ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] };
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] };
    }
    const record = parsed as Record<string, unknown>;
    const theme = isSiteTheme(record.theme) ? record.theme : "default";
    const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : null;
    const adsEnabled = record.adsEnabled === true;
    const analyticsEnabled = record.analyticsEnabled !== false;
    const urlImportEnabled = record.urlImportEnabled !== false;
    const discordEnabled = record.discordEnabled !== false;
    const localesEnabled = Array.isArray(record.localesEnabled)
      ? record.localesEnabled.filter((item): item is Locale => typeof item === "string" && isLocale(item))
      : [...locales];
    return {
      theme,
      updatedAt,
      adsEnabled,
      analyticsEnabled,
      urlImportEnabled,
      discordEnabled,
      localesEnabled: localesEnabled.length > 0 ? localesEnabled : [...locales],
    };
  } catch {
    return { ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] };
  }
}

export async function readSiteConfig(): Promise<SiteConfig> {
  try {
    const raw = await readFile(CONFIG_PATH, "utf8");
    return parseSiteConfig(raw);
  } catch {
    return { ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] };
  }
}

async function persist(config: SiteConfig): Promise<SiteConfig> {
  const next = { ...config, updatedAt: new Date().toISOString() };
  await mkdir(CONFIG_DIR, { recursive: true });
  await writeFile(CONFIG_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await writeFile(
    PUBLIC_THEME_FILE,
    `${JSON.stringify({
      theme: next.theme,
      updatedAt: next.updatedAt,
      adsEnabled: next.adsEnabled,
      analyticsEnabled: next.analyticsEnabled,
      discordEnabled: next.discordEnabled,
    })}\n`,
    "utf8",
  );
  return next;
}

export async function writeSiteTheme(theme: SiteTheme): Promise<SiteConfig> {
  const current = await readSiteConfig();
  return persist({ ...current, theme });
}

export async function writeSiteConfig(partial: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await readSiteConfig();
  const next: SiteConfig = {
    ...current,
    ...partial,
    theme: partial.theme && isSiteTheme(partial.theme) ? partial.theme : current.theme,
    localesEnabled:
      partial.localesEnabled && partial.localesEnabled.length > 0
        ? partial.localesEnabled
        : current.localesEnabled,
  };
  return persist(next);
}
