import type { CSSProperties } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { G, Stars } from "./glyphs";
import ui from "./ui.module.css";
import styles from "./Local.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const SIZE = 7;
const MID = (SIZE - 1) / 2;

/* Rank at each point of the grid: strongest round the business, weaker towards the edge, with a
   little unevenness so it reads like a real scan rather than a perfect bullseye. */
const pins = Array.from({ length: SIZE * SIZE }, (_, i) => {
  const col = i % SIZE;
  const row = Math.floor(i / SIZE);
  const d = Math.hypot(col - MID, (row - MID) * 1.1);
  const wobble = ((i * 37) % 11) / 11 - 0.35;
  const rank = Math.max(1, Math.round(d * 0.9 + wobble));
  // popped in a scattered order, the way the scan results come back
  const delay = ((i * 29) % (SIZE * SIZE)) / (SIZE * SIZE);
  return { col, row, rank, delay, centre: col === MID && row === MID };
});

/** Local rank grid over a street map: each pin is where the business ranks from that spot. */
export function MapGrid({
  keyword,
  place,
  dark,
  bare,
}: {
  keyword: string;
  place: string;
  dark?: boolean;
  bare?: boolean;
}) {
  return (
    <div
      className={cx(
        bare ? ui.root : ui.card,
        styles.grid,
        dark && styles.dark,
        bare && styles.bare,
      )}
    >
      {!bare && (
        <div className={ui.head}>
          <span className={ui.icon}>
            <G name="pin" />
          </span>
          Local rank grid
          <small>{place}</small>
        </div>
      )}
      <div className={styles.map}>
        <svg className={styles.streets} viewBox="0 0 200 160" preserveAspectRatio="none">
          <path
            className={styles.water}
            d="M0 128 C40 118 70 136 110 126 S170 112 200 120 V160 H0Z"
          />
          <path d="M-5 40 C50 46 120 30 205 44" />
          <path d="M-5 92 C60 84 130 100 205 88" />
          <path d="M40 -5 C46 50 34 110 44 165" />
          <path d="M120 -5 C112 60 128 110 118 165" />
          <path className={styles.minorStreet} d="M-5 66 C70 62 140 72 205 64" />
          <path className={styles.minorStreet} d="M80 -5 C86 60 76 110 84 165" />
          <path className={styles.minorStreet} d="M160 -5 C154 50 166 100 158 165" />
          <path className={styles.highway} d="M-5 150 C60 110 120 40 205 10" />
        </svg>
        <span className={styles.query}>
          <G name="search" />
          {keyword}
        </span>
        <div className={styles.pins}>
          {pins.map((p) => (
            <span
              key={`${p.col}-${p.row}`}
              className={cx(
                styles.pin,
                p.centre && styles.home,
                p.rank <= 3 ? styles.r1 : p.rank <= 6 ? styles.r2 : styles.r3,
              )}
              style={
                {
                  ["--d" as string]: p.delay,
                  gridColumn: p.col + 1,
                  gridRow: p.row + 1,
                } as CSSProperties
              }
            >
              {p.centre ? <G name="pin" /> : p.rank > 9 ? "9+" : p.rank}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Calls from the profile. Both figures are the reported ones from the home doc. */
export function CallsCard({
  total,
  totalLabel,
  month,
  monthLabel,
  actions,
  sticker,
}: {
  total: string;
  totalLabel: string;
  month: string;
  monthLabel: string;
  actions: string[];
  sticker?: boolean;
}) {
  const share = Math.round((Number(month) / Number(total)) * 100);
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.calls)}>
      <div className={ui.head}>
        <span className={cx(ui.icon, styles.ring)}>
          <G name="phone" />
        </span>
        Calls
        <small>Google Business Profile</small>
      </div>
      <strong className={styles.callsTotal}>{total}</strong>
      <span className={ui.label}>{totalLabel}</span>
      <div className={styles.month}>
        <span>
          {monthLabel}
          <b>{month}</b>
        </span>
        <span className={styles.track}>
          <span
            className={styles.fill}
            style={{ ["--share" as string]: share / 100 } as CSSProperties}
          />
        </span>
      </div>
      <div className={styles.actions}>
        {actions.map((a) => (
          <span key={a} className={ui.chip}>
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A business profile on a phone: photos, rating, the action buttons, hours and a review. */
export function GbpPhone({ name, category }: { name: string; category: string }) {
  return (
    <div className={styles.phoneWrap}>
      <PhoneFrame className={styles.phone}>
        <div className={cx(ui.root, styles.gbp)}>
          <div className={styles.gbpSearch}>
            <G name="search" />
            {name}
          </div>
          <div className={styles.photos}>
            <span />
            <span />
            <span />
          </div>
          <b className={styles.gbpName}>{name}</b>
          <span className={styles.gbpRating}>
            5.0 <Stars className={ui.stars} />
          </span>
          <span className={styles.gbpCat}>{category}</span>
          <div className={styles.buttons}>
            {(
              [
                ["phone", "Call"],
                ["route", "Directions"],
                ["globe", "Website"],
                ["bookmark", "Save"],
              ] as const
            ).map(([icon, label], i) => (
              <span key={label} className={cx(styles.btn, i === 0 && styles.btnCall)}>
                <i>
                  <G name={icon} />
                </i>
                {label}
              </span>
            ))}
          </div>
          <div className={styles.hours}>
            <span className={styles.open}>Open</span> · Closes 6 pm
          </div>
          <div className={styles.review}>
            <span className={styles.avatar} />
            <span className={styles.reviewBody}>
              <Stars className={cx(ui.stars, styles.reviewStars)} />
              <span className={ui.bar} />
              <span className={ui.bar} />
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

/** Table-top review stand: tap or scan, straight to the review link. */
export function ReviewStand({ name, line }: { name: string; line: string }) {
  return (
    <div className={cx(ui.root, styles.stand)}>
      <div className={styles.plate}>
        <span className={styles.brand}>{name}</span>
        <Stars className={cx(ui.stars, styles.standStars)} />
        <p className={styles.standLine}>{line}</p>
        <span className={styles.nfc}>
          <i />
          <i />
          <i />
          <b />
        </span>
      </div>
      <div className={styles.base} />
    </div>
  );
}

/** The review page a tap opens: rate with stars, a few lines, post. */
export function ReviewPage({ name }: { name: string }) {
  return (
    <div className={cx(ui.root, styles.reviewPage)}>
      <span className={styles.rpMark}>{name.charAt(0)}</span>
      <b>{name}</b>
      <span className={styles.rpLabel}>Rate and review</span>
      <Stars className={cx(ui.stars, styles.rpStars)} />
      <span className={styles.rpBox}>
        <span className={ui.bar} />
        <span className={ui.bar} />
        <span className={ui.bar} />
      </span>
      <span className={styles.rpPost}>Post</span>
    </div>
  );
}
