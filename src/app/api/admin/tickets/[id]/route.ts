import { NextResponse } from "next/server";
import { assertSameOrigin, isAdminAuthenticated } from "@/lib/admin/auth";
import {
  appendMessage,
  deleteTicket,
  isTicketId,
  publicTicketView,
  readTicket,
  setTicketStatus,
  type TicketStatus,
} from "@/lib/tickets/store";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await context.params;
  if (!isTicketId(id)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  const ticket = await readTicket(id);
  if (!ticket) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  return NextResponse.json(publicTicketView(ticket), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!assertSameOrigin(request) || !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isTicketId(id)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const action = typeof record.action === "string" ? record.action : "reply";

  if (action === "status") {
    const status = record.status as TicketStatus;
    const result = await setTicketStatus(id, status);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.error === "not-found" ? 404 : 400 });
    }
    return NextResponse.json(publicTicketView(result));
  }

  if (action === "delete") {
    const ok = await deleteTicket(id);
    if (!ok) {
      return NextResponse.json({ error: "not-found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  const message = typeof record.message === "string" ? record.message : "";
  const result = await appendMessage(id, "admin", message);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "not-found" ? 404 : 400 });
  }
  return NextResponse.json(publicTicketView(result));
}
