"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import styles from "./Hero.module.css";

export interface HeroChip {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  href: string;
  image: Picture;
  thumb: Picture;
}

export function HeroPanel({ chips, children }: { chips: HeroChip[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [swapping, setSwapping] = useState(false);
  // Photos are added to the frame as they are first needed; the rest are fetched once the page is idle.
  const [loaded, setLoaded] = useState<number[]>([0]);
  const dock = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const current = chips[active];

  const activate = (index: number) => {
    if (index === active) return;
    setActive(index);
    setLoaded((l) => (l.includes(index) ? l : [...l, index]));
    setSwapping(false);
    window.clearTimeout(timer.current);
    // next frame so the sweep restarts even when it is still running
    requestAnimationFrame(() => {
      setSwapping(true);
      timer.current = window.setTimeout(() => setSwapping(false), 720);
    });
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setLoaded(chips.map((_, i) => i)));
    return () => cancel(id);
  }, [chips]);

  useEffect(() => {
    const el = dock.current;
    if (!el) return;
    let frame = 0;
    const nearest = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      if (el.scrollWidth <= el.clientWidth + 1) return;
      const centre = box.left + box.width / 2;
      let best = 0;
      let distance = Infinity;
      Array.from(el.children).forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - centre);
        if (d < distance) {
          distance = d;
          best = i;
        }
      });
      activate(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(nearest);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  });

  return (
    <div
      className={`${styles.frame} ${swapping ? styles.swapping : ""}`}
      style={{
        ["--flow-x" as string]: `${18 + (active % 4) * 19}%`,
        ["--flow-y" as string]: `${18 + Math.floor(active / 4) * 38}%`,
      }}
    >
      <div className={styles.photos} aria-hidden="true">
        {chips.map((c, i) =>
          loaded.includes(i) ? (
            <Image
              key={c.slug}
              src={c.image.src}
              alt=""
              width={c.image.width}
              height={c.image.height}
              preload={i === 0}
              fetchPriority={i === 0 ? "high" : undefined}
              className={i === active ? styles.photoActive : undefined}
            />
          ) : null,
        )}
      </div>
      <span className={styles.sheen} aria-hidden="true" />
      <span className={styles.sweep} aria-hidden="true" />
      <span className={styles.corner} aria-hidden="true" />

      <div className={styles.feature} aria-live="polite">
        <span className={styles.featureIndex}>0{active + 1}</span>
        <strong className={styles.featureName}>{current.name}</strong>
        <small className={styles.featureText}>{current.blurb}</small>
      </div>

      {children}

      <div ref={dock} className={styles.dock} aria-label="Services">
        {chips.map((c, i) => (
          <Link
            key={c.slug}
            href={c.href}
            className={`${styles.chip} ${i === active ? styles.chipActive : ""}`}
            aria-current={i === active ? "true" : undefined}
            onPointerEnter={() => activate(i)}
            onFocus={() => activate(i)}
          >
            <span className={styles.chipThumb}>
              <Image src={c.thumb.src} alt="" width={c.thumb.width} height={c.thumb.height} />
            </span>
            <span className={styles.chipIndex}>(0{i + 1})</span>
            <strong className={styles.chipName}>{c.short}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}
