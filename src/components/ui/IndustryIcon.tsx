export type IndustryIconName = "water" | "build" | "care";

// Line drawings for the industries in the case studies. Every stroke has pathLength 1, so a
// stylesheet can draw them on with stroke-dashoffset.
const drawings: Record<IndustryIconName, string[]> = {
  // A house with water inside it, on wet ground: waterproofing, drainage and plumbing.
  water: [
    "M7 22.5L24 9l17 13.5",
    "M12 19v19h24V19",
    "M24 21.5c-4.2 5-6.2 8.1-6.2 10.6a6.2 6.2 0 0012.4 0c0-2.5-2-5.6-6.2-10.6z",
    "M5 43c2.2-2 4.4-2 6.6 0s4.4 2 6.6 0 4.4-2 6.6 0 4.4 2 6.6 0 4.4-2 6.6 0 4.4 2 6.6 0",
  ],
  // A tower crane lifting a load: construction.
  build: [
    "M14 43V9",
    "M9 43h14",
    "M6 11h36",
    "M14 9l6 2M14 9L8 11",
    "M14 16l5-5M14 23l5-5M14 30l5-5M14 37l5-5",
    "M34 11v12",
    "M28 23h12v9H28z",
    "M6 11v5h5v-5",
  ],
  // A shield with a medical cross and a pulse: healthcare.
  care: [
    "M24 5l15 5.5v11.8c0 9.4-6.3 16-15 20.2C15.3 38.3 9 31.7 9 22.3V10.5z",
    "M24 15v13M17.5 21.5h13",
    "M13 34h6l2.5-4 3 7 2.5-5H35",
  ],
};

export function IndustryIcon({ name, className }: { name: IndustryIconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      {drawings[name].map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ ["--i" as string]: i }}
        />
      ))}
    </svg>
  );
}
