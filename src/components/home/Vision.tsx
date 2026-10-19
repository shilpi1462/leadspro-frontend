"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Vision.module.css";

const statements = ["Easier to find.", "Easier to trust.", "Easier to choose."];

// Pinned "(Our Vision)" section: statements swap as the user scrolls through it.
export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setIndex(Math.min(statements.length - 1, Math.floor(progress * statements.length)));
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
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-label="Our vision">
      <div className={styles.sticky}>
        <span className={styles.label}>(Our Vision)</span>
        <div className={styles.stage} aria-live="polite">
          {statements.map((s, i) => (
            <p
              key={s}
              className={`${styles.statement} ${i === index ? styles.active : ""} ${i < index ? styles.past : ""}`}
            >
              {s.split("").map((ch, c) => (
                <span key={c} className={styles.letter} style={{ ["--c" as string]: c }}>
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </p>
          ))}
        </div>
        <span className={styles.label}>(Scroll for more)</span>
      </div>
    </section>
  );
}
