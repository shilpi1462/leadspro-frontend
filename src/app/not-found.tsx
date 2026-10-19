import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/site";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className="section">
      <div className={`container ${styles.wrap}`}>
        <span className="eyebrow">404</span>
        <h1>This page could not be found.</h1>
        <p className="lede">
          The link may be outdated or the page may have moved. Start from the homepage or explore
          our services.
        </p>
        <div className={styles.actions}>
          <Button href={routes.home}>Back to home</Button>
          <Link href={routes.service} className="eyebrow">
            Our services
          </Link>
        </div>
      </div>
    </section>
  );
}
