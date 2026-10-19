import { Fragment } from "react";
import { splitLead, type Block } from "@/lib/blocks";
import type { Section } from "@/lib/servicePlan";
import type { Picture } from "@/data/images";
import { Inline } from "@/components/service/Inline";
import { IconPanel } from "./IconPanel";
import { StepList } from "./StepList";
import { CardRow } from "./CardRow";
import { SearchList } from "./SearchList";
import { TextMosaic } from "./TextMosaic";
import { MediaBanner } from "./MediaBanner";
import { ExampleCard } from "./ExampleCard";
import { Chapter } from "./Chapter";
import { ProcessTimeline } from "./ProcessTimeline";
import { ScriptNote } from "./ScriptNote";
import { SpiralBook } from "./SpiralBook";
import { TrustFramework } from "./TrustFramework";
import { PublishCheck } from "./PublishCheck";
import { Prose } from "./Prose";
import { accent } from "./accent";
import kit from "./kit.module.css";

interface ChapterSectionsProps {
  sections: Section[];
  /** Large photos, handed out in order and reused when they run out. */
  photos: Picture[];
  /** Photos the step list swaps between, one per row. */
  stepPhotos: Picture[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** The page's own sections: Content Marketing turns its included services into a notebook. */
  slug?: string;
}

const paragraphs = (blocks: Block[]) =>
  blocks.filter((b): b is Extract<Block, { type: "p" }> => b.type === "p").map((b) => b.text);

/** A list of short lines (search phrases, industries) that reads best as the magnifier list. */
function shortList(blocks: Block[]) {
  const at = blocks.findIndex(
    (b) => b.type === "ul" && b.items.length >= 4 && b.items.every((it) => it.length <= 60),
  );
  if (at === -1) return null;
  return {
    before: blocks.slice(0, at),
    items: (blocks[at] as Extract<Block, { type: "ul" }>).items,
    after: blocks.slice(at + 1),
  };
}

/** A numbered "**Step** what happens" list: the chapter is a process, so it gets the timeline. */
function processSteps(blocks: Block[]) {
  const at = blocks.findIndex(
    (b) => b.type === "ol" && b.items.length >= 3 && b.items.every((it) => splitLead(it)),
  );
  if (at === -1) return null;
  const steps = (blocks[at] as Extract<Block, { type: "ol" }>).items.map((it) => splitLead(it)!);
  return { before: blocks.slice(0, at), steps, after: blocks.slice(at + 1) };
}

// Picks a section layout for each chapter (servicePlan has already sorted them by shape).
export function ChapterSections({
  sections,
  photos,
  stepPhotos,
  primary,
  secondary,
  slug,
}: ChapterSectionsProps) {
  let photoIndex = 0;
  const photo = () => photos[photoIndex++ % photos.length];
  const pics = (n: number) => Array.from({ length: n }, photo);
  const stepPhoto = (i: number) => stepPhotos[(i + 1) % stepPhotos.length];

  let lists = 0;
  let splits = 0;
  const renderSection = (section: Section) => {
    const { part } = section;
    const title = accent(part.title);
    switch (section.kind) {
      case "overview": {
        const found = shortList(part.blocks);
        if (found) {
          return (
            <SearchList
              key={part.id}
              id={part.id}
              title={title}
              items={found.items}
              picture={photo()}
              intro={<Prose blocks={found.before} />}
            >
              {found.after.length > 0 && <Prose blocks={found.after} />}
            </SearchList>
          );
        }
        return (
          <TextMosaic key={part.id} id={part.id} title={title} pictures={pics(3)} cta={primary}>
            <Prose blocks={part.blocks} />
          </TextMosaic>
        );
      }
      case "checklist": {
        const fits = section.list.length <= 8 && section.list.every((it) => it.length <= 70);
        if (fits && lists++ % 2 === 0) {
          return (
            <IconPanel
              key={part.id}
              id={part.id}
              title={title}
              intro={paragraphs(section.before).join(" ")}
              items={section.list.map((t) => ({ title: t.replace(/\*\*/g, "") }))}
              background={photo()}
            >
              {section.after.length > 0 && <Prose blocks={section.after} />}
            </IconPanel>
          );
        }
        return (
          <SearchList
            key={part.id}
            id={part.id}
            title={title}
            items={section.list}
            picture={photo()}
            icon="target"
            flip
            intro={<Prose blocks={section.before} />}
          >
            {section.after.length > 0 && <Prose blocks={section.after} />}
          </SearchList>
        );
      }
      case "numbered": {
        if (slug === "content-marketing" && /^What Is Included/i.test(part.title)) {
          return (
            <SpiralBook
              key={part.id}
              id={part.id}
              title={title}
              spreads={section.rows.map((row) => ({
                num: row.num,
                title: row.title,
                lead: row.lead ? (
                  <p>
                    <Inline text={row.lead} />
                  </p>
                ) : undefined,
                body: <Prose blocks={row.blocks} tone="light" />,
              }))}
            />
          );
        }
        const simple =
          section.rows.length <= 4 && section.rows.every((r) => r.lead && r.blocks.length === 0);
        if (simple) {
          return (
            <IconPanel
              key={part.id}
              id={part.id}
              title={title}
              intro={paragraphs(section.lead).join(" ")}
              items={section.rows.map((r) => ({ title: r.title, text: r.lead ?? undefined }))}
              background={photo()}
            />
          );
        }
        return (
          <section key={part.id} id={part.id} className={`${kit.section} ${kit.white}`}>
            <div className="container">
              <h2 className={`${kit.h2} ${kit.centre}`}>{title}</h2>
              {section.lead.length > 0 && (
                <Prose blocks={section.lead} tone="light" className={kit.intro} />
              )}
              <StepList
                steps={section.rows.map((row, i) => ({
                  num: row.num,
                  title: row.title,
                  picture: stepPhoto(i),
                  content: (
                    <Prose
                      blocks={
                        row.lead ? [{ type: "p", text: row.lead }, ...row.blocks] : row.blocks
                      }
                      tone="light"
                    />
                  ),
                }))}
              />
            </div>
          </section>
        );
      }
      case "stack":
        return (
          <CardRow
            key={part.id}
            id={part.id}
            title={title}
            intro={paragraphs(section.lead).join(" ") || undefined}
            cards={section.cards}
          >
            {section.rest.length > 0 && <Prose blocks={section.rest} />}
          </CardRow>
        );
      case "compare": {
        const at = part.blocks.findIndex((b) => b.type === "table");
        return (
          <Chapter
            key={part.id}
            id={part.id}
            title={title}
            intro={part.blocks.slice(0, Math.max(0, at))}
            blocks={part.blocks.slice(Math.max(0, at))}
            tone={section.tone === "dark" ? "dark" : "light"}
            wide
          />
        );
      }
      case "industries":
        return (
          <SearchList
            key={part.id}
            id={part.id}
            title={title}
            items={section.list}
            picture={photo()}
            icon="store"
            intro={<Prose blocks={section.before} />}
          >
            {section.after.length > 0 && <Prose blocks={section.after} />}
          </SearchList>
        );
      case "case": {
        const example =
          part.blocks.length === 1 && part.blocks[0].type === "example" ? part.blocks[0] : null;
        return (
          <ExampleCard
            key={part.id}
            id={part.id}
            label="Example"
            title={example ? example.title : part.title}
            blocks={example ? example.blocks : part.blocks}
            picture={photo()}
            cta={secondary ?? primary}
          />
        );
      }
      case "split": {
        // two chapters written as a framework and a checklist get drawn as one
        if (/E-E-A-T/.test(part.title) && part.blocks.some((b) => b.type === "h3")) {
          return (
            <TrustFramework key={part.id} id={part.id} title={part.title} blocks={part.blocks} />
          );
        }
        if (/^Who, How and Why/i.test(part.title)) {
          return (
            <PublishCheck key={part.id} id={part.id} title={part.title} blocks={part.blocks} />
          );
        }
        const process = processSteps(part.blocks);
        if (process) {
          return (
            <section key={part.id} id={part.id} className={`${kit.section} ${kit.dark}`}>
              <div className="container">
                <h2 className={`${kit.h2} ${kit.centre}`}>{title}</h2>
                {process.before.length > 0 && (
                  <Prose blocks={process.before} className={kit.intro} />
                )}
                <ProcessTimeline
                  note={<ScriptNote point="down-right">{"Step by step"}</ScriptNote>}
                  steps={process.steps.map((s) => ({
                    title: s.label,
                    content: (
                      <p>
                        <Inline text={s.text} />
                      </p>
                    ),
                  }))}
                />
                {process.after.length > 0 && <Prose blocks={process.after} className={kit.intro} />}
              </div>
            </section>
          );
        }
        // Short chapters take the media card; long ones need the room of a full-width chapter.
        const words = JSON.stringify(part.blocks).split(" ").length;
        const variant = words > 260 ? 2 : splits++ % 2;
        if (variant === 1) {
          return (
            <MediaBanner
              key={part.id}
              id={part.id}
              title={part.title}
              picture={photo()}
              cta={primary}
            >
              <Prose blocks={part.blocks} tone="light" />
            </MediaBanner>
          );
        }
        if (variant === 2) {
          return (
            <Chapter key={part.id} id={part.id} title={title} blocks={part.blocks} tone="light" />
          );
        }
        return (
          <TextMosaic
            key={part.id}
            id={part.id}
            title={title}
            pictures={pics(3)}
            flip={splits % 2 === 0}
          >
            <Prose blocks={part.blocks} />
          </TextMosaic>
        );
      }
    }
  };

  return (
    <>
      {sections.map((section, i) => (
        <Fragment key={i}>{renderSection(section)}</Fragment>
      ))}
    </>
  );
}
