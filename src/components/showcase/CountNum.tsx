"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import s from "./CountNum.module.css";

type Trigger = "view" | "hover" | "active";

interface CountNumProps {
  value: string;
  /** When to run: on screen (30 % visible), when the card it sits in is hovered, or when `active` turns on. */
  triggers?: Trigger[];
  active?: boolean;
}

const DURATION = 1500;

export function CountNum({ value, triggers = ["view"], active }: CountNumProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const running = useRef(false);
  const [text, setText] = useState(value);
  const on = triggers.join(" ");

  const animate = useCallback(() => {
    const match = value.match(/[\d.]+/);
    if (!match || running.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const target = parseFloat(match[0]);
    const [prefix = "", suffix = ""] = value.split(match[0]);
    const decimals = (match[0].split(".")[1] ?? "").length;
    const places = target < 5 ? 2 : decimals;
    const start = performance.now();
    running.current = true;
    const tick = (now: number) => {
      const f = Math.min((now - start) / DURATION, 1);
      const n = target * f;
      setText(prefix + (places > 0 ? n.toFixed(places) : Math.round(n)) + suffix);
      if (f < 1) requestAnimationFrame(tick);
      else {
        running.current = false;
        setText(value);
      }
    };
    requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const card = el.closest("[data-count-card]") ?? el;
    const cleanups: (() => void)[] = [];
    if (on.includes("view") && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.isIntersecting && animate()),
        { threshold: 0.3 },
      );
      io.observe(card);
      cleanups.push(() => io.disconnect());
    }
    if (on.includes("hover")) {
      card.addEventListener("mouseenter", animate);
      card.addEventListener("touchstart", animate, { passive: true });
      cleanups.push(() => {
        card.removeEventListener("mouseenter", animate);
        card.removeEventListener("touchstart", animate);
      });
    }
    return () => cleanups.forEach((c) => c());
  }, [on, animate]);

  useEffect(() => {
    if (active && on.includes("active")) animate();
  }, [active, on, animate]);

  return (
    <span ref={ref} className={s.num}>
      <span className={s.sizer} aria-hidden="true">
        {value}
      </span>
      <span className={s.live} aria-hidden="true">
        {text}
      </span>
      <span className={s.sr}>{value}</span>
    </span>
  );
}
