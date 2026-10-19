"use client";

import { useRef, type ElementType, type ReactNode } from "react";

interface TiltPanelProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

export function TiltPanel({ children, as: Tag = "div", className, ...rest }: TiltPanelProps) {
  const ref = useRef<HTMLElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    el.style.setProperty("--rx", `${((0.5 - y) * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 8).toFixed(2)}deg`);
    el.classList.add("is-live");
  };

  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("is-live");
  };

  return (
    <Tag ref={ref} className={className} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}
