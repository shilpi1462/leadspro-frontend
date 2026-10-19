import type { CSSProperties } from "react";
import s from "./Brand.module.css";

/** Props for one staggered child of a <Rise>: it rises 0.2 s after the one before. */
export const item = (i: number, className?: string) => ({
  className: [s.item, className].filter(Boolean).join(" "),
  style: { ["--i" as string]: i } as CSSProperties,
});
