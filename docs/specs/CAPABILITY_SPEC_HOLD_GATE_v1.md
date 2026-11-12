# Squirrel OS Capability Spec — Governance-Drift Hold Gate (PC-HG-01)
**Version:** 1.0 · **Status: STAGED — NOT DEPLOYED** · written 2026-10-24

> This document writes the capability down. Nothing is deployed, activated, imported,
> or scheduled by it. The gate stays dark until Leon issues an activation GO. When that
> GO comes, the Activation Checklist at the bottom is the whole job.

Authorization to write (not deploy): Leon GO (chat authorization, 2026-10-24 15:03 CT).

---

## 1. Capability statement

A quorum-gated write path can be frozen surgically when the governance state it relies on
is no longer trustworthy. Drift on one participant does not halt the system; it freezes
only the crossings that participant touches, flags any write that proceeds during the
drift window, and releases everything the moment an operator restores canonical state.

Two modes, one deterministic switch:
- **strict** — any open drift window holds every crossing. Zero journal rows until clean.
- **crossing_scoped** — only crossings touched by a drifted node hold; unaffected
  crossings proceed and are stamped as drift-window provenance.

## 2. Evidence base (live, on record)

| Where | What it proves |
|---|---|
| CONCLAVE-1 A3 arm | Original precision leak: honest C1+C3 quorum journaled during open drift (epoch-granular hold) |
| EPOCH-0005 / SIP-1+SIP-2 | Strict gate: held quorum, no journal row, auto-release on clean check |
| EPOCH-0007 / PC-HG-01 | Dual mode, same drift window: unaffected crossing journaled `drift_open`; drifted node's crossing held `crossing_freeze_drift_node`; operator restore released both |
| Integrity audit (33 proposals / 27 rows) | **0 violations**, drift-window rows flagged, zero unflagged rows during drift |

Artifacts: `conclave1/PC-HG-01_IP_CANDIDATE.md`, `conclave1/PC-HG-01_DEPLOYMENT_RECEIPT.md`,
`conclave1/CONCLAVE1_RUN_REPORT.md`. Box: CONCLAVE-1 (research, zero lineage).

## 3. Formal specification

- **DDE — Drift Detection Event.** Raised immediately when a governance hash comparison
  finds any participant non-canonical. Emits a hold action plus an operator alert.
- **CFZ — Crossing Freeze.** A crossing is *affected* if a drifted node is its proposer or
  casts any vote on it. Affected crossings cannot form quorum or write a journal row.
  Unaffected crossings proceed.
- **ECON — Epoch Continuity.** Unaffected work continues. Full halt only on propagation:
  if no canonical quorum remains possible, degrade to strict until restore.
- **OR — Operator Restore.** Only an operator clears CFZ. No self-repair, ever. Restore logs
  drift fingerprint, affected crossing id, node state, and restore hash.
- **JIG — Journal Integrity Guarantee (scoped).** Zero *unflagged* rows during drift; zero
  orphans, ghost rows, or phantom quorums. Drift-window rows carry `governance_window`
  + linked check id and are reported as provenance, never as violations.
- **Invariants preserved.** Governance bytes, quorum math, epoch-close semantics, journal
  row identity, and the no-self-repair guarantee are all untouched by mode switching.

## 4. Integration map into Squirrel OS (design only — nothing wired)

| Spec element | Squirrel OS surface it would bind to | State |
|---|---|---|
| DDE | Governance hash checks / constitution sentinel audit / SystemHealth comparisons | exists; binding not written |
| Crossing | Any quorum-gated approval path (two-key publish gate, ack registry, SelfImprovementProposal approvals) | mapping defined, no code |
| CFZ | Hold action on the affected approval path only | no counterpart yet |
| ECON | Fleet pulse, sync pulse, heartbeat monitoring continue untouched | by design |
| OR | Owner restore + clean re-check releases held items | exists in doctrine form |
| JIG | Ledger append-only doctrine + drift-window annotation field | doctrine exists; field only on research box |
| Policy flag | `strict` / `crossing_scoped`, deterministic, one call | research box only |

**Honest gap:** production Squirrel OS has no consensus-crossing machinery today, so there
is nothing for the gate to bite on. The gate's value in production arrives with the first
quorum-sealed write path (e.g. settlement-batch sealing), not before.

## 5. Activation checklist (the "turn it on" job)

Preconditions: (a) a production quorum-gated write path exists and is identified;
(b) Leon GO naming the exact surface (deployment gate + two-key doctrine apply);
(c) rollback rehearsed on the research box.

1. Freeze the target surface's current behavior record (baseline snapshot).
2. Bind DDE to the surface's governance comparison; verify it fires on a sanctioned drill.
3. Ship the gate with policy defaulted to **strict**; run one drill end to end.
4. Switch to **crossing_scoped**; run the EPOCH-0007 dual test on the production surface.
5. Run the integrity audit; require 0 violations and zero unflagged drift-window rows.
6. Journal the activation as a forward-only ledger entry (append-only doctrine).
7. Confirm escalation wiring: drift holds and alerts reach the owner chat.

**Rollback:** one `setHoldPolicy('strict')` call, or disable the gate binding. No schema,
journal, or governance state changes are involved, so rollback is non-destructive.

## 6. Open decisions (Leon's, at activation time)

1. Which production surface gets the gate first.
2. Default mode for that surface (strict vs crossing_scoped).
3. Whether the public corpus gets a write-up, and when (two-key gate).
4. Whether PC-HG-01 goes forward for provisional filing as a policy-flagged gate claim.

## 7. Prototype Disclaimer

This software is a prototype and is provided for educational and research purposes only.
It is not intended for production use, commercial deployment, or safety-critical
environments. All systems are experimental and may contain defects.
