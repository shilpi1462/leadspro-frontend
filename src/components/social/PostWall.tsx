"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import type { Picture } from "@/data/images";
import { G } from "@/components/visuals/parts/glyphs";
import { at, linear, useScrollDriven } from "./scroll";
import s from "./Social.module.css";
import w from "./PostWall.module.css";

export interface PostCard {
  picture: Picture;
  text: string;
  label?: string;
}

interface PostWallProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  cards: PostCard[];
  outro?: ReactNode;
  handle?: string;
}

const COLUMNS = 4;

export function PostWall({
  id,
  title,
  intro,
  cards,
  outro,
  handle = "yourbusiness",
}: PostWallProps) {
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useScrollDriven<HTMLDivElement>((progress) => {
    const wide = window.innerWidth >= 992;
    const shift = at(
      [
        [0, 0],
        [80, 25],
      ],
      progress * 100,
      linear,
    );
    columnRefs.current.forEach((col, i) => {
      if (col)
        col.style.transform = wide
          ? `translate3d(0, ${(i % 2 === 0 ? -shift : shift).toFixed(2)}%, 0)`
          : "";
    });
  });

  const columns = Array.from({ length: COLUMNS }, (_, col) =>
    cards.filter((_, i) => i % COLUMNS === col),
  );

  return (
    <section id={id} className={s.section}>
      <div className={w.container}>
        <div className={w.head}>
          <h2 className={`${s.h2} ${s.center}`}>{title}</h2>
          {intro}
        </div>

        <div className={w.wrapper}>
          <div className={w.top} aria-hidden="true" />
          <div ref={gridRef} className={w.grid}>
            {columns.map((list, col) => (
              <div
                key={col}
                ref={(el) => {
                  columnRefs.current[col] = el;
                }}
                className={col % 2 === 0 ? w.odd : w.even}
              >
                {list.map((card, i) => (
                  <article key={`${card.picture.src}-${i}`} className={w.card}>
                    <Image
                      src={card.picture.src}
                      alt={card.picture.alt}
                      width={card.picture.width}
                      height={card.picture.height}
                      sizes="(min-width: 992px) 22vw, 70vw"
                      className={w.image}
                    />
                    {card.text && <p className={w.caption}>{card.text}</p>}
                    <div className={w.meta}>
                      <span>{card.label ? `${card.label} · @${handle}` : `@${handle}`}</span>
                      <span className={w.icons} aria-hidden="true">
                        <span className={w.like}>
                          <G name="heart" />
                        </span>
                        <G name="comment" />
                        <G name="bookmark" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
          <div className={w.bottom} aria-hidden="true" />
        </div>

        <div className={w.swipe} aria-hidden="true">
          Swipe for more
          <span>
            <i />
            <i />
            <i />
          </span>
        </div>

        {outro && <div className={w.outro}>{outro}</div>}
      </div>
    </section>
  );
}
