import { NextResponse } from "next/server";
import { createTicket, publicTicketView } from "@/lib/tickets/store";
import { consumeTicketCreate } from "@/lib/tickets/rate-limit";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") ?? "local";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!consumeTicketCreate(ip)) {
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
  const result = await createTicket({
    name: typeof record.name === "string" ? record.name : "",
    email: typeof record.email === "string" ? record.email : "",
    subject: typeof record.subject === "string" ? record.subject : "",
    body: typeof record.message === "string" ? record.message : "",
    locale: typeof record.locale === "string" ? record.locale : "fr",
  });

  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(
    {
      token: result.token,
      ticket: publicTicketView(result),
    },
    { status: 201 },
  );
}
