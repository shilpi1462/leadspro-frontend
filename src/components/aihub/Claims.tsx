import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Up } from "./Up";
import { Cross } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Claims.module.css";

const { claims } = aiHub;
const ruleIcons: IconName[] = ["shield", "spark", "search"];

export function Claims() {
  return (
    <section className={s.section} aria-labelledby="claims-title">
      <div className={s.container}>
        <div className={`${s.sheet} ${styles.sheet}`}>
          <Pointer />
          <div className={styles.grid}>
            <div className={styles.side}>
              <Frame hang>
                <Up as="h2" id="claims-title" variant="rise" className={s.display8}>
                  {claims.title}
                </Up>
              </Frame>
              <Up as="p" delay={0.1}>
                {claims.lead}
              </Up>
              <Up variant="scale" className={styles.robot}>
                <Pic picture={aiHubPictures.robotDark} sizes="(max-width: 991px) 70vw, 420px" />
              </Up>
            </div>

            <div>
              <Up variant="rise" className={styles.label}>
                <span className={s.pill}>{claims.listLabel}</span>
              </Up>
              <ol className={styles.list}>
                {claims.list.map((claim, i) => (
                  <Up as="li" key={claim} delay={0.05 * i} className={styles.row}>
                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.claim}>{claim}</span>
                    <span className={styles.cross}>
                      <Cross />
                    </span>
                  </Up>
                ))}
              </ol>
              <Up as="p" className={`${s.muted} ${styles.google}`}>
                {claims.google}
              </Up>
            </div>
          </div>

          <ul className={styles.cards}>
            {claims.rules.map((rule, i) => (
              <Up as="li" key={rule} delay={0.1 * i} className={styles.card}>
                <span className={styles.icon}>
                  <Icon name={ruleIcons[i]} />
                </span>
                <p>{rule}</p>
                {i === claims.rules.length - 1 && (
                  <p className={`${s.display6} ${styles.unknown}`}>{claims.unknown}</p>
                )}
              </Up>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
