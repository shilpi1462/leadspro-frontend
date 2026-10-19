import type { CSSProperties } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { G, type Glyph } from "./glyphs";
import ui from "./ui.module.css";
import styles from "./Studio.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const n = (i: number) => ({ ["--n" as string]: i }) as CSSProperties;

const swatches = [
  ["#0f4c3a", "Evergreen"],
  ["#d9f55c", "Lime"],
  ["#111111", "Ink"],
  ["#f3efe4", "Cream"],
  ["#b9d3c3", "Sage"],
];

/** Brand board: mark, palette, type and a card, the pieces of a visual identity. */
export function BrandBoard({
  mark,
  name,
  sticker,
}: {
  mark: string;
  name: string;
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.board)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="palette" />
        </span>
        Brand system
        <small>v1.0</small>
      </div>
      <div className={styles.boardGrid}>
        <div className={styles.mark}>
          <span>{mark}</span>
          <small>{name}</small>
        </div>
        <div className={styles.type}>
          <b>Aa</b>
          <span>Display</span>
          <i />
          <i />
        </div>
      </div>
      <div className={styles.swatches}>
        {swatches.map(([colour, label], i) => (
          <span key={label} style={{ ...n(i), ["--c" as string]: colour } as CSSProperties}>
            <small>{label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A business card in the new identity, tilted like it was dropped on the desk. */
export function BusinessCard({ mark, name, line }: { mark: string; name: string; line: string }) {
  return (
    <div className={cx(ui.root, styles.bizCard)}>
      <span className={styles.bizMark}>{mark}</span>
      <span className={styles.bizText}>
        <b>{name}</b>
        <small>{line}</small>
      </span>
    </div>
  );
}

const tiles: { icon?: Glyph; tone: number }[] = [
  { tone: 0, icon: "play" },
  { tone: 1 },
  { tone: 2 },
  { tone: 3 },
  { tone: 4, icon: "play" },
  { tone: 1 },
  { tone: 2 },
  { tone: 0 },
  { tone: 3, icon: "play" },
];

/** Social profile on a phone: header, highlights and a post grid that fills in. */
export function SocialPhone({ handle, bio }: { handle: string; bio: string }) {
  return (
    <div className={styles.phoneWrap}>
      <PhoneFrame className={styles.phone}>
        <div className={cx(ui.root, styles.social)}>
          <div className={styles.profile}>
            <span className={styles.avatar}>{handle.charAt(0).toUpperCase()}</span>
            <span className={styles.statBars}>
              <i />
              <i />
              <i />
            </span>
          </div>
          <b className={styles.handle}>{handle}</b>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.highlights}>
            {["Work", "Tips", "Team", "FAQ"].map((h) => (
              <span key={h}>
                <i />
                {h}
              </span>
            ))}
          </div>
          <div className={styles.posts}>
            {tiles.map((t, i) => (
              <span key={i} className={styles[`tone${t.tone}`]} style={n(i)}>
                {t.icon && <G name={t.icon} />}
              </span>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/** One post card with a like that pops. */
export function PostCard({
  handle,
  caption,
  sticker,
}: {
  handle: string;
  caption: string;
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.post)}>
      <div className={styles.postHead}>
        <span className={styles.avatarSm}>{handle.charAt(0).toUpperCase()}</span>
        <b>{handle}</b>
        <small>2h</small>
      </div>
      <div className={styles.postImage}>
        <span>{caption}</span>
      </div>
      <div className={styles.postActions}>
        <span className={styles.like}>
          <G name="heart" />
        </span>
        <G name="comment" />
        <G name="share" />
        <G name="bookmark" />
      </div>
    </div>
  );
}

const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots: Record<number, string> = { 0: "Post", 2: "Reel", 3: "Story", 5: "Post", 6: "Reel" };

/** Publishing calendar for the week; the slots drop in one by one. */
export function Scheduler({ title, sticker }: { title: string; sticker?: boolean }) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.schedule)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="calendar" />
        </span>
        {title}
        <small>This week</small>
      </div>
      <div className={styles.week}>
        {week.map((d, i) => (
          <div key={d} className={styles.day}>
            <span>{d}</span>
            {slots[i] ? (
              <b className={styles[`slot${slots[i]}`]} style={n(i)}>
                {slots[i]}
              </b>
            ) : (
              <i />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** A page being written: headings, copy and an FAQ block filling in. */
export function ContentDoc({
  title,
  tag,
  sticker,
}: {
  title: string;
  tag: string;
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.doc)}>
      <div className={styles.toolbar}>
        <span className={ui.chip}>{tag}</span>
        <span className={styles.tools}>
          <b>B</b>
          <i>I</i>
          <span>H2</span>
          <G name="doc" />
        </span>
      </div>
      <b className={styles.docTitle}>{title}</b>
      <div className={styles.docLines}>
        {[92, 84, 88, 60].map((w, i) => (
          <span
            key={i}
            className={ui.bar}
            style={{ ...n(i), ["--w" as string]: `${w}%` } as CSSProperties}
          />
        ))}
      </div>
      <span className={styles.h2} style={n(4)} />
      <div className={styles.docLines}>
        {[90, 76].map((w, i) => (
          <span
            key={i}
            className={ui.bar}
            style={{ ...n(5 + i), ["--w" as string]: `${w}%` } as CSSProperties}
          />
        ))}
      </div>
      <div className={styles.faq} style={n(7)}>
        <b>FAQ</b>
        <span className={ui.bar} />
        <span className={ui.bar} />
      </div>
      <span className={styles.cursor} />
    </div>
  );
}

/** Page outline with the sections ticked as they are written. */
export function OutlineCard({
  title,
  items,
  sticker,
}: {
  title: string;
  items: string[];
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.outline)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="layers" />
        </span>
        {title}
      </div>
      <ol>
        {items.map((item, i) => (
          <li key={item} style={n(i)}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* Where the cells of the pathway sit: along the top, down the right, back along the bottom. */
const SNAKE = [
  [1, 1],
  [2, 1],
  [3, 1],
  [3, 2],
  [2, 2],
  [1, 2],
];

export function TopicMap({
  title,
  steps,
  sticker,
}: {
  title: string;
  steps: string[];
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.topics)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="layers" />
        </span>
        {title}
        <small>{steps.length} stops</small>
      </div>
      <div className={styles.topicGrid}>
        <svg className={styles.topicPath} viewBox="0 0 300 200" preserveAspectRatio="none">
          <path pathLength={1} d="M50 50 H250 V150 H50" />
        </svg>
        {steps.slice(0, SNAKE.length).map((step, i) => (
          <span
            key={step}
            className={cx(styles.topic, i === steps.length - 1 && styles.topicEnd)}
            style={{ ...n(i), gridColumn: SNAKE[i][0], gridRow: SNAKE[i][1] } as CSSProperties}
          >
            <i>{String(i + 1).padStart(2, "0")}</i>
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}
