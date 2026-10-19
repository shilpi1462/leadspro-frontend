import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "./Prose";
import { accent } from "./accent";
import kit from "./kit.module.css";
import styles from "./PublishCheck.module.css";

const ASK = /^(Who|How|Why)\b.*\?$/;

function read(blocks: Block[]) {
  const intro: Block[] = [];
  const checks: { word: string; question: string; detail: string }[] = [];
  let close: string | null = null;
  const rest: Block[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b.type === "p" && ASK.test(b.text) && blocks[i + 1]?.type === "p") {
      const next = blocks[i + 1] as Extract<Block, { type: "p" }>;
      checks.push({ word: b.text.split(" ")[0], question: b.text, detail: next.text });
      i++;
    } else if (!checks.length) {
      intro.push(b);
    } else if (!close && b.type === "p" && /matters most/i.test(b.text)) {
      close = b.text;
    } else {
      rest.push(b);
    }
  }
  return { intro, checks, close, rest };
}

export function PublishCheck({
  id,
  title,
  blocks,
}: {
  id: string;
  title: string;
  blocks: Block[];
}) {
  const { intro, checks, close, rest } = read(blocks);
  const most = close ? checks.findIndex((c) => close.startsWith(`The ${c.word}`)) : -1;

  return (
    <section id={id} className={`${kit.section} ${kit.light} ${styles.section}`}>
      <div className="container">
        <h2 className={`${kit.h2} ${kit.centre} ${styles.title}`}>{accent(title)}</h2>
        <Prose blocks={intro} tone="light" className={`${kit.intro} ${styles.intro}`} />

        <Reveal as="ol" className={styles.checks}>
          {checks.map((c, i) => (
            <li
              key={c.word}
              className={`${styles.check} ${i === most ? styles.most : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <span className={styles.word} aria-hidden="true">
                {c.word}
              </span>
              {i === most && close && <span className={styles.badge}>{close}</span>}
              <h3 className={styles.question}>{c.question}</h3>
              <p className={styles.detail}>
                <Inline text={c.detail} />
              </p>
              <span className={styles.box} aria-hidden="true">
                <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                  <path
                    d="M4.5 10.5l3.5 3.5 7.5-8"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Checked before we publish
              </span>
            </li>
          ))}
        </Reveal>

        {rest.length > 0 && (
          <div className={styles.rest}>
            <Prose blocks={rest} tone="light" />
          </div>
        )}
      </div>
    </section>
  );
}
