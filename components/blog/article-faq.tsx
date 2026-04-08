"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { slugify } from "@/lib/utils";

type ArticleFaqItem = {
  question: string;
  answer: string;
};

export function ArticleFaq({ items }: { items: ArticleFaqItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id={slugify("FAQ")} className="mt-12 scroll-m-24">
      <h2 className="text-[1.58rem] font-semibold tracking-tight text-foreground">
        FAQ
      </h2>
      <div className="mt-5 rounded-[1.1rem] border border-border/70 bg-card/70">
        <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-border/70">
          {items.map((item) => {
            const itemId = slugify(item.question);

            return (
              <AccordionPrimitive.Item key={itemId} value={itemId} id={itemId} className="px-4 sm:px-5">
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left font-sans text-[0.96rem] font-medium leading-6 text-foreground transition-colors hover:text-primary">
                    <span>{item.question}</span>
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover:text-primary">
                      <Plus className="absolute size-4 transition-all duration-200 group-data-[state=open]:scale-0 group-data-[state=open]:opacity-0" />
                      <Minus className="absolute size-4 opacity-0 transition-all duration-200 group-data-[state=open]:opacity-100" />
                    </span>
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pb-4 text-[0.96rem] leading-7 text-muted-foreground data-[state=closed]:opacity-0 data-[state=open]:opacity-100 transition-opacity duration-200">
                    <p>{item.answer}</p>
                  </div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            );
          })}
        </AccordionPrimitive.Root>
      </div>
    </section>
  );
}
