import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { BigText } from "./BigText";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Up } from "./Up";
import { PrimaryButton } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Why.module.css";

const { why, hero } = aiHub;
const ruleIcons: IconName[] = ["doc", "shield", "layers"];

export function Why() {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={`${s.sheet} ${styles.sheet}`}>
          <Pointer />
          <div className={s.head}>
            <div className={s.headCopy}>
              <Frame hang>
                <Up as="h2" variant="rise" className={s.display8}>
                  {why.title}
                </Up>
              </Frame>
              {why.intro.map((p, i) => (
                <Up
                  as="p"
                  key={p}
                  delay={0.1 + i * 0.1}
                  className={i === 0 ? styles.first : undefined}
                >
                  {p}
                </Up>
              ))}
            </div>
            <Up variant="fade" delay={0.3}>
              <PrimaryButton href={hero.research.href}>{hero.research.label}</PrimaryButton>
            </Up>
          </div>

          <div className={styles.stage}>
            <BigText text="Research" />
            <Up variant="scale" className={styles.robot}>
              <Pic picture={aiHubPictures.robotOpen} sizes="(max-width: 991px) 90vw, 900px" />
            </Up>
            <span className={styles.fadeOut} aria-hidden="true" />
          </div>

          <Up className={styles.combines}>
            <p className={s.pill}>{why.combinesLabel}</p>
            <ul className={styles.chips}>
              {why.combines.map((c, i) => (
                <li key={c}>
                  {i > 0 && (
                    <span className={styles.plus} aria-hidden="true">
                      +
                    </span>
                  )}
                  <span className={styles.chip}>{c}</span>
                </li>
              ))}
            </ul>
          </Up>

          <ul className={styles.rules}>
            {why.rules.map((rule, i) => (
              <Up as="li" key={rule} delay={0.1 * i} className={styles.rule}>
                <span className={styles.ruleIcon}>
                  <Icon name={ruleIcons[i]} />
                </span>
                <p>{rule}</p>
              </Up>
            ))}
          </ul>

          <div className={styles.close}>
            <Up as="p" className={`${s.display6} ${styles.trust}`}>
              {why.trust}
            </Up>
            <Up as="p" delay={0.1} className={s.muted}>
              {why.google}
            </Up>
          </div>
        </div>
      </div>
    </section>
  );
}
