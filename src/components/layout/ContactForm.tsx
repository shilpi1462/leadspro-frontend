"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

interface ContactFormProps {
  /** Problems the visitor can tick before writing; the ticked ones go into the email. */
  symptoms?: string[];
  symptomsLabel?: string;
  line?: string;
}

// Static site: the form composes an email to the studio address.
export function ContactForm({ symptoms = [], symptomsLabel, line }: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (s: string) =>
    setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Enquiry from ${name}${company ? ` (${company})` : ""}`;
    const seeing = picked.length ? `What I am seeing: ${picked.join(", ")}\n\n` : "";
    const body = `${seeing}${message}\n\n— ${name}\n${email}${company ? `\n${company}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {symptoms.length > 0 && (
        <fieldset className={styles.symptoms}>
          {symptomsLabel && <legend className={styles.symptomsLabel}>{symptomsLabel}</legend>}
          <div className={styles.chips}>
            {symptoms.map((s) => {
              const on = picked.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  className={styles.chip}
                  aria-pressed={on}
                  onClick={() => toggle(s)}
                >
                  <span className={styles.chipMark} aria-hidden="true" />
                  {s}
                </button>
              );
            })}
          </div>
          {line && <p className={styles.line}>{line}</p>}
        </fieldset>
      )}
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.srOnly}>Full Name</span>
          <input name="name" type="text" placeholder="Full Name" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.srOnly}>E-Mail</span>
          <input name="email" type="email" placeholder="E-Mail" required autoComplete="email" />
        </label>
      </div>
      <label className={styles.field}>
        <span className={styles.srOnly}>Company name</span>
        <input name="company" type="text" placeholder="Company name" autoComplete="organization" />
      </label>
      <label className={styles.field}>
        <span className={styles.srOnly}>Message</span>
        <textarea name="message" placeholder="Tell us what you are seeing" rows={4} required />
      </label>
      <button type="submit" className={styles.submit}>
        <span>{sent ? "Opening your email app…" : "Submit"}</span>
        <span className={styles.submitBadge} aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M4 12L12 4M12 4H5.5M12 4V10.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </form>
  );
}
