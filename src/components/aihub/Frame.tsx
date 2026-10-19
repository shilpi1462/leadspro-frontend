"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "./Up";
import styles from "./Frame.module.css";

export function Frame({
  children,
  hang = false,
  className,
}: {
  children: ReactNode;
  hang?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref);
  return (
    <div
      ref={ref}
      className={`${styles.frame} ${hang ? styles.hang : ""} ${shown ? styles.in : ""} ${className ?? ""}`}
    >
      {children}
      <span className={`${styles.corner} ${styles.topLeft}`} aria-hidden="true">
        <i />
      </span>
      <span className={`${styles.corner} ${styles.bottomRight}`} aria-hidden="true">
        <i />
      </span>
    </div>
  );
}
