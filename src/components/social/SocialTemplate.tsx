import type { Block } from "@/lib/blocks";
import type { Chapter } from "@/lib/content";
import { planSocial, type WallCard } from "@/lib/socialPlan";
import {
  closingPhotos,
  reelPhotos,
  socialPhotos,
  socialThumbs,
  wallPhotos,
  type SocialPageConfig,
} from "@/data/social";
import { home } from "@/data/home";
import type { FaqItem } from "@/components/ui/Faq";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { Inline } from "@/components/service/Inline";
import { accent } from "@/components/sections/accent";
import { Hero } from "./Hero";
import { FillQuote } from "./FillQuote";
import { Features } from "./Features";
import { Plans } from "./Plans";
import { Counter } from "./Counter";
import { PostWall } from "./PostWall";
import { ClosingCta } from "./ClosingCta";
import { SocialFaq } from "./SocialFaq";
import { InView } from "./InView";
import { Chain, Copy } from "./Copy";
import { SecondaryButton } from "./Buttons";
import s from "./Social.module.css";

interface SocialTemplateProps {
  config: SocialPageConfig;
  title: string;
  subtitle?: string;
  crumbs: Crumb[];
  intro: Block[];
  flow: string[];
  flowLabel?: string;
  chapters: Chapter[];
  closing: { title: string; blocks: Block[] } | null;
  faqs: FaqItem[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** The wall needs eight posts to fill its four columns; short chapters get photo-only posts. */
const wallCards = (cards: WallCard[]) =>
  Array.from({ length: Math.max(8, cards.length) }, (_, i) => ({
    ...(cards[i] ?? { text: "" }),
    picture: wallPhotos[i % wallPhotos.length],
  }));

const text = (blocks: Block[]) =>
  blocks.filter((b): b is Extract<Block, { type: "p" }> => b.type === "p").map((b) => b.text);

export function SocialTemplate({
  config,
  title,
  subtitle,
  crumbs,
  intro,
  flow,
  flowLabel,
  chapters,
  closing,
  faqs,
  primary,
  secondary,
}: SocialTemplateProps) {
  const plan = planSocial(chapters, config);
  const words = title.split(" ");
  const lead = words.slice(0, 2).join(" ");
  const ending = words.slice(2).join(" ");

  // The opening statement fills in line by line; a very short opener takes the next line with it.
  const paragraphs = text(intro);
  const [opener = "", ...more] = paragraphs;
  const statement = opener.length < 60 && more.length ? `${opener} ${more.shift()}` : opener;

  const second = secondary ?? primary;
  const stat = home.team.stats[1];
  const quote = plan.compare ? text(plan.compare.after) : [];

  return (
    <div className={s.social}>
      <Hero
        crumbs={<Breadcrumbs items={crumbs} />}
        lead={lead}
        words={[ending, ...config.words]}
        reels={reelPhotos.map((picture, i) => ({
          picture,
          caption: config.reels[i % config.reels.length],
        }))}
        caption={config.caption}
        tagline={accent(subtitle ?? title)}
        cta={primary}
      />

      <FillQuote text={statement}>
        {more.map((p) => (
          <p key={p}>
            <Inline text={p} />
          </p>
        ))}
      </FillQuote>

      {plan.features.length > 0 && (
        <Features
          id={plan.included?.id}
          title={plan.included?.title ?? "What Is Included"}
          intro={
            <InView className={`${s.fade} ${s.copy} ${s.center}`}>
              {plan.included && plan.included.blocks.length > 0 && (
                <Copy blocks={plan.included.blocks} />
              )}
              {flow.length > 0 && (
                <>
                  {flowLabel && <p>{flowLabel}</p>}
                  <Chain steps={flow} className={s.centerChain} />
                </>
              )}
            </InView>
          }
          features={plan.features}
          thumbs={socialThumbs}
          photos={[
            socialPhotos.filming,
            socialPhotos.creator,
            socialPhotos.presenter,
            socialPhotos.phoneCapture,
          ]}
          captions={config.reels}
          buttons={[second, primary]}
        />
      )}

      {plan.compare && (
        <Plans
          id={plan.compare.id}
          title={plan.compare.title}
          head={plan.compare.head}
          rows={plan.compare.rows}
          cta={primary}
        />
      )}

      <Counter value={stat.value} unit={stat.unit} label={stat.label} />

      {plan.wall && (
        <PostWall
          id={plan.wall.id}
          title={plan.wall.title}
          intro={
            <InView className={`${s.fade} ${s.center}`}>
              <Copy blocks={plan.wall.before} className={s.centerCopy} />
            </InView>
          }
          cards={wallCards(plan.wall.cards)}
          outro={
            <InView className={s.fade}>
              <div className={`${s.copy} ${s.center}`}>
                {plan.wall.framework && (
                  <>
                    <h3 className={s.h3}>{plan.wall.framework.title}</h3>
                    <Chain steps={plan.wall.framework.steps} className={s.centerChain} />
                  </>
                )}
                <Copy blocks={plan.wall.after} className={s.centerCopy} />
              </div>
            </InView>
          }
        />
      )}

      {quote.length > 0 && <FillQuote text={quote.join(" ")} />}

      {plan.rest.map((part) => (
        <section key={part.id} id={part.id} className={s.section}>
          <InView className={`${s.fade} ${s.container} ${s.narrow}`}>
            <h2 className={`${s.h2} ${s.center}`}>{part.title}</h2>
            <Copy blocks={part.blocks} className={s.centerCopy} />
          </InView>
        </section>
      ))}

      {closing && (
        <>
          <ClosingCta title={accent(closing.title)} photos={closingPhotos} cta={primary} />
          <section className={s.closingCopy}>
            <InView className={`${s.fade} ${s.container} ${s.center}`}>
              <Copy blocks={closing.blocks} className={s.centerCopy} />
              {secondary && (
                <SecondaryButton href={secondary.href} className={s.closingButton}>
                  {secondary.label}
                </SecondaryButton>
              )}
            </InView>
          </section>
        </>
      )}

      {(plan.faqs.length > 0 || faqs.length > 0) && (
        <SocialFaq
          title={`${title} FAQs`}
          items={[
            ...plan.faqs.map((part) => ({
              id: part.id,
              question: part.title,
              answer: <Copy blocks={part.blocks} />,
            })),
            ...faqs.map((f, i) => ({
              id: `faq-${i + 1}`,
              question: f.q,
              answer: <Copy blocks={[{ type: "p", text: f.a }]} />,
            })),
          ]}
        />
      )}

      <div className={s.end} />
    </div>
  );
}
