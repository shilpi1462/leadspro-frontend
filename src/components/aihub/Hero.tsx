import Link from "next/link";
import { aiHub, aiHubPictures } from "@/data/aiHub";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { routes } from "@/lib/site";
import { Pic } from "./Pic";
import { Up } from "./Up";
import { Frame } from "./Frame";
import { LineRow } from "./LineRow";
import { lit } from "./lit";
import { PrimaryButton, ArrowLink } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Hero.module.css";

const { hero, approach } = aiHub;

export function Hero() {
  const strip = [...approach.steps, ...approach.steps, ...approach.steps, ...approach.steps];
  return (
    <>
      <section className={styles.hero} aria-labelledby="hub-title">
        <div className={styles.art} aria-hidden="true">
          <span className={styles.grid} />
          <span className={`${styles.beam} ${styles.beamLeft}`} />
          <span className={`${styles.beam} ${styles.beamRight}`} />
          <Up variant="scale" className={styles.robot}>
            <Pic picture={aiHubPictures.hero} preload sizes="(max-width: 1112px) 100vw, 1112px" />
          </Up>
          <span className={styles.overlay} />
        </div>

        <div className={`${s.container} ${styles.copy}`}>
          <Up variant="fade" className={styles.crumbs}>
            <Breadcrumbs items={[{ name: "AI Hub", href: routes.aiHub }]} />
          </Up>
          <Up variant="rise" delay={0.2} className={s.pill}>
            {hero.kicker}
          </Up>
          <Frame className={styles.titleFrame}>
            <Up
              as="h1"
              id="hub-title"
              variant="rise"
              delay={0.3}
              className={`${s.display10} ${styles.title}`}
            >
              {lit(hero.title, "AI Search")}
            </Up>
          </Frame>
          <Up as="p" variant="rise" delay={0.4} className={styles.lead}>
            {hero.lead}
          </Up>
          <LineRow className={styles.buttons}>
            <PrimaryButton href={hero.research.href}>{hero.research.label}</PrimaryButton>
            <ArrowLink href={hero.guides.href}>{hero.guides.label}</ArrowLink>
          </LineRow>
          <Up as="p" variant="fade" delay={0.6} className={styles.implementation}>
            {hero.implementation.lead}{" "}
            <Link href={hero.implementation.href}>{hero.implementation.label} →</Link>
          </Up>
        </div>
      </section>

      {/* decorative: the approach is set out in full further down */}
      <div className={styles.strip} aria-hidden="true">
        <span className={styles.edgeLeft} />
        <ul className={styles.track}>
          {strip.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
        <span className={styles.edgeRight} />
      </div>
    </>
  );
}
