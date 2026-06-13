import Image from "next/image";

import { Container } from "./container";
import { SectionHeading } from "./section-heading";

type ContentSectionProps = {
  id: string;
  title: string;
  description?: string | null;
  image?: string | null;
};

export function ContentSection({
  id,
  title,
  description,
  image,
}: ContentSectionProps) {
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
