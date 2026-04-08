import { navigation } from "@/lib/site";
import { SiteLogo } from "@/components/site-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { NavLink } from "@/components/nav-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/94 backdrop-blur-xl supports-[backdrop-filter]:bg-background/86">
      <div className="container-shell relative flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-4">
        <div className="min-w-0 shrink">
          <SiteLogo />
        </div>

        <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-card/80 p-1 md:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              className="rounded-full px-3 py-2 font-sans text-[0.88rem] font-medium text-muted-foreground hover:text-foreground"
              activeClassName="bg-muted text-foreground shadow-sm"
            />
          ))}
        </nav>

        <div className="flex items-center gap-1.5 rounded-full border border-border/70 bg-card/85 p-1 sm:gap-2">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}