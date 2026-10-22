export const site = {
  name: "LeadsPro",
  legalName: "LeadsPro Branding & Digital Marketing",
  url: "https://www.leadspro.ae",
  email: "hello@leadspro.ae",
  city: "Dubai",
  region: "Dubai Marina, Downtown Dubai, Business Bay, Jumeirah",
  founder: "Sachin Gupta",
  description:
    "Leads Pro is a Dubai Based digital marketing agency providing SEO, AI Search Optimization, Local SEO, web design, branding, content and digital growth strategy.",
  social: {
    linkedin: "https://www.linkedin.com/company/leadsprodubai",
    instagram: "https://www.instagram.com/leadsprodubai",
    facebook: "https://www.facebook.com/leadsprodubai",
  },
};

export const routes = {
  nolink: "#",
  home: "/",
  service: "/services/seo-strategy-audits/",
  industry: "/industries/",
  blog: "/blog/",
  portfolio: "/portfolio/",
  hedge: "/h-edge/",
  aiHub: "/ai-hub/",
  social: "/services/social-media-content-management/",
  ecosystem: "/#ecosystem",
  about: "/#about",
  audit: `mailto:${site.email}?subject=${encodeURIComponent("Free Digital Growth Audit")}`,
  contact: `mailto:${site.email}`,
};

// Service pages referenced from designed sections (home, industries, footer)
export const services = {
  nolink: "#",
  seo: "/services/seo-strategy-audits/",
  technicalSeo: "/services/technical-seo/",
  aiSeo: "/services/ai-seo-aio-aeo-geo/",
  localSeo: "/services/local-seo/",
  gbp: "/services/google-business-profile-optimization/",
  websiteDesign: "/services/website-design/",
  redesign: "/services/website-redesign-cro/",
  webDevelopment: "/services/web-development/",
  branding: "/services/branding/",
  socialMedia: "/services/social-media-optimization/",
  contentMarketing: "/services/content-marketing/",
};

export const nav = [
  { name: "Services", href: routes.service },
  { name: "Industries", href: routes.industry },
  { name: "Portfolio", href: routes.portfolio },
  { name: "Blog", href: routes.blog },
  { name: "AI Hub", href: routes.aiHub },
  { name: "H-EDGE", href: routes.hedge },
];

export const dubaiCommunities = [
  "Dubai Marina",
  "Downtown Dubai",
  "Business Bay",
  "Jumeirah",
  "JLT",
  "Deira",
  "Al Barsha",
  "other Dubai locations",
];
