import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { CountNumber } from "./CountNumber";
import { TickSolid } from "./icons";
import kit from "./kit.module.css";
import styles from "./ResultCards.module.css";

export interface ResultCard {
  href: string;
  label: string;
  value: string;
  metric: string;
  points: string[];
  screen: Picture;
  badge: string;
}

interface ResultCardsProps {
  title?: ReactNode;
  intro?: ReactNode;
  cards: ResultCard[];
  id?: string;
}

export function ResultCards({ title, intro, cards, id }: ResultCardsProps) {
  return (
    <section className={`${kit.section} ${kit.dark}`} id={id}>
      <div className="container">
        {title && <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{title}</h2>}
        {intro && <div className={`${kit.lead} ${kit.centre} ${styles.intro}`}>{intro}</div>}

        <ul className={styles.grid}>
          {cards.map((card, i) => (
            <Reveal as="li" key={card.href} className={styles.cell} delay={(i % 2) as 0 | 1}>
              <article className={styles.card} data-count-card>
                <div className={styles.copy}>
                  <p className={styles.label}>{card.label}</p>
                  <CountNumber value={card.value} className={styles.value} />
                  <p className={styles.metric}>{card.metric}</p>
                  <ul className={styles.points}>
                    {card.points.map((p) => (
                      <li key={p}>
                        <TickSolid className={styles.tick} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={card.href} className={`${kit.buttonOutline} ${styles.link}`}>
                    View case study
                  </Link>
                </div>

                <div className={styles.device} aria-hidden="true">
                  <div className={styles.laptop}>
                    <span className={styles.screen}>
                      <Image
                        src={card.screen.src}
                        alt=""
                        width={card.screen.width}
                        height={card.screen.height}
                        sizes="(min-width: 1024px) 26vw, 60vw"
                      />
                    </span>
                    <span className={styles.base} />
                  </div>
                  <span className={styles.badge}>{card.badge}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
