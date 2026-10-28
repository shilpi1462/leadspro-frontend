import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { getPosts } from "@/lib/content";
import { blogCategoryBySlug, readingTime } from "@/data/blog";
import { postPictures, wallPictures } from "@/data/images";
import { routes } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "./Pill";
import kit from "./kit.module.css";
import styles from "./ReadingCards.module.css";

interface ReadingCardsProps {
  title?: ReactNode;
  intro?: string;
  exclude?: string;
  id?: string;
}

export function ReadingCards({
  title = "Recommended reading",
  intro,
  exclude,
  id,
}: ReadingCardsProps) {
  const posts = getPosts()
    .filter((p) => p.slug !== exclude)
    .slice(0, 4);
  if (!posts.length) return null;

  return (
    <section className={`${kit.section} ${kit.dark}`} id={id}>
      <div className={`container ${posts.length <= 2 ? styles.few : ""}`}>
        <div className={styles.head}>
          <h2 className={kit.h2}>{title}</h2>
          {intro && <p className={styles.intro}>{intro}</p>}
        </div>

        <ul className={styles.grid}>
          {posts.map((post, i) => {
            const pic = postPictures[post.slug] ?? wallPictures[i % wallPictures.length];
            const category = blogCategoryBySlug(post.data.category ?? "");
            const href = `${routes.blog}#${post.slug}`;
            return (
              <Reveal
                as="li"
                key={post.slug}
                className={styles.cell}
                delay={(i % 4) as 0 | 1 | 2 | 3}
              >
                <article className={styles.card}>
                  <Link href={href} className={styles.thumb} tabIndex={-1} aria-hidden="true">
                    <Image
                      src={pic.src}
                      alt=""
                      width={pic.width}
                      height={pic.height}
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    />
                    {category && <span className={styles.chip}>{category.name}</span>}
                  </Link>
                  <div className={styles.meta}>
                    <span>{post.data.author ?? "LeadsPro"}</span>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.time}>{readingTime(post.body)} mins</span>
                  </div>
                  <h3 className={styles.title}>
                    <Link href={href}>{post.data.title}</Link>
                  </h3>
                  <p className={styles.excerpt}>{post.data.description}</p>
                  <span className={styles.more} aria-hidden="true">
                    Read more
                  </span>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <div className={styles.all}>
          <Pill href={routes.blog}>View all articles</Pill>
        </div>
      </div>
    </section>
  );
}
