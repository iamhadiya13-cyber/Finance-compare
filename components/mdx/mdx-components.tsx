import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { EmiCalculator } from "@/components/emi/emi-calculator";
import { DisclaimerBlock } from "@/components/disclaimer-block";
import { MiniLoanComparisonTable } from "@/components/blog/mini-loan-comparison-table";
import { cn } from "@/lib/utils";

const ctaHrefs = new Set([
  "/calculators/personal-loan-emi-calculator",
  "/personal-loans",
]);

export const mdxComponents: MDXComponents = {
  a: ({ className, href, ...props }) => {
    const linkHref = href ?? "#";
    const isCtaLink = typeof linkHref === "string" && ctaHrefs.has(linkHref);

    return (
      <Link
        {...props}
        href={linkHref}
        className={cn(
          className,
          isCtaLink &&
            "inline-flex items-center rounded-md border border-border/75 bg-muted/75 px-2.5 py-1 font-sans text-[0.94rem] font-semibold text-foreground no-underline shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-px hover:border-border hover:bg-accent/80 hover:text-foreground"
        )}
      />
    );
  },
  table: ({ className, ...props }) => (
    <div className="my-5 overflow-x-auto rounded-2xl border border-border">
      <table {...props} className={cn("w-full min-w-[34rem] border-collapse text-sm", className)} />
    </div>
  ),
  EmiCalculator: () => <EmiCalculator compact />,
  DisclaimerBlock: () => <DisclaimerBlock />,
  MiniLoanComparisonTable: () => <MiniLoanComparisonTable />,
};
