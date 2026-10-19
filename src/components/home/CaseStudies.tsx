"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { home } from "@/data/home";
import { stories } from "@/data/stories";
import { routes } from "@/lib/site";
import { SplitText } from "@/components/ui/SplitText";
import { IndustryIcon } from "@/components/ui/IndustryIcon";
import { categoryDot } from "@/lib/theme";
import styles from "./CaseStudies.module.css";

const { cases } = home;
const tones = ["green", "ink", "lime"] as const;

// The service names used in the cases, and the category whose colour each one wears.
const serviceCategory: Record<string, string> = {
  "Technical SEO": "seo-ai-search-optimization",
  SEO: "seo-ai-search-optimization",
  "Local SEO": "local-seo",
  Content: "content-marketing",
  "Website Optimization": "website-design",
  "Website Strategy": "website-design",
};

export function CaseStudies() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(styles.static);
      return;
    }
    const track = el.querySelector<HTMLElement>("[data-track]")!;
    const slides = Array.from(track.children) as HTMLElement[];
    const last = slides.length - 1;
    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const horizontal = window.matchMedia("(min-width: 900px)").matches;
      if (horizontal) {
        const travel = el.getBoundingClientRect().height - vh;
        const p = Math.min(last, Math.max(0, (-el.getBoundingClientRect().top / travel) * last));
        const step = slides[0].offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
        track.style.setProperty("--x", `${(-p * step).toFixed(1)}px`);
        el.style.setProperty("--p", p.toFixed(4));
        slides.forEach((slide, i) => {
          const off = p - i;
          // settle rises as the slide arrives and, once it has, stays put while it leaves
          const arriving = Math.max(0, 1 - Math.max(0, -off) * 2);
          const prev = parseFloat(slide.style.getPropertyValue("--settle") || "0");
          slide.style.setProperty("--off", off.toFixed(4));
          slide.style.setProperty("--settle", (off >= 0 ? 1 : Math.max(prev, arriving)).toFixed(4));
        });
      } else {
        // Stacked: a slide settles as its strategy board scrolls into the lower part of the
        // screen, and stays settled once it has.
        track.style.setProperty("--x", "0px");
        slides.forEach((slide) => {
          const board = slide.querySelector<HTMLElement>("[data-board]") ?? slide;
          const top = board.getBoundingClientRect().top;
          const now = Math.min(1, Math.max(0, (vh * 0.92 - top) / (vh * 0.35)));
          const prev = parseFloat(slide.style.getPropertyValue("--settle") || "0");
          slide.style.setProperty("--off", "0");
          slide.style.setProperty("--settle", Math.max(prev, now).toFixed(4));
        });
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section aria-labelledby="cases-title">
      <div className="container">
        <div className="heading heading--center">
          <SplitText as="h2" id="cases-title" text={cases.title} />
          <span className="eyebrow">Performance</span>
          <p>
            {cases.intro[0]} {cases.intro[1]}
          </p>
        </div>
      </div>

      <div ref={wrap} className={styles.wrap} style={{ ["--n" as string]: stories.length }}>
        <div className={styles.stage}>
          <ol data-track className={styles.track}>
            {stories.map((story, i) => {
              const steps = story.strategy.split("→").map((s) => s.trim());
              const findings = (story.snapshotMetrics?.length ?? 0) + (story.snapshot?.length ?? 0);
              return (
                <li
                  key={story.slug}
                  className={`${styles.slide} ${styles[tones[i % tones.length]]}`}
                >
                  <IndustryIcon name={story.icon} className={styles.art} />

                  <div className={styles.copy}>
                    <div className={styles.meta}>
                      <span className={styles.badge}>
                        <span className={styles.tile}>
                          <IndustryIcon name={story.icon} className={styles.icon} />
                        </span>
                        <span className={styles.badgeText}>
                          <span className={styles.kind}>{story.kind}</span>
                          <span className={styles.industry}>{story.industry}</span>
                        </span>
                      </span>
                      <span className={styles.index}>
                        Case <span>(0{i + 1})</span>
                      </span>
                    </div>
                    <h3 className={styles.title}>{story.title}</h3>
                    <ul className={styles.pills} aria-label="Services">
                      {story.services.split(" + ").map((name) => (
                        <li
                          key={name}
                          className="cat-dot"
                          style={categoryDot(serviceCategory[name])}
                        >
                          {name}
                        </li>
                      ))}
                    </ul>
                    <p className={styles.text}>{story.text}</p>
                    {story.outcome && <p className={styles.text}>{story.outcome}</p>}
                    <div className={styles.foot}>
                      <span className={styles.note}>{story.note}</span>
                      {story.kind === "Case Study" && (
                        <Link href={routes.portfolio} className={styles.link}>
                          View the SEO Case Study
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className={styles.board} data-board>
                    <div className={styles.panel}>
                      <div className={styles.panelHead}>
                        <RouteIcon />
                        <span className={styles.boardLabel}>{story.strategyLabel}</span>
                        <span className={styles.count}>{steps.length} steps</span>
                      </div>
                      <ol className={styles.roadmap} aria-label={story.strategyLabel}>
                        {steps.map((step, k) => (
                          <li
                            key={step}
                            className={styles.step}
                            style={{ ["--k" as string]: (k / steps.length) * 0.6 }}
                          >
                            <span className={styles.node}>0{k + 1}</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {findings > 0 && (
                      <div className={styles.panel}>
                        <div className={styles.panelHead}>
                          <ScanIcon />
                          <span className={styles.boardLabel}>{story.snapshotTitle}</span>
                          <span className={styles.count}>{findings} findings</span>
                        </div>
                        {story.snapshotMetrics && (
                          <dl className={styles.metrics}>
                            {story.snapshotMetrics.map((m, k) => (
                              <div key={m.label} style={{ ["--k" as string]: 0.3 + k * 0.08 }}>
                                <dt>{m.label}</dt>
                                <dd>{m.value}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                        {story.snapshot && (
                          <ul className={styles.issues}>
                            {story.snapshot.map((s, k) => (
                              <li
                                key={s}
                                style={{
                                  ["--k" as string]: 0.4 + (k / story.snapshot!.length) * 0.3,
                                }}
                              >
                                <WarnIcon />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          <div className={styles.progress} aria-hidden="true">
            <span className={styles.bar}>
              <span className={styles.fill} />
            </span>
            <span className={styles.count}>{stories.length} cases</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteIcon() {
  return (
    <svg className={styles.headIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5" cy="15" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="15" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M7.2 15H12a3 3 0 000-6H8a3 3 0 010-6h4.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg className={styles.headIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12.3 12.3L17 17M6.5 8.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg className={styles.warn} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2l6.5 11.5h-13z"
        fill="currentColor"
        opacity="0.18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M8 6.5v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="8" cy="11.6" r="0.8" fill="currentColor" />
    </svg>
  );
}
