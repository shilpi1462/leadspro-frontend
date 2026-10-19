import Image from "next/image";
import type { CSSProperties } from "react";
import type { Picture } from "@/data/images";
import { AiChatDemo } from "@/components/home/AiChatDemo";
import { home } from "@/data/home";
import { G, type Glyph } from "./glyphs";
import ui from "./ui.module.css";
import styles from "./Human.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const n = (i: number) => ({ ["--n" as string]: i }) as CSSProperties;

/** What the data shows, as an analytics panel: one row per signal, each with a bar filling. */
export function SignalBoard({
  title,
  items,
  icons,
  sticker,
}: {
  title: string;
  items: string[];
  icons: Glyph[];
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.board)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="chart" />
        </span>
        {title}
        <small>Live</small>
      </div>
      <ul>
        {items.map((item, i) => (
          <li
            key={item}
            style={
              {
                ...n(i),
                ["--fill" as string]: [0.82, 0.64, 0.46, 0.72, 0.55, 0.9][i % 6],
              } as CSSProperties
            }
          >
            <span className={styles.rowIcon}>
              <G name={icons[i % icons.length]} />
            </span>
            <span className={styles.rowText}>{item}</span>
            <span className={styles.meter}>
              <i />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Hand-written sticky notes: the questions data cannot answer on its own. */
export function StickyNote({ text, tone = "lime" }: { text: string; tone?: "lime" | "cream" }) {
  return (
    <div className={cx(ui.root, styles.note, tone === "cream" && styles.cream)}>
      <span className={styles.tape} />
      <p>{text}</p>
    </div>
  );
}

/** The customer journey as a chain of steps that light up in order. */
export function JourneyCard({
  title,
  steps,
  sticker,
}: {
  title: string;
  steps: string[];
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.journey)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="route" />
        </span>
        {title}
      </div>
      <ol>
        {steps.map((s, i) => (
          <li key={s} style={n(i)}>
            <span className={styles.node}>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A photo or logo as a cut-out card. */
export function PhotoCard({
  picture,
  sticker,
  contain,
}: {
  picture: Picture;
  sticker?: boolean;
  contain?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.photo, contain && styles.contain)}>
      <Image
        src={picture.src}
        alt=""
        width={picture.width}
        height={picture.height}
        sizes="(min-width: 1024px) 30vw, 70vw"
      />
    </div>
  );
}

/** The home page's AI chat phone, sized to its piece. */
export function AiPhone() {
  return <AiChatDemo question={home.ask.asked} demo={home.aiTerms.demo} className={styles.ai} />;
}
