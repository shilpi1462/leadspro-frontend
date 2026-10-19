import Image from "next/image";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Inline } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUp } from "./icons";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./FaqSplit.module.css";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqSplitProps {
  title: ReactNode;
  items: FaqItem[];
  picture?: Picture;
  tone?: "dark" | "light";
  cta?: { label: string; href: string };
  id?: string;
}

export function FaqSplit({ title, items, picture, tone = "dark", cta, id }: FaqSplitProps) {
  const split = Boolean(picture);
  return (
    <section className={`${kit.section} ${tone === "light" ? kit.white : kit.dark}`} id={id}>
      <div className="container">
        <Reveal as="h2" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
          {title}
        </Reveal>

        <div
          className={`${styles.layout} ${split ? styles.split : ""} ${tone === "light" ? styles.onLight : ""}`}
        >
          {picture && (
            <Reveal className={styles.photo}>
              <Image
                src={picture.src}
                alt=""
                width={picture.width}
                height={picture.height}
                sizes="(min-width: 760px) 44vw, 92vw"
              />
            </Reveal>
          )}

          <div className={`${styles.list} ${!split && items.length > 4 ? styles.twoCol : ""}`}>
            {items.map((item, i) => (
              <details key={item.q} className={styles.item} open={split && i === 0}>
                <summary className={styles.summary}>
                  <h3 className={styles.q}>{item.q}</h3>
                  <span className={styles.arrow} aria-hidden="true">
                    <ArrowUp />
                  </span>
                </summary>
                <p className={styles.a}>
                  <Inline text={item.a} />
                </p>
              </details>
            ))}
          </div>
        </div>

        {cta && (
          <div className={styles.cta}>
            <Pill href={cta.href}>{cta.label}</Pill>
          </div>
        )}
      </div>
    </section>
  );
}
