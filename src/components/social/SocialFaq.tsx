"use client";

import { useId, useState, type ReactNode } from "react";
import s from "./Social.module.css";
import q from "./SocialFaq.module.css";

interface SocialFaqProps {
  title: string;
  items: { id: string; question: string; answer: ReactNode }[];
}

export function SocialFaq({ title, items }: SocialFaqProps) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();

  return (
    <section className={s.section}>
      <div className={s.container}>
        <h2 className={`${s.h2} ${q.title}`}>{title}</h2>
        <div className={q.grid}>
          {items.map((item) => {
            const isOpen = open === item.id;
            const panel = `${base}-${item.id}`;
            return (
              <div key={item.id} id={item.id} className={`${q.item} ${isOpen ? q.open : ""}`}>
                <h3 className={q.q}>
                  <button
                    type="button"
                    className={q.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className={q.box} aria-hidden="true">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" className={q.content} inert={!isOpen}>
                  <div className={q.inner}>{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
