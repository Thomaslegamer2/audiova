"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/providers";
import { cn } from "@/lib/utils";

export function FAQ() {
  const t = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-8 pb-24 sm:px-8">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{t.faq.title}</h2>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {t.faq.items.map((item, index) => {
          const expanded = open === index;
          const panelId = `faq-panel-${index}`;
          return (
            <div key={item.question}>
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={expanded}
                  aria-controls={panelId}
                  onClick={() => setOpen(expanded ? null : index)}
                >
                  <span className="text-base font-medium text-ink">{item.question}</span>
                  <ChevronDown className={cn("size-5 shrink-0 text-muted transition-transform duration-300", expanded && "rotate-180")} aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} className={cn("grid transition-[grid-template-rows] duration-300", expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="space-y-3 pb-5">
                    {item.answer.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-6 text-muted">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
