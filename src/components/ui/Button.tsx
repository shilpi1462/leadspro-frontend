import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "light" | "lime" | "outline";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  iconLeft?: boolean;
  tabIndex?: number;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  iconLeft,
  tabIndex,
}: ButtonProps) {
  const cls = [styles.btn, styles[variant], iconLeft ? styles.iconLeft : "", className]
    .filter(Boolean)
    .join(" ");
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const inner = (
    <>
      <span className={styles.label}>
        <span className={styles.labelText}>{children}</span>
        <span className={styles.labelText} aria-hidden="true">
          {children}
        </span>
      </span>
      <span className={styles.badge} aria-hidden="true">
        <ArrowIcon />
        <ArrowIcon />
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} rel="noopener" tabIndex={tabIndex}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} tabIndex={tabIndex}>
      {inner}
    </Link>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
      <path d="M2 1.5v7l6-3.5z" />
    </svg>
  );
}
