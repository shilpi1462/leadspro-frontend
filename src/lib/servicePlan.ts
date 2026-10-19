import { parseBlocks, splitLead, type Block } from "./blocks";
import { chapterId, type Chapter } from "./content";

export interface Part {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Row {
  id: string;
  num: string;
  title: string;
  lead: string | null;
  blocks: Block[];
}

export type Section =
  | { kind: "overview"; part: Part }
  | { kind: "checklist"; part: Part; before: Block[]; list: string[]; after: Block[] }
  | { kind: "numbered"; part: Part; lead: Block[]; rows: Row[] }
  | {
      kind: "stack";
      part: Part;
      lead: Block[];
      cards: { label: string; text: string }[];
      rest: Block[];
    }
  | { kind: "compare"; part: Part; tone: "dark" | "light" }
  | { kind: "industries"; part: Part; before: Block[]; list: string[]; after: Block[] }
  | { kind: "case"; part: Part }
  | { kind: "split"; part: Part };

const pad = (n: number) => String(n).padStart(2, "0");

const NEW_TOPIC =
  /^(The |How |Why |What |When |Can |Does |Is |Should |Which |Industries|Goodfaith)|Example|Search Everywhere|\bvs\b/i;
const NUMBERED = /^(\d+)\.\s+/;

const has = (blocks: Block[], type: Block["type"]) => blocks.some((b) => b.type === type);
const count = (blocks: Block[], type: Block["type"]) =>
  blocks.filter((b) => b.type === type).length;

function toRow(title: string, blocks: Block[], index: number): Row {
  const [first, ...rest] = blocks;
  const lead = first?.type === "p" ? first.text : null;
  return {
    id: chapterId(title),
    num: pad(index + 1),
    title: title.replace(NUMBERED, ""),
    lead,
    blocks: lead ? rest : blocks,
  };
}

/** Splits blocks on their H3s: [blocks before the first H3, [{title, blocks}...]] */
function splitOnH3(blocks: Block[]) {
  const lead: Block[] = [];
  const groups: { title: string; blocks: Block[] }[] = [];
  for (const block of blocks) {
    if (block.type === "h3") groups.push({ title: block.text, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(block);
    else lead.push(block);
  }
  return { lead, groups };
}

function firstList(blocks: Block[], min: number) {
  const at = blocks.findIndex((b) => b.type === "ul" && b.items.length >= min);
  if (at === -1) return null;
  const list = blocks[at] as Extract<Block, { type: "ul" }>;
  return { before: blocks.slice(0, at), list: list.items, after: blocks.slice(at + 1) };
}

export function planService(chapters: Chapter[]): Section[] {
  const parts: Part[] = chapters.map((c) => ({
    id: c.id,
    title: c.title,
    blocks: parseBlocks(c.body),
  }));
  const sections: Section[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const { blocks, title } = part;

    // "What Is Included..." + the chapters that describe each included item.
    if (/^What Is Included/i.test(title)) {
      const { lead, groups } = splitOnH3(blocks);
      const items = groups.map((g) => ({ title: g.title, blocks: g.blocks }));
      while (
        i + 1 < parts.length &&
        !NEW_TOPIC.test(parts[i + 1].title) &&
        !has(parts[i + 1].blocks, "table")
      ) {
        i++;
        items.push({ title: parts[i].title, blocks: parts[i].blocks });
      }
      if (items.length) {
        sections.push({
          kind: "numbered",
          part,
          lead,
          rows: items.map((it, k) => toRow(it.title, it.blocks, k)),
        });
        continue;
      }
    }

    // A framework chapter whose steps continue as "2. ...", "3. ..." chapters.
    if (i + 1 < parts.length && NUMBERED.test(parts[i + 1].title) && !NUMBERED.test(title)) {
      const at = blocks.findIndex((b) => b.type === "ol" && splitLead(b.items[0]));
      const lead = at === -1 ? blocks : blocks.slice(0, at);
      const items: { title: string; blocks: Block[] }[] = [];
      if (at !== -1) {
        const ol = blocks[at] as Extract<Block, { type: "ol" }>;
        const first = splitLead(ol.items[0])!;
        const extra: Block[] = ol.items.slice(1).length
          ? [{ type: "ol", items: ol.items.slice(1), start: ol.start + 1 }]
          : [];
        items.push({
          title: first.label,
          blocks: [
            ...(first.text ? [{ type: "p" as const, text: first.text }] : []),
            ...extra,
            ...blocks.slice(at + 1),
          ],
        });
      }
      while (i + 1 < parts.length && NUMBERED.test(parts[i + 1].title)) {
        i++;
        items.push({ title: parts[i].title, blocks: parts[i].blocks });
      }
      sections.push({
        kind: "numbered",
        part,
        lead,
        rows: items.map((it, k) => toRow(it.title, it.blocks, k)),
      });
      continue;
    }

    const tables = count(blocks, "table");

    if (tables && /^Why\b.*Goodfaith/i.test(title)) {
      sections.push({ kind: "compare", part, tone: "dark" });
      continue;
    }

    if (/^Industries/i.test(title)) {
      const found = firstList(blocks, 3);
      if (found) {
        sections.push({ kind: "industries", part, ...found });
        continue;
      }
    }

    // "**1. Discoverability**, ..." lists read as a set of cards.
    const framework = blocks.findIndex(
      (b) =>
        b.type === "ul" &&
        b.items.length >= 4 &&
        b.items.filter((it) => splitLead(it)).length >= b.items.length * 0.8,
    );
    if (framework !== -1 && !tables) {
      const ul = blocks[framework] as Extract<Block, { type: "ul" }>;
      const cards = ul.items.map(
        (it) => splitLead(it) ?? { label: it.replace(/\*\*/g, ""), text: "" },
      );
      sections.push({
        kind: "stack",
        part,
        lead: blocks.slice(0, framework),
        cards,
        rest: blocks.slice(framework + 1),
      });
      continue;
    }

    if (/Example/i.test(title)) {
      sections.push({ kind: "case", part });
      continue;
    }

    if (tables) {
      sections.push({ kind: "compare", part, tone: "light" });
      continue;
    }

    if (sections.length === 0) {
      sections.push({ kind: "overview", part });
      continue;
    }

    const heavy = has(blocks, "h3") || has(blocks, "finding") || has(blocks, "example");
    const list = !heavy && count(blocks, "p") <= 7 ? firstList(blocks, 5) : null;
    if (list) {
      sections.push({ kind: "checklist", part, ...list });
      continue;
    }

    sections.push({ kind: "split", part });
  }

  return sections;
}
