import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { Pic } from "./Pic";
import { Up } from "./Up";
import { Frame } from "./Frame";
import s from "./AiHub.module.css";
import styles from "./Intro.module.css";

const { intro } = aiHub;
const icons: IconName[] = ["search", "star", "users", "layers", "code", "chart"];

export function Intro() {
  const left = intro.questions.slice(0, 3);
  const right = intro.questions.slice(3);

  return (
    <section className={s.section}>
      <div className={s.container}>
        <Frame className={styles.statementFrame}>
          <Up as="p" variant="rise" className={styles.statement}>
            {intro.statement}
          </Up>
        </Frame>

        <Up variant="rise" delay={0.2} className={styles.label}>
          <span className={s.pill}>{intro.questionsLabel}</span>
        </Up>

        <div className={styles.map}>
          <Up variant="scale" className={styles.head}>
            <Pic picture={aiHubPictures.axHead} sizes="(max-width: 991px) 100vw, 720px" />
          </Up>
          <Column items={left} icons={icons} side="left" />
          <Column items={right} icons={icons.slice(3)} side="right" offset={3} />
        </div>
      </div>
    </section>
  );
}

function Column({
  items,
  icons,
  side,
  offset = 0,
}: {
  items: string[];
  icons: IconName[];
  side: "left" | "right";
  offset?: number;
}) {
  return (
    <ol className={`${styles.column} ${styles[side]}`} start={offset + 1}>
      {items.map((q, i) => (
        <li key={q} className={styles.item}>
          <Up variant="rise" delay={0.15 * i} className={styles.card}>
            <span className={styles.icon}>
              <Icon name={icons[i]} />
            </span>
            <h3 className={styles.question}>{q}</h3>
          </Up>
          <Up variant="line" delay={0.15 * i} className={styles.pointer}>
            <span />
            <span />
          </Up>
        </li>
      ))}
    </ol>
  );
}
