import { notFound } from "next/navigation";

import { AgendaList } from "@/components/agenda-list";
import { Container } from "@/components/container";
import { isSectionDisplayed, text } from "@/components/helpers";
import { SectionHeading } from "@/components/section-heading";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function AgendaPage() {
  const eventData = await getPublicEvent();
  const { event, sessions, speakers, tracks } = eventData;
  const content = event.content;

  if (!isSectionDisplayed(event.display_settings, "agenda") || !sessions.length) {
    notFound();
  }

  return (
    <main>
      <Container id="agenda">
        <SectionHeading
          title={text(content.agendaTitle, "Agenda")}
          description={content.agendaDescription}
        />
        <div className="mt-8">
          <AgendaList
            sessions={sessions}
            speakers={speakers}
            tracks={tracks}
            event={event}
          />
        </div>
      </Container>
    </main>
  );
}
