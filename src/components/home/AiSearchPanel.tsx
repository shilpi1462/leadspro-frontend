"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./AiSearchPanel.module.css";

interface FanoutCopy {
  intents: { key: string; text: string }[];
  queries: { kind: string; text: string }[];
  sources: string[];
  caption: string;
}

interface Answer {
  text: string;
  pick: { name: string; meta: string; sources: string[] };
}

interface AiSearchPanelProps {
  label: string;
  /** "A to B to C" steps, one per stage of the animation. */
  steps: string;
  question: string;
  fanout: FanoutCopy;
  answer: Answer;
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* Which way the card faces. "turned" is the second half-turn, back round to the front, so the
   card always spins the same way; resetting it to "front" afterwards is a full turn, no jump. */
type Side = "front" | "back" | "turned";

/* How far the back has got: 1 intent read, 2 fanned out, 3 sources pulled, 4 ranked, 5 writing. */
type Stage = 0 | 1 | 2 | 3 | 4 | 5;

const HOLD = [0, 1500, 2000, 2100, 1600, 800];

export function AiSearchPanel({ label, steps, question, fanout, answer }: AiSearchPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const list = steps
    .split("→")
    .map((s) => s.trim())
    .filter(Boolean);
  const words = answer.text.split(" ");

  // The server render shows the finished answer, so the panel reads fine without scripting.
  const [side, setSide] = useState<Side>("front");
  const [stage, setStage] = useState<Stage>(4);
  const [answering, setAnswering] = useState(true);
  const [typed, setTyped] = useState(question.length);
  const [sent, setSent] = useState(false);
  const [shown, setShown] = useState(words.length);
  const [picked, setPicked] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let run = 0;

    const play = async (id: number) => {
      const alive = () => run === id;
      while (alive()) {
        // back to a blank question; the back is facing away, so it can reset unseen
        setSide("front");
        setAnswering(false);
        setStage(0);
        setTyped(0);
        setSent(false);
        setShown(0);
        setPicked(false);
        setClearing(false);
        setActive(0);
        await wait(600);
        for (let i = 1; i <= question.length && alive(); i++) {
          setTyped(i);
          await wait(question[i - 1] === " " ? 40 : 22);
        }
        await wait(450);
        if (!alive()) return;
        setSent(true);
        await wait(380);
        if (!alive()) return;
        setSide("back");
        await wait(1000);
        for (const next of [1, 2, 3, 4, 5] as Stage[]) {
          if (!alive()) return;
          setStage(next);
          setActive(Math.min(next, 4));
          await wait(HOLD[next]);
        }
        if (!alive()) return;
        // the front swaps to the answer view while it is still facing away, then turns back
        setAnswering(true);
        setActive(5);
        setSide("turned");
        await wait(1000);
        for (let w = 1; w <= words.length && alive(); w++) {
          setShown(w);
          await wait(38);
        }
        await wait(250);
        if (!alive()) return;
        setPicked(true);
        await wait(3400);
        if (!alive()) return;
        setActive(-1);
        setClearing(true);
        await wait(450);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        run += 1;
        if (entry.isIntersecting) play(run);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      run += 1;
      io.disconnect();
    };
  }, [question, words.length]);

  const cls = (...c: (string | false)[]) => c.filter(Boolean).join(" ");
  const reached = (s: Stage) => stage >= s;

  return (
    <div ref={ref} className={styles.panel}>
      <span className={styles.label}>{label}</span>

      <div className={styles.stage} aria-hidden="true">
        <div
          className={cls(
            styles.flipper,
            side === "back" && styles.toBack,
            side === "turned" && styles.toFront,
          )}
        >
          {/* Front: the question, and later the answer */}
          <div
            className={cls(
              styles.face,
              styles.front,
              answering && styles.answering,
              clearing && styles.clearing,
            )}
          >
            <div className={styles.frontTop}>
              <span className={styles.chip}>
                <Spark />
                {answering ? "AI answer" : "Customer asks"}
              </span>
              <span className={styles.mode}>
                {answering
                  ? `${fanout.queries.length} searches · ${fanout.queries.length * 3} sources`
                  : "AI search"}
              </span>
            </div>

            {answering ? (
              <div className={styles.thread}>
                <p className={styles.bubble}>{question}</p>
                <p className={styles.reply}>
                  <span className={styles.replyMark}>
                    <Spark />
                  </span>
                  <span>
                    {words.slice(0, shown).join(" ")}
                    {shown < words.length && <span className={styles.caret} />}
                  </span>
                </p>
                <div className={cls(styles.pick, picked && styles.pickIn)}>
                  <span className={styles.pickMark}>{answer.pick.name.charAt(0)}</span>
                  <span className={styles.pickText}>
                    <b>{answer.pick.name}</b>
                    <small>{answer.pick.meta}</small>
                  </span>
                  <span className={styles.cited}>Cited</span>
                  <span className={styles.pickSources}>
                    {answer.pick.sources.map((s) => (
                      <i key={s}>{s}</i>
                    ))}
                  </span>
                </div>
              </div>
            ) : (
              <p className={styles.question}>
                {question.slice(0, typed)}
                <span className={styles.caret} />
              </p>
            )}

            <div className={styles.composer}>
              <span className={styles.plus}>+</span>
              <span className={styles.mic}>
                <Mic />
              </span>
              <span
                className={cls(
                  styles.send,
                  !answering && typed === question.length && styles.ready,
                  sent && !answering && styles.pressed,
                )}
              >
                <Arrow />
              </span>
            </div>
          </div>

          {/* Back: the fan-out at work */}
          <div
            className={cls(
              styles.face,
              styles.back,
              reached(1) && styles.s1,
              reached(2) && styles.s2,
              reached(3) && styles.s3,
              reached(4) && styles.s4,
              reached(5) && styles.s5,
            )}
          >
            <div className={styles.backTop}>
              <span className={styles.live}>
                <i />
                Query fan-out
              </span>
              <span className={styles.count}>
                {reached(2) ? fanout.queries.length : 0} searches ·{" "}
                {reached(3) ? fanout.queries.length * 3 : 0} sources
              </span>
            </div>

            {/* 150 x 100 is roughly the stage's own shape, so the wires barely stretch; x is % x 1.5 */}
            <svg className={styles.wires} viewBox="0 0 150 100" preserveAspectRatio="none">
              {fanout.queries.map((_, i) => {
                const y = 22 + i * 12.6;
                return (
                  <g key={i} style={{ ["--n" as string]: i } as CSSProperties}>
                    <path
                      className={styles.out}
                      pathLength={1}
                      d={`M37.5 55 C 43 55, 41 ${y}, 46.5 ${y}`}
                    />
                    <path
                      className={styles.in}
                      pathLength={1}
                      d={`M109.5 ${y} C 113.5 ${y}, 111.5 47, 115.5 47`}
                    />
                  </g>
                );
              })}
            </svg>

            <div className={styles.origin}>
              <span className={styles.originHead}>
                <Spark />
                Question
              </span>
              <p>{question}</p>
              <ul className={styles.intents}>
                {fanout.intents.map((t, i) => (
                  <li key={t.key} style={{ ["--n" as string]: i } as CSSProperties}>
                    <b>{t.key}</b>
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>

            <ol className={styles.queries}>
              {fanout.queries.map((q, i) => (
                <li
                  key={q.text}
                  style={
                    {
                      ["--n" as string]: i,
                      ["--c" as string]: i % 2,
                      ["--r" as string]: Math.floor(i / 2),
                    } as CSSProperties
                  }
                >
                  <span className={styles.kind}>{q.kind}</span>
                  <span className={styles.qText}>{q.text}</span>
                  <span className={styles.scan}>
                    <i />
                  </span>
                  <span className={styles.found}>+3</span>
                </li>
              ))}
            </ol>

            <div className={styles.merge}>
              <span className={styles.mergeHead}>Sources</span>
              <ol className={styles.sources}>
                {fanout.sources.map((s, i) => (
                  <li
                    key={s}
                    className={i === 0 ? styles.top : undefined}
                    style={{ ["--n" as string]: i } as CSSProperties}
                  >
                    <span className={styles.rank}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <span className={styles.writing}>
              <i />
              <i />
              <i />
              Writing the answer
            </span>
          </div>
        </div>
      </div>
      <p className={styles.caption}>{fanout.caption}</p>

      <ol className={styles.list} aria-label={label}>
        {list.map((step, i) => (
          <li key={step} className={cls(i === active && styles.current, active > i && styles.done)}>
            <span className={styles.n}>0{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Spark() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0l1.6 5.2L15 7l-5.4 1.8L8 14l-1.6-5.2L1 7l5.4-1.8z" />
    </svg>
  );
}

function Mic() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm-6-3a6 6 0 0 0 12 0m-6 6v3" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5m0 0-6 6m6-6 6 6" />
    </svg>
  );
}
