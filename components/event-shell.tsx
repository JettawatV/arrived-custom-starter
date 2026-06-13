import type { ReactNode } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { Footer } from "./footer";
import { Header } from "./header";
import { buildEventNav, styleValue, text } from "./helpers";

type EventShellProps = {
  eventData: PublicEventData;
  children: ReactNode;
};

export function EventShell({ eventData, children }: EventShellProps) {
  const { event } = eventData;
  const styles = event.styles;

  const nav = buildEventNav(event);

  const buttonLinks = event.display_settings.buttonLinks;
  const showCta =
    eventData.form?.is_active &&
    buttonLinks?.navCTA.display &&
    buttonLinks.navCTA.text;

  return (
    <div className="flex min-h-screen flex-col bg-(--event-base-bg) text-(--event-base-text)">
      <Header
        logo={event.logo_url}
        logoAlt={`${event.name} logo`}
        nav={nav}
        hideNavigation={event.display_settings.hideNavigation ?? false}
        ctaText={
          showCta ? text(buttonLinks!.navCTA.text, "Register") : undefined
        }
        ctaHref={showCta ? "/#register" : undefined}
      />
      {children}
      <Footer baseTextColor={styleValue(styles, "baseText", "#171717")} />
    </div>
  );
}
