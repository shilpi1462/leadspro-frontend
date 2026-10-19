import type { ReactNode } from "react";
import { home } from "@/data/home";
import type { HeroPhone as Kind, ResultKey } from "@/data/showcase";
import { routes } from "@/lib/site";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ConsoleCard, RankTable, type RankRow } from "@/components/visuals/parts/Search";
import { CallsCard, GbpPhone, MapGrid } from "@/components/visuals/parts/Local";
import { AuditCard } from "@/components/visuals/parts/Search";
import { stories } from "@/data/stories";
import { AiPhone } from "@/components/visuals/parts/Human";
import { InView } from "@/components/social/InView";
import type { Slide } from "./PhoneSlider";
import k from "./Phones.module.css";

/* What the phones show. Figures are the reported ones from home.proof; the map grid and the
   profile are illustrative, as on the rest of the site. */

const business = "Your Business";
const [organic, calls] = home.proof.cases;

const map = <MapGrid keyword="basement waterproofing" place="Niagara Region" />;
const consoleCard = (
  <ConsoleCard
    impressions={organic.metrics[0].value}
    clicks={organic.metrics[1].value}
    period="Last 16 months"
  />
);
const callsCard = (
  <CallsCard
    total={calls.metrics[0].value}
    totalLabel="Calls from the profile, March to August 2026"
    month={calls.metrics[1].value}
    monthLabel="August 2026"
    actions={["Calls", "Website visits", "Directions"]}
  />
);

// The same searches the SEO scenes track (from the Niagara experiment in the blog).
const searchRows: RankRow[] = [
  { keyword: "seo companies in niagara", position: 1, updated: "2 days" },
  { keyword: "digital marketing agencies in niagara", position: 2, updated: "2 days" },
  { keyword: "seo companies in st. catharines", position: 1, updated: "3 days" },
  { keyword: "web design and seo providers", position: 4, updated: "5 days" },
];
const ranks = <RankTable rows={searchRows} />;

/** A phone with UI cut-outs on its screen. */
function Screen({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <PhoneFrame className={k.frame}>
      {/* "in" once on screen: pins pop and bars fill as they do in the scenes */}
      <InView className={`${k.screen} ${dark ? k.dark : ""}`}>{children}</InView>
    </PhoneFrame>
  );
}

export function heroPhone(kind: Kind): ReactNode {
  if (kind === "ai") return <AiPhone />;
  if (kind === "gbp")
    return <GbpPhone name={business} category="Waterproofing & drainage · Niagara Region" />;
  return <Screen>{map}</Screen>;
}

/** The card tucked against the hero phone: the audit snapshot for SEO, the profile calls for local. */
export function heroSticker(kind: Kind): ReactNode {
  if (kind === "ai") {
    const audit = stories[0];
    return (
      <AuditCard
        metrics={audit.snapshotMetrics ?? []}
        findings={(audit.snapshot ?? []).slice(0, 3)}
        sticker
      />
    );
  }
  return (
    <CallsCard
      total={calls.metrics[0].value}
      totalLabel="Calls from the profile, March to August 2026"
      month={calls.metrics[1].value}
      monthLabel="August 2026"
      actions={["Calls", "Website visits", "Directions"]}
      sticker
    />
  );
}

export function resultSlides(order: ResultKey[]): Slide[] {
  const button = { label: "View All Results", href: routes.portfolio };
  const all: Record<ResultKey, Slide> = {
    impressions: {
      num: organic.metrics[0].value,
      label: organic.metrics[0].label,
      tag: organic.name,
      text: organic.text[0],
      note: organic.note,
      screen: (
        <Screen>
          {consoleCard}
          {ranks}
        </Screen>
      ),
      illustrative: true,
      button,
    },
    clicks: {
      num: organic.metrics[1].value,
      label: organic.metrics[1].label,
      tag: organic.name,
      text: organic.flow,
      note: organic.note,
      screen: (
        <Screen>
          {ranks}
          {consoleCard}
        </Screen>
      ),
      illustrative: true,
      button,
    },
    calls: {
      num: calls.metrics[0].value,
      label: calls.metrics[0].label,
      tag: calls.name,
      text: calls.text[0],
      note: calls.note,
      screen: (
        <Screen>
          {callsCard}
          {map}
        </Screen>
      ),
      illustrative: true,
      button,
    },
    month: {
      num: calls.metrics[1].value,
      label: calls.metrics[1].label,
      tag: calls.name,
      text: calls.text[1] ?? calls.flow,
      note: calls.note,
      screen: (
        <Screen>
          {map}
          {callsCard}
        </Screen>
      ),
      illustrative: true,
      button,
    },
  };
  return order.map((key) => all[key]);
}
