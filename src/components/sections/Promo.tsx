import type { ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import { Prose, TickList } from "./Prose";
import { ScriptNote } from "./ScriptNote";
import kit from "./kit.module.css";
import styles from "./Promo.module.css";

interface PromoProps {
  title: ReactNode;
  /** Opening copy, kept in its written order: paragraphs centre, lists sit in a column. */
  blocks?: Block[];
  /** The line that introduces the tick list, then the list itself. */
  listLead?: string;
  items?: string[];
  note?: string;
  tone?: "dark" | "light";
  id?: string;
  visual?: ReactNode;
}

export function Promo({
  title,
  blocks = [],
  listLead,
  items = [],
  note,
  tone = "dark",
  id,
  visual,
}: PromoProps) {
  return (
    <section
      className={`${kit.section} ${tone === "light" ? kit.light : kit.dark} ${styles.promo}`}
      id={id}
    >
      <div className="container">
        <Reveal as="h2" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
          {title}
        </Reveal>
        {blocks.length > 0 && (
          <Reveal className={styles.copy} delay={1}>
            <Prose blocks={blocks} tone={tone} />
          </Reveal>
        )}
        {items.length > 0 && (
          <Reveal className={styles.list} delay={2}>
            {listLead && (
              <p className={styles.listLead}>
                <Inline text={listLead} />
              </p>
            )}
            <TickList items={items} />
          </Reveal>
        )}
        {visual && (
          <div className={styles.visual}>
            {note && (
              <ScriptNote className={styles.visualNote} point="down-right">
                {note}
              </ScriptNote>
            )}
            {visual}
          </div>
        )}
      </div>
      {note && !visual && <ScriptNote className={styles.note}>{note}</ScriptNote>}
    </section>
  );
}
