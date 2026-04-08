"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { calculateEmi } from "@/lib/emi";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type EmiCalculatorProps = {
  compact?: boolean;
};

function AnimatedMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-muted/55 p-3.5 sm:p-4">
      <p className="font-sans text-[0.66rem] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1.5 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg font-semibold tracking-tight text-foreground sm:text-xl"
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function EmiCalculator({ compact = false }: EmiCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState("500000");
  const [interestRate, setInterestRate] = useState("12");
  const [tenureMonths, setTenureMonths] = useState("36");

  const parsedAmount = Number(loanAmount);
  const parsedRate = Number(interestRate);
  const parsedTenure = Number(tenureMonths);

  const result = useMemo(
    () => calculateEmi(parsedAmount, parsedRate, parsedTenure),
    [parsedAmount, parsedRate, parsedTenure]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="overflow-hidden border-border/90">
        <CardHeader className={compact ? "p-4" : "p-4 sm:p-5"}>
          <CardTitle className={compact ? "text-[0.98rem]" : "text-[1rem] sm:text-[1.08rem]"}>
            Personal Loan EMI Calculator
          </CardTitle>
          <p className="text-sm leading-6 text-muted-foreground">
            Estimate monthly EMI, total interest, and total repayment before comparing lenders.
          </p>
        </CardHeader>
        <CardContent className={compact ? "space-y-4 p-4 pt-0" : "space-y-4 p-4 pt-0 sm:space-y-5 sm:p-5 sm:pt-0"}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="space-y-1.5">
              <span className="font-sans text-[0.8rem] font-medium text-foreground/90">
                Loan amount
              </span>
              <Input
                inputMode="numeric"
                value={loanAmount}
                onChange={(event) => setLoanAmount(event.target.value)}
                aria-label="Loan amount"
              />
            </label>
            <label className="space-y-1.5">
              <span className="font-sans text-[0.8rem] font-medium text-foreground/90">
                Interest rate (%)
              </span>
              <Input
                inputMode="decimal"
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
                aria-label="Interest rate"
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2 lg:col-span-1">
              <span className="font-sans text-[0.8rem] font-medium text-foreground/90">
                Tenure (months)
              </span>
              <Input
                inputMode="numeric"
                value={tenureMonths}
                onChange={(event) => setTenureMonths(event.target.value)}
                aria-label="Tenure in months"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <AnimatedMetric label="Monthly EMI" value={formatCurrency(result.emi)} />
            <AnimatedMetric label="Total interest" value={formatCurrency(result.totalInterest)} />
            <AnimatedMetric label="Total repayment" value={formatCurrency(result.totalRepayment)} />
          </div>

          <p className="text-sm leading-6 text-muted-foreground">
            This estimate assumes a fixed interest rate across the selected tenure.
            Actual lender offers can differ based on credit profile, employer, city,
            fees, and approval terms.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}