"use client";

import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import styles from "./JourneyTabs.module.css";

export interface Journey {
  slug: string;
  label: string;
  icon: ReactNode;
  picture?: Picture;
  /** A UI scene in place of the photo. */
  visual?: ReactNode;
  content: ReactNode;
}

export function JourneyTabs({ journeys }: { journeys: Journey[] }) {
  const [active, setActive] = useState(0);
  const current = journeys[active];

  useEffect(() => {
    const fromHash = () => {
      const i = journeys.findIndex((j) => `#${j.slug}` === window.location.hash);
      if (i !== -1) setActive(i);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [journeys]);

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Customer journeys">
        {journeys.map((j, i) => (
          <button
            key={j.slug}
            id={j.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="journey-panel"
            className={`${styles.tab} ${i === active ? styles.current : ""}`}
            onClick={() => setActive(i)}
          >
            <span className={styles.icon}>{j.icon}</span>
            {j.label}
          </button>
        ))}
      </div>

      <div
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={current.slug}
        className={styles.panel}
        key={current.slug}
      >
        {current.visual ? (
          <div className={`${styles.media} ${styles.staged}`}>{current.visual}</div>
        ) : (
          current.picture && (
            <div className={styles.media}>
              <Image
                src={current.picture.src}
                alt=""
                width={current.picture.width}
                height={current.picture.height}
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </div>
          )
        )}
        <div className={styles.content}>{current.content}</div>
      </div>
    </div>
  );
}
