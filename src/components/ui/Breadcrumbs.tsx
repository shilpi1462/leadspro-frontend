import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export interface Crumb {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.name}>
              <span className={styles.sep} aria-hidden="true">
                /
              </span>
              {last ? (
                <span aria-current="page" className={styles.current}>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
