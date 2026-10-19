import { ArrowIcon, Button } from "./Button";
import styles from "./Faq.module.css";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  cta?: { label: string; href: string };
  /** "dark" for an ink section: light rows, lime prompt panel. */
  tone?: "light" | "dark";
}

// "Have Question / FAQ'S": numbered accordion left, prompt panel right.
export function Faq({
  items,
  title = "Have Question",
  eyebrow = "FAQ's",
  cta,
  tone = "light",
}: FaqProps) {
  if (!items.length) return null;
  return (
    <div className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`}>
      <div className="heading heading--center">
        <h2>{title}</h2>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className={styles.grid}>
        <div className={styles.list}>
          {items.map((item, i) => (
            <details key={item.q} className={styles.item} open={i === 0}>
              <summary className={styles.summary}>
                <span className={styles.q}>Q-{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.question}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  <ArrowIcon className={styles.iconOne} />
                  <ArrowIcon className={styles.iconTwo} />
                </span>
              </summary>
              <div className={styles.answer}>
                {item.a.split(/\n{2,}/).map((para, k) => (
                  <p key={k}>{para}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
        <aside className={styles.aside}>
          <span className={styles.asideLabel}>Not sure where to start?</span>
          <h3 className={styles.asideTitle}>Still have any question?</h3>
          <p className={styles.asideText}>
            Tell us what you are seeing and we can start by identifying where the strongest
            opportunity exists.
          </p>
          {cta && (
            <Button
              href={cta.href}
              variant={tone === "dark" ? "primary" : "light"}
              className={styles.asideCta}
            >
              {cta.label}
            </Button>
          )}
        </aside>
      </div>
    </div>
  );
}
