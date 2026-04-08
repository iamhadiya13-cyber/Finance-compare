"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

export function NavLink({
  href,
  label,
  className,
  activeClassName,
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {label}
    </Link>
  );
}