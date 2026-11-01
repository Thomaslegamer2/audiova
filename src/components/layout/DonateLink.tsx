"use client";

import { Coffee } from "lucide-react";
import { useI18n } from "@/components/providers";

const DONATE_URL = process.env.NEXT_PUBLIC_DONATE_URL?.trim() || "https://ko-fi.com/";

export function DonateLink({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "nav" | "banner";
}) {
  const t = useI18n();

  const styles =
    variant === "nav"
      ? "inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-card px-3 text-sm font-medium text-ink transition hover:border-glow/40"
      : variant === "banner"
        ? "btn-brand inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold"
        : "inline-flex items-center gap-2 rounded-xl border border-glow/30 bg-glow/5 px-4 py-2.5 text-sm font-medium text-ink transition hover:border-glow/50 hover:bg-glow/10";

  return (
    <a
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      title={t.footer.donateHint}
      aria-label={t.footer.donate}
      className={[styles, className].filter(Boolean).join(" ")}
    >
      <Coffee className="size-4 shrink-0 text-glow" aria-hidden="true" />
      <span>{t.footer.donate}</span>
    </a>
  );
}
