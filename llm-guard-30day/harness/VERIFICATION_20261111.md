---
title: LLM Guard gate verification, 2026-11-11
summary: Measured results for the deployed gate functions in the LLM Guard app, including two parser fixes, chain behaviour under concurrency, and the coverage boundary.
---

# LLM Guard gate verification

Target: app `6af4f91500f74ce4b3d73f71` (LLM Guard). Functions under test: `gateEvaluate`, `gateVerify`, `gateAudit`.
All calls made against the deployed app over HTTP, not against local copies. Operator GO recorded as chat authorization, 2026-11-11.

## 1. Determinism and regression, 11 cases

Two identical calls per case, verdict compared. All 11 matched on both runs.

| case | expected | observed |
|---|---|---|
| correct decrease, fell 30% from 2.0M to 1.4M | pass | pass |
| correct decrease, dropped 25% from 4.0M to 3.0M | pass | pass |
| wrong decrease, fell 40% from 2.0M to 1.4M | blocked | blocked, recomputed -30.00% |
| time described as length, 3 h long | blocked | blocked, units |
| length unchanged, 12 m long | pass | pass |
| percent wrong, 12% from 3.4M to 3.9M | blocked | blocked, recomputed 14.70% |
| percent right, 14.7059% | pass | pass |
| mass described as tall, 300 kg tall | blocked | blocked, units |
| citation absent from context, Ramirez study | flagged | flagged |
| clean prose, no claims | pass | pass |
| correct increase, 33.33% from 2.1M to 2.8M | pass | pass |

Result: 11/11 pass, 0 fail, 0 non-deterministic.

Two of these were defects found by testing rather than review. Before the fix, every correctly worded decrease was refused, because a stated magnitude was compared against a signed recomputation. And `h` was missing from the unit table, so "3 h long" passed silently.

## 2. Coverage boundary, 10 wrong claims and 6 true ones

Catch rate on wrong claims: 10/10. True statements refused: 0/6. This is measured on the ten cases below, not on a corpus, and the boundary is wherever the grammar stops.

Caught: percent arithmetic, rephrased percent, decrease magnitude, unit against adjective (twice), absent citation with a source noun, mixed unit mismatch, organisation name after "according to" (Harvard Business Review), composition shares summing above 100 (60% + 55% = 115%), a share exceeding its own whole (140% of its own total).

The last three were misses in the first measurement and were closed the same evening; both of the two earlier fixes were re-tested after each change. The honest description remains: it catches what its grammar can parse and is silent about the rest. A pass means nothing was proved wrong, never that the claim is true.

## 3. Load

| run | calls | concurrency | wall | throughput | p50 | p95 | errors | wrong verdicts |
|---|---|---|---|---|---|---|---|---|
| A | 120 | 12 | 8.1 s | 14.83 req/s | 454 ms | 883 ms | 0 | 0 |
| B | 200 | 40 | 5.9 s | 34.09 req/s | 476 ms | 927 ms | 0 | 0 |
| C | 160 | 40 | 3.7 s | 43.2 req/s | not sampled | not sampled | 0 | 0 |
| D | 120 | 24 | 4.9 s | 24.56 req/s | 569 ms | 912 ms | 0 | 0 |

Run D was taken after the three coverage fixes landed, so the numbers include the added checks.

Verdict correctness held exactly under concurrency: the 12% case returned blocked 60 of 60 times in run A, and 160 of 160 in run C. The computation is the part that holds.

## 4. The receipt chain does not hold under concurrent writes

After run C the chain audit reported `chain_intact: false` with 411 violations across 537 rows: duplicate seq values, gaps, and entries whose predecessor link did not match. After run D it reported 288 violations across 719 rows. Both times the cause was the same. The cause is structural, not a bug in the gate: seq is allocated as newest + 1, so two writers in the same instant claim the same position.

What is true today:

- Detection works. The audit named each violation by gate_run_id.
- Repair works and reports honestly. In repair mode it returned `chain_intact: false`, 288 violations found, 150 rows re-sequenced, then `chain_intact_after: true` (411 and 159 on the earlier run). An earlier build returned clean while repairing, which is the defect class this programme exists to catch; that reporting fault is fixed.
- Convergence works. A plain audit after repair returned `chain_intact: true`, 0 violations, 719 rows.

What is not true: the chain is not linearizable. Under burst writes it forks and requires audit plus repair. For a classroom rate of one evaluation at a time this never triggers. For many simultaneous student sessions it would, every burst.

## 4b. Scope decision: per-person use, so no lock

Owner direction, chat authorization 2026-11-11: the app is per-person functionality, one evaluation at a time, not hosted multi-tenant. Under that scope a distributed lock is the wrong fix and was not built.

Measured, to size the remaining risk: two submissions fired 0 ms apart both took seq 720 and forked the chain. Two submissions 150 ms apart were clean (seq 721/722), and 400 ms apart clean (723/724). So the only realistic per-person path to a fork is a double click in the same instant, or an auto-retry on a timeout.

Fix applied at the button, not the database: single-flight while a call is in flight, and no automatic retry with the same text. A maintenance "audit and repair" control is exposed for recovery. The fork from the double-tap test was repaired the same minute: 3 violations found, 5 rows re-sequenced, final audit intact with 0 violations across 725 rows.

## 5. Standing caveats for any certification statement

1. `pass` is a refusal to assert, not a clearance. Coverage is measured at 10/10 on this adversarial set; the set was written by the person testing, so it bounds nothing about claims nobody thought to try.
2. The receipt chain is safe for sequential per-person use and is not safe for simultaneous writers. That limit is accepted by scope, not fixed, and any future hosted multi-user version has to solve it before it ships.
3. The test corpus from these runs (about 725 rows) lives in the app's GateRun table. It is verification traffic, not student work. A purge action was requested from the builder; until it exists, the table is not clean for students.

Prototype disclaimer applies. No client data, no PHI.
