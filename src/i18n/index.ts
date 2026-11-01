import { de } from "@/i18n/de";
import { en } from "@/i18n/en";
import { es } from "@/i18n/es";
import { fr, type Dictionary } from "@/i18n/fr";
import { it } from "@/i18n/it";
import { nl } from "@/i18n/nl";
import { pt } from "@/i18n/pt";

export const locales = ["fr", "en", "es", "de", "it", "pt", "nl"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  pt: "Português",
  nl: "Nederlands",
};

export const dictionaries: Record<Locale, Dictionary> = {
  fr,
  en,
  es,
  de,
  it,
  pt,
  nl,
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dictionaryFor(locale: Locale): Dictionary {
  return dictionaries[locale];
}
