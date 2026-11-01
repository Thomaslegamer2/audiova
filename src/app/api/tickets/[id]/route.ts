import { NextResponse } from "next/server";
import {
  appendMessage,
  isTicketId,
  publicTicketView,
  readTicketForVisitor,
} from "@/lib/tickets/store";
import { consumeTicketMessage } from "@/lib/tickets/rate-limit";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

function readToken(request: Request, body?: Record<string, unknown>): string {
  const header = request.headers.get("x-ticket-token")?.trim() ?? "";
  if (header) {
    return header;
  }
  const url = new URL(request.url);
  const query = url.searchParams.get("token")?.trim() ?? "";
  if (query) {
    return query;
  }
  return typeof body?.token === "string" ? body.token.trim() : "";
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!isTicketId(id)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  const token = readToken(request);
  const ticket = await readTicketForVisitor(id, token);
  if (!ticket) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }
  return NextResponse.json(publicTicketView(ticket), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!isTicketId(id)) {
    return NextResponse.json({ error: "not-found" }, { status: 404 });
  }

  const ip = clientIp(request);
  if (!consumeTicketMessage(ip)) {
    return NextResponse.json({ error: "rate" }, { status: 429 });
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
  const token = readToken(request, record);
  const message = typeof record.message === "string" ? record.message : "";
  const result = await appendMessage(id, "visitor", message, { token });

  if ("error" in result) {
    const status =
      result.error === "not-found"
        ? 404
        : result.error === "forbidden"
          ? 403
          : result.error === "closed"
            ? 409
            : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(publicTicketView(result));
}
