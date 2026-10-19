import Link from "next/link";
import { Fragment } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { CompareTable } from "./CompareTable";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Icon, TickCircle, iconFor } from "./icons";
import { ResearchFinding } from "./ResearchFinding";
import kit from "./kit.module.css";
import styles from "./Prose.module.css";

interface ProseProps {
  blocks: Block[];
  tone?: "dark" | "light";
  className?: string;
}

export function Prose({ blocks, tone = "dark", className }: ProseProps) {
  if (!blocks.length) return null;
  return (
    <div
      className={[styles.prose, tone === "light" ? styles.onLight : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {blocks.map((block, i) => (
        <Fragment key={i}>{renderBlock(block, tone)}</Fragment>
      ))}
    </div>
  );
}

/** "Useful Answers + Human Expertise + ...", three or more Title Case terms joined by plus signs. */
export function formulaTerms(text: string): string[] | null {
  const terms = text.split(" + ").map((t) => t.trim());
  if (terms.length < 3 || !terms.every((t) => /^[A-Z][\w&’'.-]*(?:\s[\w&’'.-]+){0,4}$/.test(t)))
    return null;
  return terms;
}

function Formula({ terms }: { terms: string[] }) {
  return (
    <Reveal as="ol" className={styles.formula}>
      {terms.map((t, i) => (
        <li key={t} style={{ ["--i" as string]: i }}>
          <span className={styles.plus} aria-hidden="true">
            {i > 0 ? "+" : ""}
          </span>
          <Icon name={iconFor(t, "spark")} className={styles.termIcon} />
          <span className={styles.term}>{t}</span>
        </li>
      ))}
    </Reveal>
  );
}

export function TickList({ items, className }: { items: string[]; className?: string }) {
  // Short items read better in two columns; sentences keep one.
  const short = items.length >= 6 && items.every((it) => it.length < 48);
  return (
    <ul className={[styles.ticks, short ? styles.twoCol : "", className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <li key={i}>
          <TickCircle className={kit.tick} />
          <span>
            <Inline text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function StepChain({ steps, tone = "dark" }: { steps: string[]; tone?: "dark" | "light" }) {
  return (
    <ol className={`${styles.chain} ${tone === "light" ? styles.onLight : ""}`}>
      {steps.map((step, i) => (
        <li key={i}>
          <span className={styles.chainStep}>{step}</span>
          {i < steps.length - 1 && <ArrowRight className={styles.chainArrow} />}
        </li>
      ))}
    </ol>
  );
}

function renderBlock(block: Block, tone: "dark" | "light", inExample = false) {
  switch (block.type) {
    case "p": {
      const terms = formulaTerms(block.text);
      if (terms) return <Formula terms={terms} />;
      // A line starting with an em dash and "not" is shown struck through
      if (/^—not\s/.test(block.text)) {
        return (
          <p className={styles.notLine}>
            <span className={styles.notMark} aria-hidden="true">
              ✕
            </span>
            <span>
              not <s>{block.text.replace(/^—not\s+/, "")}</s>
            </span>
          </p>
        );
      }
      return (
        <p className={styles.p}>
          <Inline text={block.text} />
        </p>
      );
    }
    case "h3":
      return <h3 className={`${kit.h4} ${styles.h3}`}>{block.text}</h3>;
    case "ul":
      return <TickList items={block.items} />;
    case "ol":
      return (
        <ol className={styles.numbers} start={block.start}>
          {block.items.map((item, i) => (
            <li key={i}>
              <span className={styles.num}>{String(block.start + i).padStart(2, "0")}</span>
              <span>
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "quote":
      // inside an example, the quote is the generic article everyone could publish
      if (inExample) {
        return (
          <figure className={styles.generic}>
            <span className={styles.genericStack} aria-hidden="true" />
            <span className={styles.genericStack} aria-hidden="true" />
            <blockquote className={styles.genericCard}>
              <span className={styles.genericBar} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={styles.genericTitle}>
                <Inline text={block.text.replace(/^[“"]|[”"]$/g, "")} />
              </span>
              <span className={styles.genericLines} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </blockquote>
          </figure>
        );
      }
      return (
        <blockquote className={styles.quote}>
          <span className={styles.quoteMark} aria-hidden="true">
            &ldquo;
          </span>
          <Inline text={block.text.replace(/^[“"]|[”"]$/g, "")} />
        </blockquote>
      );
    case "flow":
      if (inExample && block.steps.length >= 5) return <Pathway steps={block.steps} />;
      return <StepChain steps={block.steps} tone={tone} />;
    case "note":
      return (
        <p className={`${styles.note} ${inExample ? styles.footnote : ""}`}>
          <Inline text={block.text} />
        </p>
      );
    case "cta":
      return (
        <p>
          <Link href={block.href} className={kit.button}>
            {block.text}
          </Link>
        </p>
      );
    case "table":
      return <CompareTable head={block.head} rows={block.rows} tone={tone} />;
    case "finding":
      return <ResearchFinding title={block.title} blocks={block.blocks} />;
    case "example":
      return (
        <aside className={styles.example}>
          <span className={`${kit.script} ${styles.findingNote}`}>Example</span>
          <h3 className={`${kit.h4} ${styles.findingTitle}`}>{block.title}</h3>
          <div className={`${styles.prose} ${styles.exampleBody}`}>
            {block.blocks.map((b, i) => (
              <Fragment key={i}>{renderBlock(b, "dark", true)}</Fragment>
            ))}
          </div>
        </aside>
      );
  }
}

function Pathway({ steps }: { steps: string[] }) {
  return (
    <ol className={styles.pathway}>
      {steps.map((step, i) => (
        <li
          key={i}
          className={i === steps.length - 1 ? styles.pathEnd : undefined}
          style={{ ["--i" as string]: i }}
        >
          <span className={styles.pathDot}>{String(i + 1).padStart(2, "0")}</span>
          <span className={styles.pathText}>{step}</span>
        </li>
      ))}
    </ol>
  );
}
