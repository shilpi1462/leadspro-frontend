"use client";

import { useEffect, type CSSProperties, type ReactNode } from "react";
import { useInView } from "@/lib/motion";
import styles from "./Scene.module.css";

/** Where a piece sits on its scene, in % of the scene's width and height. */
export interface Spot {
  x: number;
  y: number;
  w: number;
  /** Tilt in degrees. */
  r?: number;
  z?: number;
  /** How far it moves with the pointer and the scroll; nearer pieces move more. */
  depth?: number;
  /** Position on phones, when the desktop spread would leave the cards too small to read. */
  m?: { x: number; y: number; w: number; r?: number; z?: number };
  /** Dropped on phones. */
  minor?: boolean;
}

interface SceneProps {
  children: ReactNode;
  /** Width / height of the stage. */
  ratio: string;
  ratioPhone?: string;
  /** Small caption in the corner, e.g. "Illustrative example". */
  note?: string;
  /** For a scene that shows real work: read out as one image with this description. */
  label?: string;
  className?: string;
}

export function Scene({ children, ratio, ratioPhone, note, label, className }: SceneProps) {
  const ref = useInView<HTMLDivElement>({ threshold: 0.2 });

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pointer: { x: number; y: number } | null = null;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const height = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (height - rect.top) / (height + rect.height)));
      el.style.setProperty("--progress", progress.toFixed(3));
      el.style.setProperty(
        "--px",
        pointer ? ((pointer.x - rect.left) / rect.width - 0.5).toFixed(3) : "0",
      );
      el.style.setProperty(
        "--py",
        pointer ? ((pointer.y - rect.top) / rect.height - 0.5).toFixed(3) : "0",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className={[styles.scene, className].filter(Boolean).join(" ")}
      style={{ ["--ratio" as string]: ratio, ["--ratio-m" as string]: ratioPhone ?? ratio }}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      {children}
      {note && <span className={styles.note}>{note}</span>}
    </div>
  );
}

/** One card on a scene: placed, dealt in, drifting and bobbing. `i` sets its turn in the deal. */
export function Piece({
  at,
  i = 0,
  children,
  className,
}: {
  at: Spot;
  i?: number;
  children: ReactNode;
  className?: string;
}) {
  const vars: CSSProperties & Record<string, string | number> = {
    "--x": `${at.x}%`,
    "--y": `${at.y}%`,
    "--w": `${at.w}%`,
    "--r": `${at.r ?? 0}deg`,
    "--z": at.z ?? 1,
    "--depth": at.depth ?? 1,
    "--i": i,
  };
  if (at.m) {
    vars["--x-m"] = `${at.m.x}%`;
    vars["--y-m"] = `${at.m.y}%`;
    vars["--w-m"] = `${at.m.w}%`;
    vars["--r-m"] = `${at.m.r ?? at.r ?? 0}deg`;
    if (at.m.z !== undefined) vars["--z-m"] = at.m.z;
  }
  return (
    <div
      className={[styles.piece, at.minor ? styles.minor : "", className].filter(Boolean).join(" ")}
      style={vars}
    >
      <div className={styles.drift}>
        <div className={styles.bob}>{children}</div>
      </div>
    </div>
  );
}
