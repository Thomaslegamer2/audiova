import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { buildAdminStats } from "@/lib/admin/stats";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const stats = await buildAdminStats();
  return NextResponse.json(stats, {
    headers: { "Cache-Control": "no-store" },
  });
}
