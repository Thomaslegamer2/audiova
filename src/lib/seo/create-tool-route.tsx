import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tools/ToolPage";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { toolSeoFor } from "@/lib/seo/tool-pages";
import { toolBySlug } from "@/lib/tools/registry";

export function createToolRoute(slug: string) {
  const tool = toolBySlug(slug);
  if (!tool || tool.status !== "live" || !tool.href.startsWith("/outils/")) {
    throw new Error(`Outil SEO introuvable ou non indexable : ${slug}`);
  }
  const seo = toolSeoFor(tool);

  const metadata: Metadata = buildPageMetadata({
    title: seo.metaTitle,
    description: seo.metaDescription,
    path: tool.href,
    keywords: tool.keywords,
  });

  function Page() {
    const current = toolBySlug(slug);
    if (!current) {
      notFound();
    }
    return <ToolPage tool={current} guide={seo.guide} faq={seo.faq} intro={seo.intro} />;
  }

  return { metadata, Page };
}
