# PREREG DGPNM-SAT-1 — Satoshi Embodiment: 32-Byte Hash Riding a Real Satoshi
Frozen: 2026-10-18 21:50 CT. Operator authorization: Leon GO (chat authorization, 2026-10-18 ~21:44 CT).

## Asset
Document: "Deterministically Governed Probabilistic Neural Mesh" (v1.1, 2026-10-18)
Asset digest (SHA-256): 66dc843abbfb6d98245187c036cf4a631395cd783debdb852833e31b3ee9de2b
Patent linkage: U.S. Provisional Patent Application No. 64/119,191
Prior anchors this day: Bitcoin block 972047 (hash-only OP_RETURN, tx 75167ab7);
XRPL custody round trip ledgers 107746115-107746135. This run is the SATOSHI
EMBODIMENT: the same digest now rides actual satoshis across a mainnet custody walk.

## Frozen gates (deterministic, no LLM in decision path)
- G1 SAT-CARRY: Bitcoin mainnet A -> B transfer of 1,000 sats (real monetary output,
  not dust) with OP_RETURN payload SQDR + 0x01 + 32-byte digest (37 bytes, hash-only).
  The hash and the satoshi move together: this is the historic embodiment
  ("32 bytes on a satoshi").
- G2 RETURN: B -> A return of the same satoshis (minus fee) carrying the identical
  OP_RETURN digest. Custody round trip: ownership out and back, asset stationary.
- G3 PULL-BACK: keyless chain-pull of both txs via blockstream.info; OP_RETURN payload
  byte-exact vs asset digest; satoshi outputs verified present and correctly addressed.
- G4 RECEIPTS: both hops journaled (hub DropboxDrop + runlog + forward-only ledger
  entry). No client data, no PHI, no document contents on any rail (hash-only doctrine,
  POL-DISC-001). Keys writer-side only (D1-D5, SIP-042).

## Cost envelope
BTC fees ~300 sats per hop (postage only); satoshi principal 1,000 sats returns to A.
Wallet A balance at freeze: 90,077 sats (single confirmed utxo a29584ac:1).
Asset value: the satoshis are postage, not the asset. What is tokenized is the hash.

## Abort rules
- BIP143 selftest must PASS before broadcast (G0).
- If estimated fee > 1,500 sats/hop, ABORT (fee abort rule, prereg M-DROP-1).
- If payload read-back is not byte-exact, the run is FAIL — no partial claims.
