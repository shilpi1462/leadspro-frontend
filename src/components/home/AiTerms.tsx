import { home } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { AiChatDemo } from "./AiChatDemo";
import styles from "./AiTerms.module.css";

const { aiTerms, ask } = home;
// AI SEO, AEO and GEO all sit in the SEO & AI Search category, so they share its hue at three depths.
const accents = ["var(--c-accent)", "var(--c-b)", "var(--c-a)"];

export function AiTerms() {
  return (
    <section className="section--tint" aria-labelledby="ai-terms-title">
      <div className="container section">
        <div className="heading">
          <SplitText as="h2" id="ai-terms-title" text={aiTerms.title} />
          <span className="eyebrow">Definitions</span>
        </div>

        <p className="lede">{aiTerms.intro}</p>

        <div className={styles.cards}>
          {aiTerms.items.map((item, i) => (
            <Reveal
              key={item.name}
              className={styles.card}
              delay={(i % 3) as 0 | 1 | 2}
              style={{ ["--accent" as string]: accents[i] }}
            >
              <h3 className={styles.name}>{item.name}</h3>
              <p className={styles.text}>{item.text}</p>
            </Reveal>
          ))}
        </div>

        {/* The recap on ink, with the same customer question from above being asked on a
            phone beside it, and the business coming back at the top of the answer. */}
        <Reveal className={styles.simple}>
          <div className={styles.simpleCopy}>
            <span className={styles.simpleLabel}>{aiTerms.simpleLabel}</span>
            <dl className={styles.list}>
              {aiTerms.simple.map((row) => (
                <div key={row.term}>
                  <dt>{row.term}</dt>
                  <dd>{row.text}</dd>
                </div>
              ))}
            </dl>
            <Button href={aiTerms.cta.href} variant="lime" iconLeft>
              {aiTerms.cta.label}
            </Button>
          </div>
          <div className={styles.stage}>
            <span className={styles.glow} aria-hidden="true" />
            <AiChatDemo question={ask.asked} demo={aiTerms.demo} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
