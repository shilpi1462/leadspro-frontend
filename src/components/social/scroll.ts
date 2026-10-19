"use client";

import { useEffect, useRef, type RefObject } from "react";

const RATE: Record<number, number> = { 75: 0.33, 90: 0.12 };

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (v: number) => {
    let t = v;
    for (let i = 0; i < 6; i++) {
      const d = x(t) - v;
      const slope = dx(t);
      if (Math.abs(d) < 1e-5 || !slope) break;
      t -= d / slope;
    }
    t = clamp01(t);
    return ((ay * t + by) * t + cy) * t;
  };
}

export const easeInOut = bezier(0.42, 0, 0.58, 1);
export const linear = (t: number) => t;

export type Keys = [number, number][];

/** Value of a keyframe track at `p` (0-100); held flat before the first and after the last key. */
export function at(keys: Keys, p: number, ease: (t: number) => number = easeInOut) {
  if (p <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [b, vb] = keys[i];
    if (p <= b) {
      const [a, va] = keys[i - 1];
      return va + (vb - va) * ease((p - a) / (b - a));
    }
  }
  return keys[keys.length - 1][1];
}

export function crossProgress(rect: DOMRect, vh: number, start = 1) {
  const from = vh * start;
  return clamp01((from - rect.top) / (from + rect.height));
}

export type Range = "cross" | "pin" | "pin-centre";

function progressOf(range: Range, rect: DOMRect, vh: number, start: number) {
  if (range === "pin") return clamp01(-rect.top / Math.max(1, rect.height - vh));
  if (range === "pin-centre") return clamp01(-rect.top / Math.max(1, rect.height / 2 - vh / 2));
  return crossProgress(rect, vh, start);
}

interface Options {
  smoothing?: 75 | 90;
  scrub?: number;
  range?: Range;
  start?: number;
  /** Progress to settle on when the visitor prefers reduced motion. */
  rest?: number;
}

/** Calls `apply` with the smoothed 0-1 progress of `ref`; only runs while it is near the viewport. */
export function useScrollDriven<T extends HTMLElement>(
  apply: (progress: number) => void,
  { smoothing = 75, scrub, range = "cross", start = 1, rest = 0 }: Options = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const applyRef = useRef(apply);

  useEffect(() => {
    applyRef.current = apply;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) {
      applyRef.current(rest);
      return;
    }

    const rate = RATE[smoothing];
    let current = Number.NaN;
    let frame = 0;
    let last = 0;
    let near = false;

    const target = () => progressOf(range, el.getBoundingClientRect(), window.innerHeight, start);

    const tick = (now: number) => {
      const goal = target();
      if (Number.isNaN(current)) current = goal;
      else {
        const dt = last ? Math.min(64, now - last) : 16.7;
        // A scrub of n seconds settles in about n seconds: an exponential with a third of that.
        const k = scrub
          ? 1 - Math.exp(-dt / ((scrub * 1000) / 3))
          : 1 - Math.pow(1 - rate, dt / 16.7);
        current += (goal - current) * k;
        if (Math.abs(goal - current) < 0.0004) current = goal;
      }
      last = now;
      applyRef.current(current);
      frame = current !== goal ? requestAnimationFrame(tick) : 0;
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
      { rootMargin: "50% 0px 50% 0px" },
    );
    io.observe(el);

    // Place everything once before the first scroll, wherever the page was opened.
    current = target();
    applyRef.current(current);

    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [smoothing, scrub, range, start, rest]);

  return ref;
}
