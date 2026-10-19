"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function StickyStack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rects = cards.map((c) => c.getBoundingClientRect());
      rects.forEach((rect, i) => {
        let covered = 0;
        for (let j = i + 1; j < rects.length; j++) {
          covered += Math.min(1, Math.max(0, (rect.bottom - rects[j].top) / rect.height));
        }
        cards[i].style.setProperty("--shrink", Math.max(0.55, 1 - 0.18 * covered).toFixed(4));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={ref} className={className}>
      {children}
    </ol>
  );
}
