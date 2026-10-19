import Link from "next/link";
import styles from "./AiHub.module.css";

interface ButtonProps {
  href: string;
  children: string;
  className?: string;
}

export function PrimaryButton({ href, children, className }: ButtonProps) {
  return (
    <Link href={href} className={`${styles.primary} ${className ?? ""}`}>
      <span>{children}</span>
      <span className={styles.primaryRoll} aria-hidden="true">
        {children}
      </span>
    </Link>
  );
}

// Text link with a chevron that steps 3px right on hover.
export function ArrowLink({ href, children, className }: ButtonProps) {
  return (
    <Link href={href} className={`${styles.arrowLink} ${className ?? ""}`}>
      {children}
      <Chevron />
    </Link>
  );
}

export const Chevron = () => (
  <svg viewBox="0 0 16 16" className={styles.chevron} aria-hidden="true">
    <path
      d="M6 3.5L10.5 8 6 12.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Cross = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
    <path
      d="M4.5 4.5l7 7M11.5 4.5l-7 7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);
