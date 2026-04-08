import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl space-y-2.5 sm:space-y-3", className)}>
      {eyebrow ? (
        <p className="font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary sm:text-xs">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.9rem] lg:text-[2.1rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-[0.96rem] leading-7 text-muted-foreground sm:text-[1rem] sm:leading-7 lg:text-[1.05rem] lg:leading-8">
          {description}
        </p>
      ) : null}
    </div>
  );
}