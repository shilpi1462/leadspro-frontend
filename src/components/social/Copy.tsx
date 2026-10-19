import { Fragment } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import s from "./Social.module.css";

/** A flow written out as a chain of pills, its own separator between the steps. */
export function Chain({
  steps,
  sep = "→",
  className,
}: {
  steps: string[];
  sep?: string;
  className?: string;
}) {
  return (
    <ol className={[s.chain, className].filter(Boolean).join(" ")} aria-label="Process">
      {steps.map((step, i) => (
        <li key={`${step}-${i}`} data-sep={sep}>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  );
}

export function Copy({ blocks, className }: { blocks: Block[]; className?: string }) {
  if (!blocks.length) return null;
  return (
    <div className={[s.copy, className].filter(Boolean).join(" ")}>
      {blocks.map((b, i) => (
        <Fragment key={i}>{render(b)}</Fragment>
      ))}
    </div>
  );
}

function render(b: Block) {
  switch (b.type) {
    case "p":
    case "note":
      return (
        <p>
          <Inline text={b.text} />
        </p>
      );
    case "h3":
      return (
        <p>
          <strong>{b.text}</strong>
        </p>
      );
    case "quote":
      return (
        <blockquote>
          <Inline text={b.text} />
        </blockquote>
      );
    case "ul":
    case "ol":
      return (
        <ul className={s.tags}>
          {b.items.map((it) => (
            <li key={it}>
              <Inline text={it} />
            </li>
          ))}
        </ul>
      );
    case "flow":
      return <Chain steps={b.steps} sep={b.sep} />;
    case "cta":
      return (
        <p>
          <a href={b.href}>{b.text}</a>
        </p>
      );
    case "table":
      return (
        <ul className={s.tags}>
          {b.rows.map((row) => (
            <li key={row.join("|")}>{row.join(" → ")}</li>
          ))}
        </ul>
      );
    case "finding":
    case "example":
      return (
        <>
          <p>
            <strong>{b.title}</strong>
          </p>
          <Copy blocks={b.blocks} />
        </>
      );
  }
}
