"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import { PrimaryButton } from "./Buttons";
import { at, linear, reducedMotion, useScrollDriven, type Keys } from "./scroll";
import h from "./Hero.module.css";
import c from "./ClosingCta.module.css";

interface ClosingCtaProps {
  title: ReactNode;
  photos: Picture[];
  cta: { label: string; href: string };
}

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots: Record<number, string> = { 0: "Post", 2: "Reel", 3: "Story", 5: "Post", 6: "Reel" };

export function ClosingCta({ title, photos, cta }: ClosingCtaProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const headRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  const sectionRef = useScrollDriven<HTMLElement>(
    (progress) => {
      const grid = gridRef.current;
      const head = headRef.current;
      const phone = phoneRef.current;
      if (!grid || !head || !phone) return;
      if (reducedMotion()) {
        grid.style.removeProperty("--grid-w");
        grid.style.removeProperty("--img-w");
        head.style.transform = "translate3d(0, -50%, 0)";
        phone.style.transform = "none";
        phone.classList.add(c.landed);
        return;
      }
      const p = progress * 100;
      const vw = window.innerWidth / 100;
      const vh = window.innerHeight / 100;
      const wide = window.innerWidth >= 992;
      const gridW: Keys = wide
        ? [
            [20, 90 * vw],
            [50, 17.5 * vw],
          ]
        : [
            [20, 780],
            [50, 200],
          ];
      const imgW: Keys = wide
        ? [
            [20, 29 * vw],
            [50, 17.5 * vw],
          ]
        : [
            [20, 250],
            [50, 185],
          ];
      grid.style.setProperty("--grid-w", `${at(gridW, p, linear).toFixed(1)}px`);
      grid.style.setProperty("--img-w", `${at(imgW, p, linear).toFixed(1)}px`);

      const x = at(
        [
          [20, -100 * vw],
          [85, 100 * vw],
        ],
        p,
        linear,
      );
      const width = at(
        [
          [50, 100],
          [85, 0],
        ],
        p,
        linear,
      );
      head.style.transform = `translate3d(${x.toFixed(1)}px, -50%, 0)`;
      head.style.width = `${width.toFixed(2)}%`;

      const y = at(
        [
          [40, 100 * vh],
          [50, wide ? 0 : -0.5 * vh],
        ],
        p,
        linear,
      );
      phone.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      phone.classList.toggle(c.landed, p >= 49);
    },
    { start: 0.9, rest: 0.5 },
  );

  return (
    <section ref={sectionRef} className={c.section}>
      <div className={c.container}>
        <div ref={gridRef} className={c.grid}>
          {photos.slice(0, 3).map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 992px) 29vw, 250px"
              className={c.image}
            />
          ))}
        </div>

        <div ref={headRef} className={c.heading}>
          <h2 className={c.headingText}>{title}</h2>
        </div>

        <div ref={phoneRef} className={c.phoneBlock}>
          <div className={h.phone}>
            <div className={`${h.panel} ${c.panel}`}>
              <span className={h.label}>Publishing plan</span>
              <span className={c.week}>
                {week.map((d, i) => (
                  <span key={d}>
                    <small>{d}</small>
                    {slots[i] ? (
                      <b style={{ ["--n" as string]: i } as CSSProperties}>{slots[i]}</b>
                    ) : (
                      <i />
                    )}
                  </span>
                ))}
              </span>
              <span className={h.publish}>Publish</span>
            </div>
            <span className={h.frame} aria-hidden="true" />
            <span className={h.island} aria-hidden="true" />
          </div>
          <div className={c.button}>
            <PrimaryButton href={cta.href} className={c.large}>
              {cta.label}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
