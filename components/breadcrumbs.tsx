import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  href: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="size-4" /> : null}
            <Link href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}