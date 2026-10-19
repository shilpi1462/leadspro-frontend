import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, iconFor } from "./icons";
import { ScriptNote } from "./ScriptNote";
import kit from "./kit.module.css";
import styles from "./ServiceCards.module.css";

export interface ServiceCard {
  name: string;
  href: string;
  text?: string;
  tags?: string[];
}

interface ServiceCardsProps {
  title: ReactNode;
  intro?: ReactNode;
  groups: { name: string; cards: ServiceCard[] }[];
  note?: string;
  id?: string;
}

export function ServiceCards({ title, intro, groups, note, id }: ServiceCardsProps) {
  return (
    <section className={`${kit.section} ${kit.white}`} id={id}>
      <div className="container">
        <Reveal as="h2" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
          {title}
        </Reveal>
        {intro && <p className={`${kit.lead} ${kit.centre} ${styles.intro}`}>{intro}</p>}

        {groups.map((group, g) => (
          <div key={group.name} className={styles.group}>
            <div className={`${styles.groupHead} ${note && g === 0 ? styles.withNote : ""}`}>
              {note && g === 0 && (
                <ScriptNote point="down-left" className={styles.note}>
                  {note}
                </ScriptNote>
              )}
              <h3 className={`${kit.h4} ${styles.groupName}`}>{group.name}</h3>
            </div>
            <ul className={`${styles.grid} ${group.cards.length < 3 ? styles.few : ""}`}>
              {group.cards.map((card, i) => (
                <Reveal
                  as="li"
                  key={card.href}
                  className={styles.cell}
                  delay={(i % 3) as 0 | 1 | 2}
                >
                  <div
                    className={`${styles.card} ${i === 1 && group.cards.length > 2 ? styles.tilted : ""}`}
                  >
                    <span className={styles.ring}>
                      <Icon name={iconFor(card.name)} className={styles.icon} />
                    </span>
                    <h4 className={styles.name}>{card.name}</h4>
                    {card.text && <p className={styles.text}>{card.text}</p>}
                    {card.tags && card.tags.length > 0 && (
                      <ul className={styles.tags}>
                        {card.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <Link href={card.href} className={`${kit.button} ${styles.link}`}>
                      Explore {card.name}
                      <span className={styles.stretch} aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
