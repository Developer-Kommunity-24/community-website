---
title: "How to publish a blog on dk24.org"
description: "This blog explains how to publish a blog on DK24 website"
date: "2026-08-29"
author: "kushal-m"
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

Each post is a self-contained folder, named after its slug (kebab-case recommended), containing an `index.md` and its cover image:

```
public/blog/<slug>/
├── index.md
└── cover.png      # referenced by coverImage
```

The folder name becomes the post's URL: `public/blog/intro-to-gdsc-cloud-challenge/` → `/blog/intro-to-gdsc-cloud-challenge`.

## Authors

Author details live **once** in a shared folder under `public/authors/<slug>/`, so the same person can be referenced from many posts without duplicating their name, title, or photo. First-time posters create their own author folder; afterwards they just reference it by slug.

```
public/authors/<author-slug>/
├── index.json      # { "name", "designation"?, "image" }
└── author.png      # referenced by "image"
```

`index.json` (`designation` is optional):

```json
{
  "name": "Kushal M",
  "designation": "GDGoC SCEM Organizer '25",
  "image": "author.png"
}
```

## Frontmatter

| Name          | Required | Type       | Description                                                          | Constraints                                  |
| ------------- | -------- | ---------- | -------------------------------------------------------------------- | --------------------------------------------- |
| `title`       | ✅       | `string`   | Post title                                                           | **Max 200 characters**                        |
| `description` | ✅       | `string`   | Short summary, used as the card excerpt and meta description         | **Max 500 characters**                        |
| `date`        | ✅       | `string`   | Publish date                                                         | **Format `YYYY-MM-DD`**                       |
| `author`      | ✅       | `string`   | **Author slug** pointing to `public/authors/<slug>/index.json`       | Must match an existing author folder          |
| `coverImage`  | ✅       | `string`   | **Filename only** (not a path) of an image in the same post folder   | e.g. `cover.png`, **required 16:9 (e.g. 1600×900)**, resolved to `/blog/<slug>/cover.png` |
| `readingTime` | ✅       | `string`   | Author-supplied estimate, not auto-computed                           | e.g. `"3 min read"`                           |
| `tags`        | ❌       | `string[]` | Topic tags                                                            | **Max 100 chars per tag**                     |

> [!IMPORTANT]
> `coverImage` is a **filename only** — the site resolves it relative to the post's own folder. Do not write a full path like `/blog/my-post/cover.png`.

For the authoritative implementation, see [`src/types/blog.ts`](./src/types/blog.ts).

## Example

```
public/blog/intro-to-gdsc-cloud-challenge/index.md
```

```markdown
---
title: "Intro to the GDSC Cloud Challenge"
description: "A hands-on walkthrough of the GDSC Cloud Challenge — what you'll build and how to get started."
date: "2026-08-20"
author: "kushal-m"
coverImage: "cover.png"
readingTime: "4 min read"
tags: ["cloud", "gdsc"]
---

**TL;DR -** The GDSC Cloud Challenge is a hands-on track where you build a
real cloud application over a few weeks.
...
```

The example above reuses the author folder `public/authors/kushal-m/` — no need to repeat author details here.

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
["intro-to-gdsc-cloud-challenge"]
```

- Array order = display order in the pinned rail on `/blog`.
- At most 3 posts can be pinned at once. Pinning a 4th will fail the build - unpin one first.
- Every slug **must** match an existing `public/blog/<slug>/` folder, or the build will fail.

## Submitting

1. **Fork the Repository**.
2. **Add your author** (first time only): create `public/authors/<your-slug>/index.json` plus your image, following the format above.
3. **Add your post**: create `public/blog/<your-slug>/index.md` plus its cover image, following the format above.
4. **Submit a Pull Request**.

> 🤖 A malformed post (missing/invalid frontmatter fields) will fail the build automatically, so issues are caught before merge.
