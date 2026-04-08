import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Disclaimer",
  description:
    "Read the FinanceCompare.in disclaimer, including its independent editorial role and non-advisory status.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <section className="container-page py-12 sm:py-14">
      <div className="max-w-5xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Disclaimer</h1>
        <div className="prose-finance">
          <p>
            FinanceCompare.in is an independent comparison website for
            informational and educational use only.
          </p>
          <p>
            We are not a lender, loan agent, broker, or financial advisor. Nothing
            on this website should be interpreted as a recommendation, guarantee of
            approval, or personalized financial advice.
          </p>
          <p>
            Product terms, interest rates, fees, eligibility criteria, and lender
            policies may change without notice. Users should verify all details
            directly with official provider sources before making any financial
            decision.
          </p>
        </div>
      </div>
    </section>
  );
}
