import { aiHub, aiHubPictures as pics } from "@/data/aiHub";
import { Icon, type IconName } from "@/components/sections/icons";
import { Chain } from "./Chain";
import { Frame } from "./Frame";
import { Pic } from "./Pic";
import { Up } from "./Up";
import { Cross } from "./Buttons";
import s from "./AiHub.module.css";
import styles from "./Observing.module.css";

const { observing } = aiHub;

export function Observing() {
  return (
    <section className={s.section} aria-labelledby="observing-title">
      <div className={s.container}>
        <div className={s.head}>
          <div className={s.headCopy}>
            <Frame hang>
              <Up as="h2" id="observing-title" variant="rise" className={s.display8}>
                {observing.title}
              </Up>
            </Frame>
            <Up as="p" delay={0.1} className={s.muted}>
              {observing.note}
            </Up>
          </div>
        </div>

        <Citations />
        <Reviews />
        <Sources />
        <Fanout />
        <StrongSeo />
      </div>
    </section>
  );
}

function Citations() {
  const c = observing.citations;
  return (
    <div className={styles.bento}>
      <Up variant="wipe" className={`${s.card} ${styles.photoCard} ${styles.bentoWide}`}>
        <Pic
          picture={pics.walkWide}
          className={styles.photo}
          sizes="(max-width: 991px) 100vw, 1280px"
        />
        <div className={styles.photoCopy}>
          <span className={styles.index}>01</span>
          <h3 className={s.display7}>{c.title}</h3>
          <p>{c.lead}</p>
        </div>
      </Up>

      <Up className={`${s.card} ${styles.textCard}`}>
        <p className={s.muted}>{c.listLabel}</p>
        <ul className={styles.tags}>
          {c.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{c.seen}</p>
      </Up>

      <Up variant="wipe" delay={0.1} className={`${s.card} ${styles.photoCard}`}>
        <Pic
          picture={pics.handsWide}
          className={styles.photo}
          sizes="(max-width: 991px) 100vw, 420px"
        />
        <div className={styles.photoCopy}>
          <p className={styles.photoLabel}>{c.notLabel}</p>
          <p className={styles.strike}>
            <span className={styles.cross}>
              <Cross />
            </span>
            {c.not}
          </p>
        </div>
      </Up>

      <Up variant="wipe" delay={0.2} className={`${s.card} ${styles.photoCard}`}>
        <Pic
          picture={pics.stairsWide}
          className={styles.photo}
          sizes="(max-width: 991px) 100vw, 420px"
        />
        <div className={styles.photoCopy}>
          <p className={styles.photoText}>{c.takeaway}</p>
        </div>
      </Up>

      <Up className={`${s.card} ${styles.framework}`}>
        <p className={s.muted}>{c.frameworkLabel}</p>
        <h4 className={s.display6}>{c.framework}</h4>
        <Chain steps={c.steps} />
      </Up>
    </div>
  );
}

const reviewIcons: IconName[] = ["star", "target", "users", "pin", "badge", "chat"];

function Reviews() {
  const r = observing.reviews;
  return (
    <div className={styles.reviews}>
      <div className={styles.values}>
        <span className={styles.index}>02</span>
        <Up as="h3" className={`${s.display7} ${styles.valuesTitle}`}>
          {r.title}
        </Up>
        <Up as="p" delay={0.1} className={styles.statement}>
          {r.lead.join(" ")}
        </Up>
        <ul className={styles.valueGrid}>
          {r.list.map((item, i) => (
            <Up as="li" key={item} variant="fade" delay={0.05 * i}>
              <Icon name={reviewIcons[i]} />
              {item}
            </Up>
          ))}
        </ul>
        <Up as="p" className={styles.valuesNote}>
          {r.seen} {r.not}
        </Up>
      </div>

      <div className={styles.promote}>
        <Up className={styles.promoteHead}>
          <p className={s.muted}>{r.sayLabel}</p>
          <p className={`${s.display7} ${styles.say}`}>{r.say}</p>
        </Up>
        <Up as="p" delay={0.1} className={styles.promoteText}>
          {r.after.join(" ")}
        </Up>
      </div>
      <div className={styles.pair}>
        <Up variant="wipe" className={styles.pairWide}>
          <Pic
            picture={pics.handover}
            className={styles.photo}
            sizes="(max-width: 767px) 100vw, 60vw"
          />
        </Up>
        <Up variant="wipe" delay={0.1} className={styles.pairNarrow}>
          <Pic
            picture={pics.plant}
            className={styles.photo}
            sizes="(max-width: 767px) 100vw, 40vw"
          />
        </Up>
      </div>
    </div>
  );
}

const sourceIcons: IconName[] = [
  "laptop",
  "map",
  "doc",
  "star",
  "shield",
  "chat",
  "camera",
  "briefcase",
];

// The FAQs page: a picture and the category list on the left, the question cards on the right.
function Sources() {
  const so = observing.sources;
  return (
    <div className={styles.faq}>
      <div className={styles.faqSide}>
        <Up variant="wipe" className={styles.faqPhoto}>
          <Pic
            picture={pics.axNetwork}
            className={styles.photo}
            sizes="(max-width: 991px) 100vw, 480px"
          />
        </Up>
        <span className={styles.index}>03</span>
        <Up as="h3" className={s.display6}>
          {so.title}
        </Up>
        <Up variant="fade" delay={0.2}>
          <p className={`${s.muted} ${styles.tabsLabel}`}>{so.typesLabel}</p>
          <ul className={styles.tabs}>
            {so.types.map((t, i) => (
              <li key={t}>
                <Icon name={sourceIcons[i]} />
                {t}
              </li>
            ))}
          </ul>
        </Up>
      </div>

      <div className={styles.faqList}>
        <Up className={`${styles.faqCard} ${styles.faqLead}`}>
          <p className={s.muted}>{so.lead}</p>
          <div className={styles.faqRow}>
            <p className={s.display6}>{so.question}</p>
            <span className={s.roundIcon} aria-hidden="true">
              ?
            </span>
          </div>
        </Up>
        <Up as="p" delay={0.1} className={styles.faqStudies}>
          {so.studies}
        </Up>
        <Up as="p" delay={0.1} className={`${s.muted} ${styles.faqJoin}`}>
          {so.askLabel}
        </Up>
        <Up delay={0.15} className={styles.faqCard}>
          <div className={styles.faqRow}>
            <p className={s.display4}>{so.ask[0]}</p>
            <span className={s.roundIcon} aria-hidden="true">
              ?
            </span>
          </div>
        </Up>
        <Up as="p" delay={0.2} className={`${s.muted} ${styles.faqJoin}`}>
          {so.askJoin}
        </Up>
        <Up delay={0.25} className={styles.faqCard}>
          <div className={styles.faqRow}>
            <p className={s.display4}>{so.ask[1]}</p>
            <span className={s.roundIcon} aria-hidden="true">
              ?
            </span>
          </div>
        </Up>
      </div>

      <Up className={`${s.card} ${styles.framework} ${styles.faqFramework}`}>
        <p className={s.muted}>{so.frameworkLabel}</p>
        <h4 className={s.display6}>{so.framework}</h4>
        <Chain steps={so.steps} />
        <p className={styles.after}>{so.after.join(" ")}</p>
      </Up>
    </div>
  );
}

// Home V1's pointer map: the example question over the robot, its information needs either side.
function Fanout() {
  const f = observing.fanout;
  const left = f.needs.slice(0, 4);
  const right = f.needs.slice(4);
  return (
    <div className={styles.fanout}>
      <div className={styles.fanoutHead}>
        <span className={styles.index}>04</span>
        <Up as="h3" className={s.display7}>
          {f.title}
        </Up>
        <div className={styles.fanoutLead}>
          {f.lead.map((p, i) => (
            <Up as="p" key={p} delay={0.1 * i} className={i === 2 ? s.muted : undefined}>
              {p}
            </Up>
          ))}
        </div>
      </div>

      <div className={styles.map}>
        <Up variant="scale" className={styles.mapRobot}>
          <Pic picture={pics.robotSide} sizes="(max-width: 991px) 90vw, 700px" />
        </Up>
        <Needs items={left} side="left" />
        <Up variant="up" className={styles.query}>
          <p className={s.muted}>{f.exampleLabel}</p>
          <p className={styles.queryText}>{f.example}</p>
          <p className={styles.queryNeeds}>{f.needsLabel}</p>
        </Up>
        <Needs items={right} side="right" />
      </div>

      <Up className={`${s.card} ${styles.framework}`}>
        <p>{f.beyond}</p>
        <p className={s.muted}>{f.frameworkLabel}</p>
        <h4 className={s.display6}>{f.framework}</h4>
        <Chain steps={f.steps} />
        <p className={styles.after}>{f.after.join(" ")}</p>
      </Up>
    </div>
  );
}

function Needs({ items, side }: { items: string[]; side: "left" | "right" }) {
  return (
    <ul className={`${styles.needs} ${styles[side]}`}>
      {items.map((need, i) => (
        <li key={need}>
          <Up variant="fade" delay={0.15 * i} className={styles.need}>
            {need}
          </Up>
          <Up variant="line" delay={0.15 * i} className={styles.needLine}>
            <span />
            <span />
          </Up>
        </li>
      ))}
    </ul>
  );
}

function StrongSeo() {
  const o = observing.seo;
  return (
    <div className={styles.impactWrap}>
      <div className={styles.impact}>
        <Up variant="scale" className={styles.impactPhoto}>
          <Pic picture={pics.laundryWide} sizes="100vw" />
        </Up>
        <span className={styles.impactShade} aria-hidden="true" />
        <div className={styles.impactCopy}>
          <span className={styles.index}>05</span>
          <Up as="h3" className={s.display8}>
            {o.title}
          </Up>
          {o.lead.map((p, i) => (
            <Up as="p" key={p} delay={0.1 * (i + 1)}>
              {p}
            </Up>
          ))}
        </div>
      </div>

      <div className={styles.impactCards}>
        <Up className={`${s.card} ${styles.textCard}`}>
          <p className={s.muted}>{o.listLabel}</p>
          <ul className={styles.checks}>
            {o.list.map((item) => (
              <li key={item}>
                <Tick />
                {item}
              </li>
            ))}
          </ul>
        </Up>
        <Up delay={0.1} className={`${s.card} ${styles.textCard} ${styles.takeawayCard}`}>
          <p className={s.muted}>{o.after.join(" ")}</p>
          <div className={styles.impactTakeaway}>
            <p className={styles.photoLabel}>{o.takeawayLabel}</p>
            <p className={s.display6}>{o.takeaway}</p>
          </div>
        </Up>
      </div>
    </div>
  );
}

const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path
      d="M3.5 8.5l3 3 6-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
