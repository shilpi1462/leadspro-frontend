import Image from "next/image";
import type { Picture } from "@/data/images";
import styles from "./Screenshot.module.css";

interface ScreenshotProps {
  label: string;
  caption: string;
  picture?: Picture;
  tone?: "light" | "dark";
}

export function Screenshot({ label, caption, picture, tone = "light" }: ScreenshotProps) {
  return (
    <figure className={[styles.frame, styles[tone]].filter(Boolean).join(" ")}>
      <span className={styles.label}>{label}</span>
      {picture ? (
        <Image
          src={picture.src}
          alt={picture.alt}
          width={picture.width}
          height={picture.height}
          className={styles.shot}
          loading="lazy"
        />
      ) : (
        <span className={styles.pending}>Screenshot to be added</span>
      )}
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
