export interface SecurityEvent {
  at: string;
  type: "login-success" | "login-failure" | "login-locked" | "logout" | "forbidden";
  ip: string;
  detail?: string;
}

const MAX_EVENTS = 200;

const store = globalThis as typeof globalThis & {
  __audiovaSecurityLog?: SecurityEvent[];
};

function log(): SecurityEvent[] {
  if (!store.__audiovaSecurityLog) {
    store.__audiovaSecurityLog = [];
  }
  return store.__audiovaSecurityLog;
}

export function recordSecurityEvent(event: Omit<SecurityEvent, "at">): void {
  const entry: SecurityEvent = {
    ...event,
    at: new Date().toISOString(),
    // Ne jamais journaliser de mot de passe ou de jeton.
    detail: event.detail?.slice(0, 120),
  };
  const list = log();
  list.unshift(entry);
  if (list.length > MAX_EVENTS) {
    list.length = MAX_EVENTS;
  }
}

export function getSecurityEvents(): SecurityEvent[] {
  return [...log()];
}
