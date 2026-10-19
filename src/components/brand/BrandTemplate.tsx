import type { Block } from "@/lib/blocks";
import type { Chapter } from "@/lib/content";
import { planBrand } from "@/lib/brandPlan";
import { home } from "@/data/home";
import {
  brandCasePhoto,
  brandComparePhoto,
  brandHeroPhotos,
  brandMissionPhotos,
  brandRingThumbs,
  brandStackPhotos,
  brandStatsPhoto,
  type BrandPageConfig,
} from "@/data/brand";
import type { FaqItem } from "@/components/ui/Faq";
import type { Glyph } from "@/components/visuals/parts/glyphs";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Inline } from "@/components/service/Inline";
import { Hero } from "./Hero";
import { Pinpoint } from "./Pinpoint";
import { Mission } from "./Mission";
import { Stack } from "./Stack";
import { CaseCard } from "./CaseCard";
import { Compare } from "./Compare";
import { Steps } from "./Steps";
import { Stats } from "./Stats";
import { PhoneCards } from "./PhoneCards";
import { Services } from "./Services";
import { BrandFaq } from "./BrandFaq";
import { Cta } from "./Cta";
import { Copy } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import { SmoothWheel } from "./SmoothWheel";
import b from "./Brand.module.css";

interface BrandTemplateProps {
  config: BrandPageConfig;
  title: string;
  crumbs: Crumb[];
  intro: Block[];
  flow: string[];
  chapters: Chapter[];
  closing: { title: string; blocks: Block[] } | null;
  faqs: FaqItem[];
  faqTitle?: string;
  groupName: string;
  services: { name: string; text: string; href: string; steps: string[]; current: boolean }[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

const paragraphs = (blocks: Block[]) =>
  blocks.filter((x): x is Extract<Block, { type: "p" }> => x.type === "p").map((x) => x.text);

const ICONS: [RegExp, Glyph][] = [
  [/audience|customer|who/i, "user"],
  [/competitor|market/i, "chart"],
  [/value|proposition/i, "bolt"],
  [/voice|messag|tone/i, "mic"],
  [/strategy|position/i, "target"],
  [/problem/i, "target"],
  [/logo|mark|recogni/i, "spark"],
  [/colou?r|typograph|contrast/i, "palette"],
  [/supporting|visual|platform|element/i, "layers"],
  [/guideline|consisten/i, "doc"],
  [/personality/i, "spark"],
  [/difference/i, "layers"],
  [/small/i, "phone"],
  [/proof/i, "check"],
];
const iconFor = (text: string): Glyph => ICONS.find(([re]) => re.test(text))?.[1] ?? "spark";

/** A list chapter's flow and the "This creates:" line that introduces it. */
function takeFlow(blocks: Block[]) {
  const at = blocks.findIndex((x) => x.type === "flow");
  if (at === -1) return { flow: null, rest: blocks };
  const flow = blocks[at] as Extract<Block, { type: "flow" }>;
  const lead =
    at > 0 &&
    blocks[at - 1].type === "p" &&
    (blocks[at - 1] as { text: string }).text.trim().endsWith(":")
      ? at - 1
      : at;
  return { flow, rest: blocks.filter((_, i) => i < lead || i > at) };
}

export function BrandTemplate(props: BrandTemplateProps) {
  const {
    config,
    title,
    crumbs,
    intro,
    flow,
    chapters,
    closing,
    faqs,
    faqTitle,
    groupName,
    services,
    primary,
    secondary,
  } = props;
  const plan = planBrand(chapters, config);

  // A short opener sits in the pill above the title; a long one becomes the description.
  const [opener = "", ...more] = paragraphs(intro);
  const short = opener.length <= 40;
  const preTitle = short ? opener : flow.join(" · ");
  const description = short ? (more.shift() ?? "") : opener;

  const whatLists =
    plan.what?.blocks.filter((x): x is Extract<Block, { type: "ul" }> => x.type === "ul") ?? [];
  const touchpoints = (whatLists.at(-1)?.items ?? flow)
    .map((t) => t.replace(/\*\*/g, ""))
    .slice(0, 9);

  const [years, clients, expertise] = home.team.stats;
  const second = secondary ?? primary;

  const stackCards = plan.stack.map((part, i) => {
    const firstP = part.blocks.findIndex((x) => x.type === "p");
    const firstUl = part.blocks.findIndex((x) => x.type === "ul");
    // "Goodfaith can help clarify:" introduces the pills, so it sits just above them.
    const before = part.blocks[firstUl - 1];
    const label =
      firstUl > 0 &&
      firstUl - 1 !== firstP &&
      before.type === "p" &&
      before.text.trim().endsWith(":")
        ? firstUl - 1
        : -1;
    const extra = part.blocks.filter((_, k) => k !== firstP && k !== firstUl && k !== label);
    return {
      id: part.id,
      level: part.level,
      title: part.title,
      description:
        firstP === -1 ? null : <Inline text={(part.blocks[firstP] as { text: string }).text} />,
      badgesLabel: label === -1 ? undefined : (part.blocks[label] as { text: string }).text,
      badges: firstUl === -1 ? [] : (part.blocks[firstUl] as Extract<Block, { type: "ul" }>).items,
      extra: extra.length ? <Copy blocks={extra} /> : null,
      icon: iconFor(part.title),
      picture: brandStackPhotos[i % brandStackPhotos.length],
    };
  });

  const steps = plan.steps ? takeFlow(plan.steps.after) : null;
  const phoneRows = plan.versus
    ? plan.versus.head.map((label, c) => ({ label, items: plan.versus!.rows.map((r) => r[c]) }))
    : plan.industries
      ? [
          {
            label: "Industry",
            items: plan.industries.list.slice(0, Math.ceil(plan.industries.list.length / 2)),
          },
          {
            label: "Industry",
            items: plan.industries.list.slice(Math.ceil(plan.industries.list.length / 2)),
          },
        ]
      : null;
  const phonePart = plan.versus ?? plan.industries;

  return (
    <div className={b.brand}>
      <SmoothWheel />

      <Hero
        crumbs={<Breadcrumbs items={crumbs} />}
        preTitle={preTitle}
        title={title}
        description={<Inline text={description} />}
        cta={primary}
        photos={brandHeroPhotos}
        touchpoints={touchpoints}
        stat={{ value: years.value, label: `${years.unit} of ${years.label}` }}
        line={
          more.length > 0 &&
          more.map((p) => (
            <p key={p}>
              <Inline text={p} />
            </p>
          ))
        }
      />

      {plan.why && <Pinpoint id={plan.why.id} title={plan.why.title} blocks={plan.why.blocks} />}

      {plan.what && (
        <div className={b.gapTop}>
          <Mission
            id={plan.what.id}
            pre={groupName}
            title={plan.what.title}
            blocks={plan.what.blocks}
            photos={brandMissionPhotos}
            badges={flow}
            cta={second}
          />
        </div>
      )}

      {stackCards.length > 0 && (
        <Stack
          id={plan.included?.id}
          title={plan.included?.title ?? "What Is Included"}
          cards={stackCards}
        />
      )}

      {plan.example && (
        <CaseCard
          id={plan.example.id}
          kind={plan.example.kind}
          name={plan.example.name}
          blocks={plan.example.blocks}
          picture={brandCasePhoto}
          cta={second}
        />
      )}

      {plan.compare && (
        <Compare
          id={plan.compare.id}
          title={plan.compare.title}
          head={plan.compare.head}
          rows={plan.compare.rows}
          after={[...plan.compare.before, ...plan.compare.after]}
          picture={brandComparePhoto}
          cta={second}
        />
      )}

      {plan.steps && steps && (
        <Steps
          id={plan.steps.id}
          pre={steps.flow ? steps.flow.steps.join(" → ") : groupName}
          title={plan.steps.title}
          lead={plan.steps.lead.length ? <Copy blocks={plan.steps.lead} /> : undefined}
          steps={plan.steps.steps.map((s) => ({ ...s, icon: iconFor(s.label) }))}
          after={
            steps.rest.length ? <Copy blocks={steps.rest} className={b.centerCopy} /> : undefined
          }
        />
      )}

      <Stats
        title={home.team.title}
        quote={home.team.pull}
        picture={brandStatsPhoto}
        stats={[clients, years, expertise]}
        chips={flow}
      />

      {phonePart && phoneRows && (
        <PhoneCards
          id={phonePart.id}
          title={phonePart.title}
          intro={phonePart.before.length ? <Copy blocks={phonePart.before} /> : undefined}
          rows={phoneRows}
          outro={phonePart.after.length ? <Copy blocks={phonePart.after} /> : undefined}
        />
      )}

      {services.length > 1 && (
        <Services title={`${groupName} Services`} items={services} cta={primary} />
      )}

      {faqs.length > 0 && <BrandFaq title={faqTitle ?? `${title} FAQs`} items={faqs} />}

      {plan.rest.map((part) => (
        <section key={part.id} id={part.id} className={b.spaceBottom}>
          <Rise className={`${b.small} ${b.restBlock}`}>
            <h2 {...item(0, `${b.display} ${b.h2} ${b.center}`)}>{part.title}</h2>
            <div {...item(1)}>
              <Copy blocks={part.blocks} className={b.centerCopy} />
            </div>
          </Rise>
        </section>
      ))}

      {closing && (
        <Cta
          pre={groupName}
          title={closing.title}
          blocks={closing.blocks}
          ring={brandRingThumbs}
          primary={primary}
          secondary={secondary}
        />
      )}
    </div>
  );
}
