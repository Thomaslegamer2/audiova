"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n, useLocale } from "@/components/providers";
import { useHistory } from "@/hooks/useHistory";
import { outputFormatFor } from "@/lib/constants";
import { localeTag } from "@/lib/locale-format";
import { getOutputBlob } from "@/lib/output-cache";
import { formatBitrate, formatWhen } from "@/lib/utils";

export function HistoryPanel() {
  const t = useI18n();
  const { locale } = useLocale();
  const { entries, clear } = useHistory();
  const [available, setAvailable] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const next: Record<string, boolean> = {};
      await Promise.all(
        entries.map(async (entry) => {
          next[entry.id] = (await getOutputBlob(entry.id)) != null;
        }),
      );
      if (!cancelled) {
        setAvailable(next);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [entries]);

  const downloadEntry = async (id: string) => {
    const cached = await getOutputBlob(id);
    if (!cached) {
      setAvailable((current) => ({ ...current, [id]: false }));
      return;
    }
    const url = URL.createObjectURL(cached.blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = cached.name;
    anchor.rel = "noopener";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

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
          {entries.map((entry) => {
            const canDownload = available[entry.id] === true;
            return (
              <li key={entry.id} className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">{entry.fileName}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {formatWhen(entry.convertedAt, locale)}
                    {" · "}
                    {outputFormatFor(entry.format).label}
                    {entry.bitrate ? ` · ${formatBitrate(entry.bitrate)}` : ""}
                    {" · "}
                    {entry.sampleRate === "auto" ? t.history.sampleAuto : `${entry.sampleRate.toLocaleString(localeTag(locale))} Hz`}
                  </p>
                  {!canDownload ? (
                    <p className="mt-1 text-xs text-muted">{t.history.expired}</p>
                  ) : null}
                </div>
                {canDownload ? (
                  <button
                    type="button"
                    onClick={() => void downloadEntry(entry.id)}
                    className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-line px-3 text-sm font-medium text-ink hover:border-glow/40"
                  >
                    <Download className="size-4" aria-hidden="true" />
                    {t.history.downloadAgain}
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
