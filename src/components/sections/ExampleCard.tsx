import Image from "next/image";
import type { ReactNode } from "react";
import type { Block } from "@/lib/blocks";
import type { Picture } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "./Prose";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./ExampleCard.module.css";

interface ExampleCardProps {
  label?: string;
  title: ReactNode;
  blocks: Block[];
  picture: Picture;
  cta?: { label: string; href: string };
  id?: string;
}

export function ExampleCard({ label, title, blocks, picture, cta, id }: ExampleCardProps) {
  const at = blocks.findIndex((b) => b.type === "ul" && b.items.every((it) => it.length <= 40));
  const pills = at === -1 ? [] : (blocks[at] as Extract<Block, { type: "ul" }>).items;
  const rest = at === -1 ? blocks : [...blocks.slice(0, at), ...blocks.slice(at + 1)];
  const lead = rest.slice(0, at === -1 ? 2 : at);
  const tail = rest.slice(lead.length);

  return (
    <section className={`${kit.section} ${kit.white}`} id={id}>
      <div className="container">
        <Reveal className={styles.card}>
          <div className={styles.copy}>
            {label && <span className={`${kit.script} ${styles.label}`}>{label}</span>}
            <h2 className={`${kit.h2} ${styles.title}`}>{title}</h2>
            <Prose blocks={lead} />
            {pills.length > 0 && (
              <ul className={styles.pills}>
                {pills.map((p, i) => (
                  <li key={i}>{p.replace(/\*\*/g, "")}</li>
                ))}
              </ul>
            )}
            <Prose blocks={tail} />
            {cta && (
              <Pill href={cta.href} tone="ghost" className={styles.cta}>
                {cta.label}
              </Pill>
            )}
          </div>
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.glow} />
            <Image
              src={picture.src}
              alt=""
              width={picture.width}
              height={picture.height}
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
