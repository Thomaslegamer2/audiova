"use client";

import { useSyncExternalStore } from "react";
import { HISTORY_EVENT, HISTORY_KEY, clearHistory, parseHistory } from "@/lib/history";
import type { HistoryEntry } from "@/types/audio";

let cachedRaw: string | null | undefined;
let cachedEntries: HistoryEntry[] = [];
const emptyHistory: HistoryEntry[] = [];

function subscribe(onChange: () => void) {
  window.addEventListener(HISTORY_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(HISTORY_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): HistoryEntry[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(HISTORY_KEY);
  } catch {
    raw = null;
  }
  if (raw === cachedRaw) {
    return cachedEntries;
  }
  cachedRaw = raw;
  cachedEntries = parseHistory(raw);
  return cachedEntries;
}

export function useHistory() {
  const entries = useSyncExternalStore(subscribe, getSnapshot, () => emptyHistory);
  return { entries, clear: clearHistory };
}
