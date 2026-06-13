import { notFound } from "next/navigation";

import { ContentSection } from "@/components/content-section";
import { hasText, isSectionDisplayed, text } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function AboutPage() {
  const { event } = await getPublicEvent();
  const content = event.content;

  if (
    !isSectionDisplayed(event.display_settings, "about") ||
    (!hasText(content.aboutTitle) && !hasText(content.aboutDescription))
  ) {
    notFound();
  }

  return (
    <main>
      <ContentSection
        id="about"
        title={text(content.aboutTitle, "About")}
        description={content.aboutDescription}
        image={content.aboutImage}
      />
    </main>
  );
}
