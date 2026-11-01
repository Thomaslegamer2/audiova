import { NextResponse } from "next/server";
import { assertSameOrigin, isAdminAuthenticated } from "@/lib/admin/auth";
import { isSiteTheme, readSiteConfig, writeSiteTheme } from "@/lib/theme";

export async function GET() {
  // Thème public : nécessaire pour synchroniser l'apparence côté visiteurs.
  const config = await readSiteConfig();
  return NextResponse.json(config, {
    headers: { "Cache-Control": "no-store" },
  });
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

  const theme =
    typeof body === "object" && body && "theme" in body
      ? (body as { theme: unknown }).theme
      : null;

  if (!isSiteTheme(theme)) {
    return NextResponse.json({ error: "theme-invalid" }, { status: 400 });
  }

  const config = await writeSiteTheme(theme);
  return NextResponse.json(config);
}
