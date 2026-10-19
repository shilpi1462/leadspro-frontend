import Link from "next/link";
import type { ReactNode } from "react";
import { Play } from "./icons";
import kit from "./kit.module.css";

type Tone = "accent" | "black" | "outline" | "ghost";

interface PillProps {
  href: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const toneClass: Record<Tone, string> = {
  accent: kit.button,
  black: kit.buttonBlack,
  outline: kit.buttonOutline,
  ghost: kit.buttonGhost,
};

export function Pill({ href, children, tone = "accent", className }: PillProps) {
  const cls = [toneClass[tone], className].filter(Boolean).join(" ");
  const inner =
    tone === "ghost" ? (
      <>
        <Play className={kit.tick} />
        <span>{children}</span>
      </>
    ) : (
      children
    );
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} className={cls} rel="noopener">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
