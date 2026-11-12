# PREREG — PWR-1 (The Penta-Write Receipt)

**Frozen:** 2026-10-19, pre-broadcast. **Authorization:** Leon GO (chat authorization,
2026-10-19 ~10:44 CT — "ethereum sent"; rail funding and five-rail inscription directed
~10:34-10:42 CT same morning).

**Riding digest (sha256, THE_PWR-1_SPEC.md v1.0):** e464589cecdcc2d8921c759fdafb3ec93fe0916a67a0fc50b38f636fa2f49ffa

**Inaugural artifact:** the PWR-1 class definition itself (self-referential precedent: QWR-2).

## Legs (all zero-movement inscriptions per spec §2)
1. BTC: spend utxo 1b559ee0...:1 (81,300 sats, itself unconfirmed child of XCF-1 return —
   disclosed; parent and child confirm as a chain) → OP_RETURN (SQDR+0x03+digest) + change
   80,600 to A, fee 700 sats.
2. XRP: AccountSet from XRP-A, seq 107745084 (post-XCF), fee 10 drops, memo SQDR-PWR-1 + digest.
3. STELLAR: ManageData from STELLAR-A (seq next), name "PWR-1", value = 32-byte digest,
   fee 100 stroops (+ 0.5 XLM data-entry reserve, retained).
4. CARDANO: self-transfer A→A spending both A utxos (df898b21:1 = 26,740,925 and
   6bc76d6d:0 = 48,500,000), output 75,069,925 back to A, fee 171,000, metadata 1968
   {PWR: PWR-1, RAIL: 5, DIGEST}.
5. ETH: self-addressed value-0 transaction from ETH-A (nonce 0), calldata
   SQDR+0x03+digest, EIP-155 legacy, gasPrice 0.4 gwei, gas 30,000.

## Gates
G1 prereg committed pre-broadcast — G2 offline build+sign all five — G3 back-to-back
broadcast — G4 keyless read-backs byte-exact ×5 — G5 ledger+receipts sealed. Identifiers
of record computed at build; ETH tx hash known only post-broadcast (declared).

## Cost ceiling
700 sats + 10 drops + 100 stroops + 171,000 lovelace + ~12,000 gwei (~$0.01).

MEASURED (scoped): deterministic gates only, no LLM in any decision path (program benchmark
DOI 10.5281/zenodo.23321637). No production, customer, or personal data (POL-DISC-001).
Prototype disclaimer applies.
