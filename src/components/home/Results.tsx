import { home } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Flow } from "@/components/ui/Flow";
import { Reveal } from "@/components/ui/Reveal";
import { Screenshot } from "@/components/ui/Screenshot";
import { SplitText } from "@/components/ui/SplitText";
import { categoryTheme } from "@/lib/theme";
import styles from "./Results.module.css";

const { proof } = home;
export function Results() {
  return (
    <section className="section--tint" aria-labelledby="results-title">
      <div className="container section">
        <div className="heading">
          <SplitText as="h2" id="results-title" text={proof.title} />
          <span className="eyebrow">Results</span>
        </div>
        <p className={styles.intro}>
          {proof.intro} {proof.lead}
        </p>

        <ol className={styles.rows}>
          {proof.items.map((item, i) => (
            <li key={item.name} className={styles.row} {...categoryTheme(item.category)}>
              <span className={styles.icon} aria-hidden="true">
                0{i + 1}
              </span>
              <span className={styles.main}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.text}>{item.text}</span>
              </span>
              <span className={styles.source}>{item.source}</span>
            </li>
          ))}
        </ol>

        <div className={styles.real}>
          <h3 className={styles.realTitle}>{proof.realTitle}</h3>
          {proof.realText.map((t) => (
            <p key={t} className={styles.realText}>
              {t}
            </p>
          ))}
        </div>

        {proof.cases.map((item) => (
          <article key={item.name} className={styles.case}>
            <Reveal className={styles.caseHead}>
              <h3 className={styles.caseName}>{item.name} </h3>
              <ul className={styles.metrics}>
                {item.metrics.map((m) => (
                  <li key={m.label}>
                    <Counter value={m.value} className={styles.metricValue} />
                    <span className={styles.metricLabel}>{m.label}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>{item.note}</p>
            </Reveal>
            <Reveal className={styles.caseBody} delay={1}>
              <Screenshot {...item.shot} />
              {item.text.map((t) => (
                <p key={t} className={styles.caseText}>
                  {t}
                </p>
              ))}
              <Flow size="sm">{item.flow}</Flow>
            </Reveal>
          </article>
        ))}

        <Reveal className={`on-dark ${styles.ai}`}>
          <div className={styles.aiCopy}>
            <h3 className={styles.aiTitle}>{proof.ai.title}</h3>
            {proof.ai.intro.map((t) => (
              <p key={t} className={styles.aiText}>
                {t}
              </p>
            ))}
            <ul className={styles.chips}>
              {proof.ai.platforms.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className={styles.aiShot}>
            <Screenshot {...proof.ai.shot} tone="dark" />
          </div>
          <div className={styles.aiFactors}>
            <p className={styles.aiText}>{proof.ai.factorsLabel}</p>
            <ul className={styles.chips}>
              {proof.ai.factors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className={styles.aiText}>{proof.ai.outro}</p>
          </div>
        </Reveal>

        <div className={styles.closing}>
          <h3 className={styles.closingTitle}>{proof.closingTitle}</h3>
          <Flow size="lg">{proof.closingFlow}</Flow>
          <p className={styles.closingText}>{proof.closingText}</p>
          <Button href={proof.cta.href}>{proof.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
