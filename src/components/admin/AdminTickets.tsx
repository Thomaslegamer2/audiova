"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TicketSummary {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: "open" | "answered" | "closed";
  name: string;
  email: string;
  subject: string;
  locale: string;
  messageCount: number;
  lastAuthor: "visitor" | "admin" | null;
  lastPreview: string;
  awaitingAdmin: boolean;
}

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
  locale: string;
  messages: TicketMessage[];
}

function formatWhen(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return new Intl.DateTimeFormat("fr-FR", { dateStyle: "short", timeStyle: "short" }).format(date);
}

const statusLabel: Record<TicketSummary["status"], string> = {
  open: "Ouvert",
  answered: "Répondu",
  closed: "Fermé",
};

export function AdminTickets({ onUnauthorized }: { onUnauthorized: () => void }) {
  const [list, setList] = useState<TicketSummary[]>([]);
  const [awaitingCount, setAwaitingCount] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ticket, setTicket] = useState<PublicTicket | null>(null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadList = useCallback(async () => {
    const response = await fetch("/api/admin/tickets", { cache: "no-store" });
    if (response.status === 401) {
      onUnauthorized();
      return;
    }
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as {
      tickets: TicketSummary[];
      awaitingCount: number;
    };
    setList(data.tickets);
    setAwaitingCount(data.awaitingCount);
  }, [onUnauthorized]);

  const loadTicket = useCallback(
    async (id: string) => {
      const response = await fetch(`/api/admin/tickets/${id}`, { cache: "no-store" });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      if (!response.ok) {
        return;
      }
      setTicket((await response.json()) as PublicTicket);
      setSelectedId(id);
    },
    [onUnauthorized],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadList();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadList]);

  useEffect(() => {
    if (!selectedId) {
      return;
    }
    const timer = window.setInterval(() => {
      void loadTicket(selectedId);
      void loadList();
    }, 10_000);
    return () => window.clearInterval(timer);
  }, [selectedId, loadTicket, loadList]);

  const sendReply = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedId || !reply.trim()) {
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/tickets/${selectedId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reply", message: reply }),
      });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      if (!response.ok) {
        setMessage("Envoi impossible.");
        return;
      }
      setTicket((await response.json()) as PublicTicket);
      setReply("");
      await loadList();
      setMessage("Réponse envoyée.");
    } finally {
      setBusy(false);
    }
  };

  const setStatus = async (status: "open" | "answered" | "closed") => {
    if (!selectedId) {
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`/api/admin/tickets/${selectedId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", status }),
      });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      if (!response.ok) {
        return;
      }
      setTicket((await response.json()) as PublicTicket);
      await loadList();
    } finally {
      setBusy(false);
    }
  };

  const removeTicket = async () => {
    if (!selectedId || !window.confirm("Supprimer définitivement ce ticket ?")) {
      return;
    }
    const response = await fetch(`/api/admin/tickets/${selectedId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete" }),
    });
    if (response.status === 401) {
      onUnauthorized();
      return;
    }
    if (!response.ok) {
      return;
    }
    setSelectedId(null);
    setTicket(null);
    await loadList();
  };

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold">Tickets contact</h2>
          <p className="mt-1 text-sm text-muted">
            Messages envoyés depuis /contact. {awaitingCount} en attente de réponse.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void loadList()}
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:text-ink"
        >
          Actualiser
        </button>
      </div>

      {message ? <p className="mt-4 text-sm text-ok">{message}</p> : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="max-h-[70vh] overflow-y-auto rounded-2xl border border-line bg-card/80">
          {list.length === 0 ? (
            <p className="p-5 text-sm text-muted">Aucun ticket pour le moment.</p>
          ) : (
            <ul className="divide-y divide-line">
              {list.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => void loadTicket(item.id)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition",
                      selectedId === item.id ? "bg-violet/10" : "hover:bg-panel/60",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{item.subject}</span>
                      {item.awaitingAdmin ? (
                        <span className="rounded-full bg-signal/20 px-2 py-0.5 text-[10px] font-semibold text-glow uppercase">
                          Nouveau
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 truncate text-xs text-muted">
                      {item.name} · {statusLabel[item.status]} · {formatWhen(item.updatedAt)}
                    </p>
                    <p className="mt-1 truncate text-xs text-muted">{item.lastPreview}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <section className="rounded-2xl border border-line bg-card/80 p-5">
          {!ticket ? (
            <p className="text-sm text-muted">Sélectionnez un ticket pour répondre.</p>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {ticket.name} ·{" "}
                    <a className="text-glow hover:underline" href={`mailto:${ticket.email}`}>
                      {ticket.email}
                    </a>{" "}
                    · {ticket.locale} · {statusLabel[ticket.status]}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-muted">#{ticket.id}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void setStatus("open")}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs"
                  >
                    Rouvrir
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void setStatus("closed")}
                    className="rounded-lg border border-line px-3 py-1.5 text-xs"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => void removeTicket()}
                    className="rounded-lg border border-danger/40 px-3 py-1.5 text-xs text-danger"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="mt-5 max-h-[420px] space-y-3 overflow-y-auto rounded-xl border border-line bg-panel/40 p-4">
                {ticket.messages.map((item) => (
                  <div
                    key={item.id}
                    className={cn("flex", item.author === "admin" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                        item.author === "admin"
                          ? "bg-violet/20"
                          : "border border-line bg-card",
                      )}
                    >
                      <p className="text-[11px] font-medium tracking-wide text-muted uppercase">
                        {item.author === "admin" ? "Vous" : ticket.name} · {formatWhen(item.at)}
                      </p>
                      <p className="mt-1 whitespace-pre-wrap">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {ticket.status === "closed" ? (
                <p className="mt-4 text-sm text-muted">Ticket fermé. Rouvrez-le pour répondre.</p>
              ) : (
                <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={sendReply}>
                  <input
                    required
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Répondre au visiteur…"
                    className="h-11 flex-1 rounded-xl border border-line bg-panel px-3 text-ink outline-none focus:border-signal"
                  />
                  <button
                    type="submit"
                    disabled={busy || !reply.trim()}
                    className="btn-brand h-11 rounded-xl px-4 text-sm font-semibold disabled:opacity-60"
                  >
                    Envoyer
                  </button>
                </form>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
