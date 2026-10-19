"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { CountNum } from "./CountNum";
import p from "./PhoneSlider.module.css";

export interface Slide {
  num: string;
  label: string;
  tag: string;
  text: string;
  note?: string;
  screen: ReactNode;
  /** The screen mixes reported figures with illustrative UI. */
  illustrative?: boolean;
  button: { label: string; href: string };
}

const INTERVAL = 7000;
const TRIGGER_OFFSET = 150;
const MIN_SCROLL = 100;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export function PhoneSlider({ title, slides }: { title: string; slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement | null>(null);
  const segments = useRef<(HTMLSpanElement | null)[]>([]);
  const held = useRef(false);
  const onScreen = useRef(false);
  const fly = useRef<{ measure: () => void; sync: () => void } | null>(null);
  const touchX = useRef(0);

  // Autoplay with the progress line; earlier slides' segments stay full.
  useEffect(() => {
    segments.current.forEach((seg, i) => {
      if (seg) seg.style.transform = `scaleX(${i < active ? 1 : 0})`;
    });
    fly.current?.measure();
    fly.current?.sync();
    if (slides.length < 2 || reduced()) return;
    let frame = 0;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      if (!held.current && onScreen.current) elapsed += now - last;
      last = now;
      const t = Math.min(elapsed / INTERVAL, 1);
      const seg = segments.current[active];
      if (seg) seg.style.transform = `scaleX(${t})`;
      if (t >= 1) setActive((a) => (a + 1) % slides.length);
      else frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, slides.length]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(([e]) => (onScreen.current = e.isIntersecting));
    io.observe(root);
    return () => io.disconnect();
  }, []);

  // The flying phone.
  useEffect(() => {
    const root = rootRef.current;
    const start = document.querySelector<HTMLElement>("[data-phone-fly-start]");
    if (!root || !start || reduced()) return;

    const floating = document.createElement("div");
    floating.className = p.fly;
    floating.setAttribute("aria-hidden", "true");
    floating.inert = true;
    const copy = start.cloneNode(true) as HTMLElement;
    copy.removeAttribute("data-phone-fly-start");
    copy.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
    floating.appendChild(copy);
    document.body.appendChild(floating);

    const end = () => root.querySelector<HTMLElement>("[data-phone-fly-end]");
    const show = (el: HTMLElement | null, on: boolean) => {
      if (!el) return;
      el.style.opacity = on ? "" : "0";
      el.style.visibility = on ? "" : "hidden";
    };

    let coords: {
      sx: number;
      sy: number;
      ex: number;
      ey: number;
      scale: number;
      from: number;
      distance: number;
    } | null = null;
    let place: "start" | "end" | "air" | null = null;
    let frame = 0;

    const measure = () => {
      const e = end();
      const s = start.getBoundingClientRect();
      const r = e?.getBoundingClientRect();
      if (!e || !r || s.width === 0 || r.width === 0) {
        coords = null;
        return;
      }
      const y = window.scrollY;
      const sy = s.top + y;
      const ey = r.top + y;
      const from = Math.max(0, sy - TRIGGER_OFFSET);
      const to = Math.max(from + MIN_SCROLL, ey - window.innerHeight / 2);
      floating.style.width = `${s.width}px`;
      coords = {
        sx: s.left,
        sy,
        ex: r.left,
        ey,
        scale: r.width / s.width,
        from,
        distance: Math.max(10, to - from),
      };
    };

    const sync = () => {
      frame = 0;
      const e = end();
      if (!coords) {
        floating.style.visibility = "hidden";
        show(start, true);
        show(e, true);
        return;
      }
      const y = window.scrollY;
      const t = clamp01((y - coords.from) / coords.distance);
      if (t <= 0 || t >= 1) {
        const at = t <= 0 ? "start" : "end";
        if (place !== at) {
          place = at;
          setActive(0);
        }
        floating.style.opacity = "0";
        floating.style.visibility = "hidden";
        show(start, at === "start");
        show(e, at === "end");
        return;
      }
      place = "air";
      // On tablets and phones the copy fades nearly out mid-flight.
      let opacity = 1;
      if (window.innerWidth <= 1024) {
        if (t <= 0.2) opacity = 0.05 + 0.95 * Math.pow(1 - t / 0.2, 2);
        else if (t >= 0.8) opacity = 0.05 + 0.95 * Math.pow((t - 0.8) / 0.2, 2);
        else opacity = 0.05;
      }
      const x = coords.sx + (coords.ex - coords.sx) * t;
      const top = coords.sy + (coords.ey - coords.sy) * t - y;
      const scale = 1 + (coords.scale - 1) * t;
      floating.style.opacity = opacity.toFixed(2);
      floating.style.visibility = "visible";
      floating.style.transform = `translate3d(${x.toFixed(2)}px, ${top.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      show(start, false);
      show(e, false);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const onResize = () => {
      measure();
      sync();
    };

    fly.current = { measure, sync };
    measure();
    sync();
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      fly.current = null;
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      floating.remove();
      show(start, true);
      show(end(), true);
    };
  }, []);

  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <section
      ref={rootRef}
      className={p.section}
      aria-labelledby="results-slider-title"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a, button")) next();
      }}
      onTouchStart={(e) => (touchX.current = e.changedTouches[0].screenX)}
      onTouchEnd={(e) => {
        const dx = touchX.current - e.changedTouches[0].screenX;
        if (Math.abs(dx) > 50)
          setActive((a) => (a + (dx > 0 ? 1 : slides.length - 1)) % slides.length);
      }}
    >
      <span className={p.glow} aria-hidden="true" />
      <h2 id="results-slider-title" className={p.srOnly}>
        {title}
      </h2>
      <div className="container">
        <div className={p.slider} title="Click to switch">
          {slides.map((slide, i) => (
            <div
              key={`${slide.num}-${i}`}
              className={`${p.item} ${i === active ? p.active : ""}`}
              aria-hidden={i !== active || undefined}
            >
              <div className={p.grid}>
                <div className={p.left}>
                  <p className={`${p.num} ${p.anim}`}>
                    <CountNum value={slide.num} triggers={["active"]} active={i === active} />
                  </p>
                  <span className={`${p.line} ${p.anim}`} aria-hidden="true" />
                  <p className={`${p.text} ${p.anim}`}>{slide.label}</p>
                </div>
                <div
                  className={p.center}
                  onMouseEnter={() => (held.current = true)}
                  onMouseLeave={() => (held.current = false)}
                >
                  <div
                    className={`${p.mock} ${p.anim}`}
                    data-phone-fly-end={i === active ? "" : undefined}
                  >
                    {slide.screen}
                  </div>
                  {slide.illustrative && <span className={p.caption}>Illustrative example</span>}
                </div>
                <div className={p.right}>
                  <p className={`${p.tag} ${p.anim}`}>{slide.tag}</p>
                  <div className={`${p.company} ${p.anim}`}>
                    <p>{slide.text}</p>
                    {slide.note && <p className={p.note}>{slide.note}</p>}
                  </div>
                  <Link href={slide.button.href} className={`${p.button} ${p.anim}`}>
                    {slide.button.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className={p.counter}>
            <span className={p.count}>
              {active + 1}/{slides.length}
            </span>
            <span className={p.segments}>
              {slides.map((_, i) => (
                <span key={i} className={p.track}>
                  <span
                    ref={(el) => {
                      segments.current[i] = el;
                    }}
                    className={p.progress}
                  />
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
