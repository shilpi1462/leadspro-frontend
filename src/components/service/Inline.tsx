import { Fragment, type ReactNode } from "react";
import Link from "next/link";

// The service copy only uses **bold**, `code` and the odd [link](/path) inline.
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        let node: ReactNode = part;
        if (part.startsWith("**") && part.endsWith("**"))
          node = <strong>{part.slice(2, -2)}</strong>;
        else if (part.startsWith("`") && part.endsWith("`"))
          node = <code>{part.slice(1, -1)}</code>;
        else {
          const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (link) {
            node = link[2].startsWith("/") ? (
              <Link href={link[2]}>{link[1]}</Link>
            ) : (
              <a href={link[2]} target="_blank" rel="noopener noreferrer">
                {link[1]}
              </a>
            );
          }
        }
        return <Fragment key={i}>{node}</Fragment>;
      })}
    </>
  );
}

/** Drops the Markdown marks, for places that need a plain string (alt text, aria labels). */
export const plain = (text: string) =>
  text.replace(/\*\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
