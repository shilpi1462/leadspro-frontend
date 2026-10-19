"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { clamp01, crossProgress, reducedMotion } from "./scroll";
import f from "./FillQuote.module.css";

/** More rows than any quote here needs; the extra ones sit below the text and are clipped. */
const ROWS = 12;

export function FillQuote({ text, children }: { text: ReactNode; children?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const veils = Array.from(wrap.querySelectorAll<HTMLElement>("[data-veil]"));
    if (reducedMotion()) {
      veils.forEach((v) => (v.style.width = "0%"));
      return;
    }

    const current = veils.map(() => Number.NaN);
    let frame = 0;
    let last = 0;
    let near = false;

    const tick = (now: number) => {
      const vh = window.innerHeight;
      const dt = last ? Math.min(64, now - last) : 16.7;
      const k = 1 - Math.pow(1 - 0.33, dt / 16.7);
      let moving = false;
      veils.forEach((v, i) => {
        const p = crossProgress(v.getBoundingClientRect(), vh);
        const goal = 1 - clamp01((p - 0.15) / 0.35);
        let w = current[i];
        if (Number.isNaN(w)) w = goal;
        else w += (goal - w) * k;
        if (Math.abs(goal - w) < 0.0005) w = goal;
        else moving = true;
        current[i] = w;
        v.style.width = `${(w * 100).toFixed(2)}%`;
      });
      last = now;
      frame = moving ? requestAnimationFrame(tick) : 0;
      if (!frame) last = 0;
    };

    const wake = () => {
      if (near && !frame) frame = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        wake();
      },
      { rootMargin: "30% 0px 30% 0px" },
    );
    io.observe(wrap);
    frame = requestAnimationFrame(tick);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={f.section}>
      <div className={f.block}>
        <div ref={wrapRef} className={f.fill}>
          <p className={f.text}>{text}</p>
          {Array.from({ length: ROWS }, (_, i) => (
            <span
              key={i}
              data-veil=""
              className={f.veil}
              style={{ ["--i" as string]: i } as CSSProperties}
              aria-hidden="true"
            />
          ))}
        </div>
        {children && <div className={f.small}>{children}</div>}
      </div>
    </section>
  );
}
