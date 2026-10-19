"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import s from "./Brand.module.css";

interface RiseProps {
  as?: ElementType;
  className?: string;
  id?: string;
  /** "scroll" plays when the block's top reaches 80 % of the screen; "load" on page load. */
  mode?: "scroll" | "load";
  children: ReactNode;
}

export function Rise({ as: Tag = "div", className, id, mode = "scroll", children }: RiseProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (mode === "load") {
      const frame = requestAnimationFrame(() => el.classList.add("in"));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={[s.rise, mode === "load" ? s.load : "", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}
