"use client";

import { useState, type ReactNode } from "react";
import { Inline } from "@/components/service/Inline";
import { G } from "@/components/visuals/parts/glyphs";
import { TertiaryButton } from "./Buttons";
import s from "./Social.module.css";
import p from "./Plans.module.css";

interface PlansProps {
  id?: string;
  title: ReactNode;
  /** [typical, LeadsPro] column names. */
  head: string[];
  rows: string[][];
  cta: { label: string; href: string };
}

function Slide({ first, second }: { first: ReactNode; second: ReactNode }) {
  return (
    <span className={p.window}>
      <span className={p.slide}>
        <span>{first}</span>
        <span aria-hidden="true">{second}</span>
      </span>
    </span>
  );
}

export function Plans({ id, title, head, rows, cta }: PlansProps) {
  const [LeadsPro, setLeadsPro] = useState(true);
  const [typicalName, LeadsProName] = head;
  const cards = [0, 1, 2].map((c) => rows.slice(c * 2, c * 2 + 2)).filter((r) => r.length);

  return (
    <section id={id} className={`${s.section} ${LeadsPro ? "" : p.typical}`}>
      <div className={s.container}>
        <div className={p.headRow}>
          <h2 className={`${s.h2} ${p.title}`}>{title}</h2>
          <div className={p.toggle}>
            <span className={p.toggleText}>{typicalName}</span>
            <button
              type="button"
              role="switch"
              aria-checked={LeadsPro}
              aria-label={`Show the ${LeadsPro ? typicalName : LeadsProName}`}
              className={p.switch}
              onClick={() => setLeadsPro((v) => !v)}
            >
              <span className={p.indicator} />
            </button>
            <span className={p.toggleText}>{LeadsProName}</span>
          </div>
        </div>

        <div className={p.grid}>
          {cards.map((pair, c) => (
            <div key={c} className={`${p.card} ${c === 1 ? p.wide : ""}`}>
              <div>
                <div className={p.label}>
                  <Slide first={LeadsProName} second={typicalName} />
                </div>
                <div className={p.separator} />
                <ul className={p.rows}>
                  {pair.map((row) => (
                    <li key={row.join("|")} className={p.row}>
                      <span className={p.icon} aria-hidden="true">
                        <G name="check" />
                        <span className={p.cross}>✕</span>
                      </span>
                      <Slide first={<Inline text={row[1]} />} second={<Inline text={row[0]} />} />
                      <span className={p.visuallyHidden}>
                        {typicalName}: {row[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {c === 1 && (
                <TertiaryButton href={cta.href} className={p.button}>
                  {cta.label}
                </TertiaryButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
