import { DoodleArrow } from "./icons";
import kit from "./kit.module.css";
import styles from "./ScriptNote.module.css";

interface ScriptNoteProps {
  children: string;
  /** Which way the arrow leaves the words. */
  point?: "down-left" | "down-right" | "right" | "left";
  className?: string;
}

export function ScriptNote({ children, point = "down-left", className }: ScriptNoteProps) {
  return (
    <span
      className={[styles.note, styles[point.replace("-", "")], className].filter(Boolean).join(" ")}
      aria-hidden="true"
    >
      <span className={`${kit.script} ${styles.words}`}>{children}</span>
      <DoodleArrow className={styles.arrow} />
    </span>
  );
}
