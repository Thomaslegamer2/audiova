import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { liveTools } from "@/lib/tools/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const tools = liveTools()
    .filter((tool) => tool.href.startsWith("/outils"))
    .map((tool) => ({
      url: `${site}${tool.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    { url: `${site}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/outils`, changeFrequency: "weekly", priority: 0.9 },
    ...tools,
    { url: `${site}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/legal`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
