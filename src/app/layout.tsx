import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBlock } from "@/components/layout/CtaBlock";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema } from "@/lib/seo";
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
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <CtaBlock />
        <Footer />
        <JsonLd
          data={[
            organizationSchema,
            {
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              name: site.legalName,
              url: site.url,
              publisher: { "@id": `${site.url}/#organization` },
            },
          ]}
        />
      </body>
    </html>
  );
}
