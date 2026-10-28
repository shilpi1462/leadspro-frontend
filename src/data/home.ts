import { routes, services } from "@/lib/site";

export const home = {
  seoTitle: "Digital Marketing Agency Dubai | SEO & AI Search | LeadsPro",
  description:
    "LeadsPro is a Dubai digital marketing agency providing SEO, AI Search Optimization, Local SEO, web design, branding, content and digital growth strategy.",

  hero: {
    title: "Digital Marketing Agency in Dubai UAE for SEO, AI Search, Web Design & Business Growth",
    intro:
      "Leads Pro Helps Businesses Get Found, Build Trust and Turn Digital Visibility Into Meaningful Business Growth. Based in Dubai, UAE, we support businesses throughout Dubai while also working with organizations across the United Arab Emirates.",
    primary: { label: "Get a Free Digital Growth Audit", href: routes.nolink },
    secondary: { label: "Explore Our Digital Marketing Services", href: services.nolink },
  },

  ask: {
    title: "SEO Is Changing. People Don't Just Search - They Ask.",
    intro: "Search is becoming more conversational.",
    typedLabel: "Instead of typing:",
    typed: "best digital marketing agency Dubai",
    askedLabel: "people may now ask:",
    asked:
      "My website gets traffic but hardly any enquiries. Which digital marketing agency in Dubai can improve my SEO and help me generate more leads?",
    howLabel: "How AI Search Works",
    how: "Customer asks a question → AI understands what they mean → AI runs a query fan-out → AI looks for useful information → Businesses and sources are evaluated → An answer is created",
    // The flip card above the steps. Illustrative: the searches a fan-out could run for the question.
    fanoutDemo: {
      intents: [
        { key: "Problem", text: "Leaks after heavy rain" },
        { key: "Need", text: "The right Seo Agency" },
        { key: "Place", text: "Near me" },
      ],
      queries: [
        { kind: "Cause", text: "why do basements leak after heavy rain" },
        { kind: "Compare", text: "interior vs exterior basement waterproofing" },
        { kind: "Repair", text: "foundation crack repair options" },
        { kind: "Cost", text: "basement waterproofing cost Dubai" },
        { kind: "Local", text: "waterproofing contractors near me" },
        { kind: "Trust", text: "waterproofing company reviews" },
      ],
      sources: ["yourbusiness.ae", "Google Business Profile", "Reviews", "Local guides"],
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
      "Social Media",
      "Industry Platforms",
    ],
    everywhereLine: "That Means Modern SEO Is Becoming More Like Search Everywhere Optimization.",
    cta: { label: "Explore AI Search Optimization", href: services.nolink },
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
    cta: { label: "Explore AI SEO, AEO & GEO", href: services.nolink },
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
        meta: "Waterproofing & drainage · Dubai",
        badge: "Top pick",
        sources: ["yourbusiness.ae", "Google Business Profile", "Reviews"],
      },
      caption: "Illustrative example of an AI answer",
    },
  },

  understanding: {
    title: "Before AI Can Surface Your Business, It Has to Understand It.",
    intro: "Search and AI systems need clear information about:",
    signals: [
      { key: "Who", text: " Your Brand" },
      { key: "What", text: "Your Services" },
      { key: "Where", text: "Your Locations" },
      { key: "Knowledge", text: "Your Expertise" },
      { key: "Evidence", text: "Your Projects, Reviews and Proof" },
      { key: "Authority", text: "Your Citations, Mentions and Relevant Sources" },
    ],
    chainLabel: "Clearer Digital Understanding",
    chain: "Brand → Services → Expertise → Content → Evidence → Authority",
    outro:
      "LeadsPro helps connect these signals through SEO, AI SEO, AEO, GEO, content and technical optimization.",
    outroLinks: {
      SEO: services.seo,
      "AI SEO, AEO, GEO": services.aiSeo,
      content: services.contentMarketing,
      "technical optimization": services.technicalSeo,
    } as Record<string, string>,
    cta: { label: "Discover Our AI SEO Approach", href: services.nolink },
  },

  team: {
    title: "Experienced Digital Marketing, SEO & Website Strategy Team",
    text: [
      "Successful digital marketing rarely depends on one channel alone. SEO can be limited by website architecture, strong traffic can be wasted by poor UX, and great branding has limited impact when potential customers cannot discover the business.",
      "Leads Pro combines digital marketing, technology, websites, search and branding experience so each part of the customer journey can support the next.",
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
        href: services.nolink,
      },
      {
        q: "Your Website Looks Professional but Nobody Finds It?",
        a: "The issue may involve Technical SEO, On-Page SEO, content gaps, internal linking, search intent or digital authority.",
        cta: "Explore SEO Services",
        href: services.nolink,
      },
      {
        q: "Ranking Organically but Competitors Dominate Google Maps?",
        a: "Your Local SEO, Google Business Profile, reviews, citations, service-area relevance or local authority may need improvement.",
        cta: "Explore Local SEO Services",
        href: services.nolink,
      },
      {
        q: "Customers Don't Understand Why You're Different?",
        a: "Your challenge may involve brand positioning, messaging, visual identity or credibility rather than traffic generation.",
        cta: "Explore Branding & Visual Identity",
        href: services.nolink,
      },
      {
        q: "Doing SEO but Rarely Appearing in AI Search?",
        a: "Your digital presence may need stronger AI-search accessibility, answer-focused content, entity clarity, supporting evidence and authority.",
        cta: "Explore AI SEO, AEO & GEO",
        href: services.nolink,
      },
      {
        q: "People Discover Your Business but Don't Stay Engaged?",
        a: "Strategic content marketing and social media optimization can help demonstrate expertise, answer customer questions and keep your business visible throughout the buying journey.",
        cta: "Explore Content Marketing",
        href: services.nolink,
      },
    ],
    outro: "Find the bottleneck before adding another marketing channel.",
  },

  ecosystem: {
    title: "The LeadsPro Digital Marketing Ecosystem",
    intro:
      "The LeadsPro Ecosystem connects branding, website design, development, SEO, Local SEO, Google Business Profile, content, social media and AI-search readiness around the customer journey.",
    stages: [
      {
        n: "01",
        name: "Build Trust",
        text: "Give potential customers clear reasons to understand and trust your business before they compare providers or prices.",
        services: [
          {
            name: "Branding & Visual Identity",
            text: "Build recognizable positioning, messaging and visual consistency.",
            href: services.nolink,
          },
          {
            name: "Website Design",
            text: "Create a professional digital experience around your customers, services and business goals.",
            href: services.nolink,
          },
          {
            name: "Web Development",
            text: "Turn strategy and design into fast, responsive, scalable and maintainable websites.",
            href: services.nolink,
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
            href: services.nolink,
          },
          {
            name: "Local SEO",
            text: "Build stronger visibility across the communities and service areas that genuinely matter to your business.",
            href: services.nolink,
          },
          {
            name: "Google Business Profile",
            text: "Strengthen your presence across Google Search and Maps while improving relevance, accuracy and customer actions.",
            href: services.nolink,
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
            href: services.nolink,
          },
          {
            name: "Social Media Optimization",
            text: "Build a consistent digital presence across relevant social platforms and communicate expertise beyond the website.",
            href: services.nolink,
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
    cta: { label: "Explore the LeadsPro Ecosystem", href: routes.nolink },
  },

  services: {
    title: "Digital Marketing Services for SEO, AI Search, Local SEO, Web Design & Branding",
    intro: [
      "Leads Pro provides specialized digital marketing services while keeping each service connected to the wider customer journey. Some businesses need one focused solution. Others need several disciplines working together. The right combination depends on your visibility, competition, website performance, customers and business objectives.",
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
        href: services.nolink,
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
        href: services.nolink,
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
        href: services.nolink,
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
        href: services.nolink,
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
        href: services.nolink,
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
        href: services.nolink,
      },
    ],
  },

  cases: {
    title: "Digital Marketing Research, Case Studies & Strategy Examples",
    intro: [
      "Different businesses require different digital strategies. Search competition, customer behaviour, website quality, local visibility and trust can create very different growth constraints.",
      "Our approach begins by understanding the problem and then connecting the right parts of the LeadsPro Ecosystem around it.",
    ],
  },

  proof: {
    title: "SEO & Digital Marketing Results: Proof in the Data",
    intro:
      "Leads Pro measures digital performance across the stages that matter, from being discovered in search to generating meaningful customer actions.",
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
          { value: "608K", label: "Search Impressions" },
          { value: "4.03K", label: "Organic Clicks" },
        ],
        note: "Measured through Google Search Console across the reported 16-month period.",
        shot: {
          label: "Google Search Console",
          caption: "Google Search Console performance",
          picture: {
            src: "/images/google-search-console.webp",
            alt: "Google Search Console search performance report",
            width: 1200,
            height: 800,
          },
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
        shot: {
          label: "Google Business Profile",
          caption: "Google Business Profile performance",
          picture: {
            src: "/images/gmb.webp",
            alt: "Google Business Profile performance results",
            width: 1200,
            height: 800,
          },
        },
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
        "Where reliable data is available, LeadsPro also reviews how businesses are being discovered and referenced across experiences such as:",
      ],
      platforms: ["Google AI Overviews", "Google AI Mode", "ChatGPT", "Gemini"],
      shot: {
        label: "AI Performance",
        caption: "AI search performance",
        picture: {
          src: "/images/ai-performance.webp",
          alt: "AI search performance report",
          width: 1200,
          height: 800,
        },
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
      "LeadsPro connects SEO, local visibility, website performance, AI search and conversion measurement so marketing progress can be evaluated against real customer actions—not rankings alone.",
    cta: { label: "Explore Our Digital Marketing Research & Case Studies", href: routes.nolink },
  },

  why: {
    title: "Why Choose LeadsPro as Your Digital Marketing Agency?",
    intro:
      "LeadsPro focuses on solving the business problem rather than maximizing marketing activity.",
    columns: ["Typical Digital Marketing Approach", "LeadsPro Approach"],
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
      "Sometimes the Best Growth Strategy Is Not Generating More Traffic. It Is Improving What Happens to the Traffic You Already Have.",
  },

  industries: {
    title: "Digital Marketing Services for Different Industries",
    text: [
      "Different industries require different customer journeys, levels of trust and search strategies.",
      "A homeowner choosing a maintenance contractor evaluates evidence differently from a patient selecting a clinic, a company researching a SaaS platform or a buyer evaluating a construction firm.",
      "Leads Pro adapts search, content, website and conversion strategies around those differences.",
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
    title: "Digital Marketing Agency Serving Dubai, UAE",
    text: [
      "Leads Pro serves businesses across Dubai with SEO, AI Search Optimization, Local SEO, website services, branding, content and digital growth strategies.",
      "Different Dubai business areas can serve different markets.",
      "A tourism business in Dubai Marina, professional practice in Business Bay, real estate agency in Downtown Dubai and logistics company in Jebel Ali may serve completely different customers.",
      "That is why we build strategies around the actual market, customers and competition of each business rather than applying the same local approach everywhere.",
    ],
    listTitle: "Areas We Serve Across Dubai",
    note: [
      "Dubai is our primary local market.",
      "Services such as SEO strategy, AI Search Optimization, website design, web development, branding and content marketing can also support businesses across Dubai.",
    ],
  },

  faqs: [
    {
      q: "What Does Leads Pro Do?",
      a: "Leads Pro provides SEO, AI Search Optimization, Local SEO, Google Business Profile services, website design and development, branding, content marketing, social media optimization and conversion-focused digital strategy.",
    },
    {
      q: "Where Is Leads Pro Based?",
      a: "Leads Pro serves businesses in Dubai, UAE, offering digital marketing, SEO, web design and AI Search Optimization services.",
    },
    {
      q: "What Areas of Dubai Does Leads Pro Serve?",
      a: "Leads Pro supports businesses across Dubai Marina, Downtown Dubai, Business Bay, Jumeirah, JLT, Deira, Al Barsha and other Dubai locations.",
    },
    {
      q: "Why Am I Getting Website Traffic but No Leads?",
      a: "Your website may attract the wrong visitors or have poor navigation, weak content, slow loading speed or unclear calls to action.",
    },
    {
      q: "Is SEO Still Important With AI Search?",
      a: "Yes. Technical SEO, helpful content, clear website structure and credible business information remain important for organic search and AI-assisted discovery.",
    },
    {
      q: "Should Businesses Optimize for Keywords or Conversational Questions?",
      a: "Both. Keywords help target relevant searches, while conversational content answers detailed customer questions across Google and AI platforms.",
    },
    {
      q: "Can My Website Appear in ChatGPT Search?",
      a: "Yes. ChatGPT Search can reference publicly accessible website content, although visibility and citations are not guaranteed.",
    },
    {
      q: " Does Leads Pro Only Work With Dubai Businesses?",
      a: "No. Leads Pro can also support businesses targeting other UAE markets through SEO, website design, branding, content marketing and digital strategy.",
    },
    {
      q: "Do I Need Separate Website Pages for Every Dubai Area I Serve?",
      a: "Not always. Separate location pages are useful when they contain unique, relevant service information for customers in each area.",
    },
    {
      q: "Which Digital Marketing Service Does My Business Need?",
      a: "That depends on your goals, website performance and competition. An SEO and digital marketing audit can help identify the right starting point.",
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
    primary: { label: "Get Your Free Digital Growth Audit", href: routes.nolink },
    secondary: { label: "Explore the LeadsPro Ecosystem", href: routes.nolink },
  },
};
