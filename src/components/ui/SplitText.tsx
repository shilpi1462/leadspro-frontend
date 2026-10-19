"use client";

import { Fragment, type ElementType } from "react";
import { useInView } from "@/lib/motion";
import styles from "./SplitText.module.css";

interface SplitTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Headings already on screen at first paint play on load instead of on scroll. */
  immediate?: boolean;
}

export function SplitText({ text, as: Tag = "span", className, id, immediate }: SplitTextProps) {
  const ref = useInView<HTMLElement>();
  const words = text.split(" ");

  return (
    <Tag
      ref={immediate ? undefined : ref}
      id={id}
      className={[styles.split, immediate ? styles.immediate : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className={styles.mask}>
            <span className={styles.word} style={{ ["--i" as string]: i }}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
