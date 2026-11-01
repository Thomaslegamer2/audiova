"use client";

import { useLayoutEffect } from "react";
import { resolveAutomaticTheme } from "@/lib/theme-catalog";

/**
 * Applique le thème saisonnier automatique (calendrier Europe/Paris).
 * Aucune sélection manuelle, aucun override admin / localStorage.
 */
export function ThemeSync() {
  useLayoutEffect(() => {
    try {
      window.localStorage.removeItem("audiova.site-theme");
    } catch {
      // Ignore.
    }

    const apply = () => {
      document.documentElement.dataset.theme = resolveAutomaticTheme();
    };
    apply();

    const midnightParis = () => {
      const now = Date.now();
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).formatToParts(new Date(now));
      const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
      const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
      const second = Number(parts.find((part) => part.type === "second")?.value ?? 0);
      const msUntilNextDay = ((24 - hour) * 3600 - minute * 60 - second) * 1000;
      return Math.max(60_000, msUntilNextDay + 1_000);
    };

    let timer = window.setTimeout(function tick() {
      apply();
      timer = window.setTimeout(tick, midnightParis());
    }, midnightParis());

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
