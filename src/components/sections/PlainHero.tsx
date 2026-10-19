import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/lib/site";
import type { Crumb } from "./PageHero";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./PlainHero.module.css";

interface PlainHeroProps {
  crumbs: Crumb[];
  title: ReactNode;
  lead?: ReactNode;
  cta?: { label: string; href: string };
  tone?: "dark" | "light";
  align?: "centre" | "left";
  children?: ReactNode;
}

export function PlainHero({
  crumbs,
  title,
  lead,
  cta,
  tone = "dark",
  align = "centre",
  children,
}: PlainHeroProps) {
  return (
    <section
      className={`${styles.hero} ${tone === "light" ? `${kit.white} ${styles.onLight}` : kit.dark} ${align === "left" ? styles.left : ""}`}
      aria-labelledby="page-title"
    >
      <div className="container">
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href={routes.home}>Home</Link>
          {crumbs.map((c, i) =>
            i === crumbs.length - 1 ? (
              <span key={c.href} aria-current="page">
                {c.name}
              </span>
            ) : (
              <Link key={c.href} href={c.href}>
                {c.name}
              </Link>
            ),
          )}
        </nav>
        <h1 id="page-title" className={`${kit.h1} ${styles.title}`}>
          {title}
        </h1>
        {lead && <p className={styles.lead}>{lead}</p>}
        {cta && (
          <div className={styles.cta}>
            <Pill href={cta.href}>{cta.label}</Pill>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
