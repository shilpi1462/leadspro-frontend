import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { FloatBadges } from "@/components/ui/FloatBadges";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./PageIntro.module.css";

interface PageIntroProps {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Floating badges in the space around the heading (inner pages only). */
  badges?: boolean;
  children?: ReactNode;
}

// Page header: label and H1 with a short description, or the centred variant on listing pages.
export function PageIntro({
  crumbs,
  eyebrow,
  title,
  description,
  align = "left",
  badges,
  children,
}: PageIntroProps) {
  return (
    <header className={`container ${styles.intro} ${align === "center" ? styles.center : ""}`}>
      {badges && <FloatBadges seed={title} centered={align === "center"} />}
      <Breadcrumbs items={crumbs} />
      <div className={styles.row}>
        <div className={styles.copy}>
          <span className="eyebrow">{eyebrow}</span>
          <SplitText as="h1" className={styles.title} text={title} immediate />
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {children}
    </header>
  );
}
