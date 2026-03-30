---
title: "Route Heuristic Coverage"
date: 2026-03-28
tags: ["agent-routing", "flux-drive", "interspect"]
result: inconclusive
summary: "Testing whether expanded B2 shadow-mode heuristics improve flux-drive agent selection accuracy across heterogeneous repos"
pipeline_state: raw_draft
---

## Hypothesis

The B2 shadow routing mode logs what it *would* change in model selection (e.g., `sonnet -> haiku` for C1/C2 complexity tasks) but never acts on it. We hypothesized that expanding the heuristic table from 3 complexity tiers to 7 — covering edge cases like mixed-language repos, monorepo subdirectories, and plugin-heavy trees — would increase the shadow-mode agreement rate with interspect's post-hoc optimal routing by at least 15 percentage points.

## Method

Ran `/interflux:flux-drive` across 7 diverse target repos (3 single-language libraries, 2 monorepos, 1 infrastructure repo, 1 documentation-heavy repo). For each review, captured the B2 shadow log output alongside interstat's per-agent token telemetry and intersynth's convergence metrics. The expanded heuristic table was loaded via `agent-roles.yaml` with 4 additional complexity classes (C4-C7) mapping to finer-grained model assignments. Control runs used the original 3-tier table on the same repos.

Each run dispatched between 5 and 12 agents depending on triage. Total: 14 flux-drive sessions, ~180K tokens consumed.

## Observations

The expanded heuristics improved shadow-mode agreement on monorepo targets by 22 points (from 41% to 63%), but *decreased* agreement on single-language libraries by 8 points. The new C5 ("plugin-heavy tree") class correctly identified interverse plugin directories but over-triggered on `node_modules/` subtrees, causing spurious complexity upgrades.

Convergence metrics from intersynth showed no statistically significant difference in finding quality between control and expanded runs. The additional model routing didn't change what agents *found* — only what they *cost*. This suggests the heuristics affect efficiency but not effectiveness at current quality floors.

Marked inconclusive: the monorepo improvement is promising, but the regression on simpler repos needs a gating mechanism (perhaps repo-type pre-classification) before the expanded table can ship as default.
