"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "./Up";
import styles from "./LineRow.module.css";

export function LineRow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref);
  return (
    <div ref={ref} className={`${styles.row} ${shown ? styles.in : ""} ${className ?? ""}`}>
      <span className={`${styles.side} ${styles.left}`} aria-hidden="true">
        <i />
      </span>
      <div className={styles.buttons}>{children}</div>
      <span className={`${styles.side} ${styles.right}`} aria-hidden="true">
        <i />
      </span>
    </div>
  );
}
