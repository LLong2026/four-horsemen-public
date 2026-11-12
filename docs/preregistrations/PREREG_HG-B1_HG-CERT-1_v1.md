# HG-B1 + HG-CERT-1 Preregistration — Governance-Drift Hold Gate
**Status: LOCKED (patterns-only) · Written 2026-10-24 · Box HG-B1: CONCLAVE-1 · Box HG-CERT-1: CONCLAVE-2 (fresh, zero-lineage)**

Authorization to draft and lock: Leon GO (chat authorization, 2026-10-24 15:07–15:08 CT).
Per-run GOs, and any public mint/anchor of results, remain separate gates (two-key doctrine).

---

## 0. Scope and claim under test

The Per-Crossing Hold Gate (PC-HG-01, staged spec v1.0) claims deterministic containment
for quorum-gated writes: drift freezes exactly the crossings a drifted node touches,
flags any write that proceeds during a drift window, never self-repairs, and releases
everything on operator restore. HG-B1 measures it as a benchmark; HG-CERT-1 certifies
it on a clean instance.

## 1. HG-B1 — benchmark battery (CONCLAVE-1)

Deterministic, seeded, machine-checkable. All digests are sha256 of fixed seed strings
(HG-B1-<arm>-<n>), computed and committed in the run report. Each arm runs inside its
own epochs; every epoch closes with a manageEpoch receipt; the battery ends with
runIntegrityAudit scope=all.

### Arms

- **A0 — Baseline liveness.** No drift, no rogue. 12 canonical crossings under both
  policies (strict, crossing_scoped), proposers rotated C1→C2→C3. Expected: 12/12 agreed,
  0 held, 0 rejected, journal rows unflagged.
- **A1 — Precision.** Single-node drift, rotated across C1, C2, C3 (one drifted node
  per sub-run). Per drifted node: 1 affected crossing (proposer = drifted node) and
  1 unaffected crossing (proposer + voters both canonical). Expected: every affected
  crossing held (`crossing_freeze_drift_node`), every unaffected crossing agreed and
  journaled `drift_open`; restore + clean check releases held crossings.
- **A2 — Strict regression.** Drift window, policy=strict. Canonical quorum attempted
  mid-window. Expected: held, zero journal rows until a clean check; then agreement
  proceeds normally after release.
- **A3 — Stacked adversarial.** Rogue arm (C3 armed, out-of-band reject injection) AND
  drift arm (C2 drifted) simultaneously, policy=crossing_scoped. Includes: rogue-proposed
  payload with honest votes; affected crossing with rogue vote; unaffected canonical
  crossing. Expected: 0 rogue-carrying agreements, affected crossings held, unaffected
  crossing journaled `drift_open`, rogue injection flagged on every armed vote.
- **A4 — ECON collapse.** Two of three nodes drifted (C2, C3), policy=crossing_scoped.
  Canonical quorum is impossible. Expected: degradation to strict behavior — zero
  journal rows while no canonical 2-of-3 exists, no phantom quorum, no agreement formed
  on non-canonical state; operator restore of both nodes + clean check re-enables
  agreement.
- **A5 — Fault injection.** Malformed digests (wrong length, not hex), vote replay
  (second vote same node), vote on unknown proposal, double-submit same digest,
  policy flip mid-window (strict↔crossing_scoped between vote 1 and vote 2 of one
  crossing). Expected: every fault rejected with a deterministic error, no journal
  corruption, no partial quorum, policy flip never converts a held crossing into an
  agreed one or vice versa.

### Metrics and pass thresholds (fixed, preregistered)

| Metric | Definition | Pass |
|---|---|---|
| Freeze recall | affected crossings held ÷ total affected | 100% |
| Hold precision | unaffected crossings allowed ÷ total unaffected (crossing_scoped) | 100% (zero false freezes) |
| Strict zero-row guarantee | journal rows written during any strict drift window | 0 |
| Drift-window flag fidelity | unflagged journal rows during any open drift window | 0 |
| Rogue containment | agreements whose hash equals an out-of-band injected hash | 0 |
| Release correctness | held crossings released after restore + clean check ÷ held | 100% |
| Fault rejection | deterministic rejects ÷ injected faults | 100% |
| Integrity audit | violations in final runIntegrityAudit | 0 |

**HG-B1 PASS = all eight rows at threshold, no unplanned deviations.** Any deviation is
journaled verbatim in the run report, never silently patched; deviations may seed SIPs.

### Rhythm note
The hub learning loop (LINDY/HEMI) is untouched by this battery; CONCLAVE-1 is a
zero-lineage research box. The battery runs inside chat-directed research windows with
Leon present, consistent with the standing weekly rhythm.

## 2. HG-CERT-1 — certification (CONCLAVE-2, fresh zero-lineage)

### Commissioning
1. New private Base44 app, zero lineage: no prior proposals, votes, journal rows,
   epochs, or governance checks on first read (verified in the cert report).
2. Deterministic function set deployed mirroring CONCLAVE-1's stack including the
   hold-policy gate (setHoldPolicy, strict + crossing_scoped), byte-identical in
   behavior to the staged spec v1.0.
3. Governance hashes identical across C1/C2/C3 at commissioning.

### Certification suite (fixed, 3 identical runs — CERT-R1, R2, R3)
Each run executes, in order:
1. Commissioning verification (zero lineage, hash identity).
2. Strict regression drill (drift → held quorum → zero rows → restore → release).
3. Scoped precision drill (drift → affected held, unaffected journaled `drift_open`).
4. Rogue containment drill (armed C3 → zero rogue-carrying agreements).
5. ECON collapse drill (2-of-3 drifted → zero rows, no phantom quorum → restore).
6. Integrity audit: 0 violations, zero unflagged drift-window rows.
7. Determinism check: run-level outcomes byte-comparable across R1/R2/R3
   (same seeds → same verdicts, same hold/release counts, same audit result).

### Certification criteria (all must hold, all three runs)
- C1. Freeze recall 100%, hold precision 100%.
- C2. Zero unflagged drift-window rows; zero rogue-carrying agreements.
- C3. Restore releases 100% of held crossings; no self-repair observed at any point.
- C4. Integrity audit 0 violations on the cert box, full history.
- C5. Determinism: no outcome divergence across the three runs.

**HG-CERT-1 PASS = C1–C5 all green across R1–R3.**

### Deliverables (each pending its own gates)
- HG-CERT-1 compliance report (PQC-E0 style: scope, method, criteria, evidence, verdict).
- Evidence bundle (byte-exact logs + receipts) — private vault first.
- Public mint + tri-chain anchor of report/bundle — only on separate Leon GO.

## 3. Sequencing

1. HG-B1 battery on CONCLAVE-1 → run report + verdict.
2. CONCLAVE-2 commissioned (fresh box).
3. HG-CERT-1 suite R1–R3 → cert report + verdict.
4. Findings feed the staged spec (v1.0 → v1.1 only if a SIP-worthy deviation appears;
   spec is frozen until then).

## 4. Prototype Disclaimer

This software is a prototype and is provided for educational and research purposes only.
It is not intended for production use, commercial deployment, or safety-critical
environments. All systems are experimental and may contain defects.
