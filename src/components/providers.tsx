"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { dictionaryFor, isLocale, type Locale } from "@/i18n";
import type { Dictionary } from "@/i18n/fr";

const LOCALE_KEY = "audiova.locale";
const LOCALE_EVENT = "audiova-locale";
const LEGACY_LOCALE_KEYS = ["sonora.locale", "audiolab.locale"] as const;

function detectBrowserLocale(): Locale {
  try {
    const candidates = [navigator.language, ...(navigator.languages ?? [])];
    for (const candidate of candidates) {
      const code = candidate.slice(0, 2).toLowerCase();
      if (isLocale(code)) {
        return code;
      }
    }
  } catch {
    // Ignore.
  }
  return "fr";
}

function readLocale(): Locale {
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    if (saved && isLocale(saved)) {
      return saved;
    }
    for (const key of LEGACY_LOCALE_KEYS) {
      const legacy = window.localStorage.getItem(key);
      if (legacy && isLocale(legacy)) {
        window.localStorage.setItem(LOCALE_KEY, legacy);
        return legacy;
      }
    }
    return detectBrowserLocale();
  } catch {
    return "fr";
  }
}

function subscribeLocale(onChange: () => void) {
  window.addEventListener(LOCALE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LOCALE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

interface I18nValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribeLocale, readLocale, () => "fr" as Locale);

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(LOCALE_KEY, next);
    } catch {
      // Préférence non enregistrée si le stockage est bloqué.
    }
    document.documentElement.lang = next;
    window.dispatchEvent(new Event(LOCALE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({ locale, t: dictionaryFor(locale), setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): Dictionary {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n doit être utilisé dans I18nProvider");
  }
  return context.t;
}

export function useLocale(): I18nValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useLocale doit être utilisé dans I18nProvider");
  }
  return context;
}

interface FileBridgeValue {
  register: (open: () => void) => void;
  openFile: () => void;
}

const FileBridgeContext = createContext<FileBridgeValue | null>(null);

export function FileBridgeProvider({ children }: { children: React.ReactNode }) {
  const openRef = useRef<() => void>(() => {
    document.getElementById("convertisseur")?.scrollIntoView({ behavior: "smooth" });
  });

  const register = useCallback((open: () => void) => {
    openRef.current = open;
  }, []);

  const openFile = useCallback(() => {
    openRef.current();
  }, []);

  const value = useMemo(() => ({ register, openFile }), [register, openFile]);
  return <FileBridgeContext.Provider value={value}>{children}</FileBridgeContext.Provider>;
}

export function useFileBridge(): FileBridgeValue {
  const context = useContext(FileBridgeContext);
  if (!context) {
    throw new Error("useFileBridge doit être utilisé dans FileBridgeProvider");
  }
  return context;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <FileBridgeProvider>{children}</FileBridgeProvider>
    </I18nProvider>
  );
}
