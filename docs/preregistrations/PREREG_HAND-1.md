# PREREG HAND-1 — THE HANDOVER RING: GLOBAL FRACTION OWNERSHIP TRANSFER AND RETURN

Frozen BEFORE execution (stamp 2026-10-20T19:51:18Z, tip block hash
0000000000000000000113b7ba3cd957ab72896bd2cb04e14358ff8104a719cc).
Two-key: vetted Gabriel, owner GO (Leon, chat authorization 2026-10-20 ~14:50 CT).

## Claim (scoped)
Authority over a covenant fraction can be transferred hand-to-hand across every
owner wallet in the ring (BTC-native key changes, each a real on-chain ownership
change), visibly attested hand-to-hand on XRP and Stellar through the owner's
wallets, and RETURNED to the original owner — with the epoch merkle root updated
and committed at the moment of return. The fraction itself never leaves Bitcoin.

## Prior art disclosed
- Bitcoin key-spend transfers are ordinary UTXO spends; Ordinals track ownership
  by sat position. Payment relays on XRP/XLM are ordinary payments with memos.
NOT claimed: first transfer, first relay. Claimed (scoped): the handover-ring
ceremony — covenant authority chain + dual-rail relay + root-committed return —
as one deterministic, receipts-first, keyless-verifiable answer to "how does a
fraction change hands and come back?"

## Construction (frozen)
1. MMR RE-FOLD of the corpus (MCR/SAT-2 machinery, leaf 0x00||SHA256(file),
   node 0x01||l||r, bag right-to-left, root 0x03||bag||count_u64LE) -> NEW_ROOT.
2. HANDOVER_RECORD (deterministic JSON): ring order, purpose, NEW_ROOT, tip
   block hash -> HANDOVER_DIGEST = SHA256(json).
3. BTC AUTHORITY CHAIN (real ownership changes; each hop re-commits the SAME
   HANDOVER_DIGEST under the NEXT owner's key; key-path taproot, proven SAT-1
   machinery + BIP143 P2WPKH for the funding spend):
   - H0 (fund): segwit writer bc1qf4zs... -> 2670 sats to tweak(P_satA, D)
   - H1: SAT-A hands to SAT-B: output tweak(P_satB, D)
   - H2: SAT-B hands to SAT-C (FT-1 DID wallet): output tweak(P_satC, D)
   - H3 (RETURN): SAT-C hands back to SAT-A: output tweak(P_satA, D)
   The chain may broadcast unconfirmed in sequence and confirm together; each
   txid feeds the next. Total fees ~3,000 sats.
4. XRP HANDOVER RELAY: writer A -> 1 XRP -> DID wallet r9p4qq... (memo SQDR-HAND-1
   || composite), DID wallet -> back to writer A (memo SQDR-HAND-1R).
5. XLM HANDOVER RELAY: writer A -> 0.1 XLM -> DID wallet GDDMXP..., -> back.
6. EPOCH ROOT ANCHOR: NEW_ROOT on XRP + XLM (envelope 0x07 corpus root, tag
   SQDR-HAND-1-ROOT), plus the composite (SHA256(HANDOVER_DIGEST||final outpoint))
   carrier legs tag SQDR-HAND-1 (envelope 0x08 covenant carrier).
7. GATES: G0 epoch/FT-1/FL-1 covenants untouched; G1 NEW_ROOT reproduces from
   public corpus; G2 every hop spk byte-matches its announced tweak; G3 all
   relay/anchor legs byte-exact read-back; G4 no key material in artifacts.

## Intended artifacts
HAND-1 runlog; ledger 0282; route recipe routes/HAND1_HANDOVER_RING_ROUTE.md.
This IS the standing demo answer for "how do you transfer a fraction and get
it back?" — deterministic, replayable, under $3.
