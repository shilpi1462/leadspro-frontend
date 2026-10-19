"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/motion";
import styles from "./StatCards.module.css";

interface Stat {
  value: string;
  unit?: string;
  label: string;
}

interface StatCardsProps {
  /** Years, clients, connected expertise, the three About figures. */
  stats: Stat[];
  /** A reported result for the tall right-hand card. */
  proof: { value: string; label: string; note: string };
  reach: { title: string; text: string; places: string[] };
}

const vars = (v: Record<string, string | number>) => v as CSSProperties;

export function StatCards({ stats, proof, reach }: StatCardsProps) {
  const ref = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [years, clients, expertise] = stats;
  const disciplines = expertise.value.split(" + ");
  const shown = reach.places.slice(0, 6);

  return (
    <div ref={ref} className={styles.wrap}>
      <article className={`${styles.card} ${styles.tall} ${styles.forest}`}>
        <div className={styles.head}>
          <Roll value={years.value} />
          <span className={styles.tag}>{years.unit}</span>
        </div>
        <div className={styles.copy}>
          <h3 className={styles.title}>{years.label}</h3>
        </div>
      </article>

      <div className={styles.middle}>
        <article className={`${styles.card} ${styles.plain}`}>
          <div className={styles.copy}>
            <h3 className={styles.titleSm}>{expertise.label}</h3>
            <p className={styles.text}>{expertise.value}</p>
          </div>
          <ul className={styles.icons} aria-label={expertise.value}>
            {disciplines.map((d, i) => (
              <li key={d} style={vars({ "--k": i })} title={d}>
                <Glyph name={d} />
              </li>
            ))}
          </ul>
        </article>

        <article className={`${styles.card} ${styles.ink}`}>
          <Roll value={clients.value} />
          <div className={styles.copy}>
            <h3 className={styles.title}>{clients.unit}</h3>
            <p className={styles.text}>{clients.label}</p>
          </div>
        </article>
      </div>

      <article className={`${styles.card} ${styles.tallRight} ${styles.night}`}>
        <Roll value={proof.value} />
        <div className={styles.copy}>
          <h3 className={styles.title}>{proof.label}</h3>
          <p className={styles.text}>{proof.note}</p>
        </div>
      </article>

      <article className={`${styles.card} ${styles.plain} ${styles.wide}`}>
        <div className={styles.copy}>
          <h3 className={styles.titleSm}>{reach.title}</h3>
          <p className={styles.text}>{reach.text}</p>
        </div>
        <ul className={styles.places} aria-label={reach.places.join(", ")}>
          {shown.map((p, i) => (
            <li key={p} style={vars({ "--k": i })} title={p}>
              {initials(p)}
            </li>
          ))}
          <li className={styles.more}>+{reach.places.length - shown.length}</li>
        </ul>
      </article>
    </div>
  );
}

const initials = (place: string) =>
  place
    .split(/[\s-]+/)
    .filter((w) => /^[A-Z]/.test(w))
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

function Roll({ value }: { value: string }) {
  const match = /^([\d.]+)(.*)$/.exec(value);
  if (!match) return <p className={styles.figure}>{value}</p>;
  let col = 0;
  return (
    <p className={styles.figure}>
      <span className={styles.sr}>{value}</span>
      <span className={styles.digits} aria-hidden="true">
        {match[1].split("").map((ch, i) => {
          if (ch === ".") return <span key={i}>.</span>;
          const target = Number(ch);
          const up = col % 2 === 0;
          const k = col++;
          // the other nine digits to spin past: up columns start on 0 and end on the figure,
          // down columns hold the figure on top and start from 0 at the bottom
          const others = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((d) => d !== target);
          const list = up ? [...others, target] : [target, ...others.reverse()];
          return (
            <span key={i} className={styles.window}>
              <span className={styles.sizer}>{target}</span>
              <span
                className={`${styles.reel} ${up ? styles.up : styles.down}`}
                style={vars({ "--k": k })}
              >
                {list.map((d, j) => (
                  <span key={j}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
        <span className={styles.suffix}>{match[2]}</span>
      </span>
    </p>
  );
}

function Glyph({ name }: { name: string }) {
  const paths: Record<string, string> = {
    SEO: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm5-2 4.5 4.5",
    AI: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z",
    Web: "M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm0 3h16M7 6.5h.01M9.5 6.5h.01",
    Brand:
      "M12 21a9 9 0 1 1 9-9c0 2.2-1.8 3-3.5 3H16a2 2 0 0 0-1.4 3.4c.6.6.2 2.6-2.6 2.6zM7.5 12.5h.01M9.5 8h.01M14.5 8h.01",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? paths.AI} />
    </svg>
  );
}
