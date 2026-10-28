import { routes } from "@/lib/site";

export interface ClientVideo {
  client: string;
  caption: string;
  text: string;
  // YouTube or Instagram URL. Cards without a url render as posters until the client shares the links.
  url?: string;
  poster?: string;
}

// "Videos we create for client growth", section the client added to the home page doc.
export const videoSection = {
  title: "Videos We Create for Client Growth",
  text: "We film, edit, and post high-performing videos then run strategic ads that drive real results.",
  steps: [
    { name: "We Create", text: "Filming & editing that tells your story" },
    { name: "We Publish", text: "Optimized for TikTok, Reels, Shorts & more" },
    {
      name: "We Promote",
      text: "Targeted ads that put your videos in front of the right audience",
    },
    { name: "You Grow", text: "More reach, leads, and loyal customers" },
  ],
  cta: { label: "Watch our work", href: routes.social },
};

export const clientVideos: ClientVideo[] = [
  {
    client: "McDowell",
    caption: "Idea • Filming • Editing",
    text: "Informative videos that explain the service and build trust before the call.",
  },
  {
    client: "UAE Waterproofers",
    caption: "Filming • Editing",
    text: "Educational content showing homeowners what the work involves.",
  },
  {
    client: "CS Counselling",
    caption: "Creative Direction • Editing",
    text: "Calm, reassuring short videos for people comparing care options.",
  },
  {
    client: "Reels & Shorts",
    caption: "We Publish",
    text: "Optimized for TikTok, Reels, Shorts & more",
  },
  {
    client: "Brand Stories",
    caption: "We Create",
    text: "Filming & editing that tells your story",
  },
  {
    client: "Video Ads",
    caption: "We Promote",
    text: "Targeted ads that put your videos in front of the right audience",
  },
];
