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
- **Icons**: `lucide-react` for all icons to ensure a consistent, lightweight icon set.
- **Fonts**: Google Fonts via `next/font/google` for zero-FOIT/FOUC and automatic self-hosting. Use `DM Sans` for UI text and `Caprasimo` for display/headers.

---

## Typography & Font Management

- **Loading**: Use `next/font/google` in `src/app/layout.tsx` to load and self-host fonts.
  - `DM_Sans` with `display: "swap"`, exported as CSS variable `--font-dm-sans` and applied globally via `<body>`.
  - `Caprasimo` with `display: "swap"`, exported as CSS variable `--font-caprasimo`.
- **Application**:
  - Default UI font is `DM Sans` via `body { font-family: var(--font-dm-sans), ... }` (see `globals.css`).
  - Display/heading font is applied with a utility class `.font-display` that maps to `var(--font-caprasimo)`.
  - For screens that should use Caprasimo throughout (e.g., Discover), add `font-display` on the screen root container.
- **Tailwind Integration**:
  - Tailwind theme `--font-sans` is mapped to `--font-dm-sans` for consistency with `font-sans` utilities.
- **Fallbacks**:
  - Provide robust fallbacks in `globals.css` for both sans and serif stacks.
- **Notes**:
  - Avoid importing remote Google CSS; always use `next/font` for self-hosting and better CLS.
  - Prefer using the variable form (`var(--font-...)`) for consistent overrides; where necessary, you can use the `className` provided by `next/font` to force application.
- **i18n**: Internationalization via `next-i18next` (powered by `i18next`) with JSON locale files per language and feature.

### Enhanced Icon System
- **Lucide React Icons**: Primary icon library for consistent, lightweight icons across the app
- **Panel Header Icons**: Each content panel includes relevant icons for better visual hierarchy:
  - Report panels: `FileText` for documentation/content
  - Poll panels: `BarChart3` for data visualization
  - Location/Map panels: `MapPin` for geographical content
  - Similar content panels: `Grid3X3` for collections
  - Interactive elements: `ZoomIn`, `Plus`, `Minus`, `RotateCcw` for zoom controls
  - Time elements: `Calendar` for date/timestamp displays
- **Icon Sizing**: Consistent 18px size for panel headers, contextual sizing for other uses
- **Accessibility**: All icons include proper ARIA labels and semantic meaning
- **Routing**: Feature-oriented routes under `src/app` with nested layouts for Problems, Ideas, Meetups, and Chat.
- **Data fetching**: Server Components or Route Handlers for secure operations; client components subscribe to Realtime.
- **State**:
  - Start with local component state + URL params.
  - Introduce Zustand for ephemeral UI/session state when needed (e.g., camera capture staging, optimistic chat queue).
  - Avoid global stores for server-derived data; subscribe directly to Supabase or fetch via RSC.
- **Media capture**: Use `getUserMedia` and `<input type="file" accept="image/*;capture=camera">` fallbacks. Compress client-side as needed.
- **Sharing**: Web Share API when available; canonical deep links for copy/share.
- **Image Interaction**: Hero images support click-to-zoom with full pan and zoom controls
- **Responsive Design**: All layouts are fully flexible for desktop use with no width restrictions
- **Panel System**: Content organized in rounded panels with consistent padding (p-6) and icon headers
- **Horizontal Sliders**: Similar content displayed in touch-friendly horizontal sliders with scroll snap
- **Visual Feedback**: Interactive elements include hover states, focus rings, and loading states

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
  - Interactive hero image with zoom/pan modal
  - Comprehensive report panel with calendar icon and timestamp
  - Visualized poll with dynamic vote proportion bars
  - Location panel with Google Maps placeholder
  - Horizontal slider for similar problems with square cards (160×160px)
  - All panels include relevant Lucide React icons
  - Universal panel padding (p-6) for better breathing room
  - Actions (Share, Add Idea, See Meetups, Chat).
- **Ideas for Problem** (`/problems/[problemId]/ideas`)
  - Horizontal slider with idea cards featuring votes and visual metrics
  - Square card design (160×160px) with hover scale animations
  - Scroll snap for smooth navigation
  - "Got a better idea?" CTA with navigation to add flow.
- **Detailed Idea** (`/problems/[problemId]/ideas/[ideaId]`)
  - Description, user-uploaded media/visuals, step-by-step plan, cost/resources, author, linked problems, upcoming meetups; CTA to organize meetup.
- **Add Idea Flow** (`/ideas/add?problemId=...` or `/problems/[problemId]/ideas/add`)
  - Simplified single-screen flow: (1) idea description with media upload → (2) share → (3) congrats → ideas list.
  - Media upload: Multiple images/videos with thumbnail preview, remove functionality, and drag-and-drop support.
  - Mobile-first design with horizontal scroll for multiple media items.
- **Problem Meetups** (`/problems/[problemId]/meetups`)
  - Clean, flexible layout with centered LogoSymbol
  - Meetup cards with status indicators (Live/Online)
  - Cards show participants, problems, ideas, and duration
  - Sticky CTA button for adding new meetups
  - Removed orange gradients for cleaner appearance.
- **Detailed Meetup** (`/problems/[problemId]/meetups/[meetupId]`)
  - Agenda, linked idea(s) and optional problem, location/map, time, details, Join button.
- **Add Meetup Flow** (`/problems/[problemId]/meetups/add`)
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

### Enhanced Problem Detail Page Features

- **Interactive Hero Image**: Clickable image with zoom and pan functionality via modal
- **Visualized Poll System**: Dynamic vote bars showing proportions with percentage indicators
- **Comprehensive Panel Icons**: Each panel header includes relevant Lucide React icons:
  - Report: FileText icon
  - Poll: BarChart3 icon
  - Location: MapPin icon
  - Similar Problems: Grid3X3 icon
- **Enhanced Date Display**: Report dates include calendar icon with full timestamp
- **Google Maps Integration Panel**: Dedicated location panel with map placeholder
- **Responsive Similar Problems Slider**: Horizontal scroll with square cards (160×160px) and overflow clipped at panel level
- **Universal Panel Padding**: Increased padding (p-6) for better breathing room
- **Clean Visual Hierarchy**: Removed distracting orange gradients and borders
- **Mobile-Optimized Zoom Indicator**: Always-visible zoom icon for touch devices

---

## Component Library & Design System

### Core Components
- **LogoSymbol**: Consistent app branding with scalable SVG icon
- **ProblemPillNav**: Tabbed navigation for problem detail views
- **MeetupCard**: Card component for meetup listings with status indicators
- **IdeaCard**: Card component for idea listings with voting metrics
- **ImageZoomModal**: Full-featured modal for image zoom and pan functionality
- **Panel System**: Consistent rounded panels with icon headers and padding

### Design Principles
- **Mobile-First**: All components optimized for touch interaction
- **Flexible Layouts**: No width restrictions, works seamlessly on desktop
- **Consistent Spacing**: Universal panel padding (p-6) and standardized gaps
- **Visual Hierarchy**: Icon headers, proper typography scale, and color contrast
- **Interactive Feedback**: Hover states, focus rings, and loading states
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

### Interactive Features
- **Touch Gestures**: Swipe scrolling, pinch-to-zoom, drag-to-pan
- **Scroll Snap**: Smooth card navigation with snap-to-center behavior
- **Modal System**: Overlay modals with proper backdrop and focus management
- **Animation System**: Subtle transitions and hover effects for better UX

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

## Animations & Motion System

- Centralize motion tokens and presets in a single module (e.g., `src/lib/motion.ts`).
- Store shared timings and easings:
  - `duration.fast = 0.2s`, `duration.base = 0.3s`, `duration.slow = 0.5s`.
  - `easing.inOut = cubic-bezier(0.4, 0.0, 0.2, 1)`; `easing.out = cubic-bezier(0, 0, 0.2, 1)`.
- Provide simple templates/helpers for common patterns:
  - `fadeIn` (opacity 0 → 1, 0.3s, inOut)
  - `fadeInUp` (opacity + translateY, 0.3s, inOut)
  - `scaleIn` (scale 0.98 → 1, 0.2s, out)
- Prefer CSS-first transitions for simple effects; use a motion lib (e.g., Framer Motion) for complex orchestrations.

---

## Next Steps

1. Add Supabase project and `.env.local` wiring; create `media` bucket.
2. Scaffold `AuthProvider` (guest-first) and a `profiles` bootstrap on first load.
3. Implement Problems create + view with media upload and share links.
4. Add Ideas linking to Problems.
5. Add Meetups with Chat (Realtime).

This document should be kept current as modules, schema, and policies evolve.



---

## Add Problem Capture Component

`src/components/AddProblemCapture.tsx` implements the mobile-first capture and submit flow for new problems. It is invoked from the center Plus control on the Discover screen (`src/app/page.tsx`). The component mirrors the provided Figma designs for camera, confirmation, description, and congrats screens.

- **Design references**
  - Camera/trigger: `Add Problem / Camera` (node 3:1015)
  - Preview/confirm: `Add Problem / Confirm` (node 51:98)
  - Description: `Add Problem / Description` (node 3:1040)
  - Congrats: `Add Problem / Congrats` (node 3:1056)
  - Figma file: `Ignis`

- **States (finite state machine)**
  - `camera`: Requests camera (`getUserMedia`) with environment-facing lens; shows Upload (left), Scan (center), Close (right).
  - `preview`: Shows captured/uploaded media with actions `Continue` (primary) and `Retake`.
  - `description`: Dark background; header “What’s the problem?”, rounded textarea, horizontal media strip (thumbnails with per-item delete), Add-more tile, and primary CTA “Add this problem”. Top-left Back arrow returns to `camera`.
  - `congrats`: Stylized circular media preview, display headline, subtext, and CTA “See how it looks like” that closes overlay and returns to Discover.

- **Key handlers**
  - `openCamera()`: Mounts overlay, waits for video to mount, requests stream, assigns to `<video>`, waits `loadedmetadata`, then `play()`.
  - `captureFrame("photo")`: Draws current frame to a canvas and creates a Blob URL for preview.
  - `onFilesSelected()` and `onMoreFilesSelected()`: Generate object URLs for selected files; appended to `selectedMediaUrls` in description.
  - `handleRetake()`: Revokes preview URL(s), restarts stream, returns to `camera`.
  - `startBackgroundUpload(urls)`: Placeholder async that simulates background upload after `Continue`.
  - `submitProblemPlaceholder()`: Placeholder submit from description; transitions to `congrats`.
  - `closeOverlay()`: Cleans up streams and revokes any object URLs, resets state, returns to page.

- **Memory & stream cleanup**
  - All created object URLs are revoked on replacement and teardown.
  - MediaStream tracks are stopped on leaving camera or when overlay closes.

- **Styling & typography**
  - Icons from `lucide-react` (`Scan`, `Upload`, `X`, `RefreshCw`, `ArrowRight`, `ChevronLeft`, `ScanEye`).
  - Display headlines use Caprasimo via `.font-display`; body text uses DM Sans (`font-sans` is mapped in `globals.css`).
  - Gradients and blur match Figma tokens (orange→red gradients for primaries, dark translucent with blur for secondary actions).

- **Integration points (future)**
  - Replace `startBackgroundUpload` with a real uploader (Supabase Storage bucket `media`) and persist a draft Problem row.
  - Replace `submitProblemPlaceholder` with creation of a `problems` row and navigation to `/problems/[problemId]`.
  - Optionally store in-flight media and draft data in a lightweight client store (e.g., Zustand) to survive navigations.

- **Accessibility**
  - Buttons are keyboard-focusable; ensure labels convey action (aria-labels can be extended).
  - Consider adding haptic/animations per Motion System, but keep core interactions usable without them.

This component is intentionally client-only and isolated so we can later swap the background upload and submit with real APIs without changing the UI contract.

## Detailed Problem View

- **Route & File**: `src/app/problems/[problemId]/page.tsx`
- **Header**: Fixed header mirrors Discover with centered `LogoSymbol` and a left back button to return to Discover.
- **Navigation**: Reusable pill component `src/components/ProblemPillNav.tsx` with routes:
  - `Problem` → `/problems/[id]`
  - `Ideas` → `/problems/[id]/ideas`
  - `Meet` → `/problems/[id]/meetups`
  - `Share` → `/problems/[id]/share`
  - `Chat` → `/problems/[id]/chat`
- **Layout**:
  - Mobile: stacked cards (hero image → report/description → poll → similar problems) following the Figma design.
  - Desktop: responsive grid (`lg:grid-cols-12`) placing hero on the left (7 cols) and description + poll on the right (5 cols); similar problems flow in a 3-column grid below.
- **Discover integration**: `src/app/page.tsx` makes each slide clickable (full-slide `Link`) to open `/problems/[id]`.
- **Demo data**: Shared demo problems live in `src/lib/demoProblems.ts` for reuse across pages.
- **Design reference**: Figma “Detailed Problem” frame ([Figma design](https://www.figma.com/design/gDQlVbqZDapQJquKbyzbJ9/Ignis?node-id=3-146&t=kCdORPuVNEdl1u7n-4)).

## Ideas for Problem View

- **Route & File**: `src/app/problems/[problemId]/ideas/page.tsx`
- **Navigation**: Uses `src/components/ProblemPillNav.tsx` with `active="ideas"` to stay consistent with the Problem view header.
- **Layout**:
  - Mirrors the Figma “Ideas for Problem” frame with a dark panel, corner radius, subtle background glow, and two idea cards in the MVP.
  - Width and paddings follow the 402px mobile design baseline; content is centered and scrollable under a fixed header.
- **Idea Card**: `src/components/IdeaCard.tsx`
  - Displays idea body text and three metric pills: events, cost, duration.
  - Upvote control is a floating pill placed outside the text panel at the top-right. It shows the count and an arrow icon in a single control.
  - Upvote behavior: toggles locally (first click +1 and turns orange gradient; second click −1 and returns to neutral); click is non-navigating even when the card is a link.
  - Props: `description`, `eventsLabel`, `costLabel`, `durationLabel`, optional `votesCount`, optional `href`.
- **CTA**: “Got a better idea?” button navigates to `/ideas/add?problemId=...` using the current `problemId`.
- **Design reference**: Figma “Ideas for Problem” frame ([Figma design](https://www.figma.com/design/gDQlVbqZDapQJquKbyzbJ9/Ignis?node-id=3-240&t=kCdORPuVNEdl1u7n-4)).
- **Future integration**:
  - Replace hardcoded ideas with real data (e.g., `ideas` table filtered by `problem_id`).
  - Persist upvotes server-side with abuse controls; store per-profile vote state and expose an aggregate count.

## Add Idea Flow

- **Route & File**: `src/app/ideas/add/page.tsx` (primary) or `src/app/problems/[problemId]/ideas/add/page.tsx` (alternative)
- **Design reference**: Simplified version of Figma "Idea Flow - Step 1" ([Figma design](https://www.figma.com/design/gDQlVbqZDapQJquKbyzbJ9/Ignis?node-id=3-506&t=UsxHTuF3ry2yF5GL-4))
- **States**: Two-step flow (`"idea"` → `"congrats"`)
- **Features**:
  - **Step 1**: "What's your idea?" screen with textarea and media upload
  - **Media Upload**: Multiple images/videos with thumbnail preview (121px × 93px)
  - **Remove Functionality**: Trash icon on each thumbnail to remove media
  - **Add More Button**: Upload button with centered plus icon
  - **Share Button**: Orange gradient CTA, disabled until idea text is entered
  - **Step 2**: Congrats screen with lightbulb icon and "See your idea" button
- **Technical Implementation**:
  - File input with `accept="image/*,video/*"` and `multiple` attribute
  - Object URL management with automatic cleanup on unmount
  - State management: `selectedMediaUrls` array for uploaded files
  - Consistent styling with `AddProblemCapture` component
  - Mobile-first responsive design with horizontal scroll for media

## Add Meetup Flow

- **Route & File**: `src/app/problems/[problemId]/meetups/add/page.tsx`
- **States**: Four-step flow (`"description"` → `"ideas"` → `"datetime"` → `"review"` → `"congrats"`)
- **Features**:
  - **Step 1 - Description**: Multi-line textarea for meetup description and purpose
  - **Step 2 - Ideas Selection**: Optional panel to select related ideas to discuss
    - Multiple selection support
    - "Skip for now" option for optional selection
    - Shows selected ideas count
    - Displays idea titles and descriptions with vote counts
  - **Step 3 - Date/Time & Location**: Comprehensive scheduling and location setup
    - Default date: 1 week from today (auto-calculated)
    - Default time: 5:00 PM (17:00)
    - Location toggle: Offline/Online options
    - Offline: Text input for physical location
    - Online: URL input for meeting links (Google Meet, Zoom, etc.)
    - Optional WhatsApp contact field
  - **Step 4 - Review**: Complete information summary before creation
    - Shows all entered data: description, selected ideas, date/time, location, WhatsApp
    - Organized sections with orange headers
    - Users can review and go back to edit any section
  - **Step 5 - Congrats**: Success screen with calendar emoji and navigation to meetups list
- **Navigation**:
  - X icon in top-left corner to close/cancel the flow
  - Back button on steps 2, 3, and 4 for navigation between views
  - Continue button with contextual text ("Continue", "Review", "Create Meetup")
  - Step indicators showing current progress (Step 1/2/3/4)
- **Technical Implementation**:
  - State management for all form fields: description, selectedIdeas, date, time, location, locationType, onlineLink, whatsappNumber
  - Comprehensive validation with debug logging
  - Conditional rendering based on location type (offline/online)
  - Default values for better UX (date +1 week, time 5 PM)
  - Console logging for form submission (placeholder for backend integration)
  - Responsive design with consistent card styling
  - Proper cleanup and memory management

## Detailed Idea View

- **Route & File**: `src/app/problems/[problemId]/ideas/[ideaId]/page.tsx`
- **Design reference**: Figma “Detailed Idea” frame ([Figma design](https://www.figma.com/design/gDQlVbqZDapQJquKbyzbJ9/Ignis?node-id=3-343&t=kCdORPuVNEdl1u7n-4)).
- **Header**:
  - Centered `LogoSymbol` is absolutely positioned to remain centered regardless of side actions.
  - Left: Back button to Ideas list.
  - Right: two actions inline — `Upvote` (icon + count, no text label) and `Flag` (circular). Upvote uses orange→red gradient when active.
- **Navigation**: `ProblemPillNav` with `active="ideas"`; bottom margin added so content does not overlap.
- **Layout** (mobile-first, 402px content width baseline):
  - Subtle glow ellipses to match the design system.
  - `Idea` section: body text paragraph.
  - `Media` section: two images with rounded corners (`next/image`).
  - `Plan` section: seven steps. Each step is a 2-column row (index chip + text) with its own rounded background (`rounded-[15px] bg-[#353535] px-3 py-2`).
  - `Costs & Resources`: list rows with rounded pill container and amount chips; total shown at bottom-right.
  - `Author`: two equal panels — left is a contained profile image (no overflow beyond the card), right is bio + contact.
  - `Meetups` blurb: informational card matching the design tone.
- **Sticky CTA**: bottom-aligned button “Organize meetup about this idea”
  - Width constrained to match `ProblemPillNav` (`max-w-[380px]`).
  - Style: rounded, `border-4` in `#FF8400`, background `#212121`, white text, with `Users` icon from `lucide-react`.
  - Page content adds extra bottom padding so the CTA never overlaps content.
- **Interactions**:
  - Upvote toggles the local count and gradient state (placeholder; to be wired to backend later).
  - Flag toggles local state (placeholder for moderation/report flow).
- **Data**:
  - Presently uses static copy and demo images. Future work: load idea content by `ideaId` and map to `ideas` storage.
