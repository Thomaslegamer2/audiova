import type { MetadataRoute } from "next";
import { ADMIN_PATH } from "@/lib/admin/constants";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [ADMIN_PATH, "/api/admin/", "/api/analytics/", "/api/tickets/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
