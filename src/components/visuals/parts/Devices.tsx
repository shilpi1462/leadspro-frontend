import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Picture } from "@/data/images";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { G, type Glyph } from "./glyphs";
import ui from "./ui.module.css";
import styles from "./Devices.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const n = (i: number) => ({ ["--n" as string]: i }) as CSSProperties;

/** A laptop drawn in CSS around whatever screen it is given. */
export function Laptop({ children }: { children: ReactNode }) {
  return (
    <div className={cx(ui.root, styles.laptop)}>
      <div className={styles.lid}>
        <span className={styles.cam} />
        <div className={styles.display}>{children}</div>
      </div>
      <div className={styles.deck}>
        <span className={styles.notch} />
      </div>
    </div>
  );
}

/** Phone around a picture or a page, for the device pairs. */
export function Handset({ children }: { children: ReactNode }) {
  return (
    <div className={styles.handset}>
      <PhoneFrame className={styles.handsetFrame}>{children}</PhoneFrame>
    </div>
  );
}

export function Shot({ picture, position }: { picture: Picture; position?: string }) {
  return (
    <Image
      className={styles.shot}
      src={picture.src}
      alt=""
      width={picture.width}
      height={picture.height}
      sizes="(min-width: 1024px) 40vw, 80vw"
      style={position ? ({ ["--focus" as string]: position } as CSSProperties) : undefined}
    />
  );
}

export function Wireframe({ name, compact }: { name: string; compact?: boolean }) {
  return (
    <div className={cx(ui.root, styles.site, compact && styles.compact)}>
      <div className={styles.nav} style={n(0)}>
        <b>{name}</b>
        {!compact && (
          <span className={styles.links}>
            <i />
            <i />
            <i />
          </span>
        )}
        <span className={styles.navCta} />
      </div>
      <div className={styles.heroBlock} style={n(1)}>
        <span className={styles.h1} />
        <span className={cx(styles.h1, styles.h1Short)} />
        <span className={styles.lede} />
        <span className={styles.cta}>Get a quote</span>
      </div>
      <div className={styles.cards}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={styles.cardBlock} style={n(2 + i)}>
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Checklist card ("Fast", "Responsive", ...) that ticks itself off. */
export function ChecksCard({
  title,
  items,
  icon = "shield",
  sticker,
}: {
  title: string;
  items: string[];
  icon?: Glyph;
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.checks)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name={icon} />
        </span>
        {title}
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={item} style={n(i)}>
            <span className={styles.tick}>
              <G name="check" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Line lengths and token colours for the editor, so it reads as code without being any.
const code = [
  [2, 18, 1, 26],
  [4, 12, 3, 20],
  [4, 30],
  [6, 14, 2, 10],
  [6, 22, 4, 12],
  [4, 8],
  [2, 6],
  [0, 0],
  [2, 16, 1, 30],
  [4, 24, 3, 8],
  [2, 6],
];

/** Code editor with abstract syntax lines typing in. */
export function CodeCard({ file }: { file: string }) {
  return (
    <div className={cx(ui.root, styles.editor)}>
      <div className={styles.editorBar}>
        <i />
        <i />
        <i />
        <span>{file}</span>
      </div>
      <div className={styles.editorBody}>
        {code.map((line, row) => (
          <div key={row} className={styles.codeLine} style={n(row)}>
            <span className={styles.gutter}>{row + 1}</span>
            <span
              className={styles.tokens}
              style={{ ["--indent" as string]: line[0] } as CSSProperties}
            >
              {line.slice(1).map((len, k) => (
                <i
                  key={k}
                  className={styles[`t${k % 3}`]}
                  style={{ ["--len" as string]: len } as CSSProperties}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
