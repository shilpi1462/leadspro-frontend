import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";

export const tight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-tight",
  display: "swap",
});

export const clash = localFont({
  src: [
    { path: "./fonts/ClashDisplay-Medium.woff2", weight: "500" },
    { path: "./fonts/ClashDisplay-Semibold.woff2", weight: "600" },
  ],
  variable: "--font-clash",
  display: "swap",
});
