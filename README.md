# intersite

Open-source Astro portfolio engine for project and experiment showcase sites.
Site identity is configured through `INTERSITE_*` environment variables (see
`.env.example`), and content can come from the built-in examples or an external
directory.

## Develop

Requires Node 22.12 or newer and pnpm.

```bash
pnpm install
pnpm dev      # dev server at http://localhost:4321
pnpm build    # production build to dist/
pnpm start    # serve the production build
```

## Content

Set `INTERSITE_CONTENT_DIR` to an absolute path to use your own content;
otherwise the built-in examples are used. Content starts as `raw_draft` and is
shown only once it is promoted to `published` and approved. Pages should read
content through `getPublishedContent()` in `src/lib/content.ts`, not
`getCollection()` directly.

See `AGENTS.md` for the full guide.
