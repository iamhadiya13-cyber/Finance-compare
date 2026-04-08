import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Read the FinanceCompare.in privacy policy for basic website usage and contact handling terms.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page py-12 sm:py-14">
      <div className="max-w-5xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <div className="prose-finance">
          <p>
            FinanceCompare.in is a content-led website. Version 1 does not provide
            account creation, user dashboards, or personal financial onboarding.
          </p>
          <p>
            Basic analytics, server logs, and contact form emails may be used to
            maintain the website, understand content usage, and respond to
            legitimate enquiries.
          </p>
          <p>
            This page should be reviewed and expanded before adding ad platforms,
            affiliate programs, or third-party form services in production.
          </p>
        </div>
      </div>
    </section>
  );
}
