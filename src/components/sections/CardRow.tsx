import type { CSSProperties, ReactNode } from "react";
import { Inline, plain } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import kit from "./kit.module.css";
import styles from "./CardRow.module.css";

interface CardRowProps {
  title: ReactNode;
  intro?: ReactNode;
  cards: { label: string; text?: string }[];
  variant?: "letter" | "plain" | "outline";
  children?: ReactNode;
  id?: string;
}

export function CardRow({ title, intro, cards, variant = "letter", children, id }: CardRowProps) {
  const tone = variant === "letter" ? kit.dark : kit.light;
  const cols = cards.length % 3 === 0 && cards.length !== 12 ? 3 : 4;
  return (
    <section className={`${kit.section} ${tone}`} id={id}>
      <div className="container">
        <Reveal as="h2" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
          {title}
        </Reveal>
        {intro && <p className={`${kit.text} ${kit.centre} ${styles.intro}`}>{intro}</p>}

        <ol
          className={`${styles.grid} ${styles[variant]}`}
          style={{ "--cols": cols } as CSSProperties}
        >
          {cards.map((card, i) => {
            const label = plain(card.label).replace(/^\d+\.\s*/, "");
            return (
              <Reveal as="li" key={i} className={styles.cell} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className={styles.card}>
                  {variant === "letter" && (
                    <>
                      <span className={styles.badge}>{i + 1}</span>
                      <span className={styles.initial} aria-hidden="true">
                        {label.charAt(0)}
                      </span>
                    </>
                  )}
                  <h3 className={styles.cardTitle}>{label}</h3>
                  {card.text && (
                    <p className={styles.cardText}>
                      <Inline text={card.text} />
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

        {children && <div className={styles.after}>{children}</div>}
      </div>
    </section>
  );
}
