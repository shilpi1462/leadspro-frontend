import type { Metadata } from "next";
import { industryGroups, industryFaqs } from "@/data/industries";
import { caseStudies } from "@/data/portfolio";
import { home } from "@/data/home";
import { wallPictures, workPictures } from "@/data/images";
import { getServiceGroups, servicePath } from "@/lib/services";
import { serviceShortTitle } from "@/lib/content";
import { routes } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LetsTalk } from "@/components/layout/LetsTalk";
import { InnerPage } from "@/components/sections/InnerPage";
import { PageHero } from "@/components/sections/PageHero";
import { JourneyTabs } from "@/components/sections/JourneyTabs";
import { ResultCards } from "@/components/sections/ResultCards";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { CardRow } from "@/components/sections/CardRow";
import { ReadingCards } from "@/components/sections/ReadingCards";
import { FaqSplit } from "@/components/sections/FaqSplit";
import { StepChain } from "@/components/sections/Prose";
import { Icon, type IconName } from "@/components/sections/icons";
import { accent } from "@/components/sections/accent";
import { IndustriesHero, JourneyScene } from "@/components/visuals/scenes";
import kit from "@/components/sections/kit.module.css";
import styles from "./industries.module.css";

const crumbs = [{ name: "Industries", href: routes.industry }];
const { industries } = home;
const journeyIcons: IconName[] = ["pin", "map", "spark"];

export const metadata: Metadata = pageMetadata({
  title:
    "Industries We Serve | Digital Marketing for Contractors, Clinics, Firms & More | Goodfaith",
  description:
    "Digital marketing for different industries: contractors and home services, dental and healthcare clinics, restaurants, law and accounting firms, technology companies and more across Niagara Region and Ontario.",
  path: routes.industry,
});

export default function IndustriesPage() {
  const groups = getServiceGroups();

  return (
    <InnerPage>
      <PageHero
        crumbs={crumbs}
        title={industries.title}
        lead={`${industries.text[0]} ${industries.text[1]}`}
        primary={{ label: home.hero.primary.label, href: home.hero.primary.href }}
        secondary={{ label: home.hero.secondary.label, href: home.hero.secondary.href }}
        background={wallPictures[4]}
        visual={<IndustriesHero />}
      />

      <section className={`${kit.section} ${kit.dark}`} aria-labelledby="journeys-title">
        <div className="container">
          <h2 id="journeys-title" className={`${kit.h2} ${kit.centre} ${styles.title}`}>
            {accent("Should you target your city, your service area or your expertise?")}
          </h2>
          <p className={kit.intro}>
            {industries.text[2]} It depends on how customers choose your business.
          </p>
          <JourneyTabs
            journeys={industryGroups.map((group, i) => ({
              slug: group.slug,
              label: group.title.replace(/^If\s+/, ""),
              icon: <Icon name={journeyIcons[i % journeyIcons.length]} />,
              visual: <JourneyScene index={i} />,
              content: (
                <>
                  <span className={`${kit.script} ${styles.step}`}>Journey 0{i + 1}</span>
                  <h3 className={kit.h3}>{group.title}</h3>
                  <p className={styles.text}>{group.text}</p>
                  <StepChain steps={group.flow.split("→").map((s) => s.trim())} />
                  <p className={styles.note}>{group.note}</p>
                  <ul className={styles.list} aria-label={`Industries: ${group.title}`}>
                    {group.industries.map((name) => (
                      <li key={name}>
                        <Icon name="store" className={styles.listIcon} />
                        {name}
                      </li>
                    ))}
                  </ul>
                </>
              ),
            }))}
          />
        </div>
      </section>

      <ResultCards
        title={accent(home.cases.title)}
        intro={home.cases.intro[0]}
        cards={caseStudies.map((cs) => ({
          href: `${routes.portfolio}#${cs.slug}`,
          label: cs.industry,
          value: cs.metrics[0].value,
          metric: cs.metrics[0].label,
          points: cs.metrics.slice(1).map((m) => `${m.value} ${m.label}`),
          screen: workPictures[cs.slug],
          badge: cs.title,
        }))}
      />

      <ServiceCards
        title="Services for every industry"
        groups={groups.slice(0, 3).map((g) => ({
          name: g.name,
          cards: g.services.slice(0, 3).map((s) => ({
            name: serviceShortTitle(s.data.title),
            href: servicePath(s.slug),
            text: s.data.subtitle ?? s.data.description,
          })),
        }))}
        note={"Pick your\nstarting point"}
      />

      <CardRow
        variant="plain"
        title={accent(home.bottlenecks.title)}
        intro={home.bottlenecks.intro[0]}
        cards={home.bottlenecks.items.map((item) => ({ label: item.q, text: item.a }))}
      />

      <ReadingCards intro="Guides, original research, experiments and industry insights from our work on search, AI-assisted discovery and the businesses we support." />

      <FaqSplit
        title="Frequently Asked Questions"
        items={industryFaqs}
        tone="light"
        cta={{ label: home.hero.primary.label, href: home.hero.primary.href }}
      />

      <div className={kit.white}>
        <LetsTalk />
      </div>

      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(industryFaqs)]} />
    </InnerPage>
  );
}
