"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import s from "./Social.module.css";

interface ButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

function Anchor({ href, className, children, ...rest }: ButtonProps & Record<string, unknown>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

/** Gradient pill. On hover a dark bubble rises in from below; on leave it carries on out of the top. */
export function PrimaryButton({ href, children, className }: ButtonProps) {
  const [hover, setHover] = useState<"in" | "out">();
  return (
    <Anchor
      href={href}
      className={[s.primary, className].filter(Boolean).join(" ")}
      data-hover={hover}
      onMouseEnter={() => setHover("in")}
      onMouseLeave={() => setHover("out")}
      onAnimationEnd={() => setHover((h) => (h === "out" ? undefined : h))}
    >
      <span className={s.primaryText}>{children}</span>
      <span className={s.bubble} aria-hidden="true" />
    </Anchor>
  );
}

export function SecondaryButton({ href, children, className }: ButtonProps) {
  return (
    <Anchor href={href} className={[s.secondary, className].filter(Boolean).join(" ")}>
      {children}
    </Anchor>
  );
}

export function TertiaryButton({ href, children, className }: ButtonProps) {
  return (
    <Anchor href={href} className={[s.tertiary, className].filter(Boolean).join(" ")}>
      {children}
    </Anchor>
  );
}
