import Image from "next/image";
import type { Picture } from "@/data/images";
import { G } from "@/components/visuals/parts/glyphs";
import { Marquee } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import { glyphFor } from "./Hero";
import b from "./Brand.module.css";
import s from "./Stats.module.css";

interface StatsProps {
  title: string;
  quote?: string;
  picture: Picture;
  stats: { value: string; unit: string; label: string }[];
  chips: string[];
}

function Figure({ value }: { value: string }) {
  const m = value.match(/^([\d.,]+)(.*)$/);
  if (!m) return <>{value}</>;
  return (
    <>
      {m[1]}
      <span className={s.suffix}>{m[2]}</span>
    </>
  );
}

export function Stats({ title, quote, picture, stats, chips }: StatsProps) {
  const [lead, ...rows] = stats;
  return (
    <section className={b.spaceBottom}>
      <div className={`${b.medium} ${s.content}`}>
        <Rise className={s.grid}>
          <div {...item(0, s.left)}>
            <Image
              src={picture.src}
              alt={picture.alt}
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className={s.image}
            />
            <span className={s.overlay} aria-hidden="true" />
            <div className={s.leftInfo}>
              {quote && <p className={s.quote}>{quote}</p>}
              <h2 className={`${b.display} ${b.h2} ${s.leftTitle}`}>{title}</h2>
            </div>
          </div>
          <div {...item(1, s.right)}>
            <div className={s.caption}>
              <span className={b.preTitle}>By the numbers</span>
              <p className={`${b.display} ${s.count}`}>
                <Figure value={lead.value} />
              </p>
              <p className={s.description}>
                <b>{lead.unit}</b> — {lead.label}
              </p>
            </div>
            <div className={s.list}>
              {rows.map((row) => (
                <div key={row.label} className={s.row}>
                  <p
                    className={`${b.display} ${s.rowValue} ${row.value.length > 6 ? s.rowLong : ""}`}
                  >
                    <Figure value={row.value} />
                  </p>
                  <p className={s.rowLabel}>
                    {row.unit && <b>{row.unit} </b>}
                    {row.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Rise>
        {chips.length > 0 && (
          <Marquee fade className={s.marquee}>
            {chips.map((chip) => (
              <span key={chip} className={s.chip}>
                <span className={s.chipIcon}>
                  <G name={glyphFor(chip)} />
                </span>
                {chip}
              </span>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
