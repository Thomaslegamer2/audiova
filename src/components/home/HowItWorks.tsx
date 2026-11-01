"use client";

import { useI18n } from "@/components/providers";

export function HowItWorks() {
  const t = useI18n();

  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{t.how.title}</h2>
      <ol className="relative mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
        <div className="absolute top-5 right-[16%] left-[16%] hidden h-px bg-line md:block" aria-hidden="true" />
        {t.how.steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span className="relative z-10 grid size-10 place-items-center rounded-full border border-line bg-card font-mono text-sm text-glow">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
