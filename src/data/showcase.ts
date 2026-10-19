export type HeroPhone = "ai" | "map" | "gbp";

/** Reported figures from home.proof.cases: organic impressions and clicks, profile calls. */
export type ResultKey = "impressions" | "clicks" | "calls" | "month";

export interface ShowcasePage {
  phone: HeroPhone;
  results: ResultKey[];
}

export const showcasePages: Record<string, ShowcasePage> = {
  "seo-strategy-audits": { phone: "ai", results: ["impressions", "clicks", "calls", "month"] },
  "local-seo": { phone: "map", results: ["calls", "month", "impressions", "clicks"] },
  "google-business-profile-optimization": {
    phone: "gbp",
    results: ["calls", "month", "impressions", "clicks"],
  },
};
