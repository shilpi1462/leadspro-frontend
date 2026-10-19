"use client";

import { useState } from "react";
import { blogCategories } from "@/data/blog";
import styles from "./PostList.module.css";

export interface PostSummary {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  date: string;
  dateLabel: string;
  minutes: number;
  author: string;
}

export function PostList({ posts }: { posts: PostSummary[] }) {
  const [active, setActive] = useState("all");
  const visible = active === "all" ? posts : posts.filter((p) => p.category === active);
  const tabs = [{ slug: "all", name: "All" }, ...blogCategories];

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-label="Article categories">
        {tabs.map((t) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            aria-selected={active === t.slug}
            className={`${styles.tab} ${active === t.slug ? styles.tabActive : ""}`}
            onClick={() => setActive(t.slug)}
          >
            {t.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No articles have been published in this category yet.</p>
      ) : (
        <ul className={styles.list}>
          {visible.map((p) => {
            const initials = p.author
              .split(" ")
              .map((n) => n[0])
              .join("");
            return (
              <li key={p.slug}>
                <a href={p.href} className={styles.card}>
                  <span className={styles.side}>
                    <span className={styles.category}>{p.categoryName}</span>
                    <span className={styles.meta}>
                      <time dateTime={p.date}>{p.dateLabel}</time> · {p.minutes} min read
                    </span>
                    <span className={styles.author}>
                      <span className={styles.avatar} aria-hidden="true">
                        {initials}
                      </span>
                      <span>
                        <span className={styles.authorName}>{p.author}</span>
                        <span className={styles.authorRole}>Founder &amp; CEO</span>
                      </span>
                    </span>
                  </span>
                  <span className={styles.body}>
                    <span className={styles.title}>{p.title}</span>
                    <span className={styles.text}>{p.description}</span>
                    <span className={styles.more}>Learn More</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
