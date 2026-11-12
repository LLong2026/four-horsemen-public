# PREREGISTRATION — SLR-1: Scale Limit Receipt 1 (1000-Event Concurrent Load Test)

**Registered:** 2026-10-07 (this commit's timestamp is the registration record — committed BEFORE any execution)
**Registrant:** Leon Calvin Long II — SQUIRL OS Technologies
**Status:** Pre-registered. No 1000-event load batch has been generated or executed at registration time.
**Series:** Companion to the SDR determinism series (SDR-1/2 substrate determinism; SDR-D stamped-box certification). SLR measures CAPACITY and CEILING, not just correctness.

---

## 1. Motivation

SDR-2 certified determinism at scale for a 240-event batch (10x original), including determinism under concurrent load at all 240 positions. On 2026-08-31 a real pool-exhaustion incident was auto-healed by scaling the connection pool 500 -> 1000 with pgBouncer (ScalingEvent receipt). The system has OPERATED at 1000-connection capacity since, but no deliberate test has ever loaded the substrate to that ceiling. This preregistration buys the baseline: where the system actually bends, and whether determinism and governance hold while it bends.

**Test magnitude:** 1000 concurrent events per arm-batch (~42x SDR-2's batch) — the first deliberate load test at the capacity the fleet already carries by healing record.

## 2. Design

- **Batch:** `slr1-scale-1000` — 1000 synthetic telemetry/anomaly events injected in a single concurrent window, mixed families (DSA + TAV + routing), mixed severity including guard-triggering entries.
- **Arms:** fleet stack under the 60-day battery (Horsemen arms + SIM-B + SIM-C + SIM-D), synthetic-only, same isolation guarantees as the H-Line prereg (zero Lindy contact, zero live-tenant writes, Rule 8 structural-metadata-only).
- **Execution path:** Plan D full-capability session (Cloudflare Worker -> Hub ops conversation), batched injection via healthy backend-function path. No per-event message credits.
- **Reference replay:** the same 1000-event batch is replayed UNLOADED and the decision vector recorded; the loaded run's decision vector must match at all 1000 positions.

## 3. Pre-specified falsifiers (all committed before execution)

- **F-1 Determinism under load:** loaded-run decision vector diverges from the unloaded replay at ANY position -> FAIL.
- **F-2 Guard integrity:** any guard bypass (Rule 2/4/6) under load -> FAIL.
- **F-3 Write-back completeness:** any injected event that is neither healed nor detected-and-receipted (silent loss, false-green stamp) -> FAIL.
- **F-4 Auto-heal ratio:** healable-pool ratio falls below the 88.5% baseline under load -> FAIL (measured and recorded, never hidden).
- **F-5 Latency bound:** average resolution time under load exceeds 3x the unloaded family baseline -> recorded as CEILING DATA (not a silent pass).
- **F-6 Capacity ceiling:** connection pool exhausts past the 1000 ceiling or pgBouncer queue overflows -> recorded as CEILING DATA. **A ceiling break is a RESULT, not a test failure.** The point of SLR-1 is to map the limit honestly.
- **F-7 Contamination:** any cross-app or cross-tenant bleed in loaded-run writes -> FAIL (evidence partitioning per the substrate-certification prereg).

**Verdict rule:** F-1..F-4 and F-7 must all hold for PASS. F-5/F-6 outcomes are recorded either way — they are the baseline we are buying. No rerun-until-green: the first completed run is the receipt, honestly recorded in the ledger.

## 4. Execution window and gate

- **Window:** inside the 60-day battery, proposed Night 14 (2026-10-20) — two weeks of Plan D rail stabilization first.
- **Gate:** Leon's explicit GO at fire time. If deferred, the prereg stands and the run executes on the next agreed night.
- **Cost bound:** batched injection; estimated integration-credit spend verified against the pool BEFORE the GO, reported with the receipt.

## 5. Measurement plan (recorded either way)

Pool utilization curve; latency distribution (p50/p95/p99) vs unloaded baseline; queue depth; guard-hold stats; per-family heal timings; write-back completeness count; decision-vector parity diff (must be zero); NeuralNode activation counts; LearningMetrics written to the hub learning loop (Rule: every healable event feeds learning, even under load).

**Disclosure:** This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects. All inputs synthetic.
