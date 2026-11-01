import type { MetadataRoute } from "next";
import { GUIDE_PAGES } from "@/lib/seo/guides";
import { getSiteUrl } from "@/lib/site";
import { liveTools } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const tools = liveTools()
    .filter((tool) => tool.href.startsWith("/outils/"))
    .map((tool) => ({
      url: `${site}${tool.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }));

  const guides = GUIDE_PAGES.map((guide) => ({
    url: `${site}${guide.href}`,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [
    { url: `${site}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/outils`, changeFrequency: "weekly", priority: 0.95 },
    ...tools,
    { url: `${site}/guides`, changeFrequency: "weekly", priority: 0.9 },
    ...guides,
    { url: `${site}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site}/contact`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${site}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
