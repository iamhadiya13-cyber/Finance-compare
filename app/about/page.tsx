import Link from "next/link";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn what FinanceCompare.in is, what it does, and how it approaches personal loan comparison content for educational use.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="container-page py-12 sm:py-14">
      <div className="max-w-5xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">About FinanceCompare.in</h1>
        <div className="prose-finance">
          <p>
            {siteConfig.name} is an independent comparison and educational website
            focused on helping users understand personal loan options, estimate EMI,
            and review common borrowing questions before they approach a lender.
          </p>
          <p>
            The editorial purpose is simple: organize scattered borrowing information
            into pages that are easier to compare, easier to read, and clearer about
            what still needs to be verified with an official lender.
          </p>
          <p>
            The website is not a lender, not a loan agent, and not a financial
            advisory service. It exists to support better research decisions through
            comparison content, practical tools, and tightly scoped guides.
          </p>
          <p>
            Version 1 is intentionally narrow. It focuses on personal loans in
            India first so the content, tools, and comparison structure remain
            useful and maintainable for a solo founder.
          </p>
          <p>
            If you are new to the site, start with the{" "}
            <Link href="/personal-loans">personal loan hub</Link>, use the{" "}
            <Link href="/calculators/personal-loan-emi-calculator">EMI calculator</Link>,
            and then move into the <Link href="/blog">blog</Link> for narrower
            questions around salary, EMI, and loan understanding.
          </p>
        </div>
      </div>
    </section>
  );
}
