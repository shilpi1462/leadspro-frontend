import { routes, services } from "@/lib/site";
import type { Picture } from "@/data/images";

const research = { label: "Explore Our Research", href: "#featured-research" };
const guides = { label: "Read AI Search Guides", href: routes.blog };
const implementation = {
  lead: "Looking for implementation?",
  label: "Explore AI SEO, AEO & GEO Services",
  href: services.aiSeo,
};

export const aiHub = {
  seoTitle: "Goodfaith AI Hub | AI Search Research, Experiments & Guides",
  description:
    "Explore Goodfaith’s AI search research, experiments and practical observations on Google AI, ChatGPT Search, citations, query fan-out and brand visibility.",

  hero: {
    kicker: "Goodfaith AI Hub",
    title: "AI Search Research, Experiments & Practical Guides",
    lead: "AI search is changing quickly, and confident advice often moves faster than reliable evidence.",
    research,
    guides,
    implementation,
  },

  intro: {
    statement:
      "The Goodfaith AI Hub is where we document what we are testing, observing and learning about Google AI Search, ChatGPT Search and the wider shift toward AI-assisted discovery.",
    questionsLabel: "We study questions such as:",
    questions: [
      "Where are AI platforms getting their information?",
      "Why do certain businesses and sources appear repeatedly?",
      "How do business citations and genuine customer reviews contribute to the information surrounding a brand?",
      "How does query fan-out change keyword and content research?",
      "Does structured data influence AI citations?",
      "How much of traditional SEO still matters?",
    ],
  },

  approach: {
    label: "Our approach is:",
    steps: ["Question", "Test", "Observe", "Verify", "Learn"],
    title: "We do not use this Hub to promise AI rankings.",
    text: "We use it to separate what is documented, what we have observed and what still needs more testing.",
  },

  why: {
    title: "Why Goodfaith Studies AI Search",
    intro: [
      "There is already a large amount of advice about “ranking in AI.”",
      "Some of it comes from strong research. Some is opinion. Some is traditional SEO presented under a new name.",
      "Goodfaith prefers to investigate the question before turning it into a recommendation.",
    ],
    combinesLabel: "Our AI-search work combines:",
    combines: [
      "Practical SEO Experience",
      "Manual Source Analysis",
      "AI Testing",
      "Original Experiments",
      "Primary Platform Documentation",
    ],
    rules: [
      "When we publish an observation, we explain its limits.",
      "When Google or OpenAI tells us directly how part of its system works, we use that as the stronger source.",
      "When several things change at once, we do not claim that one tactic caused the result.",
    ],
    trust:
      "That distinction matters because trust is more valuable than a confident-sounding conclusion.",
    google:
      "Google’s own people-first guidance encourages original research, first-hand expertise, clear sourcing and transparent authorship. It also says trust is the most important part of E-E-A-T.",
  },

  observing: {
    title: "What We Are Observing in AI Search",
    note: "These are Goodfaith field observations, not guaranteed AI-ranking factors.",
    citations: {
      title: "Third-Party Citations Can Strengthen a Brand’s Information Footprint",
      lead: "One of the strongest patterns we have observed is that AI-search research should not stop at a company’s website.",
      listLabel: "We also examine:",
      list: [
        "Business directories",
        "Industry platforms",
        "Professional profiles",
        "Review platforms",
        "Publications",
        "Associations",
        "Relevant third-party websites",
      ],
      seen: "In our practical work, stronger and more consistent third-party business citations have often appeared alongside stronger AI-search visibility.",
      notLabel: "That does not mean:",
      not: "Add one directory listing = improve AI rankings.",
      takeaway:
        "Our practical takeaway is that credible third-party sources give search and AI systems additional places to encounter and confirm information about a business.",
      frameworkLabel: "We call this the:",
      framework: "Goodfaith AI Source Footprint",
      steps: [
        "Website",
        "Business Profiles",
        "Reviews",
        "External References",
        "Wider Discoverability",
      ],
    },
    reviews: {
      title: "Genuine Reviews Add Information a Business Cannot Write About Itself",
      lead: [
        "A business profile containing only a company name, phone number and address provides limited context.",
        "A legitimate profile supported by genuine customer reviews may contain information about:",
      ],
      list: [
        "Services received",
        "Customer problems",
        "Staff experience",
        "Locations",
        "Specific expertise",
        "The overall customer experience",
      ],
      seen: "In Goodfaith’s observations, established profiles containing genuine reviews have often been more informative than empty listings.",
      not: "We do not describe reviews as a confirmed direct AI-ranking factor.",
      sayLabel: "What we can say is:",
      say: "Real customer experiences create independent information about a business.",
      after: [
        "That is one reason we value genuine reviews and credible third-party profiles.",
        "We do not support fabricated reviews or artificial business profiles.",
      ],
    },
    sources: {
      title: "Study the Sources Before Creating More Content",
      lead: "One of the most useful questions in AI-search research is:",
      question: "Where is the answer getting its information from?",
      studies:
        "For important commercial questions, Goodfaith studies the sources appearing around the answer.",
      typesLabel: "We look at whether those sources are:",
      types: [
        "Company Websites",
        "Directories",
        "Publications",
        "Review Platforms",
        "Government Sources",
        "Forums",
        "Videos",
        "Industry Websites",
      ],
      askLabel: "Then we ask:",
      ask: [
        "Why might this source be useful?",
        "Does the business have a legitimate reason to be represented there?",
      ],
      askJoin: "and:",
      frameworkLabel: "This leads to the:",
      framework: "Goodfaith AI Source Gap Audit",
      steps: [
        "Important Question",
        "Sources Appearing",
        "Existing Brand Presence",
        "Missing Opportunities",
      ],
      after: [
        "The objective is not to get listed everywhere.",
        "It is to understand which parts of the information ecosystem may genuinely matter.",
        "Our detailed source-selection and execution process remains part of Goodfaith’s internal methodology.",
      ],
    },
    fanout: {
      title: "Query Fan-Out Changes How We Research Customer Questions",
      lead: [
        "Traditional keyword research often starts with one query.",
        "AI-powered search can investigate several related information needs at once.",
        "Google describes query fan-out as generating multiple related searches to gather the information needed to answer a broader question.",
      ],
      exampleLabel: "For example:",
      example:
        "“Which digital marketing company in Niagara would be suitable for a healthcare clinic that needs Local SEO and better AI visibility?”",
      needsLabel: "may involve information about:",
      needs: [
        "Niagara marketing companies",
        "Healthcare experience",
        "Local SEO",
        "Google Business Profile",
        "AI-search knowledge",
        "Reviews",
        "Evidence",
        "Company credibility",
      ],
      beyond: "Goodfaith therefore looks beyond the exact keyword.",
      frameworkLabel: "Our research model is:",
      framework: "Goodfaith Query Fan-Out Map",
      steps: ["Main Question", "Related Information Needs", "Evidence Needed", "Useful Sources"],
      after: [
        "That does not mean creating a separate webpage for every possible related query.",
        "Google specifically warns against producing large numbers of pages primarily to capture query variations.",
        "The better goal is to understand the customer’s full question and answer it properly.",
      ],
    },
    seo: {
      title: "Strong SEO Still Matters",
      lead: [
        "Goodfaith does not treat traditional SEO and AI SEO as two completely separate systems.",
        "Google says its existing SEO best practices remain relevant because its generative AI Search experiences use its broader Search ranking and quality systems.",
        "We have seen a similar pattern in our own work.",
      ],
      listLabel: "During a wider SEO implementation, improvements included areas such as:",
      list: [
        "Technical SEO",
        "Internal linking",
        "Service content",
        "Google Business Profile alignment",
        "Business citations",
        "Authority",
        "Website performance",
      ],
      after: [
        "During the wider implementation period, we also observed stronger AI-search visibility.",
        "Because several factors changed together, we do not claim that one specific tactic caused the improvement.",
      ],
      takeawayLabel: "Our practical takeaway is:",
      takeaway:
        "Build strong search foundations first. Then strengthen the expertise, evidence and external information surrounding the business.",
    },
  },

  lab: {
    title: "The Goodfaith AI Search Lab",
    lead: [
      "AI search is changing too quickly for us to rely only on theories.",
      "The Goodfaith AI Search Lab is where we test questions worth investigating.",
    ],
    areasLabel: "We are studying areas such as:",
    areas: [
      { title: "AI Citations", text: "Which pages and platforms appear as supporting sources?" },
      {
        title: "Brand Visibility",
        text: "What information surrounds businesses repeatedly surfaced in AI answers?",
      },
      {
        title: "Query Fan-Out",
        text: "What additional information sits behind complex customer questions?",
      },
      {
        title: "External Sources",
        text: "Where outside the website is useful business information appearing?",
      },
      {
        title: "Content & Expertise",
        text: "Does original knowledge provide something generic content cannot?",
      },
      {
        title: "Structured Data",
        text: "Where is Schema genuinely useful, and where are its AI benefits overstated?",
      },
    ],
    processLabel: "Our research process is:",
    process: ["Question", "Method", "Evidence", "Observation", "Limitation", "Practical Takeaway"],
  },

  featured: {
    title: "Featured Goodfaith Research",
    study: "Does Schema Influence Google AI Mode Citations?",
    method:
      "Goodfaith reviewed 15 URLs cited by Google AI Mode across three different topics and manually checked their structured data.",
    figures: [
      { value: "15", label: "URLs cited by Google AI Mode" },
      { value: "3", label: "different topics" },
    ],
    sampleLabel: "Our sample included:",
    sample: [
      "Pages with valid Schema",
      "Pages with incomplete or problematic Schema",
      "Pages with little or no meaningful structured data",
    ],
    found:
      "In this small observational sample, we did not find a clear direct relationship between valid Schema and AI Mode citations.",
    caveat: "That does not mean Schema is useless.",
    takeawayLabel: "Our takeaway is simply:",
    takeaway:
      "Use structured data accurately where it adds value. Do not treat it as a shortcut to AI citations.",
  },

  claims: {
    title: "What Goodfaith Will Not Claim About AI Search",
    lead: "AI search is still evolving, and some claims online are stronger than the available evidence.",
    listLabel: "Goodfaith does not claim that:",
    list: [
      "Schema guarantees AI citations.",
      "One directory listing automatically improves AI rankings.",
      "Reviews guarantee ChatGPT recommendations.",
      "Hundreds of AI-generated articles create authority.",
      "Social-media engagement is a confirmed direct Google ranking factor.",
      "llms.txt automatically improves Google AI visibility.",
      "A business can be guaranteed a permanent position in AI-generated answers.",
    ],
    google:
      "Google itself says Google Search does not require special AI files such as llms.txt, and recommends focusing on strong SEO foundations and genuinely useful content rather than AI-search “hacks.”",
    rules: [
      "When something is confirmed, we say it is confirmed.",
      "When something comes from our experience, we call it an observation.",
      "When the evidence is incomplete, we say:",
    ],
    unknown: "We don’t know yet.",
  },

  library: {
    title: "AI Search Evidence Library",
    lead: [
      "Goodfaith prefers primary sources whenever possible.",
      "Our research library follows areas including:",
    ],
    areas: [
      {
        title: "Google AI Search",
        text: "AI Mode, AI Overviews, query fan-out and official Search guidance.",
      },
      {
        title: "ChatGPT Search",
        text: "OpenAI crawling, search visibility and referral information. OpenAI says there is no guaranteed top placement in ChatGPT Search and that allowing OAI-SearchBot is important for sites that want to be eligible for inclusion.",
      },
      {
        title: "Content & E-E-A-T",
        text: "Original research, first-hand expertise, authorship and people-first content.",
      },
      {
        title: "Structured Data",
        text: "Official documentation combined with Goodfaith’s own experiments.",
      },
      {
        title: "External Authority",
        text: "Our ongoing observations around citations, reviews and third-party source visibility.",
      },
    ],
  },

  glossary: {
    title: "Quick AI Search Glossary",
    terms: [
      {
        term: "AI SEO",
        text: "Strategies intended to improve visibility and understanding across AI-assisted search experiences.",
      },
      {
        term: "AEO",
        text: "Answer Engine Optimization focuses on making useful answers easier for search and answer systems to understand.",
      },
      {
        term: "GEO",
        text: "Generative Engine Optimization is commonly used to describe work aimed at improving visibility within generative-search experiences.",
      },
    ],
    google:
      "Google describes AEO and GEO as industry terms and says that, from Google Search’s perspective, optimizing for generative AI Search is still SEO.",
    more: {
      lead: "Looking for the full service explanation?",
      label: implementation.label,
      href: implementation.href,
    },
  },

  author: {
    title: "Research & Analysis by Goodfaith",
    byline:
      "Research led by Lovish Tayal, Founder & CEO of Goodfaith Branding & Digital Marketing.",
    name: "Lovish Tayal",
    role: "Founder & CEO",
    text: "The Goodfaith AI Hub combines practical SEO work, manual source analysis, AI-search testing, original experiments and primary platform documentation.",
  },

  principles: {
    title: "Goodfaith AI Research Principles",
    list: [
      "Test Before Claiming",
      "Prefer Primary Sources",
      "Use Real Experience",
      "Show the Evidence",
      "Separate Observation From Causation",
      "Acknowledge Limitations",
      "Re-Test as AI Platforms Change",
      "Change the Conclusion When Better Evidence Appears",
    ],
    goal: [
      "The goal of the Goodfaith AI Hub is not to prove that we already have every answer.",
      "It is to become more accurate as we learn more.",
    ],
  },

  closing: {
    title: "Keep Learning With the Goodfaith AI Hub",
    lead: ["AI search will continue to change.", "So will our research."],
    topicsLabel: "The Goodfaith AI Hub will continue publishing practical work around:",
    topics: [
      "AI Citations",
      "Query Fan-Out",
      "Source Analysis",
      "Google AI Search",
      "ChatGPT Search",
      "Content",
      "Brand Visibility",
    ],
    primary: { label: "Explore Latest AI Research", href: research.href },
    secondary: { label: "Explore AI Search Guides", href: guides.href },
    help: {
      lead: "Need help applying the research?",
      label: implementation.label,
      href: implementation.href,
    },
  },
};

const shot = (name: string, width: number, height: number, alt = ""): Picture => ({
  src: `/images/aihub/${name}.webp`,
  alt,
  width,
  height,
});

export const aiHubPictures = {
  hero: shot("hero", 1668, 1144, "Black humanoid robot facing forward"),
  robotTurn: shot("robot-turn", 1024, 1024),
  robotOpen: shot("robot-open", 1242, 906, "Humanoid robot with its face panel open"),
  robotSide: shot("robot-side", 1260, 1260),
  robotDark: shot("robot-dark", 1024, 1024),
  productFront: shot("product-front", 984, 940, "Humanoid robot, front view"),
  productSide: shot("product-side", 984, 940, "Humanoid robot, side view"),
  walkWide: shot("walk-wide", 1600, 673, "Robot walking through a living room"),
  handsWide: shot("hands-wide", 1300, 968),
  stairsWide: shot("stairs-wide", 1300, 968),
  laundryWide: shot("laundry-wide", 2000, 833, "Two robots folding laundry"),
  deliveryWide: shot("delivery-wide", 2000, 833),
  plant: shot("plant", 900, 1178, "Robot watering a plant"),
  handover: shot("handover", 1200, 742, "Robot handing a shopping bag to a customer"),
  outsideWide: shot("outside-wide", 1800, 1050),
  laptop: shot("laptop", 1400, 812),

  axHead: shot("ax-head", 1600, 1107, "AI head with glowing circuit lines"),
  axHoloHead: shot("ax-holo-head", 533, 742),
  axHand: shot("ax-hand", 1100, 951),
  axNetwork: shot("ax-network", 1200, 744),
  axBrain: shot("ax-brain", 1200, 744),
  axChatbot: shot("ax-chatbot", 1000, 926),
  axChatbotWide: shot("ax-chatbot-wide", 1600, 727),
  axHologramWide: shot("ax-hologram-wide", 1600, 727),
  axDashboard: shot("ax-dashboard", 1200, 626),
  axAnalyst: shot("ax-analyst", 1200, 744),
  axRobotDesk: shot("ax-robot-desk", 1200, 594),
  axCircuitHead: shot("ax-circuit-head", 936, 1118),
};

export const aiHubPatterns = {
  grid: "/images/aihub/ax-grid.svg",
  wide: "/images/aihub/ax-grid-wide.svg",
  low: "/images/aihub/ax-grid-low.svg",
};
