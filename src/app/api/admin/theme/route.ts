import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { resolveAutomaticTheme, themeLabel } from "@/lib/theme-catalog";
import { readSiteConfig } from "@/lib/theme";

export async function GET() {
  const config = await readSiteConfig();
  const theme = resolveAutomaticTheme();
  return NextResponse.json(
    {
      ...config,
      theme,
      mode: "automatic",
      label: themeLabel(theme),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

/** Sélection manuelle retirée — le thème suit le calendrier. */
export async function POST() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    {
      error: "theme-automatic",
      message: "Le thème est automatique (calendrier Europe/Paris). Aucune sélection manuelle.",
      theme: resolveAutomaticTheme(),
    },
    { status: 405 },
  );
}
