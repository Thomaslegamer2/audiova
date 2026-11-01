"use client";

import { AudioWaveform, CircleAlert, Download, FileAudio, FileVideo, Link2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AudioPlayer } from "@/components/converter/AudioPlayer";
import { HistoryPanel } from "@/components/converter/HistoryPanel";
import { useFileBridge, useI18n } from "@/components/providers";
import { useConversionQueue } from "@/hooks/useConversionQueue";
import {
  ACCEPTED_EXTENSIONS,
  BITRATES,
  MAX_FILE_BYTES,
  MAX_FILES,
  OUTPUT_FORMATS,
  SAMPLE_RATES,
  audioInputSummary,
  outputFormatFor,
  videoInputSummary,
} from "@/lib/constants";
import { collectDroppedFiles } from "@/lib/audio/collect-files";
import { isVideoExtension, displayName } from "@/lib/audio/validation";
import type { Bitrate, ConversionJob, ConversionOutput, ErrorCode, OutputFormatId } from "@/types/audio";
import { fill, formatBitrate, formatBytes, formatDuration, formatHertz } from "@/lib/utils";

const BLOCKED = new Set<ErrorCode>(["unsupported", "empty", "too-large", "url-invalid", "url-blocked"]);

const URL_ERROR_CODES = new Set<ErrorCode>([
  "url-invalid",
  "url-blocked",
  "url-fetch",
  "url-unavailable",
  "url-busy",
  "url-rate",
  "too-large",
  "empty",
  "unsupported",
  "too-many",
  "failed",
]);

function isErrorCode(value: unknown): value is ErrorCode {
  return typeof value === "string" && value in {
    unsupported: 1,
    damaged: 1,
    memory: 1,
    failed: 1,
    "too-large": 1,
    empty: 1,
    "no-audio": 1,
    engine: 1,
    "too-many": 1,
    timeout: 1,
    "url-invalid": 1,
    "url-blocked": 1,
    "url-fetch": 1,
    "url-unavailable": 1,
    "url-busy": 1,
    "url-rate": 1,
  };
}

function downloadOutput(output: ConversionOutput) {
  const url = URL.createObjectURL(output.blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = output.name;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

function facts(job: ConversionJob): string {
  const parts = [formatBytes(job.file.size)];
  const duration = formatDuration(job.metadata.duration);
  if (duration) {
    parts.push(duration);
  }
  if (job.metadata.sampleRate) {
    parts.push(formatHertz(job.metadata.sampleRate));
  }
  if (job.metadata.bitrate) {
    parts.push(formatBitrate(job.metadata.bitrate));
  }
  return parts.join(" · ");
}

export function Converter() {
  const t = useI18n();
  const { register } = useFileBridge();
  const queue = useConversionQueue();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<{ id: string; target: "source" | "output" } | null>(null);
  const [sourceMode, setSourceMode] = useState<"file" | "url">("file");
  const [urlValue, setUrlValue] = useState("");
  const [urlBusy, setUrlBusy] = useState(false);
  const [urlPhase, setUrlPhase] = useState<"idle" | "fetch">("idle");
  const [urlError, setUrlError] = useState<ErrorCode | null>(null);
  const [urlRightsOk, setUrlRightsOk] = useState(false);
  const dragDepth = useRef(0);

  useEffect(() => {
    register(() => {
      document.getElementById("convertisseur")?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.click();
    });
  }, [register]);

  useEffect(() => {
    const prevent = (event: DragEvent) => {
      if (event.dataTransfer?.types.includes("Files")) {
        event.preventDefault();
      }
    };
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  const workable = queue.jobs.filter((job) => !(job.status === "error" && job.errorCode && BLOCKED.has(job.errorCode)));
  const format = outputFormatFor(queue.settings.format);
  const identity = workable.some((job) => job.metadata.title || job.metadata.artist);
  const doneJobs = queue.jobs.filter((job) => job.status === "done" && job.output);
  const convertLabel = queue.busy
    ? t.converter.converting
    : queue.convertibleCount > 1
      ? fill(t.converter.convertMany, { count: queue.convertibleCount, format: format.label })
      : fill(t.converter.convertOne, { format: format.label });

  const engineText = (() => {
    if (queue.phase !== "loading-engine" || !queue.engineLoad) {
      return null;
    }
    if (queue.engineLoad.stage === "compile") {
      return t.converter.engineCompile;
    }
    if (queue.engineLoad.progress == null) {
      return t.converter.engineDownloadUnknown;
    }
    return fill(t.converter.engineDownload, { percent: Math.round(queue.engineLoad.progress * 100) });
  })();

  const live = engineText
    ?? queue.jobs.find((job) => job.status === "converting" || job.status === "finalizing")?.status
    ?? (doneJobs.length > 0 ? t.status.done : "");

  const takeFiles = (list: FileList | File[]) => {
    void queue.addFiles(Array.from(list));
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const takeDrop = async (dataTransfer: DataTransfer) => {
    const room = Math.max(0, MAX_FILES - queue.jobs.length);
    if (room <= 0) {
      return;
    }
    const files = await collectDroppedFiles(dataTransfer, room);
    if (files.length > 0) {
      takeFiles(files);
    }
  };

  const formatEta = (seconds: number | null) => {
    if (seconds == null) {
      return null;
    }
    if (seconds < 60) {
      return fill(t.converter.etaSeconds, { seconds });
    }
    const minutes = Math.max(1, Math.round(seconds / 60));
    return fill(t.converter.etaMinutes, { minutes });
  };

  const importFromUrl = async () => {
    if (urlBusy || queue.busy) {
      return;
    }
    if (!urlRightsOk) {
      setUrlError("url-blocked");
      return;
    }
    const trimmed = urlValue.trim();
    if (!trimmed) {
      setUrlError("url-invalid");
      return;
    }
    setUrlBusy(true);
    setUrlError(null);
    setUrlPhase("fetch");
    try {
      const response = await fetch("/api/import-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!response.ok) {
        let code: ErrorCode = "url-fetch";
        try {
          const payload: unknown = await response.json();
          if (payload && typeof payload === "object" && "error" in payload && isErrorCode((payload as { error: unknown }).error)) {
            code = (payload as { error: ErrorCode }).error;
          }
        } catch {
          // Réponse non JSON.
        }
        setUrlError(URL_ERROR_CODES.has(code) ? code : "url-fetch");
        return;
      }
      const blob = await response.blob();
      const encodedName = response.headers.get("X-Audiova-Filename") ?? response.headers.get("X-Sonora-Filename");
      const fileName = encodedName ? decodeURIComponent(encodedName) : "audio.bin";
      const file = new File([blob], fileName, { type: blob.type || "application/octet-stream" });
      setUrlValue("");
      setSourceMode("file");
      setPreview(null);
      queue.clearJobs();
      await queue.addFiles([file]);
      // Pas de conversion ni téléchargement auto : l’utilisateur choisit la qualité puis lance.
    } catch {
      setUrlError("url-fetch");
    } finally {
      setUrlBusy(false);
      setUrlPhase("idle");
    }
  };

  return (
    <section id="convertisseur" className="mx-auto w-full max-w-[850px] px-5 py-10 sm:px-8 lg:px-0" aria-busy={queue.busy}>
      <h2 className="sr-only">{t.converter.title}</h2>
      <div className="card-glow rise overflow-hidden rounded-2xl border border-line bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-2 rounded-full bg-line" />
            <span className={queue.busy ? "size-2 rounded-full bg-signal" : "size-2 rounded-full bg-line"} />
            <span className={doneJobs.length > 0 ? "size-2 rounded-full bg-ok" : "size-2 rounded-full bg-line"} />
          </div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Audiova · Studio</p>
        </div>

        <div className="sr-only" aria-live="polite">
          {live ? t.status[live as keyof typeof t.status] ?? live : urlBusy ? t.converter.urlLoading : ""}
        </div>

        {queue.notice ? (
          <p role="alert" className="mx-5 mt-5 flex items-start gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t.errors[queue.notice]}
          </p>
        ) : null}

        <div role="tablist" aria-label={t.converter.title} className="mx-4 mt-4 grid grid-cols-2 gap-1 rounded-xl border border-line bg-panel/60 p-1 sm:mx-5">
          <button
            type="button"
            role="tab"
            aria-selected={sourceMode === "file"}
            className={[
              "inline-flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
              sourceMode === "file" ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink",
            ].join(" ")}
            onClick={() => setSourceMode("file")}
          >
            <Upload className="size-4" aria-hidden="true" />
            {t.converter.sourceFile}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sourceMode === "url"}
            className={[
              "inline-flex h-10 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition",
              sourceMode === "url" ? "bg-card text-ink shadow-sm" : "text-muted hover:text-ink",
            ].join(" ")}
            onClick={() => setSourceMode("url")}
          >
            <Link2 className="size-4" aria-hidden="true" />
            {t.converter.sourceUrl}
          </button>
        </div>

        {sourceMode === "url" ? (
          <form
            className="m-4 rounded-2xl border border-line bg-panel/40 px-5 py-6 sm:m-5"
            onSubmit={(event) => {
              event.preventDefault();
              void importFromUrl();
            }}
          >
            <p className="text-xl font-semibold tracking-tight text-ink">{t.converter.urlTitle}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{t.converter.urlText}</p>
            <p
              role="note"
              className="mt-3 max-w-xl rounded-xl border border-line bg-panel/70 px-3 py-2 text-xs leading-5 text-muted"
            >
              {t.converter.urlServerNote}
            </p>
            <div className="mt-5">
              <QualityControls
                disabled={urlBusy || queue.busy}
                format={queue.settings.format}
                bitrate={queue.settings.bitrate}
                onFormat={(format) => queue.updateSettings({ format })}
                onBitrate={(bitrate) => queue.updateSettings({ bitrate })}
                onPreset={(format, bitrate) => queue.updateSettings({ format, bitrate })}
                t={t}
                compact
              />
            </div>
            <label className="mt-5 block">
              <span className="sr-only">{t.converter.urlPlaceholder}</span>
              <input
                type="url"
                inputMode="url"
                autoComplete="off"
                spellCheck={false}
                value={urlValue}
                disabled={urlBusy || queue.busy || queue.jobs.length >= MAX_FILES}
                onChange={(event) => {
                  setUrlValue(event.target.value);
                  if (urlError) {
                    setUrlError(null);
                  }
                }}
                placeholder={t.converter.urlPlaceholder}
                className="h-12 w-full rounded-xl border border-line bg-card px-4 text-base text-ink placeholder:text-muted/70"
              />
            </label>
            <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-5 text-ink">
              <input
                type="checkbox"
                className="mt-1 size-4 shrink-0 rounded border-line accent-[var(--violet)]"
                checked={urlRightsOk}
                disabled={urlBusy || queue.busy}
                onChange={(event) => {
                  setUrlRightsOk(event.target.checked);
                  if (urlError === "url-blocked") {
                    setUrlError(null);
                  }
                }}
              />
              <span>{t.converter.urlRightsConfirm}</span>
            </label>
            <button
              type="submit"
              disabled={
                urlBusy ||
                queue.busy ||
                queue.jobs.length >= MAX_FILES ||
                !urlValue.trim() ||
                !urlRightsOk
              }
              className="btn-brand mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold sm:w-auto"
            >
              <Link2 className="size-4" aria-hidden="true" />
              {urlBusy ? t.converter.urlLoading : t.converter.urlSubmit}
            </button>
            {urlBusy ? (
              <div
                className="indeterminate mt-4 h-1.5 rounded-full"
                role="progressbar"
                aria-label={t.converter.urlLoading}
              />
            ) : null}
            {urlError ? (
              <p role="alert" className="mt-4 flex items-start gap-2 text-sm text-danger">
                <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {t.errors[urlError]}
              </p>
            ) : null}
            <p className="mt-4 text-xs leading-5 text-muted">{t.converter.urlLegal}</p>
          </form>
        ) : null}

        {sourceMode === "file" && queue.jobs.length === 0 ? (
          <div
            className={[
              "m-4 rounded-2xl border border-dashed px-6 py-14 text-center transition sm:m-5 sm:py-16",
              dragOver ? "border-signal bg-signal/5" : "border-line bg-panel/40",
            ].join(" ")}
            onDragEnter={(event) => {
              event.preventDefault();
              dragDepth.current += 1;
              setDragOver(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => {
              dragDepth.current = Math.max(0, dragDepth.current - 1);
              if (dragDepth.current === 0) {
                setDragOver(false);
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              dragDepth.current = 0;
              setDragOver(false);
              void takeDrop(event.dataTransfer);
            }}
          >
            <span className="relative mx-auto grid size-16 place-items-center">
              <span className="absolute inset-0 rounded-full bg-violet/15 blur-xl" aria-hidden="true" />
              <span className="relative grid size-16 place-items-center rounded-2xl border border-line bg-card text-glow">
                <AudioWaveform className="size-7" aria-hidden="true" />
              </span>
            </span>
            <p className="mt-6 text-xl font-semibold tracking-tight text-ink">{t.converter.dropTitle}</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{t.converter.dropText}</p>
            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-muted">{t.converter.dropFolders}</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="btn-brand mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold"
            >
              <Upload className="size-4" aria-hidden="true" />
              {t.converter.choose}
            </button>
            <p className="mx-auto mt-5 max-w-lg text-xs leading-5 text-muted">
              {fill(t.converter.limits, {
                audio: audioInputSummary(),
                video: videoInputSummary(),
                size: formatBytes(MAX_FILE_BYTES),
                count: MAX_FILES,
              })}
            </p>
          </div>
        ) : null}

        {queue.jobs.length > 0 ? (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-panel/40 px-5 py-3">
              <p className="text-sm font-medium text-ink">
                {fill(t.converter.queueSummary, {
                  count: queue.jobs.length,
                  done: doneJobs.length,
                })}
              </p>
              {queue.busy && formatEta(queue.etaSeconds) ? (
                <p className="font-mono text-xs text-glow">{formatEta(queue.etaSeconds)}</p>
              ) : (
                <p className="text-xs text-muted">
                  {fill(t.converter.queueReady, { count: queue.convertibleCount })}
                </p>
              )}
            </div>
            <ul className="divide-y divide-line">
              {queue.jobs.map((job, index) => {
                const name = displayName(job.file.name);
                const removable = job.status !== "converting" && job.status !== "finalizing" && job.status !== "queued";
                const showPreview = preview?.id === job.id ? preview.target : null;
                return (
                  <li key={job.id} className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-panel font-mono text-xs text-glow">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-line bg-panel text-glow">
                        {isVideoExtension(job.extension) ? <FileVideo className="size-4" aria-hidden="true" /> : <FileAudio className="size-4" aria-hidden="true" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium text-ink">{name}</p>
                        <p className="mt-1 font-mono text-xs text-muted">
                          <span className="uppercase">{job.extension || "—"}</span>
                          {" · "}
                          {facts(job)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="grid size-10 shrink-0 place-items-center rounded-lg text-muted hover:text-ink disabled:opacity-30"
                        aria-label={fill(t.converter.remove, { name })}
                        disabled={!removable}
                        onClick={() => {
                          if (preview?.id === job.id) {
                            setPreview(null);
                          }
                          queue.removeJob(job.id);
                        }}
                      >
                        <X className="size-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span
                        className={[
                          "inline-flex rounded-md border px-2 py-0.5 text-xs font-medium",
                          job.status === "error"
                            ? "border-danger/40 text-danger"
                            : job.status === "done"
                              ? "border-ok/40 text-ok"
                              : job.status === "converting" || job.status === "finalizing"
                                ? "border-signal/40 text-signal"
                                : "border-line text-muted",
                        ].join(" ")}
                      >
                        {t.status[job.status]}
                        {job.status === "converting" && job.progress != null ? ` · ${Math.round(job.progress * 100)} %` : ""}
                      </span>
                      {job.status === "queued" ? (
                        <span className="text-xs text-muted">{t.converter.queueWaiting}</span>
                      ) : null}
                    </div>

                    {job.status === "analyzing" ? <SlowBar label={t.status.analyzing} /> : null}
                    {job.status === "converting" || job.status === "finalizing" ? (
                      job.progress == null ? (
                        <div className="indeterminate mt-3 h-1.5 rounded-full" role="progressbar" aria-label={t.status.progress} aria-valuetext={t.status.converting} />
                      ) : (
                        <div
                          className="mt-3 h-1.5 overflow-hidden rounded-full bg-panel"
                          role="progressbar"
                          aria-label={t.status.progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(job.progress * 100)}
                        >
                          <div className="h-full bg-violet transition-[width] duration-300" style={{ width: `${Math.round(job.progress * 100)}%` }} />
                        </div>
                      )
                    ) : null}

                    {job.errorCode ? (
                      <p role="alert" className="mt-2 flex items-start gap-2 text-sm text-danger">
                        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        {t.errors[job.errorCode]}
                      </p>
                    ) : null}

                    {job.status === "ready" || job.status === "done" || job.status === "cancelled" ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="h-10 rounded-lg border border-line px-3 text-sm text-ink hover:border-glow/40" onClick={() => setPreview(showPreview === "source" ? null : { id: job.id, target: "source" })}>
                          {showPreview === "source" ? t.converter.hidePlayer : t.converter.listenSource}
                        </button>
                      </div>
                    ) : null}

                    {showPreview === "source" ? (
                      <div className="mt-3">
                        <AudioPlayer source={job.file} label={t.converter.listenSource} />
                      </div>
                    ) : null}

                    {job.output ? (
                      <div className="pop-in mt-4 rounded-xl border border-ok/25 bg-ok/5 p-4">
                        <p className="font-medium text-ink">{job.output.name}</p>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <dt className="text-muted">{t.facts.format}</dt>
                            <dd className="font-mono text-ink">{outputFormatFor(job.output.format).label}</dd>
                          </div>
                          <div>
                            <dt className="text-muted">{t.facts.size}</dt>
                            <dd className="font-mono text-ink">{formatBytes(job.output.size)}</dd>
                          </div>
                          {formatDuration(job.output.duration) ? (
                            <div>
                              <dt className="text-muted">{t.facts.duration}</dt>
                              <dd className="font-mono text-ink">{formatDuration(job.output.duration)}</dd>
                            </div>
                          ) : null}
                          {job.output.bitrate ? (
                            <div>
                              <dt className="text-muted">{t.facts.bitrate}</dt>
                              <dd className="font-mono text-ink">{formatBitrate(job.output.bitrate)}</dd>
                            </div>
                          ) : null}
                        </dl>
                        <p className="mt-3 text-sm text-ink">{sizeMessage(job.file.size, job.output.size, t)}</p>
                        <p className="mt-1 text-xs text-muted">{t.converter.sizeNote}</p>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                          <button type="button" className="btn-brand inline-flex h-12 items-center justify-center gap-2 rounded-xl px-5 text-base font-semibold" onClick={() => downloadOutput(job.output as ConversionOutput)}>
                            <Download className="size-4" aria-hidden="true" />
                            {fill(t.converter.download, { format: outputFormatFor(job.output.format).label })}
                          </button>
                          <button type="button" className="h-12 rounded-xl border border-line px-5 text-sm font-semibold text-ink" onClick={() => setPreview(showPreview === "output" ? null : { id: job.id, target: "output" })}>
                            {showPreview === "output" ? t.converter.hidePlayer : t.converter.listenOutput}
                          </button>
                        </div>
                        {showPreview === "output" ? (
                          <div className="mt-3">
                            <AudioPlayer source={job.output.blob} label={t.converter.listenOutput} />
                          </div>
                        ) : null}
                        {doneJobs.length === 1 && !queue.busy && queue.convertibleCount === 0 ? (
                          <button type="button" className="mt-3 text-sm text-muted underline-offset-4 hover:text-ink hover:underline" onClick={() => { setPreview(null); queue.clearJobs(); }}>
                            {t.converter.another}
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div
              className={["border-t border-line px-5 py-3 text-sm", dragOver ? "bg-signal/5" : ""].join(" ")}
              onDragEnter={(event) => {
                event.preventDefault();
                dragDepth.current += 1;
                setDragOver(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => {
                dragDepth.current = Math.max(0, dragDepth.current - 1);
                if (dragDepth.current === 0) {
                  setDragOver(false);
                }
              }}
              onDrop={(event) => {
                event.preventDefault();
                dragDepth.current = 0;
                setDragOver(false);
                void takeDrop(event.dataTransfer);
              }}
            >
              <button type="button" className="text-glow hover:text-ink" onClick={() => inputRef.current?.click()} disabled={queue.busy || queue.jobs.length >= MAX_FILES}>
                {t.converter.addMore}
              </button>
            </div>
          </div>
        ) : null}

        {workable.length > 0 ? (
          <fieldset disabled={queue.busy} className="space-y-6 border-t border-line px-5 py-6 disabled:opacity-60">
            <QualityControls
              disabled={queue.busy}
              format={queue.settings.format}
              bitrate={queue.settings.bitrate}
              onFormat={(next) => queue.updateSettings({ format: next })}
              onBitrate={(bitrate) => queue.updateSettings({ bitrate })}
              onPreset={(nextFormat, bitrate) => queue.updateSettings({ format: nextFormat, bitrate })}
              t={t}
            />

            <div>
              <p className="text-sm font-medium text-ink" id="rate-label">{t.settings.sampleRate}</p>
              <div role="group" aria-labelledby="rate-label" className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SAMPLE_RATES.map((rate) => {
                  const selected = queue.settings.sampleRate === rate;
                  return (
                    <button
                      key={String(rate)}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => queue.updateSettings({ sampleRate: rate })}
                      className={[
                        "h-11 rounded-xl border text-sm transition",
                        selected ? "border-violet bg-violet/10 text-ink" : "border-line text-muted hover:text-ink",
                      ].join(" ")}
                    >
                      {rate === "auto" ? t.settings.auto : formatHertz(rate)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-violet"
                  checked={queue.settings.keepMetadata}
                  onChange={(event) => queue.updateSettings({ keepMetadata: event.target.checked })}
                />
                <span>
                  <span className="block text-sm text-ink">{t.settings.metadata}</span>
                  <span className="block text-sm text-muted">{t.settings.metadataHint}</span>
                </span>
              </label>
              {queue.settings.keepMetadata && identity ? <p className="text-sm text-muted">{t.converter.metadataIncluded}</p> : null}
              {!queue.settings.keepMetadata && identity ? (
                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 size-4 accent-violet"
                    checked={queue.settings.keepTitleArtist}
                    onChange={(event) => queue.updateSettings({ keepTitleArtist: event.target.checked })}
                  />
                  <span>
                    <span className="block text-sm text-ink">{t.settings.identity}</span>
                    <span className="block text-sm text-muted">{t.settings.identityHint}</span>
                  </span>
                </label>
              ) : null}
              {workable.length === 1 ? (
                <label className="block">
                  <span className="text-sm text-ink">{t.settings.filename}</span>
                  <input
                    type="text"
                    value={queue.settings.outputBaseName}
                    maxLength={80}
                    autoComplete="off"
                    placeholder={workable[0] ? displayName(workable[0].file.name).replace(/\.[^.]+$/, "") : ""}
                    onChange={(event) => queue.updateSettings({ outputBaseName: event.target.value })}
                    className="mt-2 h-12 w-full rounded-xl border border-line bg-panel px-3 text-base text-ink outline-none placeholder:text-muted"
                  />
                  <span className="mt-1 block text-sm text-muted">{t.settings.filenameHint}</span>
                </label>
              ) : (
                <p className="text-sm text-muted">{t.converter.customNameHint}</p>
              )}
            </div>
          </fieldset>
        ) : null}

        {queue.jobs.length > 0 ? (
          <div className="border-t border-line px-5 py-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled={queue.busy || queue.convertibleCount === 0}
                onClick={() => void queue.convertAll()}
                className="btn-brand inline-flex h-14 flex-1 items-center justify-center rounded-xl px-5 text-lg font-semibold"
              >
                {convertLabel}
              </button>
              {queue.busy ? (
                <button type="button" onClick={queue.cancel} className="h-14 rounded-xl border border-line px-5 text-base font-semibold text-ink">
                  {t.converter.cancel}
                </button>
              ) : null}
            </div>
            {engineText ? (
              <div className="mt-4">
                <p className="font-mono text-xs text-glow">{engineText}</p>
                {queue.engineLoad?.stage === "download" && queue.engineLoad.progress != null ? (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-panel" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(queue.engineLoad.progress * 100)} aria-label={engineText}>
                    <div className="h-full bg-signal" style={{ width: `${Math.round(queue.engineLoad.progress * 100)}%` }} />
                  </div>
                ) : (
                  <div className="indeterminate mt-2 h-1.5 rounded-full" role="progressbar" aria-label={engineText} />
                )}
                <p className="mt-2 text-xs leading-5 text-muted">{t.converter.engineHint}</p>
              </div>
            ) : null}
            {queue.busy ? <p className="mt-3 text-xs text-muted">{t.converter.cancelHint}</p> : null}
            {doneJobs.length > 1 && !queue.busy && queue.convertibleCount === 0 ? (
              <button type="button" className="mt-4 text-sm text-muted underline-offset-4 hover:text-ink hover:underline" onClick={() => { setPreview(null); queue.clearJobs(); }}>
                {t.converter.another}
              </button>
            ) : null}
          </div>
        ) : null}

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={`${ACCEPTED_EXTENSIONS},audio/*,video/mp4,video/webm,video/quicktime`}
          className="sr-only"
          tabIndex={-1}
          aria-label={t.converter.fileInput}
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              takeFiles(event.target.files);
            }
          }}
        />
      </div>
      <HistoryPanel />
    </section>
  );
}

function QualityControls({
  disabled,
  format,
  bitrate,
  onFormat,
  onBitrate,
  onPreset,
  t,
  compact = false,
}: {
  disabled: boolean;
  format: OutputFormatId;
  bitrate: Bitrate;
  onFormat: (format: OutputFormatId) => void;
  onBitrate: (bitrate: Bitrate) => void;
  onPreset: (format: OutputFormatId, bitrate: Bitrate) => void;
  t: ReturnType<typeof useI18n>;
  compact?: boolean;
}) {
  const formatMeta = outputFormatFor(format);
  const presets: Array<{ id: string; label: string; format: OutputFormatId; bitrate: Bitrate; active: boolean }> = [
    {
      id: "light",
      label: t.settings.presetLight,
      format: "mp3",
      bitrate: 128,
      active: format === "mp3" && bitrate === 128,
    },
    {
      id: "standard",
      label: t.settings.presetStandard,
      format: "mp3",
      bitrate: 192,
      active: format === "mp3" && bitrate === 192,
    },
    {
      id: "best",
      label: t.settings.presetBest,
      format: "mp3",
      bitrate: 320,
      active: format === "mp3" && bitrate === 320,
    },
    {
      id: "lossless",
      label: t.settings.presetLossless,
      format: "flac",
      bitrate: 320,
      active: format === "flac" || format === "wav",
    },
  ];

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      <div>
        <p className="text-sm font-medium text-ink">{t.settings.quality}</p>
        <p className="mt-1 text-xs leading-5 text-muted">{t.settings.qualityHint}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              disabled={disabled}
              aria-pressed={preset.active}
              onClick={() => onPreset(preset.format, preset.bitrate)}
              className={[
                "h-11 rounded-xl border px-2 text-sm font-semibold transition",
                preset.active ? "border-violet bg-violet/10 text-ink" : "border-line text-muted hover:text-ink",
              ].join(" ")}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink" id="format-label">{t.settings.format}</p>
        <div role="group" aria-labelledby="format-label" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {OUTPUT_FORMATS.map((item) => {
            const selected = format === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={disabled}
                aria-pressed={selected}
                onClick={() => onFormat(item.id)}
                className={[
                  "h-14 rounded-xl border text-sm font-semibold transition",
                  selected ? "border-violet bg-violet/10 text-ink" : "border-line text-muted hover:border-glow/40 hover:text-ink",
                ].join(" ")}
              >
                {item.label}
                {item.id === "mp3" ? (
                  <span className="mt-0.5 block font-mono text-[10px] font-normal tracking-wide text-glow uppercase">
                    {t.settings.principal}
                  </span>
                ) : null}
                {item.id === "flac" || item.id === "wav" ? (
                  <span className="mt-0.5 block font-mono text-[10px] font-normal tracking-wide text-glow uppercase">
                    {t.settings.bestBadge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {formatMeta.bitrate ? (
        <div>
          <p className="text-sm font-medium text-ink" id="bitrate-label">{t.settings.bitrate}</p>
          <div role="group" aria-labelledby="bitrate-label" className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {BITRATES.map((value) => {
              const selected = bitrate === value;
              return (
                <button
                  key={value}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => onBitrate(value)}
                  className={[
                    "relative h-11 rounded-xl border font-mono text-sm transition",
                    selected ? "border-violet bg-violet/10 text-ink" : "border-line text-muted hover:text-ink",
                  ].join(" ")}
                >
                  {formatBitrate(value)}
                  {value === 320 ? (
                    <span className="absolute -top-2 right-1 rounded bg-glow/20 px-1 font-sans text-[9px] font-semibold tracking-wide text-glow uppercase">
                      {t.settings.bestBadge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted">{t.converter.losslessHint}</p>
      )}
    </div>
  );
}

function SlowBar({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 300);
    return () => window.clearTimeout(id);
  }, []);
  if (!visible) {
    return null;
  }
  return <div className="indeterminate mt-3 h-1.5 rounded-full" role="progressbar" aria-label={label} />;
}

function sizeMessage(before: number, after: number, t: ReturnType<typeof useI18n>): string {
  const diff = before - after;
  if (diff === 0) {
    return t.converter.sameSize;
  }
  const amount = formatBytes(Math.abs(diff));
  return fill(diff > 0 ? t.converter.smaller : t.converter.larger, { amount });
}
