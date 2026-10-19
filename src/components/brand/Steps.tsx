"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Glyph } from "@/components/visuals/parts/glyphs";
import { G } from "@/components/visuals/parts/glyphs";
import { useScrollDriven } from "@/components/social/scroll";
import b from "./Brand.module.css";
import t from "./Steps.module.css";

interface StepsProps {
  id: string;
  pre: string;
  title: string;
  lead?: ReactNode;
  steps: { label: string; text: string; icon: Glyph }[];
  after?: ReactNode;
}

const TONES = [t.lime, t.sage, t.green, t.cream, t.ink];

export function Steps({ id, pre, title, lead, steps, after }: StepsProps) {
  const blurRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const words = title.split(" ");
  const last = words.pop();

  const sectionRef = useScrollDriven<HTMLElement>(
    (progress) => {
      const wide = window.innerWidth >= 992;
      const blur = wide ? Math.min(1, Math.max(0, progress * 3 - 1)) : 0;
      const info = wide ? 1 - Math.min(1, Math.max(0, progress * 3 - 2)) : 1;
      if (blurRef.current) blurRef.current.style.opacity = blur.toFixed(3);
      if (infoRef.current) infoRef.current.style.opacity = info.toFixed(3);
    },
    { range: "pin-centre", scrub: 0.8 },
  );

  return (
    <section ref={sectionRef} id={id} className={t.section}>
      <div className={b.container}>
        <div className={t.top}>
          <div ref={infoRef} className={t.info}>
            <span className={b.preTitle}>{pre}</span>
            <h2 className={`${b.display} ${t.title}`}>
              {words.join(" ")} <span className={b.highlight}>{last}</span>
            </h2>
            {lead && <div className={t.lead}>{lead}</div>}
          </div>
          <div ref={blurRef} className={t.blur} aria-hidden="true" />
        </div>

        <ol className={t.grid} style={{ ["--n" as string]: steps.length } as CSSProperties}>
          {steps.map((step, i) => (
            <li
              key={step.label}
              className={t.item}
              style={{ ["--k" as string]: i } as CSSProperties}
            >
              <div className={`${t.card} ${TONES[i % TONES.length]}`}>
                <div className={t.tab}>
                  S/{i + 1}
                  <span className={t.notchLeft} aria-hidden="true" />
                  <span className={t.notchRight} aria-hidden="true" />
                </div>
                <div className={t.body}>
                  <div className={t.ui}>
                    <span className={t.uiIcon}>
                      <G name={step.icon} />
                    </span>
                    <span className={t.uiText}>
                      <small>
                        Step {i + 1} of {steps.length}
                      </small>
                      {step.text}
                    </span>
                  </div>
                  <h3 className={t.cardTitle}>{step.label}</h3>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Outside the pinned block, so the heading's blur never sits on top of it. */}
      {after && <div className={`${b.container} ${t.after}`}>{after}</div>}
    </section>
  );
}
