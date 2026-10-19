import Image from "next/image";
import Link from "next/link";
import { home } from "@/data/home";
import { caseStudies } from "@/data/portfolio";
import { workPictures } from "@/data/images";
import { routes } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  return (
    <section className="container section" aria-labelledby="work-title">
      <div className="heading heading--center">
        <h2 id="work-title">
          Featured <em>work</em>
        </h2>
        <span className="eyebrow">Work portfolio</span>
        <p>{home.cases.intro[0]}</p>
      </div>

      <ul className={styles.grid}>
        {caseStudies.map((cs, i) => {
          const pic = workPictures[cs.slug];
          return (
            <Reveal key={cs.slug} as="li" className={i === 0 ? styles.wide : undefined}>
              <Link href={`${routes.portfolio}#${cs.slug}`} className={styles.card}>
                <span className={styles.media}>
                  {pic && (
                    <Image
                      src={pic.src}
                      alt={pic.alt}
                      width={pic.width}
                      height={pic.height}
                      loading="lazy"
                    />
                  )}
                </span>
                <span className={styles.bar}>
                  <span className={styles.title}>{cs.title}</span>
                  <span className={styles.meta}>{cs.industry.split(" / ")[0]}</span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>

      <div className={styles.all}>
        <Button href={routes.portfolio}>View All Work</Button>
      </div>
    </section>
  );
}
