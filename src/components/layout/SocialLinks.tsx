import { site } from "@/lib/site";
import styles from "./SocialLinks.module.css";

const icons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5h1.5V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.6v7z" />
    </svg>
  ),
};

interface SocialLinksProps {
  tone?: "light" | "dark";
  className?: string;
}

export function SocialLinks({ tone = "light", className }: SocialLinksProps) {
  return (
    <ul
      className={`${styles.list} ${tone === "dark" ? styles.dark : ""} ${className ?? ""}`}
      aria-label="Social"
    >
      {(Object.keys(icons) as (keyof typeof icons)[]).map((key) => (
        <li key={key}>
          <a href={site.social[key]} target="_blank" rel="noopener noreferrer" aria-label={key}>
            {icons[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
