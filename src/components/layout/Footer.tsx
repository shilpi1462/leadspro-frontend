import Link from "next/link";
import { getServiceGroups } from "@/lib/services";
import { nav, routes, site } from "@/lib/site";
import { categoryDot } from "@/lib/theme";
import styles from "./Footer.module.css";

interface FooterLink {
  name: string;
  href: string;
  /** Service category, for its colour dot. */
  cat?: string;
}

export function Footer() {
  const groups = getServiceGroups();
  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", href: routes.home },
        ...nav.filter((l) => l.href !== routes.service),
        { name: "Contact", href: routes.contact },
      ],
    },
    { title: "Services", links: groups.map((g) => ({ name: g.name, href: g.href, cat: g.slug })) },
    {
      title: "Get in touch",
      links: [
        { name: "Free Digital Growth Audit", href: routes.audit },
        { name: site.email, href: routes.contact },
        { name: "LinkedIn", href: site.social.linkedin },
        { name: "Instagram", href: site.social.instagram },
        { name: "Facebook", href: site.social.facebook },
      ],
    },
  ];

  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className="container">
        <div className={styles.cols}>
          {columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h2 className={styles.colTitle}>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.name}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href} className={styles.link}>
                        {l.cat ? (
                          <span className="cat-dot" style={categoryDot(l.cat)}>
                            {l.name}
                          </span>
                        ) : (
                          <span>{l.name}</span>
                        )}
                        <span className={styles.chev} aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    ) : (
                      <a href={l.href} className={styles.link} rel="noopener">
                        <span>{l.name}</span>
                        <span className={styles.chev} aria-hidden="true">
                          ›
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bar}>
          <p>
            © Copyright · <strong>{site.legalName}</strong> · {site.region}
          </p>
          <a href="#main" className={styles.top}>
            <span className={styles.topBadge} aria-hidden="true">
              ↑
            </span>
            Back to top
          </a>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          <span className={styles.wordText}>
            Goodfaith<sup>®</sup>
          </span>
        </div>
      </div>
    </footer>
  );
}
