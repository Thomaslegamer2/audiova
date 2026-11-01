import { URL_IMPORT_RATE_LIMIT, URL_IMPORT_RATE_WINDOW_MS } from "@/lib/audio/url-import";

const hits = new Map<string, number[]>();

export function consumeUrlImportSlot(key: string, now = Date.now()): boolean {
  const previous = hits.get(key) ?? [];
  const recent = previous.filter((stamp) => now - stamp < URL_IMPORT_RATE_WINDOW_MS);
  if (recent.length >= URL_IMPORT_RATE_LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
