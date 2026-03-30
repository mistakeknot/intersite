---
name: Elf Revel
status: dormant
domain: simulation-games
themes: ["generative-media"]
lineage: "Dwarf Fortress depth in the browser — emergent colony simulation without the install barrier"
featured: false
tagline: "Browser-based elven colony simulator"
description: "A browser-based elven colony simulation with Dwarf Fortress-level procedural depth. Elf Revel aimed to bring deep emergent simulation to the browser, generating terrain, societies, and individual histories that create unique stories through systemic interaction rather than scripted events."
what_was_learned: "Browser performance limits hit hard when simulating hundreds of autonomous agents with individual state machines. The useful takeaway was a set of patterns for hierarchical agent simulation — coarse-grained group behavior with fine-grained individual detail only when observed — that informed Sylveste's approach to multi-agent orchestration at scale."
pipeline_state: raw_draft
---

Elf Revel attempted to prove that deep emergent simulation could work in a browser tab. The colony sim generated terrain, cultures, and individual agent histories, producing emergent narratives from systemic interactions. The project went dormant when browser performance constraints made the target simulation depth impractical, but the agent hierarchy patterns it developed found a second life in Sylveste's multi-agent orchestration.
