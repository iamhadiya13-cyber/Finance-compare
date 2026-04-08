"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="flex h-8 items-center rounded-full border border-border/80 bg-card/90 p-1 shadow-sm sm:h-9">
      <button
        type="button"
        aria-label="Use light theme"
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground sm:h-7 sm:w-7",
          mounted && !isDark && "bg-muted text-foreground shadow-sm"
        )}
      >
        <Sun className="size-3.5" />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground sm:h-7 sm:w-7",
          isDark && "bg-muted text-foreground shadow-sm"
        )}
      >
        <Moon className="size-3.5" />
      </button>
    </div>
  );
}