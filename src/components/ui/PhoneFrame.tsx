import type { ReactNode } from "react";
import styles from "./PhoneFrame.module.css";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  /** Clock in the status bar. */
  time?: string;
}

export function PhoneFrame({ children, className, time = "9:41" }: PhoneFrameProps) {
  return (
    <div className={[styles.phone, className].filter(Boolean).join(" ")}>
      <span className={`${styles.button} ${styles.action}`} />
      <span className={`${styles.button} ${styles.volUp}`} />
      <span className={`${styles.button} ${styles.volDown}`} />
      <span className={`${styles.button} ${styles.power}`} />
      <div className={styles.screen}>
        <div className={styles.status}>
          <span className={styles.time}>{time}</span>
          <span className={styles.island} />
          <span className={styles.icons}>
            <svg width="17" height="11" viewBox="0 0 17 11" aria-hidden="true">
              <rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor" />
              <rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor" />
              <rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" aria-hidden="true">
              <path
                d="M7.5 2.2c2.1 0 4 .8 5.4 2.1l1.1-1.1A9.2 9.2 0 007.5.7 9.2 9.2 0 001 3.2l1.1 1.1A7.7 7.7 0 017.5 2.2z"
                fill="currentColor"
              />
              <path
                d="M7.5 5.2c1.3 0 2.4.5 3.3 1.3l1.1-1.1A6.2 6.2 0 007.5 3.7 6.2 6.2 0 003.1 5.4l1.1 1.1c.9-.8 2-1.3 3.3-1.3z"
                fill="currentColor"
              />
              <path
                d="M7.5 8.2c.5 0 .9.2 1.2.5L7.5 10 6.3 8.7c.3-.3.7-.5 1.2-.5z"
                fill="currentColor"
              />
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
              <rect
                x="0.5"
                y="0.5"
                width="21"
                height="11"
                rx="3.5"
                fill="none"
                stroke="currentColor"
                opacity="0.4"
              />
              <rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" />
              <path
                d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4z"
                fill="currentColor"
                opacity="0.4"
              />
            </svg>
          </span>
        </div>
        <div className={styles.content}>{children}</div>
        <span className={styles.home} />
      </div>
    </div>
  );
}
