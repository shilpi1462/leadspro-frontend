import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBlock } from "@/components/layout/CtaBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Dubai Region`,
    template: `%s`,
  },
  description: site.description,
  applicationName: site.name,
  robots: { index: false, follow: false },
  icons: { icon: "/favicon.webp" },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#localbusiness`,
  name: "LeadsPro.ae",
  image: "https://www.leadspro.ae/images/services/content-marketing-1.webp",
  url: "https://www.leadspro.ae/",
  telephone: "+971527121005",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B3222, Skyhills Astra, Umm Suqeim St - Al Barsha South Second - Al Barsha",
    addressLocality: "Dubai",
    postalCode: "00000",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.0730467,
    longitude: 55.2461184,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={body.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <CtaBlock />
        <Footer />

        <JsonLd data={[localBusinessSchema]} />
      </body>
    </html>
  );
}
