import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/seo/GuideArticle";
import { GUIDE_PAGES, guideBySlug } from "@/lib/seo/guides";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return GUIDE_PAGES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) {
    return {};
  }
  return buildPageMetadata({
    title: guide.title,
    description: guide.description,
    path: guide.href,
    keywords: guide.keywords,
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) {
    notFound();
  }
  return (
    <main>
      <GuideArticle guide={guide} />
    </main>
  );
}
