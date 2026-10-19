"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ProcessTimeline.module.css";

export interface ProcessStep {
  title: string;
  content: ReactNode;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  note?: ReactNode;
}

export function ProcessTimeline({ steps, note }: ProcessTimelineProps) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const stops = [...root.querySelectorAll<HTMLElement>("[data-stop]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const middle = window.innerHeight / 2;
      const percent = Math.min(100, Math.max(0, ((middle - rect.top) / rect.height) * 100));
      root.style.setProperty("--fill", `${percent}%`);
      for (const stop of stops) {
        const r = stop.getBoundingClientRect();
        stop.closest("li")?.classList.toggle(styles.active, r.top + r.height / 2 <= middle);
      }
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
    <div className={styles.wrap}>
      {note && <div className={styles.note}>{note}</div>}
      <ol ref={ref} className={styles.list}>
        {steps.map((step, i) => (
          <li key={i} className={`${styles.step} ${i % 2 ? styles.left : styles.right}`}>
            <span className={styles.stop} data-stop aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.card}>
              <span className={styles.chip}>Step {String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <div className={styles.body}>{step.content}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
