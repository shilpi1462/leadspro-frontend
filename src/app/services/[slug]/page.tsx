import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getService,
  getServiceSlugs,
  serviceShortTitle,
  splitChapters,
  splitClosing,
} from "@/lib/content";
import { getServiceGroups, servicePath } from "@/lib/services";
import { parseBlocks, type Block } from "@/lib/blocks";
import { planService } from "@/lib/servicePlan";
import { routes } from "@/lib/site";
import { categoryTheme } from "@/lib/theme";
import { pageMetadata, breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceGallery, wallPictures } from "@/data/images";
import { Videos } from "@/components/home/Videos";
import { LetsTalk } from "@/components/layout/LetsTalk";
import { InnerPage } from "@/components/sections/InnerPage";
import { PageHero } from "@/components/sections/PageHero";
import { Promo } from "@/components/sections/Promo";
import { ChapterSections } from "@/components/sections/ChapterSections";
import { FaqSplit } from "@/components/sections/FaqSplit";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ReadingCards } from "@/components/sections/ReadingCards";
import { Prose } from "@/components/sections/Prose";
import { accent } from "@/components/sections/accent";
import { ServiceScene } from "@/components/visuals/scenes";
import { SocialTemplate } from "@/components/social/SocialTemplate";
import { socialPages } from "@/data/social";
import { BrandTemplate } from "@/components/brand/BrandTemplate";
import { brandPages } from "@/data/brand";
import { showcasePages } from "@/data/showcase";
import { HeroPhone } from "@/components/showcase/HeroPhone";
import { PhoneSlider } from "@/components/showcase/PhoneSlider";
import { CaseLaptops } from "@/components/showcase/CaseLaptops";
import { CardStackFaq } from "@/components/showcase/CardStackFaq";
import { heroPhone, heroSticker, resultSlides } from "@/components/showcase/screens";
import { home } from "@/data/home";
import kit from "@/components/sections/kit.module.css";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) return {};
  return pageMetadata({
    title: entry.data.seoTitle,
    description: entry.data.description,
    path: servicePath(slug),
  });
}

const seedOf = (s: string) => [...s].reduce((n, c) => n + c.charCodeAt(0), 0);
const rotate = <T,>(list: T[], by: number) => list.map((_, i) => list[(i + by) % list.length]);

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = getService(slug);
  if (!entry) notFound();

  const groups = getServiceGroups();
  const group = groups.find((g) => g.slug === entry.data.category) ?? groups[0];
  const path = servicePath(slug);
  const shortTitle = serviceShortTitle(entry.data.title);
  const isOverview = entry.data.order === 0;

  const crumbs = [
    { name: "Services", href: routes.service },
    ...(isOverview ? [] : [{ name: group.name, href: group.href }]),
    { name: shortTitle, href: path },
  ];

  const { main, closing } = splitClosing(entry.body);
  const { intro, chapters } = splitChapters(main);
  const introBlocks = parseBlocks(intro);
  const opener = introBlocks[0]?.type === "p" ? introBlocks[0].text : null;
  const introRest = opener ? introBlocks.slice(1) : introBlocks;
  const sections = planService(chapters);

  const faqs = entry.data.faqs ?? [];
  const cta = entry.data.cta;
  const primary = { label: cta?.primary ?? "Get a Free Digital Growth Audit", href: routes.audit };
  const secondary = cta?.secondary ? { label: cta.secondary, href: routes.contact } : undefined;
  const showVideos = group.slug === "social-media";
  const flow = entry.data.flow ? entry.data.flow.split("→").map((t) => t.trim()) : [];

  // Photos: the category's own four lead, people-at-work shots fill in after them. Both
  // lists are rotated per page so services in one category do not open on the same picture.
  const seed = seedOf(slug);
  const own = rotate(
    serviceGallery[group.slug] ?? serviceGallery["seo-ai-search-optimization"],
    seed % 4,
  );
  const wall = rotate(wallPictures, seed % wallPictures.length);
  const pool = [own[2], wall[0], own[3], wall[1], own[1], wall[2], wall[4]];

  const closingBlocks: Block[] = closing ? parseBlocks(closing.body) : [];
  const social = socialPages[slug];
  const brand = brandPages[slug];
  // SEO, Local SEO and GBP keep the inner-page layout and add showcase.com's motion pieces.
  const showcase = showcasePages[slug];

  return (
    <InnerPage {...categoryTheme(group.slug)}>
      {brand ? (
        <BrandTemplate
          config={brand}
          title={shortTitle}
          crumbs={crumbs}
          intro={introBlocks}
          flow={flow}
          chapters={chapters}
          closing={closing ? { title: closing.title, blocks: closingBlocks } : null}
          faqs={faqs}
          faqTitle={entry.data.faqTitle}
          groupName={group.name}
          services={group.services.map((s) => ({
            name: serviceShortTitle(s.data.title),
            text: s.data.subtitle ?? s.data.description,
            href: servicePath(s.slug),
            steps: s.data.flow ? s.data.flow.split("→").map((t) => t.trim()) : [],
            current: s.slug === slug,
          }))}
          primary={primary}
          secondary={secondary}
        />
      ) : social ? (
        <SocialTemplate
          config={social}
          title={shortTitle}
          subtitle={entry.data.subtitle}
          crumbs={crumbs}
          intro={introBlocks}
          flow={flow}
          flowLabel={entry.data.flowLabel}
          chapters={chapters}
          closing={closing ? { title: closing.title, blocks: closingBlocks } : null}
          faqs={faqs}
          primary={primary}
          secondary={secondary}
        />
      ) : (
        <>
          <PageHero
            crumbs={crumbs}
            kicker={isOverview ? undefined : group.name}
            title={shortTitle}
            lead={opener ?? entry.data.subtitle}
            primary={primary}
            secondary={secondary}
            background={own[0]}
            visual={
              showcase ? (
                <HeroPhone
                  phone={heroPhone(showcase.phone)}
                  sticker={heroSticker(showcase.phone)}
                />
              ) : (
                <ServiceScene category={group.slug} slug={slug} variant="hero" />
              )
            }
          />

          {showcase && (
            <PhoneSlider title={home.proof.realTitle} slides={resultSlides(showcase.results)} />
          )}

          <Promo
            title={accent(entry.data.subtitle ?? shortTitle)}
            blocks={introRest}
            listLead={entry.data.flowLabel}
            items={flow}
            note={"How it all\nconnects"}
            visual={<ServiceScene category={group.slug} slug={slug} variant="wide" />}
          />

          <ChapterSections
            sections={sections}
            photos={pool}
            stepPhotos={[...own, ...wall]}
            primary={primary}
            secondary={secondary}
            slug={slug}
          />

          {closing && (
            <CtaBanner
              title={closing.title}
              picture={wall[3]}
              primary={primary}
              secondary={secondary}
              note="Start here"
            >
              <Prose blocks={closingBlocks} />
            </CtaBanner>
          )}

          {showcase && <CaseLaptops />}

          {faqs.length > 0 &&
            (showcase ? (
              <CardStackFaq title={entry.data.faqTitle ?? `${shortTitle} FAQs`} items={faqs} />
            ) : (
              <FaqSplit
                title={entry.data.faqTitle ?? `${shortTitle} FAQs`}
                items={faqs}
                picture={wall[2]}
                cta={primary}
              />
            ))}
        </>
      )}

      {showVideos && (
        <div className={kit.white}>
          <Videos heading="Videos We Create for Client Growth" id="client-videos" />
        </div>
      )}

      {!brand && (
        <ServiceCards
          title="Related services"
          groups={[
            {
              name: group.services.length > 1 ? group.name : "Other categories",
              cards: relatedItems(group, groups, slug),
            },
          ]}
          note={"Keep\nexploring"}
        />
      )}

      <ReadingCards intro="Guides, original research, experiments and industry insights from our work on search, AI-assisted discovery and the businesses we support." />

      <div className={kit.white}>
        <LetsTalk />
      </div>

      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema(entry.data.title, entry.data.description, path),
          ...(faqs.length ? [faqSchema(faqs)] : []),
        ]}
      />
    </InnerPage>
  );
}

type Groups = ReturnType<typeof getServiceGroups>;

// Other services in the same category. A category of one shows three other categories instead.
function relatedItems(group: Groups[number], groups: Groups, slug: string) {
  const siblings = group.services
    .filter((s) => s.slug !== slug)
    .map((s) => ({
      name: serviceShortTitle(s.data.title),
      href: servicePath(s.slug),
      text: s.data.subtitle ?? s.data.description,
    }));
  if (siblings.length) return siblings.slice(0, 6);
  return groups
    .filter((g) => g.slug !== group.slug)
    .slice(0, 3)
    .map((g) => ({ name: g.name, href: g.href, text: g.blurb }));
}
