import Link from "next/link";
import styles from "./Logo.module.css";
import Image from "next/image";

export function Logo({ tone = "ink" }: { tone?: "ink" | "light" }) {
  return (
    <Link
      href="/"
      className={`${styles.logo} ${tone === "light" ? styles.light : ""}`}
      aria-label="LeadsPro home"
    >
      <Image
        src="/images/leadspro-logo.webp"
        alt="LeadsPro Logo"
        width={150}
        height={50}
        priority
      />
    </Link>
  );
}
