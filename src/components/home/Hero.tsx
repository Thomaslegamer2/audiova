"use client";

import { Check } from "lucide-react";
import { Oscilloscope } from "@/components/home/Oscilloscope";
import { useFileBridge, useI18n } from "@/components/providers";

export function Hero() {
  const t = useI18n();
  const { openFile } = useFileBridge();

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-14 pb-6 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-24">
      <div>
        <p className="rise font-mono text-xs tracking-[0.18em] text-glow uppercase">{t.hero.slogan}</p>
        <h1 className="rise delay-1 mt-5 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.4rem]">
          <span className="block">{t.hero.titleLead}</span>
          <span className="mt-2 block">
            {t.hero.titleRest}
            {"\u00a0"}
            <span className="gradient-text">{t.hero.titleAccent}</span>
            {t.hero.titleEnd}
          </span>
        </h1>
        <p className="rise delay-2 mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">{t.hero.subtitle}</p>
        <div className="rise delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openFile}
            className="btn-brand inline-flex h-12 items-center justify-center rounded-xl px-5 text-base font-semibold"
          >
            {t.hero.primary}
          </button>
          <a
            href="#fonctionnalites"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-line px-5 text-base font-semibold text-ink transition hover:border-glow/40 hover:bg-white/[0.03]"
          >
            {t.hero.secondary}
          </a>
        </div>
        <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {t.hero.points.map((point) => (
            <li key={point} className="flex items-center gap-2 text-sm text-ink">
              <Check className="size-4 text-ok" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="rise delay-2">
        <Oscilloscope />
      </div>
    </section>
  );
}
