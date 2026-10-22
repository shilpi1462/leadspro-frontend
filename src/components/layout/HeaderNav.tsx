"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "./SocialLinks";
import { nav, routes, site } from "@/lib/site";
import { categoryDot } from "@/lib/theme";
import styles from "./HeaderNav.module.css";

export interface NavGroup {
  name: string;
  href: string;
  slug: string;
}

const pages = [
  { name: "Home", href: routes.home },
  ...nav.filter((l) => l.href !== routes.service),
];

export function HeaderNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  const current = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <Logo />
          {/* <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={toggle}
          >
            <span />
            <span />
            <span />
          </button> */}
        </div>
      </header>

      <div
        id="site-menu"
        className={`${styles.menu} ${open ? styles.menuOpen : ""}`}
        aria-hidden={!open}
        role="dialog"
        aria-label="Menu"
      >
        <div className={`container ${styles.menuBar}`}>
          <Logo />
          <button type="button" className={styles.close} aria-label="Close menu" onClick={close}>
            <span />
            <span />
          </button>
        </div>

        <div className={`container ${styles.menuBody}`}>
          <div className={styles.cols}>
            <nav className={styles.col} aria-label="Services">
              <h2 className={styles.colTitle}>Services</h2>
              <ul>
                {groups.map((g, i) => (
                  <li key={g.href} style={{ ["--i" as string]: i }}>
                    <Link
                      href={g.href}
                      className={`${styles.link} ${current(g.href) ? styles.linkCurrent : ""}`}
                      onClick={close}
                    >
                      <span className="cat-dot" style={categoryDot(g.slug)}>
                        {g.name}
                      </span>
                      <span className={styles.index}>(0{i + 1})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className={styles.col} aria-label="Pages">
              <h2 className={styles.colTitle}>Pages</h2>
              <ul>
                {pages.map((l, i) => (
                  <li key={l.href} style={{ ["--i" as string]: i }}>
                    <Link
                      href={l.href}
                      className={`${styles.link} ${current(l.href) ? styles.linkCurrent : ""}`}
                      onClick={close}
                    >
                      <span>{l.name}</span>
                      <span className={styles.index}>(0{i + 1})</span>
                    </Link>
                  </li>
                ))}
                <li style={{ ["--i" as string]: pages.length }}>
                  <a href={routes.contact} className={styles.link}>
                    <span>Contact</span>
                    <span className={styles.index}>(0{pages.length + 1})</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div className={styles.col}>
              <h2 className={styles.colTitle}>Follow Us</h2>
              <SocialLinks />
              <div className={styles.promo}>
                <span className={styles.promoLabel}>Free Digital Growth Audit</span>
                <Button href={routes.audit} variant="light">
                  Get Started
                </Button>
              </div>
              <a href={routes.contact} className={styles.email}>
                {site.email}
              </a>
            </div>
          </div>

          <div className={styles.menuFoot}>
            <span>
              <span className={styles.dot} aria-hidden="true" />
              Digital marketing agency based in Niagara Region
            </span>
            <span>Ontario, Canada</span>
            <span>
              Accepting Projects <span className={styles.dotLime} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
