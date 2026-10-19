import Image from "next/image";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Inline } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "./icons";
import kit from "./kit.module.css";
import styles from "./SearchList.module.css";

interface SearchListProps {
  title: ReactNode;
  intro?: ReactNode;
  items: string[];
  picture: Picture;
  icon?: IconName;
  children?: ReactNode;
  flip?: boolean;
  id?: string;
}

export function SearchList({
  title,
  intro,
  items,
  picture,
  icon = "search",
  children,
  flip,
  id,
}: SearchListProps) {
  return (
    <section className={`${styles.section} ${flip ? styles.flip : ""}`} id={id}>
      <Image
        src={picture.src}
        alt=""
        width={picture.width}
        height={picture.height}
        sizes="(min-width: 900px) 60vw, 100vw"
        className={styles.bg}
      />
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.copy}>
          <h2 className={`${kit.h2} ${styles.title}`}>{title}</h2>
          {intro && <div className={styles.intro}>{intro}</div>}
          <ul className={`${styles.list} ${items.length > 5 ? styles.twoCol : ""}`}>
            {items.map((item, i) => (
              <li key={i}>
                <Icon name={icon} className={styles.icon} />
                <span>
                  <Inline text={item} />
                </span>
              </li>
            ))}
          </ul>
          {children && <div className={styles.after}>{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}
