import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Up } from "./Up";
import s from "./AiHub.module.css";
import styles from "./Approach.module.css";

const { approach } = aiHub;

export function Approach() {
  return (
    <section className={styles.wrap}>
      <div className={`${s.sheet} ${styles.sheet}`}>
        <Pointer />
        <div className={styles.copy}>
          <Up as="h2" variant="rise" className={s.display8}>
            {approach.title}
          </Up>
          <Up as="p" delay={0.1}>
            {approach.text}
          </Up>
        </div>

        <Up variant="scale" className={styles.robot}>
          <Pic picture={aiHubPictures.robotTurn} sizes="(max-width: 991px) 80vw, 520px" />
        </Up>

        <div className={styles.steps}>
          <Up variant="rise" className={styles.label}>
            <span className={s.pill}>{approach.label}</span>
          </Up>
          <ol>
            {approach.steps.map((step, i) => (
              <Up as="li" key={step} delay={0.1 * i} className={styles.step}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.word}>{step}</span>
              </Up>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
