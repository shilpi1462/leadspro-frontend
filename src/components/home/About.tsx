import Link from "next/link";
import { home } from "@/data/home";
import { niagaraCommunities, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { StatCards } from "./StatCards";
import styles from "./About.module.css";

const { hero, team, proof, areas } = home;
const [organic] = proof.cases;

export function About() {
  return (
    <section id="about" className={`on-dark ${styles.block}`} aria-labelledby="about-title">
      <div className={`container ${styles.about}`}>
        <div className={styles.columns}>
          <Reveal className={styles.side}>
            <span className="eyebrow">About us</span>
            <dl className={styles.facts}>
              <div>
                <dt>Based in</dt>
                <dd>
                  {site.city}, {site.region}
                </dd>
              </div>
              <div>
                <dt>Founder</dt>
                <dd>{site.founder}</dd>
              </div>
              <div>
                <dt>E-mail</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
            </dl>
            <Link href={hero.secondary.href} className={styles.secondary}>
              {hero.secondary.label}
            </Link>
          </Reveal>

          <Reveal className={styles.main} delay={1}>
            <ScrollText
              as="h2"
              id="about-title"
              className={styles.statement}
              text={hero.intro}
              tone="lime"
              mark="get found, build trust"
            />

            <div className={styles.team}>
              <h3 className={styles.teamTitle}>{team.title}</h3>
              {team.text.map((t) => (
                <p key={t} className={styles.problems}>
                  {t}
                </p>
              ))}
            </div>
            <p className={styles.pull}>{team.pull}</p>
          </Reveal>
        </div>

        <div className={styles.bento}>
          <StatCards
            stats={team.stats}
            proof={{
              value: organic.metrics[0].value,
              label: organic.metrics[0].label,
              note: organic.note,
            }}
            reach={{ title: areas.listTitle, text: areas.note[0], places: niagaraCommunities }}
          />
        </div>
      </div>
    </section>
  );
}
