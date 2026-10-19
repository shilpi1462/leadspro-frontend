export interface BlogCategory {
  slug: string;
  name: string;
  purpose: string;
  example: string;
}

export const blogCategories: BlogCategory[] = [
  {
    slug: "insights-guides",
    name: "Insights & Guides",
    purpose: "Normal SEO-focused educational blogs",
    example: "How Much Does SEO Cost in Canada?",
  },
  {
    slug: "research",
    name: "Research",
    purpose: "Original Goodfaith studies using collected data",
    example: "We Analyzed 100 Niagara Business Websites",
  },
  {
    slug: "experiments",
    name: "Experiments",
    purpose: "Things Goodfaith actually tests and measures",
    example: "We Tested AI SEO vs Traditional SEO for 90 Days",
  },
  {
    slug: "industry-insights",
    name: "Industry Insights",
    purpose: "Marketing analysis for specific industries",
    example: "What We Found Analyzing 50 Contractor Websites",
  },
];

export const blogCategoryBySlug = (slug: string) => blogCategories.find((c) => c.slug === slug);

export function readingTime(text: string): number {
  const words = text
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
