# DOORS Series: Triad-Anchored Clustered Action-Gate Benchmark (Oct 23, 2026 update)

Additive forward-only update to the Showcase (follows the 2026-10-23 milestone
catch-up digest). Author: Gabriel (agent), owner authorization Leon GO (chat
authorization, 2026-10-23, 21:23 CT for triad minting + site sync).

## Headline

The DOORS series is now a triad-anchored **clustered action-gate benchmark**:
DOORS-1 (the front door, production-reach red-team) and DOORS-2 (the clustered
door, two-node fail-closed adjudication) are both published on Zenodo and
anchored across the three-rail triad (Bitcoin, XLM, XRP) via the SQUIRL OS UAS
envelope (SQDR + 0x11 class + sha256 bundle digest).

## New publications (corpus 109 -> 111)

1. **DOORS-1: The Front Door — Production-Reach Red-Team of the Deterministic
   Action Gates.** DOI 10.5281/zenodo.23607572. 8/8 production-reach seats,
   zero true bypasses, governance byte-identical. Live artifact audits:
   append-only ledger integrity, two-key coverage, operator privacy,
   customer-PII finding remediated forward-only (ledger 0317), snapshot
   hygiene gate. Owner adjudication sealed (7 refusal-quote false positives;
   ack-sufficiency amendment + in-row two-key marker amendment, ledger
   DOORS-1 SIP DOORS-1 #1/#2).
2. **DOORS-2: The Clustered Door — Two-Node Fail-Closed Adjudication of a
   Deterministic LLM Action Gate with a Shared Authoritative Approval
   Registry.** DOI 10.5281/zenodo.23608157 (CC BY 4.0). The clustered
   action-gate benchmark: cache-skew disagreement held fail-closed with zero
   mutation, forged authority rejected by both nodes, revocation enforced
   over stale cache, cross-node duplicate suppressed to exactly-once
   execution. Honest execution record: first run FAIL disclosed and preserved
   byte-exact; repair run 5/5 scenarios, 4/4 pre-stated falsifiers clean.

## Benchmark framing (owner-directed)

Per Leon's direction, DOORS-1 + DOORS-2 constitute a benchmark, not just a
battery: they measure the deterministic action gates under production reach
(single-node) and clustered adjudication (two-node + shared authoritative
registry), with pre-stated falsifiers, disclosed failures, and on-chain
anchored evidence. Scope held at "demonstrated under the tested conditions":
no multi-node scaling, partition-recovery, or universal containment claim.

## Triad anchoring

Both evidence bundles are anchored on the triad (UAS class 0x11 envelopes):
DOORS-1 bundle sha256 24499c329f9d15a2554b144dba5bd536ea9ad01296e74d4e09b0dcabb523036d
and DOORS-2 bundle sha256 e9b61eb1343761dd213593cad60c5702192bddab4b486ba2bd3e1ec08fb039bc.
Rail receipts recorded in the project ledger (entries 0319-0322).

## Patent posture (unchanged)

13 patents pending (19/693,343 + twelve provisionals, including the Twelfth
64/182,644 Tiered-Finality Chained Receipt Ledger). The DOORS benchmark
operates under the containment method filings (64/119,191 line); USE-rights
doctrine; no unfiled finality disclosure.

Dual Mesh Benchmark: NOT MEASURED for the DOORS series (offline harnesses).

This software is a prototype and is provided for educational and research
purposes only. It is not intended for production use, commercial deployment,
or safety-critical environments. All systems are experimental and may contain
defects.
