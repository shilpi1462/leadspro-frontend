import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { Prose } from "./Prose";
import kit from "./kit.module.css";
import styles from "./ResearchFinding.module.css";

const LESSON_HEAD = /what we learned|practical lesson|takeaway/i;
const LESSON_LINE = /^the practical lesson is:?$/i;
const CAVEAT = /do not claim|does not claim|not a claim|observed relationship|cannot claim/i;

interface Beat {
  blocks: Block[];
  caveat: boolean;
}

function split(blocks: Block[]) {
  let at = blocks.findIndex((b) => b.type === "h3" && LESSON_HEAD.test(b.text));
  let label = at !== -1 ? (blocks[at] as Extract<Block, { type: "h3" }>).text : "";
  if (at === -1) {
    at = blocks.findIndex((b) => b.type === "p" && LESSON_LINE.test(b.text));
    if (at !== -1) label = "The practical lesson";
  }
  const story = at === -1 ? blocks : blocks.slice(0, at);
  const lesson = at === -1 ? [] : blocks.slice(at + 1);

  // a paragraph starts a beat; lists, chains and quotes belong to the beat before them
  const beats: Beat[] = [];
  for (const b of story) {
    if (b.type === "p" || b.type === "h3" || beats.length === 0) {
      beats.push({ blocks: [b], caveat: b.type === "p" && CAVEAT.test(b.text) });
    } else {
      beats[beats.length - 1].blocks.push(b);
    }
  }
  return { beats, label, lesson };
}

export function ResearchFinding({ title, blocks }: { title: string; blocks: Block[] }) {
  const { beats, label, lesson } = split(blocks);
  const [lead, ...rest] = lesson;

  return (
    <aside className={styles.finding}>
      <div className={`${styles.inner} ${lead ? styles.split : ""}`}>
        <div className={styles.head}>
          <span className={styles.badge}>
            <Flask />
            Research finding
          </span>
          <span className={styles.source}>Goodfaith applied SEO research</span>
        </div>
        <h3 className={`${kit.h3} ${styles.title}`}>
          {title.replace(/^Goodfaith Research Finding:\s*/i, "")}
        </h3>

        <ol className={styles.story}>
          {beats.map((beat, i) => (
            <li key={i} className={beat.caveat ? styles.caveat : undefined}>
              <span className={styles.node} aria-hidden="true">
                {beat.caveat ? "!" : String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.beat}>
                {beat.caveat && <span className={styles.caveatLabel}>Honest note</span>}
                <Prose blocks={beat.blocks} tone="light" />
              </div>
            </li>
          ))}
        </ol>

        {lead && (
          <div className={styles.lesson}>
            <span className={`${kit.script} ${styles.lessonLabel}`}>{label}</span>
            {lead.type === "p" ? (
              <p className={styles.lessonLead}>
                <Inline text={lead.text} />
              </p>
            ) : (
              <Prose blocks={[lead]} />
            )}
            {rest.length > 0 && <Prose blocks={rest} className={styles.lessonRest} />}
          </div>
        )}
      </div>
    </aside>
  );
}

function Flask() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3h6M10 3v6.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 9.5V3" />
      <path d="M7.5 15h9" />
    </svg>
  );
}
