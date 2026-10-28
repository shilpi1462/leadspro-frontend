import type { Metadata } from "next";
import { caseStudies, caseStudyStandards } from "@/data/portfolio";
import { home } from "@/data/home";
import { workPictures } from "@/data/images";
import { routes } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LetsTalk } from "@/components/layout/LetsTalk";
import { InnerPage } from "@/components/sections/InnerPage";
import { PlainHero } from "@/components/sections/PlainHero";
import { ResultCards } from "@/components/sections/ResultCards";
import { CaseTabs } from "@/components/sections/CaseTabs";
import { Promo } from "@/components/sections/Promo";
import { StepChain, TickList } from "@/components/sections/Prose";
import { accent } from "@/components/sections/accent";
import { CaseDevices } from "@/components/visuals/scenes";
import kit from "@/components/sections/kit.module.css";
import styles from "./portfolio.module.css";

const crumbs = [{ name: "Portfolio", href: routes.portfolio }];

export const metadata: Metadata = pageMetadata({
  title: "Portfolio | Digital Marketing Case Studies & Success Stories | LeadsPro",
  description:
    "LeadsPro case studies: the industry, the initial challenge, the services provided, the strategy and the results—across local services, healthcare and hospitality businesses.",
  path: routes.portfolio,
});

export default function PortfolioPage() {
  return (
    <InnerPage>
      <PlainHero
        tone="light"
        crumbs={crumbs}
        title={
          <>
            Featured <em>Work</em>
          </>
        }
        lead={home.cases.intro[0]}
        cta={{ label: "Share Your Challenge", href: routes.audit }}
      />

      <ResultCards
        title="Case Studies"
        intro={home.cases.intro[1]}
        cards={caseStudies.map((cs) => ({
          href: `#${cs.slug}`,
          label: cs.industry,
          value: cs.metrics[0].value,
          metric: cs.metrics[0].label,
          points: cs.metrics.slice(1).map((m) => `${m.value} ${m.label}`),
          screen: workPictures[cs.slug],
          badge: cs.title,
        }))}
      />

      <section className={`${kit.section} ${kit.white}`} aria-labelledby="cases-title">
        <div className="container">
          <div className={styles.panel}>
            <h2 id="cases-title" className={`${kit.h2} ${kit.centre}`}>
              {accent(home.cases.title)}
            </h2>
            <CaseTabs
              tabs={caseStudies.map((cs) => ({
                slug: cs.slug,
                name: cs.industry.split(" / ")[0],
                detail: (
                  <>
                    <div>
                      <h3 className={styles.caseTitle}>{cs.title}</h3>
                      <p className={styles.client}>{cs.client}</p>
                    </div>
                    <ul className={styles.metrics}>
                      {cs.metrics.map((m) => (
                        <li key={m.label}>
                          <strong>{m.value}</strong>
                          <span>{m.label}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.block}>
                      <h4>Challenge</h4>
                      <p>{cs.challenge}</p>
                    </div>
                    <div className={styles.block}>
                      <h4>Our approach</h4>
                      <p>{cs.strategy}</p>
                    </div>
                    <StepChain steps={cs.flow.split("→").map((s) => s.trim())} tone="light" />
                    <ul className={styles.tags}>
                      {cs.services.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                      <li className={styles.time}>{cs.timeline}</li>
                    </ul>
                  </>
                ),
                visual: (
                  <>
                    <CaseDevices picture={workPictures[cs.slug]} />
                    {cs.snapshot && (
                      <div className={styles.block}>
                        <h4>What we found</h4>
                        <TickList items={cs.snapshot} />
                      </div>
                    )}
                  </>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <Promo
        title={accent(caseStudyStandards.title)}
        blocks={[{ type: "p", text: caseStudyStandards.text }]}
        items={caseStudyStandards.fields}
      />

      <div className={kit.white}>
        <LetsTalk />
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </InnerPage>
  );
}
