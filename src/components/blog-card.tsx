import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="h-full relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 py-0">
          {/* Top Accent - consistent with vision cards */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40 group-hover:from-green-200/60 group-hover:via-green-300/70 group-hover:to-green-200/60 transition-colors duration-300" />

          {/* Cover Image */}
          <div className="relative aspect-video w-full bg-linear-to-br from-green-50/30 to-green-100/20 dark:from-green-950/20 dark:to-green-900/10 overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardContent className="relative px-6 py-4 flex-1">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">
              {post.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 text-sm line-clamp-3">
              {post.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge
                  variant="secondary"
                  className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 text-xs"
                >
                  +{post.tags.length - 4}
                </Badge>
              )}
            </div>

            {/* Author + meta */}
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                  <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                  <span className="leading-none">&bull;</span>
                  <span>{post.readingTime}</span>
                </span>
              </div>
            </div>
          </CardContent>

          {/* Subtle Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-300/50 to-transparent group-hover:via-green-400 transition-colors duration-300" />
        </Card>
      </Link>
    </div>
  );
}
