"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: 0 | 1 | 2 | 3;
  id?: string;
  style?: CSSProperties;
  variant?: "up" | "left" | "right" | "grow" | "fade";
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  id,
  style,
  variant,
}: RevealProps) {
  const ref = useInView<HTMLElement>({ threshold: variant ? 0 : 0.05 });

  return (
    <Tag
      ref={ref}
      id={id}
      style={style}
      className={["reveal", variant && `reveal--${variant}`, className].filter(Boolean).join(" ")}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}
