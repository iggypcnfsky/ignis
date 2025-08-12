# TASKS

## Social Preview Metadata

- [ ] Add Open Graph and Twitter metadata using the Ignis logo.
  - Implement in `src/app/layout.tsx` via `export const metadata` with `openGraph` and `twitter` fields.
  - Provide an OG image (static file in `public/` or dynamic via `src/app/opengraph-image.tsx`). Use `public/LOGO-SYMBOL.svg` as base or a composed banner.
  - Verify tags render with a local HTML inspection and external validators (e.g., Twitter Card Validator, Open Graph Debugger).
  - Ensure dark/light compatibility and correct absolute URLs in production.


