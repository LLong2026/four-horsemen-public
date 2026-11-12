# SDR-D — Substrate Determinism Receipt (SIM-D / PQC Substrate)

**Date:** October 7, 2026
**Substrate:** SIM-D — "Sim D - DCAI" (Base44 app 6ac65b48c0978d9013fb11ed), a standard Squirrel OS v1.1 stamped box with zero lineage code
**Status:** ✅ **PASS — all three phases**
**Canonical stream checksum:** `9337c4fc7785b91d6a2ffcb00bb72a66bef37141308515d69c715278f0d2df3e`
**Visibility:** LOCAL ONLY — public preregistration/DOI pending the patent-then-publish call (two-key check)

---

## Receipt

**Seed:** `SIMD-SDRD-20261007-SEED-0001` | **Batch:** 240 synthetic PQC ops (keygen / sign / verify / rotate / anchor) across 8 sealed synthetic rails | **Algorithms:** CRYSTALS-Dilithium3, Kyber-1024, SPHINCS+-256f only (approved set; zero non-PQC fallback)

### Phase A — Parity (10×)
Ten repeat executions of the seeded 240-op batch produced **identical checksums at all 240 positions**, all ten runs converging on `9337c4fc…33ef0`. PASS.

### Phase B — Replay Determinism (box decision machinery)
A deterministic anomaly subset (positions 000/040/080/120/160/200) was submitted twice through SIM-D's own `anomaly-response` backend function with byte-identical payloads:

| Position | Anomaly type | Playbook (exact match) | Steps | Result |
|---|---|---|---|---|
| 000 | token_overrun | PB-004 Token Overrun Optimizer | 3 | healed |
| 040 | latency_spike | PB-003 Latency Spike Resolver | 2 | healed |
| 080 | heartbeat_miss | PB-008 Heartbeat Re-igniter | 2 | healed |
| 120 | heartbeat_miss | PB-008 Heartbeat Re-igniter | 2 | healed |
| 160 | crypto_key_stale | PB-010 Crypto Key Rotator | 3 | healed |
| 200 | token_overrun | PB-004 Token Overrun Optimizer | 3 | healed |

**Decision tuples (anomaly_type, playbook, steps_executed, status) were identical across both runs — 6/6.** Every match was exact-type (no fuzzy matching); every healing was logged as AegisAnomaly + AegisHealingEvent in the box's own ledger. PASS.

### Phase C — Temporal Independence
Three reruns with varying instance index and deliberate timing separation produced the same checksum `9337c4fc…33ef0` as Phase A. PASS.

### Harness Integrity Note (honest receipt)
Phase C initially FAILED — the falsifier caught a defect **in the harness itself**: the instance index leaked into the hash derivation chain while being labeled as metadata-only. The defect was fixed (index removed from derivation) and all phases rerun clean. This failure-and-fix is recorded deliberately: the gauntlet detects non-determinism wherever it lives, including the measurement instrument. The corrected derivation (v2) is canonical; the Phase B payload set was derived pre-fix (v1 chain, index 0) and is recorded verbatim in `sdrd_phase_b.json` — the replay test is valid independently since its inputs are fixed recorded strings.

## Constraints Verified
- **Synthetic purity:** zero real key material, real wallets, or production crypto entered the box at any point
- **PQC purity:** approved algorithms only, at every position of every run
- **Standard box:** lineage tables empty (verified post-stamp), 15 standard entities, 11 canonical playbooks, 31-node mesh at template weights, 4 seed agents — zero custom lineage code active
- **Learning loop:** every healing wrote AegisHealingEvent records into the box ledger (synthetic-flagged)

## What This Means
SIM-D was a regular stamped box — standard template, no lineage, no hand-built code. It passed the same gauntlet that certified the deterministic runtime (SDR-1) and the bifurcated cage (SIM-B parity). Three substrates, three origins, one verdict. **The certification loop manufactures substrates.**

**Next:** D-Lindy 60-day stability window (start date TBD; SIM-D joins the nightly chaos cycle only after this receipt is publicly preregistered per the patent-then-publish doctrine).

---

*This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects.*

---

## PUBLIC RERUN (Oct 7, 2026, after preregistration commit 1c20748)

The preregistration (seed, falsifiers, predicted checksum `9337c4fc…`) was committed publicly BEFORE this rerun. The fresh execution converged exactly:

- **Phase A:** 10/10 runs → `9337c4fc7785b91d6a2ffcb00bb72a66bef37141308515d69c715278f0d2df3e` (identical to prediction)
- **Phase B:** third independent submission round through the substrate's own anomaly-response — identical decision tuples 6/6 (PB-004×2, PB-003, PB-008×2, PB-010), all healed, all logged in-box
- **Phase C:** 3/3 temporal runs → identical to prediction

**Claim: the substrate was run blind twice — once privately, once publicly under preregistration — and converged on the same checksum both times.** All six falsifiers held (F1–F6). SDR-D is the third substrate certification (A: deterministic runtime SDR-1; B: bifurcated cage parity; D: standard stamped box on PQC rails) and the first executed under public preregistration with a committed prediction.
