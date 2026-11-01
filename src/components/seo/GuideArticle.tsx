import Link from "next/link";
import { breadcrumbLd, howToLd, jsonLdScript } from "@/lib/seo/json-ld";
import type { GuidePage } from "@/lib/seo/guides";
import { GUIDE_PAGES } from "@/lib/seo/guides";

export function GuideArticle({ guide }: { guide: GuidePage }) {
  const steps = guide.sections.flatMap((section) => section.paragraphs).slice(0, 6);
  const schemas = [
    breadcrumbLd([
      { name: "Accueil", path: "/" },
      { name: "Guides", path: "/guides" },
      { name: guide.title, path: guide.href },
    ]),
    howToLd({
      name: guide.title,
      description: guide.description,
      steps: steps.length > 0 ? steps : [guide.intro],
      path: guide.href,
    }),
  ];
  const related = GUIDE_PAGES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      {schemas.map((schema) => (
        <script
          key={schema["@type"] as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(schema) }}
        />
      ))}
      <nav aria-label="Fil d’Ariane" className="text-xs text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-glow">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/guides" className="hover:text-glow">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-ink">{guide.title}</li>
        </ol>
      </nav>
      <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{guide.title}</h1>
      <p className="mt-5 text-base leading-7 text-muted">{guide.intro}</p>
      <div className="mt-10 space-y-10">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold text-ink">{section.heading}</h2>
            <div className="mt-4 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="mt-12 rounded-2xl border border-line bg-card/70 p-6">
        <Link href={guide.cta.href} className="btn-brand inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold">
          {guide.cta.label}
        </Link>
      </div>
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-ink">Autres guides</h2>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={item.href} className="text-sm text-glow hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
