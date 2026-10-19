import Image from "next/image";
import { humanEdge } from "@/data/hedge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./HumanEdge.module.css";

// The H-EDGE block from the client's current site: badge on the left, copy on the right, on dark.
export function HumanEdge() {
  const { logo } = humanEdge;
  return (
    <section className={`on-dark ${styles.block}`} aria-labelledby="hedge-title">
      <div className={`container ${styles.inner}`}>
        <Reveal className={styles.badge}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            loading="lazy"
          />
        </Reveal>
        <Reveal className={styles.copy} delay={1}>
          <span className="eyebrow">{humanEdge.eyebrow}</span>
          <SplitText as="h2" id="hedge-title" className={styles.title} text={humanEdge.title} />
          <p className={styles.lead}>{humanEdge.lead}</p>
          {humanEdge.text.map((t) => (
            <p key={t} className={styles.text}>
              {t}
            </p>
          ))}
          <Button href={humanEdge.cta.href} variant="lime" iconLeft>
            {humanEdge.cta.label}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
