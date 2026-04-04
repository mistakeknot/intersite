---
title: "Latency Reduction Experiment"
date: 2026-01-15
tags: ["performance", "infrastructure"]
result: success
summary: "Tested whether edge caching reduces p95 response time. Result: 40% improvement with minimal cache invalidation overhead."
pipeline_state: published
mk_approved_at: "2026-01-15T00:00:00Z"
---

Tested whether edge caching reduces p95 response time by deploying a CDN layer in front of the API. The hypothesis was that static-ish responses (project metadata, plugin listings) could be cached at the edge with 60-second TTLs without causing stale-data issues.

Result: p95 dropped from 320ms to 190ms. Cache invalidation via purge-on-write added negligible overhead.
