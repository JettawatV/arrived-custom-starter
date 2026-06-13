import { notFound } from "next/navigation";

import { FaqSection } from "@/components/faq-section";
import { hasFaqSectionContent, isSectionDisplayed } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function FaqPage() {
  const eventData = await getPublicEvent();
  const { event, faqs } = eventData;
  const content = event.content;

  if (
    !isSectionDisplayed(event.display_settings, "faq") ||
    !hasFaqSectionContent(faqs, content.faqsTitle, content.faqsDescription)
  ) {
    notFound();
  }

  return (
    <main>
      <FaqSection event={event} faqs={faqs} large />
    </main>
  );
}
