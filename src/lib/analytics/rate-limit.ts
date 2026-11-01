const WINDOW_MS = 60_000;
const LIMIT = 60;

const hits = new Map<string, number[]>();

export function consumeAnalyticsSlot(key: string, now = Date.now()): boolean {
  const previous = hits.get(key) ?? [];
  const recent = previous.filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
