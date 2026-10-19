import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Inline } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, iconFor } from "./icons";
import kit from "./kit.module.css";
import styles from "./IconPanel.module.css";

interface IconPanelProps {
  title?: ReactNode;
  intro?: string;
  items: { title: string; text?: string }[];
  background: Picture;
  children?: ReactNode;
  id?: string;
}

export function IconPanel({ title, intro, items, background, children, id }: IconPanelProps) {
  const cols = items.length === 4 || items.length > 6 ? 4 : Math.min(3, items.length);
  return (
    <section className={`${kit.section} ${kit.dark}`} id={id}>
      <div className="container">
        <div className={styles.panel} style={{ "--cols": cols } as CSSProperties}>
          <Image
            src={background.src}
            alt=""
            width={background.width}
            height={background.height}
            sizes="100vw"
            className={styles.bg}
          />
          {title && <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{title}</h2>}
          {intro && <p className={`${kit.text} ${kit.centre} ${styles.intro}`}>{intro}</p>}
          <ul className={`${styles.grid} ${items.length > 3 ? styles.compact : ""}`}>
            {items.map((item, i) => (
              <Reveal
                as="li"
                key={i}
                className={styles.item}
                delay={Math.min(i % cols, 3) as 0 | 1 | 2 | 3}
              >
                <span className={styles.ring}>
                  <Icon name={iconFor(item.title)} className={styles.icon} />
                </span>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                {item.text && (
                  <p className={styles.itemText}>
                    <Inline text={item.text} />
                  </p>
                )}
              </Reveal>
            ))}
          </ul>
          {children && <div className={styles.after}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
