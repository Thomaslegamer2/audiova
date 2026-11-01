"use client";

import { useI18n } from "@/components/providers";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/constants";

export function Formats() {
  const t = useI18n();
  const audio = INPUT_FORMATS.filter((format) => !format.video);
  const video = INPUT_FORMATS.filter((format) => format.video);

  return (
    <section id="formats" className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">{t.formats.title}</h2>
        <p className="mt-4 text-base leading-7 text-muted">{t.formats.intro}</p>
      </div>

      <div className="mt-10">
        <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.formats.output}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {OUTPUT_FORMATS.map((format) => (
            <article key={format.id} className="rounded-2xl border border-line bg-card p-5">
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="text-lg font-semibold text-ink">{format.label}</h4>
                <span className="font-mono text-[11px] tracking-wide text-glow uppercase">
                  {format.bitrate ? t.formats.bitrateYes : t.formats.bitrateNo}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{format.detail}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.formats.input}</h3>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {audio.map((format) => (
            <li key={format.id} className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3">
              <span className="font-medium text-ink">{format.label}</span>
              <span className="text-right text-sm text-muted">{format.detail}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.formats.video}</h3>
        <p className="mt-2 text-sm text-muted">{t.formats.videoNote}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {video.map((format) => (
            <li key={format.id} className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3">
              <span className="font-medium text-ink">{format.label}</span>
              <span className="text-right text-sm text-muted">{format.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
