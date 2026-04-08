import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card className="card-hover h-full">
      <CardHeader className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {post.category ? <Badge variant="muted">{post.category}</Badge> : null}
          <span className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {formatDate(post.date)}
          </span>
        </div>
        <CardTitle className="text-[1.05rem] leading-6 sm:text-[1.14rem]">
          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <p className="text-sm leading-6 text-muted-foreground">
          {post.excerpt ?? post.description}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-sans text-[0.82rem] text-muted-foreground">
            {post.readingTime}
          </span>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary"
          >
            Read article
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}