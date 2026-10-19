import Image from "next/image";
import type { CSSProperties } from "react";
import type { Block } from "@/lib/blocks";
import type { Picture } from "@/data/images";
import { ArrowButton, Copy, TextButton } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import c from "./Cta.module.css";

interface CtaProps {
  pre: string;
  title: string;
  blocks: Block[];
  ring: Picture[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function Cta({ pre, title, blocks, ring, primary, secondary }: CtaProps) {
  return (
    <section className={b.spaceBottom}>
      <div className={b.medium}>
        <Rise className={c.content}>
          <div className={c.ring} aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={c.bar}
                style={{ ["--a" as string]: `${i * 30}deg` } as CSSProperties}
              >
                {[ring[i * 2], ring[i * 2 + 1]].map((pic, k) =>
                  pic ? (
                    <span key={k} className={`${c.photo} ${k === 1 ? c.flip : ""}`}>
                      <Image src={pic.src} alt="" width={pic.width} height={pic.height} />
                    </span>
                  ) : null,
                )}
              </div>
            ))}
          </div>
          <span className={c.blurBand} aria-hidden="true" />
          <div {...item(0, c.info)}>
            <div className={c.top}>
              <span className={b.preTitle}>{pre}</span>
              <h2 className={`${b.display} ${b.h2} ${b.center}`}>{title}</h2>
              <Copy blocks={blocks} className={c.copy} />
            </div>
            <div className={c.bottom}>
              <ArrowButton href={primary.href} label={primary.label} />
              {secondary && <TextButton href={secondary.href} label={secondary.label} />}
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}
