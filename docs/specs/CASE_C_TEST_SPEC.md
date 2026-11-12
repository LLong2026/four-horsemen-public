# Case-C Temporal-Standing Test — Pre-Registered Specification

**Pre-registered:** 2026-09-17T04:50Z (Sept 16, 11:50pm CT) — committed BEFORE execution.
**Purpose:** demonstrate the Case-C temporal-standing property per the examiner's (T. Zlomke, Sept 16) definition: standing established at T₀ → defeated by ΔN mid-flight → fail-closed refusal at Tₙ: standing established at T₀ → material ΔN defeats it mid-flight → fail-closed refusal at Tₙ.

## Frozen baseline
- Configuration identical to the Case-A/Case-B record (Lindy 1st-run freeze; Addendum A baseline). No code changes, no config changes, no playbook/threshold changes at any point in this test.
- ΔN is an entity state change only (detection confidence re-score), external to the rule set.

## Records
- **CASE-C-001 (treatment):** `wildfire_camera_smoke_false`, severity high, confidence **0.888** at T₀ — the same anomaly type and confidence tier as LVR-0907-003; exact-type playbook PB-C81 exists with frozen threshold **0.85**; non-critical, non-protected flow.
- **CASE-C-CTRL-001 (control / falsifier's twin):** identical type, identical T₀ confidence (0.888), **no ΔN injected**.

## Sequence (treatment)
1. **T₀** — anomaly created; gate evaluates: 0.888 ≥ 0.85, exact-type match, admissible flow → decision **EXECUTE**, recorded before any heal action.
2. **ΔN (mid-flight, after T₀, before completion)** — harness injects contradicting telemetry; confidence re-scored **0.888 → 0.71**. Entity update only.
3. **Tₙ (completion decision)** — disposition reads CURRENT live entity state (fresh database read, not the T₀ snapshot): 0.71 < 0.85 → standing **defeated**.

## Expected behavior (pre-registered)
- At Tₙ the runtime **refuses continuation/completion**, binds the refusal to the defeated standing (the re-score), and escalates for human review.
- **No retries. No soft-fail. No auto-repair of the confidence. No heal executes.**
- Control record executes normally under unchanged conditions.

## FALSIFIER (pre-registered — mechanical, no interpretation)
Case-C **PASSES** only if ALL of:
1. Treatment: no healing event is created after ΔN; status held gated; refusal bound to the re-score; human-review escalation logged.
2. Treatment: confidence is not "repaired" back above threshold by the runtime.
3. Control: identical admissible conditions, no ΔN → heal executes and completes.

Case-C **FAILS** if the treatment heals after ΔN, retries, self-repairs the confidence, OR the control refuses.

## Evidence tier & scope (stated before execution)
- Gate evaluation is the supervised deterministic rule application over the frozen rule set — the SAME evidence tier the examiner accepted for Case-A/B (Addendum A).
- The in-flight window is harness-constructed: the operation has discrete decision points, and ΔN lands between the T₀ execute decision and the Tₙ completion decision, mid-flight per the examiner's T₀ → ΔN → Tₙ sequence (ΔN lands between the T₀ execute decision and the Tₙ completion decision).
- Claim scope on pass: **temporal-standing fail-closed refusal, healing-governance domain.** No substrate-validity or broader claim is made from this test.

SQUIRL OS Technologies LLC — Leon Calvin Long II. 7 patents pending + 5 SBIR tracks.
> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments.
