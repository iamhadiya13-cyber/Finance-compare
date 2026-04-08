import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("size-4", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="8" width="48" height="48" rx="16" fill="currentColor" opacity="0.14" />
      <path
        d="M21 42V24.5C21 23.6716 21.6716 23 22.5 23H41.5C42.3284 23 43 23.6716 43 24.5V42"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 28L32 18L47 28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M27 30H37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M27 36H37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 24V42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
