// Line glyphs for the UI cut-outs, drawn on a 24px grid and stroked in currentColor.

const paths = {
  search: "M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm5-2 4.5 4.5",
  phone:
    "M5 4h3.5l1.6 4.2-2.2 1.5a11 11 0 0 0 6.4 6.4l1.5-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  route:
    "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7",
  globe:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-9-9h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z",
  check: "m5 12.5 4.2 4.2L19 7",
  chart: "M4 20V10m5.3 10V4m5.4 16v-7M20 20V8",
  trend: "m3 17 6-6 4 4 8-8m0 0h-5m5 0v5",
  calendar:
    "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7zm0 4h16M9 3v4m6-4v4",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z",
  comment: "M4 18.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8.5L4 18.5z",
  share: "M12 4v11m0-11L8 8m4-4 4 4M5 13v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5",
  bookmark: "M7 4h10v16l-5-3.5L7 20V4z",
  play: "M8 5.5v13l10.5-6.5L8 5.5z",
  doc: "M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 0v5h5M9 13h6m-6 4h6",
  code: "m8.5 8-4 4 4 4m7-8 4 4-4 4m-2.5-10-2 12",
  palette:
    "M12 21a9 9 0 1 1 9-9c0 2.2-1.8 3-3.5 3H16a2 2 0 0 0-1.4 3.4c.6.6.2 2.6-2.6 2.6zM7.5 12.5h.01M9.5 8h.01M14.5 8h.01M17 11.5h.01",
  spark:
    "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zm6.5 11 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z",
  bolt: "M13 3 5 13.5h6L10 21l8-10.5h-6L13 3z",
  shield: "M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3zm-3 9.5 2.2 2.2L15.5 10",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9a7 7 0 0 1 14 0",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  exit: "M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M9 8l-4 4 4 4m-4-4h11",
  target:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0-3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  layers: "M12 3 3 8l9 5 9-5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm-6-3a6 6 0 0 0 12 0m-6 6v3",
} as const;

export type Glyph = keyof typeof paths;

export function G({ name, className }: { name: Glyph; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8z"
      />
    </svg>
  );
}

export function Stars({ className, n = 5 }: { className?: string; n?: number }) {
  return (
    <span className={className}>
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}
