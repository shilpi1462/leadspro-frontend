import type { ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import { Inline } from "@/components/service/Inline";
import { G } from "@/components/visuals/parts/glyphs";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import p from "./Pinpoint.module.css";

const LOOKS = [p.pill, p.ban, p.mark];

function Lit({ text, look }: { text: string; look: number }) {
  const clean = text.replace(/\*\*/g, "");
  const at = clean.lastIndexOf(" ");
  const head = at === -1 ? "" : clean.slice(0, at + 1);
  const tail = at === -1 ? clean : clean.slice(at + 1);
  const cls = LOOKS[look % LOOKS.length];
  return (
    <>
      {head}
      <span className={cls}>
        {cls === p.ban && <G name="target" />}
        {tail}
      </span>
    </>
  );
}

export function Pinpoint({ id, title, blocks }: { id: string; title: string; blocks: Block[] }) {
  let look = 0;
  const lines: ReactNode[] = [];
  blocks.forEach((block, i) => {
    switch (block.type) {
      case "p":
        lines.push(
          <p key={i} className={p.line}>
            <Inline text={block.text} />
            {i === 0 && (
              <span className={p.deco} aria-hidden="true">
                <G name="eye" />
              </span>
            )}
          </p>,
        );
        break;
      case "quote":
        lines.push(
          <p key={i} className={p.line}>
            <span className={p.mark}>{block.text}</span>
          </p>,
        );
        break;
      case "ul":
      case "ol":
        if (block.items.every((it) => it.length <= 28)) {
          lines.push(
            <p key={i} className={`${p.line} ${p.run}`}>
              {block.items.map((it, k) => (
                <span key={it} className={LOOKS[k % LOOKS.length]}>
                  <Inline text={it} />
                </span>
              ))}
            </p>,
          );
        } else {
          block.items.forEach((it, k) =>
            lines.push(
              <p key={`${i}-${k}`} className={p.line}>
                <Lit text={it} look={look++} />
              </p>,
            ),
          );
        }
        break;
      case "flow":
        lines.push(
          <p key={i} className={`${p.line} ${p.run}`}>
            {block.steps.map((step, k) => (
              <span key={step} className={p.step}>
                {k > 0 && (
                  <span className={p.arrow} aria-hidden="true">
                    {block.sep === "→" ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14m-6-6 6 6-6 6" />
                      </svg>
                    ) : (
                      block.sep
                    )}
                  </span>
                )}
                {step}
              </span>
            ))}
          </p>,
        );
        break;
      default:
        break;
    }
  });

  return (
    <section id={id} className={b.space}>
      <Rise className={`${b.small} ${p.content}`}>
        <div {...item(0, p.pre)}>
          <div className={b.preTitle}>
            <h2>{title}</h2>
          </div>
        </div>
        {lines.map((line, i) => (
          <div key={i} {...item(i + 1)}>
            {line}
          </div>
        ))}
      </Rise>
    </section>
  );
}
