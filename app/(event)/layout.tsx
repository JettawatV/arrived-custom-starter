import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { event } = await getPublicEvent();
  const { metadata } = event;

  return {
    title: metadata.title || event.name,
    description: metadata.description || "",
    ...(metadata.allow_search_engine_indexing === false && {
      robots: "noindex, nofollow",
    }),
    openGraph: {
      ...(metadata.image_url && { images: [metadata.image_url] }),
    },
  };
}

export default async function EventLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const eventData = await getPublicEvent();
  const styles = eventData.event.styles;

  const eventVars = {
    "--event-primary-bg": styleValue(styles, "primaryBg", "#2d2926"),
    "--event-primary-text": styleValue(styles, "primaryText", "#fdfbf7"),
    "--event-secondary-bg": styleValue(styles, "secondaryBg", "#6b705c"),
    "--event-secondary-bg-alt": styleValue(styles, "secondaryBgAlt", "#565b4a"),
    "--event-secondary-text": styleValue(styles, "secondaryText", "#fdfbf7"),
    "--event-tertiary-bg": styleValue(styles, "tertiaryBg", "#8b8378"),
    "--event-tertiary-text": styleValue(styles, "tertiaryText", "#8b8378"),
    "--event-accent-bg": styleValue(styles, "accentBg", "#f3eee5"),
    "--event-accent-text": styleValue(styles, "accentText", "#2d2926"),
    "--event-base-bg": styleValue(styles, "baseBg", "#fdfbf7"),
    "--event-base-text": styleValue(styles, "baseText", "#2d2926"),
    "--event-border-radius": styleValue(styles, "borderRadius", "8px"),
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${openSans.variable} ${openSans.className} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
