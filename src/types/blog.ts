import { z } from "zod";

export const AuthorSchema = z.object({
  name: z.string().min(1).max(100),
  designation: z.string().min(1).max(100).optional(),
  image: z
    .string()
    .min(1)
    .regex(/^[^/\\]+$/, "image must be a filename, not a path"),
});

export type BlogAuthor = z.infer<typeof AuthorSchema>;

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  author: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "author must be a kebab-case slug"),
  coverImage: z
    .string()
    .min(1)
    .regex(/^[^/\\]+$/, "coverImage must be a filename, not a path"),
  readingTime: z.string().min(1).max(50),
  tags: z.array(z.string().min(1).max(100).trim()).optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  authorDesignation?: string;
  authorImage: string;
  coverImage: string;
  readingTime: string;
  tags: string[];
  slug: string;
  contentHtml: string;
}

export const MAX_PINNED_BLOGS = 3;

export const PinnedBlogsSchema = z
  .array(z.string().min(1))
  .max(
    MAX_PINNED_BLOGS,
    `at most ${MAX_PINNED_BLOGS} posts can be pinned at once`,
  );
