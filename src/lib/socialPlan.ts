import { parseBlocks, splitLead, type Block } from "./blocks";
import type { Chapter } from "./content";
import type { SocialPageConfig, ScreenKind } from "@/data/social";

export interface Part {
  id: string;
  title: string;
  blocks: Block[];
}

export interface Feature extends Part {
  /** Items of "What Is Included" are H3s on the page; standalone chapters stay H2s. */
  level: 2 | 3;
  screen: ScreenKind;
  label: string;
  /** The longest list in the copy, for the phone screen. */
  list: string[];
  /** Flow chains in the copy (the publishing pipeline, the content mix). */
  flows: string[][];
}

export interface WallCard {
  text: string;
  label?: string;
}

export interface Wall extends Part {
  before: Block[];
  cards: WallCard[];
  framework: { title: string; steps: string[] } | null;
  after: Block[];
}

export interface Compare extends Part {
  head: string[];
  rows: string[][];
  after: Block[];
}

export interface SocialPlan {
  included: Part | null;
  features: Feature[];
  wall: Wall | null;
  compare: Compare | null;
  faqs: Part[];
  rest: Part[];
}

const DEFINITION = /^\*{0,2}([A-Z][\w-]*(?: [A-Z][\w-]*)?)\*{0,2}:\s+(.+)$/;

function longestList(blocks: Block[]) {
  return blocks.reduce<string[]>(
    (best, b) => (b.type === "ul" && b.items.length > best.length ? b.items : best),
    [],
  );
}

function wallOf(part: Part): Wall {
  const { blocks } = part;
  const h3 = blocks.findIndex((b) => b.type === "h3");
  const head = h3 === -1 ? blocks : blocks.slice(0, h3);
  const tail = h3 === -1 ? [] : blocks.slice(h3 + 1);

  // "...we look for opportunities to show:" + a short list to one card per item.
  const showAt = head.findIndex((b) => b.type === "ul");
  const show = showAt === -1 ? [] : (head[showAt] as Extract<Block, { type: "ul" }>).items;
  const before = head.filter((_, i) => i !== showAt);

  const flow = tail.find((b): b is Extract<Block, { type: "flow" }> => b.type === "flow");
  const steps = flow?.steps ?? [];
  const defs = new Map<string, string>();
  const used = new Set<Block>();
  if (flow) used.add(flow);
  for (const b of tail) {
    if (b.type === "ul") {
      const leads = b.items.map(splitLead);
      if (leads.every((l) => l && steps.includes(l.label))) {
        leads.forEach((l) => defs.set(l!.label, l!.text));
        used.add(b);
      }
    } else if (b.type === "p") {
      const m = b.text.match(DEFINITION);
      if (m && steps.includes(m[1])) {
        defs.set(m[1], m[2]);
        used.add(b);
      }
    }
  }

  const cards: WallCard[] = [
    ...show.map((text) => ({ text })),
    ...steps.map((step) => ({ label: step, text: defs.get(step) ?? step })),
  ];

  return {
    ...part,
    before,
    cards,
    framework:
      h3 === -1 ? null : { title: (blocks[h3] as Extract<Block, { type: "h3" }>).text, steps },
    after: tail.filter((b) => !used.has(b)),
  };
}

export function planSocial(chapters: Chapter[], config: SocialPageConfig): SocialPlan {
  const parts: Part[] = chapters.map((c) => ({
    id: c.id,
    title: c.title,
    blocks: parseBlocks(c.body),
  }));
  const used = new Set<string>();

  const included = parts.find((p) => /^What Is Included/i.test(p.title)) ?? null;
  const items: (Part & { level: 2 | 3 })[] = [];
  if (included) {
    let current: (Part & { level: 3 }) | null = null;
    const lead: Block[] = [];
    for (const b of included.blocks) {
      if (b.type === "h3") {
        current = { id: `${included.id}-${items.length + 1}`, title: b.text, blocks: [], level: 3 };
        items.push(current);
      } else if (current) current.blocks.push(b);
      else lead.push(b);
    }
    included.blocks = lead;
    used.add(included.id);
  }
  for (const part of parts) if (part !== included) items.push({ ...part, level: 2 });

  const features: Feature[] = [];
  for (const f of config.features) {
    const item = items.find((it) => f.title.test(it.title) && !used.has(it.id));
    if (!item) continue;
    used.add(item.id);
    features.push({
      ...item,
      screen: f.screen,
      label: f.label,
      list: longestList(item.blocks),
      flows: item.blocks
        .filter((b): b is Extract<Block, { type: "flow" }> => b.type === "flow")
        .map((b) => b.steps),
    });
  }

  const wallPart = parts.find((p) => !used.has(p.id) && /Field Observation/i.test(p.title));
  if (wallPart) used.add(wallPart.id);

  let compare: Compare | null = null;
  const comparePart = parts.find(
    (p) => !used.has(p.id) && p.blocks.some((b) => b.type === "table"),
  );
  if (comparePart) {
    used.add(comparePart.id);
    const at = comparePart.blocks.findIndex((b) => b.type === "table");
    const table = comparePart.blocks[at] as Extract<Block, { type: "table" }>;
    compare = {
      ...comparePart,
      head: table.head,
      rows: table.rows,
      after: comparePart.blocks.slice(at + 1),
    };
  }

  const faqs = parts.filter((p) => !used.has(p.id) && p.title.trim().endsWith("?"));
  faqs.forEach((p) => used.add(p.id));

  return {
    included,
    features,
    wall: wallPart ? wallOf(wallPart) : null,
    compare,
    faqs,
    rest: parts.filter((p) => !used.has(p.id)),
  };
}
