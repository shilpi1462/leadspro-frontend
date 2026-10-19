import type { Metadata } from "next";
import { home } from "@/data/home";
import { pageMetadata, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { AskSearch } from "@/components/home/AskSearch";
import { AiTerms } from "@/components/home/AiTerms";
import { Understanding } from "@/components/home/Understanding";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ServicesStack } from "@/components/home/ServicesStack";
import { Vision } from "@/components/home/Vision";
import { Bottlenecks } from "@/components/home/Bottlenecks";
import { Process } from "@/components/home/Process";
import { HumanEdge } from "@/components/home/HumanEdge";
import { Videos } from "@/components/home/Videos";
import { Results } from "@/components/home/Results";
import { CaseStudies } from "@/components/home/CaseStudies";
import { Compare } from "@/components/home/Compare";
import { IndustriesAreas } from "@/components/home/IndustriesAreas";
import { HomeFaq } from "@/components/home/HomeFaq";
import { LatestArticle } from "@/components/home/LatestArticle";
import { LetsTalk } from "@/components/layout/LetsTalk";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata({
  title: home.seoTitle,
  description: home.description,
  path: "/",
});

const dark = `on-dark ${styles.dark}`;

export default function HomePage() {
  return (
    <>
      <div className={dark}>
        <Hero />
        <About />
      </div>
      <div className={styles.light}>
        <AskSearch />
      </div>
      <div className={dark}>
        <AiTerms />
      </div>
      <div className={styles.light}>
        <Understanding />
      </div>
      <div className={dark}>
        <FeaturedWork />
      </div>
      <div className={styles.light}>
        <ServicesStack />
      </div>
      <div className={dark}>
        <Vision />
      </div>
      <div className={styles.light}>
        <Bottlenecks />
      </div>
      <div className={dark}>
        <Process />
        <HumanEdge />
      </div>
      <div className={styles.light}>
        <Results />
      </div>
      <div className={dark}>
        <CaseStudies />
      </div>
      <div className={styles.light}>
        <Videos />
      </div>
      <div className={dark}>
        <Compare />
      </div>
      <div className={styles.light}>
        <IndustriesAreas />
      </div>
      <div className={dark}>
        <HomeFaq />
      </div>
      <div className={styles.light}>
        <LatestArticle />
      </div>
      <div className={dark}>
        <LetsTalk />
      </div>
      <JsonLd data={faqSchema(home.faqs)} />
    </>
  );
}
