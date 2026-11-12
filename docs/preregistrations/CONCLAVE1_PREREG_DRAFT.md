# CONCLAVE-1 Preregistration (DRAFT v0.1 — pending Leon GO for publication)

**Experiment:** Three-node consensus core for governance-invariant convergence
**Architecture:** Firewall → Consensus → Firewall (ingress guard → 3-node quorum core → SIP-only egress)
**Box:** CONCLAVE-1 (Base44 app 6adcee5674aac269ba6ae4cc), zero-lineage, synthetic/operator-owned state only
**Status:** RUN COMPLETE 2026-10-24 (A1-A3 executed; EPOCH-0002: 12/12 agreed; EPOCH-0003 rogue arm: 6 proposals, 0 rogue-carrying agreements; EPOCH-0004 drift arm: detect → hold → sanctioned restore; final integrity audit 23 proposals / 22 journal rows / 0 violations). Wire payload LOCKED to patterns-only. See CONCLAVE1_RUN_REPORT.md for full outcomes.
**Lineage:** Extends HEMI series (DOIs 10.5281/zenodo.23330308, 23330348, 23330361); formalizes H-INV-1/H-INV-2 in distributed form; subject-matter adjacent to provisionals 64/181,746 (Tenth) — potential CIP: "distributed governance-invariant convergence"

## Hypotheses (pre-registered)

- **P1 (Cluster H-INV-1):** The governance layer remains byte-identical (sha256 ad8d8b3d...3634d family) across C1/C2/C3 at every epoch boundary, under both benign and adversarial learning pressure. Any divergence is detected, never auto-corrected.
- **P2 (Cluster H-INV-2):** Every agreed crossing produces exactly one CrossingJournal row, and no CrossingJournal row exists without a quorum-agreed source proposal. Zero orphan crossings in either direction, all epochs.
- **P3 (Adversarial rejection):** A rogue-armed node (out-of-band hash injection) cannot achieve quorum for any proposal, whether proposing or voting, in any epoch.
- **P4 (Drift halts):** Deliberate governance drift on one node halts all crossings for affected proposals and raises a hold+alert; the system never repairs the drifted content itself.
- **P5 (Deterministic selection):** Gate/playbook selection is byte-identical across all three nodes across all epochs, including during active rogue and drift arms.

## Design

- **Quorum rule:** 2-of-3 byte-identical payload hashes; deterministic only, no LLM in any gate, consensus, or adjudication path.
- **Payload classes:** PATTERN ONLY (32-byte pattern digests). Leon decision 2026-10-24: patterns cross the wire, safety first; weight shards deferred until the pattern regime is proven. WEIGHT_SHARD proposals, if ever submitted, must be auto-rejected by the core in this run.
- **Arms:**
  - A1 Baseline: 12 proposals, no adversary. Expect 12 agreed, 12 journal rows, P1-P2 clean.
  - A2 Rogue: 6 proposals with C3 armed (rotating proposer). Expect 0 rogue-carrying agreements, all rejected or held, P3 holds.
  - A3 Drift: governance content mutated on one node mid-epoch. Expect crossings halt, hold+alert, P4 holds, no auto-repair.
- **Success criteria:** P1-P5 each pass/fail by measurable record-level evidence (GovernanceIntegrityCheck, CrossingJournal, ConsensusVote, ConsensusProposal); integrity invariant checked every epoch: journal rows == agreed proposals, zero orphans.
- **Run window:** Leon GO 2026-10-24 (chat): run TODAY, Saturday 2026-10-24. Patterns-only regime, arms A1-A3.
- **Known commissioning residue (disclosed):** EPOCH-0001 contains 4 commissioning proposals (sha256 of empty string, "abc", "test", and one mismatch-hash rejection test). These are commissioning tests, not experiment data; experiment epochs begin at EPOCH-0002.

## Resolved items (post-run update 2026-10-24)

1. **Drift-arm capability:** RESOLVED — deterministic `injectGovernanceDrift(node_id)` / `removeGovernanceDrift(node_id)` pair added (operator-callable only; the box itself never mutates governance). Used in A3 with reversible synthetic markers.
2. **Publication GO:** still pending — experiment execution was authorized (Leon GO, chat, 2026-10-24); prereg/run-report publication and any ledger/DOI mint remain separate GO gates (two-key doctrine).

## Run outcome summary (2026-10-24, post-run — full detail in CONCLAVE1_RUN_REPORT.md)

- P1 PASS, P2 PASS, P3 PASS, P4 PASS (epoch granularity; per-crossing hold not implemented in this build — disclosed finding), P5 PASS.
- Honest deviations recorded: A2 proposals passed on honest quorum rather than being rejected/held (liveness preserved; 0 rogue-carrying agreements); A3 in-flight crossing between canonical nodes journaled during the drift window (hold operates at epoch level).
- Commissioning residue stands as disclosed: EPOCH-0001 (4 proposals, 3 agreed / 1 rejected) is commissioning data; experiment epochs are 0002-0004.
