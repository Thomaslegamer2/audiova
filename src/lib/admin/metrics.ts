type CounterMap = Record<string, number>;

interface MetricsState {
  startedAt: number;
  urlImports: {
    total: number;
    success: number;
    failures: CounterMap;
    rateLimited: number;
    busyRejected: number;
    lastAt: string | null;
    lastHost: string | null;
    bytesServed: number;
  };
}

const globalStore = globalThis as typeof globalThis & {
  __audiovaMetrics?: MetricsState;
};

function createState(): MetricsState {
  return {
    startedAt: Date.now(),
    urlImports: {
      total: 0,
      success: 0,
      failures: {},
      rateLimited: 0,
      busyRejected: 0,
      lastAt: null,
      lastHost: null,
      bytesServed: 0,
    },
  };
}

function state(): MetricsState {
  if (!globalStore.__audiovaMetrics) {
    globalStore.__audiovaMetrics = createState();
  }
  return globalStore.__audiovaMetrics;
}

function bump(map: CounterMap, key: string) {
  map[key] = (map[key] ?? 0) + 1;
}

export function recordUrlImportAttempt() {
  state().urlImports.total += 1;
}

export function recordUrlImportSuccess(bytes: number, host: string) {
  const url = state().urlImports;
  url.success += 1;
  url.bytesServed += Math.max(0, bytes);
  url.lastAt = new Date().toISOString();
  url.lastHost = host.slice(0, 120);
}

export function recordUrlImportFailure(code: string) {
  bump(state().urlImports.failures, code);
  state().urlImports.lastAt = new Date().toISOString();
}

export function recordUrlRateLimited() {
  state().urlImports.rateLimited += 1;
}

export function recordUrlBusy() {
  state().urlImports.busyRejected += 1;
}

export function getMetricsSnapshot() {
  const current = state();
  return {
    processStartedAt: new Date(current.startedAt).toISOString(),
    uptimeSeconds: Math.floor((Date.now() - current.startedAt) / 1000),
    urlImports: {
      ...current.urlImports,
      failures: { ...current.urlImports.failures },
    },
  };
}

export function resetMetrics() {
  globalStore.__audiovaMetrics = createState();
}
