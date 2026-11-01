import type { Metadata } from "next";
import Link from "next/link";
import { GUIDE_PAGES } from "@/lib/seo/guides";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Guides conversion audio MP3",
  description:
    "Guides Audiova : convertir en MP3, choisir un débit, extraction audio vidéo, conversion locale et confidentialité.",
  path: "/guides",
  keywords: ["guide mp3", "convertir audio", "débit mp3", "extraire audio"],
});

export default function GuidesHubPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink">Guides Audiova</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Articles pratiques pour convertir, compresser et comprendre la qualité audio — sans jargon inutile.
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {GUIDE_PAGES.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={guide.href}
              className="block h-full rounded-2xl border border-line bg-card/80 p-6 transition hover:border-violet/40"
            >
              <h2 className="text-lg font-semibold text-ink">{guide.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{guide.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-muted">
        Besoin de convertir tout de suite ?{" "}
        <Link href="/outils" className="text-glow hover:underline">
          Voir tous les outils
        </Link>
        .
      </p>
    </main>
  );
}
