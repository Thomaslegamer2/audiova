"use client";

import { useEffect, useState } from "react";
import { readConsent } from "@/lib/analytics/client";

export function AdSlot({ placement }: { placement: "below-converter" | "content" }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
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
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <aside
      data-ad-placement={placement}
      aria-label="Publicité"
      className="mx-auto my-8 flex min-h-[90px] w-full max-w-[850px] items-center justify-center rounded-2xl border border-dashed border-line bg-panel/40 px-5 text-sm text-muted sm:px-8"
    >
      Emplacement publicitaire ({placement}) — non intrusif, activé via la console admin.
    </aside>
  );
}
