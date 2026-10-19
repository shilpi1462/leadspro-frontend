import { G } from "@/components/visuals/parts/glyphs";
import { ArrowButton } from "./Parts";
import { Rise } from "./Rise";
import { item } from "./item";
import b from "./Brand.module.css";
import v from "./Services.module.css";

interface ServiceItem {
  name: string;
  text: string;
  href: string;
  steps: string[];
  current: boolean;
}

export function Services({
  title,
  items,
  cta,
}: {
  title: string;
  items: ServiceItem[];
  cta: { label: string; href: string };
}) {
  const current = items.find((i) => i.current);
  const others = items.filter((i) => !i.current);
  const ordered = current ? [others[0], current, ...others.slice(1)].filter(Boolean) : items;

  return (
    <section className={b.spaceBottom}>
      <div className={b.medium}>
        <Rise className={v.head}>
          <div {...item(0)}>
            <span className={b.preTitle}>Related services</span>
          </div>
          <h2 {...item(1, `${b.display} ${b.h2} ${v.title}`)}>{title}</h2>
        </Rise>
        <Rise className={v.grid}>
          {ordered.map((s, i) => (
            <div
              key={s.href}
              {...item(i, `${v.card} ${s.current ? v.lit : i === 2 ? v.dark : ""}`)}
            >
              <div className={v.cardHead}>
                <h3>{s.name}</h3>
                {s.current && <span className={v.badge}>This page</span>}
              </div>
              <div className={v.cardBody}>
                <p className={v.text}>{s.text}</p>
                <ul className={v.list}>
                  {s.steps.map((step) => (
                    <li key={step}>
                      <G name="check" />
                      {step}
                    </li>
                  ))}
                </ul>
                <ArrowButton
                  href={s.current ? cta.href : s.href}
                  label={s.current ? cta.label : `Explore ${s.name}`}
                  className={v.button}
                />
              </div>
            </div>
          ))}
        </Rise>
      </div>
    </section>
  );
}
