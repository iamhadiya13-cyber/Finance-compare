import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type MiniComparisonRow = {
  lender: string;
  interestRate: string;
  maxLoan: string;
  bestFor: string;
  href: string;
  highlight?: boolean;
};

const miniComparisonRows: MiniComparisonRow[] = [
  {
    lender: "HDFC Bank",
    interestRate: "10.75% onwards",
    maxLoan: "Up to ₹40 lakh",
    bestFor: "Salaried users",
    href: "/personal-loans",
    highlight: true,
  },
  {
    lender: "ICICI Bank",
    interestRate: "10.90% onwards",
    maxLoan: "Up to ₹50 lakh",
    bestFor: "Fast approval",
    href: "/personal-loans",
  },
  {
    lender: "Axis Bank",
    interestRate: "11.25% onwards",
    maxLoan: "Up to ₹40 lakh",
    bestFor: "Existing bank customers",
    href: "/personal-loans",
  },
  {
    lender: "NBFC Option",
    interestRate: "14.50% onwards",
    maxLoan: "Up to ₹15 lakh",
    bestFor: "Low credit score",
    href: "/personal-loans",
  },
];

const ctaButtonClass =
  "translate-y-0 font-semibold text-primary-foreground shadow-sm hover:-translate-y-px hover:bg-primary/92 hover:text-primary-foreground hover:shadow-md focus-visible:text-primary-foreground";

const ctaLinkClass =
  "!text-primary-foreground !no-underline opacity-100 hover:!text-primary-foreground focus-visible:!text-primary-foreground";

export function MiniLoanComparisonTable() {
  return (
    <div className="my-6 rounded-[1.1rem] border border-border/70 bg-card/75 p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-4.5">
      <div className="mb-3.5">
        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary">
          Quick lender snapshot
        </p>
        <p className="mt-1 text-sm font-medium leading-6 text-foreground/90">
          Compare top loan options instantly and apply in minutes.
        </p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          A simplified comparison for quick scanning before you review full lender details.
        </p>
      </div>

      <div className="overflow-x-auto rounded-[0.95rem] border border-border/70">
        <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead className="bg-muted/65 font-sans text-[0.76rem] uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Lender</th>
              <th className="px-4 py-3 font-semibold">Interest Rate</th>
              <th className="px-4 py-3 font-semibold">Max Loan</th>
              <th className="px-4 py-3 font-semibold">Best For</th>
              <th className="px-4 py-3 text-right font-semibold">Apply</th>
            </tr>
          </thead>
          <tbody>
            {miniComparisonRows.map((row) => (
              <tr key={row.lender} className="border-t border-border/70 transition-colors duration-200 hover:bg-muted/35">
                <td className="px-4 py-3.5 font-sans text-[0.95rem] font-semibold text-foreground">
                  <div className="flex items-center gap-2.5">
                    <span>{row.lender}</span>
                    {row.highlight ? (
                      <Badge variant="muted" className="font-sans text-[0.68rem] text-primary">
                        ⭐ Recommended
                      </Badge>
                    ) : null}
                  </div>
                </td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.interestRate}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.maxLoan}</td>
                <td className="px-4 py-3.5">
                  <Badge variant="muted" className="font-sans text-[0.72rem]">
                    {row.bestFor}
                  </Badge>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Button asChild size="sm" className={ctaButtonClass}>
                    <Link href={row.href} className={ctaLinkClass}>
                      Apply Now →
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3.5 text-xs leading-5 text-muted-foreground">
        Based on typical eligibility for ₹30,000 salary profiles. Actual offers may vary.
      </p>
    </div>
  );
}
