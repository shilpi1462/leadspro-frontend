"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";
import styles from "./Up.module.css";

/** True once the element has come into view (it stays true). */
export function useInView<T extends Element>(ref: RefObject<T | null>) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return shown;
}

type Variant = "up" | "rise" | "fade" | "scale" | "wipe" | "line";

interface UpProps {
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  id?: string;
  children?: ReactNode;
}

export function Up({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  id,
  children,
}: UpProps) {
  const ref = useRef<HTMLElement>(null);
  const shown = useInView(ref);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`${styles[variant]} ${shown ? styles.in : ""} ${className ?? ""}`}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
