import Link from "next/link";
import { ArrowRight, Calculator, FileText, ShieldCheck } from "lucide-react";
import { getLatestPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/seo";
import { personalLoanProviders } from "@/lib/loan-data";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { EmiCalculator } from "@/components/emi/emi-calculator";
import { PostCard } from "@/components/blog/post-card";
import { SectionHeading } from "@/components/section-heading";
import { TrustGrid } from "@/components/trust-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = createMetadata({
  title: "Compare Personal Loans and Calculate EMI",
  description:
    "Use FinanceCompare.in to compare personal loan options in India, estimate EMI, and read clear borrowing guides before you apply.",
});

const latestPosts = getLatestPosts(3);
const featuredProvider = personalLoanProviders[0];
const supportCards = [
  {
    label: "Comparison focus",
    text: "Loan rates, fees, income thresholds, and tenure ranges.",
  },
  {
    label: "Tooling",
    text: "One practical EMI calculator designed for quick decision support.",
  },
  {
    label: "Editorial stance",
    text: "Independent comparison only, with clear disclosures on every major page.",
  },
];

export default function HomePage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    description: siteConfig.description,
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <section className="border-b border-border/70 bg-[radial-gradient(circle_at_top,rgba(34,85,120,0.08),transparent_42%)]">
        <div className="container-shell grid gap-6 py-9 sm:gap-8 sm:py-11 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 lg:py-13">
          <Reveal className="space-y-5 sm:space-y-6">
            <Badge>India-first personal loan comparison</Badge>
            <div className="space-y-3 sm:space-y-4">
              <h1 className="max-w-3xl text-[1.9rem] font-semibold tracking-tight text-foreground sm:text-[2.45rem] sm:leading-[1.06] lg:max-w-[13ch] lg:text-[3.15rem]">
                Compare personal loan options and estimate EMI with clarity.
              </h1>
              <p className="max-w-2xl text-[0.97rem] leading-7 text-muted-foreground sm:text-[1rem] sm:leading-7 lg:text-[1.05rem] lg:leading-8">
                FinanceCompare.in helps borrowers review personal loan options,
                understand monthly repayment, and read practical loan guides in a
                neutral, editorial format.
              </p>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Start with the <Link href="/personal-loans" className="text-primary underline">personal loan hub</Link>,
                estimate repayment in the <Link href="/calculators/personal-loan-emi-calculator" className="text-primary underline">EMI calculator</Link>,
                and use the <Link href="/blog" className="text-primary underline">blog</Link> for borrower-specific questions.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/personal-loans">
                  Explore personal loans
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto">
                <Link href="/calculators/personal-loan-emi-calculator">
                  Use EMI calculator
                  <Calculator className="size-4" />
                </Link>
              </Button>
            </div>
            <StaggerGroup className="grid gap-3 sm:grid-cols-3 sm:gap-3.5">
              {supportCards.map((item, index) => (
                <StaggerItem key={item.label}>
                  <div className="card-hover rounded-[1.15rem] border border-border/80 bg-background/85 p-4 shadow-[0_4px_14px_rgba(15,23,42,0.03)]">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground sm:text-[0.7rem]">
                        {item.label}
                      </p>
                      <span className="font-sans text-[0.68rem] font-semibold text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm font-medium leading-6 text-foreground/90 sm:text-[0.95rem]">
                      {item.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="card-hover border-border/90">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="muted">Featured comparison</Badge>
                  <span className="font-sans text-[0.72rem] text-muted-foreground">
                    Sample provider view
                  </span>
                </div>
                <CardTitle className="mt-2 text-[1.32rem] sm:text-[1.5rem]">
                  {featuredProvider.providerName}
                </CardTitle>
                <p className="text-sm leading-6 text-muted-foreground sm:leading-7">
                  Rate range {featuredProvider.interestRate}, processing fee{" "}
                  {featuredProvider.processingFee}, and loan amount range{" "}
                  {featuredProvider.loanAmountRange}.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/75 bg-muted/55 p-3.5 transition-colors hover:border-primary/15 hover:bg-muted/70">
                    <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      Why it may stand out
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground/90">
                      {featuredProvider.pros.join("; ")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/75 bg-muted/55 p-3.5 transition-colors hover:border-primary/15 hover:bg-muted/70">
                    <p className="font-sans text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
                      What to verify
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-foreground/90">
                      {featuredProvider.cons.join("; ")}
                    </p>
                  </div>
                </div>
                <Button asChild variant="secondary" className="w-full sm:w-auto">
                  <Link href="/personal-loans">View loan comparison hub</Link>
                </Button>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <Reveal className="container-shell py-9 sm:py-10 lg:py-11">
        <SectionHeading
          eyebrow="Why trust us"
          title="Designed as a practical decision-support publisher, not a lender."
          description="Version 1 keeps the scope narrow on purpose: personal loan comparison, EMI estimation, and clear educational content for borrowers in India."
        />
        <div className="mt-5 sm:mt-6">
          <TrustGrid />
        </div>
      </Reveal>

      <Reveal className="container-shell py-9 sm:py-10 lg:py-11" delay={0.05}>
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_300px] lg:items-start lg:gap-6">
          <div className="calculator-spotlight p-4 sm:p-5 lg:p-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge>Most-used tool</Badge>
              <span className="font-sans text-[0.75rem] text-muted-foreground">
                Start here for a quick EMI estimate
              </span>
            </div>
            <div className="mt-4">
              <SectionHeading
                eyebrow="Core tool"
                title="Estimate EMI before you compare providers."
                description="Use the embedded calculator to get a simple monthly repayment estimate, then move into the personal loan comparison hub for rate and fee context."
              />
            </div>
            <div className="mt-5 sm:mt-6">
              <EmiCalculator />
            </div>
          </div>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-[0.98rem] sm:text-base">What this calculator helps with</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-sm leading-6 text-muted-foreground sm:space-y-4 sm:leading-7">
              <div className="flex gap-3">
                <Calculator className="mt-1 size-4 shrink-0 text-primary" />
                <p>Estimate how tenure changes the monthly EMI burden.</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-1 size-4 shrink-0 text-primary" />
                <p>See the total repayment and total interest before applying.</p>
              </div>
              <div className="flex gap-3">
                <FileText className="mt-1 size-4 shrink-0 text-primary" />
                <p>Move directly into related guides and lender comparison pages.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Reveal>

      <Reveal className="container-shell py-9 sm:py-10 lg:py-11" delay={0.04}>
        <div className="flex flex-col gap-4 sm:gap-4.5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Latest articles"
            title="Recent personal loan guides"
            description="A small editorial library focused on common borrower questions and comparison intent."
          />
          <Button asChild variant="secondary" className="w-full md:w-auto">
            <Link href="/blog">Browse the blog</Link>
          </Button>
        </div>
        <StaggerGroup className="mt-5 grid gap-4 sm:mt-6 sm:gap-4.5 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>

      <Reveal className="container-shell py-9 sm:py-10">
        <DisclaimerBlock />
      </Reveal>
    </>
  );
}