"use client";

import { useEffect } from "react";

export function SmoothWheel() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;

    const max = () => document.documentElement.scrollHeight - window.innerHeight;

    const scrollsItself = (el: Element | null) => {
      for (let node = el; node && node !== document.body; node = node.parentElement) {
        const style = getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight)
          return true;
      }
      return false;
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      frame = current !== target ? requestAnimationFrame(tick) : 0;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      // The site menu locks the page with overflow: hidden; leave it alone then.
      if (
        document.documentElement.style.overflow === "hidden" ||
        scrollsItself(e.target as Element)
      )
        return;
      e.preventDefault();
      if (!frame) current = target = window.scrollY;
      const step =
        e.deltaMode === 1
          ? e.deltaY * 16
          : e.deltaMode === 2
            ? e.deltaY * window.innerHeight
            : e.deltaY;
      target = Math.max(0, Math.min(max(), target + step));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Any scroll we did not make (keys, scrollbar, a link) becomes the new resting point.
    const onScroll = () => {
      if (Math.abs(window.scrollY - current) < 2) return;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      target = current = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
