export const site = {
  name: "Goodfaith",
  legalName: "Goodfaith Branding & Digital Marketing",
  url: "https://www.goodfaithbranding.ca",
  email: "hello@goodfaithbranding.ca",
  city: "Thorold",
  region: "Niagara Region, Ontario",
  founder: "Lovish Tayal",
  description:
    "Goodfaith is a Niagara Region digital marketing agency providing SEO, AI Search Optimization, Local SEO, web design, branding, content and digital growth strategy.",
  social: {
    linkedin: "https://www.linkedin.com/company/goodfaithbranding",
    instagram: "https://www.instagram.com/goodfaithbranding",
    facebook: "https://www.facebook.com/goodfaithbranding",
  },
};

export const routes = {
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

export const niagaraCommunities = [
  "St. Catharines",
  "Niagara Falls",
  "Thorold",
  "Welland",
  "Niagara-on-the-Lake",
  "Fort Erie",
  "Port Colborne",
  "Pelham",
  "Lincoln",
  "Grimsby",
  "West Lincoln",
  "Wainfleet",
];
