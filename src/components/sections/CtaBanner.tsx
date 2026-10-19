import Image from "next/image";
import type { ReactNode } from "react";
import type { Picture } from "@/data/images";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "./Pill";
import { ScriptNote } from "./ScriptNote";
import kit from "./kit.module.css";
import styles from "./CtaBanner.module.css";

interface CtaBannerProps {
  title: ReactNode;
  children: ReactNode;
  picture: Picture;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  note?: string;
  id?: string;
}

const initials = site.founder
  .split(" ")
  .map((n) => n[0])
  .join("");

export function CtaBanner({
  title,
  children,
  picture,
  primary,
  secondary,
  note,
  id,
}: CtaBannerProps) {
  return (
    <section className={`${kit.section} ${kit.dark}`} id={id}>
      <div className="container">
        <Reveal className={styles.card}>
          <Image
            src={picture.src}
            alt=""
            width={picture.width}
            height={picture.height}
            sizes="(min-width: 900px) 55vw, 100vw"
            className={styles.photo}
          />
          <div className={styles.copy}>
            <h2 className={`${kit.h3} ${styles.title}`}>{title}</h2>
            <div className={styles.body}>{children}</div>
            <p className={styles.person}>
              <span className={styles.avatar} aria-hidden="true">
                {initials}
              </span>
              <span>
                <b>{site.founder}</b>
                <span>Founder &amp; CEO</span>
              </span>
            </p>
            <div className={styles.actions}>
              {note && (
                <ScriptNote point="right" className={styles.note}>
                  {note}
                </ScriptNote>
              )}
              <Pill href={primary.href}>{primary.label}</Pill>
            </div>
            {secondary && (
              <Pill href={secondary.href} tone="ghost">
                {secondary.label}
              </Pill>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
