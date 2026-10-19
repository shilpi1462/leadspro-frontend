"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { home } from "@/data/home";
import { nav, routes, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "./SocialLinks";
import styles from "./CtaBlock.module.css";

const picture = { src: "/images/backdrop/niagara-night.webp", width: 2000, height: 1250 };

export function CtaBlock() {
  const ref = useRef<HTMLElement>(null);
  // Where the pointer is, and where the beam has got to; the beam eases after the pointer.
  const aim = useRef({ x: 0, y: 0, bx: 0, by: 0, frame: 0, on: false });

  useEffect(() => {
    const state = aim.current;
    return () => cancelAnimationFrame(state.frame);
  }, []);

  // Phones and tablets have no hover: while the block is on screen the torch wanders slowly
  // over the headline on its own, and a tap sends it to that spot for a moment.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const a = aim.current;
    let raf = 0;
    let visible = false;
    let start = 0;
    let holdUntil = 0;

    const loop = (now: number) => {
      raf = 0;
      if (!visible) return;
      const r = el.getBoundingClientRect();
      if (!a.on) {
        a.on = true;
        start = now;
        a.bx = r.width / 2;
        a.by = r.height * 0.42;
        el.classList.add(styles.lit);
      }
      if (now > holdUntil) {
        const t = (now - start) / 1000;
        a.x = r.width * (0.5 + 0.32 * Math.sin(t * 0.5));
        a.y = r.height * (0.42 + 0.11 * Math.sin(t * 0.83 + 1));
      }
      a.bx += (a.x - a.bx) * 0.07;
      a.by += (a.y - a.by) * 0.07;
      el.style.setProperty("--x", `${a.bx.toFixed(1)}px`);
      el.style.setProperty("--y", `${a.by.toFixed(1)}px`);
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.intersectionRatio >= 0.4;
        if (visible && !raf) raf = requestAnimationFrame(loop);
        if (!visible) {
          a.on = false;
          el.classList.remove(styles.lit);
        }
      },
      { threshold: [0, 0.4] },
    );
    const tap = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const r = el.getBoundingClientRect();
      a.x = e.clientX - r.left;
      a.y = e.clientY - r.top;
      holdUntil = performance.now() + 2600;
    };

    io.observe(el);
    el.addEventListener("pointerdown", tap);
    return () => {
      io.disconnect();
      el.removeEventListener("pointerdown", tap);
      cancelAnimationFrame(raf);
    };
  }, []);

  const follow = () => {
    const el = ref.current;
    const a = aim.current;
    a.frame = 0;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    a.bx += (a.x - a.bx) * (still ? 1 : 0.2);
    a.by += (a.y - a.by) * (still ? 1 : 0.2);
    el.style.setProperty("--x", `${a.bx.toFixed(1)}px`);
    el.style.setProperty("--y", `${a.by.toFixed(1)}px`);
    if (Math.abs(a.x - a.bx) + Math.abs(a.y - a.by) > 0.5) a.frame = requestAnimationFrame(follow);
  };

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const a = aim.current;
    a.x = e.clientX - r.left;
    a.y = e.clientY - r.top;
    // Switching on: start the beam where the pointer came in rather than sliding from afar.
    if (!a.on) {
      a.on = true;
      a.bx = a.x;
      a.by = a.y;
      el.classList.add(styles.lit);
    }
    if (!a.frame) a.frame = requestAnimationFrame(follow);
  };

  const leave = () => {
    aim.current.on = false;
    ref.current?.classList.remove(styles.lit);
  };

  const content = (outline: boolean) => (
    <div className={styles.content}>
      {outline ? (
        <p className={`${styles.title} ${styles.outline}`} aria-hidden="true">
          {home.closing.statement}
        </p>
      ) : (
        <h2 id="cta-title" className={styles.title}>
          {home.closing.statement}
        </h2>
      )}
      <div className={styles.actions}>
        <Button href={routes.audit} variant="lime" iconLeft tabIndex={outline ? -1 : undefined}>
          {home.closing.primary.label}
        </Button>
        <Link
          href={home.closing.secondary.href}
          className={styles.secondary}
          tabIndex={outline ? -1 : undefined}
        >
          {home.closing.secondary.label}
        </Link>
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      className={styles.block}
      aria-labelledby="cta-title"
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <div className={styles.chrome}>
        <div className={styles.top}>
          <SocialLinks tone="dark" />
        </div>
        <div className={styles.bottom}>
          <ul className={styles.links}>
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.name}</Link>
              </li>
            ))}
          </ul>
          <p className={styles.copy}>
            © {new Date().getFullYear()} {site.legalName}.
          </p>
        </div>
      </div>

      <div className={styles.layer}>{content(false)}</div>

      <div className={`${styles.layer} ${styles.reveal}`} aria-hidden="true">
        <Image
          src={picture.src}
          alt=""
          width={picture.width}
          height={picture.height}
          className={styles.photo}
          loading="lazy"
        />
        {content(true)}
      </div>

      <span className={styles.torch} aria-hidden="true" />

      <span className={styles.device} aria-hidden="true">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <defs>
            <linearGradient id="torch-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#161715" />
              <stop offset="0.42" stopColor="#555a52" />
              <stop offset="1" stopColor="#121311" />
            </linearGradient>
            <radialGradient id="torch-spill" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#fffbe8" />
              <stop offset="0.5" stopColor="#ffe9a6" stopOpacity="0.7" />
              <stop offset="1" stopColor="#ffe9a6" stopOpacity="0" />
            </radialGradient>
            <filter id="torch-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.6" />
            </filter>
          </defs>
          <g transform="rotate(-36 32 32)">
            {/* light pouring out ahead of the head */}
            <ellipse
              cx="32"
              cy="8.5"
              rx="11"
              ry="7"
              fill="url(#torch-spill)"
              filter="url(#torch-glow)"
            />
            {/* head, furthest away, flaring out towards the lens */}
            <path
              d="M26.2 27.5L24.4 14.6q7.6-2.6 15.2 0l-1.8 12.9q-5.8 2-11.6 0z"
              fill="url(#torch-body)"
            />
            <path
              d="M24.4 14.6q7.6-2.6 15.2 0"
              stroke="#fff6d2"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
            {/* body, widening as it comes towards the viewer */}
            <path
              d="M26.2 27.1l-1.6 19.4q7.4 3.2 14.8 0l-1.6-19.4q-5.8 2-11.6 0z"
              fill="url(#torch-body)"
            />
            <path d="M26 29.3q6 2.1 12 0l.2 2.4q-6.2 2.2-12.4 0z" fill="#d9f55c" />
            <circle cx="32" cy="38.5" r="1.7" fill="#d9f55c" />
            {/* tail cap and its switch, closest to the viewer */}
            <ellipse
              cx="32"
              cy="46.6"
              rx="7.4"
              ry="3.3"
              fill="#0f100f"
              stroke="#5d6259"
              strokeWidth="0.8"
            />
            <ellipse cx="32" cy="46.4" rx="3.3" ry="1.5" fill="#d9f55c" />
          </g>
        </svg>
      </span>

      <a href={routes.audit} className={styles.badge}>
        <span className="sr-only">Contact us</span>
        <svg viewBox="0 0 100 100" className={styles.badgeRing} aria-hidden="true">
          <defs>
            <path id="badge-circle" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
          </defs>
          <text fontSize="11.5" fontWeight="600" letterSpacing="1.5">
            <textPath href="#badge-circle">Contact Us ✳ Contact Us ✳ </textPath>
          </text>
        </svg>
        <span className={styles.badgeArrow} aria-hidden="true">
          ↗
        </span>
      </a>
    </section>
  );
}
