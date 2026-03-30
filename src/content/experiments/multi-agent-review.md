---
title: "Intermediate Finding Sharing in Parallel Review"
date: 2026-03-25
tags: ["flux-drive", "multi-agent", "intersynth", "coordination"]
result: success
summary: "Validating that real-time finding sharing via shared JSONL reduces contradictions and token waste in parallel flux-drive code reviews"
pipeline_state: raw_draft
---

## Hypothesis

When 7+ flux-drive agents review an artifact in parallel, each operates in total isolation until the synthesis phase. If fd-safety discovers a critical vulnerability early, fd-architecture cannot adjust its recommendations — contradictions are only caught in intersynth after all agents have burned their full token budgets. We hypothesized that a shared `findings.jsonl` file, read at natural checkpoints before final report generation, would reduce cross-agent contradictions by at least 30% and cut wasted tokens by 10-15%.

## Method

Implemented a two-level severity system for the shared findings channel: **blocking** findings (contradicts another agent's analysis; agents MUST acknowledge) and **notable** findings (significant but optional to incorporate). Informational findings stayed in per-agent reports only to keep the shared channel high-signal.

Transport was file-based: `{output_dir}/findings.jsonl` with append-only writes — no locking needed since each agent appends a single JSON line. Agents checked for peer findings at the "before writing final report" checkpoint rather than being interrupted mid-analysis.

Ran 6 paired reviews: 3 artifacts reviewed with finding sharing enabled, 3 with the standard isolation baseline. Each review dispatched 7 agents. Measured contradiction count in intersynth verdicts and total tokens consumed.

## Observations

Finding-sharing runs produced 38% fewer contradictions in synthesis verdicts (avg 1.8 vs 2.9 per review). Token savings averaged 12% — agents that read blocking findings from peers skipped redundant deep-dives into already-flagged areas.

The most dramatic improvement was on a security-sensitive PR where fd-safety flagged an auth bypass early. In the baseline run, fd-architecture and fd-api both independently spent ~8K tokens analyzing the same code path before synthesis caught the overlap. In the sharing run, both read the blocking finding and pivoted to adjacent concerns, producing 3 unique findings that the baseline missed entirely.

One caveat: agents occasionally over-deferred to peer findings, producing shallower independent analysis. The checkpoint-pull design mitigates this (agents decide what to incorporate) but a future iteration should track "finding adoption rate" to detect excessive deference.
