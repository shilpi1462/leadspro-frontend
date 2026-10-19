import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, splitChapters, splitClosing } from "@/lib/content";
import { parseBlocks, type Block } from "@/lib/blocks";
import { planService } from "@/lib/servicePlan";
import { humanEdge } from "@/data/hedge";
import { serviceGallery, wallPictures } from "@/data/images";
import { routes } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LetsTalk } from "@/components/layout/LetsTalk";
import { InnerPage } from "@/components/sections/InnerPage";
import { PageHero } from "@/components/sections/PageHero";
import { Promo } from "@/components/sections/Promo";
import { ChapterSections } from "@/components/sections/ChapterSections";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FaqSplit } from "@/components/sections/FaqSplit";
import { ReadingCards } from "@/components/sections/ReadingCards";
import { Prose } from "@/components/sections/Prose";
import { accent } from "@/components/sections/accent";
import { HedgeHero, HedgeShowcase } from "@/components/visuals/scenes";
import kit from "@/components/sections/kit.module.css";

const crumbs = [{ name: "The H-EDGE™", href: routes.hedge }];
const entry = getPage("h-edge");

export const metadata: Metadata = entry
  ? pageMetadata({
      title: entry.data.seoTitle,
      description: entry.data.description,
      path: routes.hedge,
    })
  : {};

// A paragraph that is nothing but bold text is the page's own headline line.
const boldLine = (b: Block) => b.type === "p" && /^\*\*[^*]+\*\*$/.test(b.text.trim());

export default function HumanEdgePage() {
  if (!entry) notFound();

  const { main, closing } = splitClosing(entry.body);
  const { intro, chapters } = splitChapters(main);
  const introBlocks = parseBlocks(intro);
  const headline = introBlocks.find(boldLine);
  const introRest = introBlocks.filter((b) => b !== headline);
  const sections = planService(chapters);
  const closingBlocks = closing ? parseBlocks(closing.body) : [];

  const faqs = entry.data.faqs ?? [];
  const primary = {
    label: entry.data.cta?.primary ?? "Request a Free Digital Audit",
    href: routes.audit,
  };
  const secondary = entry.data.cta?.secondary
    ? { label: entry.data.cta.secondary, href: routes.contact }
    : undefined;
  const flow = entry.data.flow ? entry.data.flow.split("→").map((t) => t.trim()) : [];
  const own = serviceGallery["branding"];
  const { logo } = humanEdge;

  return (
    <InnerPage>
      <PageHero
        crumbs={crumbs}
        kicker="The Human Edge"
        title={entry.data.subtitle ?? entry.data.title}
        lead={humanEdge.lead}
        primary={primary}
        secondary={secondary}
        background={wallPictures[0]}
        visual={<HedgeHero logo={logo} />}
      />

      <Promo
        title={
          headline && headline.type === "p"
            ? accent(headline.text.replace(/\*\*/g, ""))
            : entry.data.title
        }
        blocks={introRest}
        listLead={entry.data.flowLabel}
        items={flow}
        note={"Where it\nshows up"}
        visual={<HedgeShowcase />}
      />

      <ChapterSections
        sections={sections}
        photos={[
          wallPictures[1],
          own[1],
          wallPictures[2],
          own[2],
          wallPictures[3],
          own[3],
          wallPictures[5],
        ]}
        stepPhotos={[...wallPictures, ...own]}
        primary={primary}
        secondary={secondary}
      />

      {closing && (
        <CtaBanner
          title={closing.title}
          picture={wallPictures[3]}
          primary={primary}
          secondary={secondary}
          note="Start here"
        >
          <Prose blocks={closingBlocks} />
        </CtaBanner>
      )}

      {faqs.length > 0 && (
        <FaqSplit
          title={entry.data.faqTitle ?? "FAQs"}
          items={faqs}
          picture={wallPictures[5]}
          cta={primary}
        />
      )}

      <ReadingCards intro="Guides, original research, experiments and industry insights from our work on search, AI-assisted discovery and the businesses we support." />

      <div className={kit.white}>
        <LetsTalk />
      </div>

      <JsonLd data={[breadcrumbSchema(crumbs), ...(faqs.length ? [faqSchema(faqs)] : [])]} />
    </InnerPage>
  );
}
