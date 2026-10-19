import Link from "next/link";
import { home } from "@/data/home";
import { Button, ArrowIcon } from "@/components/ui/Button";
import { Flow } from "@/components/ui/Flow";
import { categoryOfHref } from "@/lib/services";
import { categoryAccentOf, categoryDot } from "@/lib/theme";
import { EcosystemRing } from "./EcosystemRing";
import { StageDeck } from "./StageDeck";
import styles from "./Process.module.css";

const { ecosystem } = home;

// Card colours in the client's palette: black and dark green, alternating.
const tones = ["ink", "green", "ink", "green"] as const;

export function Process() {
  return (
    <section className="container section" aria-labelledby="process-title">
      <div className="heading heading--center">
        <span className="eyebrow">How we work</span>
        <EcosystemRing id="ecosystem-ring" title={ecosystem.title} />
        <p>{ecosystem.intro}</p>
      </div>

      <StageDeck
        ringId="ecosystem-ring"
        cards={ecosystem.stages.map((stage, i) => ({
          key: stage.n,
          n: stage.n,
          name: stage.name,
          // A stage wears the colour of the first service it leads with; the last stage lists
          // none and keeps the brand lime.
          accent:
            categoryAccentOf(stage.services[0] && categoryOfHref(stage.services[0].href)) ??
            "var(--lime)",
          front: (
            <div className={`${styles.card} ${styles[tones[i % tones.length]]}`}>
              <span className={styles.watermark} aria-hidden="true">
                {stage.n}
              </span>
              <span className={styles.label}>(Stage - {stage.n})</span>
              <h3 className={styles.name}>{stage.name}</h3>
              <p className={styles.text}>{stage.text}</p>
              {stage.services.length > 0 && (
                <ul className={styles.services}>
                  {stage.services.map((s) => (
                    <li key={s.name}>
                      <Link href={s.href}>
                        <span className={styles.serviceName}>
                          <span className="cat-dot" style={categoryDot(categoryOfHref(s.href))}>
                            {s.name}
                          </span>
                          <ArrowIcon />
                        </span>
                        <span className={styles.serviceText}>{s.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {stage.services.length === 0 && (
                <div className={styles.formula}>
                  <Flow sep="+" size="sm">
                    {ecosystem.formula.split(" → ")[0]}
                  </Flow>
                  <span className={styles.formulaResult}>
                    → {ecosystem.formula.split(" → ")[1]}
                  </span>
                </div>
              )}
            </div>
          ),
        }))}
      />

      <div className={styles.outcomes}>
        {ecosystem.outcomes.map((o) => (
          <div key={o.name}>
            <h3 className={styles.outcomeName}>{o.name}</h3>
            <p className={styles.text}>{o.text}</p>
          </div>
        ))}
        <div className={styles.cta}>
          <Button href={ecosystem.cta.href}>{ecosystem.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
