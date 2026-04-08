"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/blog";
import { cn } from "@/lib/utils";

const HEADING_OFFSET = 136;

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    let frame = 0;

    const updateActiveHeading = () => {
      frame = 0;
      const headings = ids
        .map((id) => document.getElementById(id))
        .filter((heading): heading is HTMLElement => Boolean(heading));

      if (headings.length === 0) {
        return;
      }

      const passedHeadings = headings.filter(
        (heading) => heading.getBoundingClientRect().top - HEADING_OFFSET <= 0
      );

      const nextActive =
        passedHeadings.at(-1)?.id ??
        headings
          .slice()
          .sort(
            (a, b) =>
              Math.abs(a.getBoundingClientRect().top - HEADING_OFFSET) -
              Math.abs(b.getBoundingClientRect().top - HEADING_OFFSET)
          )[0]?.id ??
        ids[0];

      setActiveId((current) => (current === nextActive ? current : nextActive));
    };

    const onScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateActiveHeading);
    };

    updateActiveHeading();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 rounded-[1rem] border border-border/55 bg-background/55 px-3.5 py-3.5 shadow-none backdrop-blur-sm">
      <p className="font-sans text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90">
        On this page
      </p>
      <ul className="mt-3.5 space-y-3">
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "block rounded-md border-l-2 border-transparent px-2 py-1.5 text-[0.81rem] leading-[1.5] text-muted-foreground/90 transition-colors duration-200 hover:text-foreground",
                  item.level === 3 && "ml-2 pl-3.5",
                  isActive &&
                    "border-primary/50 bg-muted/55 text-foreground"
                )}
              >
                {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
