import type { MetadataRoute } from "next";
import { site, routes } from "@/lib/site";
import { getServiceSlugs } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });

  return [
    entry("/", 1),
    ...getServiceSlugs().map((s) => entry(`/services/${s}/`, 0.9)),
    entry(routes.industry, 0.8),
    entry(routes.portfolio, 0.8),
    entry(routes.blog, 0.8),
    entry(routes.aiHub, 0.7),
    entry(routes.hedge, 0.7),
  ];
}
