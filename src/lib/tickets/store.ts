import { randomBytes } from "node:crypto";
import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export type TicketStatus = "open" | "answered" | "closed";
export type TicketAuthor = "visitor" | "admin";

export interface TicketMessage {
  id: string;
  at: string;
  author: TicketAuthor;
  body: string;
}

export interface Ticket {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  status: TicketStatus;
  name: string;
  email: string;
  subject: string;
  locale: string;
  messages: TicketMessage[];
}

export interface TicketSummary {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: TicketStatus;
  name: string;
  email: string;
  subject: string;
  locale: string;
  messageCount: number;
  lastAuthor: TicketAuthor | null;
  lastPreview: string;
  awaitingAdmin: boolean;
}

const DIR = path.join(process.cwd(), "data", "tickets");
const ID_RE = /^[a-z0-9]{10,24}$/;
const TOKEN_RE = /^[a-zA-Z0-9_-]{24,64}$/;

function newId(): string {
  return randomBytes(8).toString("hex");
}

function newToken(): string {
  return randomBytes(24).toString("base64url");
}

function ticketPath(id: string): string {
  return path.join(DIR, `${id}.json`);
}

function sanitizeText(value: string, max: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function sanitizeBody(value: string, max: number): string {
  return value.replace(/\r\n/g, "\n").trim().slice(0, max);
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 120;
}

export function isTicketId(value: string): boolean {
  return ID_RE.test(value);
}

export function isTicketToken(value: string): boolean {
  return TOKEN_RE.test(value);
}

function parseTicket(raw: string): Ticket | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const record = parsed as Record<string, unknown>;
    if (typeof record.id !== "string" || !isTicketId(record.id)) {
      return null;
    }
    if (typeof record.token !== "string" || !isTicketToken(record.token)) {
      return null;
    }
    const status =
      record.status === "open" || record.status === "answered" || record.status === "closed"
        ? record.status
        : "open";
    const messages = Array.isArray(record.messages)
      ? record.messages
          .filter((item): item is TicketMessage => {
            if (!item || typeof item !== "object") {
              return false;
            }
            const message = item as Record<string, unknown>;
            return (
              typeof message.id === "string" &&
              typeof message.at === "string" &&
              (message.author === "visitor" || message.author === "admin") &&
              typeof message.body === "string"
            );
          })
          .map((message) => ({
            id: message.id,
            at: message.at,
            author: message.author,
            body: message.body.slice(0, 4000),
          }))
      : [];

    return {
      id: record.id,
      token: record.token,
      createdAt: typeof record.createdAt === "string" ? record.createdAt : new Date().toISOString(),
      updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : new Date().toISOString(),
      status,
      name: typeof record.name === "string" ? record.name.slice(0, 80) : "Visiteur",
      email: typeof record.email === "string" ? record.email.slice(0, 120) : "",
      subject: typeof record.subject === "string" ? record.subject.slice(0, 120) : "Sans objet",
      locale: typeof record.locale === "string" ? record.locale.slice(0, 12) : "fr",
      messages,
    };
  } catch {
    return null;
  }
}

async function ensureDir() {
  await mkdir(DIR, { recursive: true });
}

async function writeTicketAtomic(ticket: Ticket) {
  await ensureDir();
  const target = ticketPath(ticket.id);
  const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temp, `${JSON.stringify(ticket, null, 2)}\n`, "utf8");
  await rename(temp, target);
}

export function publicTicketView(ticket: Ticket) {
  return {
    id: ticket.id,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    status: ticket.status,
    name: ticket.name,
    email: ticket.email,
    subject: ticket.subject,
    locale: ticket.locale,
    messages: ticket.messages.map((message) => ({
      id: message.id,
      at: message.at,
      author: message.author,
      body: message.body,
    })),
  };
}

export function toSummary(ticket: Ticket): TicketSummary {
  const last = ticket.messages[ticket.messages.length - 1] ?? null;
  return {
    id: ticket.id,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    status: ticket.status,
    name: ticket.name,
    email: ticket.email,
    subject: ticket.subject,
    locale: ticket.locale,
    messageCount: ticket.messages.length,
    lastAuthor: last?.author ?? null,
    lastPreview: last ? last.body.slice(0, 140) : "",
    awaitingAdmin: ticket.status !== "closed" && last?.author === "visitor",
  };
}

export async function createTicket(input: {
  name: string;
  email: string;
  subject: string;
  body: string;
  locale: string;
}): Promise<Ticket | { error: "invalid" }> {
  const name = sanitizeText(input.name, 80);
  const email = sanitizeText(input.email, 120).toLowerCase();
  const subject = sanitizeText(input.subject, 120);
  const body = sanitizeBody(input.body, 4000);
  const locale = sanitizeText(input.locale || "fr", 12);

  if (name.length < 2 || !isEmail(email) || subject.length < 3 || body.length < 5) {
    return { error: "invalid" };
  }

  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: newId(),
    token: newToken(),
    createdAt: now,
    updatedAt: now,
    status: "open",
    name,
    email,
    subject,
    locale,
    messages: [
      {
        id: newId(),
        at: now,
        author: "visitor",
        body,
      },
    ],
  };

  await writeTicketAtomic(ticket);
  return ticket;
}

export async function readTicket(id: string): Promise<Ticket | null> {
  if (!isTicketId(id)) {
    return null;
  }
  try {
    const raw = await readFile(ticketPath(id), "utf8");
    return parseTicket(raw);
  } catch {
    return null;
  }
}

export async function readTicketForVisitor(id: string, token: string): Promise<Ticket | null> {
  const ticket = await readTicket(id);
  if (!ticket || ticket.token !== token) {
    return null;
  }
  return ticket;
}

export async function listTickets(): Promise<TicketSummary[]> {
  await ensureDir();
  let files: string[] = [];
  try {
    files = await readdir(DIR);
  } catch {
    return [];
  }

  const tickets: Ticket[] = [];
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    try {
      const raw = await readFile(path.join(DIR, file), "utf8");
      const ticket = parseTicket(raw);
      if (ticket) {
        tickets.push(ticket);
      }
    } catch {
      // Ignore corrupt files.
    }
  }

  return tickets
    .map(toSummary)
    .sort((a, b) => {
      if (a.awaitingAdmin !== b.awaitingAdmin) {
        return a.awaitingAdmin ? -1 : 1;
      }
      return b.updatedAt.localeCompare(a.updatedAt);
    });
}

export async function appendMessage(
  id: string,
  author: TicketAuthor,
  bodyRaw: string,
  options: { token?: string; forceStatus?: TicketStatus } = {},
): Promise<Ticket | { error: "not-found" | "forbidden" | "closed" | "invalid" }> {
  const body = sanitizeBody(bodyRaw, 4000);
  if (body.length < 1) {
    return { error: "invalid" };
  }

  const ticket = await readTicket(id);
  if (!ticket) {
    return { error: "not-found" };
  }
  if (author === "visitor") {
    if (!options.token || ticket.token !== options.token) {
      return { error: "forbidden" };
    }
    if (ticket.status === "closed") {
      return { error: "closed" };
    }
  }

  const now = new Date().toISOString();
  ticket.messages.push({
    id: newId(),
    at: now,
    author,
    body,
  });
  ticket.updatedAt = now;
  if (options.forceStatus) {
    ticket.status = options.forceStatus;
  } else if (author === "admin") {
    ticket.status = "answered";
  } else if (ticket.status === "answered") {
    ticket.status = "open";
  }

  await writeTicketAtomic(ticket);
  return ticket;
}

export async function setTicketStatus(
  id: string,
  status: TicketStatus,
): Promise<Ticket | { error: "not-found" | "invalid" }> {
  if (status !== "open" && status !== "answered" && status !== "closed") {
    return { error: "invalid" };
  }
  const ticket = await readTicket(id);
  if (!ticket) {
    return { error: "not-found" };
  }
  ticket.status = status;
  ticket.updatedAt = new Date().toISOString();
  await writeTicketAtomic(ticket);
  return ticket;
}

export async function deleteTicket(id: string): Promise<boolean> {
  if (!isTicketId(id)) {
    return false;
  }
  try {
    await unlink(ticketPath(id));
    return true;
  } catch {
    return false;
  }
}
