import { NextResponse } from "next/server";
import { assertSameOrigin, isAdminAuthenticated } from "@/lib/admin/auth";
import { isLocale, locales, type Locale } from "@/i18n";
import { isSiteTheme } from "@/lib/theme-catalog";
import { readSiteConfig, writeSiteConfig } from "@/lib/site-config";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(await readSiteConfig(), { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
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
  const partial: Parameters<typeof writeSiteConfig>[0] = {};

  if ("theme" in record) {
    if (!isSiteTheme(record.theme)) {
      return NextResponse.json({ error: "theme-invalid" }, { status: 400 });
    }
    partial.theme = record.theme;
  }
  if ("adsEnabled" in record) partial.adsEnabled = record.adsEnabled === true;
  if ("analyticsEnabled" in record) partial.analyticsEnabled = record.analyticsEnabled === true;
  if ("urlImportEnabled" in record) partial.urlImportEnabled = record.urlImportEnabled === true;
  if ("discordEnabled" in record) partial.discordEnabled = record.discordEnabled === true;
  if ("localesEnabled" in record && Array.isArray(record.localesEnabled)) {
    const enabled = record.localesEnabled.filter((item): item is Locale => typeof item === "string" && isLocale(item));
    partial.localesEnabled = enabled.length > 0 ? enabled : [...locales];
  }

  const config = await writeSiteConfig(partial);
  return NextResponse.json(config);
}
