"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { home } from "@/data/home";
import { ArrowIcon } from "@/components/ui/Button";
import styles from "./Bottlenecks.module.css";

const { bottlenecks } = home;

const PIN = 3600;
const SPLIT_AT = 455;
const SPLIT = 270;
const FIRST_FLY = 850;
const EVERY = 550;

const THROW_AT = 90;
const RETURN_AT = 30;
const STAGGER = 0.12;

// Where each card is thrown as the next one is read: translate %, tilt. A little under half of
// each thrown card stays in the frame, the way the reference leaves them peeking in.
const throws = [
  [55, -110, 20],
  [-55, 115, 20],
  [-90, -110, 17],
  [90, 115, -17],
  [-55, -110, -20],
  [0, 0, 0],
];

// One accent per signal, matching the service each one points to.
const accents = ["#dcefa6", "#d9f55c", "#d5edb6", "#e6f0a8", "#cfeebe", "#e4efb3"];

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

export function Bottlenecks() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(styles.static);
      return;
    }
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    const thrown = cards.map(() => false);
    const set = (name: string, value: string) => el.style.setProperty(name, value);
    let frame = 0;

    const update = () => {
      frame = 0;
      const travelled = Math.min(PIN, Math.max(0, -el.getBoundingClientRect().top));
      set("--split", clamp01((travelled - SPLIT_AT) / SPLIT).toFixed(4));
      const changed: number[] = [];
      // the last card stays on the pile
      for (let i = 0; i < cards.length - 1; i++) {
        const into = travelled - FIRST_FLY - i * EVERY;
        const next = into >= (thrown[i] ? RETURN_AT : THROW_AT);
        if (next !== thrown[i]) {
          thrown[i] = next;
          changed.push(i);
        }
      }
      // throws leave from the top of the pile, returns land back in reverse
      if (changed.length && !thrown[changed[0]]) changed.reverse();
      changed.forEach((i, k) => {
        cards[i].style.setProperty("--delay", `${k * STAGGER}s`);
        cards[i].style.setProperty("--fly", thrown[i] ? "1" : "0");
      });
      set("--count", String(thrown.filter(Boolean).length));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // The cover is drawn twice, one copy per half, so it can split down the middle like a photo.
  const cover = (heading: boolean) => (
    <div className={styles.cover}>
      <p className={styles.coverLabel}>
        <span className={styles.coverDot} aria-hidden="true" />
        Find the bottleneck
      </p>
      {heading ? (
        <h2 id="bottlenecks-title" className={styles.coverTitle}>
          {bottlenecks.title}
        </h2>
      ) : (
        <p className={styles.coverTitle}>{bottlenecks.title}</p>
      )}
      <div className={styles.coverText}>
        {bottlenecks.intro.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>
    </div>
  );

  return (
    <section aria-labelledby="bottlenecks-title">
      <div ref={wrap} className={styles.wrap}>
        <div className={styles.stage}>
          <div className={styles.inner}>
            <p className={styles.side}>(Signals)</p>

            <div className={styles.pile}>
              {bottlenecks.items.map((item, i) => (
                <article
                  key={item.q}
                  data-card
                  className={`${styles.card} ${i % 3 === 2 ? styles.cardDark : ""}`}
                  style={{
                    ["--z" as string]: bottlenecks.items.length - i,
                    ["--accent" as string]: accents[i],
                    ["--dx" as string]: `${throws[i][0]}%`,
                    ["--dy" as string]: `${throws[i][1]}%`,
                    ["--rz" as string]: `${throws[i][2]}deg`,
                  }}
                >
                  <span className={styles.cardGlow} aria-hidden="true" />
                  <div className={styles.cardTop}>
                    <span className={styles.cardPill}>
                      <span className={styles.cardMark} aria-hidden="true" />
                      Signal 0{i + 1}
                    </span>
                    <span className={styles.cardWatermark} aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.q}</h3>
                    <p className={styles.cardText}>{item.a}</p>
                    <Link href={item.href} className={styles.cardCta}>
                      <span>{item.cta}</span>
                      <span className={styles.cardCtaBadge} aria-hidden="true">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <p className={`${styles.side} ${styles.counter}`} aria-hidden="true">
              <span className={styles.counterWindow}>
                <span className={styles.counterRoll}>
                  {bottlenecks.items.map((item, i) => (
                    <span key={item.q}>0{i + 1}</span>
                  ))}
                </span>
              </span>
              /0{bottlenecks.items.length}
            </p>

            <p className={styles.more}>(Scroll for more)</p>
          </div>

          <div className={`${styles.half} ${styles.halfLeft}`}>{cover(true)}</div>
          <div className={`${styles.half} ${styles.halfRight}`} aria-hidden="true">
            {cover(false)}
          </div>
        </div>
      </div>

      <p className={`container ${styles.outro}`}>{bottlenecks.outro}</p>
    </section>
  );
}
