"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import { G } from "@/components/visuals/parts/glyphs";
import { PrimaryButton } from "./Buttons";
import { at, reducedMotion, useScrollDriven, type Keys } from "./scroll";
import s from "./Social.module.css";
import h from "./Hero.module.css";

interface HeroProps {
  crumbs: ReactNode;
  /** "Social Media", the fixed start of the title. */
  lead: string;
  /** The rest of the title, then the endings it cycles through. */
  words: string[];
  reels: { picture: Picture; caption: string }[];
  /** Caption being written in the phone. */
  caption: string;
  /** Tagline that slides behind the phone. */
  tagline: ReactNode;
  cta: { label: string; href: string };
  handle?: string;
}

const DESKTOP = {
  x52: [18.25, 9.125, 0, -9.125, -18.25],
  x70: [36.5, 18.25, 0, -18.25, -36.5],
  y52: [27, 21, 18, 21, 27],
  y70: [51, 52, 53, 54, 55],
  y85: 101.5,
};
const SMALL = {
  x52: [185, 97.5, 0, -97.5, -185],
  x70: [390, 195, 0, -195, -390],
  y52: [150, 125, 100, 125, 150],
  y70: [280, 285, 290, 295, 300],
  y85: 610,
};
const TURN = [-25, -12.5, 0, 12.5, 25];

export function Hero({
  crumbs,
  lead,
  words,
  reels,
  caption,
  tagline,
  cta,
  handle = "yourbusiness",
}: HeroProps) {
  const reelRefs = useRef<(HTMLElement | null)[]>([]);
  const movingRef = useRef<HTMLDivElement | null>(null);

  const gridRef = useScrollDriven<HTMLDivElement>((progress) => {
    const p = progress * 100;
    const wide = window.innerWidth >= 992;
    const t = wide ? DESKTOP : SMALL;
    const ux = wide ? window.innerWidth / 100 : 1;
    const uy = wide ? window.innerHeight / 100 : 1;
    reelRefs.current.forEach((el, i) => {
      if (!el) return;
      const x: Keys = [
        [40, 0],
        [52, t.x52[i] * ux],
        [70, t.x70[i] * ux],
      ];
      const y: Keys = [
        [40, 0],
        [52, t.y52[i] * uy],
        [70, t.y70[i] * uy],
        [85, t.y85 * uy],
      ];
      const r: Keys = [
        [40, 0],
        [52, TURN[i]],
        [70, 0],
      ];
      el.style.transform = `translate3d(${at(x, p).toFixed(2)}px, ${at(y, p).toFixed(2)}px, 0) rotate(${at(r, p).toFixed(2)}deg)`;
    });
  });

  // "Heading scroll RTL" (a-7): the tagline crosses from the right edge to the left while the
  // phone passes. A long tagline travels further so its end still clears the middle.
  const phoneRef = useScrollDriven<HTMLDivElement>((progress) => {
    const el = movingRef.current;
    if (!el) return;
    if (reducedMotion()) {
      el.style.transform = "none";
      return;
    }
    const vw = window.innerWidth;
    const end = Math.min(-0.5 * vw, 0.4 * vw - el.scrollWidth);
    el.style.transform = `translate3d(${(vw + (end - vw) * progress).toFixed(1)}px, 0, 0)`;
  });

  const longest = Math.max(lead.length, ...words.map((w) => w.length));
  const landed = reels[reels.length - 1];

  return (
    <section className={h.hero}>
      <div className={h.blobs} aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`${h.blob} ${h[`b${n}`]}`} />
        ))}
      </div>

      <div className={`${s.container} ${h.container}`}>
        <div className={h.crumbs}>{crumbs}</div>

        <h1 className={h.heading} style={{ ["--chars" as string]: longest } as CSSProperties}>
          <span>{lead}</span>{" "}
          <span className={h.slot}>
            {words.map((w) => (
              <span key={`size-${w}`} className={h.sizer} data-word={w} aria-hidden="true" />
            ))}
            {words.map((w, i) =>
              i === 0 ? (
                <span key={w} className={`${s.grad} ${h.wipe} ${h.first}`}>
                  {w}
                </span>
              ) : (
                <span
                  key={w}
                  className={`${s.grad} ${h.wipe}`}
                  data-word={w}
                  style={{ ["--i" as string]: i } as CSSProperties}
                  aria-hidden="true"
                />
              ),
            )}
          </span>
        </h1>

        <div ref={gridRef} className={h.grid}>
          {reels.map((reel, i) => (
            <figure
              key={reel.picture.src}
              ref={(el) => {
                reelRefs.current[i] = el;
              }}
              className={h.reel}
            >
              <Image
                src={reel.picture.src}
                alt={reel.picture.alt}
                fill
                sizes="(min-width: 992px) 17vw, 185px"
                className={h.photo}
                preload={i === reels.length - 1}
              />
              <span className={h.reelTag}>
                <G name="play" />
                Reels
              </span>
              <span className={h.reelSide} aria-hidden="true">
                <G name="heart" />
                <G name="comment" />
                <G name="share" />
              </span>
              <figcaption className={h.reelInfo}>
                <span className={h.reelUser}>
                  <i aria-hidden="true">{handle.charAt(0).toUpperCase()}</i>
                  {handle}
                </span>
                <span className={h.reelCaption}>{reel.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div ref={phoneRef} className={h.phoneBlock}>
          <div className={h.phone}>
            <Image
              src={landed.picture.src}
              alt=""
              width={landed.picture.width}
              height={landed.picture.height}
              className={h.fallback}
            />
            <div className={h.panel}>
              <span className={h.label}>Caption</span>
              <p className={h.box}>{caption}</p>
              <span className={h.label}>Format</span>
              <span className={h.format}>
                Reel
                <span className={h.dots} aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <i key={i} />
                  ))}
                </span>
              </span>
              <span className={h.publish}>Publish</span>
            </div>
            <span className={h.frame} aria-hidden="true" />
            <span className={h.island} aria-hidden="true" />
          </div>
        </div>

        <div ref={movingRef} className={h.moving}>
          <h2 className={h.movingText}>{tagline}</h2>
        </div>

        <div className={h.cta}>
          <PrimaryButton href={cta.href} className={h.large}>
            {cta.label}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
