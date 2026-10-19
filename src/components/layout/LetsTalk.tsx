import { getServiceGroups } from "@/lib/services";
import { site } from "@/lib/site";
import { home } from "@/data/home";
import { SocialLinks } from "./SocialLinks";
import { ContactForm } from "./ContactForm";
import styles from "./LetsTalk.module.css";

const { closing } = home;

export function LetsTalk() {
  const groups = getServiceGroups();
  return (
    <section className="container section" aria-labelledby="talk-title" id="contact">
      <div className="heading heading--center">
        <h2 id="talk-title">Let&rsquo;s Talk</h2>
      </div>

      <div className={styles.panel}>
        <div className={`on-dark ${styles.left}`}>
          <div className={styles.follow}>
            <span className={styles.followLabel}>Follow us</span>
            <SocialLinks tone="dark" />
          </div>
          <div className={styles.offer}>
            <h3 className={styles.offerTitle}>What we offer</h3>
            <ul className={styles.offerList}>
              {groups.map((g) => (
                <li key={g.slug}>
                  <Tick />
                  {g.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>
                <Mail />
              </span>
              <span>
                <h3 className={styles.detailTitle}>E-Mail</h3>
                <a href={`mailto:${site.email}`} className={styles.detailText}>
                  {site.email}
                </a>
              </span>
            </div>
            <div className={styles.detail}>
              <span className={styles.detailIcon}>
                <Pin />
              </span>
              <span>
                <h3 className={styles.detailTitle}>Office</h3>
                <p className={styles.detailText}>
                  {site.region}
                  <br />
                  Canada
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h3 className={styles.formTitle}>{closing.title}</h3>
          <p className={styles.formText}>{closing.text}</p>
          <ContactForm
            symptoms={closing.symptoms}
            symptomsLabel={closing.tellUs}
            line={closing.line}
          />
        </div>
      </div>
    </section>
  );
}

function Tick() {
  return (
    <svg className={styles.tick} viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        d="M5.2 9.3l2.4 2.4 5-5"
        fill="none"
        stroke="#0f4c3a"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Mail() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  );
}

function Pin() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
