"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import styles from "./AiChatDemo.module.css";

interface Demo {
  app: string;
  searching: string;
  answer: string;
  listLabel: string;
  pick: { name: string; meta: string; badge: string; sources: string[] };
  caption: string;
}

type Phase = "idle" | "typing" | "sent" | "searching" | "answering" | "results";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function AiChatDemo({
  question,
  demo,
  className,
}: {
  question: string;
  demo: Demo;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = demo.answer.split(" ");
  // Server render shows the finished conversation, so the phone is never empty without JS.
  const [phase, setPhase] = useState<Phase>("results");
  const [typed, setTyped] = useState(question.length);
  const [shown, setShown] = useState(words.length);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let run = 0;
    const reset = () => {
      setPhase("idle");
      setTyped(0);
      setShown(0);
    };

    const play = async (id: number) => {
      const alive = () => run === id;
      while (alive()) {
        reset();
        await wait(700);
        setPhase("typing");
        for (let i = 1; i <= question.length && alive(); i++) {
          setTyped(i);
          await wait(question[i - 1] === " " ? 60 : 34);
        }
        await wait(550);
        if (!alive()) return;
        setPhase("sent");
        await wait(650);
        if (!alive()) return;
        setPhase("searching");
        await wait(1700);
        if (!alive()) return;
        setPhase("answering");
        for (let w = 1; w <= words.length && alive(); w++) {
          setShown(w);
          await wait(48);
        }
        await wait(350);
        if (!alive()) return;
        setPhase("results");
        await wait(5600);
      }
    };

    reset();
    const io = new IntersectionObserver(
      ([entry]) => {
        run++;
        if (entry.isIntersecting) play(run);
        else reset();
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      run++;
      io.disconnect();
    };
  }, [question, words.length]);

  const draft = phase === "typing" || phase === "idle" ? question.slice(0, typed) : "";
  const asked = phase !== "idle" && phase !== "typing";
  const searched = phase === "answering" || phase === "results";

  return (
    <figure ref={ref} className={[styles.figure, className].filter(Boolean).join(" ")}>
      <PhoneFrame className={styles.phone}>
        <div className={styles.app} aria-hidden="true">
          <div className={styles.bar}>
            <svg width="20" height="14" viewBox="0 0 20 14">
              <path
                d="M1 3h18M1 11h11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles.title}>
              {demo.app}
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path
                  d="M2.5 4l2.5 2.5L7.5 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M9 3H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                stroke="currentColor"
                strokeWidth="1.7"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M14.5 2.5l3 3L10 13H7v-3z"
                stroke="currentColor"
                strokeWidth="1.7"
                fill="none"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.chat}>
            {asked && <p className={styles.user}>{question}</p>}

            {phase === "searching" && (
              <p className={styles.searching}>
                <Globe />
                <span className={styles.shimmer}>{demo.searching}</span>
              </p>
            )}

            {searched && (
              <div className={styles.answer}>
                <p className={styles.searched}>
                  <Globe />
                  {demo.pick.sources.length} sources
                </p>
                <p className={styles.text}>{words.slice(0, shown).join(" ")}</p>
                {phase === "results" && (
                  <div className={styles.list}>
                    <span className={styles.listLabel}>{demo.listLabel}</span>
                    <div className={styles.pick}>
                      <span className={styles.rank}>1</span>
                      <span className={styles.logo}>{demo.pick.name.charAt(0)}</span>
                      <span className={styles.pickBody}>
                        <span className={styles.pickName}>
                          <strong>{demo.pick.name}</strong>
                          <span className={styles.badge}>{demo.pick.badge}</span>
                        </span>
                        <span className={styles.meta}>{demo.pick.meta}</span>
                        <span className={styles.sources}>
                          {demo.pick.sources.map((s) => (
                            <span key={s}>{s}</span>
                          ))}
                        </span>
                      </span>
                    </div>
                    {[2, 3].map((n) => (
                      <div key={n} className={styles.other} style={{ ["--n" as string]: n }}>
                        <span className={styles.rank}>{n}</span>
                        <span className={styles.ghostLogo} />
                        <span className={styles.ghostLines}>
                          <span />
                          <span />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.composer}>
            <span className={styles.plus}>+</span>
            <span className={`${styles.input} ${draft ? "" : styles.placeholder}`}>
              <span>
                {draft || "Ask anything"}
                {phase === "typing" && <span className={styles.caret} />}
              </span>
            </span>
            <span className={`${styles.send} ${draft ? styles.sendReady : ""}`}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <path
                  d="M7 12V2M2.5 6.5L7 2l4.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </PhoneFrame>
      <figcaption className={styles.caption}>
        <span className="sr-only">
          {question} {demo.answer} {demo.listLabel}: {demo.pick.name}, {demo.pick.meta}.{" "}
        </span>
        {demo.caption}
      </figcaption>
    </figure>
  );
}

function Globe() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <path
        d="M1 6h10M6 1c1.6 1.4 2.4 3.1 2.4 5S7.6 9.6 6 11C4.4 9.6 3.6 7.9 3.6 6S4.4 2.4 6 1z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="none"
      />
    </svg>
  );
}
