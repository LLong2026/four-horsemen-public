# PC-HG-01 Deployment Receipt — Per-Crossing Hold Gate, Live 2026-10-24

Authorization: Leon GO (chat authorization, 2026-10-24 14:39 CT) — "quiet change, roll it."
Deployed as a hold-policy flag; strict mode preserved byte-identical as the regression
baseline; box left in crossing_scoped per directive.

## What shipped

- `setHoldPolicy({policy: 'strict' | 'crossing_scoped'})` — deterministic switch,
  persisted, policy echoed in runGovernanceCheck / castVote / manageEpoch responses.
- **strict** = SIP-1 behavior unchanged: any open drift window holds ALL crossings;
  zero journal rows until a clean check.
- **crossing_scoped** = PC-HG-01: CFZ freezes only crossings touched by a drifted
  node (as proposer or voter, hold_reason `crossing_freeze_drift_node`); canonical-only
  crossings journal during the window, stamped `governance_window: drift_open` with the
  linked drift check id. ECON: if drift propagates so no canonical 2-of-3 quorum is
  possible, the box degrades to strict until restore. OR: operator restore + clean check
  releases held proposals via the existing path.
- JIG scoped guarantee: zero UNFLAGGED rows during drift — drift_open rows are flagged
  provenance, never violations.

## Independent live validation (EPOCH-0007, 2026-10-24T19:48Z)

Same open drift window (C2 drifted, DDE check 6add0ba4b7b0b9fbc8174b10), same epoch:

1. **strict regression:** canonical C1+C3 crossing → `held`, no journal row (SIP-1 intact)
2. **crossing_scoped liveness:** fresh canonical C1+C3 crossing → `agreed`, journaled
   stamped `drift_open` + linked check id (row 6add0bc2c9f0fde49081c17b)
3. **crossing_scoped surgical freeze:** C2-proposed crossing → `held`,
   `crossing_freeze_drift_node`, no journal row — same window, same epoch
4. **OR:** sanctioned restore → convergence check clean → `released_proposals: 2`
   (both held crossings released)
5. EPOCH-0007 sealed: 3 proposals, 1 agreed, 0 held outstanding
6. **Integrity audit:** 33 proposals / 27 journal rows / **0 violations**,
   drift_window_crossings: 2 (both flagged, zero unflagged)

The A3 precision leak is now closed at BOTH granularities: strict (zero rows in any
dirty window) and crossing-scoped (surgical freeze, flagged provenance, full liveness).
Both modes of the gate are now demonstrated live on record.

## Notes

- IP claim phrasing (per PC-HG-01_IP_CANDIDATE.md): describe the policy-flagged gate,
  not one mode. Filing requires Leon GO (two-key doctrine).
- Box standing state: crossing_scoped (strict is one setHoldPolicy call away).
- Silent epoch runner unaffected: mode choice is immaterial unless drift is injected.

## Prototype Disclaimer

This software is a prototype and is provided for educational and research purposes only.
It is not intended for production use, commercial deployment, or safety-critical
environments. All systems are experimental and may contain defects.
