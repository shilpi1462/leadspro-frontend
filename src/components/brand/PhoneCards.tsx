import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { G } from "@/components/visuals/parts/glyphs";
import { Inline } from "@/components/service/Inline";
import { Marquee } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import { glyphFor } from "./Hero";
import b from "./Brand.module.css";
import p from "./PhoneCards.module.css";

interface PhoneCardsProps {
  id: string;
  title: string;
  intro?: ReactNode;
  rows: { label: string; items: string[] }[];
  outro?: ReactNode;
  handle?: string;
}

const SWATCHES = [p.s1, p.s2, p.s3, p.s4];

export function PhoneCards({
  id,
  title,
  intro,
  rows,
  outro,
  handle = "yourbusiness",
}: PhoneCardsProps) {
  return (
    <section id={id} className={p.section}>
      <Rise className={`${b.small} ${p.caption}`}>
        <h2 {...item(0, `${b.display} ${b.h2} ${b.center}`)}>{title}</h2>
        {intro && <div {...item(1, p.intro)}>{intro}</div>}
      </Rise>

      <div className={p.content}>
        <div className={p.rows}>
          {rows.map((row, r) => (
            <Marquee key={r} right={r % 2 === 1} fade className={p.marquee}>
              {row.items.map((text) => (
                <article key={text} className={p.card}>
                  <span className={p.cardLabel}>
                    <span className={p.cardIcon}>
                      <G name={glyphFor(row.label + " " + text)} />
                    </span>
                    {row.label}
                  </span>
                  <p className={p.cardText}>
                    <Inline text={text} />
                  </p>
                </article>
              ))}
            </Marquee>
          ))}
        </div>

        <div className={p.phone} aria-hidden="true">
          <PhoneFrame className={p.frame}>
            <div className={p.screen}>
              <div className={p.profile}>
                <span className={p.logo} />
                <b>{handle}</b>
                <small>Brand system</small>
              </div>
              <div className={p.swatches}>
                {SWATCHES.map((cls, i) => (
                  <i key={i} className={cls} />
                ))}
              </div>
              <div className={p.type}>
                <span>Aa</span>
                <span>
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className={p.tiles}>
                <span className={p.tileDark}>
                  <span className={p.logo} />
                </span>
                <span className={p.tileLime}>
                  <span className={p.logo} />
                </span>
                <span className={p.tileLight}>
                  <span className={p.logo} />
                </span>
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>

      {outro && <div className={`${b.small} ${p.outro}`}>{outro}</div>}
    </section>
  );
}
