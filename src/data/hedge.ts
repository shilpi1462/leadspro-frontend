import { routes } from "@/lib/site";

// "Introducing the H-EDGE" block from the client's current home page.
export const humanEdge = {
  eyebrow: "Introducing The H-EDGE™",
  title: "The Human Edge™",
  lead: "Technology keeps evolving. Human connection never goes out of style.",
  text: [
    "The H-EDGE™ combines human-centred digital marketing, AI, SEO data, customer psychology, creativity, emotional intelligence and ethical human judgment.",
    "Because the future of marketing is not AI. It is AI guided by people who understand people.",
  ],
  cta: { label: "Learn About The H-EDGE™", href: routes.hedge },
  logo: {
    src: "/images/h-edge-logo.webp",
    alt: "The H-EDGE logo representing the Human Edge",
    width: 640,
    height: 640,
  },
};
