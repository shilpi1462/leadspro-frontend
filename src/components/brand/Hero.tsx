import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Picture } from "@/data/images";
import { G, type Glyph } from "@/components/visuals/parts/glyphs";
import { ArrowButton, Marquee } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import h from "./Hero.module.css";

interface HeroProps {
  crumbs: ReactNode;
  preTitle: string;
  title: string;
  description: ReactNode;
  cta: { label: string; href: string };
  photos: Picture[];
  /** Touchpoints named in the copy: card badges, the brand card's marquees and the strip below. */
  touchpoints: string[];
  stat: { value: string; label: string };
  line?: ReactNode;
}

const SWATCHES = ["#111111", "#0f4c3a", "#d9f55c", "#f3ecd9", "#b9d3c3"];

const GLYPHS: [RegExp, Glyph][] = [
  [/logo|mark/i, "spark"],
  [/colou?r|palette/i, "palette"],
  [/typograph|font/i, "doc"],
  [/icon|graphic|shape|pattern/i, "layers"],
  [/photo|image/i, "eye"],
  [/guideline|rule/i, "check"],
  [/website|web/i, "globe"],
  [/social/i, "share"],
  [/sales|conversation/i, "comment"],
  [/advert|campaign|marketing/i, "trend"],
  [/service/i, "target"],
];
export const glyphFor = (text: string): Glyph =>
  GLYPHS.find(([re]) => re.test(text))?.[1] ?? "spark";

/** The title in caps: its "&" becomes the brand mark and its last word sits in the lime pill. */
function Title({ title }: { title: string }) {
  const words = title.split(" ");
  const last = words.pop() ?? "";
  return (
    <>
      {words.map((w, i) =>
        w === "&" ? (
          <span key={i} className={h.markWrap}>
            <span className={b.srOnly}>&amp;</span>
            <span className={h.mark} aria-hidden="true" />{" "}
          </span>
        ) : (
          <span key={i}>{w} </span>
        ),
      )}
      <span className={b.highlight}>{last}</span>
    </>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className={h.badge}>
      <span className={h.badgeIcon}>
        <G name={glyphFor(label)} />
      </span>
      <b>{label}</b>
      <span className={h.tick}>
        <G name="check" />
      </span>
    </span>
  );
}

export function Hero({
  crumbs,
  preTitle,
  title,
  description,
  cta,
  photos,
  touchpoints,
  stat,
  line,
}: HeroProps) {
  const half = Math.ceil(touchpoints.length / 2);
  const rows = [touchpoints.slice(0, half), touchpoints.slice(half)];
  const card = (photo: Picture, label: string, cls: string) => (
    <figure className={`${h.card} ${cls}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 992px) 24vw, (min-width: 480px) 45vw, 90vw"
        className={h.photo}
        preload
        fetchPriority="high"
      />
      <span className={h.overlay} aria-hidden="true" />
      <figcaption className={h.cardBadge}>
        <Badge label={label} />
      </figcaption>
    </figure>
  );

  return (
    <section className={h.hero}>
      <div className={b.container}>
        <div className={h.crumbs}>{crumbs}</div>
        <Rise mode="load" className={h.content}>
          <div className={h.caption}>
            <div {...item(0)}>
              <span className={b.preTitle}>{preTitle}</span>
            </div>
            <h1 {...item(1, `${b.display} ${b.h1} ${h.title}`)}>
              <Title title={title} />
            </h1>
            <p {...item(2, `${b.lead} ${h.description}`)}>{description}</p>
            <div {...item(3)}>
              <ArrowButton href={cta.href} label={cta.label} />
            </div>
          </div>

          <div {...item(4, h.cards)}>
            {card(photos[0], touchpoints[0] ?? "", h.c1)}
            {card(photos[1], touchpoints[1] ?? "", h.c2)}
            <div className={`${h.brandCard} ${h.c3}`}>
              <div className={h.brandTop}>
                <div className={h.brandInfo}>
                  <span className={h.swatches} aria-hidden="true">
                    {SWATCHES.map((c) => (
                      <i key={c} style={{ ["--c" as string]: c } as CSSProperties} />
                    ))}
                  </span>
                  <span className={h.brandText}>{stat.label}</span>
                </div>
                <p className={`${b.display} ${h.counter}`}>{stat.value}</p>
              </div>
              <div className={h.brandBottom} aria-hidden="true">
                {rows.map((row, r) => (
                  <Marquee key={r} right={r === 1}>
                    {row.map((t) => (
                      <Badge key={t} label={t} />
                    ))}
                  </Marquee>
                ))}
              </div>
            </div>
            {card(photos[2], touchpoints[2] ?? "", h.c4)}
          </div>
        </Rise>

        <Rise className={h.platforms}>
          {line && <div {...item(0, h.line)}>{line}</div>}
          <div {...item(1, h.strip)}>
            <Marquee fade>
              {touchpoints.map((t) => (
                <span key={t} className={h.platform}>
                  <span className={h.platformIcon}>
                    <G name={glyphFor(t)} />
                  </span>
                  {t}
                </span>
              ))}
            </Marquee>
          </div>
        </Rise>
      </div>
    </section>
  );
}
