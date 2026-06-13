import Image from "next/image";
import type { CSSProperties } from "react";

import type { PublicEventData } from "@/lib/happily/types";

import { ordered } from "./helpers";

type SponsorsGridProps = {
  sponsors: PublicEventData["sponsors"];
};

const LOGO_HEIGHT = 52;
const LOGO_MAX_WIDTH = 180;

function SponsorLogo({
  sponsor,
}: {
  sponsor: PublicEventData["sponsors"][number];
}) {
  const content = (
    <div
      className="flex shrink-0 items-center justify-center px-2"
      style={{ height: `${LOGO_HEIGHT}px`, width: `${LOGO_MAX_WIDTH}px` }}
    >
      {sponsor.logo_url ? (
        <Image
          src={sponsor.logo_url}
          alt={sponsor.name}
          width={LOGO_MAX_WIDTH}
          height={LOGO_HEIGHT}
          className="h-full w-full object-contain"
        />
      ) : (
        <p className="text-center text-sm font-semibold">{sponsor.name}</p>
      )}
    </div>
  );

  if (sponsor.website) {
    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 transition-opacity hover:opacity-70"
      >
        {content}
      </a>
    );
  }

  return content;
}

export function SponsorsGrid({ sponsors }: SponsorsGridProps) {
  const items = ordered(sponsors);

  if (!items.length) return null;

  const loop = [...items, ...items];
  const duration = Math.max(items.length * 6, 24);

  return (
    <div
      className="sponsors-marquee relative overflow-hidden pt-12"
      style={
        { "--sponsors-marquee-duration": `${duration}s` } as CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-(--event-base-bg) to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-(--event-base-bg) to-transparent sm:w-24"
      />

      <div className="sponsors-marquee-track flex w-max items-center gap-12 md:gap-16">
        {loop.map((sponsor, index) => (
          <SponsorLogo key={`${sponsor.id}-${index}`} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
