import type { Picture } from "./images";

const photo = (name: string, alt: string): Picture => ({
  src: `/images/social/${name}.webp`,
  alt,
  width: 600,
  height: 933,
});

export const socialPhotos = {
  creator: photo("creator", "Creator recording a video at a microphone"),
  presenter: photo("presenter", "Presenter set up for a video shoot"),
  filming: photo("filming", "Filming a short video in a kitchen"),
  phoneCapture: photo("phone-capture", "Recording a clip on a smartphone"),
  cafeHost: photo("cafe-host", "Cafe owner smiling behind the counter"),
  cafeOwner: photo("cafe-owner-apron", "Cafe owner in an apron at her shop"),
  shopOwner: photo("shop-owner", "Shop owner standing in his doorway"),
  cafeCall: photo("cafe-call", "Cafe owner talking at the counter"),
  boutique: photo("boutique", "Store owner checking stock on a tablet"),
  workshop: photo("workshop", "Team presenting a plan at a whiteboard"),
  wireframes: photo("wireframes", "Explaining a layout over printed sketches"),
  logoTablet: photo("logo-tablet", "Designer drawing a logo on a tablet"),
  owner: photo("cafe-owner", "Business owner standing in her shop"),
  teamPlanning: photo("team-planning", "Team reviewing a plan together"),
  officeWindow: photo("office-window", "Person on a phone call by a window"),
  laptopWork: photo("laptop-work", "Business owner working on a laptop"),
  stickyNotes: photo("sticky-notes", "Planning session with sticky notes"),
  sketching: photo("sketching", "Sketching ideas in a notebook"),
};

const p = socialPhotos;

/** Small square crops for the grids inside the phone screens. */
export const socialThumbs: Picture[] = [
  "creator",
  "cafe-owner-apron",
  "workshop",
  "shop-owner",
  "phone-capture",
  "boutique",
  "presenter",
  "cafe-host",
  "wireframes",
  "filming",
  "team-planning",
  "cafe-call",
  "logo-tablet",
  "cafe-owner",
  "sticky-notes",
  "office-window",
  "laptop-work",
  "sketching",
].map((name) => ({ src: `/images/social/t-${name}.webp`, alt: "", width: 240, height: 240 }));

export const reelPhotos: Picture[] = [p.boutique, p.cafeOwner, p.presenter, p.shopOwner, p.creator];

/** Post wall, handed out in order (cards beyond the list reuse it). */
export const wallPhotos: Picture[] = [
  p.owner,
  p.officeWindow,
  p.filming,
  p.logoTablet,
  p.laptopWork,
  p.workshop,
  p.cafeHost,
  p.wireframes,
  p.cafeCall,
  p.teamPlanning,
];

/** Closing block: the middle photo ends up inside the phone. */
export const closingPhotos: Picture[] = [p.cafeCall, p.presenter, p.phoneCapture];

export type ScreenKind = "profile" | "ideas" | "editor" | "tiles" | "feed";

export interface SocialFeature {
  /** Chapter or "What Is Included" item whose copy sits beside the phone. */
  title: RegExp;
  screen: ScreenKind;
  /** Title bar of the phone screen. */
  label: string;
}

export interface SocialPageConfig {
  /** Endings the hero title cycles through after its own. */
  words: [string, string];
  /** Reel captions, left to right. Content types come from the page copy. */
  reels: string[];
  /** The caption being written in the hero phone. */
  caption: string;
  features: SocialFeature[];
}

export const socialPages: Record<string, SocialPageConfig> = {
  "social-media-optimization": {
    words: ["Strategy", "Engagement"],
    reels: [
      "Expert tips",
      "Behind-the-scenes content",
      "Business-owner videos",
      "Service explanations",
      "Educational posts",
    ],
    caption:
      "Teach something useful. Show the people behind the business. Give the audience a reason to remember you.",
    features: [
      { title: /Strategy & Profile Optimization/, screen: "profile", label: "Profile" },
      { title: /Content & Creative Video/, screen: "editor", label: "Edit video" },
      { title: /^Audience Growth/, screen: "tiles", label: "Insights" },
      { title: /^Industries/, screen: "feed", label: "Industries" },
    ],
  },
  "social-media-content-management": {
    words: ["Planning", "Publishing"],
    reels: [
      "Customer questions",
      "Expert tips",
      "Common mistakes",
      "Before-and-after examples",
      "Team or founder insights",
    ],
    caption: "Teach something useful. Show the people behind the expertise. Stay worth following.",
    features: [
      { title: /Content Strategy & Planning/, screen: "ideas", label: "Content themes" },
      { title: /^Short-Form Video/, screen: "editor", label: "Edit video" },
      { title: /^Content Creation & Brand/, screen: "tiles", label: "Brand kit" },
      { title: /^Publishing & Content Management/, screen: "feed", label: "Content calendar" },
    ],
  },
};
