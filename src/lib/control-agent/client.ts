export type AgentConfig = {
  catalogVersion: number;
  configVersion: number;
  theme: {
    mode: "inherit" | "pin";
    activeId: string;
    tokens: Record<string, string>;
    effects: string[];
    label: string;
  };
  flags: Record<string, boolean>;
  locales: string[];
};

function controlUrl(): string | null {
  const base = process.env.OW_CONTROL_URL?.trim();
  if (!base) {
    return null;
  }
  return base.replace(/\/$/, "");
}

function siteKey(): string | null {
  const key = process.env.OW_SITE_KEY?.trim();
  return key && key.startsWith("ow_live_") ? key : null;
}

export function controlAgentEnabled(): boolean {
  return Boolean(controlUrl() && siteKey());
}

async function agentFetch(path: string, init?: RequestInit): Promise<Response> {
  const base = controlUrl();
  const key = siteKey();
  if (!base || !key) {
    throw new Error("control_agent_not_configured");
  }
  return fetch(`${base}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

export async function postHeartbeat(payload: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await agentFetch("/api/v1/agent/heartbeat", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function pullConfig(etag?: string | null): Promise<{
  status: number;
  etag: string | null;
  config: AgentConfig | null;
}> {
  const headers: Record<string, string> = {};
  if (etag) {
    headers["If-None-Match"] = etag;
  }
  const res = await agentFetch("/api/v1/agent/config", { headers });
  const nextEtag = res.headers.get("etag");
  if (res.status === 304) {
    return { status: 304, etag: nextEtag ?? etag ?? null, config: null };
  }
  if (!res.ok) {
    return { status: res.status, etag: nextEtag, config: null };
  }
  const config = (await res.json()) as AgentConfig;
  return { status: 200, etag: nextEtag, config };
}
