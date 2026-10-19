"use client";

import { Fragment, type ElementType } from "react";
import { useScrollProgress } from "@/lib/motion";
import styles from "./ScrollText.module.css";

interface ScrollTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** "green" (light blocks): each word darkens from pale grey into evergreen as it is reached.
      "lime" (dark blocks): each word warms from dim grey into lime. */
  tone?: "green" | "lime";
  /** A phrase from the text that gets a lime highlighter swept under it as it lights up. */
  mark?: string;
}

export function ScrollText({ text, as: Tag = "p", className, id, tone, mark }: ScrollTextProps) {
  const ref = useScrollProgress<HTMLElement>();
  const words = text.split(" ");
  const marked = mark ? mark.split(" ") : [];
  const markAt = marked.length
    ? words.findIndex((_, i) => marked.every((m, k) => words[i + k] === m))
    : -1;
  const isMarked = (i: number) => markAt !== -1 && i >= markAt && i < markAt + marked.length;

  return (
    <Tag
      ref={ref}
      id={id}
      className={[styles.text, tone && styles[tone], className].filter(Boolean).join(" ")}
      style={{ ["--words" as string]: words.length }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span
            className={isMarked(i) ? `${styles.word} ${styles.marked}` : styles.word}
            style={{ ["--i" as string]: i }}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
