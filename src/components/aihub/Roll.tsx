"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "./Up";
import styles from "./Roll.module.css";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function Roll({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useInView(ref);
  return (
    <span ref={ref} className={`${styles.roll} ${shown ? styles.in : ""} ${className ?? ""}`}>
      <span className={styles.label}>{value}</span>
      {Array.from(value).map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className={styles.window} aria-hidden="true">
            {/* sizes the window to the final digit, so "15" doesn't sit as wide as "88" */}
            <span className={styles.sizer}>{ch}</span>
            <span className={styles.column} style={{ "--n": ch } as CSSProperties}>
              {DIGITS.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
