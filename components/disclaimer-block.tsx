import { AlertTriangle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function DisclaimerBlock() {
  return (
    <div className="surface flex gap-4 p-5 text-sm leading-7 text-muted-foreground">
      <AlertTriangle className="mt-1 size-5 shrink-0 text-primary" />
      <div>
        <p className="font-sans font-semibold text-foreground">Important disclaimer</p>
        <p>
          {siteConfig.trustDisclaimer} Rates, fees, and eligibility can change.
          Always verify the latest information with the official provider before
          applying.
        </p>
      </div>
    </div>
  );
}