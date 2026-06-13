import type { PublicEventData } from "@/lib/happily/types";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import type { DisplayFaq } from "./helpers";
import { ordered } from "./helpers";
import { Markdown } from "./markdown";

type FaqListProps = {
  faqs: DisplayFaq[] | PublicEventData["faqs"];
  large?: boolean;
};

export function FaqList({ faqs, large = false }: FaqListProps) {
  return (
    <Accordion type="multiple" className="grid gap-3">
      {ordered(faqs).map((faq) => (
        <AccordionItem
          key={faq.id}
          value={String(faq.id)}
          className="border-t-0 border-x-0 border-b px-0 border-(--event-base-text) bg-(--event-base-bg) pb-3 text-(--event-base-text)"
        >
          <AccordionTrigger
            className={
              large
                ? "text-lg font-semibold hover:no-underline md:text-xl"
                : "text-base font-semibold tracking-wider hover:no-underline md:text-lg lg:text-xl"
            }
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className={
              large
                ? "text-base text-(--event-base-text)/90 md:text-lg"
                : "text-sm leading-relaxed tracking-wide text-(--event-base-text)/90"
            }
          >
            <Markdown>{faq.answer}</Markdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
