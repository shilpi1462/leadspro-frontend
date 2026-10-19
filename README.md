# Goodfaith Branding & Digital Marketing

Marketing website for Goodfaith, a digital marketing agency in Niagara Region, Ontario.
Next.js (App Router) exported as static HTML, so it can be hosted anywhere.

## Pages

| Page      | Route                                                          |
| --------- | -------------------------------------------------------------- |
| Home      | `/`                                                            |
| Services  | `/services/<slug>/` (25 pages in 8 categories, `content/services/`) |
| Industries | `/industries/`                                                |
| Blog      | `/blog/`                                                       |
| Portfolio | `/portfolio/`                                                  |
| H-EDGE    | `/h-edge/`                                                     |
| AI Hub    | `/ai-hub/`                                                     |

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:3000.

## Production build

```bash
npm run build
```

The static site is written to `out/`. Upload the contents of that folder to the web root of any static
host (cPanel, Netlify, Cloudflare Pages, S3, Vercel). URLs use trailing slashes, so every page is a
folder with an `index.html`.

- Hostinger, cPanel or any Apache/LiteSpeed host: `public/.htaccess` is copied into `out/` and sets the
  404 page, compression and caching. Make sure hidden files are uploaded too.
- S3 + CloudFront: set `index.html` as the index document and `404.html` as the error document.

## Content

Long-form copy is MDX with frontmatter:

- `content/services/*.mdx`: one file per service page. `category` and `order` drive the menu;
  `order: 0` is a category overview page.
- `content/posts/*.mdx`: blog articles (`category`, `date`, `author`).
- `content/pages/h-edge.mdx`: the H-EDGE page.

Copy for the designed sections is in `src/data/`:

- `home.ts`: home page sections
- `industries.ts`: the twenty industries grouped by customer journey
- `portfolio.ts`: case studies and results
- `stories.ts`: strategy examples used on the home and industry pages
- `services.ts`: the eight service categories
- `blog.ts`: blog categories
- `videos.ts`: the home page video boxes

Site settings (name, email, social links, navigation, routes) are in `src/lib/site.ts`.

### MDX components

Besides standard Markdown, service and post files can use:

- `<Flow>A → B → C</Flow>`: a step chain
- `<Finding title="...">...</Finding>`: research finding
- `<Example title="...">...</Example>`: strategy example
- `<Note>...</Note>`: small disclaimer
- `<Cta href="/...">Label</Cta>`: inline link with an arrow
- `<Closing title="...">...</Closing>`: closing section with the frontmatter CTA buttons

## SEO

Each page sets its title, meta description, canonical URL and Open Graph tags through `src/lib/seo.ts`.
Structured data (Organization, WebSite, BreadcrumbList, Service, FAQPage, BlogPosting) is output as
JSON-LD. `sitemap.xml` and `robots.txt` are generated at build time from `src/app/sitemap.ts` and
`src/app/robots.ts`. Fonts are self-hosted through `next/font`.

## Design tokens

Colours, radii, spacing and type are CSS custom properties at the top of `src/app/globals.css`.
