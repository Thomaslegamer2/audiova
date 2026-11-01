import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { listTickets } from "@/lib/tickets/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const tickets = await listTickets();
  return NextResponse.json(
    {
      tickets,
      openCount: tickets.filter((ticket) => ticket.status !== "closed").length,
      awaitingCount: tickets.filter((ticket) => ticket.awaitingAdmin).length,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
