import Link from "next/link";
import styles from "./Logo.module.css";

export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${tone === "light" ? styles.light : ""}`}
      aria-label="Goodfaith home"
    >
      <span className={styles.mark} aria-hidden="true">
        <span className={styles.diamond} />
      </span>
      <span className={styles.word}>Goodfaith</span>
    </Link>
  );
}
