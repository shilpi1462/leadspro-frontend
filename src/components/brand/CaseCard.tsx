import Image from "next/image";
import type { Block } from "@/lib/blocks";
import type { Picture } from "@/data/images";
import { Chain, Copy, ArrowButton } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import c from "./CaseCard.module.css";

interface CaseCardProps {
  id: string;
  kind: string;
  name: string;
  blocks: Block[];
  picture: Picture;
  cta: { label: string; href: string };
}

export function CaseCard({ id, kind, name, blocks, picture, cta }: CaseCardProps) {
  const flowAt = blocks.findIndex((x) => x.type === "flow");
  const story = flowAt === -1 ? blocks.slice(0, 3) : blocks.slice(0, flowAt);
  const flow = flowAt === -1 ? null : (blocks[flowAt] as Extract<Block, { type: "flow" }>);
  const rest = (flowAt === -1 ? blocks.slice(3) : blocks.slice(flowAt + 1)).filter(
    (x) => x.type !== "note",
  );
  const note = blocks.find((x) => x.type === "note");

  return (
    <section id={id} className={b.spaceBottom}>
      <Rise className={`${b.medium} ${c.content}`}>
        <div {...item(0, c.top)}>
          <span className={b.preTitle}>{kind}</span>
          <h2 className={`${b.display} ${b.h2} ${b.center}`}>
            <span className={b.srOnly}>{kind}: </span>
            {name}
          </h2>
        </div>
        <div {...item(1, c.slide)}>
          <div className={c.left}>
            <div className={c.imageItem}>
              <Image
                src={picture.src}
                alt={picture.alt}
                fill
                sizes="(min-width: 768px) 40vw, 90vw"
                className={c.image}
              />
            </div>
          </div>
          <div className={c.right}>
            <div className={c.info}>
              <div className={c.header}>
                <h3 className={c.cardTitle}>{name}</h3>
                <p className={c.meta}>
                  {kind}
                  <i aria-hidden="true" />
                  Illustrative
                </p>
              </div>
              <Copy blocks={story} className={c.story} />
              {flow && <Chain steps={flow.steps} sep={flow.sep} />}
            </div>
          </div>
        </div>
        <div {...item(2, c.bottom)}>
          <Copy blocks={rest} className={c.restCopy} />
          {note && note.type === "note" && <p className={c.note}>{note.text}</p>}
          <ArrowButton href={cta.href} label={cta.label} />
        </div>
      </Rise>
    </section>
  );
}
