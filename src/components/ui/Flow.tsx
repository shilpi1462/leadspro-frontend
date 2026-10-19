import styles from "./Flow.module.css";

interface FlowProps {
  children: string;
  sep?: string;
  tone?: "default" | "dark" | "lime";
  size?: "sm" | "md" | "lg";
}

export function Flow({ children, sep = "→", tone = "default", size = "md" }: FlowProps) {
  const steps = String(children)
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <ol className={`${styles.flow} ${styles[tone]} ${styles[size]}`} aria-label="Process">
      {steps.map((step, i) => (
        <li key={`${step}-${i}`} className={styles.item}>
          {i > 0 && (
            <span className={styles.sep} aria-hidden="true">
              {sep}
            </span>
          )}
          <span className={styles.step}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
