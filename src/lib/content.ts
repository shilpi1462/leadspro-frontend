import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { FaqItem } from "@/components/ui/Faq";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Frontmatter {
  title: string;
  seoTitle: string;
  description: string;
  subtitle?: string;
  flow?: string;
  flowLabel?: string;
  cta?: { primary?: string; secondary?: string };
  faqs?: FaqItem[];
  faqTitle?: string;
  order?: number;
  category?: string;
  date?: string;
  author?: string;
}

export interface Entry {
  slug: string;
  data: Frontmatter;
  body: string;
}

function readEntry(file: string, slug: string): Entry {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { slug, data: data as Frontmatter, body: content };
}

function listSlugs(dir: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readOne(dir: string, slug: string): Entry | null {
  const file = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
  return fs.existsSync(file) ? readEntry(file, slug) : null;
}

// "Technical SEO Services" -> "Technical SEO" for navigation and breadcrumbs
export const serviceShortTitle = (title: string) =>
  title
    .replace(/ Services$/, "")
    .replace(/^AI SEO & AI Search Optimization$/, "AI SEO (AIO, AEO & GEO)")
    .replace(/^Google Business Profile Reinstatement/, "GBP Reinstatement");

export const getServiceSlugs = () => listSlugs("services");
export const getService = (slug: string) => readOne("services", slug);
export const getServices = () =>
  getServiceSlugs()
    .map((slug) => getService(slug) as Entry)
    .sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));

export const getPage = (slug: string) => readOne("pages", slug);

export const getPostSlugs = () => listSlugs("posts");
export const getPost = (slug: string) => readOne("posts", slug);
export const getPosts = () =>
  getPostSlugs()
    .map((slug) => getPost(slug) as Entry)
    .sort((a, b) => (b.data.date ?? "").localeCompare(a.data.date ?? ""));

export interface SplitBody {
  main: string;
  closing: { title: string; body: string } | null;
}

export function splitClosing(body: string): SplitBody {
  const match = body.match(/<Closing title="((?:[^"\\]|\\.)*)">([\s\S]*?)<\/Closing>\s*$/);
  if (!match) return { main: body, closing: null };
  return {
    main: body.slice(0, match.index).trimEnd() + "\n",
    closing: { title: JSON.parse(`"${match[1]}"`), body: match[2].trim() },
  };
}

export interface Chapter {
  id: string;
  title: string;
  body: string;
}

export const chapterId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function splitChapters(body: string): { intro: string; chapters: Chapter[] } {
  const [intro, ...rest] = `\n${body}`.split(/\n## /);
  return {
    intro: intro.trim(),
    chapters: rest.map((part) => {
      const br = part.indexOf("\n");
      const title = (br === -1 ? part : part.slice(0, br)).trim();
      return { id: chapterId(title), title, body: br === -1 ? "" : part.slice(br + 1).trim() };
    }),
  };
}
