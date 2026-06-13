import type { PublicEventData } from "@/lib/happily/types";

import { Container } from "./container";
import { FaqList } from "./faq-list";
import {
  hasFaqSectionContent,
  isSectionDisplayed,
  resolveEventFaqs,
  text,
} from "./helpers";
import { SectionHeading } from "./section-heading";

type FaqSectionProps = {
  event: PublicEventData["event"];
  faqs: PublicEventData["faqs"];
  large?: boolean;
};

export function FaqSection({ event, faqs, large = false }: FaqSectionProps) {
  const content = event.content;

  if (
    !isSectionDisplayed(event.display_settings, "faq") ||
    !hasFaqSectionContent(faqs, content.faqsTitle, content.faqsDescription)
  ) {
    return null;
  }

  const { intro, items } = resolveEventFaqs(faqs, content.faqsDescription);

  return (
    <Container id="faqs">
      <SectionHeading
        title={text(content.faqsTitle, "FAQs")}
        description={intro ?? (faqs.length ? content.faqsDescription : null)}
        titleClassName={
          large ? "text-4xl font-semibold sm:text-5xl" : undefined
        }
        descriptionClassName={
          large ? "mt-4 text-lg opacity-80 md:text-xl" : undefined
        }
      />
      {items.length ? (
        <div className={large ? "mt-10" : "mt-8"}>
          <FaqList faqs={items} large={large} />
        </div>
      ) : null}
    </Container>
  );
}
