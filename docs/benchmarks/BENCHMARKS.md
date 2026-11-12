# SQUIRL OS Benchmarks

## Dual Mesh Benchmark (appears in every report — it's the flagship)

| Metric | Value |
|---|---|
| Anomaly lookup speedup | **267×** (800ms → 3ms) |
| Active neural nodes | **25** (5 read + 13 interconnect + 7 write) |
| Agents in the mesh | **10**, collision-free |
| Patents covering | **3** (64/119,191 · 64/114,746 · 19/693,343) |
| False positives | **0** across 70+ stress test anomalies |

## Chaos-Trained Mesh — Life Cycle Ramp

The system is trained by injecting real anomalies at escalating scale (200 → 400 → 600 → 800 → 1000 per run, cyclically, nightly):

- **Run 1 (Sept 4, 2026):** 200 injections in ~60s — **85% auto-healed**, 20 deterministic gates held, 10 criticals escalated to a human (correct behavior — criticals require a human), 20 novel anomaly types survived first contact, **0 false positives**
- **Auto-heal ratio is tracked cycle-over-cycle** — flat ratio means repetition without learning, and the benchmarks say so honestly
- A real training run measured **32% train / 61.9% val accuracy** — weak, real, and reported honestly. The old system claimed fake 100%. This one never will.

## Mailflow Chaos Benchmark

Full corporate email stack (SPF, DMARC, DKIM-pending) survived simulated chaos with zero downtime across both real and simulated company infrastructures (Sept 3, 2026).

## Honest Numbers Policy

SQUIRL OS never reports a metric it didn't measure. Skipped says skipped. Failed says failed. Pending says pending. That policy is enforced in code (deterministic runtime), not in marketing.

---

**8 patents pending + 5 SBIR tracks** · support@squirlos-technologies.com · squirlos-technologies.com

> **Disclaimer:** This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects.
