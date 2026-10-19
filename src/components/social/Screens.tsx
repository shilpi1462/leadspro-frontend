"use client";

import Image from "next/image";
import { useRef, type CSSProperties, type ReactNode, type RefObject } from "react";
import type { Picture } from "@/data/images";
import type { ScreenKind } from "@/data/social";
import { G, type Glyph } from "@/components/visuals/parts/glyphs";
import { useInView } from "@/lib/motion";
import { at, useScrollDriven } from "./scroll";
import sc from "./Screens.module.css";

interface ScreenProps {
  kind: ScreenKind;
  label: string;
  items: string[];
  thumbs: Picture[];
  /** Photo for the video editor frames. */
  photo: Picture;
  /** Caption burnt into the finished video. */
  caption: string;
  handle?: string;
  bio?: string;
}

const n = (i: number) => ({ ["--n" as string]: i }) as CSSProperties;

function Gear() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M12 2.5v3m0 13v3M2.5 12h3m13 0h3M5.3 5.3l2.1 2.1m9.2 9.2 2.1 2.1M5.3 18.7l2.1-2.1m9.2-9.2 2.1-2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS: [RegExp, Glyph][] = [
  [/watch/i, "play"],
  [/view/i, "eye"],
  [/share/i, "share"],
  [/save/i, "bookmark"],
  [/comment|messag/i, "comment"],
  [/profile/i, "user"],
  [/website|click/i, "globe"],
  [/enquir/i, "target"],
  [/colour|color/i, "palette"],
  [/typograph|logo/i, "spark"],
  [/visual/i, "eye"],
  [/tone|voice/i, "mic"],
  [/format/i, "layers"],
];
const iconFor = (text: string): Glyph => ICONS.find(([re]) => re.test(text))?.[1] ?? "check";

/** Bottom tab bar, the middle tab lit. */
function Nav({ active }: { active: number }) {
  const tabs: [Glyph, string][] = [
    ["spark", "Ideas"],
    ["play", "Create"],
    ["share", "Publish"],
  ];
  return (
    <nav className={sc.nav} aria-hidden="true">
      {tabs.map(([icon, name], i) => (
        <span key={name} className={i === active ? sc.navOn : undefined}>
          <G name={icon} />
          {name}
        </span>
      ))}
    </nav>
  );
}

export function FeatureScreen(props: ScreenProps) {
  const { kind, label } = props;
  const inView = useInView<HTMLDivElement>({ threshold: 0.2 });
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useScrollDriven<HTMLDivElement>(
    (progress) => {
      const el = scrollRef.current;
      if (el)
        el.style.transform = `translate3d(0, ${at(
          [
            [0, 0],
            [100, -30],
          ],
          progress * 100,
          (t) => t,
        ).toFixed(2)}%, 0)`;
    },
    { smoothing: 90 },
  );

  let body: ReactNode;
  let foot: ReactNode = <Nav active={1} />;
  switch (kind) {
    case "profile":
      body = <Profile {...props} scrollRef={scrollRef} />;
      foot = <span className={sc.cta}>Visit website</span>;
      break;
    case "ideas":
      body = <Ideas {...props} scrollRef={scrollRef} />;
      foot = <span className={sc.cta}>Add to plan</span>;
      break;
    case "editor":
      body = <Editor {...props} />;
      break;
    case "tiles":
      body = <Tiles {...props} />;
      foot = <Nav active={2} />;
      break;
    case "feed":
      body = <Feed {...props} />;
      foot = <Nav active={0} />;
      break;
  }

  return (
    <div ref={phoneRef} className={sc.wrap}>
      <div ref={inView} className={sc.phone}>
        <div className={sc.bar}>
          <span>{label}</span>
          <Gear />
        </div>
        <div className={sc.body}>{body}</div>
        {foot}
        <span className={sc.frame} aria-hidden="true" />
      </div>
    </div>
  );
}

type Inner = ScreenProps & { scrollRef?: RefObject<HTMLDivElement | null> };

function Profile({
  thumbs,
  handle = "yourbusiness",
  bio = "Waterproofing & drainage · Niagara Region",
  scrollRef,
}: Inner) {
  return (
    <div ref={scrollRef} className={sc.scroll}>
      <div className={sc.profile}>
        <span className={sc.avatar}>{handle.charAt(0).toUpperCase()}</span>
        <span className={sc.stats} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <b className={sc.handle}>{handle}</b>
      <p className={sc.bio}>{bio}</p>
      <div className={sc.actions}>
        <span className={sc.follow}>Follow</span>
        <span>Contact</span>
      </div>
      <div className={sc.highlights}>
        {["Work", "Tips", "Team", "FAQ"].map((h) => (
          <span key={h}>
            <i />
            {h}
          </span>
        ))}
      </div>
      <div className={sc.posts}>
        {thumbs.slice(0, 18).map((t, i) => (
          <span key={`${t.src}-${i}`}>
            <Image src={t.src} alt="" width={t.width} height={t.height} />
            {i % 4 === 0 && <G name="play" />}
          </span>
        ))}
      </div>
    </div>
  );
}

function Ideas({ items, thumbs, scrollRef }: Inner) {
  const list = [...items, ...items].slice(0, Math.max(10, items.length));
  return (
    <div ref={scrollRef} className={`${sc.scroll} ${sc.ideas}`}>
      {list.map((item, i) => {
        const t = thumbs[i % thumbs.length];
        return (
          <span key={`${item}-${i}`} className={sc.idea}>
            <Image src={t.src} alt="" width={t.width} height={t.height} />
            {item}
          </span>
        );
      })}
    </div>
  );
}

function Editor({ photo, caption }: Inner) {
  return (
    <div className={sc.stage}>
      <div className={sc.strip}>
        <span className={sc.clip}>
          <Image src={photo.src} alt="" width={photo.width} height={photo.height} />
          <small>Raw clip</small>
        </span>
        <span className={`${sc.clip} ${sc.working}`}>
          <Image src={photo.src} alt="" width={photo.width} height={photo.height} />
          <span className={sc.ring}>
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="17" />
              <circle cx="20" cy="20" r="17" pathLength="100" className={sc.ringArc} />
            </svg>
            <b>Captions</b>
          </span>
        </span>
        <span className={`${sc.clip} ${sc.done}`}>
          <Image src={photo.src} alt="" width={photo.width} height={photo.height} />
          <span className={sc.burnt}>{caption}</span>
        </span>
      </div>
    </div>
  );
}

function Tiles({ items }: Inner) {
  const list = items.slice(0, 8);
  return (
    <div className={sc.tiles}>
      {list.map((item, i) => {
        const on = i === list.length - 1;
        return (
          <span key={item} className={on ? sc.tileOn : undefined} style={n(i)}>
            <G name={iconFor(item)} />
            {item}
            {on && (
              <i className={sc.tick}>
                <G name="check" />
              </i>
            )}
          </span>
        );
      })}
    </div>
  );
}

function Feed({ items, thumbs }: Inner) {
  return (
    <div className={sc.feed}>
      <div className={sc.pan}>
        {items.slice(0, 6).map((row, r) => (
          <div key={row} className={sc.feedRow}>
            <b>{row}</b>
            <span>
              {Array.from({ length: 6 }, (_, i) => {
                const t = thumbs[(r * 3 + i) % thumbs.length];
                return (
                  <span key={i} className={sc.card}>
                    <Image src={t.src} alt="" width={t.width} height={t.height} />
                    <i aria-hidden="true">
                      <G name="heart" />
                    </i>
                  </span>
                );
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
