export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalRepayment: number;
};

export function calculateEmi(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EmiResult {
  if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
    return {
      emi: 0,
      totalInterest: 0,
      totalRepayment: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalRepayment = emi * tenureMonths;
  const totalInterest = totalRepayment - principal;

  return {
    emi,
    totalInterest,
    totalRepayment,
  };
}
