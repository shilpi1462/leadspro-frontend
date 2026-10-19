"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./StageDeck.module.css";

export interface StageCard {
  key: string;
  n: string;
  name: string;
  accent: string;
  front: ReactNode;
}

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const seg = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));
const outCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const inOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const outBack = (x: number) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2);

// Timing of the deal, in milliseconds.
const DURATION = 1900; // one card: out of the ring, through the air, face up
const STAGGER = 180; // gap between cards in the same row
const TRIGGER = 0.85; // a row is dealt once its top passes 85% of the viewport height

export function StageDeck({ ringId, cards }: { ringId: string; cards: StageCard[] }) {
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const ring = document.getElementById(ringId);
    if (!list || !ring || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const slots = [...list.children] as HTMLElement[];
    const flyers = slots.map((s) => s.firstElementChild as HTMLElement);
    const startAt: (number | null)[] = slots.map(() => null);
    const done = slots.map(() => false);
    let frame = 0;

    const land = (i: number) => {
      done[i] = true;
      flyers[i].style.cssText = "";
      flyers[i].dataset.state = "landed";
      flyers[i].dataset.face = "front";
      slots[i].style.removeProperty("--o");
    };

    // Rows of slots, left to right, from their current positions.
    const rows = (rects: DOMRect[]) => {
      const byTop = new Map<number, number[]>();
      rects.forEach((r, i) => {
        const key = [...byTop.keys()].find((t) => Math.abs(t - r.top) < 4) ?? r.top;
        byTop.set(key, [...(byTop.get(key) ?? []), i]);
      });
      return [...byTop.values()];
    };

    // Anything already above the trigger line when the page opens has simply landed; the rest
    // wait out of sight in the middle of the ring.
    const first = slots.map((s) => s.getBoundingClientRect());
    first.forEach((r, i) => {
      if (r.top < window.innerHeight * TRIGGER) land(i);
      else {
        slots[i].style.setProperty("--o", "0");
        flyers[i].dataset.state = "waiting";
      }
    });

    const pose = (
      i: number,
      f: number,
      r: DOMRect,
      ox: number,
      oy: number,
      vh: number,
      spread: number,
    ) => {
      const el = flyers[i];
      el.dataset.state = "flying";

      let dx = ox - (r.left + r.width / 2);
      let dy = oy - (r.top + r.height / 2);
      // A stacked phone layout puts later cards a long way below the ring; cap the flight.
      const far = Math.hypot(dx, dy);
      const max = vh * 0.85;
      if (far > max) {
        dx *= max / far;
        dy *= max / far;
      }

      const show = outCubic(seg(f, 0, 0.16));
      const fly = seg(f, 0.12, 0.72);
      const turn = seg(f, 0.7, 1);

      const x = dx * (1 - outCubic(fly));
      const y = dy * (1 - inOutCubic(fly)) - Math.sin(Math.PI * fly) * vh * 0.07;
      // Small while it leaves the ring, grows through the flight with a slight overshoot,
      // then breathes up a touch as it turns over.
      const scale =
        turn > 0
          ? 1 + 0.04 * Math.sin(Math.PI * turn)
          : fly > 0
            ? 0.3 + 0.7 * outBack(fly)
            : 0.16 + 0.14 * show;
      const tumble = 360 * (1 - inOutCubic(fly));
      const swing = spread * 16 * (1 - outCubic(fly)) + Math.sin(fly * Math.PI * 2) * 4 * (1 - fly);
      const face = 180 * (1 - inOutCubic(turn));
      const lift = Math.sin(Math.PI * turn);

      // Which side is towards the viewer: the card's normal ends up with z = cos(rx)·cos(ry).
      // Set explicitly because backface-visibility is unreliable once a face holds links.
      const rad = Math.PI / 180;
      el.dataset.face = Math.cos(tumble * rad) * Math.cos(face * rad) >= 0 ? "front" : "back";

      el.style.setProperty("--x", `${x.toFixed(1)}px`);
      el.style.setProperty("--y", `${y.toFixed(1)}px`);
      el.style.setProperty("--s", scale.toFixed(4));
      el.style.setProperty("--rx", `${tumble.toFixed(2)}deg`);
      el.style.setProperty("--rz", `${swing.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${face.toFixed(2)}deg`);
      el.style.setProperty("--z", `${(lift * 90).toFixed(1)}px`);
      el.style.setProperty("--shadow", (0.28 * (1 - turn) * show + lift * 0.12).toFixed(3));
      // The fade lives on the slot: opacity on the turning element would flatten its 3D.
      slots[i].style.setProperty("--o", show.toFixed(3));

      return Math.sin(Math.PI * seg(f, 0, 0.34));
    };

    const tick = (now: number) => {
      frame = 0;
      const vh = window.innerHeight;
      const rr = ring.getBoundingClientRect();
      const ox = rr.left + rr.width / 2;
      const oy = rr.top + rr.height / 2;
      const rects = slots.map((s) => s.getBoundingClientRect());
      let burst = 0;
      let active = false;

      for (const row of rows(rects)) {
        row.forEach((i, col) => {
          if (done[i]) return;
          // Arm the row the first time it crosses the line; after that the clock runs it.
          if (startAt[i] === null) {
            if (rects[row[0]].top < vh * TRIGGER) startAt[i] = now + col * STAGGER;
            else return;
          }
          const f = clamp01((now - (startAt[i] as number)) / DURATION);
          if (f >= 1) return land(i);
          active = true;
          burst = Math.max(
            burst,
            pose(i, f, rects[i], ox, oy, vh, row.length > 1 ? col - (row.length - 1) / 2 : 0),
          );
        });
      }

      ring.style.setProperty("--burst", burst.toFixed(3));
      if (active) frame = requestAnimationFrame(tick);
      if (done.every(Boolean)) {
        ring.style.removeProperty("--burst");
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    if (!done.every(Boolean)) {
      schedule();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    }
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      ring.style.removeProperty("--burst");
    };
  }, [ringId]);

  return (
    <ol ref={listRef} className={styles.deck}>
      {cards.map((card) => (
        <li key={card.key} className={styles.slot} style={{ ["--accent" as string]: card.accent }}>
          <div className={styles.flyer}>
            <div className={`${styles.face} ${styles.front}`}>{card.front}</div>
            <div className={`${styles.face} ${styles.back}`} aria-hidden="true">
              <span className={styles.backStage}>(Stage - {card.n})</span>
              <span className={styles.backMark}>
                <span className={styles.backDiamond} />
              </span>
              <span className={styles.backName}>{card.name}</span>
              <span className={styles.backNum}>{card.n}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
