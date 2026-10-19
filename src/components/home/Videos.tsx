import { videoSection, clientVideos } from "@/data/videos";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { SplitText } from "@/components/ui/SplitText";
import styles from "./Videos.module.css";

const icons = ["camera", "publish", "megaphone", "growth"] as const;
const stepAccents = ["#e6f0a8", "#d5edb6", "#dbecc0", "#d9f55c"];

// Section the client added to the home page doc: four steps on the left, client videos on the right.
export function Videos({
  heading = videoSection.title,
  id = "videos",
}: {
  heading?: string;
  id?: string;
}) {
  return (
    <section className="container section" aria-labelledby={`${id}-title`} id={id}>
      <div className={styles.grid}>
        <Reveal className={styles.copy}>
          <SplitText as="h2" id={`${id}-title`} className={styles.title} text={heading} />
          <p className={styles.text}>{videoSection.text}</p>
          <ol className={styles.steps}>
            {videoSection.steps.map((s, i) => (
              <li key={s.name} style={{ ["--accent" as string]: stepAccents[i] }}>
                <span className={styles.icon} aria-hidden="true">
                  <StepIcon name={icons[i]} />
                </span>
                <span>
                  <span className={styles.stepName}>{s.name}</span>
                  <span className={styles.stepText}>{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <Button href={videoSection.cta.href} variant="lime" iconLeft>
            {videoSection.cta.label}
          </Button>
        </Reveal>

        <Reveal className={styles.videos} delay={1}>
          {clientVideos.map((v, i) => (
            <VideoCard
              key={v.client}
              video={v}
              tone={(["ink", "violet", "ocean"] as const)[i % 3]}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function StepIcon({ name }: { name: (typeof icons)[number] }) {
  switch (name) {
    case "camera":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="7" width="13" height="10" rx="2" />
          <path d="m16 10 5-2v8l-5-2" />
        </svg>
      );
    case "publish":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m3 15 5-5 4 4 3-3 6 6" />
          <circle cx="16" cy="9" r="1.5" />
        </svg>
      );
    case "megaphone":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 10v4h3l7 4V6l-7 4H3Z" />
          <path d="M17 9a4 4 0 0 1 0 6" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19h16" />
          <path d="M6 15V9M11 15V5M16 15v-3M21 15V7" />
        </svg>
      );
  }
}
