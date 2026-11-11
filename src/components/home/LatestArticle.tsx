import Link from "next/link";
import { getPosts } from "@/lib/content";
import { blogCategoryBySlug, readingTime, formatDate } from "@/data/blog";
import { routes, site } from "@/lib/site";
import { ArrowIcon } from "@/components/ui/Button";
import styles from "./LatestArticle.module.css";

// "Latest Article / BLOG": featured card with standfirst and author, smaller cards alongside.
export function LatestArticle() {
  const posts = getPosts().slice(0, 3);
  const author = site.founder;
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <section className="container section" aria-labelledby="blog-title">
      <div className="heading">
        <h2 id="blog-title">Latest Article</h2>
        <span className="eyebrow">Blog</span>
      </div>

      <div className={styles.grid}>
        {posts.map((post, i) => {
          const cat = blogCategoryBySlug(post.data.category ?? "");
          return (
            <Link
              key={post.slug}
              href={`${routes.blog}#${post.slug}`}
              className={`${styles.card} ${i === 0 ? styles.featured : ""}`}
            >
              <span className={styles.body}>
                <span className={styles.category}>{cat?.name}</span>
                <span className={styles.title}>{post.data.title}</span>
                <span className={styles.meta}>
                  {post.data.date ? formatDate(post.data.date) : ""} · {readingTime(post.body)} min
                  read
                </span>
              </span>
              <span className={styles.side}>
                <span className={styles.text}>{post.data.description}</span>
                {i === 0 && (
                  <span className={styles.author}>
                    <span className={styles.avatar} aria-hidden="true">
                      {initials}
                    </span>
                    <span>
                      <span className={styles.authorName}>{post.data.author ?? author}</span>
                      <span className={styles.authorRole}>Founder &amp; CEO</span>
                    </span>
                  </span>
                )}
              </span>
            </Link>
          );
        })}
        <Link href={routes.blog} className={styles.all}>
          <span className={styles.allLabel}>
            Guides, research, experiments and industry insights
          </span>
          <span className={styles.allText}>
            Browse all articles
            <ArrowIcon />
          </span>
        </Link>
      </div>
    </section>
  );
}
