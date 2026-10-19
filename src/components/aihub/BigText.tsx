"use client";

import { useEffect, useRef } from "react";
import styles from "./BigText.module.css";

const STAGGER = 0.05;
const DURATION = 0.5;

export function BigText({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const chars = Array.from(el.querySelectorAll<HTMLElement>("[data-c]"));
    const mid = (chars.length - 1) / 2;
    const offsets = chars.map((_, i) => Math.abs(i - mid) * STAGGER);
    const total = DURATION + Math.max(...offsets);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chars.forEach((c) => (c.style.cssText = "opacity:1;transform:none"));
      return;
    }

    let shown = 0;
    let target = 0;
    let last = performance.now();
    let frame = 0;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // top of the word at 75% of the screen to its middle at the middle of the screen
      const from = vh * 0.75;
      const to = vh * 0.5 - r.height / 2;
      target = Math.min(1, Math.max(0, (from - r.top) / (from - to)));
    };

    const paint = () => {
      const t = shown * total;
      chars.forEach((c, i) => {
        const p = Math.min(1, Math.max(0, (t - offsets[i]) / DURATION));
        c.style.opacity = String(p);
        c.style.transform = `translate3d(0, ${(1 - p) * 25}%, 0)`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      shown += (target - shown) * (1 - Math.exp(-dt / (0.8 / 3)));
      if (Math.abs(target - shown) < 0.0005) shown = target;
      paint();
      frame = shown === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    measure();
    shown = target;
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={styles.text} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} data-c className={styles.char}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </div>
  );
}
