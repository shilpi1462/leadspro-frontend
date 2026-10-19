import Image from "next/image";
import type { Block } from "@/lib/blocks";
import type { Picture } from "@/data/images";
import { G } from "@/components/visuals/parts/glyphs";
import { ArrowButton, Copy } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import { glyphFor } from "./Hero";
import b from "./Brand.module.css";
import m from "./Mission.module.css";

interface MissionProps {
  id: string;
  pre: string;
  title: string;
  blocks: Block[];
  photos: Picture[];
  badges: string[];
  cta: { label: string; href: string };
}

export function Mission({ id, pre, title, blocks, photos, badges, cta }: MissionProps) {
  return (
    <section id={id} className={b.spaceBottom}>
      <Rise className={`${b.medium} ${m.grid}`}>
        <div {...item(0, m.left)}>
          <div className={m.photo}>
            <Image
              src={photos[0].src}
              alt={photos[0].alt}
              fill
              sizes="(min-width: 992px) 25vw, 45vw"
              className={m.image}
            />
          </div>
          <div className={`${m.photo} ${m.offset}`}>
            <Image
              src={photos[1].src}
              alt={photos[1].alt}
              fill
              sizes="(min-width: 992px) 25vw, 45vw"
              className={m.image}
            />
          </div>
          {badges.slice(0, 3).map((label, i) => (
            <span key={label} className={`${m.badge} ${m[`b${i + 1}`]}`} aria-hidden="true">
              <G name={glyphFor(label)} />
              {label}
            </span>
          ))}
        </div>
        <div className={m.right}>
          <div {...item(1)}>
            <span className={b.preTitle}>{pre}</span>
          </div>
          <h2 {...item(2, `${b.display} ${b.h2}`)}>{title}</h2>
          <div {...item(3)}>
            <Copy blocks={blocks} className={m.copy} />
          </div>
          <div {...item(4)}>
            <ArrowButton href={cta.href} label={cta.label} />
          </div>
        </div>
      </Rise>
    </section>
  );
}
