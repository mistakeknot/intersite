---
title: "Local MoE Models for Token Cost Reduction"
date: 2026-03-27
tags: ["interfere", "token-efficiency", "local-inference", "cost-reduction"]
result: inconclusive
summary: "Measuring whether routing high-volume low-stakes agent tasks to local MLX MoE models on M5 Max reduces cloud token spend without quality regression"
pipeline_state: raw_draft
---

## Hypothesis

Clavain's token spend profile shows ~50-65% of tokens go to low-stakes tasks: research agents (Haiku-routed, ~30-40%) and C1/C2 exploration subagents (~20-25%). interfere's local MLX server benchmarks at 88 tok/s for the 35B-A3B MoE model and 50 tok/s for 122B-A10B MoE. Since marginal cost of local inference is zero, we hypothesized that routing research and exploration agents to the 35B MoE (which activates only 3B parameters per forward pass, matching Haiku-tier speed) would eliminate 40-50% of cloud token spend while maintaining equivalent finding quality, as measured by intersynth convergence scores.

## Method

Configured interfere's Track B5 shadow mode to intercept requests that would normally route to Haiku. For 12 sessions over 3 days, ran dual-path evaluation: each research agent query was sent to both the cloud Haiku endpoint and the local 35B-A3B MoE model. Responses were logged but only cloud responses were used in production to avoid contaminating live reviews.

Compared responses on three dimensions: (1) factual accuracy against known ground truth in 4 well-documented repos, (2) finding severity distribution (did the local model miss high-severity issues?), and (3) response latency including queue time on the local server.

## Observations

The local 35B MoE matched Haiku's factual accuracy on 89% of research queries — encouraging but below the 95% threshold we'd set for automatic routing. The gap was concentrated in two areas: queries requiring recent API knowledge (the local model's training cutoff is older) and multi-hop reasoning chains longer than 4 steps where the MoE's sparse activation seemed to lose coherence.

Latency was competitive: 35B MoE averaged 1.2s for typical research-length responses vs 0.8s for cloud Haiku. The 50% latency increase is acceptable for background agents but would be noticeable in interactive loops.

Cost projection if deployed: $2.93/landable-change baseline would drop to ~$1.70 — a 42% reduction. But the 11% accuracy gap on complex queries means we'd need a complexity pre-classifier to gate which queries go local vs cloud. This is essentially the same problem as B2 routing heuristics (see route-heuristic-coverage experiment), suggesting these two workstreams should merge.

Marked inconclusive pending the complexity pre-classifier. The raw cost savings are real but shipping without quality gating would degrade review quality on the hardest queries.
