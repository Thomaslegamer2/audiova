import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { locales, type Locale, isLocale } from "@/i18n";
import { resolveAutomaticTheme, type SiteTheme } from "@/lib/theme-catalog";

export interface SiteConfig {
  /** Toujours dérivé du calendrier — jamais choisi manuellement. */
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

function withAutomaticTheme(config: Omit<SiteConfig, "theme"> & { theme?: SiteTheme }): SiteConfig {
  return {
    ...config,
    theme: resolveAutomaticTheme(),
    localesEnabled: config.localesEnabled.length > 0 ? config.localesEnabled : [...locales],
  };
}

export function parseSiteConfig(raw: string | null): SiteConfig {
  if (!raw) {
    return withAutomaticTheme({ ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] });
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return withAutomaticTheme({ ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] });
    }
    const record = parsed as Record<string, unknown>;
    const updatedAt = typeof record.updatedAt === "string" ? record.updatedAt : null;
    const adsEnabled = record.adsEnabled === true;
    const analyticsEnabled = record.analyticsEnabled !== false;
    const urlImportEnabled = record.urlImportEnabled !== false;
    const discordEnabled = record.discordEnabled !== false;
    const localesEnabled = Array.isArray(record.localesEnabled)
      ? record.localesEnabled.filter((item): item is Locale => typeof item === "string" && isLocale(item))
      : [...locales];
    return withAutomaticTheme({
      updatedAt,
      adsEnabled,
      analyticsEnabled,
      urlImportEnabled,
      discordEnabled,
      localesEnabled,
    });
  } catch {
    return withAutomaticTheme({ ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] });
  }
}

export async function readSiteConfig(): Promise<SiteConfig> {
  try {
    const raw = await readFile(CONFIG_PATH, "utf8");
    return parseSiteConfig(raw);
  } catch {
    return withAutomaticTheme({ ...DEFAULT_SITE_CONFIG, localesEnabled: [...locales] });
  }
}

async function persist(config: SiteConfig): Promise<SiteConfig> {
  const next = withAutomaticTheme({
    ...config,
    updatedAt: new Date().toISOString(),
  });
  await mkdir(CONFIG_DIR, { recursive: true });
  // Ne pas persister de thème manuel : le fichier ne conserve que les toggles.
  const stored = {
    updatedAt: next.updatedAt,
    adsEnabled: next.adsEnabled,
    analyticsEnabled: next.analyticsEnabled,
    urlImportEnabled: next.urlImportEnabled,
    discordEnabled: next.discordEnabled,
    localesEnabled: next.localesEnabled,
  };
  await writeFile(CONFIG_PATH, `${JSON.stringify(stored, null, 2)}\n`, "utf8");
  await writeFile(
    PUBLIC_THEME_FILE,
    `${JSON.stringify({
      theme: next.theme,
      mode: "automatic",
      updatedAt: next.updatedAt,
      adsEnabled: next.adsEnabled,
      analyticsEnabled: next.analyticsEnabled,
      discordEnabled: next.discordEnabled,
    })}\n`,
    "utf8",
  );
  return next;
}

/** @deprecated Le thème est calendaire — no-op qui renvoie le thème auto. */
export async function writeSiteTheme(_theme?: SiteTheme): Promise<SiteConfig> {
  const current = await readSiteConfig();
  return persist(current);
}

export async function writeSiteConfig(partial: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await readSiteConfig();
  const next: SiteConfig = {
    ...current,
    ...partial,
    // Ignorer toute tentative de forcer un thème.
    theme: resolveAutomaticTheme(),
    localesEnabled:
      partial.localesEnabled && partial.localesEnabled.length > 0
        ? partial.localesEnabled
        : current.localesEnabled,
  };
  return persist(next);
}
