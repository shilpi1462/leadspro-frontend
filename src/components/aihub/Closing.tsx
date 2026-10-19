import Link from "next/link";
import { aiHub, aiHubPictures } from "@/data/aiHub";
import { site } from "@/lib/site";
import { Icon, type IconName } from "@/components/sections/icons";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Pointer } from "./Pointer";
import { Up } from "./Up";
import { PrimaryButton, ArrowLink } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Closing.module.css";

const { author, principles, closing } = aiHub;
const principleIcons: IconName[] = [
  "target",
  "doc",
  "users",
  "search",
  "layers",
  "shield",
  "refresh",
  "spark",
];

export function Principles() {
  const initials = site.founder
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className={s.section} aria-labelledby="principles-title">
      <div className={s.container}>
        <div className={styles.aboutPanel}>
          <Up variant="scale" className={styles.aboutPhoto}>
            <Pic picture={aiHubPictures.outsideWide} sizes="100vw" />
          </Up>
          <span className={styles.aboutShade} aria-hidden="true" />
          <div className={styles.authorCol}>
            <Up as="h2" className={s.display8}>
              {author.title}
            </Up>
            <Up as="p" delay={0.1} className={styles.byline}>
              {author.byline}
            </Up>
            <Up as="p" delay={0.2}>
              {author.text}
            </Up>
          </div>
          <Up delay={0.3} className={styles.person}>
            <span className={styles.plus} aria-hidden="true">
              +
            </span>
            <span className={styles.avatar} aria-hidden="true">
              {initials}
            </span>
            <span className={styles.name}>{author.name}</span>
            <span className={s.muted}>{author.role}</span>
          </Up>
        </div>

        <div className={styles.values}>
          <Frame className={styles.valuesFrame}>
            <Up as="h2" id="principles-title" variant="rise" className={s.display8}>
              {principles.title}
            </Up>
          </Frame>
          <ol className={styles.principles}>
            {principles.list.map((p, i) => (
              <Up
                as="li"
                key={p}
                variant="rise"
                delay={0.06 * (i % 4)}
                className={styles.principle}
              >
                <span className={styles.pNum}>0{i + 1}</span>
                <span className={styles.pIcon}>
                  <Icon name={principleIcons[i]} />
                </span>
                <h3 className={styles.pName}>{p}</h3>
              </Up>
            ))}
          </ol>
        </div>

        <div className={styles.goalStage}>
          <Up variant="scale" className={styles.hand}>
            <Pic picture={aiHubPictures.axHand} sizes="(max-width: 991px) 100vw, 760px" />
          </Up>
          <Up as="p" variant="rise" delay={0.2} className={styles.goal}>
            {principles.goal[0]} <span className={s.lit}>{principles.goal[1]}</span>
          </Up>
        </div>
      </div>
    </section>
  );
}

export function Closing() {
  const strip = [...closing.topics, ...closing.topics];
  return (
    <section className={styles.closing} aria-labelledby="closing-title">
      {/* decorative: the same topics are listed in the copy below */}
      <div className={styles.marquee} aria-hidden="true">
        <span className={styles.edgeLeft} />
        <ul className={styles.track}>
          {strip.map((t, i) => (
            <li key={`${t}-${i}`}>{t}</li>
          ))}
        </ul>
        <span className={styles.edgeRight} />
      </div>

      <div className={s.container}>
        <div className={`${s.sheet} ${styles.cta}`}>
          <Up variant="scale" className={styles.ctaPhoto}>
            <Pic picture={aiHubPictures.deliveryWide} sizes="100vw" />
          </Up>
          <span className={styles.ctaShade} aria-hidden="true" />
          <Pointer />
          <div className={styles.ctaCopy}>
            <Up as="h2" id="closing-title" className={s.display9}>
              {closing.title}
            </Up>
            <Up as="p" delay={0.1} className={styles.ctaLead}>
              {closing.lead.join(" ")}
            </Up>
            <Up as="p" delay={0.2} className={s.muted}>
              {closing.topicsLabel} {closing.topics.join(" • ")}
            </Up>
            <Up variant="fade" delay={0.3} className={s.buttons}>
              <PrimaryButton href={closing.primary.href}>{closing.primary.label}</PrimaryButton>
              <ArrowLink href={closing.secondary.href}>{closing.secondary.label}</ArrowLink>
            </Up>
            <Up as="p" variant="fade" delay={0.4} className={styles.help}>
              {closing.help.lead} <Link href={closing.help.href}>{closing.help.label} →</Link>
            </Up>
          </div>
        </div>
      </div>
    </section>
  );
}
