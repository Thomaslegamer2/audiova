import type { Locale } from "@/i18n";

const LOCALE_TAGS: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
  es: "es-ES",
  de: "de-DE",
  it: "it-IT",
  pt: "pt-PT",
  nl: "nl-NL",
};

export function localeTag(locale: string): string {
  if (locale in LOCALE_TAGS) {
    return LOCALE_TAGS[locale as Locale];
  }
  return "fr-FR";
}
