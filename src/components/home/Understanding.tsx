import { home } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { LinkText } from "@/components/ui/LinkText";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Understanding.module.css";

const { understanding } = home;
const pad = (n: number) => String(n).padStart(2, "0");

export function Understanding() {
  const identity = understanding.signals.slice(0, 3);
  const trust = understanding.signals.slice(3);
  const steps = understanding.chain.split("→").map((s) => s.trim());

  const signal = (s: (typeof understanding.signals)[number], i: number) => (
    <li key={s.key} className={styles.signal} style={{ ["--d" as string]: i % 3 }}>
      <span className={styles.meta}>
        <span className={styles.index}>{pad(i + 1)}</span>
        <span className={styles.key}>{s.key}</span>
      </span>
      <span className={styles.text}>{s.text}</span>
    </li>
  );

  return (
    <section className="container section" aria-labelledby="understanding-title">
      <div className="heading">
        <SplitText as="h2" id="understanding-title" text={understanding.title} />
        <span className="eyebrow">Entity clarity</span>
      </div>

      <p className="lede">{understanding.intro}</p>

      <Reveal className={styles.map}>
        <ol className={`${styles.side} ${styles.left}`}>{identity.map((s, i) => signal(s, i))}</ol>
        <div className={styles.hub} aria-hidden="true">
          <span className={styles.core}>
            <span className={styles.mark}>
              <span className={styles.diamond} />
            </span>
            <span className={styles.hubLabel}>Your business</span>
          </span>
        </div>
        <ol className={`${styles.side} ${styles.right}`} start={4}>
          {trust.map((s, i) => signal(s, i + 3))}
        </ol>
      </Reveal>

      <Reveal className={styles.chain}>
        <span className={styles.chainLabel}>{understanding.chainLabel}</span>
        <ol className={styles.track} style={{ ["--n" as string]: steps.length }}>
          {steps.map((step, i) => (
            <li key={step} style={{ ["--i" as string]: i }}>
              <span className={styles.node}>{pad(i + 1)}</span>
              <span className={styles.step}>{step}</span>
            </li>
          ))}
        </ol>
        <div className={styles.foot}>
          <LinkText
            className={styles.outro}
            text={understanding.outro}
            links={understanding.outroLinks}
          />
          <Button href={understanding.cta.href} variant="lime" iconLeft>
            {understanding.cta.label}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
