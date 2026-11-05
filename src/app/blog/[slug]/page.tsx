import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    image: post.coverImage,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-lg text-muted-foreground mb-6">{post.description}</p>

      <div className="flex items-center gap-3 mb-10">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src={post.authorImage}
            alt={post.author}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="inline-flex items-center gap-2 text-sm font-medium">
            <span>{post.author}</span>
            {post.authorDesignation && (
              <>
                <span className="leading-none">&bull;</span>
                <span>{post.authorDesignation}</span>
              </>
            )}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
            <span className="leading-none">&bull;</span>
            <span>{post.readingTime}</span>
          </span>
        </div>
      </div>

      <div
        className="prose dark:prose-invert max-w-none"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: content is PR-reviewed static markdown, not user input
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
