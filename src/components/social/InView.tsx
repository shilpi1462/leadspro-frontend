"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/motion";

/** Adds `in` the first time the element reaches the screen; the styles decide what that starts. */
export function InView({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const ref = useInView<HTMLElement>({ threshold: 0.15 });
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
