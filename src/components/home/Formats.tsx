"use client";

import Link from "next/link";
import { useI18n } from "@/components/providers";
import { INPUT_FORMATS, OUTPUT_FORMATS } from "@/lib/constants";

const INPUT_LINKS: Record<string, string> = {
  wav: "/outils/wav-vers-mp3",
  flac: "/outils/flac-vers-mp3",
  m4a: "/outils/m4a-vers-mp3",
  ogg: "/outils/ogg-vers-mp3",
  aac: "/outils/aac-vers-mp3",
  aiff: "/outils/aiff-vers-mp3",
  wma: "/outils/wma-vers-mp3",
  opus: "/outils/opus-vers-mp3",
  mp4: "/outils/mp4-vers-mp3",
  mov: "/outils/mov-vers-mp3",
  webm: "/outils/webm-vers-mp3",
  mkv: "/outils/mkv-vers-mp3",
};

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
          {audio.map((format) => {
            const href = INPUT_LINKS[format.id];
            return (
              <li key={format.id}>
                {href ? (
                  <Link
                    href={href}
                    className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3 transition hover:border-violet/40"
                  >
                    <span className="font-medium text-ink">{format.label} → MP3</span>
                    <span className="text-right text-sm text-muted">{format.detail}</span>
                  </Link>
                ) : (
                  <div className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3">
                    <span className="font-medium text-ink">{format.label}</span>
                    <span className="text-right text-sm text-muted">{format.detail}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <h3 className="mt-8 font-mono text-xs tracking-[0.16em] text-muted uppercase">{t.formats.video}</h3>
        <p className="mt-2 text-sm text-muted">{t.formats.videoNote}</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {video.map((format) => {
            const href = INPUT_LINKS[format.id];
            return (
              <li key={format.id}>
                {href ? (
                  <Link
                    href={href}
                    className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3 transition hover:border-violet/40"
                  >
                    <span className="font-medium text-ink">{format.label} → MP3</span>
                    <span className="text-right text-sm text-muted">{format.detail}</span>
                  </Link>
                ) : (
                  <div className="flex items-baseline justify-between gap-4 rounded-xl border border-line bg-panel/60 px-4 py-3">
                    <span className="font-medium text-ink">{format.label}</span>
                    <span className="text-right text-sm text-muted">{format.detail}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
