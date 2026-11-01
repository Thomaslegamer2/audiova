"use client";

import { DonateLink } from "@/components/layout/DonateLink";
import { useI18n } from "@/components/providers";

/** Bandeau discret sous le convertisseur : don / version sans pub. */
export function SupportBanner() {
  const t = useI18n();

  return (
    <aside className="mx-auto my-6 w-full max-w-[850px] px-5 sm:px-8 lg:px-0">
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-card/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">{t.footer.donateHint}</p>
          <p className="mt-1 text-xs leading-5 text-muted">{t.footer.description}</p>
        </div>
        <DonateLink variant="banner" className="shrink-0" />
      </div>
    </aside>
  );
}
