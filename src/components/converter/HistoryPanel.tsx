"use client";

import { useI18n, useLocale } from "@/components/providers";
import { useHistory } from "@/hooks/useHistory";
import { outputFormatFor } from "@/lib/constants";
import { localeTag } from "@/lib/locale-format";
import { formatBitrate, formatWhen } from "@/lib/utils";

export function HistoryPanel() {
  const t = useI18n();
  const { locale } = useLocale();
  const { entries, clear } = useHistory();

  return (
    <section className="mx-auto mt-8 w-full max-w-[850px] px-5 sm:px-0" aria-labelledby="historique-titre">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="historique-titre" className="text-lg font-semibold text-ink">{t.history.title}</h2>
        {entries.length > 0 ? (
          <button type="button" onClick={clear} className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
            {t.history.clear}
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{t.history.intro}</p>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-muted">{t.history.empty}</p>
      ) : (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
          {entries.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="truncate text-sm text-ink">{entry.fileName}</p>
              <p className="font-mono text-xs text-muted">
                {formatWhen(entry.convertedAt, locale)}
                {" · "}
                {outputFormatFor(entry.format).label}
                {entry.bitrate ? ` · ${formatBitrate(entry.bitrate)}` : ""}
                {" · "}
                {entry.sampleRate === "auto" ? t.history.sampleAuto : `${entry.sampleRate.toLocaleString(localeTag(locale))} Hz`}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
