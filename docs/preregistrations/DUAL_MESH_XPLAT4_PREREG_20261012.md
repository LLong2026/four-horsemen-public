# XPLAT-4 Preregistration — Hub Conversation Loop, Pinned-Model Decomposition Legs

**Series signature:** dual_mesh_benchmark_xplat4_20261012
**Prereg committed:** 2026-10-12 (before any XPLAT-4 measurement)
**Priority lineage:** extends the Dual Mesh Benchmark series (v1.0 DOI 10.5281/zenodo.23303081, v2.0 DOI 10.5281/zenodo.23321637) and the XPLAT cross-platform protocol (prereg commit 68d34ed8, amendments cd387d6e, 26b1bfaf).

## Purpose

XPLAT-2/3 established that the platform conversation loop's wall-clock cost is dominated by orchestration, not model inference (~41x gap between loop and raw external API). XPLAT-4 closes the remaining open variable: the v1.0 loop measurement ran on the Automatic engine, so model identity was uncontrolled. The nightly battery pin (60-day window, Oct 7–Dec 6) pins the hub chat model to a known roster entry each night — making the conversation loop measurable with a **controlled model variable, one orchestration constant**.

Result: a per-model latency column for the identical resolution task through the same conversation loop. This decomposes loop cost into (a) model-dependent and (b) model-independent (orchestration) components across the battery roster.

## Protocol (fixed before execution)

1. **Frozen corpus:** CORPUS_B1.json, sha256 13295d197be59dd1266814bc2f961f1e55e974c61c642fd9c7a6a389668fee59 — identical file to all prior legs. Selection rule: **first 20 instances in file order** (same rule as ENV-B / XPLAT-3, envb_runner.py line 8).
2. **Leg schedule:** one leg per battery night, executed **after** that night's 21:05 CT model pin (battery_model_pin_N-B<k> stamp present) and **after** the nightly Horsemen chaos cycle completes. First six legs (one full roster rotation) constitute the minimum publishable matrix; further rotations optional and labeled by night id.
3. **Execution substrate:** the hub's own conversation loop, fresh agent conversation per instance (n=20 per leg), single request → response, wall-clock request-to-validated-tuple (same metric as v1.0 B1 baseline and ENV-B).
4. **Model identity:** that night's pinned roster model. ROSTER = [gemini_3_1_pro, claude_sonnet_5_5, claude_opus_5_5, gpt_5_6_luna, gpt_6_sol, glm_5_2_superagent]; night k pins ROSTER[(k-2) mod 6].
5. **Stream isolation (battery integrity):** bench instances are labeled `XPLAT4-NB<k>-<00..19>`. They are resolution prompts, not anomalies: no AegisAnomaly, no AegisHealingEvent, no Pattern/LearningMetric writes from bench traffic. Auto-heal and chaos-cycle telemetry exclude the XPLAT4-* prefix by construction.
6. **Validation:** strict parser first (score reported), then declared normalization pass (fences/whitespace only, per amendment 26b1bfaf doctrine); both scores reported per leg.
7. **Metrics (preregistered, no additions):** per leg — valid count (strict, normalized), median, p95 wall-clock ms; per matrix — per-model median/p95, spread across models (model-dependent component), and comparison against the v1.0 Automatic-loop median (4509.1 ms) and mesh median (0.000443 ms).
8. **Credit guard:** a leg runs only if the agent's monthly message credit balance is ≥ 100 after the leg's projected spend (20 conversations); otherwise the leg is marked `deferred_credits` in the receipt and skipped — never partially run.

## Falsifiers

- **FB-7 (fresh conversations):** PASS requires 20 distinct conversations, one per instance; no reuse within or across legs.
- **FB-8 (pin verification):** PASS requires a settings readback confirming the pinned model matches that night's roster entry, captured before the leg and recorded in the receipt.
- **FB-9 (stream isolation):** PASS requires zero AegisHealingEvent or LearningMetric records referencing XPLAT4-* instance ids during the leg window.
- **FB-10 (raw preservation):** all 20 raw responses per leg preserved verbatim in the evidence bundle.

## Disclosures (binding)

Each leg characterizes the measured environment: the Base44 agent conversation loop with that night's pinned model, October 2026. No universal claim per model or per platform. Strict scores are reported alongside normalized scores; deferrals under the credit guard are reported, never hidden. The v1.0 disclosures remain in force. Synthetic corpus only; no production, customer, or personal data.

> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.
