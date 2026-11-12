# PREREG FT-1 — FRACTAL CLAIM: A SATOSHI-NATIVE DID (Fractal Tokenization, part 1)

Frozen BEFORE execution (see scope stamp). Program: SQUIRL OS receipts-first doctrine.
Two-key: vetted Gabriel, owner GO (Leon, chat authorization 2026-10-20 ~13:55 CT).

## Claim (scoped)
A decentralized identifier whose subject is ONE SPECIFIC SATOSHI can be established
by tweaking the hash of a DID document into the taproot output key of an output whose
ordinal position-0 sat is the claimed fraction, with cross-rail attestation on XRP
(anchor of record) and Stellar (transport). The sat is the fraction; the DID is what
the fraction speaks for; the carrier publishes the binding at stroop prices.

## Prior art disclosed (honest)
- did:btcr and other Bitcoin-anchored DID methods exist (circa 2019+). NOT claimed:
  first DID on Bitcoin, first DID method, first taproot DID.
- Ordinals theory (position-based sat tracking inside spendable outputs) is known.
What IS claimed under this program's receipts: the FT-1 construction below as a
scoped, deterministic, receipts-first ceremony binding (a) fractal atomic ownership
doctrine, (b) covenant-tweaked DID core, (c) dual-rail carrier attestation — all
keylessly verifiable, ~$0.0000X in rail fees + one BTC tx fee.

## Construction (frozen)
1. FRESH WALLETS (verification methods), keys gitignored, never exposed:
   - BTC: new BIP340 keypair (sat_c) — internal secret sk_c, pubkey P_c.
   - XRP: fresh seed wallet (classic address).
   - XLM: fresh secret wallet (StrKey).
2. DID CORE (outpoint-free, deterministic JSON, sorted keys):
   {"doctrine":"SQUIRL-IP-013","fractal_claim":"one satoshi, ordinal position 0 of
   the FT-1 covenant output","keys":{btc:P_c, xrp:X, xlm:G},"method":"did:sqdr",
   "version":1} -> DID_CORE_DIGEST = SHA256(json).
3. BTC LEG: spend ONLY the SAT-2 tank UTXO 1f6d4b53:1 (4000 sats, plain SAT-A key).
   Outputs: (0) covenant 330 sats -> P_c tweaked with DID_CORE_DIGEST (taproot tweak,
   BIP340/341 pure-Python proven in SAT-1/2); (1) tank change -> SAT-A plain key.
   Fee ~1000 sats. The epoch covenant sat 1f6d4b53:0 is NOT an input (untouched).
   The claimed sat = ordinal position 0 of output 0.
4. DID identifier (post-confirmation, keyless): did:sqdr:<SHA256(outpoint_internal ||
   P_c)[:40]> — derived from public chain data + declared pubkey only.
5. CARRIER LEGS: envelope SQDR + 0x0A (NEW version byte: DID carrier) + DID_CORE_DIGEST,
   XRP AccountSet memo (tag SQDR-FT-1) + XLM manage_data (tag SQDR-FT-1).
6. GATES:
   - G0: tank UTXO unspent at build time; epoch covenant output untouched after tx.
   - G1: DID core digest recomputes from the public DID document + public keys.
   - G2: tweak recomputes: Q_c = P_c + lift_x(H(P_c||DID_CORE_DIGEST))*G byte-matches
     the on-chain scriptPubKey.
   - G3: XRP validated memo byte-exact; XLM data entry byte-exact.
   - G4: no key material in any receipt, log, or artifact.

## Intended artifacts
FT-1 runlog + ledger entry; "Fractal Tokenization" paper draft (citing SQUIRL-IP-013
DOI 10.5281/zenodo.23491295, thesis v2.1 DOI 10.5281/zenodo.23482978), staged for
Zenodo on Leon's publish GO (two-key).
