# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Astro dev server (Keystatic CMS available at /keystatic)

# Build & Preview
npm run build        # Astro build + Pagefind index (required for site search to work)
npm run preview      # Serve dist/ via Wrangler (simulates Cloudflare Pages locally)
```

There is no test suite. Type checking is handled by `@astrojs/check` (run via `npx astro check`).

## Architecture

This is an **Astro 5 SSR site** for Dr. Chou Meng-Han's urology clinic (新店高美泌尿科診所), deployed on **Cloudflare Pages**. Content is managed through **Keystatic CMS** (at `/admin` or `/keystatic`).

### Content Collections (`src/content/`)

All content is defined in [src/content/config.ts](src/content/config.ts) using Astro content collections:

| Collection | Format | Path | Notes |
|---|---|---|---|
| `blog` | `.mdx` | `src/content/blog/*.mdx` | Medical education articles |
| `news` | `.mdx` | `src/content/news/*.mdx` | Clinic announcements |
| `videos` | `.yaml` | `src/content/videos/*.yaml` | YouTube links (one file per video) |
| `shorts` | `.yaml` | `src/content/shorts/index.yaml` | Singleton list of YouTube Shorts |
| `faq` | `.yaml` | `src/content/faq/list.yaml` | Singleton Q&A list |
| `settings` | `.yaml` | `src/content/settings/global.yaml` | Singleton: clinic info, social links |
| `schedule` | `.yaml` | `src/content/schedule/timetable.yaml` | Singleton: weekly clinic schedule |
| `resume` | `.yaml` | `src/content/settings/resume.yaml` | Singleton: doctor's credentials |

### Blog Frontmatter

Blog posts use a conditional `advanced` field for optional SEO overrides:

```yaml
---
title: 文章標題
date: YYYY-MM-DD
author: 周孟翰 醫師
category:
  - 排尿困擾與攝護腺   # One or more of the 5 fixed categories
tags: 關鍵字A, 關鍵字B  # Comma-separated string, parsed to array by schema
coverImage: ../../assets/images/blog/[slug]/cover.jpg

advanced:
  discriminant: true   # false = no SEO override (default)
  value:
    excerpt: 引言文字，顯示於文章頂部
    seoTitle: SEO 標題 | 周孟翰醫師
    seoDescription: 搜尋引擎描述
---
```

After the frontmatter and before the first `##` heading, add an MDX blockquote for AI/speakable SEO:

```markdown
> **摘要：** [詳細技術摘要，含醫學術語，明確提及周孟翰醫師]
```

**Never add a disclaimer inside `.mdx` files** — `Disclaimer.astro` is auto-injected by `[slug].astro` after `<Content />`.

### Image Storage

- Blog images: `src/assets/images/blog/[article-slug]/`
- News images: `src/assets/images/news/[news-slug]/`
- Compress to <300KB (JPG) before upload; use https://squoosh.app/

### Slug Rules

**Never change a slug after publishing** — it breaks all existing links and SEO history. If unavoidable, a 301 redirect must be added to `astro.config.mjs`.

### Pages & Routing

- `src/pages/index.astro` — Homepage (composes Home section components)
- `src/pages/blog/[slug].astro` — Blog post (SSG via `export const prerender = true`)
- `src/pages/news/[slug].astro` — News post (SSG)
- `src/layouts/Layout.astro` — Root layout with SEO meta, GA4 (via Partytown), Pagefind UI, and ViewTransitions

### Styling

Tailwind with custom color tokens defined in [tailwind.config.mjs](tailwind.config.mjs):
- `bg` — Page background (`#F0F4F8`)
- `primary` — Medical blue (`#2A8BC8`)
- `accent` — Amber gold (`#D99A46`)
- `text` — Dark gray (`#21272f`)
- `surface` — Card white (`#FFFFFF`)
- `highlight-blue`, `highlight-gold` — Decorative backgrounds

Fonts: Noto Serif TC (headings, `font-serif`) and Noto Sans TC (body, `font-sans`), loaded from Google Fonts.

### Key Integrations

- **Keystatic** — CMS for all content; local storage in dev, Keystatic Cloud in production
- **Pagefind** — Site search built at `npm run build`; requires full build to work (zh-TW language forced)
- **Cloudflare Pages** — SSR adapter; `wrangler.jsonc` configures the deployment
- **Partytown** — Offloads GA4 script to a web worker to avoid blocking render
- **@astrojs/sitemap** — Auto-generates sitemap, excluding `/test` and `/keystatic` routes

### JSON-LD Schema

Blog posts automatically emit two structured data schemas (in `[slug].astro`):
- `MedicalWebPage` with `speakable` CSS selectors (`h1`, `blockquote`, `h2`, `h3`)
- `BreadcrumbList` with 3 levels (home → blog index → article)
