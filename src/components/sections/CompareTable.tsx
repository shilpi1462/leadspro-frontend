import { Inline } from "@/components/service/Inline";
import styles from "./CompareTable.module.css";

interface CompareTableProps {
  head: string[];
  rows: string[][];
  tone?: "dark" | "light";
}

export function CompareTable({ head, rows, tone = "dark" }: CompareTableProps) {
  const LeadsPro = head.findIndex((h) => /LeadsPro/i.test(h));
  const pair = head.length === 2;
  const highlight = pair && LeadsPro === -1 ? 1 : LeadsPro;
  const marks = pair && LeadsPro !== -1;
  const labelled = !pair && highlight !== 0;

  return (
    <div className={`${styles.wrap} ${tone === "light" ? styles.light : styles.dark}`}>
      <table className={`${styles.table} ${pair ? styles.pair : ""}`}>
        <thead>
          <tr>
            {head.map((h, c) => (
              <th key={c} scope="col" className={c === highlight ? styles.hl : undefined}>
                <span className={styles.headInner}>
                  {marks && (c === highlight ? <Tick /> : <Cross />)}
                  {labelled && c === 0 ? "" : h}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) =>
                labelled && c === 0 ? (
                  <th key={c} scope="row" className={styles.label}>
                    <Inline text={cell} />
                  </th>
                ) : (
                  <td
                    key={c}
                    className={c === highlight ? styles.hl : undefined}
                    data-head={head[c]}
                  >
                    <span className={styles.cellInner}>
                      {marks && (c === highlight ? <Tick /> : <Cross />)}
                      <span>
                        <Inline text={cell} />
                      </span>
                      {pair && c !== highlight && <Arrow />}
                    </span>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Tick() {
  return (
    <svg className={styles.tick} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M5.8 10.3l2.7 2.7 5.6-5.6"
        fill="none"
        stroke="#0b2a20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg className={styles.cross} viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.2 7.2l5.6 5.6M12.8 7.2l-5.6 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}
