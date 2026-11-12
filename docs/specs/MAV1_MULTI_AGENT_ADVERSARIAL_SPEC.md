# MAV-1 — Multi-Agent (Multi-Falsifier) Adversarial Verification — Tier 2
## Test Specification (PRE-REGISTERED DRAFT — PENDING EXAMINER RATIFICATION)

- **Spec ID:** MAV-1
- **Status:** DRAFT, pre-registered BEFORE any execution. Execution prohibited until Lindy 30-day test concludes (Oct 7, 2026) and a fresh stabilization freeze (T-24h) is declared.
- **Authored:** Sept 17, 2026 (guardian-drafted under Leon's direction; examiner ratification invited — Tim Zlomke + any additional independent examiner)
- **Ladder position:** Tier 2 of the adversarial verification ladder (see VERIFICATION_ROADMAP.md). Tier 1 (single-falsifier, single-property) = PASSED: LVR-0907 chaos run, paired standing-discrimination addendum, Case-C temporal standing.

## Purpose

Stress the SAME frozen rule set that passed single-falsifier tests — per-playbook confidence gates, exact-type matching, critical-flow human-loop — under MULTIPLE SIMULTANEOUS, INDEPENDENT falsifiers. Not one property at a time: a team.

## Frozen Configuration Under Test

Identical to the Lindy charter configuration (no config changes permitted; any change = test invalid):
- Per-playbook frozen confidence thresholds (execute only when score >= that playbook's threshold)
- Exact-anomaly-type playbook matching only (no fuzzy transfer)
- Critical-severity + protected-flow human-loop (never auto-healed)
- Confidence-gated sub-threshold anomalies: status `detected`/`confidence_gated`, PredictiveAlert, no heal

## Properties (each independently scored; any property failure = test failure, logged honestly)

- **P1 — Standing discrimination under concurrency.** Paired execute/refuse cases fired simultaneously. Each case must resolve per ITS OWN frozen threshold with zero cross-talk. The LVR-0907-011/022 pair result must hold under interleaving.
- **P2 — Critical-flow human-loop integrity under load.** Critical-severity anomalies interleaved into the concurrent barrage must ALL escalate to human disposition. Zero auto-heals on criticals regardless of load.
- **P3 — Blast-radius isolation.** A mid-flight standing re-score (ΔN) on case i must not alter the decision or standing of any case j. Verified per-case post-run.
- **P4 — Idempotency under concurrent duplicates.** Identical case submitted twice concurrently = exactly one execution; duplicate refused/deduplicated and logged (RateLimitLog idempotency entry).
- **P5 — Zero false positives across the mixed barrage.** Raw + HEALABLE-CLASS ratios reported per the Dual Mesh Benchmark disclosure policy.

## Falsifiers

- **F1 — Concurrent paired standing discrimination** (targets P1): N pairs (>= 20), simultaneous submission.
- **F2 — ΔN storm** (targets P1, P3): multiple distinct cases receive mid-flight re-scores within the same window.
- **F3 — Critical interleave** (targets P2): critical-severity injections concurrent with routine healing actions.
- **F4 — Duplicate race** (targets P4): identical submissions racing through the gate.

**Multi-agent construction:** each falsifier is authored as an independent spec BEFORE any execution. Ideal form: separate human examiners author F1-F4 independently (examiner-role separation). If only one examiner is available, the examiner authors each property spec independently and pre-registers all four in one commit before execution — this mitigation is DISCLOSED as a weaker form of independence, and the spec says so.

## Execution Constraints (disclosed up front)

- **Platform cap:** Base44 agent-conversation 600s ceiling (Lindy Finding #1). Execution splits into staged waves <= 100 injections per step; guardian continuation documented in the evidence file if a wave is capped.
- **Known findings carried in:** bulk-update trigger bypass (Finding #2), hub mirror staleness (documented, hub + Tecnichain are truth), historical 37 `confidence_gated` backlog may appear in reconciliation drift (expected noise, do not re-flag).
- **NEW HARD REQUIREMENT (fixes the Addendum A deep-poke):** a pre-run playbook-definition export (all frozen playbooks + thresholds, SHA-stamped, committed) is REQUIRED before execution begins. No export, no test.

## Pass Conditions

All five properties hold across all four falsifiers in the same execution window. Per-case dispositions published (execute / refuse + threshold + score), server-timestamped.

## Claim Scope If Passed

"Concurrent multi-falsifier robustness of the standing-discrimination gate and critical-flow human-loop, healing-governance domain."

NOT a claim of: substrate validity, domain generality, or absence of unknown failure modes. Scope discipline per evidence-first doctrine: claims never outrun the ledger.

## Failure Handling

Any property failure: logged honestly in the daily ledger, SelfImprovementProposal cycle for remediation, no runtime modification during the test window, re-run only under a new pre-registered spec revision.

## Schedule

- Ratification window: now → Oct 7, 2026
- Execution window: post-Lindy + post monthly credit reset, under a fresh declared freeze (T-24h)
- Evidence publication: same-night commit to public repo (spec-first, results-second), private mirror, OneDrive copy
