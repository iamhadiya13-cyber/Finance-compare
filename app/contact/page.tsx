import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact FinanceCompare.in for editorial, corrections, or business enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="container-page py-12 sm:py-14">
      <div className="max-w-5xl space-y-8">
        <h1 className="text-4xl font-semibold tracking-tight">Contact</h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Use the details below for editorial corrections, feedback, or business
          enquiries related to the website.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="surface p-6">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 size-5 text-primary" />
              <div>
                <p className="font-sans font-semibold">Email</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {siteConfig.contactEmail}
                </p>
              </div>
            </div>
          </div>
          <div className="surface p-6">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 size-5 text-primary" />
              <div>
                <p className="font-sans font-semibold">Coverage focus</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  India-first personal loan and credit decision-support content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
