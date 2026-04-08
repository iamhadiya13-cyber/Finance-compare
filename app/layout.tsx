import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { QuickEmiCta } from "@/components/quick-emi-cta";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Personal Loan Comparison and EMI Calculator`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} | Personal Loan Comparison and EMI Calculator`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    url: siteConfig.url,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Personal Loan Comparison and EMI Calculator`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <div className="min-h-screen bg-background">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <QuickEmiCta />
          </div>
        </Providers>
      </body>
    </html>
  );
}