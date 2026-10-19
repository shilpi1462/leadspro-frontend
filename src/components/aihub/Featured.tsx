import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Roll } from "./Roll";
import { Up } from "./Up";
import s from "./AiHub.module.css";
import styles from "./Featured.module.css";

const { featured } = aiHub;
const sampleIcons: IconName[] = ["code", "gear", "doc"];

export function Featured() {
  return (
    <section id="featured-research" className={s.section} aria-labelledby="featured-title">
      <div className={s.container}>
        <div className={styles.head}>
          <Frame className={styles.titleFrame}>
            <Up as="h2" id="featured-title" variant="rise" className={s.display9}>
              {featured.title}
            </Up>
          </Frame>
        </div>

        <div className={styles.models}>
          <div className={styles.model}>
            <Up className={`${s.card} ${styles.spec}`}>
              <h3 className={s.display6}>{featured.study}</h3>
              <p>{featured.method}</p>
              <div className={styles.figures}>
                {featured.figures.map((f) => (
                  <div key={f.label}>
                    <Roll value={f.value} className={styles.figure} />
                    <span className={styles.figureLabel}>{f.label}</span>
                  </div>
                ))}
              </div>
            </Up>
            <Up variant="wipe" delay={0.1} className={`${s.card} ${styles.picture}`}>
              <Pic picture={aiHubPictures.productFront} sizes="(max-width: 991px) 100vw, 520px" />
            </Up>
          </div>

          <div className={styles.model}>
            <Up className={`${s.card} ${styles.spec}`}>
              <p className={styles.sampleLabel}>{featured.sampleLabel}</p>
              <ul className={styles.sample}>
                {featured.sample.map((item, i) => (
                  <li key={item}>
                    <Icon name={sampleIcons[i]} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className={styles.found}>{featured.found}</p>
              <p className={s.muted}>{featured.caveat}</p>
              <div className={styles.takeaway}>
                <p className={styles.takeawayLabel}>{featured.takeawayLabel}</p>
                <p className={s.display4}>{featured.takeaway}</p>
              </div>
            </Up>
            <Up variant="wipe" delay={0.1} className={`${s.card} ${styles.picture}`}>
              <Pic picture={aiHubPictures.productSide} sizes="(max-width: 991px) 100vw, 520px" />
            </Up>
          </div>
        </div>
      </div>
    </section>
  );
}
