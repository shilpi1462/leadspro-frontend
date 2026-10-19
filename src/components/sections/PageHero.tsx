import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { routes } from "@/lib/site";
import { DashedSwoop, Icon, iconFor } from "./icons";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./PageHero.module.css";

export interface Crumb {
  name: string;
  href: string;
}

interface PageHeroProps {
  crumbs: Crumb[];
  title: ReactNode;
  kicker?: string;
  lead?: ReactNode;
  points?: { title: string; text?: string }[];
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  background: Picture;
  cards?: Picture[];
  /** A UI scene for the right-hand side, in place of the photo cards. */
  visual?: ReactNode;
  strip?: { title: string; text: string }[];
}

export function PageHero({
  crumbs,
  title,
  kicker,
  lead,
  points,
  primary,
  secondary,
  background,
  cards = [],
  visual,
  strip,
}: PageHeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <Image
        src={background.src}
        alt=""
        width={background.width}
        height={background.height}
        preload
        fetchPriority="high"
        sizes="100vw"
        className={styles.bg}
      />
      <span className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href={routes.home}>Home</Link>
            {/* a category's crumb can share its address with "Services" or the page itself */}
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <span key={`${i}${c.href}`} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link key={`${i}${c.href}`} href={c.href}>
                  {c.name}
                </Link>
              ),
            )}
          </nav>

          {kicker && <p className={styles.kicker}>{kicker}</p>}
          <h1 id="page-title" className={`${kit.h1} ${styles.title}`}>
            {title}
          </h1>
          {lead && <p className={styles.lead}>{lead}</p>}

          {points && points.length > 0 && (
            <ul className={styles.points}>
              {points.map((p) => (
                <li key={p.title}>
                  <Icon name={iconFor(p.title)} className={styles.pointIcon} />
                  <p>
                    <b>{p.title}</b>
                    {p.text ? <> &ndash; {p.text}</> : null}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {(primary || secondary) && (
            <div className={`${kit.actions} ${styles.actions}`}>
              {primary && <Pill href={primary.href}>{primary.label}</Pill>}
              {secondary && (
                <Pill href={secondary.href} tone="ghost">
                  {secondary.label}
                </Pill>
              )}
            </div>
          )}
        </div>

        {visual ? (
          <div className={`${styles.visual} ${styles.staged}`}>
            <DashedSwoop className={styles.swoop} />
            {visual}
          </div>
        ) : (
          cards.length > 0 && (
            <div className={styles.visual} aria-hidden="true">
              <DashedSwoop className={styles.swoop} />
              {cards.slice(0, 2).map((pic, i) => (
                <span
                  key={pic.src}
                  className={`${styles.card} ${i === 0 ? styles.cardFront : styles.cardBack}`}
                >
                  <Image
                    src={pic.src}
                    alt=""
                    width={pic.width}
                    height={pic.height}
                    sizes="(min-width: 1024px) 34vw, 1px"
                  />
                </span>
              ))}
            </div>
          )
        )}
      </div>

      {strip && strip.length > 0 && (
        <div className={`container ${styles.strip}`}>
          {strip.map((s) => (
            <div key={s.title} className={styles.stripItem}>
              <Icon name={iconFor(s.title + " " + s.text)} className={styles.stripIcon} />
              <p>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
