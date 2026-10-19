import { home } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { SplitText } from "@/components/ui/SplitText";
import { StickyStack } from "./StickyStack";
import styles from "./ServicesStack.module.css";

const { services } = home;

export function ServicesStack() {
  return (
    <section className="container section" aria-labelledby="services-title">
      <div className="heading">
        <SplitText as="h2" id="services-title" className={styles.heading} text={services.title} />
        <span className="eyebrow">Our services</span>
      </div>
      <p className={styles.intro}>{services.intro.join(" ")}</p>

      <StickyStack className={styles.stack}>
        {services.items.map((item, i) => (
          <li key={item.name} className={styles.slot}>
            <div className={styles.card} style={{ ["--i" as string]: i }}>
              <div className={styles.head}>
                <h3 className={styles.name}>{item.name}</h3>
                <span className={styles.number}>0{i + 1}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.copy}>
                  <p className={styles.text}>{item.text}</p>
                  <Button href={item.href} variant="light">
                    {item.cta}
                  </Button>
                </div>
                <ul
                  className={`${styles.included} ${item.tags.length > 6 ? styles.includedSplit : ""}`}
                  aria-label={`${item.name}: what is included`}
                >
                  {item.tags.map((t, k) => (
                    <li key={t}>
                      <span className={styles.includedIndex}>{String(k + 1).padStart(2, "0")}</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </StickyStack>
    </section>
  );
}
