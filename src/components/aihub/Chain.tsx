import { Up } from "./Up";
import styles from "./Chain.module.css";

interface ChainProps {
  steps: string[];
  /** Stacked top to bottom, as on phones; for narrow columns. */
  vertical?: boolean;
  className?: string;
}

export function Chain({ steps, vertical, className }: ChainProps) {
  return (
    <ol className={`${styles.chain} ${vertical ? styles.vertical : ""} ${className ?? ""}`}>
      {steps.map((step, i) => (
        <li key={step} className={styles.item}>
          {i > 0 && (
            <Up variant="line" delay={i * 0.25} className={styles.link}>
              <span />
              <span />
            </Up>
          )}
          <Up variant="fade" delay={i * 0.25} className={styles.node}>
            <span className={styles.num}>0{i + 1}</span>
            <span className={styles.label}>{step}</span>
          </Up>
        </li>
      ))}
    </ol>
  );
}
