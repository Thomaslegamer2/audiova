import Link from "next/link";
import { AdSlot } from "@/components/layout/AdSlot";
import { SupportBanner } from "@/components/layout/SupportBanner";
import { Converter } from "@/components/converter/Converter";
import { breadcrumbLd, faqPageLd, howToLd, jsonLdScript } from "@/lib/seo/json-ld";
import { liveTools, type ToolDefinition } from "@/lib/tools/registry";

export function ToolPage({
  tool,
  guide,
  faq,
  intro,
}: {
  tool: ToolDefinition;
  guide: string[];
  faq: Array<{ q: string; a: string }>;
  intro?: string;
}) {
  const related = liveTools()
    .filter((item) => item.id !== tool.id && item.href.startsWith("/outils/"))
    .slice(0, 4);

  const schemas = [
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Outils", path: "/outils" },
      { name: tool.title, path: tool.href },
    ]),
    howToLd({
      name: tool.title,
      description: tool.description,
      steps: guide,
      path: tool.href,
    }),
    faqPageLd(faq.map((item) => ({ question: item.q, answer: item.a }))),
  ];

  return (
    <main>
      {schemas.map((schema) => (
        <script
          key={String(schema["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}

      <section className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <nav aria-label="Fil d’Ariane" className="text-xs text-muted">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-glow">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/outils" className="hover:text-glow">
                Outils
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink">{tool.title}</li>
          </ol>
        </nav>
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">Outil Audiova</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{tool.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{tool.description}</p>
        {intro ? <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{intro}</p> : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#convertisseur"
            className="btn-brand inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold"
          >
            Ouvrir le convertisseur
          </a>
          <Link
            href="/outils"
            className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-sm font-medium text-muted hover:text-ink"
          >
            Tous les outils
          </Link>
          <Link
            href="/guides"
            className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-sm font-medium text-muted hover:text-ink"
          >
            Guides
          </Link>
        </div>
      </section>

      <Converter />
      <SupportBanner />
      <AdSlot placement="content" />

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 className="text-2xl font-semibold text-ink">Comment l’utiliser</h2>
        <ol className="mt-6 space-y-3">
          {guide.map((step, index) => (
            <li key={step} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="font-mono text-glow">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="text-2xl font-semibold text-ink">Questions fréquentes</h2>
        <div className="mt-6 space-y-4">
          {faq.map((item) => (
            <article key={item.q} className="rounded-2xl border border-line bg-card/70 p-5">
              <h3 className="text-base font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <h2 className="text-2xl font-semibold text-ink">Outils associés</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="block rounded-2xl border border-line bg-card/70 p-5 transition hover:border-violet/40"
              >
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm text-muted">{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
