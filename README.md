# Arrived Custom Starter

A Next.js starter for building custom [Happily Arrived](https://app.happily.events.com) event sites. Fetches published event data from the Happily public API and renders a complete event site out of the box.

## Quick Start

```bash
npm install
cp .env.example .env.local   # then fill in your values
npm run api:types             # generate typed API client
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your event site.

## Environment Variables

| Variable                 | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `HAPPILY_API_BASE_URL`   | Base URL of the Happily API                                        |
| `HAPPILY_API_SCHEMA_URL` | OpenAPI JSON schema URL — used by `npm run api:types` to gen types |
| `HAPPILY_EVENT_ID`       | Your event ID                                                      |
| `HAPPILY_EVENT_ENV`      | `staging` (draft) or `prod` (published)                            |

No service-role keys or email config needed — the starter only uses the public API.

## Generating API Types

```bash
npm run api:types
```

Fetches the OpenAPI schema and writes typed bindings to `lib/happily/generated/schema.d.ts`. Run after initial setup and whenever the API schema changes.

## API Docs

Full endpoint documentation is available at `https://app.happily.events/api/docs`.

The OpenAPI schema is at `https://app.happily.events/api/openapi.json`.

## Project Structure

```
app/
  (event)/
    page.tsx              # Main event page (server component)
    layout.tsx            # Event layout — styles, metadata
    confirmation/page.tsx # Post-registration confirmation
    livestream/page.tsx   # Livestream page (when enabled)
    photos/page.tsx       # Photo gallery (when enabled)
  actions/
    register.ts           # Server action for registration

components/                # All event page sections and UI
lib/happily/               # API client, config, queries, types
lib/happily/generated/     # Auto-generated OpenAPI types (do not edit)
```

## Customization

Everything in `components/` is yours to redesign — markup, styling, layout, animations, pages. The data source and registration endpoint stay the same.

## Registration

Registration submits via a server action (`app/actions/register.ts`) to the Happily API. It sends only attendee data. The server handles confirmation emails automatically.

Handle these error cases: `CAPACITY_REACHED`, `DUPLICATE_EMAIL`, `VALIDATION_ERROR`.

## Event Styles

The API returns design tokens in `event.styles`. The `EventShell` component applies these as CSS custom properties.

## Deploy

Deploy to [Vercel](https://vercel.com) or any Next.js-compatible platform. Set the same env vars from `.env.local` in your hosting settings.
