import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import PinnedBlogsData from "@/data/pinned-blogs.json" with { type: "json" };
import {
  BlogFrontmatterSchema,
  type BlogPost,
  PinnedBlogsSchema,
} from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "public/blog");

async function getSlugs(): Promise<string[]> {
  try {
    const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function loadPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOG_DIR, slug, "index.md");
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);

  const parsed = BlogFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in public/blog/${slug}/index.md: ${parsed.error.message}`,
    );
  }

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let html = processed.toString();

  // Rewrite relative links pointing to source files/directories to absolute GitHub paths
  html = html.replace(/href="(\.\.?\/[^"]+)"/g, (match, href) => {
    if (
      href.startsWith("./src/") ||
      href.startsWith("./public/") ||
      href.startsWith("./components/") ||
      href.startsWith("./data/") ||
      href.endsWith(".ts") ||
      href.endsWith(".tsx") ||
      href.endsWith(".json") ||
      href.endsWith(".md")
    ) {
      const cleanPath = href.replace(/^\.\//, "");
      return `href="https://github.com/Developer-Kommunity-24/community-website/blob/main/${cleanPath}"`;
    }
    return match;
  });

  // Replace GitHub-style alerts in blockquotes with styled containers
  html = html.replace(
    /<blockquote>\s*<p>\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\](?:\s|<br\s*\/?>)*/gi,
    (_match, type) => {
      const lowerType = type.toLowerCase();
      return `<blockquote class="alert-callout alert-${lowerType}"><p>`;
    },
  );

  return {
    ...parsed.data,
    slug,
    authorImage: `/blog/${slug}/${parsed.data.authorImage}`,
    coverImage: `/blog/${slug}/${parsed.data.coverImage}`,
    contentHtml: html,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = await getSlugs();
  const posts = await Promise.all(slugs.map(loadPost));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const slugs = await getSlugs();
  if (!slugs.includes(slug)) return null;
  return loadPost(slug);
}

async function getPinnedSlugs(): Promise<string[]> {
  const pinned = PinnedBlogsSchema.parse(PinnedBlogsData);
  const validSlugs = new Set(await getSlugs());
  for (const slug of pinned) {
    if (!validSlugs.has(slug)) {
      throw new Error(
        `src/data/pinned-blogs.json references unknown slug "${slug}" - no matching public/blog/${slug}/ folder`,
      );
    }
  }
  return pinned;
}

export async function getPinnedPosts(): Promise<BlogPost[]> {
  const [pinnedSlugs, posts] = await Promise.all([
    getPinnedSlugs(),
    getAllPosts(),
  ]);
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  return pinnedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is BlogPost => post !== undefined);
}
