export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[]; start: number }
  | { type: "quote"; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "flow"; steps: string[]; sep: string }
  | { type: "note"; text: string }
  | { type: "cta"; href: string; text: string }
  | { type: "finding"; title: string; blocks: Block[] }
  | { type: "example"; title: string; blocks: Block[] };

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`${name}="((?:[^"\\\\]|\\\\.)*)"`));
  return m ? m[1] : "";
};

export function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // <Finding title="..."> / <Example title="..."> wrap Markdown of their own.
    const wrapper = trimmed.match(/^<(Finding|Example)\b([^>]*)>$/);
    if (wrapper) {
      const name = wrapper[1];
      const end = lines.findIndex((l, k) => k > i && l.trim() === `</${name}>`);
      const inner = lines.slice(i + 1, end === -1 ? lines.length : end).join("\n");
      blocks.push({
        type: name === "Finding" ? "finding" : "example",
        title: attr(wrapper[2], "title"),
        blocks: parseBlocks(inner),
      });
      i = end === -1 ? lines.length : end + 1;
      continue;
    }

    const flow = trimmed.match(/^<Flow([^>]*)>([\s\S]*?)<\/Flow>$/);
    if (flow) {
      const sep = attr(flow[1], "sep") || "→";
      blocks.push({
        type: "flow",
        sep,
        steps: flow[2]
          .split(sep)
          .map((s) => s.trim())
          .filter(Boolean),
      });
      i++;
      continue;
    }

    const note = trimmed.match(/^<Note>([\s\S]*?)<\/Note>$/);
    if (note) {
      blocks.push({ type: "note", text: note[1].trim() });
      i++;
      continue;
    }

    const cta = trimmed.match(/^<Cta([^>]*)>([\s\S]*?)<\/Cta>$/);
    if (cta) {
      blocks.push({ type: "cta", href: attr(cta[1], "href"), text: cta[2].trim() });
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4).trim() });
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(lines[i++]);
      const [head, , ...body] = rows;
      blocks.push({ type: "table", head: cells(head), rows: body.map(cells) });
      continue;
    }

    if (/^[-*] /.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i].trim()))
        items.push(lines[i++].trim().slice(2).trim());
      blocks.push({ type: "ul", items });
      continue;
    }

    const ordered = trimmed.match(/^(\d+)\. /);
    if (ordered) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim()))
        items.push(lines[i++].trim().replace(/^\d+\. /, ""));
      blocks.push({ type: "ol", items, start: Number(ordered[1]) });
      continue;
    }

    if (trimmed.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">"))
        parts.push(lines[i++].trim().replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: parts.join(" ").trim() });
      continue;
    }

    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^([-*] |\d+\. |>|\||### |<)/.test(lines[i].trim())
    )
      para.push(lines[i++].trim());
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
    } else {
      // Unknown line on its own: keep it as copy rather than drop it.
      blocks.push({ type: "p", text: trimmed });
      i++;
    }
  }

  return blocks;
}

/** Plain text of a block tree, for counting and for checks. */
export function blockText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "ul":
        case "ol":
          return b.items.join(" ");
        case "table":
          return [...b.head, ...b.rows.flat()].join(" ");
        case "flow":
          return b.steps.join(" ");
        case "finding":
        case "example":
          return `${b.title} ${blockText(b.blocks)}`;
        default:
          return b.text;
      }
    })
    .join(" ");
}

/** "**1. Discoverability** (em dash) Can search engines..." becomes { label, text } */
export function splitLead(item: string): { label: string; text: string } | null {
  const m = item.match(/^\*\*(.+?)\*\*\s*(?:[—–:-]\s*)?(.*)$/);
  if (!m) return null;
  return { label: m[1].replace(/[:.]$/, "").trim(), text: m[2].trim() };
}
