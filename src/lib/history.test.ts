import { afterEach, describe, expect, it, vi } from "vitest";
import { HISTORY_KEY, clearHistory, parseHistory, readHistory, writeHistory } from "@/lib/history";
import type { HistoryEntry } from "@/types/audio";

const entry: HistoryEntry = {
  id: "1",
  fileName: "soir.mp3",
  convertedAt: "2026-10-30T08:00:00.000Z",
  format: "mp3",
  bitrate: 192,
  sampleRate: "auto",
};

function installStorage() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  };
  vi.stubGlobal("window", { localStorage, dispatchEvent: () => true });
  vi.stubGlobal("localStorage", localStorage);
}

describe("historique local", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("ignore un stockage illisible ou incomplet", () => {
    expect(parseHistory(null)).toEqual([]);
    expect(parseHistory("{")).toEqual([]);
    expect(parseHistory(JSON.stringify([{ fileName: "x" }]))).toEqual([]);
    expect(parseHistory(JSON.stringify([entry]))[0]?.fileName).toBe("soir.mp3");
  });

  it("enregistre puis efface sans conserver l'audio", () => {
    installStorage();
    writeHistory(entry);
    expect(readHistory()).toEqual([entry]);
    const raw = window.localStorage.getItem(HISTORY_KEY) ?? "";
    expect(raw).not.toContain("blob");
    expect(raw).not.toContain("Uint8Array");
    clearHistory();
    expect(readHistory()).toEqual([]);
  });
});
