import { notFound } from "next/navigation";

import { Container } from "@/components/container";
import { isSectionDisplayed, text } from "@/components/helpers";
import { SectionHeading } from "@/components/section-heading";
import { SpeakersGrid } from "@/components/speakers-grid";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function SpeakersPage() {
  const eventData = await getPublicEvent();
  const { event, speakers } = eventData;
  const content = event.content;

  if (
    !isSectionDisplayed(event.display_settings, "speakers") ||
    !speakers.length
  ) {
    notFound();
  }

  return (
    <main>
      <Container id="speakers">
        <SectionHeading
          title={text(content.speakersTitle, "Speakers")}
          description={content.speakersDescription}
        />
        <div className="mt-8">
          <SpeakersGrid speakers={speakers} />
        </div>
      </Container>
    </main>
  );
}
