import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-primary/12 bg-primary/8 text-primary",
        outline: "border-border bg-background text-foreground",
        muted: "border-border/70 bg-muted/70 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };