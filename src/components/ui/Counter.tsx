"use client";

import { useEffect, useRef } from "react";

interface CounterProps {
  value: string;
  className?: string;
}

export function Counter({ value, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only rewind what the visitor has not reached yet, so nothing flickers on load.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const target = Number(match[1]);
    const decimals = (match[1].split(".")[1] ?? "").length;
    const suffix = match[2];
    el.textContent = `${(0).toFixed(decimals)}${suffix}`;

    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      start ||= now;
      const t = Math.min(1, (now - start) / 1200);
      el.textContent = `${(target * (1 - Math.pow(1 - t, 3))).toFixed(decimals)}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
