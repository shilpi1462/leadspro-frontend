import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { home } from "@/data/home";
import { stories } from "@/data/stories";
import { industryGroups } from "@/data/industries";
import { Scene, Piece, type Spot } from "./Scene";
import { ConsoleCard, RankTable, SerpTablet, AuditCard, type RankRow } from "./parts/Search";
import { MapGrid, CallsCard, GbpPhone, ReviewStand, ReviewPage } from "./parts/Local";
import { Laptop, Handset, Shot, Wireframe, ChecksCard, CodeCard } from "./parts/Devices";
import {
  BrandBoard,
  BusinessCard,
  SocialPhone,
  PostCard,
  Scheduler,
  ContentDoc,
  OutlineCard,
  TopicMap,
} from "./parts/Studio";
import { SignalBoard, StickyNote, JourneyCard, PhotoCard, AiPhone } from "./parts/Human";

const ILLUSTRATIVE = "Illustrative example";
const business = "Your Business";
const domain = "yourbusiness.ae";

const [organic, calls] = home.proof.cases;
const audit = stories[0];

const consoleCard = (sticker?: boolean) => (
  <ConsoleCard
    impressions={organic.metrics[0].value}
    clicks={organic.metrics[1].value}
    period="Last 16 months"
    sticker={sticker}
  />
);

const callsCard = (sticker?: boolean) => (
  <CallsCard
    total={calls.metrics[0].value}
    totalLabel="Calls from the profile, March to August 2026"
    month={calls.metrics[1].value}
    monthLabel="August 2026"
    actions={["Calls", "Website visits", "Directions"]}
    sticker={sticker}
  />
);

const auditCard = (sticker?: boolean) => (
  <AuditCard
    metrics={audit.snapshotMetrics ?? []}
    findings={(audit.snapshot ?? []).slice(0, 4)}
    sticker={sticker}
  />
);

const serp = (query = "basement waterproofing Dubai") => (
  <SerpTablet
    query={query}
    name={business}
    domain={domain}
    title="Basement Waterproofing & Drainage in Dubai"
  />
);

// The Content Strategy chapter's own chain, as written in the doc.
const topicSteps = [
  "Primary Service",
  "Customer Problems",
  "Questions & Comparisons",
  "Expert Resources",
  "Commercial Page",
  "Enquiry",
];

const map = (bare?: boolean) => (
  <MapGrid keyword="basement waterproofing" place="Dubai" bare={bare} />
);

const gbpPhone = <GbpPhone name={business} category="Waterproofing & drainage · Dubai" />;

// Searches from the Dubai experiment in the blog, and the local examples in the Local SEO doc.
const searchRows: RankRow[] = [
  { keyword: "seo companies in Dubai", position: 1, updated: "2 days" },
  { keyword: "digital marketing agencies in Dubai", position: 2, updated: "2 days" },
  { keyword: "seo companies in st. catharines", position: 1, updated: "3 days" },
  { keyword: "web design and seo providers", position: 4, updated: "5 days" },
  { keyword: "local digital marketing services", position: 3, updated: "1 week" },
];

const localRows: RankRow[] = [
  { keyword: "electrician near me", position: 1, updated: "Today" },
  { keyword: "family lawyer mississauga", position: 2, updated: "2 days" },
  { keyword: "physiotherapist hamilton", position: 1, updated: "3 days" },
  { keyword: "mechanic burlington", position: 3, updated: "5 days" },
  { keyword: "commercial cleaning toronto", position: 2, updated: "1 week" },
];

type Variant = "hero" | "wide";
/** `phone` is the stage ratio below 640px, sized so the cards stack with only a slight tuck. */
type Layout = { note?: string; phone?: string; pieces: [Spot, ReactNode][] };

const HERO_RATIO = "1 / 0.84";
const WIDE_RATIO = "16 / 7.6";
const PHONE_RATIO = "4 / 5";

function compose(layout: Layout, variant: Variant, label?: string) {
  return (
    <Scene
      ratio={variant === "hero" ? HERO_RATIO : WIDE_RATIO}
      ratioPhone={layout.phone ?? PHONE_RATIO}
      note={layout.note}
      label={label}
    >
      {layout.pieces.map(([at, node], i) => (
        <Piece key={i} at={at} i={i}>
          {node}
        </Piece>
      ))}
    </Scene>
  );
}

const AI_PAGES = new Set(["ai-seo-aio-aeo-geo", "chatgpt-seo"]);

const layouts: Record<string, Record<Variant, Layout>> = {
  seo: {
    hero: {
      pieces: [
        [{ x: 0, y: 0, w: 58, r: -4, depth: 1.3, z: 2 }, consoleCard(true)],
        [{ x: 50, y: 44, w: 46, r: 5, depth: 0.8, z: 3 }, auditCard()],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 128",
      pieces: [
        [
          { x: 1, y: 10, w: 52, r: -2, depth: 0.8, z: 2, m: { x: 0, y: 55, w: 100, r: -1.5 } },
          <RankTable key="r" rows={searchRows} />,
        ],
        [{ x: 52, y: 0, w: 44, r: 5, depth: 1.4, m: { x: 17, y: 0, w: 66, r: 2 } }, serp()],
      ],
    },
  },
  ai: {
    hero: {
      note: ILLUSTRATIVE,
      pieces: [
        [{ x: 0, y: 22, w: 56, r: -5, depth: 0.8 }, consoleCard(true)],
        [{ x: 58, y: 0, w: 32, r: 4, depth: 1.4, z: 2 }, <AiPhone key="ai" />],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 128",
      pieces: [
        [
          { x: 1, y: 10, w: 52, r: -2, depth: 0.8, z: 2, m: { x: 0, y: 55, w: 100, r: -1.5 } },
          <RankTable key="r" rows={searchRows} title="Tracked searches" />,
        ],
        [
          { x: 52, y: 0, w: 44, r: 5, depth: 1.4, m: { x: 17, y: 0, w: 66, r: 2 } },
          serp("who fixes basement leaks near me"),
        ],
      ],
    },
  },
  local: {
    hero: {
      note: ILLUSTRATIVE,
      pieces: [
        [{ x: 2, y: 4, w: 60, r: -4, depth: 1.2, z: 2 }, map()],
        [{ x: 58, y: 40, w: 38, r: 5, depth: 0.8, z: 3 }, callsCard()],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 140",
      pieces: [
        [{ x: 2, y: 2, w: 44, r: -3, depth: 1.3, m: { x: 4, y: 0, w: 92, r: -1.5 } }, map()],
        [
          { x: 46, y: 22, w: 50, r: 3, depth: 0.8, z: 2, m: { x: 0, y: 57, w: 100, r: 1.5 } },
          <RankTable key="r" rows={localRows} title="Local keywords" />,
        ],
      ],
    },
  },
  gbp: {
    hero: {
      note: ILLUSTRATIVE,
      pieces: [
        [{ x: 6, y: 0, w: 34, r: -5, depth: 1.3, z: 2 }, gbpPhone],
        [{ x: 48, y: 10, w: 44, r: 4, depth: 0.8 }, callsCard(true)],
        [
          { x: 60, y: 58, w: 26, r: -3, depth: 1.1, z: 3 },
          <ReviewStand key="s" name={business} line="Tap or scan to leave us a review" />,
        ],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 144",
      pieces: [
        [
          { x: 0, y: 26, w: 24, r: -4, depth: 1.4, z: 3, m: { x: 2, y: 50, w: 44, r: -2 } },
          <ReviewStand key="s" name={business} line="Tap or scan to leave us a review" />,
        ],
        [
          { x: 18, y: 2, w: 58, depth: 0.7, m: { x: 0, y: 0, w: 100 } },
          <Laptop key="l">
            <ReviewPage name={business} />
          </Laptop>,
        ],
        [
          { x: 74, y: 8, w: 21, r: 5, depth: 1.2, z: 2, m: { x: 56, y: 42, w: 38, r: 2 } },
          gbpPhone,
        ],
      ],
    },
  },
  design: {
    hero: {
      note: ILLUSTRATIVE,
      pieces: [
        [
          { x: 0, y: 12, w: 80, depth: 0.8 },
          <Laptop key="l">
            <Wireframe name={business} />
          </Laptop>,
        ],
        [
          { x: 72, y: 26, w: 24, r: 4, depth: 1.4, z: 2 },
          <Handset key="h">
            <Wireframe name={business} compact />
          </Handset>,
        ],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 102",
      pieces: [
        [
          { x: 0, y: 44, w: 26, r: -4, depth: 1.3, z: 3, minor: true },
          <ChecksCard
            key="c"
            title="Design checks"
            items={[
              "Custom UX/UI",
              "Mobile-first",
              "SEO-ready structure",
              "Performance & accessibility",
              "Conversion-focused",
            ]}
            sticker
          />,
        ],
        [
          { x: 18, y: 0, w: 58, depth: 0.7, m: { x: 0, y: 0, w: 82 } },
          <Laptop key="l">
            <Wireframe name={business} />
          </Laptop>,
        ],
        [
          { x: 72, y: 14, w: 17, r: 4, depth: 1.4, z: 2, m: { x: 70, y: 37, w: 28, r: 2 } },
          <Handset key="h">
            <Wireframe name={business} compact />
          </Handset>,
        ],
      ],
    },
  },
  dev: {
    hero: {
      pieces: [
        [
          { x: 0, y: 6, w: 62, r: -4, depth: 1.2, z: 2 },
          <CodeCard key="c" file="service-page.tsx" />,
        ],
        [
          { x: 56, y: 40, w: 40, r: 5, depth: 0.8, z: 3 },
          <ChecksCard
            key="k"
            title="Build checks"
            items={["Fast", "Responsive", "Scalable", "Maintainable"]}
            sticker
          />,
        ],
      ],
    },
    wide: {
      note: ILLUSTRATIVE,
      phone: "100 / 128",
      pieces: [
        [
          { x: 0, y: 8, w: 42, r: -3, depth: 1.2, z: 2, m: { x: 4, y: 50, w: 92, r: -1.5 } },
          <CodeCard key="c" file="service-page.tsx" />,
        ],
        [
          { x: 38, y: 0, w: 56, depth: 0.7, m: { x: 0, y: 0, w: 100 } },
          <Laptop key="l">
            <Wireframe name={business} />
          </Laptop>,
        ],
      ],
    },
  },
  brand: {
    hero: {
      pieces: [
        [
          { x: 2, y: 4, w: 58, r: -4, depth: 1.2, z: 2 },
          <BrandBoard key="b" mark="YB" name="Your Brand" sticker />,
        ],
        [
          { x: 54, y: 54, w: 42, r: 8, depth: 0.8, z: 3 },
          <BusinessCard key="c" mark="YB" name={business} line="Dubai, UAE" />,
        ],
      ],
    },
    wide: {
      phone: "100 / 116",
      pieces: [
        [
          { x: 4, y: 4, w: 40, r: -3, depth: 1.1, z: 2, m: { x: 4, y: 0, w: 92, r: -1.5 } },
          <BrandBoard key="b" mark="YB" name="Your Brand" sticker />,
        ],
        [
          { x: 42, y: 50, w: 28, r: -6, depth: 1.4, z: 3, m: { x: 2, y: 71, w: 56, r: -3 } },
          <BusinessCard key="c" mark="YB" name={business} line="Dubai, UAE" />,
        ],
        [
          { x: 74, y: 0, w: 20, r: 5, depth: 0.8, minor: true },
          <SocialPhone key="s" handle="yourbrand" bio="One identity, recognised everywhere." />,
        ],
      ],
    },
  },
  social: {
    hero: {
      pieces: [
        [
          { x: 8, y: 0, w: 34, r: -5, depth: 1.3, z: 2 },
          <SocialPhone key="s" handle="yourbusiness" bio="Waterproofing & drainage · Dubai" />,
        ],
        [
          { x: 50, y: 12, w: 38, r: 5, depth: 0.8 },
          <PostCard key="p" handle="yourbusiness" caption="Before & after" sticker />,
        ],
      ],
    },
    wide: {
      phone: "100 / 134",
      pieces: [
        [
          { x: 4, y: 0, w: 22, r: -4, depth: 1.3, z: 2, m: { x: 2, y: 0, w: 44, r: -2 } },
          <SocialPhone key="s" handle="yourbusiness" bio="Waterproofing & drainage · Dubai" />,
        ],
        [
          { x: 30, y: 18, w: 42, depth: 0.7, m: { x: 0, y: 69, w: 100, z: 3 } },
          <Scheduler key="c" title="Publishing plan" sticker />,
        ],
        [
          { x: 76, y: 4, w: 21, r: 5, depth: 1.2, z: 2, m: { x: 53, y: 4.5, w: 44, r: 2 } },
          <PostCard key="p" handle="yourbusiness" caption="Before & after" />,
        ],
      ],
    },
  },
  content: {
    hero: {
      pieces: [
        [
          { x: -4, y: 0, w: 68, r: -4, depth: 1.2, z: 2 },
          <ContentDoc key="d" title="Basement Waterproofing in Dubai" tag="Service page" sticker />,
        ],
        [
          { x: 54, y: 40, w: 50, r: 5, depth: 0.8, z: 3 },
          <OutlineCard
            key="o"
            title="Content plan"
            items={[
              "Service page content",
              "Topic ecosystem",
              "Research & case-based content",
              "Content refresh",
              "E-E-A-T review",
            ]}
          />,
        ],
      ],
    },
    wide: {
      phone: "100 / 150",
      pieces: [
        [
          { x: 0, y: 2, w: 44, r: -3, depth: 1.1, z: 2, m: { x: 2, y: 0, w: 82, r: -1.5 } },
          <ContentDoc key="d" title="Basement Waterproofing in Dubai" tag="Service page" sticker />,
        ],
        [
          { x: 42, y: 6, w: 58, r: 2, depth: 0.8, z: 3, m: { x: 0, y: 52, w: 100, r: 1 } },
          <TopicMap key="t" title="Topic ecosystem" steps={topicSteps} />,
        ],
      ],
    },
  },
};

const byCategory: Record<string, string> = {
  "seo-ai-search-optimization": "seo",
  "local-seo": "local",
  "google-business-profile": "gbp",
  "website-design": "design",
  "web-development": "dev",
  branding: "brand",
  "social-media": "social",
  "content-marketing": "content",
};

export function ServiceScene({
  category,
  slug,
  variant,
}: {
  category: string;
  slug: string;
  variant: Variant;
}) {
  const key = AI_PAGES.has(slug) ? "ai" : (byCategory[category] ?? "seo");
  return compose(layouts[key][variant], variant);
}

/* Industries: the local grid and the first journey in the hero; one scene per journey tab. */

export function IndustriesHero() {
  return compose(
    {
      note: ILLUSTRATIVE,
      pieces: [
        [{ x: 0, y: 6, w: 60, r: -4, depth: 1.2, z: 2 }, map()],
        [
          { x: 58, y: 28, w: 38, r: 5, depth: 0.8, z: 3 },
          <JourneyCard
            key="j"
            title="Customer journey"
            steps={splitFlow(industryGroups[0].flow)}
            sticker
          />,
        ],
      ],
    },
    "hero",
  );
}

export function JourneyScene({ index }: { index: number }) {
  const group = industryGroups[index % industryGroups.length];
  const steps = splitFlow(group.flow);
  const layoutsByJourney: Layout[] = [
    {
      note: ILLUSTRATIVE,
      phone: "100 / 82",
      pieces: [
        [{ x: 4, y: 8, w: 56, r: -4, depth: 0.8, m: { x: 0, y: 17, w: 60, r: -2 } }, map()],
        [{ x: 60, y: 2, w: 30, r: 5, depth: 1.3, z: 2, m: { x: 62, y: 0, w: 36, r: 2 } }, gbpPhone],
      ],
    },
    {
      note: ILLUSTRATIVE,
      phone: "100 / 116",
      pieces: [
        [
          { x: 2, y: 4, w: 58, r: -3, depth: 0.8, m: { x: 0, y: 0, w: 72, r: -1.5 } },
          <MapGrid key="m" keyword="waterproofing contractor" place="Service area" />,
        ],
        [
          { x: 54, y: 34, w: 42, r: 4, depth: 1.3, z: 2, m: { x: 34, y: 52, w: 64, r: 1.5 } },
          <JourneyCard key="j" title="How they choose" steps={steps} sticker />,
        ],
      ],
    },
    {
      phone: "100 / 110",
      pieces: [
        [
          { x: 2, y: 10, w: 56, r: -4, depth: 0.8, m: { x: 0, y: 0, w: 72, r: -1.5 } },
          <ContentDoc key="d" title="Capability, expertise and evidence" tag="Expertise page" />,
        ],
        [
          { x: 56, y: 2, w: 40, r: 5, depth: 1.3, z: 2, m: { x: 36, y: 51, w: 62, r: 1.5 } },
          <JourneyCard key="j" title="How they choose" steps={steps} sticker />,
        ],
      ],
    },
  ];
  return compose(layoutsByJourney[index % layoutsByJourney.length], "hero");
}

/* H-EDGE: the logo between what the data shows and what only people can answer. */

const hedgeSignals = [
  "What people search for",
  "Which pages they visit",
  "Where customers leave",
  "Which content performs",
  "What competitors are doing",
  "Where digital opportunities may exist",
];
const hedgeQuestions = [
  "What is the customer worried about?",
  "What would make them trust this business?",
  "What information would reduce uncertainty?",
];

export function HedgeHero({ logo }: { logo: Picture }) {
  return compose(
    {
      pieces: [
        [
          { x: 0, y: 20, w: 52, r: -4, depth: 0.8 },
          <SignalBoard
            key="b"
            title="Digital intelligence"
            items={hedgeSignals.slice(0, 4)}
            icons={["search", "eye", "exit", "chart"]}
          />,
        ],
        [
          { x: 54, y: 0, w: 38, r: 5, depth: 1.3, z: 2 },
          <PhotoCard key="l" picture={logo} sticker contain />,
        ],
        [
          { x: 62, y: 56, w: 26, r: -6, depth: 1.5, z: 3 },
          <StickyNote key="n" text={hedgeQuestions[0]} />,
        ],
      ],
    },
    "hero",
  );
}

export function HedgeShowcase() {
  return compose(
    {
      phone: "100 / 118",
      pieces: [
        [
          { x: 2, y: 6, w: 44, r: -3, depth: 0.8, m: { x: 2, y: 0, w: 96, r: -1 } },
          <SignalBoard
            key="b"
            title="Technology can help us see"
            items={hedgeSignals}
            icons={["search", "eye", "exit", "chart", "target", "spark"]}
            sticker
          />,
        ],
        [
          { x: 52, y: 4, w: 19, r: -5, depth: 1.4, z: 2, m: { x: 3, y: 54, w: 43, r: -3 } },
          <StickyNote key="a" text={hedgeQuestions[0]} />,
        ],
        [
          { x: 74, y: 12, w: 19, r: 4, depth: 1.1, z: 2, m: { x: 54, y: 56, w: 43, r: 3 } },
          <StickyNote key="b" text={hedgeQuestions[1]} tone="cream" />,
        ],
        [
          { x: 60, y: 50, w: 19, r: 2, depth: 1.6, z: 3, minor: true },
          <StickyNote key="c" text={hedgeQuestions[2]} />,
        ],
      ],
    },
    "wide",
  );
}

/* Portfolio: the work itself on a laptop and a phone. */

export function CaseDevices({ picture }: { picture: Picture }) {
  return compose(
    {
      phone: "100 / 100",
      pieces: [
        [
          { x: 0, y: 8, w: 84, depth: 0.7, m: { x: 0, y: 0, w: 80 } },
          <Laptop key="l">
            <Shot picture={picture} />
          </Laptop>,
        ],
        [
          { x: 70, y: 22, w: 26, r: 4, depth: 1.4, z: 2, m: { x: 70, y: 36, w: 28, r: 2 } },
          <Handset key="h">
            <Shot picture={picture} position="70% center" />
          </Handset>,
        ],
      ],
    },
    "hero",
    picture.alt,
  );
}

export function BlogScene({ kind }: { kind: "experiment" | "insight" }) {
  if (kind === "insight") {
    return compose(
      {
        note: ILLUSTRATIVE,
        phone: "100 / 120",
        pieces: [
          [
            { x: 2, y: 4, w: 46, r: -3, depth: 1.2, z: 2, m: { x: 0, y: 0, w: 74, r: -1.5 } },
            map(),
          ],
          [
            { x: 50, y: 12, w: 38, r: 4, depth: 0.8, z: 3, m: { x: 21, y: 52, w: 78, r: 1.5 } },
            auditCard(true),
          ],
        ],
      },
      "wide",
    );
  }
  return compose(
    {
      note: ILLUSTRATIVE,
      phone: "100 / 96",
      pieces: [
        [
          { x: 4, y: 8, w: 44, r: -4, depth: 0.8, m: { x: 0, y: 17, w: 58, r: -2 } },
          serp("digital marketing agencies in Dubai"),
        ],
        [
          { x: 50, y: 0, w: 22, r: 4, depth: 1.4, z: 2, m: { x: 56, y: 0, w: 42, r: 2 } },
          <AiPhone key="ai" />,
        ],
        [
          { x: 72, y: 30, w: 26, r: 6, depth: 1.1, z: 3, minor: true },
          <RankTable key="r" rows={searchRows.slice(0, 3)} title="Tracked searches" />,
        ],
      ],
    },
    "wide",
  );
}

function splitFlow(flow: string) {
  return flow.split("→").map((s) => s.trim());
}
