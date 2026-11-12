# PREREG — CAR-1: THE COVENANT CARRIER (provisional-receipt arm)

Frozen before broadcast: 2026-10-20 ~17:05Z (12:05 CT). Leon GO (chat authorization,
2026-10-20 ~12:01 CT): "set that up. that is the lock right there."

## What this is
The satoshi itself never leaves Bitcoin. Its IDENTITY travels: a 32-byte composite
digest of (covenant outpoint || current MMR root) carried on the cheap fast rails as a
keylessly-checkable pointer. BTC stays the final truth; XLM/XRP give a ~4-second
provisional receipt at stroop prices.

## Construction (frozen)
- Covenant sat (SAT-2 state): outpoint 1f6d4b53b386cddc9d47890f2738673246166379b6a19102b2f344f4371be19c:0 — 330 sats, parked at SAT-A, taproot key tweaked with MMR-2 root (block 972280).
- Root committed: 267f13b0088c2bb82addf7358e4c50cf7c1e1fc7023be00e1194149bb56f34bf (1,920-leaf corpus, commit 03214b5).
- COMPOSITE DIGEST = SHA256( outpoint_internal_serialization(36B) || root(32B) )
  outpoint_internal = txid reversed (32B) + vout LE (4B)
  digest = 1ff3cea6f83d0900d47b49bdf3b232aef1148b17740972d3a708fb0bda9d337b
- ENVELOPE (payload doctrine, Section 2.5 Thesis v2.1): SQDR + version byte 0x08 (NEW,
  registered here: covenant carrier — sat identity digest) + 32-byte digest = 37 bytes.
  payload_hex = 53514452081ff3cea6f83d0900d47b49bdf3b232aef1148b17740972d3a708fb0bda9d337b

## Legs
1. XLM (primary transport): manage_data on the program Stellar writer (GDIQGG...VLT5),
   data_name "SQDR-CAR-1", data_value = 37-byte envelope. Expected cost 100 stroops.
2. XRP (anchor rail of record): AccountSet memo, memo_type "SQDR-CAR-1",
   memo_data = payload hex. Expected cost 10 drops.

## Verification (keyless, all steps reproducible from public data)
G0: BTC tx 1f6d4b53... confirmed; output 0 = 330 sats to tweaked key
    Q_x = 38ed58ed8e81e59801378f42117e66481db649602ec0cc533ff96dc19dbb16ed
    (recompute taptweak from published SAT-A pubkey + root).
G1: digest recomputation from public outpoint + public root byte-exact matches
    both rail entries.
G2: read-back byte-exact on both rails; XRP validated ledger index recorded.
G3: any future covenant move (new outpoint/root) renders this pointer stale BY DESIGN —
    the tamper watch (covenant_utxo_tamper_watch, pending Leon ACK) re-arms the carrier
    on every SAT ceremony. THE POINTER IS A CLAIM; THE CHAIN IS THE TRUTH.

## Claim discipline
No "transport of a satoshi off Bitcoin" claim anywhere — attestation rail language
only ("the sat never leaves Bitcoin; its proof travels"). Prototype disclaimer applies.
Scope stamp: sat_carrier_arm_1_20261020 (RateLimitLog, stamped 17:03Z before execution).
