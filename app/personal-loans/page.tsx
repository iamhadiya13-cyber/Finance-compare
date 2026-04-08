import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";
import { personalLoanProviders } from "@/lib/loan-data";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { JsonLd } from "@/components/json-ld";
import { LoanComparisonTable } from "@/components/loan/loan-comparison-table";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = createMetadata({
  title: "Personal Loans in India",
  description:
    "Compare personal loan options in India by rate range, processing fee, income threshold, and tenure. Use the EMI calculator before you apply.",
  path: "/personal-loans",
});

const posts = getLatestPosts(3);
const methodologyPoints = [
  "published interest-rate range",
  "processing fee and fee ceiling",
  "minimum salary threshold",
  "maximum tenure offered",
  "loan amount range and repayment flexibility",
  "last reviewed date for the sample editorial entry",
];

export default function PersonalLoansPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Personal Loans", path: "/personal-loans" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Reveal className="container-page py-10 sm:py-12">
        <div className="space-y-5">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/personal-loans", label: "Personal Loans" },
            ]}
          />
          <div className="max-w-3xl space-y-3.5">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.45rem]">
              Personal loan comparison hub for India
            </h1>
            <p className="text-[1rem] leading-7 text-muted-foreground">
              Use this page to shortlist personal loan options by rate range, fee
              level, income threshold, and tenure. Start with the comparison
              table, then review the editorial notes and run the{" "}
              <Link
                href="/calculators/personal-loan-emi-calculator"
                className="text-primary underline"
              >
                EMI calculator
              </Link>{" "}
              before you visit an official lender page.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="container-page pb-8 sm:pb-10" delay={0.04}>
        <LoanComparisonTable data={personalLoanProviders} />
      </Reveal>

      <Reveal className="container-page py-4 sm:py-6" delay={0.06}>
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>How we compare personal loan options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p>
                This hub is built as an editorial screening page, not a lender
                marketplace. The goal is to help users compare the borrowing terms
                that usually matter first, before they click out to an official
                lender website.
              </p>
              <StaggerGroup className="grid gap-2.5 sm:grid-cols-2">
                {methodologyPoints.map((point) => (
                  <StaggerItem key={point}>
                    <div className="rounded-2xl border border-border/70 bg-muted/40 p-3">
                      <div className="flex gap-2.5">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                        <p>{point}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>
              <p>
                Users should always verify the final sanctioned interest rate,
                processing fee, total repayment, foreclosure terms, disbursal
                amount, and any insurance or convenience charges directly with the
                official lender before applying.
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Use this page with the EMI calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                Compare the published rate band here, then estimate a realistic EMI
                using your target loan amount and tenure.
              </p>
              <p>
                If you need a repayment explainer first, read{" "}
                <Link href="/blog/how-much-personal-loan-can-i-get-based-on-my-salary-india" className="text-primary underline">
                  how personal loan EMI works
                </Link>
                .
              </p>
              <Button asChild>
                <Link href="/calculators/personal-loan-emi-calculator">
                  Open EMI calculator
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex gap-3 rounded-2xl border border-border/70 bg-muted/35 p-3.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <p>
                  Editorial comparison only. Approval, pricing, and eligibility can
                  differ by borrower profile, city, employer, and lender policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Reveal>

      <Reveal className="container-page py-10 sm:py-12" delay={0.08}>
        <SectionHeading
          eyebrow="Related guides"
          title="Articles connected to this comparison hub"
          description="These posts support commercial comparison intent with educational context around EMI, affordability, and salary-based eligibility."
        />
        <StaggerGroup className="mt-6 grid gap-5 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className="mt-6 rounded-[1.15rem] border border-border/75 bg-muted/35 p-4 text-sm leading-6 text-muted-foreground">
          Start with the comparison table on this page, continue to the{" "}
          <Link href="/calculators/personal-loan-emi-calculator" className="text-primary underline">
            personal loan EMI calculator
          </Link>
          , and then use the blog for topic-specific help such as salary-based
          eligibility or EMI planning.
        </div>
      </Reveal>

      <Reveal className="container-page pb-12 sm:pb-14">
        <DisclaimerBlock />
      </Reveal>
    </>
  );
}