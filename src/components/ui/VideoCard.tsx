import type { ClientVideo } from "@/data/videos";
import styles from "./VideoCard.module.css";

function embedUrl(url: string): string | null {
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{6,})/);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const ig = url.match(/instagram\.com\/(?:reel|p)\/([\w-]+)/);
  if (ig) return `https://www.instagram.com/reel/${ig[1]}/embed/`;
  return null;
}

// Vertical (9:16) video card. With a url it embeds the player; without one it stays a labelled poster.
export function VideoCard({
  video,
  tone = "ink",
}: {
  video: ClientVideo;
  tone?: "ink" | "violet" | "ocean";
}) {
  const src = video.url ? embedUrl(video.url) : null;
  return (
    <figure className={styles.card}>
      <div className={styles.frame}>
        {src ? (
          <iframe
            src={src}
            title={`${video.client} video`}
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className={`${styles.poster} ${styles[tone]}`}
            style={video.poster ? { backgroundImage: `url(${video.poster})` } : undefined}
          >
            <span className={styles.client}>{video.client}</span>
            <span className={styles.play} aria-hidden="true" />
          </div>
        )}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.label}>{video.caption}</span>
        <span className={styles.text}>{video.text}</span>
      </figcaption>
    </figure>
  );
}
