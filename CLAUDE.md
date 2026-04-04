# intersite

Open-source Astro portfolio engine for project and experiment showcase sites. Configurable via `INTERSITE_*` environment variables.

## Build & Run
- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — production build to dist/
- `pnpm start` — serve production build (node dist/server/entry.mjs)

## Configuration

All site identity is driven by env vars (see `.env.example`):
- `INTERSITE_SITE_NAME`, `INTERSITE_SITE_SHORT` — site name and abbreviation
- `INTERSITE_SITE_URL` — canonical URL for sitemap
- `INTERSITE_NAV_BRAND`, `INTERSITE_FOOTER_BRAND` — nav and footer text
- `INTERSITE_CONTACT_EMAIL` — footer contact link (hidden if empty)
- `INTERSITE_AUTH_USERNAMES`, `INTERSITE_AUTH_EMAILS` — admin allowlist (open if both empty)
- `INTERSITE_CONTENT_DIR` — absolute path to external content directory (uses built-in examples if empty)

## Content Overlay

Consumers use intersite as a git submodule and provide their own content:
1. Set `INTERSITE_CONTENT_DIR` to point at your content directory
2. Overlay custom pages/components via rsync before build
3. Run `pnpm build` from the engine directory

## Content Pipeline Rules
- **NEVER call `getCollection()` directly in production pages.** Always use `getPublishedContent()` from `src/lib/content.ts`.
- `getPublishedContent()` filters to `pipeline_state === "published"` AND `mk_approved_at` is set.
- Content starts at `pipeline_state: "raw_draft"` and must be manually promoted to `published`.

## Content Collections
- `src/content/projects/` — project portfolio pages
- `src/content/experiments/` — lab notebook entries
- `src/content/plugins/` — optional plugin index
