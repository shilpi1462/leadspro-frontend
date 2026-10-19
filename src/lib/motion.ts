"use client";

import { useEffect, useRef } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface InViewOptions {
  threshold?: number;
  /** Keep watching and drop `in` again once the element leaves the screen. */
  once?: boolean;
}

export function useInView<T extends HTMLElement>({
  threshold = 0.05,
  once = true,
}: InViewOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const visible = entry.isIntersecting || (once && entry.boundingClientRect.top < 0);
          entry.target.classList.toggle("in", visible);
          if (visible && once) io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, once]);

  return ref;
}

type Travel = "cross" | "pin";

export function useScrollProgress<T extends HTMLElement>(travel: Travel = "cross") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      el.style.setProperty("--progress", travel === "cross" ? "1" : "0");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight;
      let progress;
      if (travel === "pin") {
        const distance = rect.height - height;
        progress = distance > 0 ? -rect.top / distance : 0;
      } else {
        const start = height * 0.82;
        progress = (start - rect.top) / (start - height * 0.3 + rect.height);
      }
      el.style.setProperty("--progress", Math.min(1, Math.max(0, progress)).toFixed(3));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [travel]);

  return ref;
}
