import Image from "next/image";
import type { Block } from "@/lib/blocks";
import type { Picture } from "@/data/images";
import { Inline } from "@/components/service/Inline";
import { ArrowButton, Copy } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import c from "./Compare.module.css";

interface CompareProps {
  id: string;
  title: string;
  head: string[];
  rows: string[][];
  after: Block[];
  picture: Picture;
  cta: { label: string; href: string };
}

const Cross = () => (
  <svg viewBox="0 0 10 10" aria-hidden="true">
    <path d="m2 2 6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Tick = () => (
  <svg viewBox="0 0 10 10" aria-hidden="true">
    <path
      d="m1.5 5.2 2.4 2.3L8.5 2.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function Compare({ id, title, head, rows, after, picture, cta }: CompareProps) {
  const [typical, ours] = head;
  return (
    <section id={id} className={c.section}>
      <div className={c.content}>
        <div className={c.bg} aria-hidden="true">
          <Image src={picture.src} alt="" fill sizes="100vw" className={c.bgImage} />
          <span className={c.overlay} />
        </div>
        <Rise className={`${b.medium} ${c.info}`}>
          <h2 {...item(0, `${b.display} ${b.h2} ${b.center} ${c.title}`)}>{title}</h2>
          <div {...item(1, c.center)}>
            <div className={c.left}>
              <Copy blocks={after} className={c.leftCopy} />
            </div>
            <div className={c.right}>
              <div className={c.column}>
                <p className={c.columnTitle}>{typical}</p>
                <ul className={c.list}>
                  {rows.map((row) => (
                    <li key={row[0]}>
                      <span className={c.icon}>
                        <Cross />
                      </span>
                      <Inline text={row[0]} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${c.column} ${c.box}`}>
                <p className={c.brandName}>
                  <span className={c.brandMark} aria-hidden="true" />
                  {ours}
                </p>
                <ul className={c.list}>
                  {rows.map((row) => (
                    <li key={row[1]}>
                      <span className={c.icon}>
                        <Tick />
                      </span>
                      <Inline text={row[1]} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div {...item(2, c.button)}>
            <ArrowButton href={cta.href} label={cta.label} light />
          </div>
        </Rise>
      </div>
    </section>
  );
}
