"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { outputFormatFor } from "@/lib/constants";
import { EMPTY_METADATA, readMetadata } from "@/lib/audio/metadata";
import { probeDuration } from "@/lib/audio/probe";
import {
  ConversionError,
  buildFfmpegArgs,
  logTechnical,
  outputFileName,
  uniqueOutputNames,
} from "@/lib/audio/conversion";
import { displayName, extensionOf, safeInputName, validateFile } from "@/lib/audio/validation";
import { trackEvent } from "@/lib/analytics/client";
import { writeHistory } from "@/lib/history";
import { MAX_FILES, DEFAULT_BITRATE } from "@/lib/constants";
import type {
  ConversionJob,
  ConversionSettings,
  EngineStage,
  ErrorCode,
} from "@/types/audio";

const RETRYABLE = new Set<ErrorCode>(["damaged", "memory", "failed", "no-audio", "timeout", "engine"]);

function canConvert(job: ConversionJob): boolean {
  if (job.status === "ready" || job.status === "cancelled") {
    return true;
  }
  return job.status === "error" && job.errorCode != null && RETRYABLE.has(job.errorCode);
}

export function useConversionQueue() {
  const [jobs, setJobs] = useState<ConversionJob[]>([]);
  const [settings, setSettings] = useState<ConversionSettings>({
    format: "mp3",
    bitrate: DEFAULT_BITRATE,
    sampleRate: "auto",
    keepMetadata: true,
    keepTitleArtist: true,
    outputBaseName: "",
  });
  const [phase, setPhase] = useState<"idle" | "loading-engine" | "converting">("idle");
  const [engineLoad, setEngineLoad] = useState<EngineStage | null>(null);
  const [notice, setNotice] = useState<ErrorCode | null>(null);

  const jobsRef = useRef<ConversionJob[]>([]);
  const settingsRef = useRef(settings);
  const engineRef = useRef<import("@/lib/audio/engine").FfmpegEngine | null>(null);
  const runningRef = useRef(false);
  const cancelRef = useRef(false);
  const mountedRef = useRef(true);

  const commit = useCallback((next: ConversionJob[]) => {
    jobsRef.current = next;
    setJobs(next);
  }, []);

  const patch = useCallback(
    (id: string, partial: Partial<ConversionJob>) => {
      commit(jobsRef.current.map((job) => (job.id === id ? { ...job, ...partial } : job)));
    },
    [commit],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      engineRef.current?.dispose();
      engineRef.current = null;
    };
  }, []);

  const updateSettings = useCallback((partial: Partial<ConversionSettings>) => {
    setSettings((current) => {
      const next = { ...current, ...partial };
      settingsRef.current = next;
      return next;
    });
  }, []);

  const addFiles = useCallback(
    async (files: File[]) => {
      setNotice(null);
      const room = MAX_FILES - jobsRef.current.length;
      if (room <= 0) {
        setNotice("too-many");
        return;
      }
      if (files.length > room) {
        setNotice("too-many");
      }

      for (const file of files.slice(0, room)) {
        const rejection = validateFile(file);
        const id = crypto.randomUUID();
        const extension = extensionOf(file.name);
        const base: ConversionJob = {
          id,
          file,
          extension,
          metadata: EMPTY_METADATA,
          status: rejection ? "error" : "analyzing",
          progress: null,
          errorCode: rejection,
          output: null,
        };
        commit([...jobsRef.current, base]);
        if (rejection) {
          continue;
        }

        try {
          const metadata = await readMetadata(file);
          if (!jobsRef.current.some((job) => job.id === id)) {
            continue;
          }
          let duration = metadata.duration;
          if (duration == null) {
            duration = await probeDuration(file);
          }
          if (!jobsRef.current.some((job) => job.id === id)) {
            continue;
          }
          patch(id, {
            status: "ready",
            metadata: { ...metadata, duration: duration ?? null },
          });
        } catch (error) {
          logTechnical("metadata", error instanceof Error ? error.message : undefined);
          if (jobsRef.current.some((job) => job.id === id)) {
            patch(id, { status: "ready", metadata: EMPTY_METADATA });
          }
        }
      }
    },
    [commit, patch],
  );

  const removeJob = useCallback(
    (id: string) => {
      const job = jobsRef.current.find((item) => item.id === id);
      if (!job || job.status === "converting" || job.status === "finalizing" || job.status === "queued") {
        return;
      }
      commit(jobsRef.current.filter((item) => item.id !== id));
    },
    [commit],
  );

  const clearJobs = useCallback(() => {
    if (runningRef.current) {
      return;
    }
    commit([]);
    setNotice(null);
  }, [commit]);

  const convertAll = useCallback(async (): Promise<{
    done: ConversionJob[];
    errorCode: ErrorCode | null;
  }> => {
    if (runningRef.current) {
      return { done: [], errorCode: null };
    }
    const targets = jobsRef.current.filter(canConvert);
    if (targets.length === 0) {
      return { done: [], errorCode: null };
    }

    runningRef.current = true;
    cancelRef.current = false;
    setNotice(null);
    const ids = targets.map((job) => job.id);
    commit(
      jobsRef.current.map((job) =>
        ids.includes(job.id) ? { ...job, status: "queued", progress: null, errorCode: null, output: null } : job,
      ),
    );

    const currentSettings = settingsRef.current;
    const custom = targets.length === 1 ? currentSettings.outputBaseName : "";
    const names = uniqueOutputNames(
      targets.map((job) => outputFileName(displayName(job.file.name), custom, currentSettings.format)),
    );

    const markRemaining = (status: "cancelled" | "error", errorCode: ErrorCode | null) => {
      commit(
        jobsRef.current.map((job) =>
          job.status === "queued" || job.status === "converting" || job.status === "finalizing"
            ? { ...job, status, progress: null, errorCode }
            : job,
        ),
      );
    };

    try {
      setPhase("loading-engine");
      if (!engineRef.current) {
        const { FfmpegEngine } = await import("@/lib/audio/engine");
        engineRef.current = new FfmpegEngine();
      }
      const engine = engineRef.current;
      await engine.load((stage) => {
        if (mountedRef.current) {
          setEngineLoad(stage);
        }
      });
      if (cancelRef.current) {
        markRemaining("cancelled", null);
        return { done: [], errorCode: null };
      }

      setPhase("converting");
      for (let index = 0; index < targets.length; index += 1) {
        if (cancelRef.current) {
          break;
        }
        const id = targets[index]?.id;
        const outputName = names[index];
        if (!id || !outputName) {
          continue;
        }
        const job = jobsRef.current.find((item) => item.id === id);
        if (!job || job.status === "done") {
          continue;
        }
        await convertOne(engine, job, outputName);
      }
      if (cancelRef.current) {
        markRemaining("cancelled", null);
      }
    } catch (error) {
      const code = error instanceof ConversionError ? error.code : "engine";
      logTechnical(code, error instanceof Error ? error.message : undefined);
      if (cancelRef.current) {
        markRemaining("cancelled", null);
      } else {
        markRemaining("error", code);
      }
    } finally {
      runningRef.current = false;
      if (mountedRef.current) {
        setPhase("idle");
        setEngineLoad(null);
      }
    }

    const processed = jobsRef.current.filter((job) => ids.includes(job.id));
    return {
      done: processed.filter((job) => job.status === "done" && job.output),
      errorCode: processed.find((job) => job.status === "error")?.errorCode ?? null,
    };

    async function convertOne(
      engine: import("@/lib/audio/engine").FfmpegEngine,
      job: ConversionJob,
      outputName: string,
    ) {
      const activeSettings = settingsRef.current;
      const format = outputFormatFor(activeSettings.format);
      const inputName = safeInputName(job.extension);
      const outputTarget = `output.${format.extension}`;
      patch(job.id, { status: "converting", progress: null, errorCode: null, output: null });
      const startedAt = Date.now();

      try {
        const bytes = await engine.convert({
          file: job.file,
          inputName,
          outputName: outputTarget,
          format: activeSettings.format,
          args: buildFfmpegArgs({
            inputName,
            outputName: outputTarget,
            settings: activeSettings,
            metadata: job.metadata,
          }),
          onProgress: (progress) => {
            if (mountedRef.current && !cancelRef.current) {
              patch(job.id, { status: "converting", progress });
            }
          },
        });
        if (cancelRef.current) {
          patch(job.id, { status: "cancelled", progress: null });
          return;
        }
        patch(job.id, { status: "finalizing", progress: 1 });
        const copy = new Uint8Array(bytes.byteLength);
        copy.set(bytes);
        const blob = new Blob([copy.buffer], { type: format.mime });
        patch(job.id, {
          status: "done",
          progress: 1,
          errorCode: null,
          output: {
            blob,
            name: outputName,
            size: copy.byteLength,
            format: activeSettings.format,
            bitrate: format.bitrate ? activeSettings.bitrate : null,
            duration: job.metadata.duration,
          },
        });
        void trackEvent("conversion_ok", {
          formatIn: job.extension,
          formatOut: activeSettings.format,
          bytes: copy.byteLength,
          durationMs: Date.now() - startedAt,
        });
        try {
          writeHistory({
            id: crypto.randomUUID(),
            fileName: outputName,
            convertedAt: new Date().toISOString(),
            format: activeSettings.format,
            bitrate: format.bitrate ? activeSettings.bitrate : null,
            sampleRate: activeSettings.sampleRate,
          });
        } catch (historyError) {
          logTechnical("history", historyError instanceof Error ? historyError.message : undefined);
        }
      } catch (error) {
        if (cancelRef.current) {
          patch(job.id, { status: "cancelled", progress: null, errorCode: null });
          return;
        }
        const code = error instanceof ConversionError ? error.code : "failed";
        logTechnical(code, error instanceof Error ? error.message : undefined);
        patch(job.id, { status: "error", progress: null, errorCode: code, output: null });
        void trackEvent("conversion_fail", {
          formatIn: job.extension,
          formatOut: activeSettings.format,
          errorCode: code,
          durationMs: Date.now() - startedAt,
        });
      }
    }
  }, [commit, patch]);

  const cancel = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    cancelRef.current = true;
    engineRef.current?.terminate();
    commit(
      jobsRef.current.map((job) =>
        job.status === "queued" || job.status === "converting" || job.status === "finalizing"
          ? { ...job, status: "cancelled", progress: null, errorCode: null }
          : job,
      ),
    );
  }, [commit]);

  const busy = phase !== "idle";
  const convertibleCount = jobs.filter(canConvert).length;

  return {
    jobs,
    settings,
    phase,
    engineLoad,
    notice,
    busy,
    convertibleCount,
    updateSettings,
    addFiles,
    removeJob,
    clearJobs,
    convertAll,
    cancel,
    dismissNotice: () => setNotice(null),
  };
}
