import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { isSectionDisplayed, text } from "@/components/helpers";
import { SectionHeading } from "@/components/section-heading";
import { SponsorsGrid } from "@/components/sponsors-grid";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function SponsorsPage() {
  const eventData = await getPublicEvent();
  const { event, sponsors } = eventData;
  const content = event.content;

  if (
    !isSectionDisplayed(event.display_settings, "sponsors") ||
    !sponsors.length
  ) {
    notFound();
  }

  return (
    <main>
      <Container id="sponsors">
        <SectionHeading
          title={text(content.sponsorsTitle, "Sponsors")}
          description={content.sponsorsDescription}
        />
        <div className="mt-8">
          <SponsorsGrid sponsors={sponsors} />
        </div>
      </Container>
    </main>
  );
}
