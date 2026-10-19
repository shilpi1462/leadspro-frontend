import type { CSSProperties } from "react";
import { serviceCategories } from "@/data/services";

export interface CategoryTheme {
  "data-cat": string;
  style: CSSProperties;
}

export function categoryTheme(slug: string | undefined): CategoryTheme | Record<string, never> {
  const cat = serviceCategories.find((c) => c.slug === slug);
  if (!cat) return {};
  const [a, b, c, d] = cat.flow;
  return {
    "data-cat": cat.slug,
    style: {
      ["--c-accent" as string]: cat.accent,
      ["--c-deep" as string]: cat.deep,
      ["--c-a" as string]: a,
      ["--c-b" as string]: b,
      ["--c-c" as string]: c,
      ["--c-d" as string]: d,
    },
  };
}

export const categoryAccentOf = (slug: string | undefined) =>
  serviceCategories.find((c) => c.slug === slug)?.accent;

export function categoryDot(slug: string | undefined): CSSProperties | undefined {
  const cat = serviceCategories.find((c) => c.slug === slug);
  if (!cat) return undefined;
  return { ["--dot" as string]: cat.accent, ["--dot-edge" as string]: cat.deep };
}
