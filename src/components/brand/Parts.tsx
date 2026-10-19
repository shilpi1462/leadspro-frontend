import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { G } from "@/components/visuals/parts/glyphs";
import s from "./Brand.module.css";

/** A label split into letters twice over, so hover can roll the second copy up into place. */
export function Roll({ text }: { text: string }) {
  const letters = (hidden: boolean) =>
    [...text].map((ch, i) => (
      <i
        key={i}
        style={{ ["--c" as string]: i } as CSSProperties}
        aria-hidden={hidden || undefined}
      >
        {ch}
      </i>
    ));
  return (
    <span className={s.roll}>
      <span className={s.srOnly}>{text}</span>
      <span aria-hidden="true">{letters(true)}</span>
      <span aria-hidden="true">{letters(true)}</span>
    </span>
  );
}

function Anchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export function ArrowButton({
  href,
  label,
  light,
  className,
}: {
  href: string;
  label: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Anchor
      href={href}
      className={[s.arrow, light ? s.arrowLight : "", className].filter(Boolean).join(" ")}
    >
      <span className={s.round} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </span>
      <Roll text={label} />
    </Anchor>
  );
}

export function TextButton({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Anchor href={href} className={[s.textButton, className].filter(Boolean).join(" ")}>
      <Roll text={label} />
      <span className={s.round} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14m-6-6 6 6-6 6" />
        </svg>
      </span>
    </Anchor>
  );
}

export function Marquee({
  children,
  right,
  className,
  fade,
}: {
  children: ReactNode;
  right?: boolean;
  className?: string;
  fade?: boolean;
}) {
  return (
    <div className={[s.marquee, right ? s.marqueeRight : "", className].filter(Boolean).join(" ")}>
      {[0, 1, 2].map((copy) => (
        <div key={copy} className={s.track} aria-hidden={copy > 0 || undefined}>
          {children}
        </div>
      ))}
      {fade && (
        <>
          <span className={s.edgeFade} aria-hidden="true" />
          <span className={`${s.edgeFade} ${s.edgeFadeRight}`} aria-hidden="true" />
        </>
      )}
    </div>
  );
}

/** Title with its closing words in the lime pill. */
export function Lit({ title, words = 1 }: { title: string; words?: number }) {
  const parts = title.split(" ");
  const take = Math.min(words, parts.length - 1);
  if (take < 1) return <>{title}</>;
  return (
    <>
      {parts.slice(0, -take).join(" ")}{" "}
      <span className={s.highlight}>{parts.slice(-take).join(" ")}</span>
    </>
  );
}

export function Chips({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={[s.chips, className].filter(Boolean).join(" ")}>
      {items.map((it) => (
        <li key={it}>
          <G name="check" />
          <Inline text={it} />
        </li>
      ))}
    </ul>
  );
}

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

function render(b: Block): ReactNode {
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
        <h3 className={`${s.display} ${s.h3Small}`}>
          <Inline text={b.text} />
        </h3>
      );
    case "quote":
      return (
        <blockquote>
          <Inline text={b.text} />
        </blockquote>
      );
    case "ul":
    case "ol":
      return <Chips items={b.items} />;
    case "flow":
      return <Chain steps={b.steps} sep={b.sep} />;
    case "cta":
      return (
        <p>
          <Anchor href={b.href} className={s.inlineLink}>
            {b.text}
          </Anchor>
        </p>
      );
    case "table":
      return <Chips items={b.rows.map((row) => row.join(" → "))} />;
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
