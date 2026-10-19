import Link from "next/link";
import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Flow } from "@/components/ui/Flow";
import { ArrowIcon } from "@/components/ui/Button";
import styles from "./prose.module.css";

function Note({ children }: { children: ReactNode }) {
  return <p className={styles.note}>{children}</p>;
}

function Finding({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className={styles.finding}>
      <h2 className={styles.findingTitle}>{title}</h2>
      <div className={styles.findingBody}>{children}</div>
    </aside>
  );
}

function Example({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={styles.example}>
      <h2 className={styles.exampleTitle}>{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Cta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className={styles.ctaLine}>
      <Link href={href} className={styles.ctaLink}>
        <span>{children}</span>
        <ArrowIcon />
      </Link>
    </p>
  );
}

function Anchor({ href = "", children }: { href?: string; children?: ReactNode }) {
  if (href.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Table({ children }: { children?: ReactNode }) {
  return (
    <div className={styles.tableWrap}>
      <table>{children}</table>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Flow: (props) => <Flow {...props} />,
  Note,
  Finding,
  Example,
  Cta,
  a: Anchor,
  table: Table,
};
