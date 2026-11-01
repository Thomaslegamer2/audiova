export const SITE_THEMES = [
  "default",
  "newyear",
  "valentine",
  "carnival",
  "stpatrick",
  "easter",
  "spring",
  "summer",
  "bastille",
  "backtoschool",
  "autumn",
  "halloween",
  "christmas",
  "winter",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

export interface ThemeMeta {
  id: SiteTheme;
  label: string;
  description: string;
  accent: string;
  /** Période indicative dans l'année */
  when: string;
}

export const THEME_CATALOG: readonly ThemeMeta[] = [
  {
    id: "default",
    label: "Audiova",
    description: "Magenta et cyan néon, fond nuit.",
    accent: "#c84bff",
    when: "Toute l'année",
  },
  {
    id: "newyear",
    label: "Nouvel An",
    description: "Feux d'artifice, champagne et confettis dorés.",
    accent: "#ffd700",
    when: "Décembre – janvier",
  },
  {
    id: "valentine",
    label: "Saint-Valentin",
    description: "Cœurs flottants, rose et rouge amoureux.",
    accent: "#ff4d6d",
    when: "14 février",
  },
  {
    id: "carnival",
    label: "Carnaval",
    description: "Masques, confettis et couleurs vives.",
    accent: "#ff6b35",
    when: "Février – mars",
  },
  {
    id: "stpatrick",
    label: "Saint-Patrick",
    description: "Trèfles, vert émeraude et pièces d'or.",
    accent: "#22c55e",
    when: "17 mars",
  },
  {
    id: "easter",
    label: "Pâques",
    description: "Œufs, poussins, lapins et pastel printanier.",
    accent: "#f9a8d4",
    when: "Mars – avril",
  },
  {
    id: "spring",
    label: "Printemps",
    description: "Fleurs, pollen et verdure douce.",
    accent: "#86efac",
    when: "Mars – mai",
  },
  {
    id: "summer",
    label: "Été",
    description: "Soleil, vagues, plage et citrons.",
    accent: "#38bdf8",
    when: "Juin – août",
  },
  {
    id: "bastille",
    label: "14 Juillet",
    description: "Bleu-blanc-rouge et feux d'artifice.",
    accent: "#ef4444",
    when: "14 juillet",
  },
  {
    id: "backtoschool",
    label: "Rentrée",
    description: "Crayons, cahiers et feuilles d'automne.",
    accent: "#f59e0b",
    when: "Septembre",
  },
  {
    id: "autumn",
    label: "Automne",
    description: "Feuilles mortes, orange et brun chaud.",
    accent: "#ea580c",
    when: "Septembre – novembre",
  },
  {
    id: "halloween",
    label: "Halloween",
    description: "Citrouilles, fantômes, toiles, chauves-souris.",
    accent: "#ff7a18",
    when: "31 octobre",
  },
  {
    id: "christmas",
    label: "Noël",
    description: "Sapins, cadeaux, guirlande, neige et boules.",
    accent: "#e63946",
    when: "Décembre",
  },
  {
    id: "winter",
    label: "Hiver",
    description: "Neige, froid bleuté et flocons sans Noël.",
    accent: "#7dd3fc",
    when: "Décembre – février",
  },
];

export function isSiteTheme(value: unknown): value is SiteTheme {
  return typeof value === "string" && (SITE_THEMES as readonly string[]).includes(value);
}

export function themeLabel(id: SiteTheme): string {
  return THEME_CATALOG.find((item) => item.id === id)?.label ?? id;
}

/** Date civile Europe/Paris (midi) pour un instant donné. */
export function parisCivilDate(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

/** Algorithme de Meeus/Jones/Butcher — dimanche de Pâques (calendrier grégorien). */
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function dayOffset(base: Date, days: number): Date {
  return new Date(base.getTime() + days * 86_400_000);
}

function inRange(date: Date, start: Date, end: Date): boolean {
  const t = date.getTime();
  return t >= start.getTime() && t <= end.getTime();
}

/**
 * Thème saisonnier automatique (fuseau Europe/Paris).
 * Aucune sélection manuelle : les périodes festives priment sur les saisons.
 */
export function resolveAutomaticTheme(now = new Date()): SiteTheme {
  const date = parisCivilDate(now);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const md = month * 100 + day;

  const easter = easterSunday(year);
  const carnivalStart = dayOffset(easter, -49);
  const carnivalEnd = dayOffset(easter, -46);
  const easterStart = dayOffset(easter, -7);
  const easterEnd = dayOffset(easter, 2);

  if (md >= 1020 && md <= 1102) return "halloween";
  if (md >= 1201 && md <= 1226) return "christmas";
  if (md >= 1227 || md <= 105) return "newyear";
  if (md >= 210 && md <= 216) return "valentine";
  if (md >= 315 && md <= 318) return "stpatrick";
  if (md >= 712 && md <= 716) return "bastille";
  if (md >= 901 && md <= 914) return "backtoschool";
  if (inRange(date, carnivalStart, carnivalEnd)) return "carnival";
  if (inRange(date, easterStart, easterEnd)) return "easter";

  if (md >= 320 && md <= 620) return "spring";
  if (md >= 621 && md <= 831) return "summer";
  if (md >= 915 && md <= 1119) return "autumn";
  return "winter";
}
