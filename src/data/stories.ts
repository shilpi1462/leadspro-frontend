import type { IndustryIconName } from "@/components/ui/IndustryIcon";

export interface Story {
  slug: string;
  kind: "Case Study" | "Strategy Example";
  industry: string;
  icon: IndustryIconName;
  title: string;
  services: string;
  text: string;
  snapshotTitle?: string;
  /** The measured numbers from the audit, shown as figures. */
  snapshotMetrics?: { value: string; label: string }[];
  /** The issues the audit found. */
  snapshot?: string[];
  strategyLabel: string;
  strategy: string;
  outcome?: string;
  note: string;
  tone: "green" | "ink" | "paper";
}

export const stories: Story[] = [
  {
    slug: "Dubai-waterproofing-drainage-plumbing-seo",
    kind: "Case Study",
    industry: "Waterproofing, Drainage & Plumbing",
    icon: "water",
    title: "Waterproofing, Drainage & Plumbing",
    services: "Technical SEO + Local SEO + Website Optimization",
    text: "A Dubai waterproofing, drainage and plumbing company had valuable services and strong local-market potential, but its website audit revealed several weaknesses limiting its search foundation.",
    snapshotTitle: "Audit Snapshot",
    snapshotMetrics: [
      { value: "~6", label: "Domain Authority" },
      { value: "~3", label: "Estimated organic visits per month at the time reviewed" },
    ],
    snapshot: [
      "Missing H1 optimization",
      "Missing image alt attributes",
      "Overextended page titles",
      "Structured-data opportunities",
      "Sitemap and robots.txt issues",
      "Weak service and location search coverage",
    ],
    strategyLabel: "Strategy",
    strategy:
      "Technical Foundation → Service Pages → Local SEO → Google Business Profile → Authority",
    note: "Client identity withheld for confidentiality.",
    tone: "green",
  },
  {
    slug: "construction-company-strategy-example",
    kind: "Strategy Example",
    industry: "Construction",
    icon: "build",
    title: "Construction Company",
    services: "Website Strategy + SEO + Lead Generation",
    text: "A construction company can have years of completed projects and strong real-world expertise while its website fails to turn that experience into search visibility and qualified enquiries.",
    strategyLabel: "Growth Strategy",
    strategy:
      "Service Architecture → Project Proof → Location Relevance → Local Authority → Quote Journey",
    outcome:
      "Dedicated service pages, detailed project content, stronger proof and clearer enquiry journeys can transform a basic portfolio into a more useful business-development asset.",
    note: "Illustrative strategy example.",
    tone: "ink",
  },
  {
    slug: "healthcare-clinic-strategy-example",
    kind: "Strategy Example",
    industry: "Healthcare",
    icon: "care",
    title: "Healthcare Clinic",
    services: "Local SEO + Content + Trust + Patient Conversion",
    text: "Healthcare customers often need more information and reassurance before booking, making search visibility only the beginning of the patient journey.",
    strategyLabel: "Growth Strategy",
    strategy: "Patient Search → Treatment → Practitioner Expertise → Reviews → FAQs → Booking",
    outcome:
      "Treatment pages, practitioner information, Local SEO, Google Business Profile optimization, useful patient content and clearer appointment pathways can work together to reduce uncertainty and support informed booking decisions.",
    note: "Illustrative strategy example.",
    tone: "paper",
  },
];
