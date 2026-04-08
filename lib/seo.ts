import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type CreateMetadataParams = {
  title: string;
  description: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path = "",
}: CreateMetadataParams): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path || "/",
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function createBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}
