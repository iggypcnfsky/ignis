# IGNIS Architecture

This document captures the current architecture for the Ignis platform and evolves with the codebase. It is optimized for an MVP that is mobile-first, open, and remixable, while keeping room for future functionality like localized dashboards.

## TL;DR

- **Stack**: Next.js (App Router, TypeScript), React, Tailwind, Supabase (Postgres, Auth, Realtime, Storage), optional Zustand.
- **Client-first MVP**: Post city problems (camera + description) with sharing → add solutions → meetups with live chat.
- **Auth**: Anonymous-first UX via a lightweight `guest profile` approach with an `AuthProvider`; optional upgrade to full Supabase Auth later.
- **Data**: Flexible `jsonb` payloads per entity; linkages via foreign keys; use Supabase Storage for media; Realtime for chat.
- **Open-source**: Single codebase supports official shared DB or self-hosted DB via environment variables. Minimal setup friction.

---

## Product Phases (MVP-first)

1. **Problems (Phase 1)**
   - Capture image/video from camera, add short description, location (optional), and tags.
   - Shareable deep links to individual problems.
2. **Ideas/Solutions (Phase 2)**
   - Add solutions tied to one or more problems.
   - Lightweight voting or reactions (optional).
3. **Meetups + Live Chat (Phase 3)**
   - Create meetups for problems/solutions with time/place/hosts.
   - Live chat per meetup (and/or per problem) using Supabase Realtime.
4. **Later: Localized Dashboards**
   - City selector; fetch aggregated data from Supabase; interactive visuals.

---

## Frontend Architecture

- **Framework**: Next.js App Router with RSC for data fetching; client components for camera capture and chat.
- **UI**: Tailwind (mobile-first). Ensure controls are one-hand reachable and accessible; progressively enhance for desktop.
- **Routing**: Feature-oriented routes under `src/app` with nested layouts for Problems, Ideas, Meetups, and Chat.
- **Data fetching**: Server Components or Route Handlers for secure operations; client components subscribe to Realtime.
- **State**:
  - Start with local component state + URL params.
  - Introduce Zustand for ephemeral UI/session state when needed (e.g., camera capture staging, optimistic chat queue).
  - Avoid global stores for server-derived data; subscribe directly to Supabase or fetch via RSC.
- **Media capture**: Use `getUserMedia` and `<input type="file" accept="image/*;capture=camera">` fallbacks. Compress client-side as needed.
- **Sharing**: Web Share API when available; canonical deep links for copy/share.

---

## Initial App Layout & Views

Route suggestions assume Next.js App Router under `src/app`.

- **Discover Problems** (`/` or `/problems/discover`)
  - Full-screen swipe up/down media (image/video) per problem.
  - Top bar: app logo, quick actions; inline Yes/No poll; buttons: Add Problem, Explore Meetups.
- **Explore Meetups** (`/meetups`)
  - List of upcoming meetups with filters (city/date/idea/problem); search.
- **Add Problem Flow** (`/problems/add`)
  - Step 1: camera/upload → Step 2: describe → Step 3: congrats → navigate to created problem.
- **Detailed Problem** (`/problems/[problemId]`)
  - Media carousel, description, map/location, poll results, related problems, actions (Share, Add Idea, See Meetups, Chat).
- **Ideas for Problem** (`/problems/[problemId]/ideas`)
  - Card list of ideas with votes; sort by top/new; link to idea details.
- **Detailed Idea** (`/ideas/[ideaId]`)
  - Description, media/visuals, step-by-step plan, cost/resources, author, linked problems, upcoming meetups; CTA to organize meetup.
- **Add Idea Flow** (`/ideas/add?problemId=...`)
  - Wizard: (1) idea summary → (2) visuals → (3) plan steps → (4) resources & cost → (5) author details → (6) congrats → idea view.
- **Problem Meetups** (`/problems/[problemId]/meetups`)
  - Upcoming meetups tied to the problem; CTA to create meetup.
- **Detailed Meetup** (`/meetups/[meetupId]`)
  - Agenda, linked idea(s) and optional problem, location/map, time, details, Join button.
- **Add Meetup Flow** (`/meetups/add`)
  - Wizard: (1) agenda → (2) select idea(s)/none → (3) details + location/contact → (4) congrats → meetup view.
- **Share Problem** (`/problems/[problemId]/share`)
  - Deep link, QR code, A4 poster download (QR + description), copyable social post text.
- **Problem Chat** (`/problems/[problemId]/chat`)
  - Live chat with message bubbles; sticky input; realtime updates.
- **Onboarding Wizard (future)** (`/onboarding`)
  - Step-by-step intro to app features.
- **Login/Register** (`/auth` or `/login`)
  - Email/OAuth; respects anonymous-first model for upgrade path.
- **User Dashboard (future)** (`/dashboard`)
  - Manage account, authored problems/ideas/meetups, notifications.

Recommended navigation: bottom primary actions (Add, Meetups, Discover) on mobile; contextual CTAs inside detail pages.

### Additional Recommended Views

- **City Selector** (`/city` or persistent control): filters Discover/Meetups; aligns with future dashboards.
- **Profile (public)** (`/u/[profileId]`): author info and contributions.
- **My Activity** (`/me`): quick access to user/guest submissions and joined meetups.
- **Report/Flag Content** (modal/route): abuse reporting per entity.
- **Settings** (`/settings`): notifications, language, privacy; minimal at MVP.
- **About/Terms/Privacy** (`/about`, `/terms`, `/privacy`): static pages for open-source and compliance.

---

## Backend and Data (Supabase)

### Entities

- `problems`: civic issues posted by users
- `ideas`: proposed solutions linked to problems
- `meetups`: events linked to problems/ideas
- `chats`: chat rooms (likely per meetup; optionally per problem)
- `messages`: chat messages per chat room
- `profiles`: minimal profile entries (guest or authenticated)

All tables include `id`, `created_at`, `updated_at`, and a flexible `data jsonb` for schema evolution.

### Suggested Initial Schema (Postgres / Supabase)

```sql
-- Profiles (guest or authenticated users)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid null, -- when upgraded to real auth user
  kind text not null default 'guest', -- 'guest' | 'user'
  client_id text null, -- stable identifier for guests (stored client-side)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'
);
create index if not exists profiles_client_id_idx on profiles (client_id);

-- Problems
create table if not exists problems (
  id uuid primary key default gen_random_uuid(),
  created_by uuid null references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}' -- { title, description, media_paths[], geo, tags[] }
);
create index if not exists problems_created_at_idx on problems (created_at desc);

-- Ideas / Solutions
create table if not exists ideas (
  id uuid primary key default gen_random_uuid(),
  created_by uuid null references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  problem_ids uuid[] not null default '{}', -- denormalized list
  data jsonb not null default '{}' -- { title, description, links[], media_paths[] }
);
create index if not exists ideas_created_at_idx on ideas (created_at desc);

-- Meetups
create table if not exists meetups (
  id uuid primary key default gen_random_uuid(),
  created_by uuid null references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  problem_ids uuid[] not null default '{}',
  idea_ids uuid[] not null default '{}',
  data jsonb not null default '{}' -- { starts_at, ends_at, venue, city, description }
);
create index if not exists meetups_city_idx on meetups ((data->>'city'));

-- Chats (per meetup or problem)
create table if not exists chats (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  problem_id uuid null references problems(id) on delete cascade,
  meetup_id uuid null references meetups(id) on delete cascade,
  data jsonb not null default '{}' -- { title }
);

-- Messages
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references chats(id) on delete cascade,
  sender_profile_id uuid null references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}' -- { text, media_paths[], edited:boolean }
);
create index if not exists messages_chat_created_idx on messages (chat_id, created_at asc);
```

Notes:

- JSONB keeps MVP flexible; add typed columns later for hot paths (e.g., `city`, `starts_at`).
- Use a storage bucket `media` for images/video; store paths in `data.media_paths`.
- For performance, consider GIN indexes on JSONB keys that are frequently filtered.

### Realtime

- Use Supabase Realtime on `messages` for live chat (`insert`/`update`).
- Optionally emit realtime on `meetups` for attendee counts or schedule changes.

### RLS (Row-Level Security)

- Enable RLS on all tables.
- Initially, allow `insert` on `problems`, `ideas`, `meetups`, `messages` for the `anon` role but enforce abuse protections via Edge Functions and server-side validation.
- Restrict `update`/`delete` to the original `created_by` when present, and to moderators/admins once roles exist.
- Add basic anti-abuse throttling through a signed Edge Function (per IP + `client_id` + `fingerprint` windowed counters).

---

## Auth Model (Anonymous-first)

Goal: Let people use the app without sign-up, while enabling upgrade to an account later.

- **Guest identity**: Generate a stable `client_id` (UUID) on first load; store in `localStorage` and a secure cookie. Create or reuse a `profiles` row with `kind='guest'` and `client_id`.
- **Auth Provider**: A lightweight context that exposes an `actor` object:
  - `actor.type = 'guest' | 'user'`
  - `actor.profileId` and either `clientId` (guest) or `authUserId` (user)
- **Upgrade to user**: When the user signs in via Supabase Auth (OAuth or email link), link `profiles.auth_user_id` to the Supabase `auth.users.id` and flip `kind='user'`.
- **Abuse controls**: Rate limit writes in Edge Functions; optional hCaptcha on bursty writes.

This pattern keeps the UX open while retaining per-actor accountability and future upgradability.

---

## Feature Modules

Recommended directory shape as features grow:

```
src/
  features/
    problems/ (ui, api, lib)
    ideas/    (ui, api, lib)
    meetups/  (ui, api, lib)
    chat/     (ui, api, lib)
    profiles/ (ui, api, lib)
```

Each feature owns UI, validation (Zod), and data adapters. Cross-feature contracts are kept minimal and typed.

---

## Live Chat Design

- Create a `chat` per meetup (and optionally per problem).
- Client subscribes to `messages` inserts via Supabase Realtime.
- Use optimistic UI with queued outgoing messages (Zustand store) and reconcile on ACK.
- Moderate via simple heuristics (max length, duplicate detection) at the API boundary.

---

## Localized Dashboards (Future)

- **Selector**: City selector drives queries.
- **Data**: Aggregate from `problems`, `ideas`, `meetups` by city. Consider materialized views refreshed on schedule.
- **UI**: Interactive charts (e.g., problems by category, heatmap). Keep this in a separate route and lazy-load.

---

## Open-source & Hosting Model

- **Remixable by design**: All configuration via environment variables; no code edits required to point at a different Supabase project.
- **Env**: Use these keys in a `.env.local` (example):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `IGNIS_MODE = official | self`
  - `IGNIS_MEDIA_BUCKET = media`
- **Official vs self-host**: 
  - `official`: points to the community Supabase project (rate limits may apply).
  - `self`: project owners bring their own Supabase and Storage.
- **License**: Recommend MIT or Apache-2.0 (permissive for remixing and self-hosting).
- **Contributing**: Keep feature modules decoupled; add `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- **Data portability**: CLI/sql scripts for export/import of public data; make schema migrations reproducible.

---

## Non-functional Concerns

- **Performance**: Image compression on client; CDN-backed storage; only ship client components where necessary (camera, chat).
- **Accessibility**: Keyboard nav, color contrast, captions for media.
- **Observability**: Minimal client logs; server logs in Edge Functions; privacy-preserving metrics.
- **Testing**: Unit tests for data adapters; Playwright for critical flows (post problem, join chat).

---

## Next Steps

1. Add Supabase project and `.env.local` wiring; create `media` bucket.
2. Scaffold `AuthProvider` (guest-first) and a `profiles` bootstrap on first load.
3. Implement Problems create + view with media upload and share links.
4. Add Ideas linking to Problems.
5. Add Meetups with Chat (Realtime).

This document should be kept current as modules, schema, and policies evolve.


