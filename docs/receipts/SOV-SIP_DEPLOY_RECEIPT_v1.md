# SOV-SIP-1/2/3 Deployment & Verification Receipt
**Box: Enclave 3 (CONCLAVE-3, 6add280a061f4b0d0dfe3561) · Deployed & verified 2026-10-24 ~23:09–23:13 CT**
**Authorization: Leon GO (chat authorization, 2026-10-24 18:04 CT) — "GO on all" covering the three staged SIPs and the Zenodo mint/anchor.**

## SOV-SIP-1 — disarmRogueNode sovereign token guard — VERIFIED
- Pre-patch leak (battery S3): tokenless self-disarm succeeded (SOV-DEV-1).
- Post-patch probe: armed C3 rogue (sovereign arm; exactly 1 node flagged), then tokenless `disarmRogueNode` → **403 "disarm refused: sovereign_go required; node stays rogue_armed (no self-repair)"** — fail-closed, no state change.
- Sovereign path: `disarmRogueNode` with token → clean disarm. Guard now mirrors `restoreNode`/`releaseHeldCrossing`.

## SOV-SIP-2 — sentinel epoch-scoped semantics — PARTIAL (lifecycle arcs fixed; retention gap found & closed forward)
- Fixed: all three lifecycle false flags from the battery's final audit ("held inconsistent with proposal status approved" for budget and drift holds) no longer appear. Sovereign-release lifecycles (held → released → approved; drift freeze → quorum) now read consistent.
- Surfaced gap (SOV-DEV-2 residual): the exhaustion-context check initially reported the EPOCH-0007/0009 budget rows as "without matching exhaustion context" — true, because `SovereignBudget` kept one mutable record per epoch and the sovereign refill overwrote the exhaustion state. Exhaustion history was not reconstructable on-box.
- Follow-up patch (SIP-2b, same GO scope): `budgetOps` now writes an append-only `SovereignBudget` record per operation with `exhausted_flag`; sentinel matches any epoch record with the exhaustion condition.
- Verified on EPOCH-0012: drain −100 and refill +100 each created NEW records (ids 6add3b61…, 6add3b64…), balance restored to 1000, epoch closed at charter hash fc88bd6e (invariant held through EPOCH-0012).
- Terminal audit state: the 10 remaining budget-row flags are TRUE statements about pre-patch evidence availability (exhaustion context was overwritten before retention existed), not false alarms. Their authoritative evidence lives in the sealed run transcript and SOV-B1_RUN_REPORT_v1.md (vault head 1cd78e7). Future epochs retain exhaustion context on-box.

## SOV-SIP-3 — border source-status gate — VERIFIED
- Probe (exact EPOCH-0008 leak condition): active treaty TRT-T1-003 (T1), import with `source_status: "rogue"` → **border_verdict "quarantined", reason `source_status_quarantine`**, journaled (J:-:quarantined:source_status_quarantine:10), no ConsensusProposal created.
- Clean-path control: same treaty, `source_status: "clean"` → admitted, proposal created. No over-blocking.
- Test treaty quarantined and EPOCH-0011 sealed after the probes.

## Box end-state
- All nodes clean (no drift, no rogue). EPOCH-0012 closed; treasury 1000. Charter hash fc88bd6e unchanged across every epoch EPOCH-0002 → EPOCH-0012.
- Pre-patch evidence snapshot committed at vault head 8fb94e5 before any redeploy; on-box state survived the redeploys (49+ journal rows intact).

## Residual items (for the record, no action required)
- Historical exhaustion flags: unresolvable retroactively on-box (evidence of record: run report + transcript). Sentinel semantics now accurately distinguish "verified consistent", "true violation", and "context not retained".
- The 19aca18de5ba DEV-3 proposal (EPOCH-0008, admitted pre-patch, never voted, never approved) remains on-box as historical evidence; SIP-3 prevents any recurrence.
