import { THEME_CATALOG, type SiteTheme } from "@/lib/theme-catalog";

export {
  SITE_THEMES,
  THEME_CATALOG,
  isSiteTheme,
  themeLabel,
  type SiteTheme,
  type ThemeMeta,
} from "@/lib/theme-catalog";

export {
  DEFAULT_SITE_CONFIG as DEFAULT_CONFIG,
  parseSiteConfig,
  readSiteConfig,
  writeSiteTheme,
  writeSiteConfig,
  type SiteConfig,
} from "@/lib/site-config";

export const THEME_STORAGE_KEY = "audiova.site-theme";
export const PUBLIC_THEME_PATH = "/audiova-theme.json";

export function themeAccent(id: SiteTheme): string {
  return THEME_CATALOG.find((item) => item.id === id)?.accent ?? "#c84bff";
}
