---
title: "How to publish a blog on dk24.org"
description: "This blog explains how to publish a blog on DK24 website"
date: "2026-08-29"
author: "Kushal M"
authorImage: "author.png"
authorDesignation: "GDGoC SCEM Organizer ’25"
coverImage: "cover.jpeg"
readingTime: "3 min read"
tags: ["meta blog", "how-to"]
---

This blog contains the exact contents of [BLOG.md](https://github.com/Developer-Kommunity-24/community-website/blob/main/BLOG.md)

# ✍️ Blog

This document explains **how to add a blog post** to the community by creating a valid post folder under [`public/blog/`](./public/blog/).

> [!NOTE]
> Every post **must follow this structure** to be accepted, and malformed frontmatter will fail the build.

## Folder Structure

Each post is a self-contained folder, named after its slug (kebab-case recommended), containing an `index.md` and its own images:

```
public/blog/<slug>/
├── index.md
├── cover.png      # referenced by coverImage
└── author.jpg     # referenced by authorImage
```

The folder name becomes the post's URL: `public/blog/agentic-commerce-and-why-it-matters/` → `/blog/agentic-commerce-and-why-it-matters`.

## Frontmatter

| Name                 | Required | Type       | Description                                                | Constraints                                  |
| -------------------- | -------- | ---------- | ------------------------------------------------------------ | --------------------------------------------- |
| `title`              | ✅       | `string`   | Post title                                                    | **Max 200 characters**                        |
| `description`        | ✅       | `string`   | Short summary, used as the card excerpt and meta description  | **Max 500 characters**                        |
| `date`               | ✅       | `string`   | Publish date                                                   | **Format `YYYY-MM-DD`**                       |
| `author`             | ✅       | `string`   | Author's display name                                          | **Max 100 characters**                        |
| `authorImage`        | ✅       | `string`   | **Filename only** (not a path) of an image in the same folder | e.g. `author.jpg`, resolved to `/blog/<slug>/author.jpg` |
| `authorDesignation`  | ✅       | `string`   | Author's role/title, shown next to their name                 | **Max 100 characters**                        |
| `coverImage`         | ✅       | `string`   | **Filename only** (not a path) of an image in the same folder | e.g. `cover.png`, resolved to `/blog/<slug>/cover.png` |
| `readingTime`        | ✅       | `string`   | Author-supplied estimate, not auto-computed                    | e.g. `"3 min read"`                           |
| `tags`               | ✅       | `string[]` | Topic tags                                                      | **At least 1 tag required, max 100 chars per tag** |

> [!IMPORTANT]
> `authorImage` and `coverImage` are **filenames only** — the site resolves them relative to the post's own folder. Do not write a full path like `/blog/my-post/cover.png`.

For the authoritative implementation, see [`src/types/blog.ts`](./src/types/blog.ts).

## Example

```
public/blog/agentic-commerce-and-why-it-matters/index.md
```

```markdown
---
title: "Agentic Commerce and Why it Matters"
description: "AI may change how shoppers find you, but it does not fix conversion. The real opportunity is inside the session, where live intent forms and better decisions can lift revenue."
date: "2026-04-28"
author: "Ron"
authorImage: "author.jpg"
authorDesignation: "Founder, Brink"
coverImage: "cover.png"
readingTime: "3 min read"
tags: ["ecommerce", "agentic-commerce", "conversion", "ai-search", "in-session-decisioning"]
---

**TL;DR -** _Agentic commerce_ is about systems that read the live session,
understand intent as it forms, and decide whether to act.

## Discovery is not the problem

Everyone in ecommerce is asking the same question: how do we show up in AI search?
...
```

## Markdown Support

The body below the frontmatter is rendered using standard Markdown with **GitHub Flavored Markdown (GFM)** support. You can use:

* **Tables**: Standard GFM table syntax.
* **Strikethrough**: Words wrapped in `~~`.
* **Task Lists**: `- [ ]` and `- [x]` checkboxes.
* **Autolinks**: Bare URLs are auto-linked.
* **GitHub-style Alerts**: Informational callout banners, supported types:
  ```markdown
  > [!NOTE]
  > This is a note callout banner.
  ```
  and:
  ```markdown
  > [!IMPORTANT]
  > This is an important callout banner.
  ```
* **Repository Relative Links**: Any relative paths pointing to code folders/files in the repository (such as `./src/` or `./public/`) are automatically resolved to their corresponding absolute URLs on the official **DK24 website repository** (`Developer-Kommunity-24/community-website`) on GitHub, preventing broken links.

## Pinning a Post

Pinning is a separate, maintainer-only step — post authors do not need to (and should not) edit this file. To pin a post, add its slug to the ordered array in [`src/data/pinned-blogs.json`](./src/data/pinned-blogs.json):

```json
["agentic-commerce-and-why-it-matters"]
```

- Array order = display order in the pinned rail on `/blog`.
- At most 3 posts can be pinned at once. Pinning a 4th will fail the build - unpin one first.
- Every slug **must** match an existing `public/blog/<slug>/` folder, or the build will fail.

## Submitting

1. **Fork the Repository**.
2. **Add your post**: create `public/blog/<your-slug>/index.md` plus its images, following the format above.
3. **Submit a Pull Request**.

> 🤖 A malformed post (missing/invalid frontmatter fields) will fail the build automatically, so issues are caught before merge.
