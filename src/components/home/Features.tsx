"use client";

import { AudioLines, MonitorSmartphone, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useI18n } from "@/components/providers";

const icons = [AudioLines, SlidersHorizontal, ShieldCheck, MonitorSmartphone];

export function Features() {
  const t = useI18n();
  const items = t.features.items;

  return (
    <section id="fonctionnalites" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{t.features.title}</h2>
        <p className="mt-4 text-base leading-7 text-muted">{t.features.intro}</p>
      </div>
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-card">
        <div className="grid md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = icons[index] ?? AudioLines;
            return (
              <article
                key={item.title}
                className={[
                  "border-line p-7 transition duration-200 hover:bg-white/[0.025] sm:p-8",
                  index === 0 ? "border-b md:border-r" : "",
                  index === 1 ? "border-b" : "",
                  index === 2 ? "border-b md:border-r md:border-b-0" : "",
                ].join(" ")}
              >
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-panel text-glow">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
