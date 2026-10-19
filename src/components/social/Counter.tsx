"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/motion";
import s from "./Social.module.css";
import c from "./Counter.module.css";

interface CounterProps {
  /** "50+": the first digit rolls up to its value, the rest stays put. */
  value: string;
  unit: string;
  label: string;
}

export function Counter({ value, unit, label }: CounterProps) {
  const ref = useInView<HTMLDivElement>({ threshold: 0.4 });
  const target = Number(value.charAt(0));
  const rolling = Number.isInteger(target) && target > 1;
  const digits = rolling ? Array.from({ length: target }, (_, i) => i + 1) : [];
  const rest = rolling ? value.slice(1) : value;

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div ref={ref} className={c.number} aria-label={value} role="img">
          {rolling && (
            <span className={c.roll} aria-hidden="true">
              <span className={c.sizer}>{target}</span>
              {digits.map((d, i) => (
                <span
                  key={d}
                  className={`${s.grad} ${c.digit} ${i === 0 ? c.firstDigit : ""} ${i === digits.length - 1 ? c.lastDigit : ""}`}
                  style={{ ["--k" as string]: i } as CSSProperties}
                >
                  {d}
                </span>
              ))}
            </span>
          )}
          <span className={s.grad} aria-hidden="true">
            {rest}
          </span>
        </div>
        <p className={c.text}>
          {unit}
          <small>{label}</small>
        </p>
      </div>
    </section>
  );
}
