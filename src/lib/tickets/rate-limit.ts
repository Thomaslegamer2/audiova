const WINDOW_MS = 60 * 60 * 1000;
const CREATE_LIMIT = 5;
const MESSAGE_LIMIT = 30;

const creates = new Map<string, number[]>();
const messages = new Map<string, number[]>();

function consume(map: Map<string, number[]>, key: string, limit: number, now: number): boolean {
  const previous = map.get(key) ?? [];
  const recent = previous.filter((stamp) => now - stamp < WINDOW_MS);
  if (recent.length >= limit) {
    map.set(key, recent);
    return false;
  }
  recent.push(now);
  map.set(key, recent);
  return true;
}

export function consumeTicketCreate(ip: string, now = Date.now()): boolean {
  return consume(creates, ip, CREATE_LIMIT, now);
}

export function consumeTicketMessage(ip: string, now = Date.now()): boolean {
  return consume(messages, ip, MESSAGE_LIMIT, now);
}
