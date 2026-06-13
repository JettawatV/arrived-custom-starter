import type { PublicEventData } from "@/lib/happily/types";

import type { NavLinkItem } from "./navbar";

type EventContent = PublicEventData["event"]["content"];
type EventStyles = PublicEventData["event"]["styles"];
type PublicEvent = PublicEventData["event"];

export type EventSectionKey = "about" | "agenda" | "speakers" | "sponsors" | "faq";

type ExtendedDisplaySettings = PublicEvent["display_settings"] & {
  navLinks?: Partial<
    Record<EventSectionKey, { text: string; display: boolean }>
  >;
  sections?: Partial<Record<EventSectionKey, { display: boolean }>>;
};

const sectionRoutes: Record<EventSectionKey, string> = {
  about: "/about",
  agenda: "/agenda",
  speakers: "/speakers",
  sponsors: "/sponsors",
  faq: "/faq",
};

const defaultNavLabels: Record<EventSectionKey, string> = {
  about: "About",
  agenda: "Agenda",
  speakers: "Speakers",
  sponsors: "Sponsors",
  faq: "FAQ",
};

export function getDisplaySettings(
  displaySettings: PublicEvent["display_settings"],
): ExtendedDisplaySettings {
  return displaySettings as ExtendedDisplaySettings;
}

export function isSectionDisplayed(
  displaySettings: PublicEvent["display_settings"],
  section: EventSectionKey,
) {
  const sections = getDisplaySettings(displaySettings).sections;
  return sections?.[section]?.display ?? true;
}

export function buildEventNav(event: PublicEvent): NavLinkItem[] {
  const navLinks = getDisplaySettings(event.display_settings).navLinks;
  const sectionOrder: EventSectionKey[] = [
    "about",
    "agenda",
    "speakers",
    "sponsors",
    "faq",
  ];

  const nav = sectionOrder
    .filter((key) => navLinks?.[key]?.display !== false)
    .map((key) => ({
      label: text(navLinks?.[key]?.text, defaultNavLabels[key]),
      href: sectionRoutes[key],
    }));

  if (event.photos_toggle) {
    nav.push({ label: "Gallery", href: "/photos" });
  }

  return nav;
}

export function text(value: string | null | undefined, fallback = "") {
  return value?.trim() || fallback;
}

/** Shared styling for register / reserve CTAs across hero, nav, form, and final section. */
export const registerCtaButtonClassName =
  "rounded-(--event-border-radius) bg-(--event-primary-bg) font-semibold text-(--event-primary-text) transition-colors hover:bg-(--event-primary-bg)/85";

export function hasText(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function styleValue(
  styles: EventStyles,
  key: keyof EventStyles,
  fallback: string,
) {
  const value = styles[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

export function heroImage(content: EventContent) {
  return content.heroImage || content.heroGraphic || null;
}

export function formatEventDate(
  date: string | null,
  timezone: string | null,
  options: Intl.DateTimeFormatOptions,
) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en", {
    timeZone: timezone || undefined,
    ...options,
  }).format(new Date(date));
}

export function eventDateRange(event: PublicEventData["event"]) {
  const start = formatEventDate(event.start_date, event.timezone, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const end = formatEventDate(event.end_date, event.timezone, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!start) {
    return null;
  }

  if (!end || end === start) {
    return start;
  }

  return `${start} - ${end}`;
}

export function eventTimeRange(event: PublicEventData["event"]) {
  const start = formatEventDate(event.start_date, event.timezone, {
    hour: "numeric",
    minute: "2-digit",
  });
  const end = formatEventDate(event.end_date, event.timezone, {
    hour: "numeric",
    minute: "2-digit",
  });

  if (!start || !end) {
    return start;
  }

  return `${start} - ${end}`;
}

export function ordered<T extends { order: number | null }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export type DisplayFaq = {
  id: number;
  question: string;
  answer: string;
  order: number | null;
};

export function parseFaqsFromDescription(
  description: string | null | undefined,
): { intro: string | null; faqs: DisplayFaq[] } {
  if (!description?.trim()) {
    return { intro: null, faqs: [] };
  }

  const faqStart = description.search(/\*\*FAQ\s+\d+\*\*/i);
  const intro =
    faqStart > 0 ? description.slice(0, faqStart).trim() || null : null;
  const faqBody = faqStart >= 0 ? description.slice(faqStart) : description;

  const faqs: DisplayFaq[] = [];
  const pattern =
    /\*\*FAQ\s+(\d+)\*\*\s*[\s\S]*?\*\*Question:\*\*\s*([\s\S]*?)\s*\*\*Answer:\*\*\s*([\s\S]*?)(?=\*\*FAQ\s+\d+\*\*|$)/gi;

  for (const match of faqBody.matchAll(pattern)) {
    const id = Number(match[1]);
    const question = match[2].trim();
    const answer = match[3].trim();

    if (question && answer) {
      faqs.push({ id, question, answer, order: id });
    }
  }

  return { intro, faqs: ordered(faqs) };
}

export function resolveEventFaqs(
  faqs: PublicEventData["faqs"],
  description: string | null | undefined,
) {
  if (faqs.length) {
    return {
      intro: description?.trim() || null,
      items: ordered(faqs),
    };
  }

  const parsed = parseFaqsFromDescription(description);
  return {
    intro: parsed.intro,
    items: parsed.faqs,
  };
}

export function hasFaqSectionContent(
  faqs: PublicEventData["faqs"],
  title: string | null | undefined,
  description: string | null | undefined,
) {
  const { intro, items } = resolveEventFaqs(faqs, description);
  return items.length > 0 || hasText(title) || hasText(intro);
}
