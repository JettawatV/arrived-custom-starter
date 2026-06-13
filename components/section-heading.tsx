import { Markdown } from "./markdown";

type SectionHeadingProps = {
  title: string;
  description?: string | null;
  titleClassName?: string;
  descriptionClassName?: string;
};

export function SectionHeading({
  title,
  description,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className="text-left">
      <h2
        className={
          titleClassName ?? "text-3xl font-semibold sm:text-4xl"
        }
      >
        {title}
      </h2>
      {description ? (
        <div
          className={
            descriptionClassName ?? "mt-3 text-base opacity-80 md:text-lg"
          }
        >
          <Markdown>{description}</Markdown>
        </div>
      ) : null}
    </div>
  );
}
