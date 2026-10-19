export interface Picture {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const wall = (name: string, alt: string): Picture => ({
  src: `/images/wall/${name}.webp`,
  alt,
  width: 800,
  height: 1066,
});
const ring = (name: string, alt: string): Picture => ({
  src: `/images/ring/${name}.webp`,
  alt,
  width: 480,
  height: 480,
});
const work = (name: string, alt: string): Picture => ({
  src: `/images/work/${name}.webp`,
  alt,
  width: 1145,
  height: 1374,
});
const service = (name: string, alt: string): Picture => ({
  src: `/images/services/${name}.webp`,
  alt,
  width: 720,
  height: 480,
});
const backdrop = (name: string): Picture => ({
  src: `/images/backdrop/${name}.webp`,
  alt: "",
  width: 960,
  height: 600,
});
const svc = (name: string, alt: string, width: number, height: number): Picture => ({
  src: `/images/svc/${name}.webp`,
  alt,
  width,
  height,
});
const thumb = (name: string): Picture => ({
  src: `/images/services/thumbs/${name}-2.webp`,
  alt: "",
  width: 200,
  height: 140,
});

export const wallPictures: Picture[] = [
  wall("team-planning", "Team reviewing a marketing plan together"),
  wall("laptop-work", "Business owner working on a laptop"),
  wall("office-window", "Person on a phone call by an office window"),
  wall("sketching", "Designer sketching website layouts in a notebook"),
  wall("cafe-owner", "Café owner standing in her shop"),
  wall("sticky-notes", "Planning session with sticky notes"),
];

export const ringPictures: Picture[] = [
  ring("brand-sign", "Bold brand signage"),
  ring("laptop-desk", "Website open on a laptop"),
  ring("code", "Website code on a screen"),
  ring("analytics", "Search analytics dashboard"),
  ring("maps-phone", "Navigation app on a phone"),
  ring("open-sign", "Open sign in a shop window"),
  ring("notebook-coffee", "Content planning notebook and coffee"),
  ring("social-apps", "Social media apps on a phone"),
  ring("ai-assistant", "AI assistant on a phone screen"),
  ring("handshake", "Handshake closing a deal"),
  ring("whiteboard", "Strategy sketched on a whiteboard"),
  ring("agreement", "Two people agreeing on a plan"),
];

// Soft, low-resolution versions of the wall photos for the dark service header.
export const backdropPictures: Picture[] = [
  "team-planning",
  "laptop-work",
  "office-window",
  "sketching",
  "cafe-owner",
  "sticky-notes",
].map(backdrop);

// Small crops of each category's second photo, for the hero dock.
export const serviceThumbs: Record<string, Picture> = Object.fromEntries(
  [
    "seo",
    "local-seo",
    "gbp",
    "website-design",
    "web-development",
    "branding",
    "social-media",
    "content-marketing",
  ].map((n, i) => [
    [
      "seo-ai-search-optimization",
      "local-seo",
      "google-business-profile",
      "website-design",
      "web-development",
      "branding",
      "social-media",
      "content-marketing",
    ][i],
    thumb(n),
  ]),
);

export const workPictures: Record<string, Picture> = {
  "waterproofing-local-service-growth": work(
    "waterproofing",
    "Landing page design for a waterproofing and home services company",
  ),
  "clinic-website-trust-refresh": work(
    "clinic-care",
    "Landing page design for a healthcare clinic",
  ),
  "restaurant-brand-local-search": work(
    "restaurant-nearby",
    "Local search landing page design for a restaurant",
  ),
};

export const servicePictures: Record<string, [Picture, Picture]> = {
  "seo-ai-search-optimization": [
    service("seo-1", "Search results on a laptop"),
    service("seo-2", "Magnifying glass on a keyboard"),
  ],
  "local-seo": [
    service("local-seo-1", "Pins marking service areas on a map"),
    service("local-seo-2", "Map with location pins"),
  ],
  "google-business-profile": [
    service("gbp-1", "Google app on a phone"),
    service("gbp-2", "Google search on a phone"),
  ],
  "website-design": [
    service("website-design-1", "Designer's desk with laptop and monitor"),
    service("website-design-2", "Design workstation"),
  ],
  "web-development": [
    service("web-development-1", "Front-end code"),
    service("web-development-2", "Application code on a monitor"),
  ],
  branding: [
    service("branding-1", "Blank notebook and pen"),
    service("branding-2", "Brand brochure mockup"),
  ],
  "social-media": [
    service("social-media-1", "Social apps on a phone"),
    service("social-media-2", "Social media platform logos"),
  ],
  "content-marketing": [
    service("content-marketing-1", "Laptop beside a marketing book"),
    service("content-marketing-2", "Writing notes over coffee"),
  ],
};

// Four photos per category for the service pages (Unsplash, free for commercial use).
export const serviceGallery: Record<string, Picture[]> = {
  "seo-ai-search-optimization": [
    svc(
      "seo-ai-search-optimization-1",
      "Team reviewing search performance on a presentation screen",
      1400,
      1050,
    ),
    svc("seo-ai-search-optimization-2", "Analytics dashboard open on a laptop", 1400, 998),
    svc("seo-ai-search-optimization-3", "Reviewing traffic reports beside a laptop", 1400, 935),
    svc("seo-ai-search-optimization-4", "Strategy discussion around a laptop", 1400, 934),
  ],
  "local-seo": [
    svc("local-seo-1", "Two cafe owners standing in their shop", 1400, 788),
    svc("local-seo-2", "Shop owner standing outside his store", 1400, 985),
    svc("local-seo-3", "Directions to a local business on a phone map", 1400, 1750),
    svc("local-seo-4", "Open sign on a local shop door", 1400, 934),
  ],
  "google-business-profile": [
    svc("google-business-profile-1", "Business location open in a maps app", 1400, 931),
    svc("google-business-profile-2", "Cafe owner taking a call at the counter", 1400, 977),
    svc("google-business-profile-3", "Store owner checking stock on a tablet", 1400, 788),
    svc("google-business-profile-4", "Google search open on a smartphone", 1400, 934),
  ],
  "website-design": [
    svc("website-design-1", "Designer planning website wireframes", 1400, 933),
    svc("website-design-2", "Hand-drawn website layout sketches", 1400, 934),
    svc(
      "website-design-3",
      "Designer working with a drawing tablet and colour swatches",
      1400,
      934,
    ),
    svc("website-design-4", "Designer reviewing a website on a desktop screen", 1400, 934),
  ],
  "web-development": [
    svc("web-development-1", "Developers working on code at their monitors", 1400, 934),
    svc("web-development-2", "Developer typing code on a laptop", 1400, 1750),
    svc("web-development-3", "Developer coding in a shared workspace", 1400, 2102),
    svc("web-development-4", "Website code open on a laptop", 1400, 934),
  ],
  branding: [
    svc("branding-1", "Designer drawing a logo on a tablet", 1400, 2100),
    svc("branding-2", "Designer sketching brand concepts", 1400, 934),
    svc("branding-3", "Printed business cards with a new identity", 1400, 934),
    svc("branding-4", "Brand identity cards laid out on a table", 1400, 934),
  ],
  "social-media": [
    svc("social-media-1", "Filming short-form video in a kitchen", 1400, 934),
    svc("social-media-2", "Creator recording content in a studio", 1400, 934),
    svc("social-media-3", "Presenter set up for a video shoot", 1400, 2100),
    svc("social-media-4", "Capturing content on a smartphone", 1400, 2100),
  ],
  "content-marketing": [
    svc("content-marketing-1", "Laptop, notebook and coffee on a writing desk", 1400, 1050),
    svc("content-marketing-2", "Writing on a laptop at a wooden table", 1400, 934),
    svc("content-marketing-3", "Drafting content on a laptop", 1400, 934),
    svc("content-marketing-4", "Planning content in a notebook", 1400, 934),
  ],
};

// Cover photos for blog cards, keyed by post slug; posts without one fall back to the wall set.
export const postPictures: Record<string, Picture> = {
  "google-top-ranking-local-businesses-ai-recommendations":
    serviceGallery["seo-ai-search-optimization"][1],
  "seo-lessons-niagara-waterproofing-company": serviceGallery["seo-ai-search-optimization"][2],
};
