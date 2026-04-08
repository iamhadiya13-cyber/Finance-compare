import loanData from "@/lib/data/insurance-data.json";

export type LoanEntry = {
  providerName: string;
  interestRate: string;
  processingFee: string;
  minSalary: number;
  maxTenureMonths: number;
  loanAmountRange: string;
  pros: string[];
  cons: string[];
  rating: number;
  lastUpdated: string;
};

export const personalLoanProviders = loanData as LoanEntry[];
