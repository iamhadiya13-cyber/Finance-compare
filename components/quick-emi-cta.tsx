"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function QuickEmiCta() {
  const pathname = usePathname();

  if (pathname === "/calculators/personal-loan-emi-calculator") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="fixed inset-x-4 bottom-4 z-40 md:hidden"
    >
      <Link
        href="/calculators/personal-loan-emi-calculator"
        className="flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary px-4 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_rgba(31,41,55,0.18)]"
      >
        <Calculator className="size-4" />
        Quick EMI Estimate
      </Link>
    </motion.div>
  );
}