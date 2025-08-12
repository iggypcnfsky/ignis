<p align="center">
  <img src="./public/LOGO-SYMBOL.svg" alt="Ignis logo" width="80" />
</p>

# Ignis

Ignis is an open civic platform for discovering local problems, proposing solutions, and organizing meetups to act on them. It is mobile-first, anonymous-friendly, and designed to be remixable and self-hostable.

## Why Ignis

- Empower residents to surface problems in their city with camera-first posting and simple descriptions.
- Turn complaints into action by proposing ideas, planning steps, and gathering resources.
- Coordinate in-person meetups and chat live around specific problems and solutions.
- Remain open: use without an account, upgrade later, or host your own instance.

## MVP Scope

- Post Problems (camera + description) with shareable links/QR.
- Add Ideas tied to problems (media, step-by-step plan, cost/resources, author).
- Explore and organize Meetups with live chat using Supabase Realtime.

See a deeper architecture, data model, and routing plan in [`ARCHITECTURE.md`](./ARCHITECTURE.md) — especially the [Initial App Layout & Views](./ARCHITECTURE.md#initial-app-layout--views) and [Next Steps](./ARCHITECTURE.md#next-steps).

## Tech Stack

- Next.js (App Router, TypeScript), React, Tailwind CSS
- Supabase (Postgres, Auth, Realtime, Storage)
- Optional: Zustand for ephemeral client state

## Getting Started

1. Install dependencies

```bash
npm install
```

2. (Optional) Configure environment variables for Supabase in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
IGNIS_MODE="official" # or "self"
IGNIS_MEDIA_BUCKET="media"
```

3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Project Structure (High-Level)

```
src/
  app/               # Next.js App Router entries
  components/        # Reusable UI (e.g., LogoSymbol)
public/
  demo-images/       # Demo images used in mock screens
  LOGO-SYMBOL.svg    # Project symbol (also used in docs)
```

## Branding & Logo

- Reusable logo component: `src/components/Logo.tsx` (`LogoSymbol`).
- Favicon: `src/app/icon.svg` (orange variant of the symbol).
- Use `public/LOGO-SYMBOL.svg` in docs and social previews.

## Open Source & Hosting

- Configure a shared "official" database or self-host your own Supabase project using environment variables.
- Planned license: permissive (MIT or Apache-2.0). See `LICENSE` (to be added) and `CONTRIBUTING.md` for collaboration.

## Roadmap

- Finish Problems → Ideas → Meetups + Chat flows.
- Anonymous-first `AuthProvider` with upgrade path to full Supabase Auth.
- Localized dashboards by city (aggregations and interactive charts).

Contributions and feedback are welcome. If you’re planning to self-host or remix, please open an issue with any setup improvements you discover.
