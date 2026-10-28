// Line icons for the industries LeadsPro works with, on a 24px grid, stroked in currentColor.
// Keyed by the industry names in the home data.

const paths: Record<string, string[]> = {
  "Healthcare & Wellness": [
    "M12 20s-7-4.3-7-9.6A4 4 0 0 1 12 7.6a4 4 0 0 1 7 2.8C19 15.7 12 20 12 20z",
    "M7.5 12.5h2.2l1.3-2 2 4 1.3-2h2.2",
  ],
  Construction: [
    "M5 21V5",
    "M2.5 21h5",
    "M3 6h18",
    "M5 4l4 2",
    "M5 9l3-3M5 13l3-3M5 17l3-3",
    "M17 6v5",
    "M14.5 11h5v4h-5z",
  ],
  "Home Services": ["M3.5 11 12 4l8.5 7", "M6 9.5V20h12V9.5", "M10 20v-5h4v5"],
  Legal: [
    "M12 4v16",
    "M8 20h8",
    "M5 7h14",
    "M5 7l-2.5 6a2.5 2.5 0 0 0 5 0L5 7z",
    "M19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7z",
  ],
  "Professional Services": [
    "M4 8h16v11H4z",
    "M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2",
    "M4 13h16",
    "M11 12.5h2v2h-2z",
  ],
  "Real Estate": ["M3 20h18", "M5 20V9l6-4 6 4v11", "M9 20v-5h4v5", "M17 12h3v8"],
  "Financial Services": [
    "M3 9.5 12 4l9 5.5",
    "M4.5 9.5h15",
    "M6 12v5M10 12v5M14 12v5M18 12v5",
    "M3.5 20h17",
  ],
  "SaaS & Technology": [
    "M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 15.5v-9z",
    "M9 20h6M12 17v3",
    "m9.5 9-2 2 2 2M14.5 9l2 2-2 2",
  ],
  Ecommerce: [
    "M3 4h2.5l2.2 10.5h10.6L20.5 7H6.4",
    "M9 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM17 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  ],
  Hospitality: ["M3 18h18", "M5 18a7 7 0 0 1 14 0", "M12 9V7.5", "M10.5 7.5h3"],
  Automotive: [
    "M4 16v-3.5l2-5h12l2 5V16",
    "M3 16h18v2.5H3z",
    "M4.5 12.5h15",
    "M7.5 18.5v1.5M16.5 18.5v1.5",
    "M7 14.5h1M16 14.5h1",
  ],
  Restaurants: [
    "M7 3v6a2 2 0 0 0 4 0V3",
    "M9 3v18",
    "M16.5 3c-1.7 1.3-2.5 3.6-2.5 6.5V13h3V3z",
    "M17 13v8",
  ],
  "Beauty & Wellness": [
    "M12 20c-3.5-1.5-6-4.5-6-8.5 2.6.3 4.6 1.6 6 3.6 1.4-2 3.4-3.3 6-3.6 0 4-2.5 7-6 8.5z",
    "M12 15.1V9",
    "M12 9c-1.4-1.3-1.4-3.7 0-5 1.4 1.3 1.4 3.7 0 5z",
  ],
  "Multi-Location Businesses": [
    "M7 13s-4-3.4-4-6.6a4 4 0 0 1 8 0C11 9.6 7 13 7 13z",
    "M17 21s-4-3.4-4-6.6a4 4 0 0 1 8 0c0 3.2-4 6.6-4 6.6z",
    "M7 6.5h.01M17 14.5h.01",
    "M9.5 17.5H5",
  ],
};

export function SectorIcon({ name, className }: { name: string; className?: string }) {
  const d = paths[name] ?? paths["Professional Services"];
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
