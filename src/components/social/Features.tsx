import type { ReactNode } from "react";
import type { Feature } from "@/lib/socialPlan";
import type { Picture } from "@/data/images";
import { Copy } from "./Copy";
import { FeatureScreen } from "./Screens";
import { SecondaryButton } from "./Buttons";
import s from "./Social.module.css";
import f from "./Features.module.css";

interface FeaturesProps {
  id?: string;
  title: ReactNode;
  intro?: ReactNode;
  features: Feature[];
  thumbs: Picture[];
  photos: Picture[];
  captions: string[];
  buttons: { label: string; href: string }[];
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Features({
  id,
  title,
  intro,
  features,
  thumbs,
  photos,
  captions,
  buttons,
}: FeaturesProps) {
  return (
    <section id={id} className={s.section}>
      <div className={s.container}>
        <div className={f.head}>
          <h2 className={`${s.h2} ${s.center}`}>{title}</h2>
          {intro}
        </div>

        <div className={f.wrapper}>
          <div className={f.path} aria-hidden="true">
            <div className={f.bar} />
          </div>

          {features.map((feature, i) => {
            const Heading = feature.level === 3 ? "h3" : "h2";
            const phone = (
              <div className={f.mock}>
                <FeatureScreen
                  kind={feature.screen}
                  label={feature.label}
                  items={
                    feature.screen === "feed" && !feature.list.length
                      ? (feature.flows.at(-1) ?? [])
                      : feature.list
                  }
                  thumbs={thumbs.slice(i * 2).concat(thumbs.slice(0, i * 2))}
                  photo={photos[i % photos.length]}
                  caption={captions[i % captions.length]}
                />
              </div>
            );
            const button = buttons[i % buttons.length];
            const copy = (
              <div className={f.step}>
                <Heading id={feature.id} className={`${s.h3} ${f.title}`}>
                  {feature.title}
                </Heading>
                <Copy blocks={feature.blocks} />
                <SecondaryButton href={button.href} className={f.button}>
                  {button.label}
                </SecondaryButton>
              </div>
            );
            const phoneLeft = i % 2 === 0;
            return (
              <div
                key={feature.id}
                className={`${f.row} ${phoneLeft ? f.phoneLeft : f.phoneRight}`}
              >
                <div className={`${f.side} ${f.left} ${i === 0 ? f.first : ""}`}>
                  {phoneLeft ? phone : copy}
                </div>
                <div className={f.centre}>
                  <div className={`${f.square} ${i === features.length - 1 ? f.last : ""}`}>
                    [ {pad(i + 1)} ]
                  </div>
                </div>
                <div className={`${f.side} ${f.right}`}>{phoneLeft ? copy : phone}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
