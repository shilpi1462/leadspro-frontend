"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./CaseTabs.module.css";

export interface CaseTab {
  slug: string;
  name: string;
  detail: ReactNode;
  visual: ReactNode;
}

export function CaseTabs({ tabs }: { tabs: CaseTab[] }) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fromHash = () => {
      const i = tabs.findIndex((t) => `#${t.slug}` === window.location.hash);
      if (i === -1) return;
      setActive(i);
      root.current?.scrollIntoView({ block: "start" });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const tab = tabs[active];
  return (
    <div ref={root} className={styles.wrap}>
      <div className={styles.list} role="tablist" aria-label="Case studies">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            id={t.slug}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="case-panel"
            className={`${styles.tab} ${i === active ? styles.current : ""}`}
            onClick={() => {
              setActive(i);
              history.replaceState(null, "", `#${t.slug}`);
            }}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div
        id="case-panel"
        role="tabpanel"
        aria-labelledby={tab.slug}
        className={styles.panel}
        key={tab.slug}
      >
        <div className={styles.detail}>{tab.detail}</div>
        <div className={styles.visual}>{tab.visual}</div>
      </div>
    </div>
  );
}
