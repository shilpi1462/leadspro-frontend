import Image from "next/image";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./TextMosaic.module.css";

interface TextMosaicProps {
  title: ReactNode;
  children: ReactNode;
  pictures: Picture[];
  cta?: { label: string; href: string };
  tone?: "dark" | "light";
  flip?: boolean;
  id?: string;
}

export function TextMosaic({
  title,
  children,
  pictures,
  cta,
  tone = "dark",
  flip,
  id,
}: TextMosaicProps) {
  const [a, b, c] = pictures;
  return (
    <section className={`${kit.section} ${tone === "light" ? kit.light : kit.dark}`} id={id}>
      <div className={`container ${styles.grid} ${flip ? styles.flip : ""}`}>
        <Reveal className={styles.copy}>
          <h2 className={`${kit.h2} ${styles.title}`}>{title}</h2>
          <div className={styles.body}>{children}</div>
          {cta && (
            <Pill href={cta.href} className={styles.cta}>
              {cta.label}
            </Pill>
          )}
        </Reveal>

        <div className={styles.gallery} aria-hidden="true">
          {[a, c, b].filter(Boolean).map((pic, i) => (
            <Reveal
              key={pic.src + i}
              className={`${styles.photo} ${styles[`photo${i + 1}`]}`}
              delay={(i + 1) as 1 | 2 | 3}
            >
              <Image
                src={pic.src}
                alt=""
                width={pic.width}
                height={pic.height}
                sizes="(min-width: 900px) 24vw, 46vw"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
