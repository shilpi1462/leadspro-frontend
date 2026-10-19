import Image from "next/image";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { Play } from "./icons";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./MediaBanner.module.css";

interface MediaBannerProps {
  title: ReactNode;
  children: ReactNode;
  picture: Picture;
  video?: string;
  cta?: { label: string; href: string };
  card?: "cream" | "black";
  /** Straddle the change from a light section above to a dark one below. */
  seam?: boolean;
  id?: string;
}

export function MediaBanner({
  title,
  children,
  picture,
  video,
  cta,
  card = "cream",
  seam = true,
  id,
}: MediaBannerProps) {
  const media = (
    <>
      <Image
        src={picture.src}
        alt={video ? "" : picture.alt}
        width={picture.width}
        height={picture.height}
        sizes="(min-width: 900px) 36vw, 90vw"
      />
      {video && (
        <span className={styles.play} aria-hidden="true">
          <Play className={styles.playIcon} />
        </span>
      )}
    </>
  );
  return (
    <section className={`${styles.section} ${seam ? styles.seam : ""}`} id={id}>
      <div className="container">
        <Reveal className={`${styles.card} ${card === "black" ? styles.black : ""}`}>
          {video ? (
            <a
              href={video}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.media}
              aria-label={`Watch: ${typeof title === "string" ? title : "video"}`}
            >
              {media}
            </a>
          ) : (
            <div className={styles.media}>{media}</div>
          )}
          <div className={styles.copy}>
            <h2 className={`${kit.h3} ${styles.title}`}>{title}</h2>
            <div className={styles.body}>{children}</div>
            {cta && (
              <Pill
                href={cta.href}
                tone={card === "black" ? "accent" : "black"}
                className={styles.cta}
              >
                {cta.label}
              </Pill>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
