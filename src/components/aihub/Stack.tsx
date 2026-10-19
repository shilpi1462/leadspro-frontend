"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import styles from "./Stack.module.css";

export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const update = () => {
      frame = 0;
      items.forEach((item, i) => {
        const next = items[i + 1];
        const card = item.firstElementChild as HTMLElement | null;
        if (!next || !card) return;
        const a = item.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        card.style.transform = `scale(${1 - 0.25 * p})`;
        card.style.filter = p > 0.01 ? `blur(${7 * p}px)` : "";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className={`${styles.stack} ${className ?? ""}`}>
      {Children.map(children, (child) => (
        <li className={styles.item}>
          <div className={styles.card}>{child}</div>
        </li>
      ))}
    </ol>
  );
}
