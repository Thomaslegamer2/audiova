import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

export type AnalyticsEventName =
  | "pageview"
  | "session_start"
  | "conversion_ok"
  | "conversion_fail"
  | "url_import_ok"
  | "url_import_fail";

export interface IncomingAnalyticsEvent {
  name: AnalyticsEventName;
  path?: string;
  referrer?: string;
  locale?: string;
  formatIn?: string;
  formatOut?: string;
  bytes?: number;
  durationMs?: number;
  errorCode?: string;
}

interface DayBucket {
  date: string;
  pageviews: number;
  sessions: number;
  visitors: string[];
  conversionsOk: number;
  conversionsFail: number;
  urlImportsOk: number;
  urlImportsFail: number;
  paths: Record<string, number>;
  referrers: Record<string, number>;
  locales: Record<string, number>;
  browsers: Record<string, number>;
  devices: Record<string, number>;
  countries: Record<string, number>;
  formatsOut: Record<string, number>;
  formatsIn: Record<string, number>;
  bytesTotal: number;
  conversionDurationMsTotal: number;
  conversionDurationCount: number;
}

const DIR = path.join(process.cwd(), "data", "analytics");

function dayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

function emptyDay(date: string): DayBucket {
  return {
    date,
    pageviews: 0,
    sessions: 0,
    visitors: [],
    conversionsOk: 0,
    conversionsFail: 0,
    urlImportsOk: 0,
    urlImportsFail: 0,
    paths: {},
    referrers: {},
    locales: {},
    browsers: {},
    devices: {},
    countries: {},
    formatsOut: {},
    formatsIn: {},
    bytesTotal: 0,
    conversionDurationMsTotal: 0,
    conversionDurationCount: 0,
  };
}

function bump(map: Record<string, number>, key: string, amount = 1) {
  const safe = key.slice(0, 120) || "unknown";
  map[safe] = (map[safe] ?? 0) + amount;
}

export function hashVisitor(raw: string): string {
  return createHash("sha256").update(raw).digest("hex").slice(0, 24);
}

export function parseBrowser(ua: string): string {
  const value = ua.toLowerCase();
  if (value.includes("edg/")) return "Edge";
  if (value.includes("chrome/") && !value.includes("edg/")) return "Chrome";
  if (value.includes("firefox/")) return "Firefox";
  if (value.includes("safari/") && !value.includes("chrome/")) return "Safari";
  return "Autre";
}

export function parseDevice(ua: string): string {
  const value = ua.toLowerCase();
  if (/ipad|tablet/.test(value)) return "Tablette";
  if (/mobi|iphone|android/.test(value)) return "Mobile";
  return "Ordinateur";
}

export function classifyReferrer(referrer: string | undefined, siteHost: string): string {
  if (!referrer) return "Direct";
  try {
    const host = new URL(referrer).hostname.toLowerCase();
    if (host === siteHost || host.endsWith(`.${siteHost}`)) return "Interne";
    if (host.includes("google.")) return "Google";
    if (host.includes("bing.")) return "Bing";
    if (host.includes("duckduckgo.")) return "DuckDuckGo";
    if (/facebook|instagram|twitter|x\.com|tiktok|linkedin|reddit/.test(host)) return "Réseaux sociaux";
    return host;
  } catch {
    return "Direct";
  }
}

async function readDay(date: string): Promise<DayBucket> {
  try {
    const raw = await readFile(path.join(DIR, `${date}.json`), "utf8");
    const parsed = JSON.parse(raw) as DayBucket;
    return { ...emptyDay(date), ...parsed, visitors: parsed.visitors ?? [] };
  } catch {
    return emptyDay(date);
  }
}

async function writeDay(bucket: DayBucket): Promise<void> {
  await mkdir(DIR, { recursive: true });
  await writeFile(path.join(DIR, `${bucket.date}.json`), `${JSON.stringify(bucket)}\n`, "utf8");
}

export async function recordAnalyticsEvent(input: {
  event: IncomingAnalyticsEvent;
  visitorId: string;
  userAgent: string;
  country?: string;
  siteHost: string;
  isNewSession?: boolean;
}): Promise<void> {
  const date = dayKey();
  const bucket = await readDay(date);
  const { event } = input;

  if (!bucket.visitors.includes(input.visitorId)) {
    bucket.visitors.push(input.visitorId);
    if (bucket.visitors.length > 5000) {
      bucket.visitors = bucket.visitors.slice(-5000);
    }
  }

  if (event.name === "pageview") {
    bucket.pageviews += 1;
    bump(bucket.paths, event.path ?? "/");
    bump(bucket.referrers, classifyReferrer(event.referrer, input.siteHost));
    bump(bucket.locales, event.locale ?? "fr");
    bump(bucket.browsers, parseBrowser(input.userAgent));
    bump(bucket.devices, parseDevice(input.userAgent));
    if (input.country) {
      bump(bucket.countries, input.country.toUpperCase());
    }
  }

  if (event.name === "session_start" || input.isNewSession) {
    bucket.sessions += 1;
  }

  if (event.name === "conversion_ok") {
    bucket.conversionsOk += 1;
    if (event.formatOut) bump(bucket.formatsOut, event.formatOut);
    if (event.formatIn) bump(bucket.formatsIn, event.formatIn);
    if (typeof event.bytes === "number" && event.bytes > 0) {
      bucket.bytesTotal += event.bytes;
    }
    if (typeof event.durationMs === "number" && event.durationMs > 0) {
      bucket.conversionDurationMsTotal += event.durationMs;
      bucket.conversionDurationCount += 1;
    }
  }

  if (event.name === "conversion_fail") {
    bucket.conversionsFail += 1;
  }

  if (event.name === "url_import_ok") {
    bucket.urlImportsOk += 1;
  }

  if (event.name === "url_import_fail") {
    bucket.urlImportsFail += 1;
  }

  await writeDay(bucket);
}

export type AnalyticsRange = "today" | "yesterday" | "7d" | "30d" | "90d" | "365d";

function rangeDates(range: AnalyticsRange): string[] {
  const dates: string[] = [];
  const end = new Date();
  let days = 1;
  if (range === "yesterday") {
    end.setUTCDate(end.getUTCDate() - 1);
    days = 1;
  } else if (range === "7d") days = 7;
  else if (range === "30d") days = 30;
  else if (range === "90d") days = 90;
  else if (range === "365d") days = 365;
  else days = 1;

  for (let i = 0; i < days; i += 1) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    dates.push(dayKey(d));
  }
  return dates.reverse();
}

function topEntries(map: Record<string, number>, limit = 8) {
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, value]) => ({ name, value }));
}

export async function buildAnalyticsReport(range: AnalyticsRange) {
  const dates = rangeDates(range);
  const series: Array<{ date: string; pageviews: number; sessions: number; conversionsOk: number }> = [];
  const visitors = new Set<string>();
  let pageviews = 0;
  let sessions = 0;
  let conversionsOk = 0;
  let conversionsFail = 0;
  let urlImportsOk = 0;
  let urlImportsFail = 0;
  let bytesTotal = 0;
  let durationTotal = 0;
  let durationCount = 0;
  const paths: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const locales: Record<string, number> = {};
  const browsers: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const formatsOut: Record<string, number> = {};
  const formatsIn: Record<string, number> = {};

  for (const date of dates) {
    const day = await readDay(date);
    pageviews += day.pageviews;
    sessions += day.sessions;
    conversionsOk += day.conversionsOk;
    conversionsFail += day.conversionsFail;
    urlImportsOk += day.urlImportsOk;
    urlImportsFail += day.urlImportsFail;
    bytesTotal += day.bytesTotal;
    durationTotal += day.conversionDurationMsTotal;
    durationCount += day.conversionDurationCount;
    for (const id of day.visitors) visitors.add(id);
    for (const [k, v] of Object.entries(day.paths)) bump(paths, k, v);
    for (const [k, v] of Object.entries(day.referrers)) bump(referrers, k, v);
    for (const [k, v] of Object.entries(day.locales)) bump(locales, k, v);
    for (const [k, v] of Object.entries(day.browsers)) bump(browsers, k, v);
    for (const [k, v] of Object.entries(day.devices)) bump(devices, k, v);
    for (const [k, v] of Object.entries(day.countries)) bump(countries, k, v);
    for (const [k, v] of Object.entries(day.formatsOut)) bump(formatsOut, k, v);
    for (const [k, v] of Object.entries(day.formatsIn)) bump(formatsIn, k, v);
    series.push({
      date,
      pageviews: day.pageviews,
      sessions: day.sessions,
      conversionsOk: day.conversionsOk,
    });
  }

  const totalConversions = conversionsOk + conversionsFail;

  return {
    range,
    generatedAt: new Date().toISOString(),
    totals: {
      visitors: visitors.size,
      sessions,
      pageviews,
      conversionsOk,
      conversionsFail,
      urlImportsOk,
      urlImportsFail,
      successRate: totalConversions === 0 ? null : Math.round((conversionsOk / totalConversions) * 1000) / 10,
      avgFileBytes: conversionsOk === 0 ? null : Math.round(bytesTotal / Math.max(1, conversionsOk)),
      avgConversionMs: durationCount === 0 ? null : Math.round(durationTotal / durationCount),
    },
    series,
    top: {
      paths: topEntries(paths),
      referrers: topEntries(referrers),
      locales: topEntries(locales),
      browsers: topEntries(browsers),
      devices: topEntries(devices),
      countries: topEntries(countries),
      formatsOut: topEntries(formatsOut),
      formatsIn: topEntries(formatsIn),
    },
  };
}

export async function exportAnalyticsCsv(range: AnalyticsRange): Promise<string> {
  const report = await buildAnalyticsReport(range);
  const lines = ["date,pageviews,sessions,conversionsOk"];
  for (const row of report.series) {
    lines.push(`${row.date},${row.pageviews},${row.sessions},${row.conversionsOk}`);
  }
  return `${lines.join("\n")}\n`;
}

export async function listAnalyticsFiles(): Promise<string[]> {
  try {
    const names = await readdir(DIR);
    return names.filter((name) => name.endsWith(".json")).sort();
  } catch {
    return [];
  }
}
