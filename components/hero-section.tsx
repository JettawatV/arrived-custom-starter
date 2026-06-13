import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { Button } from "@/components/ui/button";

import { ScrollLink } from "./scroll-link";
import { EventDetails } from "./event-details";
import { heroImage, hasText, registerCtaButtonClassName, text } from "./helpers";
import { Container } from "./container";

type HeroSectionProps = {
  event: PublicEventData["event"];
  formActive?: boolean;
};

export function HeroSection({ event, formActive }: HeroSectionProps) {
  const content = event.content;
  const heroSectionType = content.heroSection ?? "image";
  const image = heroImage(content);
  const overlayOpacity =
    content.overlay === "0%" ? "bg-black/0" : "bg-black/50";
  const hasBackground = heroSectionType !== "none";

  return (
    <section className="relative isolate overflow-hidden">
      {hasBackground && (
        <>
          {heroSectionType === "video" && content.heroVideo && (
            <video
              key={content.heroVideo}
              className="hero-reveal-bg absolute inset-0 -z-20 size-full object-cover"
              loop
              muted
              autoPlay
              playsInline
            >
              <source src={content.heroVideo} type="video/mp4" />
            </video>
          )}
          {heroSectionType === "image" && image && (
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero-reveal-bg absolute inset-0 -z-20 object-cover"
            />
          )}
          <div
            className={`hero-reveal-bg absolute inset-0 -z-10 ${overlayOpacity}`}
          />
        </>
      )}
      <Container
        id="hero"
        reveal={false}
        className="grid content-end max-w-7xl py-20 min-h-[50vh]"
      >
        <div className="max-w-3xl">
          <p className="hero-reveal-item hero-reveal-item-1 mb-4 text-sm font-semibold uppercase tracking-[0.18em]">
            {text(content.companyName, event.type ?? "Event")}
          </p>
          <h1 className="hero-reveal-item hero-reveal-item-2 text-5xl font-semibold leading-tight sm:text-7xl">
            {text(event.name, event.name)}
          </h1>
          <div className="hero-reveal-item hero-reveal-item-3">
            <EventDetails event={event} />
          </div>
          {hasText(content.heroText) ? (
            <p className="hero-reveal-item hero-reveal-item-4">
              {text(content.heroText)}
            </p>
          ) : null}
          {formActive &&
          event.display_settings.buttonLinks?.heroCTA.display &&
          event.display_settings.buttonLinks.heroCTA.text ? (
            <Button
              asChild
              size="lg"
              className={`hero-reveal-item hero-reveal-item-5 mt-4 min-h-12 px-8 py-3 text-base ${registerCtaButtonClassName}`}
            >
              <ScrollLink href="#register">
                {text(
                  event.display_settings.buttonLinks.heroCTA.text,
                  "Register",
                )}
              </ScrollLink>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
