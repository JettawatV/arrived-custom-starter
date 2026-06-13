"use client";

import Image from "next/image";

import type { PublicEventData } from "@/lib/happily/types";

import { SocialIcon } from "react-social-icons";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/markdown";

type SpeakerCardProps = {
  speaker: PublicEventData["speakers"][number];
};

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const links = [...(speaker.website_url ?? ""), ...speaker.social_urls].filter(
    Boolean,
  );

  return (
    <Dialog>
      <article className="group bg-(--event-base-bg) p-5 text-(--event-base-text) transition-shadow duration-300 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.28)]">
        {speaker.image_url ? (
          <div className="relative mb-4 overflow-hidden rounded-(--event-border-radius)">
            <Image
              src={speaker.image_url}
              alt=""
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.22)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-(--event-cta-bg)/0 transition-colors duration-300 group-hover:bg-(--event-cta-bg)/15"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-300 group-hover:ring-white/30"
            />
          </div>
        ) : null}
        <h3 className="text-xl font-semibold">{speaker.name}</h3>
        <p className="mt-1 text-sm text-(--event-base-text)/60">
          {[speaker.title, speaker.company].filter(Boolean).join(", ")}
        </p>
        <div className="flex items-center justify-between gap-3 mt-3 ">
          <div className="flex flex-wrap gap-3 items-center">
            {links.map((url) => (
              <SocialIcon
                key={url}
                url={url}
                style={{ width: 40, height: 40 }}
                className="hover:text-event-secondary-bg-alt"
                bgColor="transparent"
                fgColor={"var(--event-secondary-bg)"}
                target="_blank"
                rel="noreferrer"
              />
            ))}
          </div>
          {speaker.bio && (
            <DialogTrigger className="text-sm font-medium text-(--event-secondary-bg) hover:text-(--event-secondary-bg-alt) transition-colors cursor-pointer">
              More
            </DialogTrigger>
          )}
        </div>
      </article>

      <DialogContent className="max-h-162.5 overflow-y-auto border-none shadow-sm sm:border sm:border-(--event-accent-bg)">
        <DialogDescription className="sr-only">
          Speaker details
        </DialogDescription>
        <div className="space-y-3 text-center sm:space-y-4">
          {speaker.image_url ? (
            <div className="mx-auto max-w-62.5">
              <Image
                src={speaker.image_url}
                alt=""
                width={400}
                height={400}
                className="aspect-square rounded-(--event-border-radius) object-cover"
              />
            </div>
          ) : null}

          <DialogTitle className="text-lg font-semibold sm:text-xl">
            {speaker.name}
          </DialogTitle>

          {speaker.title || speaker.company ? (
            <p className="text-lg sm:text-xl">
              {speaker.title && <span>{speaker.title}</span>}
              {speaker.title && speaker.company && <span>, </span>}
              {speaker.company && <span>{speaker.company}</span>}
            </p>
          ) : null}

          {speaker.website_url ? (
            <p>
              <a
                href={speaker.website_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm hover:underline sm:text-base"
              >
                {speaker.website_url.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ) : null}

          {speaker.bio ? (
            <Markdown className="text-sm sm:text-base">{speaker.bio}</Markdown>
          ) : null}

          {speaker.social_urls.length > 0 ? (
            <ul className="flex flex-row justify-center">
              {speaker.social_urls.map((url, i) => (
                <li key={url} className={i === 0 ? "-ml-2" : ""}>
                  <SocialIcon
                    style={{ width: 40, height: 40 }}
                    url={url}
                    bgColor="transparent"
                    fgColor={"var(--event-secondary-bg)"}
                    target="_blank"
                    rel="noreferrer"
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
