import type { Metadata } from "next";
import { site } from "./site";
import type { FaqItem } from "@/components/ui/Faq";
import type { Crumb } from "@/components/ui/Breadcrumbs";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.legalName,
      locale: "en_CA",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: `${site.url}/images/og.png`, width: 1200, height: 630, alt: site.legalName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const organizationSchema = {
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  founder: { "@type": "Person", name: site.founder, jobTitle: "Founder & CEO" },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Dubai" },
    { "@type": "AdministrativeArea", name: "UAE" },
    { "@type": "Country", name: "UAE" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: Object.values(site.social),
  knowsAbout: [
    "Search engine optimization",
    "AI search optimization",
    "Local SEO",
    "Google Business Profile",
    "Website design",
    "Web development",
    "Branding",
    "Content marketing",
  ],
};

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", href: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@type": "Service",
    name,
    description,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: " UAE" },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
}) {
  return {
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: `${site.url}${input.path}`,
    datePublished: input.date,
    dateModified: input.date,
    author: { "@type": "Person", name: input.author },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: `${site.url}${input.path}`,
  };
}
