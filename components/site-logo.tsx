import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site";

export function SiteLogo() {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm sm:size-9">
        <BrandMark className="size-4 sm:size-[1.05rem]" />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate font-sans text-[0.92rem] font-semibold tracking-tight sm:text-[0.98rem]">
          {siteConfig.name}
        </span>
        <span className="hidden truncate font-sans text-[0.69rem] text-muted-foreground sm:block">
          Personal loan comparison and EMI tools
        </span>
      </span>
    </Link>
  );
}
