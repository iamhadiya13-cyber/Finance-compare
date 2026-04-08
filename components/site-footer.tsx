import Link from "next/link";
import { footerLinks, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-muted/30">
      <div className="container-shell grid gap-7 py-8 sm:gap-8 sm:py-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-2.5">
          <p className="font-sans text-[1rem] font-semibold tracking-tight sm:text-lg">
            {siteConfig.name}
          </p>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:leading-7">
            {siteConfig.tagline}
          </p>
          <p className="text-sm font-medium leading-6 text-foreground/90">
            {siteConfig.trustDisclaimer}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-4 md:justify-items-end">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}