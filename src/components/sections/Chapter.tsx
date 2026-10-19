import type { ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "./Prose";
import kit from "./kit.module.css";
import styles from "./Chapter.module.css";

interface ChapterProps {
  title: ReactNode;
  intro?: Block[];
  blocks: Block[];
  tone?: "dark" | "light" | "white";
  wide?: boolean;
  id?: string;
}

export function Chapter({ title, intro = [], blocks, tone = "dark", wide, id }: ChapterProps) {
  const toneClass = tone === "dark" ? kit.dark : tone === "light" ? kit.light : kit.white;
  const proseTone = tone === "dark" ? "dark" : "light";
  return (
    <section className={`${kit.section} ${toneClass}`} id={id}>
      <div className="container">
        <Reveal as="h2" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
          {title}
        </Reveal>
        {intro.length > 0 && (
          <Prose blocks={intro} tone={proseTone} className={`${kit.lead} ${styles.intro}`} />
        )}
        <Reveal className={wide ? styles.wide : styles.body} delay={1}>
          <Prose blocks={blocks} tone={proseTone} />
        </Reveal>
      </div>
    </section>
  );
}
