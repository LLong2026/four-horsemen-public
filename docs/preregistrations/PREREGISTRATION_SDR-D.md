# PREREGISTRATION — SDR-D (Substrate Determinism Receipt, Substrate D)

**Commit date:** October 7, 2026 (committed BEFORE the public rerun recorded in the SDR-D receipt)
**Substrate under test:** SIM-D — a standard Squirrel OS v1.1 stamped box (15 entities, 11 canonical playbooks, 31-node neural mesh at template weights, 4 seed agents) with ZERO lineage code, deployed on the PQC rails (CRYSTALS-Dilithium3, Kyber-1024, SPHINCS+-256f only)
**Patent posture:** methodology covered by the filed deterministic-governance line (64/119,191) and PQC/DQCO filings; governance layer per DCAI (64/157,915). No new mechanism claimed.

## Registered Parameters (frozen before public rerun)
- **Seed:** `SIMD-SDRD-20261007-SEED-0001`
- **Batch:** 240 synthetic PQC operations (keygen/sign/verify/rotate/anchor) across 8 sealed synthetic rails
- **Algorithm set:** CRYSTALS-Dilithium3, Kyber-1024, SPHINCS+-256f (approved set only, all positions)
- **Phases:** A parity (10× repeat), B replay determinism (seeded anomaly stream through the substrate's own anomaly-response, 2 identical submissions), C temporal independence (reruns with varying instance index and timing separation)
- **Harness:** `sdrd_harness.py` in this folder — the full instrument is public; any party may replay

## Registered Prediction
A private pre-flight run (Oct 7, 2026, before this commit) produced canonical stream checksum:

**`9337c4fc7785b91d6a2ffcb00bb72a66bef37141308515d69c715278f0d2df3e`**

**The public rerun must converge on this exact checksum at all 240 positions, all phases.** Any divergence falsifies the substrate claim.

## Registered Falsifiers
- **F1 Parity fail:** any of the 10 parity runs differing at any position
- **F2 Replay fail:** any decision tuple (anomaly_type, playbook, steps, status) differing between identical submissions
- **F3 Temporal fail:** any timing- or instance-index-dependent output
- **F4 PQC purity fail:** any non-approved algorithm appearing at any position
- **F5 Synthetic purity fail:** any real key material or production crypto entering the box
- **F6 Exact-match fail:** any fuzzy (non-exact) playbook match on anomaly type

## Disclosed Pre-Flight Note (audit-and-correction doctrine)
The pre-flight run itself recorded one honest defect: the harness initially leaked the instance index into the hash derivation chain (Phase C fail). The defect was fixed, the derivation corrected (v2, canonical), all phases rerun clean. The pre-flight failure is preserved in the receipt deliberately — the gauntlet detects non-determinism wherever it lives, including the measurement instrument.

*This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects. All SIM-D data is synthetic.*
