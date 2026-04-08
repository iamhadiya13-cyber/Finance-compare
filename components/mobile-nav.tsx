"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav-link";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 rounded-full px-2.5"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
        <span className="text-[0.76rem]">Menu</span>
      </Button>

      {open ? (
        <div className="absolute inset-x-4 top-[4.1rem] z-50 rounded-[1.15rem] border border-border/85 bg-card p-2.5 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 font-sans text-sm font-medium text-foreground hover:bg-muted"
                activeClassName="bg-muted text-foreground"
              />
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}