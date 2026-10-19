"use client";

import { useScrollProgress } from "@/lib/motion";
import styles from "./FloatBadges.module.css";

const glyphs = {
  search: (
    <>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13 13l4.5 4.5" />
    </>
  ),
  pin: (
    <>
      <path d="M11 18s6-5.2 6-9a6 6 0 1 0-12 0c0 3.8 6 9 6 9z" />
      <circle cx="11" cy="9" r="2.2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 16V9M9.5 16V5M15 16v-4" />
      <path d="M3 19h16" />
    </>
  ),
  spark: <path d="M11 3l1.9 5.5L18 10l-5.1 1.5L11 17l-1.9-5.5L4 10l5.1-1.5z" />,
  chat: (
    <>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h9A2.5 2.5 0 0 1 18 6.5v5A2.5 2.5 0 0 1 15.5 14H9l-4 3.5V14a1 1 0 0 1-1-1z" />
    </>
  ),
  star: <path d="M11 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4L3.2 9.2l5.4-.8z" />,
};

type Glyph = keyof typeof glyphs;

const order: Glyph[] = ["search", "pin", "chart", "spark", "chat", "star"];
const tones = ["sky", "violet", "amber", "aqua", "pink", "lime"];

export function FloatBadges({ seed, centered }: { seed: string; centered?: boolean }) {
  const ref = useScrollProgress<HTMLDivElement>("cross");
  const start = [...seed].reduce((n, c) => n + c.charCodeAt(0), 0) % order.length;
  const picks = Array.from({ length: 4 }, (_, i) => order[(start + i) % order.length]);

  return (
    <div
      ref={ref}
      className={`${styles.floats} ${centered ? styles.centered : ""}`}
      aria-hidden="true"
    >
      {picks.map((glyph, i) => (
        <span
          key={glyph}
          className={`${styles.badge} ${styles[`b${i + 1}`]} ${styles[tones[(start + i) % tones.length]]}`}
        >
          <svg
            viewBox="0 0 22 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {glyphs[glyph]}
          </svg>
        </span>
      ))}
    </div>
  );
}
