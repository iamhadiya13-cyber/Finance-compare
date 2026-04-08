import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleFaq } from "@/components/blog/article-faq";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { JsonLd } from "@/components/json-ld";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts().find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!getPostSlugs().includes(slug)) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.frontmatter.slug}`,
  };

  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.frontmatter.title, path: `/blog/${post.frontmatter.slug}` },
  ]);

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="container-reading py-10 sm:py-12 lg:py-14">
        <div className="space-y-5">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/blog", label: "Blog" },
              {
                href: `/blog/${post.frontmatter.slug}`,
                label: post.frontmatter.title,
              },
            ]}
          />
          <div className="max-w-4xl space-y-3.5">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.18em] text-primary">
              {post.frontmatter.category ?? "Personal Loans"}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.45rem]">
              {post.frontmatter.title}
            </h1>
            <div className="flex flex-wrap gap-4 font-sans text-[0.82rem] text-muted-foreground">
              <span>{formatDate(post.frontmatter.date)}</span>
              <span>{post.readingTime}</span>
            </div>
            <p className="max-w-3xl text-[1rem] leading-7 text-muted-foreground">
              {post.frontmatter.description}
            </p>
          </div>
        </div>
        <div className="mt-10 xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:items-start xl:gap-6 2xl:grid-cols-[minmax(0,1fr)_13.5rem]">
          <div className="mx-auto min-w-0 w-full max-w-[48rem] xl:mx-0">
            <div className="prose-finance">{post.content}</div>
            <ArticleFaq items={post.faqItems} />
          </div>
          <div className="hidden xl:block xl:pt-1">
            <TableOfContents items={post.toc} />
          </div>
        </div>
      </article>
    </>
  );
}
