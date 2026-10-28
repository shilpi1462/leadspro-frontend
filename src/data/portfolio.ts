export interface Metric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  industry: string;
  title: string;
  client: string;
  services: string[];
  timeline: string;
  challenge: string;
  strategy: string;
  flow: string;
  snapshot?: string[];
  metrics: Metric[];
  tone: "green" | "ink" | "paper";
}

// Sample metrics. Replace with verified client data before launch.
export const caseStudies: CaseStudy[] = [
  {
    slug: "waterproofing-local-service-growth",
    industry: "Waterproofing / Home Services",
    title: "Local Service Growth Framework",
    client: "Dubai waterproofing, drainage & plumbing company",
    services: ["Technical SEO", "Local SEO", "Google Business Profile", "Website Optimization"],
    timeline: "Ongoing engagement",
    challenge:
      "The business needed clearer local service pages, stronger trust signals and a better path from organic search to consultation requests. Its website audit revealed several weaknesses limiting its search foundation.",
    strategy:
      "Build a stronger local SEO foundation, improve service-page clarity and connect calls to action with the real questions homeowners ask before booking.",
    flow: "Technical Foundation → Service Pages → Local SEO → Google Business Profile → Authority",
    snapshot: [
      "Domain Authority around 6",
      "Estimated organic traffic around 3 visits per month at the time reviewed",
      "Missing H1 optimization",
      "Missing image alt attributes",
      "Overextended page titles",
      "Structured-data opportunities",
      "Sitemap and robots.txt issues",
      "Weak service and location search coverage",
    ],
    metrics: [
      { value: "220%", label: "Increase in Google Business Profile calls" },
      { value: "Top 3", label: "Google Maps positions for core service searches" },
      { value: "48%", label: "More website clicks from organic search" },
    ],
    tone: "green",
  },
  {
    slug: "clinic-website-trust-refresh",
    industry: "Healthcare / Mental Health",
    title: "Clinic Website Trust Refresh",
    client: "Dubai mental health & counselling clinic",
    services: ["Website Design", "Content Marketing", "Local SEO"],
    timeline: "12 weeks",
    challenge:
      "The clinic needed a calmer website experience, clearer service explanations and more supportive content for people comparing care options.",
    strategy:
      "Rebuild the website around empathy, privacy-minded content, accessible navigation and useful service journeys.",
    flow: "Patient Search → Treatment → Practitioner Expertise → Reviews → FAQs → Booking",
    metrics: [
      { value: "62%", label: "More appointment enquiries from the website" },
      { value: "2.1×", label: "Longer time spent on treatment pages" },
      { value: "35%", label: "Lower bounce rate on service pages" },
    ],
    tone: "ink",
  },
  {
    slug: "restaurant-brand-local-search",
    industry: "Hospitality / Restaurants",
    title: "Restaurant Brand and Local Search Plan",
    client: "Dubai Falls restaurant group",
    services: ["Branding & Visual Identity", "Google Business Profile", "Social Media"],
    timeline: "8 weeks",
    challenge:
      "The restaurant needed stronger local visibility, consistent social presentation and clearer brand personality across customer touchpoints.",
    strategy:
      "Align visual identity, local profile content, menu-related search intent and social storytelling around the restaurant experience.",
    flow: "Discovery → Photos → Reviews → Website → Location → Booking",
    metrics: [
      { value: "3×", label: "Direction requests from Google Maps" },
      { value: "41%", label: "More reservations attributed to search" },
      { value: "1", label: "Consistent brand across every touchpoint" },
    ],
    tone: "paper",
  },
];

export const caseStudyStandards = {
  title: "No Fake Metrics. No Fake Testimonials.",
  text: "When LeadsPro publishes a case study, it includes the industry, initial challenge, services provided, strategy, timeline, before-and-after context and genuine results. A testimonial is included only when supporting information exists.",
  fields: [
    "Industry",
    "Initial challenge",
    "Services provided",
    "Strategy",
    "Timeline",
    "Before-and-after context",
    "Genuine results",
    "Real testimonial",
  ],
};
