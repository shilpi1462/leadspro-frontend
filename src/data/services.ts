export interface ServiceCategory {
  slug: string;
  name: string;
  short: string;
  blurb: string;
  /** Light accent: chips, bands and buttons, always with ink text on it. */
  accent: string;
  /** Dark shade of the same hue that stays readable as text or icons on white. */
  deep: string;
  /** Four-stop wash behind the category's panels on service pages. Every category shares the
      brand's evergreen and only the pale end shifts. */
  flow: [string, string, string, string];
}

// The eight core service categories, in the order the client's design doc lists them.
export const serviceCategories: ServiceCategory[] = [
  {
    slug: "seo-ai-search-optimization",
    accent: "#d9f55c",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#2e7a5f", "#dbead9", "#f3ecd9"],
    name: "SEO & AI Search Optimization",
    short: "SEO & AI Search",
    blurb:
      "Build stronger visibility across traditional search while preparing your digital presence for increasingly conversational and AI-assisted discovery.",
  },
  {
    slug: "local-seo",
    accent: "#dcefa6",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#2b7462", "#d7e9e2", "#eff0e3"],
    name: "Local SEO",
    short: "Local SEO",
    blurb:
      "Strengthen visibility when customers search for businesses and services within the markets you genuinely serve.",
  },
  {
    slug: "google-business-profile",
    accent: "#e4efb3",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#357a5a", "#e2ead5", "#f4ebd8"],
    name: "Google Business Profile",
    short: "Google Business Profile",
    blurb:
      "Strengthen your presence across Google Search and Maps while improving relevance, accuracy and customer actions.",
  },
  {
    slug: "website-design",
    accent: "#d5edb6",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#2f7563", "#dce8df", "#f2ede1"],
    name: "Website Design",
    short: "Website Design",
    blurb:
      "Create a professional digital experience around your customers, services and business goals.",
  },
  {
    slug: "web-development",
    accent: "#cfeebe",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#2a7868", "#d5eae2", "#edefe1"],
    name: "Web Development",
    short: "Web Development",
    blurb: "Turn strategy and design into fast, responsive, scalable and maintainable websites.",
  },
  {
    slug: "branding",
    accent: "#e6f0a8",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#3a7a56", "#e5ebd3", "#f5ecd6"],
    name: "Branding & Visual Identity",
    short: "Branding",
    blurb: "Build a clearer brand that customers can recognize, understand and trust.",
  },
  {
    slug: "social-media",
    accent: "#dbecc0",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#317360", "#dfe8dc", "#f3ece2"],
    name: "Social Media",
    short: "Social Media",
    blurb:
      "Build a consistent digital presence across relevant social platforms and communicate expertise beyond the website.",
  },
  {
    slug: "content-marketing",
    accent: "#e2edbf",
    deep: "#0f4c3a",
    flow: ["#0c3327", "#367758", "#e2e9d5", "#f2ecda"],
    name: "Content Marketing",
    short: "Content Marketing",
    blurb:
      "Develop service pages, resources and expertise-led content around genuine customer needs and search intent.",
  },
];
