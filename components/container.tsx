import { cn } from "@/lib/utils";

import { RevealOnScroll } from "./reveal-on-scroll";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
  reveal?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function Container({
  children,
  className,
  wrapperClassName,
  reveal = true,
  ...props
}: ContainerProps) {
  return (
    <RevealOnScroll
      enabled={reveal}
      className={cn("w-full px-4 py-16 sm:px-8", wrapperClassName)}
    >
      <div className={cn("mx-auto max-w-7xl", className)} {...props}>
        {children}
      </div>
    </RevealOnScroll>
  );
}
