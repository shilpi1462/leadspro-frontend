import Link from "next/link";
import { home } from "@/data/home";
import { getServiceGroups } from "@/lib/services";
import { servicePictures, serviceThumbs } from "@/data/images";
import { routes, site } from "@/lib/site";
import { Button, PlayIcon } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { SplitText } from "@/components/ui/SplitText";
import { HeroPanel } from "./HeroPanel";
import styles from "./Hero.module.css";

const { hero } = home;

export function Hero() {
  const chips = getServiceGroups().map((g) => {
    return {
      slug: g.slug,
      name: g.name,
      short: g.short,
      blurb: g.blurb,
      // href: g.href,
      href: "#",
      image: servicePictures[g.slug][0],
      thumb: serviceThumbs[g.slug],
    };
  });
  const initials = site.founder
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.top}>
        <p className={styles.wordmark} aria-hidden="true">
          <span className={styles.wordmarkInner}>
            Leads
            <wbr />
            _Pro
          </span>
        </p>
        <a href={routes.nolink} className={styles.founder}>
          <span className={styles.avatar} aria-hidden="true">
            {initials}
          </span>
          <span className={styles.founderText}>
            <span className={styles.founderName}>{site.founder}</span>
            <span className={styles.founderRole}>Founder &amp; CEO</span>
            <span className={styles.founderCta}>
              Let&rsquo;s Talk
              <span className={styles.founderBadge}>
                <PlayIcon />
              </span>
            </span>
          </span>
        </a>
      </div>

      <HeroPanel chips={chips}>
        <div className={styles.copy}>
          <p className={styles.panelMeta}>
            <span className={styles.dot} aria-hidden="true" />
            Digital marketing agency based in {site.city}, {site.region}
          </p>
          <SplitText as="h1" id="hero-title" className={styles.title} text={hero.title} immediate />
          <div className={styles.actions}>
            <Button href={hero.primary.href} variant="lime">
              {hero.primary.label}
            </Button>
            <Link href={hero.secondary.href} className={styles.secondary}>
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <SocialLinks tone="dark" className={styles.social} />
      </HeroPanel>
    </section>
  );
}
