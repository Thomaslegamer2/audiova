import { describe, expect, it } from "vitest";
import { isTicketId, isTicketToken, toSummary, type Ticket } from "@/lib/tickets/store";

describe("ticket helpers", () => {
  it("validates ids and tokens", () => {
    expect(isTicketId("a1b2c3d4e5f67890")).toBe(true);
    expect(isTicketId("short")).toBe(false);
    expect(isTicketToken("abcdefghijklmnopqrstuvwx")).toBe(true);
    expect(isTicketToken("too-short")).toBe(false);
  });

  it("flags awaiting admin when last message is from visitor", () => {
    const ticket: Ticket = {
      id: "a1b2c3d4e5f67890",
      token: "abcdefghijklmnopqrstuvwxyzABCDEF",
      createdAt: "2026-01-01T00:00:00.000Z",
      updatedAt: "2026-01-01T00:01:00.000Z",
      status: "open",
      name: "Alex",
      email: "alex@example.com",
      subject: "Help",
      locale: "fr",
      messages: [
        {
          id: "m1",
          at: "2026-01-01T00:00:00.000Z",
          author: "visitor",
          body: "Bonjour",
        },
      ],
    };
    expect(toSummary(ticket).awaitingAdmin).toBe(true);
    ticket.messages.push({
      id: "m2",
      at: "2026-01-01T00:02:00.000Z",
      author: "admin",
      body: "Salut",
    });
    ticket.status = "answered";
    expect(toSummary(ticket).awaitingAdmin).toBe(false);
  });
});
