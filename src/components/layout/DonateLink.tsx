"use client";

import { Coffee } from "lucide-react";
import { useI18n } from "@/components/providers";

const DONATE_URL = process.env.NEXT_PUBLIC_DONATE_URL?.trim() || "https://ko-fi.com/";

export function DonateLink({ className = "" }: { className?: string }) {
  const t = useI18n();

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t.footer.donateHint}
      className={[
        "inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-muted transition hover:border-glow/40 hover:text-ink",
        className,
      ].join(" ")}
    >
      <Coffee className="size-4 text-glow" aria-hidden="true" />
      <span>{t.footer.donate}</span>
    </a>
  );
}
