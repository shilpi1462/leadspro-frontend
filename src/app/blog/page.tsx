import type { Metadata } from "next";
import { getPosts } from "@/lib/content";
import { renderMdx } from "@/lib/mdx";
import { blogCategories, blogCategoryBySlug, readingTime, formatDate } from "@/data/blog";
import { routes, site } from "@/lib/site";
import { pageMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageIntro } from "@/components/page/PageIntro";
import { PostList } from "@/components/blog/PostList";
import { LetsTalk } from "@/components/layout/LetsTalk";
import prose from "@/components/mdx/prose.module.css";
import { BlogScene } from "@/components/visuals/scenes";
import styles from "./blog.module.css";

const crumbs = [{ name: "Blog", href: routes.blog }];

export const metadata: Metadata = pageMetadata({
  title: "Blog | SEO Guides, Research, Experiments & Industry Insights | Goodfaith",
  description:
    "The Goodfaith blog: SEO-focused guides, original research using collected data, experiments we actually test and measure, and marketing analysis for specific industries.",
  path: routes.blog,
});

export default async function BlogPage() {
  const posts = getPosts();
  const summaries = posts.map((p) => ({
    slug: p.slug,
    href: `#${p.slug}`,
    title: p.data.title,
    description: p.data.description,
    category: p.data.category ?? "insights-guides",
    categoryName: blogCategoryBySlug(p.data.category ?? "")?.name ?? "Insights & Guides",
    date: p.data.date ?? "",
    dateLabel: p.data.date ? formatDate(p.data.date) : "",
    minutes: readingTime(p.body),
    author: p.data.author ?? site.founder,
  }));
  const rendered = await Promise.all(posts.map((p) => renderMdx(p.body)));

  return (
    <div className="page-inner">
      <PageIntro
        crumbs={crumbs}
        eyebrow="Blog"
        title="Latest Article"
        description="Guides, original research, experiments and industry insights from our work on search, AI-assisted discovery and the businesses we support."
        align="center"
        badges
      />

      <section className="container" aria-label="Articles">
        <PostList posts={summaries} />
      </section>

      <section className="container section" aria-labelledby="categories-title">
        <div className="heading">
          <h2 id="categories-title">Four kinds of articles</h2>
          <span className="eyebrow">How the blog is organised</span>
        </div>
        <ol className={styles.categories}>
          {blogCategories.map((c, i) => (
            <li key={c.slug} className={styles.category}>
              <span className={styles.categoryIndex}>(0{i + 1})</span>
              <h3 className={styles.categoryName}>{c.name}</h3>
              <p className={styles.categoryPurpose}>{c.purpose}</p>
              <p className={styles.categoryExample}>
                <span>Example</span>“{c.example}”
              </p>
            </li>
          ))}
        </ol>
      </section>

      <div className={styles.articles}>
        {posts.map((post, i) => {
          const category = blogCategoryBySlug(post.data.category ?? "");
          const date = post.data.date ?? "";
          const author = post.data.author ?? site.founder;
          return (
            <article
              key={post.slug}
              id={post.slug}
              className={`container ${styles.article}`}
              aria-labelledby={`${post.slug}-title`}
            >
              <header className={styles.articleHead}>
                <div className={styles.meta}>
                  {category && <span className={styles.badge}>{category.name}</span>}
                  <span className={styles.date}>
                    <time dateTime={date}>{formatDate(date)}</time> · {readingTime(post.body)} min
                    read
                  </span>
                </div>
                <h2 id={`${post.slug}-title`} className={styles.title}>
                  {post.data.title}
                </h2>
                <p className={styles.standfirst}>{post.data.description}</p>
                <p className={styles.author}>
                  <span className={styles.avatar} aria-hidden="true">
                    {author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <strong>{author}</strong>
                    <br />
                    Founder &amp; CEO, {site.legalName}
                  </span>
                </p>
              </header>
              <figure className={styles.figure}>
                <BlogScene kind={post.data.category === "experiments" ? "experiment" : "insight"} />
              </figure>
              <div className={`${prose.prose} ${styles.prose}`}>{rendered[i]}</div>
            </article>
          );
        })}
      </div>

      <LetsTalk />
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          ...posts.map((p) =>
            articleSchema({
              title: p.data.title,
              description: p.data.description,
              path: `${routes.blog}#${p.slug}`,
              date: p.data.date ?? "",
              author: p.data.author ?? site.founder,
            }),
          ),
        ]}
      />
    </div>
  );
}
