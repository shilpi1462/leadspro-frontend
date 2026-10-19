import Link from "next/link";
import type { ReactNode } from "react";
import { stories } from "@/data/stories";
import { home } from "@/data/home";
import { workPictures } from "@/data/images";
import { routes } from "@/lib/site";
import { Laptop, Shot, Wireframe } from "@/components/visuals/parts/Devices";
import { IndustryIcon, type IndustryIconName } from "@/components/ui/IndustryIcon";
import { TickCircle } from "@/components/sections/icons";
import kit from "@/components/sections/kit.module.css";
import { InView } from "@/components/social/InView";
import { CountNum } from "./CountNum";
import c from "./CaseLaptops.module.css";

interface CaseCard {
  slug: string;
  tag: string;
  num: string;
  label: string;
  points: string[];
  note: string;
  icon: IndustryIconName;
  screen: ReactNode;
}

const screens: Record<string, ReactNode> = {
  "niagara-waterproofing-drainage-plumbing-seo": (
    <Shot picture={workPictures["waterproofing-local-service-growth"]} position="top" />
  ),
  "construction-company-strategy-example": <Wireframe name="Construction Company" compact />,
  "healthcare-clinic-strategy-example": (
    <Shot picture={workPictures["clinic-website-trust-refresh"]} position="top" />
  ),
};

function cards(): CaseCard[] {
  return stories.map((story) => {
    const steps = story.strategy.split("→").map((t) => t.trim());
    const figure = story.snapshotMetrics?.[0];
    return {
      slug: story.slug,
      tag: `${story.kind} · ${story.industry}`,
      num: figure ? figure.value : String(steps.length),
      label: figure
        ? `${figure.label} — ${story.snapshotTitle ?? "audit snapshot"}`
        : `${story.strategyLabel} stages`,
      points: figure
        ? (story.snapshot ?? []).slice(0, 3)
        : story.services.split("+").map((t) => t.trim()),
      note: story.note,
      icon: story.icon,
      screen: screens[story.slug],
    };
  });
}

export function CaseLaptops() {
  const { title, intro } = home.cases;
  return (
    <section className={`${kit.section} ${kit.dark}`}>
      <div className="container">
        <div className={c.head}>
          <h2 className={`${kit.h2} ${kit.centre}`}>{title}</h2>
          <p className={c.intro}>{intro[0]}</p>
        </div>
        <div className={c.grid}>
          {cards().map((card) => (
            <article key={card.slug} className={c.card} data-count-card="">
              <div className={c.content}>
                <p className={c.tag}>{card.tag}</p>
                <p className={c.num}>
                  <CountNum value={card.num} triggers={["view", "hover"]} />
                </p>
                <p className={c.label}>{card.label}</p>
                <hr className={c.separator} />
                <ul className={c.points}>
                  {card.points.map((point) => (
                    <li key={point}>
                      <TickCircle className={c.pointIcon} />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className={c.note}>{card.note}</p>
                <Link href={routes.portfolio} className={c.button}>
                  View case study
                </Link>
              </div>
              {/* "in" once on screen, so a drawn site builds up the way it does in the scenes */}
              <InView className={c.laptop}>
                <div aria-hidden="true">
                  <Laptop>{card.screen}</Laptop>
                </div>
              </InView>
              <span className={c.logo} aria-hidden="true">
                <IndustryIcon name={card.icon} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
