import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/layout/AdSlot";
import { TOOL_REGISTRY } from "@/lib/tools/registry";

export const metadata: Metadata = {
  title: "Outils audio en ligne",
  description:
    "Convertisseurs WAV, FLAC, M4A, OGG, MP4 vers MP3 et extraction audio. Outils Audiova gratuits dans le navigateur.",
  alternates: { canonical: "/outils" },
  openGraph: {
    title: "Outils audio en ligne — Audiova",
    description: "Convertisseurs MP3 et extraction audio. Conversion locale dans le navigateur.",
    url: "/outils",
  },
};

export default function ToolsHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink">Outils Audiova</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Convertissez et préparez vos fichiers multimédias dans le navigateur. Les outils marqués « disponible » sont opérationnels.
        Les autres sont annoncés uniquement lorsqu’ils seront réellement prêts.
      </p>
      <AdSlot placement="content" />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {TOOL_REGISTRY.map((tool) => (
          <li key={tool.id}>
            <Link
              href={tool.status === "live" ? tool.href : "/outils"}
              className="block h-full rounded-2xl border border-line bg-card/80 p-6 transition hover:border-violet/40"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">{tool.title}</h2>
                <span className="rounded-full bg-panel px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted uppercase">
                  {tool.status === "live" ? "Disponible" : "Bientôt"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{tool.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
