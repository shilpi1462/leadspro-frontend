import { Caveat_Brush, Poppins } from "next/font/google";

// Display and script faces for the inner pages.
export const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const script = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
  // decorative only, so it should not compete with the hero for bandwidth
  preload: false,
});

export const innerFonts = `${display.variable} ${script.variable}`;
