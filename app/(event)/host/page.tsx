import { notFound } from "next/navigation";

import { ContentSection } from "@/components/content-section";
import { hasText, text } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

export default async function HostPage() {
  const { event } = await getPublicEvent();
  const content = event.content;

  if (
    !hasText(content.companyAboutTitle) &&
    !hasText(content.companyAboutDescription)
  ) {
    notFound();
  }

  return (
    <main>
      <ContentSection
        id="host"
        title={text(content.companyAboutTitle, "About the Host")}
        description={content.companyAboutDescription}
        image={content.companyAboutImage}
      />
    </main>
  );
}
