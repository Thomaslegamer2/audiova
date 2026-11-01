const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

interface Bucket {
  failures: number[];
  lockedUntil: number;
}

const store = globalThis as typeof globalThis & {
  __audiovaAdminLoginBuckets?: Map<string, Bucket>;
};

function buckets(): Map<string, Bucket> {
  if (!store.__audiovaAdminLoginBuckets) {
    store.__audiovaAdminLoginBuckets = new Map();
  }
  return store.__audiovaAdminLoginBuckets;
}

export function isAdminLoginLocked(key: string, now = Date.now()): boolean {
  const bucket = buckets().get(key);
  if (!bucket) {
    return false;
  }
  return bucket.lockedUntil > now;
}

export function adminLoginRetryAfterSeconds(key: string, now = Date.now()): number {
  const bucket = buckets().get(key);
  if (!bucket || bucket.lockedUntil <= now) {
    return 0;
  }
  return Math.ceil((bucket.lockedUntil - now) / 1000);
}

export function recordAdminLoginFailure(key: string, now = Date.now()): void {
  const map = buckets();
  const previous = map.get(key) ?? { failures: [], lockedUntil: 0 };
  const recent = previous.failures.filter((stamp) => now - stamp < WINDOW_MS);
  recent.push(now);
  const lockedUntil = recent.length >= MAX_FAILURES ? now + LOCK_MS : previous.lockedUntil;
  map.set(key, { failures: recent, lockedUntil });
}

export function clearAdminLoginFailures(key: string): void {
  buckets().delete(key);
}
