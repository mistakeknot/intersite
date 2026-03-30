# Content Pipeline State Machine

## States
- `raw_draft` — auto-generated or manually created. Visible in dev only.
- `texturaize_review` — submitted to Texturaize for factual review. Visible in dev only.
- `voice_review` — returned from Texturaize, awaiting interfluence voice check.
- `mk_review` — voice-checked, awaiting mk's final approval.
- `published` — live on production. Requires `mk_approved_at` timestamp.
- `archived` — removed from production. Can return to `mk_review` for republish.

## Transitions
```
raw_draft → texturaize_review → voice_review → mk_review → published → archived
                                                                ↑              |
                                                                └──────────────┘
```

## Enforcement Seam
- **App (build time):** Zod schema validates `pipeline_state` + `mk_approved_at`. `getPublishedContent()` is the single gate. Production pages must not call `getCollection()` directly.
- **Plugins (convention):** `/intersite:generate` always writes `pipeline_state: "raw_draft"`. Only mk sets `published` via `/intersite:publish` after review.
