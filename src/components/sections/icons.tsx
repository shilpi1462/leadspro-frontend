import type { ReactNode } from "react";

interface IconProps {
  className?: string;
}

const Line = ({ className, children }: IconProps & { children: ReactNode }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const TickCircle = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M7.5 12.3l3 3 6-6.2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TickSolid = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="11" fill="currentColor" />
    <path
      d="M7.5 12.3l3 3 6-6.2"
      fill="none"
      stroke="var(--tick-mark, #fff)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Play = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 12 14" aria-hidden="true">
    <path d="M0 0l12 7-12 7z" fill="currentColor" />
  </svg>
);

export const ArrowUp = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12.5 5.5L19 12l-6.5 6.5" />
  </svg>
);

/** The loose hand-drawn arrow that points from a script note to what it is about. */
export const DoodleArrow = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 120 70"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 10c30 2 58 14 78 34 6 6 10 12 13 19" />
    <path d="M83 57l12 8 3-14" strokeLinejoin="round" />
  </svg>
);

export const DashedSwoop = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 260 110"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeDasharray="7 8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 70c26 4 60 2 78-18 12-14 8-40-10-44-22-6-34 26-14 44 26 24 76 20 110-6 22-17 40-34 70-36" />
    <path d="M238 4l14 6-12 10" strokeDasharray="none" strokeLinejoin="round" />
  </svg>
);

const set = {
  search: (
    <>
      <circle cx="14" cy="14" r="8.5" />
      <path d="M20.5 20.5L27 27" />
    </>
  ),
  audit: (
    <>
      <path d="M9 4h10l5 5v11" />
      <path d="M19 4v5h5M9 4v22h7" />
      <circle cx="21.5" cy="22" r="4" />
      <path d="M24.5 25l3 3M12 12h5M12 16h4" />
    </>
  ),
  gear: (
    <>
      <circle cx="16" cy="16" r="4" />
      <path d="M16 3.5v3.2M16 25.3v3.2M28.5 16h-3.2M6.7 16H3.5M24.8 7.2l-2.3 2.3M9.5 22.5l-2.3 2.3M24.8 24.8l-2.3-2.3M9.5 9.5L7.2 7.2" />
      <circle cx="16" cy="16" r="8.8" />
    </>
  ),
  chart: (
    <>
      <path d="M5 27h22M8 22v-5M13 22v-9M18 22v-6M23 22V10" />
      <path d="M6 13l6-5 5 3 9-6" />
      <path d="M22 5h4v4" />
    </>
  ),
  pin: (
    <>
      <path d="M16 28s9-8.3 9-15a9 9 0 10-18 0c0 6.7 9 15 9 15z" />
      <circle cx="16" cy="13" r="3.2" />
    </>
  ),
  map: (
    <>
      <path d="M4 8l7-3 10 3 7-3v19l-7 3-10-3-7 3z" />
      <path d="M11 5v19M21 8v19" />
    </>
  ),
  star: (
    <path d="M16 4l3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1L16 22.6l-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2z" />
  ),
  link: (
    <>
      <path d="M13.5 18.5a5 5 0 007 0l4-4a5 5 0 00-7-7l-1.5 1.5" />
      <path d="M18.5 13.5a5 5 0 00-7 0l-4 4a5 5 0 007 7l1.5-1.5" />
    </>
  ),
  laptop: (
    <>
      <rect x="6" y="7" width="20" height="13" rx="1.5" />
      <path d="M3 25h26M13 22.5h6" />
    </>
  ),
  code: (
    <>
      <path d="M11 10l-6 6 6 6M21 10l6 6-6 6M18 7l-4 18" />
    </>
  ),
  doc: (
    <>
      <path d="M8 4h11l5 5v19H8z" />
      <path d="M19 4v5h5M12 14h8M12 18h8M12 22h5" />
    </>
  ),
  spark: (
    <>
      <path d="M16 4c1 6 3 8 9 9-6 1-8 3-9 9-1-6-3-8-9-9 6-1 8-3 9-9z" />
      <path d="M25 21c.4 2.4 1.2 3.2 3.5 3.5-2.3.4-3.1 1.2-3.5 3.5-.4-2.3-1.2-3.1-3.5-3.5 2.3-.3 3.1-1.1 3.5-3.5z" />
    </>
  ),
  chat: (
    <>
      <path d="M5 8a3 3 0 013-3h16a3 3 0 013 3v10a3 3 0 01-3 3H13l-6 5v-5H8a3 3 0 01-3-3z" />
      <path d="M11 12h10M11 16h6" />
    </>
  ),
  target: (
    <>
      <circle cx="15" cy="17" r="10" />
      <circle cx="15" cy="17" r="5.5" />
      <circle cx="15" cy="17" r="1.2" />
      <path d="M15 17l11-11M22 6h4v4" />
    </>
  ),
  shield: (
    <>
      <path d="M16 4l10 4v7c0 6.5-4.3 11-10 13-5.7-2-10-6.5-10-13V8z" />
      <path d="M11.5 16l3.2 3.2 6-6.4" />
    </>
  ),
  bolt: <path d="M18 3L7 18h8l-2 11 11-15h-8z" />,
  briefcase: (
    <>
      <rect x="4" y="10" width="24" height="16" rx="3" />
      <path d="M12 10V7.5A1.5 1.5 0 0 1 13.5 6h5A1.5 1.5 0 0 1 20 7.5V10" />
      <path d="M4 17h24M14 17v2.5h4V17" />
    </>
  ),
  badge: (
    <>
      <circle cx="16" cy="12.5" r="7.5" />
      <path d="M12.6 12.6l2.4 2.4 4.4-4.6" />
      <path d="M11 18.6L9 28l7-3.4 7 3.4-2-9.4" />
    </>
  ),
  layers: (
    <>
      <path d="M16 4l12 6.5-12 6.5-12-6.5z" />
      <path d="M4 16l12 6.5L28 16" />
      <path d="M4 21.5L16 28l12-6.5" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="11" r="4" />
      <path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <circle cx="22.5" cy="12.5" r="3.2" />
      <path d="M20.5 18.6c4 .1 7.5 3.3 7.5 7.4" />
    </>
  ),
  store: (
    <>
      <path d="M5 12l2-7h18l2 7" />
      <path d="M5 12c0 2 1.6 3.5 3.6 3.5S12.2 14 12.2 12c0 2 1.6 3.5 3.6 3.5S19.4 14 19.4 12c0 2 1.6 3.5 3.6 3.5S27 14 27 12" />
      <path d="M7 15.5V27h18V15.5M13 27v-6h6v6" />
    </>
  ),
  pen: (
    <>
      <path d="M20 5l7 7-14 14H6v-7z" />
      <path d="M17 8l7 7" />
    </>
  ),
  refresh: (
    <>
      <path d="M26 12a10 10 0 00-18.5-3M6 20a10 10 0 0018.5 3" />
      <path d="M7 4v5h5M25 28v-5h-5" />
    </>
  ),
  cart: (
    <>
      <path d="M4 5h4l3 14h14l3-10H10" />
      <circle cx="13" cy="25" r="1.8" />
      <circle cx="23" cy="25" r="1.8" />
    </>
  ),
  camera: (
    <>
      <rect x="4" y="9" width="24" height="17" rx="3" />
      <path d="M11 9l2-4h6l2 4" />
      <circle cx="16" cy="17.5" r="4.5" />
    </>
  ),
} as const;

export type IconName = keyof typeof set;

// Picks a glyph from the words in a title, so a card about "Reviews & Local Reputation"
// gets the star and one about "Technical SEO" gets the gear without anyone tagging them.
const rules: [RegExp, IconName][] = [
  [/audit|research|analy|assessment|diagnos/i, "audit"],
  [/review|reputation|rating|trust/i, "star"],
  [/map|location|local|area|city|region|gbp|business profile/i, "pin"],
  [/link|authority|citation|backlink|reference|off-page/i, "link"],
  [/measure|report|track|analytics|performance|result|growth|conversion|cro/i, "chart"],
  [/technical|speed|crawl|index|schema|structured|maintenance|support|security/i, "gear"],
  [/code|develop|wordpress|build|integration/i, "code"],
  [/design|website|page|ux|layout|landing|redesign/i, "laptop"],
  [/content|blog|writing|copy|article|editorial/i, "doc"],
  [/brand|identity|logo|visual|position/i, "pen"],
  [/social|community|engage|conversation/i, "chat"],
  [/ai|chatgpt|geo|aeo|aio|generative|llm|answer/i, "spark"],
  [/image|photo|video|visual search/i, "camera"],
  [/ecommerce|shop|store|product|checkout/i, "cart"],
  [/recover|reinstat|suspension|restore/i, "refresh"],
  [/keyword|search|query|seo/i, "search"],
  [/customer|audience|people|team/i, "users"],
  [/strategy|plan|goal|priorit|focus/i, "target"],
  // the E-E-A-T words, so its pillars stop sharing one glyph
  [/e-e-a-t/i, "shield"],
  [/experience|first-hand|hands-on/i, "briefcase"],
  [/expert|credential|qualif/i, "badge"],
  [/validation|endorse/i, "star"],
  [/evidence|proof/i, "audit"],
  [/structure|ecosystem|topic|hierarch/i, "layers"],
];

export function iconFor(text: string, fallback: IconName = "target"): IconName {
  return rules.find(([re]) => re.test(text))?.[1] ?? fallback;
}

export function Icon({ name, className }: IconProps & { name: IconName }) {
  return <Line className={className}>{set[name]}</Line>;
}
