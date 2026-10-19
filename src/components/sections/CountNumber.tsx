"use client";

import { useEffect, useRef } from "react";

interface CountNumberProps {
  value: string;
  className?: string;
}

export function CountNumber({ value, className }: CountNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/[\d.]+/);
    if (!el || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = parseFloat(match[0]);
    const [before, after] = [
      value.slice(0, match.index),
      value.slice((match.index ?? 0) + match[0].length),
    ];
    const decimals = (match[0].split(".")[1] ?? "").length;
    // Hold the finished width so the card does not jitter while the digits change.
    el.style.minWidth = `${el.getBoundingClientRect().width}px`;

    let frame = 0;
    const run = () => {
      cancelAnimationFrame(frame);
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1500);
        el.textContent = `${before}${(target * t).toFixed(decimals)}${after}`;
        if (t < 1) frame = requestAnimationFrame(step);
        else el.textContent = value;
      };
      frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        run();
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    const card = el.closest("[data-count-card]");
    card?.addEventListener("mouseenter", run);
    return () => {
      io.disconnect();
      card?.removeEventListener("mouseenter", run);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
