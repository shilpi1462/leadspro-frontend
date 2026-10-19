"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import kit from "./kit.module.css";
import styles from "./SpiralBook.module.css";

export interface Spread {
  num: string;
  title: string;
  lead?: ReactNode;
  body: ReactNode;
}

interface SpiralBookProps {
  id?: string;
  title: ReactNode;
  spreads: Spread[];
}

// Scroll distance per page turn, as a share of the screen height.
const PER_TURN = 0.75;
// A page turns this far into its stretch and only turns back below BACK_AT, so it never flaps.
const TURN_AT = 0.3;
const BACK_AT = 0.12;
// The smallest the detail type may shrink to so a long page still fits on its paper.
const MIN_FIT = 0.78;

/* Shrinks the type of any page whose detail runs past the paper, page by page. */
function fitPages(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-fit]").forEach((body) => {
    body.style.setProperty("--fit", "1");
    const over = body.scrollHeight / body.clientHeight;
    if (over > 1) body.style.setProperty("--fit", String(Math.max(MIN_FIT, 1 / over)));
  });
}

export function SpiralBook({ id, title, spreads }: SpiralBookProps) {
  const ref = useRef<HTMLElement>(null);
  const [turned, setTurned] = useState(0);
  // the server renders the stacked sheets, which read fine without scripting; wide screens
  // switch to the pinned book once mounted
  const [flat, setFlat] = useState(true);
  const leaves = spreads.length - 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const narrow = window.matchMedia("(max-width: 899px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setFlat(narrow.matches || still.matches);
    decide();
    narrow.addEventListener("change", decide);

    let frame = 0;
    let count = 0;
    const update = () => {
      frame = 0;
      if (narrow.matches || still.matches) return;
      const travelled = -el.getBoundingClientRect().top;
      const turn = window.innerHeight * PER_TURN;
      let next = count;
      // walk forward or back one leaf at a time so fast scrolls still turn every page
      while (next < leaves && travelled >= (next + TURN_AT) * turn) next++;
      while (next > 0 && travelled < (next - 1 + BACK_AT) * turn) next--;
      if (next !== count) {
        count = next;
        setTurned(next);
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      narrow.removeEventListener("change", decide);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [leaves]);

  useEffect(() => {
    const el = ref.current;
    if (flat || !el) return;
    const fit = () => fitPages(el);
    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [flat]);

  const left = (s: Spread, i: number) => (
    <div className={styles.leftPage}>
      <span className={`${kit.script} ${styles.kicker}`}>
        Included · {s.num}/{String(spreads.length).padStart(2, "0")}
      </span>
      <span className={styles.bigNum} aria-hidden="true">
        <svg viewBox="0 0 120 96">
          <path d="M70 8C36 2 6 22 8 52c2 28 40 40 70 34 26-5 38-26 32-48C104 16 82 6 52 10" />
        </svg>
        {s.num}
      </span>
      <h3 className={`${kit.h3} ${styles.pageTitle}`}>
        <span>{s.title}</span>
      </h3>
      {s.lead && <div className={styles.lead}>{s.lead}</div>}
      <span className={styles.folio} aria-hidden="true">
        {i * 2 + 1}
      </span>
    </div>
  );

  const right = (s: Spread, i: number) => (
    <div className={styles.rightPage}>
      <div className={styles.body} data-fit>
        {s.body}
      </div>
      <span className={styles.folio} aria-hidden="true">
        {i * 2 + 2}
      </span>
    </div>
  );

  if (flat) {
    return (
      <section ref={ref} id={id} className={`${kit.section} ${styles.section}`}>
        <div className="container">
          <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{title}</h2>
          <ol className={styles.pad}>
            {spreads.map((s, i) => (
              <li key={s.num} className={styles.sheet}>
                <span className={styles.padSpiral} aria-hidden="true" />
                {left(s, i)}
                {right(s, i)}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.section} ${styles.pinned}`}
      style={{ ["--turns" as string]: leaves, ["--per" as string]: PER_TURN } as CSSProperties}
    >
      <div className={styles.stage}>
        <div className={styles.top}>
          <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{title}</h2>
          <span className={`${kit.script} ${styles.hint}`} aria-hidden="true">
            Scroll to turn the page
          </span>
        </div>

        <div className={styles.desk}>
          <div className={styles.book}>
            <div className={styles.cover} aria-hidden="true" />
            <div className={styles.base}>
              {left(spreads[0], 0)}
              {right(spreads[spreads.length - 1], spreads.length - 1)}
            </div>

            {spreads.slice(0, -1).map((s, k) => {
              const done = k < turned;
              return (
                <div
                  key={s.num}
                  className={`${styles.leaf} ${done ? styles.turned : ""}`}
                  style={
                    {
                      ["--k" as string]: k,
                      ["--z" as string]: done ? k + 1 : leaves - k + 1,
                    } as CSSProperties
                  }
                >
                  <div className={`${styles.face} ${styles.front}`}>{right(s, k)}</div>
                  <div className={`${styles.face} ${styles.back}`}>
                    {left(spreads[k + 1], k + 1)}
                  </div>
                </div>
              );
            })}

            <div className={styles.spiral} aria-hidden="true">
              {Array.from({ length: 13 }, (_, i) => (
                <i key={i} />
              ))}
            </div>
          </div>
        </div>

        <ol className={styles.tabs} aria-label="Pages">
          {spreads.map((s, i) => (
            <li
              key={s.num}
              className={i === turned ? styles.tabOn : undefined}
              aria-current={i === turned ? "page" : undefined}
            >
              <span>{s.num}</span>
              <b>{s.title}</b>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
