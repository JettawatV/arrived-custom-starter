import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";

import { Container } from "./container";
import { SectionHeading } from "./section-heading";

type Highlight = {
  eyebrow: string;
  title: string;
  description: string;
};

type MockupPage = {
  title: string;
  eyebrow: string;
  intro: string;
  heroStat: string;
  heroStatLabel: string;
  highlights: Highlight[];
  timeline?: {
    time: string;
    title: string;
    description: string;
  }[];
  people?: {
    name: string;
    role: string;
    bio: string;
  }[];
  sponsors?: {
    name: string;
    tier: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
};

export type MockupPageSlug =
  | "about"
  | "agenda"
  | "speakers"
  | "host"
  | "sponsors"
  | "faq";

export const mockupPages: Record<MockupPageSlug, MockupPage> = {
  about: {
    title: "About the Experience",
    eyebrow: "Event Overview",
    intro:
      "A polished placeholder for the event story, audience promise, and the moments guests can expect from arrival to closing remarks.",
    heroStat: "01",
    heroStatLabel: "Clear story page for your event positioning",
    highlights: [
      {
        eyebrow: "Purpose",
        title: "Set the tone before guests arrive",
        description:
          "Use this section to frame the theme, audience, and reason this gathering matters.",
      },
      {
        eyebrow: "Experience",
        title: "Preview the day in broad strokes",
        description:
          "Show how talks, networking, activations, and hospitality connect into one cohesive event.",
      },
      {
        eyebrow: "Outcome",
        title: "Make the takeaway memorable",
        description:
          "Give attendees a clear sense of what they will learn, feel, or be able to do next.",
      },
    ],
  },
  agenda: {
    title: "Agenda Preview",
    eyebrow: "Program Mockup",
    intro:
      "A frontend-only agenda layout with sample timing, session hierarchy, and room for descriptions.",
    heroStat: "08",
    heroStatLabel: "Sample sessions across a single event day",
    highlights: [
      {
        eyebrow: "Morning",
        title: "Arrival, breakfast, and welcome",
        description:
          "Give guests an easy first stop with check-in, refreshments, and a warm opening moment.",
      },
      {
        eyebrow: "Midday",
        title: "Keynotes and breakout sessions",
        description:
          "Balance big-room programming with focused tracks for different interests or roles.",
      },
      {
        eyebrow: "Evening",
        title: "Reception and closing connections",
        description:
          "Close the program with time for follow-up conversations and a memorable sendoff.",
      },
    ],
    timeline: [
      {
        time: "9:00 AM",
        title: "Guest Arrival",
        description: "Registration, coffee, and opening networking.",
      },
      {
        time: "10:00 AM",
        title: "Opening Keynote",
        description: "A main-stage session that introduces the event theme.",
      },
      {
        time: "11:30 AM",
        title: "Breakout Sessions",
        description: "Parallel sessions for deeper learning and discussion.",
      },
      {
        time: "2:00 PM",
        title: "Interactive Workshop",
        description: "Hands-on activities designed around attendee outcomes.",
      },
    ],
  },
  speakers: {
    title: "Speaker Lineup",
    eyebrow: "Talent Mockup",
    intro:
      "A sample speaker page that shows how featured guests, roles, and short bios can be presented.",
    heroStat: "06",
    heroStatLabel: "Featured voices ready for real profile data",
    highlights: [
      {
        eyebrow: "Curation",
        title: "Showcase distinct perspectives",
        description:
          "Group speakers by expertise, session type, or the story arc of the event.",
      },
      {
        eyebrow: "Credibility",
        title: "Make each profile easy to scan",
        description:
          "Keep names, roles, companies, and bios visible without overwhelming the page.",
      },
      {
        eyebrow: "Momentum",
        title: "Connect talent to the program",
        description:
          "Help attendees understand why each speaker belongs in the agenda.",
      },
    ],
    people: [
      {
        name: "Maya Chen",
        role: "Founder, Signal Studio",
        bio: "Leads conversations on creative operations and brand storytelling.",
      },
      {
        name: "Jordan Reyes",
        role: "VP of Experience, Northstar",
        bio: "Designs large-scale attendee journeys for global teams.",
      },
      {
        name: "Avery Brooks",
        role: "Product Strategist",
        bio: "Explores how teams turn event insights into action.",
      },
    ],
  },
  host: {
    title: "Meet the Host",
    eyebrow: "Host Mockup",
    intro:
      "A dedicated host page for company context, mission, and the team behind the attendee experience.",
    heroStat: "HQ",
    heroStatLabel: "Space for company story and host credentials",
    highlights: [
      {
        eyebrow: "Mission",
        title: "Introduce the organization",
        description:
          "Share what the host believes, builds, or brings to the community.",
      },
      {
        eyebrow: "Trust",
        title: "Explain why guests are gathering here",
        description:
          "Connect the event theme to the host's work, values, and audience.",
      },
      {
        eyebrow: "Welcome",
        title: "Make the invitation feel personal",
        description:
          "Use the page to create warmth before attendees step into the venue.",
      },
    ],
  },
  sponsors: {
    title: "Sponsor Showcase",
    eyebrow: "Partner Mockup",
    intro:
      "A sponsor page mockup with tiered partner cards and supporting copy for brand recognition.",
    heroStat: "12",
    heroStatLabel: "Partner slots across sample sponsor tiers",
    highlights: [
      {
        eyebrow: "Visibility",
        title: "Give partners a premium presence",
        description:
          "Create enough space for sponsor names, tiers, descriptions, and future logos.",
      },
      {
        eyebrow: "Context",
        title: "Tie sponsorship to attendee value",
        description:
          "Explain how partners support the experience, not just the event budget.",
      },
      {
        eyebrow: "Flexibility",
        title: "Support multiple tiers",
        description:
          "Leave room for premier, supporting, and community partner groups.",
      },
    ],
    sponsors: [
      { name: "North Pier", tier: "Premier Partner" },
      { name: "Brightline", tier: "Innovation Partner" },
      { name: "Fieldhouse", tier: "Community Partner" },
      { name: "Studio Atlas", tier: "Creative Partner" },
    ],
  },
  faq: {
    title: "FAQ Mockup",
    eyebrow: "Guest Support",
    intro:
      "A practical FAQ page with placeholder questions for logistics, registration, accessibility, and arrival details.",
    heroStat: "10",
    heroStatLabel: "Common attendee questions to replace with real answers",
    highlights: [
      {
        eyebrow: "Logistics",
        title: "Answer before attendees ask",
        description:
          "Cover arrival time, parking, check-in, dress code, and venue details.",
      },
      {
        eyebrow: "Access",
        title: "Make support easy to find",
        description:
          "Reserve space for accessibility, dietary, and contact information.",
      },
      {
        eyebrow: "Confidence",
        title: "Reduce last-minute uncertainty",
        description:
          "Give guests a single source of truth before event day.",
      },
    ],
    faqs: [
      {
        question: "When should guests arrive?",
        answer:
          "Doors open 30 minutes before the first session. Add exact timing once the schedule is final.",
      },
      {
        question: "Where should attendees check in?",
        answer:
          "Use this answer for venue entry, registration desk location, and badge pickup details.",
      },
      {
        question: "Who can guests contact for help?",
        answer:
          "Add the event support email, phone number, or onsite contact instructions here.",
      },
    ],
  },
};

type MockupSectionPageProps = {
  slug: string;
};

function isMockupPageSlug(slug: string): slug is MockupPageSlug {
  return slug in mockupPages;
}

export function MockupSectionPage({ slug }: MockupSectionPageProps) {
  if (!isMockupPageSlug(slug)) {
    notFound();
  }

  const page = mockupPages[slug];

  return (
    <main>
      <Container wrapperClassName="bg-(--event-secondary-bg) text-(--event-secondary-text)">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <Badge className="rounded-full bg-(--event-primary-bg) px-4 py-1.5 text-(--event-primary-text)">
              {page.eyebrow}
            </Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 opacity-80">
              {page.intro}
            </p>
          </div>
          <div className="rounded-(--event-border-radius) bg-(--event-base-bg) p-8 text-(--event-base-text) shadow-sm">
            <p className="text-6xl font-semibold">{page.heroStat}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.25em] opacity-60">
              {page.heroStatLabel}
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <SectionHeading
          title="Page Structure"
          description="Use this mockup as a visual placeholder while the final content, copy, and assets are prepared."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {page.highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-(--event-border-radius) border border-(--event-base-text)/10 bg-(--event-base-bg) p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-(--event-base-text)/50">
                {item.eyebrow}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 leading-7 opacity-75">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>

      {page.timeline ? (
        <Container wrapperClassName="bg-(--event-primary-bg) text-(--event-primary-text)">
          <SectionHeading
            title="Sample Schedule"
            description="Placeholder agenda rows showing how event timing and session summaries could appear."
          />
          <div className="mt-10 divide-y divide-(--event-primary-text)/20">
            {page.timeline.map((item) => (
              <article
                key={`${item.time}-${item.title}`}
                className="grid gap-3 py-6 md:grid-cols-[10rem_1fr]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] opacity-70">
                  {item.time}
                </p>
                <div>
                  <h2 className="text-2xl font-semibold">{item.title}</h2>
                  <p className="mt-2 max-w-2xl opacity-75">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      ) : null}

      {page.people ? (
        <Container wrapperClassName="bg-(--event-primary-bg) text-(--event-primary-text)">
          <SectionHeading
            title="Sample Profiles"
            description="Replace these profiles with real speaker or host details when content is ready."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {page.people.map((person) => (
              <article
                key={person.name}
                className="rounded-(--event-border-radius) bg-(--event-primary-text)/10 p-6"
              >
                <div className="flex aspect-square items-end rounded-(--event-border-radius) bg-(--event-primary-text)/15 p-5">
                  <p className="text-5xl font-semibold">
                    {person.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </p>
                </div>
                <h2 className="mt-5 text-2xl font-semibold">{person.name}</h2>
                <p className="mt-1 opacity-70">{person.role}</p>
                <p className="mt-4 leading-7 opacity-75">{person.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      ) : null}

      {page.sponsors ? (
        <Container wrapperClassName="bg-(--event-primary-bg) text-(--event-primary-text)">
          <SectionHeading
            title="Sample Partner Grid"
            description="Placeholder sponsor cards for testing layout, hierarchy, and spacing."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.sponsors.map((sponsor) => (
              <article
                key={sponsor.name}
                className="rounded-(--event-border-radius) bg-(--event-primary-text) p-6 text-(--event-primary-bg)"
              >
                <div className="flex aspect-video items-center justify-center rounded-(--event-border-radius) border border-(--event-primary-bg)/10 bg-(--event-primary-bg)/5">
                  <p className="text-center text-2xl font-semibold">
                    {sponsor.name}
                  </p>
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] opacity-60">
                  {sponsor.tier}
                </p>
              </article>
            ))}
          </div>
        </Container>
      ) : null}

      {page.faqs ? (
        <Container wrapperClassName="bg-(--event-primary-bg) text-(--event-primary-text)">
          <SectionHeading
            title="Sample Questions"
            description="Replace these common prompts with your final event logistics."
          />
          <div className="mt-10 grid gap-4">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-(--event-border-radius) bg-(--event-primary-text)/10 p-6"
              >
                <h2 className="text-xl font-semibold">{faq.question}</h2>
                <p className="mt-3 leading-7 opacity-75">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      ) : null}

      <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] opacity-50">
            Frontend Mockup
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Ready for final content and assets
          </h2>
        </div>
        <Link
          href="/"
          className="rounded-(--event-border-radius) bg-(--event-primary-bg) px-5 py-3 font-semibold text-(--event-primary-text)"
        >
          Back to Home
        </Link>
      </Container>
    </main>
  );
}
