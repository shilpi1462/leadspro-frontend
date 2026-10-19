"use client";

import { useEffect, useRef, useState } from "react";
import type { FaqItem } from "@/components/ui/Faq";
import kit from "@/components/sections/kit.module.css";
import f from "./CardStackFaq.module.css";

export function CardStackFaq({ title, items }: { title: string; items: FaqItem[] }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const n = items.length;

  useEffect(() => {
    const fit = () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
      cards.forEach((c) => (c.style.height = ""));
      if (window.innerWidth < 1024) return;
      const tallest = Math.max(...cards.map((c) => c.offsetHeight));
      cards.forEach((c) => (c.style.height = `${tallest}px`));
      if (stageRef.current) stageRef.current.style.minHeight = `${tallest + 140}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const place = (i: number) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    const x = o * (o < 0 ? 24 : 20);
    const scale = i === active ? 1 : 0.95;
    const grow = hovered === i && i !== active ? " scale(1.05)" : "";
    return {
      zIndex: 100 - Math.abs(o),
      transform: `translateX(${x}px) translateY(${o * 35}px) translateZ(${-Math.abs(o) * 50}px) rotateZ(${o * 4}deg) rotateX(${o * 3}deg) scale(${scale})${grow}`,
    };
  };

  return (
    <section className={`${kit.section} ${kit.dark}`}>
      <div className={`container ${f.grid}`}>
        <div ref={stageRef} className={f.stage}>
          {items.map((item, i) => (
            <article
              key={item.q}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              id={`faq-card-${i + 1}`}
              className={`${f.card} ${i === active ? f.active : ""}`}
              style={place(i)}
              onClick={() => setActive(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={f.inner}>
                <span className={f.index}>Q{String(i + 1).padStart(2, "0")}</span>
                <h3 className={f.question}>{item.q}</h3>
                <p className={f.answer}>{item.a}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={f.side}>
          <h2 className={kit.h2}>{title}</h2>
          <ul className={f.list}>
            {items.map((item, i) => (
              <li key={item.q}>
                <button
                  type="button"
                  className={`${f.trigger} ${i === active ? f.on : ""}`}
                  aria-controls={`faq-card-${i + 1}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                >
                  <span>{item.q}</span>
                  <span className={f.arrow} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 19V5m-6 6 6-6 6 6" />
                    </svg>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
