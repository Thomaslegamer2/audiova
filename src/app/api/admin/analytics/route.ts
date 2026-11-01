import { NextResponse } from "next/server";
import { buildAnalyticsReport, exportAnalyticsCsv, type AnalyticsRange } from "@/lib/analytics/store";
import { assertSameOrigin, isAdminAuthenticated } from "@/lib/admin/auth";

const RANGES = new Set<AnalyticsRange>(["today", "yesterday", "7d", "30d", "90d", "365d"]);

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const rangeParam = url.searchParams.get("range") ?? "7d";
  const range = RANGES.has(rangeParam as AnalyticsRange) ? (rangeParam as AnalyticsRange) : "7d";
  const format = url.searchParams.get("format");

  if (format === "csv") {
    const csv = await exportAnalyticsCsv(range);
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="audiova-analytics-${range}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const report = await buildAnalyticsReport(range);
  return NextResponse.json(report, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!assertSameOrigin(request) || !(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return GET(request);
}
