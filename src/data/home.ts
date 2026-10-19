import { routes, services } from "@/lib/site";

export const home = {
  seoTitle: "Digital Marketing Agency Niagara Region | SEO & AI Search | Goodfaith",
  description:
    "Goodfaith is a Niagara Region digital marketing agency providing SEO, AI Search Optimization, Local SEO, web design, branding, content and digital growth strategy.",

  hero: {
    title:
      "Digital Marketing Agency in Niagara Region for SEO, AI Search, Web Design & Business Growth",
    intro:
      "Goodfaith Branding & Digital Marketing helps businesses get found, build trust and turn digital visibility into meaningful business growth. Based in Niagara Region, we support businesses throughout Niagara while also working with organizations across Ontario and Canada.",
    primary: { label: "Get a Free Digital Growth Audit", href: routes.audit },
    secondary: { label: "Explore Our Digital Marketing Services", href: services.seo },
  },

  ask: {
    title: "SEO Is Changing. People Don't Just Search - They Ask.",
    intro: "Search is becoming more conversational.",
    typedLabel: "Instead of typing:",
    typed: "basement waterproofing Niagara",
    askedLabel: "people may now ask:",
    asked:
      "My basement leaks after heavy rain. What type of waterproofing do I need, and who provides it near me?",
    howLabel: "How AI Search Works",
    how: "Customer asks a question → AI understands what they mean → AI runs a query fan-out → AI looks for useful information → Businesses and sources are evaluated → An answer is created",
    // The flip card above the steps. Illustrative: the searches a fan-out could run for the question.
    fanoutDemo: {
      intents: [
        { key: "Problem", text: "Leaks after heavy rain" },
        { key: "Need", text: "The right waterproofing" },
        { key: "Place", text: "Near me" },
      ],
      queries: [
        { kind: "Cause", text: "why do basements leak after heavy rain" },
        { kind: "Compare", text: "interior vs exterior basement waterproofing" },
        { kind: "Repair", text: "foundation crack repair options" },
        { kind: "Cost", text: "basement waterproofing cost Niagara" },
        { kind: "Local", text: "waterproofing contractors near me" },
        { kind: "Trust", text: "waterproofing company reviews" },
      ],
      sources: ["yourbusiness.ca", "Google Business Profile", "Reviews", "Local guides"],
      caption: "Illustrative example of a query fan-out",
    },
    fanoutLabel: "Query fan-out",
    fanout:
      "Google also uses query fan-out, where one complex question can lead to multiple related searches before an AI-powered response is created.",
    everywhereTitle: "Search Is Everywhere",
    everywhereLead: "Customers now discover businesses across:",
    surfaces: [
      "Google Search",
      "Maps",
      "AI Overviews",
      "AI Mode",
      "ChatGPT",
      "Gemini",
      "YouTube",
      "Social media",
      "Industry platforms",
    ],
    everywhereLine: "That means modern SEO is becoming more like Search Everywhere Optimization.",
    cta: { label: "Explore AI Search Optimization", href: services.seo },
  },

  aiTerms: {
    title: "What Are AI SEO, AEO & GEO?",
    intro:
      "Traditional SEO is still the foundation. AI SEO, AEO and GEO extend that foundation into newer search experiences.",
    items: [
      {
        name: "AI SEO",
        text: "Helps search engines and AI systems better understand your business, website and expertise.",
      },
      { name: "AEO", text: "Focuses on answering the questions customers actually ask." },
      {
        name: "GEO",
        text: "Strengthens how your brand, expertise and information are represented across the wider web.",
      },
    ],
    simpleLabel: "In Simple Terms",
    simple: [
      { term: "SEO", text: "gets you discovered." },
      { term: "AEO", text: "improves how questions are answered." },
      { term: "GEO", text: "strengthens your wider digital presence." },
      { term: "AI SEO", text: "connects it all for modern search." },
    ],
    cta: { label: "Explore AI SEO, AEO & GEO", href: services.aiSeo },
    // Phone demo beside "In Simple Terms". Illustrative until a verified client result (and the
    // client's permission to name them) replaces `pick`.
    demo: {
      app: "ChatGPT",
      searching: "Searching the web",
      answer:
        "Water coming in after heavy rain usually points to foundation cracks or drainage around the house. A local waterproofing specialist can inspect the basement and recommend interior or exterior waterproofing.",
      listLabel: "Top local options",
      pick: {
        name: "Your Business",
        meta: "Waterproofing & drainage · Niagara Region",
        badge: "Top pick",
        sources: ["yourbusiness.ca", "Google Business Profile", "Reviews"],
      },
      caption: "Illustrative example of an AI answer",
    },
  },

  understanding: {
    title: "Before AI Can Surface Your Business, It Has to Understand It.",
    intro: "Search and AI systems need clear information about:",
    signals: [
      { key: "Who", text: "your brand" },
      { key: "What", text: "your services" },
      { key: "Where", text: "your locations" },
      { key: "Knowledge", text: "your expertise" },
      { key: "Evidence", text: "your projects, reviews and proof" },
      { key: "Authority", text: "your citations, mentions and relevant sources" },
    ],
    chainLabel: "Clearer Digital Understanding",
    chain: "Brand → Services → Expertise → Content → Evidence → Authority",
    outro:
      "Goodfaith helps connect these signals through SEO, AI SEO, AEO, GEO, content and technical optimization.",
    outroLinks: {
      SEO: services.seo,
      "AI SEO, AEO, GEO": services.aiSeo,
      content: services.contentMarketing,
      "technical optimization": services.technicalSeo,
    } as Record<string, string>,
    cta: { label: "Discover Our AI SEO Approach", href: services.aiSeo },
  },

  team: {
    title: "Experienced Digital Marketing, SEO & Website Strategy Team",
    text: [
      "Successful digital marketing rarely depends on one channel alone. SEO can be limited by website architecture, strong traffic can be wasted by poor UX, and great branding has limited impact when potential customers cannot discover the business.",
      "Goodfaith combines digital marketing, technology, websites, search and branding experience so each part of the customer journey can support the next.",
    ],
    stats: [
      { value: "10+", unit: "Years", label: "Combined Digital & Technology Experience" },
      {
        value: "50+",
        unit: "Clients & Organizations",
        label: "Experience Supporting Businesses Across Multiple Markets",
      },
      { value: "SEO + AI + Web + Brand", unit: "", label: "Connected Digital Expertise" },
    ],
    pull: "We don't start with a package. We start with the business problem.",
  },

  bottlenecks: {
    title: "Getting Website Traffic but No Calls or Leads?",
    intro: [
      "More traffic is not always the answer. Many businesses already receive impressions, rankings or website visitors, but something breaks before the customer contacts them.",
      "The problem may be irrelevant search traffic, confusing messaging, weak trust signals, poor mobile UX, difficult forms, insufficient local visibility or an outdated website.",
      "Finding that bottleneck helps determine what actually needs improvement.",
    ],
    items: [
      {
        q: "Getting Traffic but Almost No Enquiries?",
        a: "Your website may need stronger UX/UI design, Conversion Rate Optimization, messaging, trust signals or landing pages rather than simply more visitors.",
        cta: "Explore Website Redesign & CRO",
        href: services.redesign,
      },
      {
        q: "Your Website Looks Professional but Nobody Finds It?",
        a: "The issue may involve Technical SEO, On-Page SEO, content gaps, internal linking, search intent or digital authority.",
        cta: "Explore SEO Services",
        href: services.seo,
      },
      {
        q: "Ranking Organically but Competitors Dominate Google Maps?",
        a: "Your Local SEO, Google Business Profile, reviews, citations, service-area relevance or local authority may need improvement.",
        cta: "Explore Local SEO Services",
        href: services.localSeo,
      },
      {
        q: "Customers Don't Understand Why You're Different?",
        a: "Your challenge may involve brand positioning, messaging, visual identity or credibility rather than traffic generation.",
        cta: "Explore Branding & Visual Identity",
        href: services.branding,
      },
      {
        q: "Doing SEO but Rarely Appearing in AI Search?",
        a: "Your digital presence may need stronger AI-search accessibility, answer-focused content, entity clarity, supporting evidence and authority.",
        cta: "Explore AI SEO, AEO & GEO",
        href: services.aiSeo,
      },
      {
        q: "People Discover Your Business but Don't Stay Engaged?",
        a: "Strategic content marketing and social media optimization can help demonstrate expertise, answer customer questions and keep your business visible throughout the buying journey.",
        cta: "Explore Content Marketing",
        href: services.contentMarketing,
      },
    ],
    outro: "Find the bottleneck before adding another marketing channel.",
  },

  ecosystem: {
    title: "The Goodfaith Digital Marketing Ecosystem",
    intro:
      "The Goodfaith Ecosystem connects branding, website design, development, SEO, Local SEO, Google Business Profile, content, social media and AI-search readiness around the customer journey.",
    stages: [
      {
        n: "01",
        name: "Build Trust",
        text: "Give potential customers clear reasons to understand and trust your business before they compare providers or prices.",
        services: [
          {
            name: "Branding & Visual Identity",
            text: "Build recognizable positioning, messaging and visual consistency.",
            href: services.branding,
          },
          {
            name: "Website Design",
            text: "Create a professional digital experience around your customers, services and business goals.",
            href: services.websiteDesign,
          },
          {
            name: "Web Development",
            text: "Turn strategy and design into fast, responsive, scalable and maintainable websites.",
            href: services.webDevelopment,
          },
        ],
      },
      {
        n: "02",
        name: "Get Found",
        text: "Help search engines, Maps, AI platforms and potential customers understand what your business offers and when it is relevant.",
        services: [
          {
            name: "AI-First SEO Suite",
            text: "Traditional SEO, Technical SEO, On-Page SEO, Content SEO, Off-Page Authority, AI SEO, AIO, AEO and GEO.",
            href: services.seo,
          },
          {
            name: "Local SEO",
            text: "Build stronger visibility across the communities and service areas that genuinely matter to your business.",
            href: services.localSeo,
          },
          {
            name: "Google Business Profile",
            text: "Strengthen your presence across Google Search and Maps while improving relevance, accuracy and customer actions.",
            href: services.gbp,
          },
        ],
      },
      {
        n: "03",
        name: "Create Demand",
        text: "Answer customer questions, demonstrate expertise and remain visible while potential customers research and compare their options.",
        services: [
          {
            name: "Content Marketing",
            text: "Develop service pages, resources and expertise-led content around genuine customer needs and search intent.",
            href: services.contentMarketing,
          },
          {
            name: "Social Media Optimization",
            text: "Build a consistent digital presence across relevant social platforms and communicate expertise beyond the website.",
            href: services.socialMedia,
          },
        ],
      },
      {
        n: "04",
        name: "Convert & Grow",
        text: "Turn visibility, trust and demand into enquiries, bookings, sales conversations and sustainable business growth.",
        services: [],
      },
    ],
    formula:
      "Brand Trust + Search Visibility + Website Experience + Content + Conversion Strategy → Business Growth",
    outcomes: [
      {
        name: "Find You.",
        text: "SEO, Local SEO, Google Business Profile and content strengthen discovery.",
      },
      {
        name: "Trust You.",
        text: "Branding, website experience, expertise and consistent communication strengthen credibility.",
      },
      {
        name: "Choose You.",
        text: "Clear pages, useful answers, genuine proof and conversion-focused experiences make the next step easier.",
      },
    ],
    cta: { label: "Explore the Goodfaith Ecosystem", href: routes.ecosystem },
  },

  services: {
    title: "Digital Marketing Services for SEO, AI Search, Local SEO, Web Design & Branding",
    intro: [
      "Goodfaith provides specialized digital marketing services while keeping each service connected to the wider customer journey.",
      "Some businesses need one focused solution. Others need several disciplines working together.",
      "The right combination depends on your visibility, competition, website performance, customers and business objectives.",
    ],
    items: [
      {
        name: "SEO & AI Search Optimization",
        text: "Build stronger visibility across traditional search while preparing your digital presence for increasingly conversational and AI-assisted discovery.",
        tags: [
          "SEO Strategy & Audits",
          "Technical SEO",
          "On-Page & Content SEO",
          "Off-Page SEO & Digital Authority",
          "AI SEO",
          "AIO",
          "AEO",
          "GEO",
          "ChatGPT SEO",
          "Image SEO",
        ],
        cta: "Explore SEO & AI Search Optimization",
        href: services.seo,
      },
      {
        name: "Local SEO & Google Business Profile",
        text: "Strengthen visibility when customers search for businesses and services within the markets you genuinely serve.",
        tags: [
          "Local SEO Strategy",
          "Google Maps & Local Pack Visibility",
          "Service-Area SEO",
          "Citations & NAP Management",
          "Reviews & Local Authority",
          "GBP Optimization",
        ],
        cta: "Explore Local SEO Services",
        href: services.localSeo,
      },
      {
        name: "Website Design & Development",
        text: "Create websites around customer journeys, business goals, search visibility and conversions.",
        tags: [
          "Custom Website Design",
          "UX/UI",
          "Responsive Design",
          "Landing Pages",
          "Web Development",
          "Website Redesign & CRO",
        ],
        cta: "Explore Website Design & Development",
        href: services.websiteDesign,
      },
      {
        name: "Branding & Visual Identity",
        text: "Build a clearer brand that customers can recognize, understand and trust.",
        tags: [
          "Brand Strategy",
          "Positioning",
          "Messaging",
          "Logo & Visual Identity",
          "Digital Brand Consistency",
        ],
        cta: "Explore Branding Services",
        href: services.branding,
      },
      {
        name: "Content Marketing",
        text: "Develop service pages, resources and expertise-led content around genuine customer needs and search intent.",
        tags: [
          "Content Strategy",
          "Service Content",
          "Expert Content",
          "Authority Content",
          "Digital Content Planning",
        ],
        cta: "Explore Content Marketing Services",
        href: services.contentMarketing,
      },
      {
        name: "Social Media",
        text: "Build a consistent digital presence across relevant social platforms and communicate expertise beyond the website.",
        tags: [
          "Social Media Optimization",
          "Social Media Content & Management",
          "Short-Form Video & Creative Editing",
          "Content Creation & Brand Consistency",
          "Publishing & Content Management",
          "Audience Growth & Engagement",
        ],
        cta: "Explore Social Media Services",
        href: services.socialMedia,
      },
    ],
  },

  cases: {
    title: "Digital Marketing Research, Case Studies & Strategy Examples",
    intro: [
      "Different businesses require different digital strategies. Search competition, customer behaviour, website quality, local visibility and trust can create very different growth constraints.",
      "Our approach begins by understanding the problem and then connecting the right parts of the Goodfaith Ecosystem around it.",
    ],
  },

  proof: {
    title: "SEO & Digital Marketing Results: Proof in the Data",
    intro:
      "Goodfaith measures digital performance across the stages that matter—from being discovered in search to generating meaningful customer actions.",
    lead: "Depending on the project, we monitor:",
    items: [
      {
        name: "Organic Search Visibility",
        category: "seo-ai-search-optimization",
        source: "Google Search Console",
        text: "Clicks, impressions and commercially relevant search queries.",
      },
      {
        name: "Google Business Profile Performance",
        category: "google-business-profile",
        source: "Local Search",
        text: "Calls, website visits, directions and other customer actions.",
      },
      {
        name: "Technical SEO & Website Performance",
        category: "seo-ai-search-optimization",
        source: "Technical Performance",
        text: "Crawlability, indexing, website speed and important technical improvements.",
      },
      {
        name: "Leads & Conversions",
        category: "website-design",
        source: "Analytics & Conversion Tracking",
        text: "Forms, calls, bookings and enquiries that connect visibility with business outcomes.",
      },
      {
        name: "AI Search Visibility",
        category: "seo-ai-search-optimization",
        source: "AI Search",
        text: "Business visibility, citations, referenced sources and referral activity across AI-assisted search experiences.",
      },
    ],
    realTitle: "Real Performance. Measured With Real Data.",
    realText: [
      "Rankings alone do not tell the whole story.",
      "We look at whether stronger search visibility is translating into more impressions, more website visits, more calls, more enquiries and greater opportunities for the business.",
    ],
    cases: [
      {
        name: "Organic Search Growth",
        metrics: [
          { value: "1.08M", label: "Search Impressions" },
          { value: "5.52K", label: "Organic Clicks" },
        ],
        note: "Measured through Google Search Console across the reported 16-month period.",
        shot: {
          label: "Google Search Console",
          caption: "Search performance over the reported period",
        },
        text: [
          "Search performance data helps us understand how often a business is being discovered, which pages and queries are gaining visibility and where further opportunities exist.",
        ],
        flow: "Search Visibility → Clicks → Customer Discovery",
      },
      {
        name: "Local Search That Generates Calls",
        metrics: [
          { value: "221", label: "Calls From Google Business Profile" },
          { value: "111", label: "Calls in August 2026" },
        ],
        note: "Measured through Google Business Profile performance data from March to August 2026.",
        shot: { label: "Google Business Profile", caption: "Calls recorded from the profile" },
        text: [
          "Local SEO becomes much more meaningful when visibility turns into real customer action.",
          "We therefore look beyond Maps rankings and monitor actions such as calls, website visits, directions, bookings and enquiries.",
        ],
        flow: "Local Visibility → Customer Action → Business Opportunity",
      },
    ],
    ai: {
      title: "Visibility Across AI-Powered Search",
      intro: [
        "Search is evolving beyond traditional blue-link results.",
        "Where reliable data is available, Goodfaith also reviews how businesses are being discovered and referenced across experiences such as:",
      ],
      platforms: ["Google AI Overviews", "Google AI Mode", "ChatGPT", "Gemini"],
      shot: {
        label: "AI search result",
        caption: "Verified AI Overview, AI Mode or ChatGPT result",
      },
      factorsLabel: "We look at factors such as:",
      factors: [
        "Brand Visibility",
        "Sources Cited",
        "Pages Referenced",
        "AI Referral Traffic",
        "Customer Questions",
      ],
      outro:
        "The objective is to understand whether the business is becoming easier to discover, understand and reference across modern search.",
    },
    closingTitle: "Visibility Matters. What Happens After the Visibility Matters Even More.",
    closingFlow: "Impressions → Clicks → Calls → Leads → Business Growth",
    closingText:
      "Goodfaith connects SEO, local visibility, website performance, AI search and conversion measurement so marketing progress can be evaluated against real customer actions—not rankings alone.",
    cta: { label: "Explore Our Digital Marketing Research & Case Studies", href: routes.portfolio },
  },

  why: {
    title: "Why Choose Goodfaith as Your Digital Marketing Agency?",
    intro:
      "Goodfaith focuses on solving the business problem rather than maximizing marketing activity.",
    columns: ["Typical Digital Marketing Approach", "Goodfaith Approach"],
    rows: [
      [
        "SEO focused primarily on rankings",
        "Search connected to customer intent and business outcomes",
      ],
      [
        "Website treated mainly as design",
        "UX, SEO, performance and conversion considered together",
      ],
      ["AI search treated as a separate trend", "AI search built on strong SEO foundations"],
      [
        "Google Business Profile managed independently",
        "GBP connected with Local SEO and website strategy",
      ],
      [
        "Content produced mainly for volume",
        "Content built around useful questions and real expertise",
      ],
      [
        "Similar package for every business",
        "Strategy adapted to customer behaviour and business goals",
      ],
      ["Reporting focused on activity", "Performance connected to meaningful customer actions"],
    ],
    outro:
      "Sometimes the best growth strategy is not generating more traffic. It is improving what happens to the traffic you already have.",
  },

  industries: {
    title: "Digital Marketing Services for Different Industries",
    text: [
      "Different industries require different customer journeys, levels of trust and search strategies.",
      "A homeowner choosing a waterproofing contractor evaluates evidence differently from a patient selecting a clinic, a company researching a SaaS platform or a buyer evaluating a construction firm.",
      "Goodfaith adapts search, content, website and conversion strategies around those differences.",
    ],
    list: [
      "Healthcare & Wellness",
      "Construction",
      "Home Services",
      "Legal",
      "Professional Services",
      "Real Estate",
      "Financial Services",
      "SaaS & Technology",
      "Ecommerce",
      "Hospitality",
      "Automotive",
      "Restaurants",
      "Beauty & Wellness",
      "Multi-Location Businesses",
    ],
  },

  areas: {
    title: "Digital Marketing Agency Serving Niagara Region",
    text: [
      "Goodfaith Branding & Digital Marketing is based in Niagara Region and supports businesses across the region with SEO, AI Search Optimization, Local SEO, website services, branding, content and digital growth strategy.",
      "Different Niagara businesses can face very different markets.",
      "A tourism business in Niagara Falls, professional practice in St. Catharines, contractor in Welland and winery in Niagara-on-the-Lake may serve completely different customers.",
      "That is why we build strategies around the actual market, customers and competition of each business rather than applying the same local approach everywhere.",
    ],
    listTitle: "Areas We Serve Across Niagara Region",
    note: [
      "Niagara Region is our primary local market.",
      "Services such as SEO strategy, AI Search Optimization, website design, web development, branding and content marketing can also support businesses across Ontario and Canada.",
    ],
  },

  faqs: [
    {
      q: "What Does Goodfaith Branding & Digital Marketing Do?",
      a: "Goodfaith provides SEO, AI Search Optimization, Local SEO, Google Business Profile services, website design and development, branding, content marketing, social media optimization and conversion-focused digital strategy.",
    },
    {
      q: "Where Is Goodfaith Branding & Digital Marketing Based?",
      a: "Goodfaith is based in Niagara Region, Ontario. Niagara is our primary local market, while many of our digital services can also support organizations elsewhere in Ontario and across Canada.",
    },
    {
      q: "What Areas of Niagara Region Does Goodfaith Serve?",
      a: "Goodfaith supports businesses across St. Catharines, Niagara Falls, Thorold, Welland, Niagara-on-the-Lake, Fort Erie, Port Colborne, Pelham, Lincoln, Grimsby, West Lincoln and Wainfleet.",
    },
    {
      q: "Why Am I Getting Website Traffic but No Leads?",
      a: "Traffic without leads can result from irrelevant search intent, unclear messaging, weak trust signals, poor UX, difficult forms or ineffective conversion paths.\n\nIncreasing traffic is therefore not always the correct first solution.",
    },
    {
      q: "Is SEO Still Important With AI Search?",
      a: "Yes. Strong SEO foundations remain important for helping search platforms discover, understand and evaluate website content, including within newer AI-assisted search experiences.",
    },
    {
      q: "Should Businesses Optimize for Keywords or Conversational Questions?",
      a: "Both. Commercial keywords help establish what a business offers, while conversational questions address the detailed problems, comparisons and decisions customers make during research.",
    },
    {
      q: "Can My Website Appear in ChatGPT Search?",
      a: "Public websites can potentially appear in ChatGPT Search. Eligibility does not guarantee that a website will be selected, mentioned or cited.",
    },
    {
      q: "Does Goodfaith Only Work With Niagara Businesses?",
      a: "No. Niagara Region is our primary local market, but many Goodfaith services can also be delivered to businesses across Ontario and Canada.",
    },
    {
      q: "Do I Need Separate Website Pages for Every Niagara City I Serve?",
      a: "Not necessarily. A separate location page should have a genuine purpose, meaningful search opportunity and useful information for customers in that market.\n\nGoodfaith first considers customer demand, geographic relevance and business value before recommending additional location pages.",
    },
    {
      q: "Which Digital Marketing Service Does My Business Need?",
      a: "Start with the problem.\n\nLow visibility → SEO. Weak Google Maps presence → Local SEO. Traffic without enquiries → Website / CRO. Weak differentiation → Branding. Limited authority → Content. Weak AI visibility → SEO + AI Search Strategy.\n\nThe strongest starting point depends on where the customer journey is currently breaking.",
    },
  ],

  closing: {
    title: "Not Sure Which Digital Marketing Service Your Business Needs?",
    text: "You don't need to decide whether you need SEO, Local SEO, website redesign, CRO, branding or AI Search Optimization before speaking with us.",
    tellUs: "Tell us what you are seeing:",
    symptoms: [
      "Poor rankings",
      "Traffic without calls",
      "Weak Google Maps visibility",
      "An outdated website",
      "Low lead generation",
      "Limited brand recognition",
      "Uncertainty about AI search",
    ],
    line: "We can start by identifying where the strongest opportunity exists.",
    statement: "Find the constraint. Fix the right problem. Build the system around growth.",
    primary: { label: "Get Your Free Digital Growth Audit", href: routes.audit },
    secondary: { label: "Explore the Goodfaith Ecosystem", href: routes.ecosystem },
  },
};
