"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readConsent } from "@/lib/analytics/client";

const NO_ADS_PATHS = new Set(["/privacy", "/legal", "/terms"]);

/**
 * Emplacement AdSense discret, hors zone de dépôt / bouton de conversion.
 * Désactivé sur les pages légales et confidentialité.
 */
export function AdSlot({ placement }: { placement: "below-converter" | "content" }) {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim();

  useEffect(() => {
    if (NO_ADS_PATHS.has(pathname)) {
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const consent = readConsent();
        if (consent !== "all") {
          return;
        }
        const response = await fetch(`/audiova-theme.json?ts=${Date.now()}`, { cache: "no-store" });
        if (!response.ok || cancelled) {
          return;
        }
        const data: unknown = await response.json();
        if (
          !cancelled &&
          data &&
          typeof data === "object" &&
          "adsEnabled" in data &&
          (data as { adsEnabled?: unknown }).adsEnabled === true
        ) {
          setEnabled(true);
        }
      } catch {
        // Ignore.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (NO_ADS_PATHS.has(pathname) || !enabled) {
    return null;
  }

  return (
    <aside
      data-ad-placement={placement}
      aria-label="Publicité"
      className="relative mx-auto my-8 flex min-h-[90px] w-full max-w-[728px] items-center justify-center rounded-2xl border border-dashed border-line bg-panel/40 px-5 text-sm text-muted sm:px-8"
    >
      {client && slot ? (
        <ins
          className="adsbygoogle block w-full min-h-[90px]"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <span className="text-xs text-muted">Publicité — emplacement discret (compatible AdSense)</span>
      )}
    </aside>
  );
}
