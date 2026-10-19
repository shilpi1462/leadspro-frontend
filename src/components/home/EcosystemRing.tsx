"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ringPictures } from "@/data/images";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./EcosystemRing.module.css";

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const inOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const out = (x: number) => 1 - Math.pow(1 - x, 3);
const sineInOut = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

const DELAY = 0.6; // trigger to cards start fanning out
const FAN = 0.8; // cards rotate into 30° steps and slide out to 17em
const EXPAND_AT = 1.85; // ...then push out to 22em
const EXPAND = 0.6;
const SPIN_AT = 2; // ring starts turning, 9°/s, and never stops
const SPIN = 9;
const LOOP_AT = 4.4; // flip cycle: pull in, flip over, push out, hold
const PERIOD = 5.5;
const PULL = 1.4;
const FLIP_AT = 0.45;
const FLIP = 1.3;
const PUSH_AT = 2;
const PUSH = 1.5;

function radius(t: number) {
  if (t < LOOP_AT) return t < EXPAND_AT ? 17 : 17 + 5 * out(clamp01((t - EXPAND_AT) / EXPAND));
  const c = (t - LOOP_AT) % PERIOD;
  if (c < PULL) return 22 - 5 * sineInOut(c / PULL);
  if (c < PUSH_AT) return 17;
  return 17 + 5 * sineInOut(clamp01((c - PUSH_AT) / PUSH));
}

function flip(t: number) {
  if (t < LOOP_AT) return 0;
  const cycle = Math.floor((t - LOOP_AT) / PERIOD);
  const c = (t - LOOP_AT) % PERIOD;
  const from = cycle % 2 ? 180 : 0;
  return from + (180 - 2 * from) * out(clamp01((c - FLIP_AT) / FLIP));
}

export function EcosystemRing({ title, id }: { title: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = (name: string, value: string) => el.style.setProperty(name, value);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set("--open", "1");
      set("--r", "22em");
      return;
    }

    let frame = 0;
    let startedAt = 0;
    let visible = false;

    const tick = (now: number) => {
      frame = 0;
      if (!startedAt) {
        if (el.getBoundingClientRect().top < window.innerHeight - 250) startedAt = now;
        else return;
      }
      const t = (now - startedAt) / 1000;
      const open = inOut(clamp01((t - DELAY) / FAN));
      set("--open", open.toFixed(4));
      set("--r", `${(radius(t) * open).toFixed(3)}em`);
      set("--flip", `${flip(t).toFixed(2)}deg`);
      set("--turn", `${(Math.max(0, t - SPIN_AT) * SPIN).toFixed(2)}deg`);
      if (visible) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Only animate while on screen; the clock keeps running so nothing snaps on return.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    io.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} id={id} className={styles.box}>
      <div className={styles.wrapper} aria-hidden="true">
        {ringPictures.map((p, i) => (
          <div key={p.src} className={styles.item} style={{ ["--i" as string]: i }}>
            <div className={styles.card}>
              <Image src={p.src} alt="" width={p.width} height={p.height} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
      <SplitText as="h2" id="process-title" className={styles.title} text={title} />
    </div>
  );
}
