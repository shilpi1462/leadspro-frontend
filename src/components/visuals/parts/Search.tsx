import type { CSSProperties } from "react";
import { G, Stars } from "./glyphs";
import ui from "./ui.module.css";
import styles from "./Search.module.css";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
const n = (i: number) => ({ ["--n" as string]: i }) as CSSProperties;

/** Search Console-style performance card. The totals are the reported ones from the home doc. */
export function ConsoleCard({
  impressions,
  clicks,
  period,
  sticker,
}: {
  impressions: string;
  clicks: string;
  period: string;
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.console)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="trend" />
        </span>
        Search results
        <small>{period}</small>
      </div>
      <div className={styles.tiles}>
        <div className={styles.tileA}>
          <span>Total impressions</span>
          <strong>{impressions}</strong>
        </div>
        <div className={styles.tileB}>
          <span>Total clicks</span>
          <strong>{clicks}</strong>
        </div>
      </div>
      <svg className={styles.chart} viewBox="0 0 300 110" preserveAspectRatio="none">
        {[22, 50, 78].map((y) => (
          <line key={y} x1="0" x2="300" y1={y} y2={y} className={styles.grid} />
        ))}
        <path
          className={styles.area}
          d="M0 100 C30 98 45 92 70 90 S110 84 130 78 175 70 195 58 235 44 255 34 290 16 300 12 V110 H0Z"
        />
        <path
          className={styles.lineA}
          pathLength={1}
          d="M0 100 C30 98 45 92 70 90 S110 84 130 78 175 70 195 58 235 44 255 34 290 16 300 12"
        />
        <path
          className={styles.lineB}
          pathLength={1}
          d="M0 104 C30 103 50 100 72 99 S115 95 135 92 178 88 198 82 238 74 258 66 290 56 300 52"
        />
      </svg>
    </div>
  );
}

export interface RankRow {
  keyword: string;
  position: number;
  updated: string;
}

/** Keyword tracker: keyword, where it sits, when it was last checked. */
export function RankTable({
  rows,
  title = "Tracked keywords",
}: {
  rows: RankRow[];
  title?: string;
}) {
  return (
    <div className={cx(ui.card, styles.ranks)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="search" />
        </span>
        {title}
        <small>{rows.length} keywords</small>
      </div>
      <div className={styles.rankHead}>
        <span>Keyword</span>
        <span>Position</span>
        <span>Updated</span>
      </div>
      <ol className={styles.rankRows}>
        {rows.map((row, i) => (
          <li key={row.keyword} style={n(i)}>
            <span className={styles.kw}>
              <G name="search" />
              {row.keyword}
            </span>
            <span className={cx(styles.pos, row.position <= 3 && styles.top)}>{row.position}</span>
            <span className={styles.when}>{row.updated}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** A tablet showing a results page with the business on top, typed query and all. */
export function SerpTablet({
  query,
  name,
  domain,
  title,
}: {
  query: string;
  name: string;
  domain: string;
  title: string;
}) {
  return (
    <div className={cx(ui.root, styles.tablet)}>
      <div className={styles.tabletScreen}>
        <div className={styles.searchBar}>
          <G name="search" />
          <span className={styles.query}>{query}</span>
          <G name="mic" />
        </div>
        <div className={styles.tabs}>
          <b>All</b>
          <span>Maps</span>
          <span>Images</span>
          <span>News</span>
        </div>
        <div className={styles.first}>
          <span className={styles.site}>
            <span className={styles.fav}>{name.charAt(0)}</span>
            <span>
              {name}
              <small>{domain}</small>
            </span>
          </span>
          <b className={styles.resultTitle}>{title}</b>
          <span className={styles.rating}>
            <Stars className={ui.stars} />
            <small>5.0</small>
          </span>
          <span className={styles.sweep} />
        </div>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.result} style={n(i)}>
            <span className={cx(ui.bar, styles.urlBar)} />
            <span className={cx(ui.bar, styles.titleBar)} />
            <span className={ui.bar} />
            <span className={cx(ui.bar, styles.short)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/** "Audit snapshot": two reviewed figures and what the audit found. */
export function AuditCard({
  metrics,
  findings,
  sticker,
}: {
  metrics: { value: string; label: string }[];
  findings: string[];
  sticker?: boolean;
}) {
  return (
    <div className={cx(ui.card, sticker && ui.sticker, styles.audit)}>
      <div className={ui.head}>
        <span className={ui.icon}>
          <G name="target" />
        </span>
        Audit snapshot
        <small>{findings.length} findings</small>
      </div>
      <div className={styles.auditFigures}>
        {metrics.map((m) => (
          <div key={m.label}>
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </div>
        ))}
      </div>
      <ul className={styles.findings}>
        {findings.map((f, i) => (
          <li key={f} style={n(i)}>
            <span className={styles.warn}>!</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
