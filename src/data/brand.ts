import type { Picture } from "./images";
import { socialPhotos } from "./social";

const photo = (name: string, alt: string): Picture => ({
  src: `/images/brand/${name}.webp`,
  alt,
  width: 600,
  height: 933,
});
const thumb = (dir: string, name: string): Picture => ({
  src: `/images/${dir}/t-${name}.webp`,
  alt: "",
  width: 240,
  height: 240,
});

export const brandPhotos = {
  sketchConcepts: photo("sketch-concepts", "Designer sketching brand concepts"),
  identityCards: photo("identity-cards", "Brand identity cards laid out on a table"),
  layoutSketches: photo("layout-sketches", "Hand-drawn layout sketches in colour"),
  swatches: photo("swatches", "Colour swatches beside a drawing tablet"),
  notebook: photo("notebook", "Sketching ideas in a spiral notebook"),
};

const b = brandPhotos;
const s = socialPhotos;

/** Hero cards, left to right; the third slot is the brand card, so three photos. */
export const brandHeroPhotos: Picture[] = [s.logoTablet, b.identityCards, b.swatches];

/** "What is" block: the tall photo and the offset one. */
export const brandMissionPhotos: Picture[] = [b.sketchConcepts, s.workshop];

/** One per stacked service card. */
export const brandStackPhotos: Picture[] = [
  s.teamPlanning,
  b.notebook,
  s.wireframes,
  b.layoutSketches,
  s.stickyNotes,
];

export const brandCasePhoto: Picture = s.cafeOwner;
export const brandComparePhoto: Picture = b.identityCards;
export const brandStatsPhoto: Picture = s.workshop;

/** Squares orbiting the closing call to action (twelve slots). */
export const brandRingThumbs: Picture[] = [
  thumb("brand", "sketch-concepts"),
  thumb("social", "logo-tablet"),
  thumb("brand", "swatches"),
  thumb("social", "workshop"),
  thumb("brand", "identity-cards"),
  thumb("social", "cafe-owner"),
  thumb("brand", "notebook"),
  thumb("social", "wireframes"),
  thumb("brand", "layout-sketches"),
  thumb("social", "team-planning"),
  thumb("social", "sticky-notes"),
  thumb("social", "shop-owner"),
];

export interface BrandPageConfig {
  /** Chapters after "What Is Included" that are also included services. */
  stackExtra?: RegExp[];
}

export const brandPages: Record<string, BrandPageConfig> = {
  branding: {},
  "brand-strategy-positioning": {},
  "logo-visual-identity": { stackExtra: [/^Basic Brand Guidelines/] },
};
