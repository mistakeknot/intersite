# intersite

Portfolio and lab site for General Systems Ventures. Published at generalsystemsventures.com.

## Build & Run
- `pnpm dev` — dev server at localhost:4321
- `pnpm build` — production build to dist/
- `pnpm start` — serve production build (node dist/server/entry.mjs)

## Content Pipeline Rules
- **NEVER call `getCollection()` directly in production pages.** Always use `getPublishedContent()` from `src/lib/content.ts`.
- `getPublishedContent()` filters to `pipeline_state === "published"` AND `mk_approved_at` is set.
- Only mk sets `pipeline_state: "published"` after manual review.
- Auto-generated content (from `/intersite:generate`) always starts at `pipeline_state: "raw_draft"`.

## Pipeline States
See `src/content/PIPELINE.md` for the full state machine.

## Deploy
- Runs on sleeper-service via Cloudflare Tunnel
- Port 4322 (interblog is 4321)
- systemd user service: `systemctl --user restart intersite`
- Build and deploy: `pnpm build && systemctl --user restart intersite`

## Content Collections
- `src/content/projects/` — project portfolio pages
- `src/content/experiments/` — lab notebook entries
- `src/content/plugins/` — Interverse plugin index (auto-generated)

## Relationship to interblog
- interblog plugin owns the editorial pipeline (scan/pitch/draft/send)
- Blog content will be one-way synced from interblog to intersite (future epic)
- intersite is the rendering surface; interblog is the editorial engine
