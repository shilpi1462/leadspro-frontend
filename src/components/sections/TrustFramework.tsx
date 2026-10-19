"use client";

import type { CSSProperties } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { useInView } from "@/lib/motion";
import { Icon, iconFor } from "./icons";
import { accent } from "./accent";
import kit from "./kit.module.css";
import styles from "./TrustFramework.module.css";

interface Pillar {
  name: string;
  question: string;
  use: string;
}

function read(blocks: Block[]) {
  const flows = blocks.filter((b): b is Extract<Block, { type: "flow" }> => b.type === "flow");
  const google = flows[0]?.steps ?? [];
  const sum = flows[1]?.steps ?? [];
  const frameAt = blocks.findIndex((b) => b.type === "h3");
  const intro = blocks
    .slice(0, frameAt === -1 ? blocks.length : frameAt)
    .filter((b) => b.type === "p") as Extract<Block, { type: "p" }>[];
  const frameTitle = frameAt === -1 ? "" : (blocks[frameAt] as Extract<Block, { type: "h3" }>).text;

  const pillars: Pillar[] = [];
  for (let i = frameAt + 1; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type !== "h3") continue;
    const [q, u] = [blocks[i + 1], blocks[i + 2]];
    pillars.push({
      name: b.text,
      question: q?.type === "p" ? q.text : "",
      use: u?.type === "p" ? u.text : "",
    });
  }
  return { google, sum, intro, frameTitle, pillars };
}

export function TrustFramework({
  id,
  title,
  blocks,
}: {
  id: string;
  title: string;
  blocks: Block[];
}) {
  const ref = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { google, sum, intro, frameTitle, pillars } = read(blocks);
  const inputs = pillars.slice(0, -1);
  const result = pillars[pillars.length - 1];
  const [lead, ...notes] = intro;
  const terms = sum[0]?.split(" + ") ?? [];

  return (
    <section id={id} className={`${kit.section} ${kit.dark} ${styles.section}`}>
      <div className="container">
        <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{accent(title)}</h2>

        <div className={styles.google}>
          {lead && (
            <p className={styles.googleLead}>
              <Inline text={lead.text} />
            </p>
          )}
          <ol className={styles.letters}>
            {google.map((word, i) => (
              <li key={word} className={i === google.length - 1 ? styles.most : undefined}>
                <b>{word.charAt(0)}</b>
                <span>{word}</span>
              </li>
            ))}
          </ol>
          <div className={styles.notes}>
            {notes.map((n) => (
              <p key={n.text}>
                <Inline text={n.text} />
              </p>
            ))}
          </div>
        </div>

        <div ref={ref} className={styles.frame}>
          <span className={`${kit.script} ${styles.frameTitle}`}>{frameTitle}</span>

          <ol className={styles.inputs}>
            {inputs.map((p, i) => (
              <li
                key={p.name}
                className={styles.input}
                style={{ ["--i" as string]: i } as CSSProperties}
              >
                <span className={styles.step}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.icon}>
                  <Icon name={iconFor(p.name, "doc")} />
                </span>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.question}>
                  <Inline text={p.question} />
                </p>
                <p className={styles.use}>
                  <Inline text={p.use} />
                </p>
              </li>
            ))}
          </ol>

          {/* every input runs into the result */}
          <svg
            className={styles.wires}
            viewBox="0 0 400 60"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {inputs.map((_, i) => {
              const x = 50 + i * 100;
              return (
                <path
                  key={i}
                  pathLength={1}
                  d={`M${x} 0 C ${x} 34, 200 26, 200 60`}
                  style={{ ["--i" as string]: i } as CSSProperties}
                />
              );
            })}
          </svg>

          {result && (
            <div className={styles.result}>
              <span className={styles.resultIcon}>
                <Icon name="shield" />
              </span>
              <div>
                <h3 className={styles.resultName}>{result.name}</h3>
                <p className={styles.resultQuestion}>
                  <Inline text={result.question} />
                </p>
                <p className={styles.resultUse}>
                  <Inline text={result.use} />
                </p>
              </div>
            </div>
          )}

          {terms.length > 0 && (
            <p className={styles.sum} aria-label={`${sum[0]} leads to ${sum[1]}`}>
              {terms.map((t, i) => (
                <span key={t} className={styles.sumTerm}>
                  {i > 0 && <i>+</i>}
                  {t}
                </span>
              ))}
              <span className={styles.sumArrow}>→</span>
              <span className={styles.sumResult}>{sum[1]}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
