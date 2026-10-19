import { Fragment } from "react";
import Link from "next/link";

interface LinkTextProps {
  text: string;
  links: Record<string, string>;
  as?: "p" | "span";
  className?: string;
}

export function LinkText({ text, links, as: Tag = "p", className }: LinkTextProps) {
  const phrases = Object.keys(links).sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );

  return (
    <Tag className={className}>
      {text.split(pattern).map((part, i) =>
        links[part] ? (
          <Link key={i} href={links[part]}>
            {part}
          </Link>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Tag>
  );
}
