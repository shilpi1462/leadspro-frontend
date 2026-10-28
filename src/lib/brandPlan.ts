import { parseBlocks, splitLead, type Block } from "./blocks";
import type { Chapter } from "./content";
import type { BrandPageConfig } from "@/data/brand";

export interface Part {
  id: string;
  title: string;
  blocks: Block[];
}

export interface StackItem extends Part {
  level: 2 | 3;
}

export interface Table extends Part {
  head: string[];
  rows: string[][];
  before: Block[];
  after: Block[];
}

export interface BrandPlan {
  what: Part | null;
  why: Part | null;
  included: Part | null;
  stack: StackItem[];
  steps:
    | (Part & { lead: Block[]; steps: { label: string; text: string }[]; after: Block[] })
    | null;
  example: (Part & { name: string; kind: string }) | null;
  compare: Table | null;
  versus: Table | null;
  industries: (Part & { before: Block[]; list: string[]; after: Block[] }) | null;
  rest: Part[];
}

const NEW_TOPIC =
  /^(The |How |Why |What |When |Can |Does |Is |Should |Which |Industries|LeadsPro)|Example|\bvs\b/i;
const STEP = /^\d+\.\s*/;

function table(part: Part): Table {
  const at = part.blocks.findIndex((b) => b.type === "table");
  const t = part.blocks[at] as Extract<Block, { type: "table" }>;
  return {
    ...part,
    head: t.head,
    rows: t.rows,
    before: part.blocks.slice(0, at),
    after: part.blocks.slice(at + 1),
  };
}

export function planBrand(chapters: Chapter[], config: BrandPageConfig = {}): BrandPlan {
  const parts: Part[] = chapters.map((c) => ({
    id: c.id,
    title: c.title,
    blocks: parseBlocks(c.body),
  }));
  const used = new Set<string>();
  const take = (p: Part | undefined | null) => {
    if (p) used.add(p.id);
    return p ?? null;
  };

  // An <Example> inside another chapter (the positioning framework) becomes the case card.
  let example: BrandPlan["example"] = null;
  for (const part of parts) {
    const at = part.blocks.findIndex((b) => b.type === "example");
    if (at === -1) continue;
    const ex = part.blocks[at] as Extract<Block, { type: "example" }>;
    part.blocks = part.blocks.filter((_, i) => i !== at);
    example = { id: `${part.id}-example`, title: ex.title, blocks: ex.blocks, ...nameOf(ex.title) };
    break;
  }
  const exampleChapter = parts.find((p) => /Example/i.test(p.title));
  if (exampleChapter && !example) {
    take(exampleChapter);
    example = { ...exampleChapter, ...nameOf(exampleChapter.title) };
  }

  const what = take(parts.find((p) => /^What Is (?!Included)/i.test(p.title)));
  const why = take(parts.find((p) => /^Why (Does|Do)\b/i.test(p.title)));

  // "What Is Included": its H3s, then the chapters that carry on listing included services.
  const includedAt = parts.findIndex((p) => /^What Is Included/i.test(p.title));
  const included = includedAt === -1 ? null : take(parts[includedAt]);
  const stack: StackItem[] = [];
  if (included) {
    const lead: Block[] = [];
    let current: StackItem | null = null;
    for (const block of included.blocks) {
      if (block.type === "h3") {
        current = {
          id: `${included.id}-${stack.length + 1}`,
          title: block.text,
          blocks: [],
          level: 3,
        };
        stack.push(current);
      } else if (current) current.blocks.push(block);
      else lead.push(block);
    }
    included.blocks = lead;
    for (let i = includedAt + 1; i < parts.length; i++) {
      const p = parts[i];
      if (used.has(p.id) || NEW_TOPIC.test(p.title) || p.blocks.some((b) => b.type === "table"))
        break;
      stack.push({ ...p, level: 2 });
      used.add(p.id);
    }
  }
  for (const re of config.stackExtra ?? []) {
    const p = parts.find((x) => !used.has(x.id) && re.test(x.title));
    if (p) stack.push({ ...take(p)!, level: 2 });
  }

  // A framework: a list of "**1. Audience** (em dash) question" items.
  let steps: BrandPlan["steps"] = null;
  for (const p of parts) {
    if (used.has(p.id)) continue;
    const at = p.blocks.findIndex(
      (b) =>
        b.type === "ul" &&
        b.items.length >= 3 &&
        b.items.every((it) => splitLead(it) && STEP.test(splitLead(it)!.label)),
    );
    if (at === -1) continue;
    const items = (p.blocks[at] as Extract<Block, { type: "ul" }>).items.map((it) => {
      const lead = splitLead(it)!;
      return { label: lead.label.replace(STEP, ""), text: lead.text };
    });
    steps = {
      ...take(p)!,
      lead: p.blocks.slice(0, at),
      steps: items,
      after: p.blocks.slice(at + 1),
    };
    break;
  }

  const comparePart = parts.find(
    (p) =>
      !used.has(p.id) &&
      /^Why\b.*LeadsPro/i.test(p.title) &&
      p.blocks.some((b) => b.type === "table"),
  );
  const versusPart = parts.find(
    (p) => !used.has(p.id) && /\bvs\b/i.test(p.title) && p.blocks.some((b) => b.type === "table"),
  );
  const compare = comparePart ? table(take(comparePart)!) : null;
  const versus = versusPart ? table(take(versusPart)!) : null;

  let industries: BrandPlan["industries"] = null;
  const ind = parts.find((p) => !used.has(p.id) && /^Industries/i.test(p.title));
  if (ind) {
    const at = ind.blocks.findIndex((b) => b.type === "ul");
    if (at !== -1) {
      take(ind);
      industries = {
        ...ind,
        before: ind.blocks.slice(0, at),
        list: (ind.blocks[at] as Extract<Block, { type: "ul" }>).items,
        after: ind.blocks.slice(at + 1),
      };
    }
  }

  return {
    what,
    why,
    included,
    stack,
    steps,
    example,
    compare,
    versus,
    industries,
    rest: parts.filter((p) => !used.has(p.id)),
  };
}

/** "Branding Example: Home Renovation Company in Oakville" to kind + name. */
function nameOf(title: string) {
  const m = title.match(/^(.*?Example):\s*(.+)$/i);
  return m ? { kind: m[1], name: m[2] } : { kind: "Example", name: title };
}
