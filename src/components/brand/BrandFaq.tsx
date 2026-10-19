"use client";

import { useId, useState } from "react";
import b from "./Brand.module.css";
import f from "./BrandFaq.module.css";

export function BrandFaq({ title, items }: { title: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section className={b.spaceBottom}>
      <div className={b.small}>
        <div className={f.head}>
          <span className={b.preTitle}>FAQs</span>
          <h2 className={`${b.display} ${b.h2} ${b.center}`}>{title}</h2>
        </div>
        <div className={f.list}>
          {items.map((faq, i) => {
            const isOpen = open === i;
            const panel = `${base}-${i}`;
            return (
              <div key={faq.q} className={`${f.item} ${isOpen ? f.open : ""}`}>
                <h3 className={f.q}>
                  <button
                    type="button"
                    className={f.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {faq.q}
                    <span className={f.plus} aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  </button>
                </h3>
                <div id={panel} role="region" className={f.content} inert={!isOpen}>
                  <div className={f.inner}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
