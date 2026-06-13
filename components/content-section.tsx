import Image from "next/image";

import { Container } from "./container";
import { Markdown } from "./markdown";
import { SectionHeading } from "./section-heading";

type ContentSectionProps = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
  variant?: "default" | "arch";
};

function ArchImage({ src }: { src: string }) {
  return (
    <figure className="relative mx-auto w-full max-w-[17rem] sm:max-w-xs lg:max-w-sm">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-1 left-[18%] text-sm text-[#b8a078] opacity-80"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-[8%] -right-1 text-xs text-[#b8a078] opacity-70"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-[22%] -left-2 text-[0.65rem] text-[#b8a078] opacity-60"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[18%] -right-3 text-sm text-[#b8a078] opacity-75"
      >
        ✦
      </span>

      <div className="about-mica-arch overflow-hidden border border-[#c9b896]/80 bg-(--event-accent-bg) p-1.5 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.2)]">
        <Image
          src={src}
          alt=""
          width={400}
          height={520}
          sizes="(max-width: 1024px) 60vw, 320px"
          className="block h-auto w-full object-contain"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </figure>
  );
}

export function ContentSection({
  id,
  title,
  description,
  image,
  variant = "default",
}: ContentSectionProps) {
  if (variant === "arch" && image) {
    return (
      <Container
        id={id}
        className="grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
      >
        <div className="min-w-0 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-(--event-base-text) sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <div className="mt-6 space-y-4 text-base leading-[1.75] text-(--event-base-text)/85 md:text-lg [&_p+p]:mt-4">
              <Markdown>{description}</Markdown>
            </div>
          ) : null}
        </div>
        <ArchImage src={image} />
      </Container>
    );
  }

  return (
    <Container
      id={id}
      className={
        image
          ? "grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16"
          : "max-w-7xl"
      }
    >
      <div className="min-w-0">
        <SectionHeading title={title} description={description} />
      </div>
      {image ? (
        <figure className="min-w-0">
          <Image
            src={image}
            alt=""
            width={800}
            height={600}
            sizes="(max-width: 1024px) 100vw, 576px"
            className="block h-auto w-full object-contain object-top"
            style={{ width: "100%", height: "auto" }}
          />
        </figure>
      ) : null}
    </Container>
  );
}
