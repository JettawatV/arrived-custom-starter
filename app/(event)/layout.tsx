import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../globals.css";

import { EventShell } from "@/components/event-shell";
import { styleValue } from "@/components/helpers";
import { getPublicEvent } from "@/lib/happily/queries";
import type { PublicEventData } from "@/lib/happily/types";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
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
  const headersAutoColor = (
    styles as PublicEventData["event"]["styles"] & { headersAutoColor?: boolean }
  ).headersAutoColor;

  const eventVars = {
    "--event-primary-bg": styleValue(styles, "primaryBg", "#171717"),
    "--event-primary-text": styleValue(styles, "primaryText", "#ffffff"),
    "--event-secondary-bg": styleValue(styles, "secondaryBg", "#f4f4f5"),
    "--event-secondary-bg-alt": styleValue(styles, "secondaryBgAlt", "#6b705c"),
    "--event-secondary-text": styleValue(styles, "secondaryText", "#171717"),
    "--event-cta-bg": styleValue(styles, "secondaryBgAlt", "#6b705c"),
    "--event-cta-text": styleValue(styles, "primaryText", "#ffffff"),
    "--event-tertiary-bg": styleValue(styles, "tertiaryBg", "#8b8378"),
    "--event-tertiary-text": styleValue(styles, "tertiaryText", "#171717"),
    "--event-accent-bg": styleValue(styles, "accentBg", "#f3eee5"),
    "--event-accent-text": styleValue(styles, "accentText", "#171717"),
    "--event-base-bg": styleValue(styles, "baseBg", "#ffffff"),
    "--event-base-text": styleValue(styles, "baseText", "#171717"),
    "--event-heading-text": headersAutoColor
      ? styleValue(styles, "tertiaryText", "#171717")
      : styleValue(styles, "baseText", "#171717"),
    "--event-border-radius": styleValue(styles, "borderRadius", "8px"),
    "--event-font-primary": `"${styleValue(styles, "fontPrimary", "Cormorant Garamond")}", var(--font-cormorant), serif`,
    "--event-font-secondary": `"${styleValue(styles, "fontSecondary", "Inter")}", var(--font-inter), sans-serif`,
  } as CSSProperties;

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body style={eventVars} className="min-h-full flex flex-col">
        <EventShell eventData={eventData}>{children}</EventShell>
      </body>
    </html>
  );
}
