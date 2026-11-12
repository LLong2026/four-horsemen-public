# HG-CERT-1 Mint + Anchor Receipt

**Artifact:** HG_CERT-1_EVIDENCE_BUNDLE.zip (certification report v1.0 + locked prereg + run receipts)
**Bundle sha256:** `0a073f640053a2cf565363823aac2c3f545c6fd7619ee593d1a1be389dcb296f`
**Zenodo DOI:** 10.5281/zenodo.23627901 (published 2026-10-24, CC BY 4.0, v1.0)
**Record:** https://zenodo.org/record/23627901
**Byte-roundtrip verified:** downloaded bundle sha256 matches local artifact byte-exactly.
**Authorization (two-key):** Gabriel vet + Leon GO (chat authorization, 2026-10-24 17:04 CT) —
mint + tri-chain anchor of the certification report.
**Redaction scan:** clean (no emails, wallets, credentials, customer-identifiable data, PHI;
synthetic zero-lineage research box, structural metadata only).

## Tri-chain anchor (envelope class 0x12: SQDR + 0x12 + bundle digest)

All anchors carry payload `53514452120a073f640053a2cf565363823aac2c3f545c6fd7619ee593d1a1be389dcb296f`
and were independently read back against the recorded envelope.

**XLM (run 1, canonical):** tx 839120b25c87795bf03dfb1ddaffd1221eee5e16fc09864d32eab6ddbdbe46d7
(ledger 65118765, confirmed; payload verified via horizon readback)
**XRP (run 1, canonical):** tx 2DC07C490FE86B0785A4FCF647FB004953A3DE4E891148CA9FBA5D3D4D59B44B
(VALIDATED; payload verified via xrplcluster readback)
**BTC (run 1):** tx 0d2f391d0bfbbe78097a335a83617f67e2f3b69a46ef1a6b328acac33eaf21ea
(790 sats, spends FIR-1 change output 4d15ceb1:1 — chain continuity from weekly checkpoint FIR-1, block 972895)
**BTC (run 2):** tx 16b67c7871bd570515072fbc8113250a4b7fcfdaea0a804f7888efc777393b24
(chained on run 1's change output; identical payload)

## DEVIATION DISCLOSED — duplicate anchor fire (operational, no integrity impact)

The triad runner was adapted twice with differing legs-file names (HG_CERT-1_TRIAD_LEGS.json vs
HG_CERT1_TRIAD_LEGS.json), which broke the idempotency check: the second run found an empty legs
file and re-fired all three legs instead of skipping. Result: each rail carries TWO anchor
transactions with identical payloads (XLM: 839120b2 + b4eceb0c; XRP: 2DC07C49 + 26FCE42C;
BTC: 0d2f391d + 16b67c78, chained). All six transactions verified payload-true. Redundant
anchors are additive, not conflicting — the anchor claims on all rails are valid — but the
duplicate fire is journaled here and in the public ledger entry 0336 per the audit-and-correction
doctrine. Root cause: operator (Gabriel) started a second runner while the first was still
awaiting BTC confirmation, with a non-shared idempotency file. Cost impact: ~$0.42 in duplicate
BTC fees, ~2 XLM stroop fees, 20 XRP drops.

Ledger entry: fh_pub LEDGER.md 0335 (mint, in-row GO marker) and 0336 (anchor receipt + this deviation).
