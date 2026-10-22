import Link from "next/link";
import { home } from "@/data/home";
import { dubaiCommunities, routes } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { SectorIcon } from "@/components/ui/SectorIcon";
import { TiltPanel } from "@/components/ui/TiltPanel";
import styles from "./IndustriesAreas.module.css";

const { industries, areas } = home;
const accents = [
  "#d9f55c",
  "#dcefa6",
  "#e4efb3",
  "#d5edb6",
  "#cfeebe",
  "#e6f0a8",
  "#dbecc0",
  "#e2edbf",
];

export function IndustriesAreas() {
  return (
    <section className="container section" aria-label="Industries and areas">
      <div className={styles.grid}>
        <Reveal className={styles.slot}>
          <TiltPanel
            as="article"
            className={`${styles.panel} ${styles.panelWide}`}
            aria-labelledby="industries-title"
          >
            <span className={styles.light} aria-hidden="true" />
            <div className={styles.head}>
              <div className={styles.headTitle}>
                <span className="eyebrow">Industries</span>
                <SplitText
                  as="h2"
                  id="industries-title"
                  className={styles.title}
                  text={industries.title}
                />
              </div>
              <div className={styles.text}>
                {industries.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <ul className={styles.sectors}>
              {industries.list.map((name, i) => (
                <li key={name} style={{ ["--i" as string]: i }}>
                  <Link href={routes.industry} className={styles.sector}>
                    <span className={styles.sectorIcon}>
                      <SectorIcon name={name} />
                    </span>
                    <span className={styles.sectorName}>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={routes.industry}>Explore Industries</Button>
          </TiltPanel>
        </Reveal>

        <Reveal className={styles.slot} delay={1}>
          <TiltPanel
            as="article"
            className={`${styles.panel} ${styles.panelTint}`}
            aria-labelledby="areas-title"
          >
            <span className={styles.light} aria-hidden="true" />
            <span className="eyebrow">Niagara Region</span>
            <SplitText as="h2" id="areas-title" className={styles.title} text={areas.title} />
            <div className={styles.text}>
              {areas.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <h3 className={styles.sub}>{areas.listTitle}</h3>
            <ul className={styles.chips}>
              {dubaiCommunities.map((name, i) => (
                <li
                  key={name}
                  style={{
                    ["--i" as string]: i,
                    ["--accent" as string]: accents[(i + 3) % accents.length],
                  }}
                >
                  <span className={`${styles.chip} ${styles.chipStatic}`}>
                    <span className={styles.pin} aria-hidden="true" />
                    {name}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.text}>
              {areas.note.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </TiltPanel>
        </Reveal>
      </div>
    </section>
  );
}
