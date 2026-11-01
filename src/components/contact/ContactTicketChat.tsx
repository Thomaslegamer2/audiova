"use client";

import { MessageCircle, Send } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n, useLocale } from "@/components/providers";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "audiova.ticket";

interface TicketMessage {
  id: string;
  at: string;
  author: "visitor" | "admin";
  body: string;
}

interface PublicTicket {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "open" | "answered" | "closed";
  name: string;
  email: string;
  subject: string;
  messages: TicketMessage[];
}

interface StoredHandle {
  id: string;
  token: string;
}

function readHandle(): StoredHandle | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as StoredHandle).id === "string" &&
      typeof (parsed as StoredHandle).token === "string"
    ) {
      return parsed as StoredHandle;
    }
  } catch {
    // Ignore.
  }
  return null;
}

function writeHandle(handle: StoredHandle | null) {
  try {
    if (!handle) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(handle));
  } catch {
    // Ignore.
  }
}

function formatWhen(value: string, locale: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(date);
}

export function ContactTicketChat() {
  const t = useI18n();
  const { locale } = useLocale();
  const c = t.contact.ticket;
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [ready, setReady] = useState(false);
  const [ticket, setTicket] = useState<PublicTicket | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTicket = useCallback(async (handle: StoredHandle) => {
    const response = await fetch(`/api/tickets/${handle.id}`, {
      cache: "no-store",
      headers: { "x-ticket-token": handle.token },
    });
    if (!response.ok) {
      writeHandle(null);
      setTicket(null);
      setToken(null);
      return false;
    }
    const data = (await response.json()) as PublicTicket;
    setTicket(data);
    setToken(handle.token);
    return true;
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const handle = readHandle();
      if (!handle) {
        setReady(true);
        return;
      }
      void loadTicket(handle).finally(() => setReady(true));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadTicket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [ticket?.messages.length]);

  useEffect(() => {
    if (!ticket || !token || ticket.status === "closed") {
      return;
    }
    const timer = window.setInterval(() => {
      void loadTicket({ id: ticket.id, token });
    }, 12_000);
    return () => window.clearInterval(timer);
  }, [ticket, token, loadTicket]);

  const onCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, locale }),
      });
      if (response.status === 429) {
        setError(c.rate);
        return;
      }
      if (!response.ok) {
        setError(c.invalid);
        return;
      }
      const data = (await response.json()) as { token: string; ticket: PublicTicket };
      writeHandle({ id: data.ticket.id, token: data.token });
      setToken(data.token);
      setTicket(data.ticket);
      setMessage("");
    } catch {
      setError(c.network);
    } finally {
      setBusy(false);
    }
  };

  const onReply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!ticket || !token) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, message: reply }),
      });
      if (response.status === 429) {
        setError(c.rate);
        return;
      }
      if (response.status === 409) {
        setError(c.closed);
        return;
      }
      if (!response.ok) {
        setError(c.network);
        return;
      }
      const data = (await response.json()) as PublicTicket;
      setTicket(data);
      setReply("");
    } catch {
      setError(c.network);
    } finally {
      setBusy(false);
    }
  };

  const onReset = () => {
    writeHandle(null);
    setTicket(null);
    setToken(null);
    setReply("");
    setError(null);
  };

  if (!ready) {
    return <p className="text-sm text-muted">{c.loading}</p>;
  }

  if (!ticket) {
    return (
      <section className="rounded-2xl border border-line bg-card/80 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-violet/15 text-glow">
            <MessageCircle className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-semibold text-ink">{c.title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted">{c.intro}</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onCreate}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs tracking-wide text-muted uppercase">{c.name}</span>
              <input
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-panel px-3 text-ink outline-none focus:border-signal"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1.5 block text-xs tracking-wide text-muted uppercase">{c.email}</span>
              <input
                required
                type="email"
                maxLength={120}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-xl border border-line bg-panel px-3 text-ink outline-none focus:border-signal"
              />
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1.5 block text-xs tracking-wide text-muted uppercase">{c.subject}</span>
            <input
              required
              minLength={3}
              maxLength={120}
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="h-11 w-full rounded-xl border border-line bg-panel px-3 text-ink outline-none focus:border-signal"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-xs tracking-wide text-muted uppercase">{c.message}</span>
            <textarea
              required
              minLength={5}
              maxLength={4000}
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="w-full rounded-xl border border-line bg-panel px-3 py-3 text-ink outline-none focus:border-signal"
            />
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="btn-brand inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold disabled:opacity-60"
          >
            <Send className="size-4" aria-hidden="true" />
            {busy ? c.sending : c.send}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-line bg-card/80 p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] tracking-wide text-muted uppercase">
            {c.ref} {ticket.id}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{ticket.subject}</h2>
          <p className="mt-1 text-sm text-muted">
            {c.statusLabel}: {c.status[ticket.status]}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:text-ink"
        >
          {c.newTicket}
        </button>
      </div>

      <div className="mt-5 max-h-[420px] space-y-3 overflow-y-auto rounded-xl border border-line bg-panel/50 p-4">
        {ticket.messages.map((item) => (
          <div
            key={item.id}
            className={cn("flex", item.author === "visitor" ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                item.author === "visitor" ? "bg-violet/20 text-ink" : "bg-card border border-line text-ink",
              )}
            >
              <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
                {item.author === "visitor" ? c.you : c.support} · {formatWhen(item.at, locale)}
              </p>
              <p className="mt-1 whitespace-pre-wrap">{item.body}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {ticket.status === "closed" ? (
        <p className="mt-4 text-sm text-muted">{c.closed}</p>
      ) : (
        <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={onReply}>
          <input
            required
            maxLength={4000}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            placeholder={c.replyPlaceholder}
            className="h-11 flex-1 rounded-xl border border-line bg-panel px-3 text-ink outline-none focus:border-signal"
          />
          <button
            type="submit"
            disabled={busy || !reply.trim()}
            className="btn-brand inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold disabled:opacity-60"
          >
            <Send className="size-4" aria-hidden="true" />
            {busy ? c.sending : c.reply}
          </button>
        </form>
      )}
      {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
    </section>
  );
}
