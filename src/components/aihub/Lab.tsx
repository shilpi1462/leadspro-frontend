import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { Chain } from "./Chain";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Up } from "./Up";
import s from "./AiHub.module.css";
import styles from "./Lab.module.css";

const { lab } = aiHub;
const icons: IconName[] = ["link", "badge", "layers", "map", "pen", "code"];

export function Lab() {
  return (
    <section className={s.section} aria-labelledby="lab-title">
      <div className={s.container}>
        <div className={styles.head}>
          <Frame hang>
            <Up as="h2" id="lab-title" variant="rise" className={s.display8}>
              {lab.title}
            </Up>
          </Frame>
          <div className={styles.lead}>
            {lab.lead.map((p, i) => (
              <Up
                as="p"
                key={p}
                variant="rise"
                delay={0.1 * (i + 1)}
                className={i === 0 ? styles.first : undefined}
              >
                {p}
              </Up>
            ))}
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.stage}>
            <Pointer />
            <span className={styles.lines} aria-hidden="true" />
            <Up variant="scale" className={styles.headArt}>
              <Pic picture={aiHubPictures.axCircuitHead} sizes="(max-width: 991px) 70vw, 420px" />
            </Up>
            <Up variant="rise" delay={0.2} className={styles.label}>
              <span className={s.pill}>{lab.areasLabel}</span>
            </Up>
          </div>

          <ul className={styles.cells}>
            {lab.areas.map((area, i) => (
              <Up as="li" key={area.title} variant="rise" delay={0.08 * i} className={styles.cell}>
                <span className={styles.num}>0{i + 1}</span>
                <span className={styles.icon}>
                  <Icon name={icons[i]} />
                </span>
                <h3 className={s.display6}>{area.title}</h3>
                <p>{area.text}</p>
              </Up>
            ))}
          </ul>
        </div>

        <div className={`${s.sheet} ${styles.process}`}>
          <Pointer />
          <Up className={styles.processCopy}>
            <p className={styles.processLabel}>{lab.processLabel}</p>
            <Chain steps={lab.process} vertical />
          </Up>
          <Up variant="scale" className={styles.laptop}>
            <Pic picture={aiHubPictures.laptop} sizes="(max-width: 991px) 90vw, 640px" />
          </Up>
        </div>
      </div>
    </section>
  );
}
