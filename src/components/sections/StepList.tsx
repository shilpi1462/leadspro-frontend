"use client";

import Image from "next/image";
import { useId, useState, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import styles from "./StepList.module.css";

export interface Step {
  num: string;
  title: string;
  content: ReactNode;
  picture: Picture;
}

interface StepListProps {
  steps: Step[];
  tone?: "dark" | "light";
}

export function StepList({ steps, tone = "light" }: StepListProps) {
  const [open, setOpen] = useState(0);
  const base = useId();

  return (
    <div className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`}>
      <ol className={styles.list}>
        {steps.map((step, i) => {
          const active = i === open;
          return (
            <li key={step.num} className={`${styles.step} ${active ? styles.active : ""}`}>
              <button
                type="button"
                className={styles.head}
                aria-expanded={active}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(i)}
              >
                <span className={styles.title}>{step.title}</span>
                <span className={styles.num}>{step.num}</span>
              </button>
              <div id={`${base}-${i}`} className={styles.panel} role="region">
                {step.content}
                <span className={styles.bar} aria-hidden="true" />
              </div>
            </li>
          );
        })}
      </ol>

      <div className={styles.media} aria-hidden="true">
        {steps.map((step, i) => (
          <Image
            key={step.num}
            src={step.picture.src}
            alt=""
            width={step.picture.width}
            height={step.picture.height}
            sizes="(min-width: 900px) 42vw, 92vw"
            className={i === open ? styles.shown : undefined}
          />
        ))}
      </div>
    </div>
  );
}
