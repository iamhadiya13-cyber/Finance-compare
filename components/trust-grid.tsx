import { FileCheck, Landmark, Scale, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Independent and neutral",
    description:
      "FinanceCompare.in is designed as an educational comparison site, not a lender or sales funnel.",
  },
  {
    icon: Scale,
    title: "Methodology is visible",
    description:
      "Comparison pages explain the factors reviewed, including rate ranges, fees, and income thresholds.",
  },
  {
    icon: FileCheck,
    title: "Content is clearly labeled",
    description:
      "Guides, comparison content, and calculator pages are separated so users know what type of page they are reading.",
  },
  {
    icon: Landmark,
    title: "Built for better borrowing decisions",
    description:
      "The focus is practical decision support: EMI estimation, affordability context, and lender comparison.",
  },
];

export function TrustGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {trustItems.map((item, index) => (
        <Card key={item.title} className="card-hover h-full">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-primary/10 bg-primary/7 text-primary">
                <item.icon className="size-4.5" />
              </span>
              <span className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                0{index + 1}
              </span>
            </div>
            <CardTitle className="mt-1 leading-6">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}