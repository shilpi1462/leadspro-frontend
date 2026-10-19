import { home } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { AiSearchPanel } from "./AiSearchPanel";
import styles from "./AskSearch.module.css";

const { ask, aiTerms } = home;

export function AskSearch() {
  return (
    <section className="container section" aria-labelledby="ask-title">
      <div className="heading">
        <SplitText as="h2" id="ask-title" text={ask.title} />
        <span className="eyebrow">AI search</span>
      </div>

      <div className={styles.grid}>
        <Reveal className={styles.queries}>
          <p className="lede">{ask.intro}</p>

          <p className={styles.queryLabel}>{ask.typedLabel}</p>
          <p className={styles.typed}>
            <SearchGlyph />
            {ask.typed}
          </p>

          <p className={styles.queryLabel}>{ask.askedLabel}</p>
          <p className={styles.asked}>
            <SparkGlyph />
            <span>{ask.asked}</span>
          </p>

          <div className={styles.fanout}>
            <FanoutGlyph />
            <p>
              <span className={styles.fanoutLabel}>{ask.fanoutLabel}</span>
              {ask.fanout}
            </p>
          </div>
        </Reveal>

        <Reveal className={styles.how} delay={1}>
          <AiSearchPanel
            label={ask.howLabel}
            steps={ask.how}
            question={ask.asked}
            fanout={ask.fanoutDemo}
            answer={{ text: aiTerms.demo.answer, pick: aiTerms.demo.pick }}
          />
        </Reveal>
      </div>

      <Reveal className={styles.everywhere}>
        <h3 className={styles.everywhereTitle}>{ask.everywhereTitle}</h3>
        <p className={styles.everywhereLead}>{ask.everywhereLead}</p>
        <ul className={styles.surfaces}>
          {ask.surfaces.map((s, i) => (
            <li key={s} style={{ ["--i" as string]: i }}>
              {s}
            </li>
          ))}
        </ul>
        <p className={styles.everywhereLine}>{ask.everywhereLine}</p>
        <Button href={ask.cta.href}>{ask.cta.label}</Button>
      </Reveal>
    </section>
  );
}

function SearchGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.6 5.2L15 7l-5.4 1.8L8 14l-1.6-5.2L1 7l5.4-1.8z" />
    </svg>
  );
}

function FanoutGlyph() {
  return (
    <svg width="44" height="52" viewBox="0 0 44 52" fill="none" aria-hidden="true">
      <circle cx="6" cy="26" r="4" fill="currentColor" />
      <path
        d="M10 26h10M20 26c8 0 6-18 14-18M20 26h14M20 26c8 0 6 18 14 18"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="38" cy="8" r="3" fill="currentColor" />
      <circle cx="38" cy="26" r="3" fill="currentColor" />
      <circle cx="38" cy="44" r="3" fill="currentColor" />
    </svg>
  );
}
