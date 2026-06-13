import type { PublicEventData } from "@/lib/happily/types";

import { Button } from "@/components/ui/button";

import { Container } from "./container";
import {
  eventDateRange,
  eventTimeRange,
  registerCtaButtonClassName,
  text,
} from "./helpers";
import { ScrollLink } from "./scroll-link";

type FinalCtaSectionProps = {
  event: PublicEventData["event"];
  form?: PublicEventData["form"];
};

export function FinalCtaSection({ event, form }: FinalCtaSectionProps) {
  const content = event.content;
  const buttonLinks = event.display_settings.buttonLinks;
  const showRegister =
    form?.is_active &&
    !form.at_capacity &&
    buttonLinks?.heroCTA.display &&
    buttonLinks.heroCTA.text;

  const date = eventDateRange(event);
  const time = eventTimeRange(event);
  const ds = event.display_settings;

  const metaItems = [
    date && (ds.displayDate ?? true) ? date : null,
    time && (ds.displayTime ?? true) ? time : null,
    event.location && (ds.displayLocation ?? true) ? event.location : null,
  ].filter(Boolean) as string[];

  const ctaLabel = text(
    buttonLinks?.heroCTA.text ?? buttonLinks?.navCTA.text,
    "Reserve your spot",
  );

  const subtitle = text(
    content.heroText,
    "Join us for an unforgettable experience. Secure your place before seats fill up.",
  );

  return (
    <Container id="join" className="max-w-6xl pb-24 pt-8">
      <article className="final-cta-card group relative isolate overflow-hidden rounded-(--event-border-radius) bg-(--event-cta-bg) px-6 py-14 text-(--event-cta-text) shadow-[0_32px_80px_-24px_rgba(0,0,0,0.25)] ring-1 ring-white/0 sm:px-10 sm:py-16 lg:px-14 lg:py-20 hover:ring-white/15">
        {/* Hover shimmer sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="final-cta-shimmer absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/12 to-transparent" />
        </div>

        {/* Ambient glow */}
        <div
          aria-hidden
          className="final-cta-orb-a pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-(--event-accent-bg)/30 blur-3xl"
        />
        <div
          aria-hidden
          className="final-cta-orb-b pointer-events-none absolute -bottom-32 -right-16 size-96 rounded-full bg-(--event-tertiary-bg)/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_38%)] transition-[filter] duration-500 group-hover:brightness-110"
        />
        <div
          aria-hidden
          className="final-cta-grid pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight transition-transform duration-500 group-hover:scale-[1.015] sm:text-5xl lg:text-6xl">
            {text(event.name, "See you there")}
          </h2>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-(--event-cta-text)/75 transition-colors duration-300 group-hover:text-(--event-cta-text)/90 sm:text-lg">
            {subtitle}
          </p>

          {metaItems.length ? (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {metaItems.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-(--event-cta-text)/15 bg-(--event-cta-text)/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-(--event-cta-text)/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-(--event-cta-text)/30 hover:bg-(--event-cta-text)/18 sm:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {showRegister ? (
            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                className={`min-h-12 px-10 py-3.5 text-base transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100 ${registerCtaButtonClassName}`}
              >
                <ScrollLink href="#register">{ctaLabel}</ScrollLink>
              </Button>
            </div>
          ) : null}

          {form?.at_capacity ? (
            <p className="mt-8 rounded-full border border-(--event-cta-text)/20 bg-(--event-cta-text)/10 px-5 py-2 text-sm font-medium text-(--event-cta-text)/80">
              Registration is currently at capacity
            </p>
          ) : null}
        </div>

        {/* Corner accent */}
        <div
          aria-hidden
          className="final-cta-corner-a pointer-events-none absolute right-6 top-6 hidden size-16 border border-(--event-cta-text)/20 transition-all duration-500 sm:block lg:right-10 lg:top-10 lg:size-20"
        />
        <div
          aria-hidden
          className="final-cta-corner-b pointer-events-none absolute bottom-6 left-6 hidden size-10 border border-(--event-cta-text)/15 transition-all duration-500 sm:block lg:bottom-10 lg:left-10 lg:size-14"
        />
      </article>
    </Container>
  );
}
