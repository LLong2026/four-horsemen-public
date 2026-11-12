# Runtime Era — Live Mesh Topology Widget: Extraction Spec (v1.0, Sept 4, 2026)

**Source confirmed:** Squirl OS HUB app, "Neural Mesh" page. The widget ships on every Runtime Era app as the third visual signature (with the heartbeat widget + prototype disclaimer/Support tab).

> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.
>
> SQUIRL OS — Self-Healing AI Infrastructure. 8 patents pending + 5 SBIR tracks. © 2026 SquirlOS Technologies LLC. All Rights Reserved.

## Data Contract (the whole magic)

The page reads ONE entity: **NeuralNode**. Nothing else travels for data.

| Field | Use in widget |
|---|---|
| `layer` | Row grouping (L1-L5) |
| `pattern_type` | Node role label (ingest / feature / classify / match / learn) |
| `weight` | Node visual weight + card display |
| `activation_count` | Node pulse intensity + stat tile sum |
| `last_activated` | Recency dimming (idle nodes fade) |

**Verified against live data (Sept 4, 2026):** 12 seed records — L1 ingest x3 (weights 0.82/0.64/0.73), L2 feature x3, L3 classify x2 (0.91), L4 match x2, L5 learn x2 (0.95). Sum of activation_count = 1,735 = the stat tile. The widget is a pure projection of NeuralNode state.

## Component Inventory (what gets extracted)

1. **Live Mesh Topology panel** — 5-layer layout, nodes sized/glowing by weight, pulsing on activation, stat tiles (Total Nodes / Layers / Activations)
2. **Per-layer node cards** — grouped by layer + pattern_type, showing weight, learn rate, activation count
3. **Data wiring** — `NeuralNode.list()` → group by layer → render. No joins, no backend function, no cross-entity reads. Client-side only.

## Seed Procedure (Runtime Era conversion step)

- Demo/seed mode: 12-node simplified topology (as in Squirl OS HUB)
- Production Runtime Era apps: full **31-node reference seed** from NeuralNodeTemplate (v1.1 template topology, immutable)
- Activations feed from the self-learning loop: every successful healing event increments the matched node's activation_count + updates Pattern/LearningMetric (per operating rules) — so the widget counts REAL healing work, not decoration

## Why it sells

Competitors' self-healing claims are invisible. This widget is proof-of-work for AI — the buyer watches their app think, and the numbers are auditable against their own healing event log.
