import type { Metadata } from "next";
import Link from "next/link";
import { fr } from "@/i18n/fr";
import { faqPageLd, jsonLdScript } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ convertisseur MP3",
  description:
    "Questions fréquentes sur Audiova : conversion locale, débits MP3, limites de fichiers, import par lien et formats supportés.",
  path: "/faq",
  keywords: ["faq mp3", "convertisseur audio questions", "audiova aide"],
});

export default function FaqPage() {
  const items = fr.faq.items.map((item) => ({
    question: item.question,
    answer: item.answer.join(" "),
  }));

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageLd(items)) }}
      />
      <h1 className="text-4xl font-semibold tracking-[-0.03em] text-ink">{fr.faq.title}</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        Réponses claires sur le fonctionnement d’Audiova. Pour convertir un fichier, ouvrez le{" "}
        <Link href="/#convertisseur" className="text-glow hover:underline">
          convertisseur
        </Link>
        .
      </p>
      <div className="mt-10 space-y-8">
        {fr.faq.items.map((item) => (
          <article key={item.question}>
            <h2 className="text-xl font-semibold text-ink">{item.question}</h2>
            <div className="mt-3 space-y-3">
              {item.answer.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
