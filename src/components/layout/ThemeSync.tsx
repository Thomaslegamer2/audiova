"use client";

import { useLayoutEffect } from "react";
import { isSiteTheme } from "@/lib/theme-catalog";

const STORAGE_KEY = "audiova.site-theme";

function applyTheme(theme: string) {
  if (!isSiteTheme(theme)) {
    return;
  }
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Stockage indisponible.
  }
}

export function ThemeSync() {
  useLayoutEffect(() => {
    let cancelled = false;

    try {
      const cached = window.localStorage.getItem(STORAGE_KEY);
      if (cached && isSiteTheme(cached)) {
        applyTheme(cached);
      }
    } catch {
      // Ignore.
    }

    (async () => {
      try {
        const response = await fetch(`/audiova-theme.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!response.ok || cancelled) {
          return;
        }
        const data: unknown = await response.json();
        if (
          !cancelled &&
          data &&
          typeof data === "object" &&
          "theme" in data &&
          typeof (data as { theme: unknown }).theme === "string"
        ) {
          applyTheme((data as { theme: string }).theme);
        }
      } catch {
        // Le thème par défaut reste en place.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
