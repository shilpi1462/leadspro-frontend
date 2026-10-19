"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import type { Glyph } from "@/components/visuals/parts/glyphs";
import { G } from "@/components/visuals/parts/glyphs";
import { useScrollDriven } from "@/components/social/scroll";
import b from "./Brand.module.css";
import k from "./Stack.module.css";

export interface StackCard {
  id: string;
  level: 2 | 3;
  title: string;
  description: ReactNode;
  badgesLabel?: string;
  badges: string[];
  extra: ReactNode;
  icon: Glyph;
  picture: Picture;
}

const TONES = [k.lime, k.sage, k.green, k.cream, k.white];

const SETTLE: [number, number][] = [
  [-350, 0.45],
  [-259, 0.55],
  [-168, 0.65],
  [-71, 0.75],
  [30, 0.85],
];

const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function Stack({ id, title, cards }: { id?: string; title: ReactNode; cards: StackCard[] }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const settle = SETTLE.slice(-cards.length);

  const sectionRef = useScrollDriven<HTMLElement>(
    (progress) => {
      const wide = window.innerWidth >= 992;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        if (!wide) {
          el.style.transform = "";
          return;
        }
        const local = Math.min(1, Math.max(0, progress * cards.length - i));
        const t = inOutCubic(local);
        const [x, scale] = settle[i];
        el.style.transform = `translate3d(${(x * t).toFixed(1)}px, 0, 0) scale(${(1 + (scale - 1) * t).toFixed(4)})`;
      });
    },
    { range: "pin", scrub: 0.8 },
  );

  return (
    <section ref={sectionRef} id={id} className={b.spaceBottom}>
      <div className={b.medium}>
        <h2 className={`${b.display} ${b.h1md} ${b.center} ${k.title}`}>{title}</h2>
        <div className={k.list}>
          {cards.map((card, i) => {
            const Heading = card.level === 3 ? "h3" : "h2";
            return (
              <div key={card.id} className={k.sticky}>
                <div
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  id={card.id}
                  className={`${k.card} ${TONES[i % TONES.length]}`}
                >
                  <div className={k.top}>
                    <div className={k.info}>
                      <Heading className={k.cardTitle}>{card.title}</Heading>
                      <div className={k.description}>{card.description}</div>
                    </div>
                    <span className={k.icon} aria-hidden="true">
                      <G name={card.icon} />
                    </span>
                  </div>
                  <div className={k.bottom}>
                    <div className={k.detail}>
                      <div className={k.detailTop}>
                        {card.badgesLabel && <p className={k.badgesLabel}>{card.badgesLabel}</p>}
                        {card.badges.length > 0 && (
                          <ul className={k.badges}>
                            {card.badges.map((badge) => (
                              <li key={badge}>
                                <G name="check" />
                                {badge.replace(/\*\*/g, "")}
                              </li>
                            ))}
                          </ul>
                        )}
                        {card.extra && <div className={k.extra}>{card.extra}</div>}
                      </div>
                      <div className={k.counter}>
                        <p className={b.display}>{String(i + 1).padStart(2, "0")}</p>
                        <span>of {String(cards.length).padStart(2, "0")} included</span>
                      </div>
                    </div>
                    <div className={k.imageItem}>
                      <Image
                        src={card.picture.src}
                        alt={card.picture.alt}
                        fill
                        sizes="(min-width: 992px) 40vw, 90vw"
                        className={k.image}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
