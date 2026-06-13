"use client";

import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type RevealOnScrollProps = ComponentPropsWithoutRef<"section"> & {
  enabled?: boolean;
};

export function RevealOnScroll({
  children,
  className,
  enabled = true,
  ...props
}: RevealOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <section
      ref={ref}
      className={cn(
        enabled && "reveal-on-scroll",
        enabled && visible && "is-visible",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
