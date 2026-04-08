import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = createMetadata({
  title: "Blog",
  description:
    "Read personal loan guides, EMI explainers, and borrower-focused comparison content on FinanceCompare.in.",
  path: "/blog",
});

const posts = getAllPosts();

export default function BlogIndexPage() {
  return (
    <section className="container-shell py-12 sm:py-14">
      <SectionHeading
        eyebrow="Blog"
        title="Borrower-focused personal loan guides"
        description="The editorial library is intentionally narrow in version 1: personal loan comparison, salary-based eligibility, and EMI understanding."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
