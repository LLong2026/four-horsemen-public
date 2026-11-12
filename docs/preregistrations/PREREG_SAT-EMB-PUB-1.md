# PREREG SAT-EMB-PUB-1 — Publication + Full-Stream Tokenization of the Satoshi Embodiment Paper
Frozen: 2026-10-18 21:55 CT. Operator authorization: Leon GO (chat authorization, 2026-10-18 ~21:49 CT).

## Asset
Paper: "The Satoshi Embodiment: A 32-Byte Hash Riding Real Satoshis Across a Bitcoin
Mainnet Custody Walk" (v1.0, 2026-10-18). PUBLIC paper — published openly on Zenodo
(not hash-only; papers are public documents under program doctrine; only drafts are
hash-only). Paper is the receipt record of ceremony DGPNM-SAT-1.
Asset digest (SHA-256): 493a45234bbed02f2a81384c943ba47ba4c4cd895d501d1a56e86e09989186bc
File: SATOSHI_EMBODIMENT_PAPER_v1.0.pdf

## Frozen gates (deterministic, no LLM in decision path)
- G1 DOI: mint Zenodo record (paper + runlog + prereg bundle + walk state), DOI
  published; communities dcai + squirlos-technologies.
- G2 BIND: OP_RETURN on Bitcoin mainnet = SQDR + 0x01 + 32-byte paper digest (37 bytes,
  hash-only, no monetary output), writer wallet A, fee adaptive <= 1,500 sats.
- G3 SEND: XRPL mainnet custody round trip A -> B -> A, 1 XRP, memo type
  SQDR-XRP-ANCHOR-1 carrying the paper digest byte-exact.
- G4 PULL-BACK: keyless reads of the Bitcoin tx and both XRPL txs; payload byte-exact
  vs paper digest.
- G5 RECEIPTS: hub DropboxDrop records (BTC bind + 2 XRP hops), Universal Bridge
  receipt, Genesis Viewer registry entry (website), DCAI_DOI_INDEX mirror, forward-only
  ledger entry 0214. No client data, no PHI, keys writer-side only.

## Abort rules
- If any pull-back is not byte-exact, the run is FAIL — no partial claims.
- Fee > 1,500 sats/hop on BTC: ABORT.
