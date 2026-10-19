import type { Metadata } from "next";
import { aiHub } from "@/data/aiHub";
import { routes } from "@/lib/site";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LetsTalk } from "@/components/layout/LetsTalk";
import { InnerPage } from "@/components/sections/InnerPage";
import { tight, clash } from "@/components/aihub/font";
import { Hero } from "@/components/aihub/Hero";
import { Intro } from "@/components/aihub/Intro";
import { Approach } from "@/components/aihub/Approach";
import { Why } from "@/components/aihub/Why";
import { Observing } from "@/components/aihub/Observing";
import { Lab } from "@/components/aihub/Lab";
import { Featured } from "@/components/aihub/Featured";
import { Claims } from "@/components/aihub/Claims";
import { Library, Glossary } from "@/components/aihub/Library";
import { Principles, Closing } from "@/components/aihub/Closing";
import s from "@/components/aihub/AiHub.module.css";

const crumbs = [{ name: "AI Hub", href: routes.aiHub }];

export const metadata: Metadata = pageMetadata({
  title: aiHub.seoTitle,
  description: aiHub.description,
  path: routes.aiHub,
});

export default function AiHubPage() {
  return (
    <InnerPage>
      <div className={`${tight.variable} ${clash.variable} ${s.hub}`}>
        <Hero />
        <Intro />
        <Approach />
        <Why />
        <Observing />
        <Lab />
        <Featured />
        <Claims />
        <Library />
        <Glossary />
        <Principles />
        <Closing />
      </div>

      <div className="on-dark">
        <LetsTalk />
      </div>

      <JsonLd data={breadcrumbSchema(crumbs)} />
    </InnerPage>
  );
}
