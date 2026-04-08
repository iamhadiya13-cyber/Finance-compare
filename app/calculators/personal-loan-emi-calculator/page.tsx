import Link from "next/link";
import type { Metadata } from "next";
import { createBreadcrumbJsonLd, createMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { EmiCalculator } from "@/components/emi/emi-calculator";
import { FaqList, type FaqItem } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = createMetadata({
  title: "Personal Loan EMI Calculator",
  description:
    "Calculate personal loan EMI, total repayment, and total interest using a simple personal loan EMI calculator for India.",
  path: "/calculators/personal-loan-emi-calculator",
});

const faqItems: FaqItem[] = [
  {
    question: "What is EMI in a personal loan?",
    answer:
      "EMI stands for Equated Monthly Instalment. It is the fixed monthly payment used to repay a loan over the chosen tenure, including both principal and interest.",
  },
  {
    question: "Why does tenure change the EMI so much?",
    answer:
      "A longer tenure spreads the repayment over more months, which lowers the monthly EMI but usually increases total interest paid over the life of the loan.",
  },
  {
    question: "Does this calculator include fees?",
    answer:
      "No. This version focuses on EMI, total interest, and total repayment based on the stated loan amount, interest rate, and tenure. Processing fees and insurance charges are usually separate.",
  },
  {
    question: "Can the final lender EMI be different?",
    answer:
      "Yes. The final offer can differ due to approved rate, disbursal amount, fees, repayment schedule, and lender policy. Always check the lender's final sanction terms.",
  },
];

export default function PersonalLoanEmiCalculatorPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Calculators", path: "/calculators/personal-loan-emi-calculator" },
    {
      name: "Personal Loan EMI Calculator",
      path: "/calculators/personal-loan-emi-calculator",
    },
  ]);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Reveal className="container-page py-10 sm:py-12">
        <div className="space-y-5">
          <Breadcrumbs
            items={[
              { href: "/", label: "Home" },
              {
                href: "/calculators/personal-loan-emi-calculator",
                label: "Personal Loan EMI Calculator",
              },
            ]}
          />
          <div className="max-w-3xl space-y-3.5">
            <Badge>Quick EMI estimate</Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-[2.45rem]">
              Personal loan EMI calculator
            </h1>
            <p className="text-[1rem] leading-7 text-muted-foreground">
              Estimate monthly EMI, total repayment, and total interest using a
              simple calculator designed for personal loan research in India.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="container-page pb-8 sm:pb-10" delay={0.05}>
        <div className="calculator-spotlight p-4 sm:p-5 lg:p-6">
          <EmiCalculator />
        </div>
      </Reveal>

      <Reveal className="container-page py-4 sm:py-6" delay={0.08}>
        <div className="surface p-5 text-sm leading-6 text-muted-foreground">
          <p className="font-sans text-[0.95rem] font-semibold text-foreground">
            How to use this result
          </p>
          <p className="mt-3">
            Start with a realistic rate range from lender comparison pages. If the
            EMI feels stretched, adjust the tenure or reduce the target loan amount
            before comparing providers. This calculator is meant to support early
            decision-making, not replace the lender&apos;s final offer document.
          </p>
          <p className="mt-3">
            Next: review the{" "}
            <Link href="/personal-loans" className="text-primary underline">
              personal loan hub
            </Link>{" "}
            or read the{" "}
            <Link
              href="/blog/how-much-personal-loan-can-i-get-based-on-my-salary-india"
              className="text-primary underline"
            >
              EMI explainer article
            </Link>
            .
          </p>
        </div>
      </Reveal>

      <Reveal className="container-page py-10 sm:py-12" delay={0.1}>
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions about EMI calculation"
        />
        <div className="mt-6">
          <FaqList items={faqItems} />
        </div>
      </Reveal>

      <Reveal className="container-page pb-12 sm:pb-14">
        <DisclaimerBlock />
      </Reveal>
    </>
  );
}