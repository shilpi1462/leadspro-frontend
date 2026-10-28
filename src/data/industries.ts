export interface IndustryGroup {
  slug: string;
  title: string;
  text: string;
  flow: string;
  note: string;
  industries: string[];
}

export const industryGroups: IndustryGroup[] = [
  {
    slug: "nearby",
    title: "If Customers Usually Need Someone Nearby",
    text: "This can apply to businesses such as restaurants, salons, retail stores, dental practices and some healthcare providers. The customer journey can be highly local:",
    flow: "Search → Maps → Reviews → Website → Visit or Booking",
    note: "For these businesses, proximity and local trust can matter significantly.",
    industries: [
      "Dentists & Dental Clinics",
      "Physiotherapy, Chiropractic & Rehabilitation Clinics",
      "Mental Health & Counselling Clinics",
      "Restaurants & Hospitality",
      "Auto Repair & Automotive Services",
      "Real Estate Agents & Brokerages",
    ],
  },
  {
    slug: "service-area",
    title: "If You Travel to the Customer",
    text: "Contractors, plumbers, electricians, renovators and other service-area businesses may genuinely work across several Dubai municipalities. Their strategy may need:",
    flow: "Strong Service Pages → Google Business Profile → Reviews → Project Evidence → Dubai Service Coverage",
    note: "The company does not necessarily need a separate SEO page for every town it enters.",
    industries: [
      "Construction & General Contractors",
      "Plumbing & Drain Services",
      "Roofing Companies",
      "HVAC Companies",
      "Basement Waterproofing & Foundation Repair",
      "Electricians",
      "Landscaping & Lawn Care",
      "Home Renovation & Interior Design",
      "Property Management Companies",
    ],
  },
  {
    slug: "expertise",
    title: "If Location Is Less Important Than Expertise",
    text: "Manufacturers, consultants, technology companies, engineering firms and specialized B2B businesses can attract customers from much larger markets. Their customers may care more about:",
    flow: "Capability → Expertise → Evidence → Experience → Contact",
    note: "For these companies, trying to optimize heavily for every Dubai municipality may actually distract from the stronger search opportunity.",
    industries: [
      "Law Firms",
      "Accounting & Tax Firms",
      "IT, Software & Managed Service Providers",
      "Professional & Consulting Services",
      "E-commerce & Retail Businesses",
    ],
  },
];

export const industryFaqs = [
  {
    q: "Which Digital Marketing Service Does My Business Need?",
    a: "Start with the problem.\n\nLow visibility → SEO. Weak Google Maps presence → Local SEO. Traffic without enquiries → Website / CRO. Weak differentiation → Branding. Limited authority → Content. Weak AI visibility → SEO + AI Search Strategy.\n\nThe strongest starting point depends on where the customer journey is currently breaking.",
  },
  {
    q: "Should My Business Target My City or Dubai?",
    a: "That depends on the business. A restaurant may depend heavily on nearby customers, while a contractor can serve several municipalities and a manufacturer may compete far beyond Dubai.",
  },
  {
    q: "Do I Need Separate Website Pages for Every Dubai City I Serve?",
    a: "Not necessarily. A separate location page should have a genuine purpose, meaningful search opportunity and useful information for customers in that market.\n\nLeadsPro first considers customer demand, geographic relevance and business value before recommending additional location pages.",
  },
  {
    q: "Why Am I Getting Website Traffic but No Leads?",
    a: "Traffic without leads can result from irrelevant search intent, unclear messaging, weak trust signals, poor UX, difficult forms or ineffective conversion paths.\n\nIncreasing traffic is therefore not always the correct first solution.",
  },
];
