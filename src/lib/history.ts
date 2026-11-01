import { MAX_HISTORY, isBitrate, isOutputFormatId, isSampleRateOption } from "@/lib/constants";
import type { HistoryEntry } from "@/types/audio";

export const HISTORY_KEY = "audiova.history.v1";
export const HISTORY_EVENT = "audiova-history";
const LEGACY_HISTORY_KEYS = ["sonora.history.v1", "audiolab.history.v1"] as const;

function isEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== "object") {
    return false;
  }
  const entry = value as Partial<HistoryEntry>;
  if (typeof entry.id !== "string" || typeof entry.fileName !== "string" || typeof entry.convertedAt !== "string") {
    return false;
  }
  if (!isOutputFormatId(entry.format) || !isSampleRateOption(entry.sampleRate)) {
    return false;
  }
  if (entry.bitrate !== null && !isBitrate(entry.bitrate)) {
    return false;
  }
  if (Number.isNaN(new Date(entry.convertedAt).getTime())) {
    return false;
  }
  return entry.fileName.trim().length > 0 && entry.id.trim().length > 0;
}

export function parseHistory(raw: string | null): HistoryEntry[] {
  if (!raw) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(isEntry).slice(0, MAX_HISTORY).map((entry) => ({
      id: entry.id.slice(0, 80),
      fileName: entry.fileName.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 180),
      convertedAt: entry.convertedAt,
      format: entry.format,
      bitrate: entry.bitrate,
      sampleRate: entry.sampleRate,
    }));
  } catch {
    return [];
  }
}

export function readHistory(): HistoryEntry[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const current = window.localStorage.getItem(HISTORY_KEY);
    if (current) {
      return parseHistory(current);
    }
    for (const key of LEGACY_HISTORY_KEYS) {
      const legacy = window.localStorage.getItem(key);
      if (legacy) {
        window.localStorage.setItem(HISTORY_KEY, legacy);
        return parseHistory(legacy);
      }
    }
    return [];
  } catch {
    return [];
  }
}

export function writeHistory(entry: HistoryEntry): HistoryEntry[] {
  const next = [entry, ...readHistory().filter((item) => item.id !== entry.id)].slice(0, MAX_HISTORY);
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(HISTORY_EVENT));
  } catch {
    return readHistory();
  }
  return next;
}

export function clearHistory(): void {
  try {
    window.localStorage.removeItem(HISTORY_KEY);
  } catch {
    // Le stockage local peut être bloqué.
  }
  if (typeof window !== "undefined") {
    void import("@/lib/output-cache").then((mod) => mod.clearOutputBlobs()).catch(() => undefined);
    window.dispatchEvent(new Event(HISTORY_EVENT));
  }
}
