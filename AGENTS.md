# intersite — Agent Reference

## Overview
Astro 6 static site for GSV portfolio. Tailwind 4, MDX, Node adapter (standalone).

## Directory Structure
- `src/content/{projects,experiments,plugins}/` — content collections
- `src/pages/` — Astro pages (projects, experiments, plugin index)
- `src/layouts/Base.astro` — shared layout
- `src/lib/content.ts` — content query utilities (getPublishedContent, etc.)
- `src/components/` — UI components (StatusBadge, ResultBadge, etc.)

## Content Schema
Projects: name, status, domain, themes[], lineage, featured, tagline, repo, description, pipeline_state, mk_approved_at
Experiments: title, date, tags[], result, summary, pipeline_state, mk_approved_at
Plugins: name, description, notable

## Deploy Target
sleeper-service via Cloudflare Tunnel, port 4322, systemd user service.
