"use client";

import { useEffect, useState } from "react";
import { writeConsent, type ConsentLevel } from "@/lib/analytics/client";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const seen = window.localStorage.getItem("audiova.consent");
        setVisible(!seen);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  const choose = (level: ConsentLevel) => {
    writeConsent(level);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-panel/95 p-4 backdrop-blur-md sm:p-5">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-ink">Confidentialité</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Audiova utilise des mesures d’audience internes anonymisées (pages vues, conversions) uniquement avec votre accord.
            Les conversions locales restent sur votre appareil. Aucune publicité n’est chargée sans consentement « tout accepter ».
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="h-11 rounded-xl border border-line px-4 text-sm font-medium text-muted hover:text-ink"
            onClick={() => choose("essential")}
          >
            Essentiel uniquement
          </button>
          <button
            type="button"
            className="h-11 rounded-xl border border-line px-4 text-sm font-medium hover:border-violet/50"
            onClick={() => choose("analytics")}
          >
            Accepter les stats
          </button>
          <button type="button" className="btn-brand h-11 rounded-xl px-4 text-sm font-semibold" onClick={() => choose("all")}>
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
