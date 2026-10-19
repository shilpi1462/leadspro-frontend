"use client";

import { useEffect, useRef } from "react";
import styles from "./Pointer.module.css";

export function Pointer() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const glow = ref.current;
    const host = glow?.parentElement;
    if (!glow || !host || window.matchMedia("(hover: none)").matches) return;

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 90;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 90;
      glow.style.transform = `translate3d(${x}%, ${y}%, 0)`;
    };
    const enter = () => glow.classList.add(styles.on);
    const leave = () => glow.classList.remove(styles.on);

    host.addEventListener("pointermove", move);
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <span ref={ref} className={styles.glow} aria-hidden="true" />;
}
