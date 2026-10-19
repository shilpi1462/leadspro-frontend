import { aiHub, aiHubPictures as pics } from "@/data/aiHub";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Stack } from "./Stack";
import { Up } from "./Up";
import { ArrowLink } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Library.module.css";

const { library, glossary } = aiHub;
const shelf = [
  pics.axHologramWide,
  pics.axChatbotWide,
  pics.axAnalyst,
  pics.axDashboard,
  pics.axRobotDesk,
];
const termPictures = [pics.axBrain, pics.axChatbot, pics.axHoloHead];

export function Library() {
  return (
    <section className={s.section} aria-labelledby="library-title">
      <div className={s.container}>
        <div className={styles.head}>
          <Frame>
            <Up as="h2" id="library-title" variant="rise" className={s.display9}>
              {library.title}
            </Up>
          </Frame>
          <Up as="p" variant="rise" delay={0.1} className={styles.lead}>
            {library.lead[0]}
          </Up>
          <Up variant="rise" delay={0.2}>
            <span className={s.pill}>{library.lead[1]}</span>
          </Up>
        </div>

        <Stack className={styles.stack}>
          {library.areas.map((area, i) => (
            <article key={area.title} className={styles.entry}>
              <Pointer />
              <div className={styles.entryCopy}>
                <span className={styles.index}>0{i + 1}</span>
                <h3 className={s.display7}>{area.title}</h3>
                <p>{area.text}</p>
              </div>
              <div className={styles.entryArt}>
                <Pic picture={shelf[i]} sizes="(max-width: 767px) 100vw, 640px" />
              </div>
            </article>
          ))}
        </Stack>
      </div>
    </section>
  );
}

export function Glossary() {
  return (
    <section className={`${s.section} ${styles.glossarySection}`} aria-labelledby="glossary-title">
      <div className={s.container}>
        <div className={s.head}>
          <Frame hang>
            <Up as="h2" id="glossary-title" variant="rise" className={s.display8}>
              {glossary.title}
            </Up>
          </Frame>
        </div>

        <ul className={styles.terms}>
          {glossary.terms.map((t, i) => (
            <Up as="li" key={t.term} delay={0.1 * i} className={styles.term}>
              <Up variant="wipe" delay={0.1 * i} className={styles.termArt}>
                <Pic picture={termPictures[i]} sizes="(max-width: 991px) 100vw, 420px" />
                <span className={styles.termBadge}>{t.term}</span>
              </Up>
              <h3 className={s.display6}>{t.term}</h3>
              <p>{t.text}</p>
            </Up>
          ))}
        </ul>

        <div className={styles.glossaryFoot}>
          <Up as="p" className={s.muted}>
            {glossary.google}
          </Up>
          <Up variant="fade" delay={0.1} className={styles.more}>
            <span>{glossary.more.lead}</span>
            <ArrowLink href={glossary.more.href}>{glossary.more.label}</ArrowLink>
          </Up>
        </div>
      </div>
    </section>
  );
}
