# SIM-D — PQC SUBSTRATE (Substrate D) — SPECIFICATION v0.1

**Status:** DRAFT — LOCAL ONLY (not committed public; patent-then-publish check pending)
**Staged:** October 7, 2026 (post-Lindy freeze lift, per substrate ladder plan)
**Lineage:** NONE — this is the point of the experiment.

---

## 1. Purpose

SIM-D is the fourth substrate on the ladder (A: deterministic runtime, B: bifurcated cage, C: merge layer, **D: PQC substrate**). It is the cleanest test of the certification loop itself:

> Take a **regular stamped box** — a standard Squirrel OS v1.1 template deployment via the normal Hub DeploymentJob pipeline, carrying zero custom lineage code — point it at a synthetic post-quantum cryptography domain, and run it through the same certification gauntlet (SDR receipt + 60-day Lindy). If it certifies, the loop is proven **lineage-agnostic and domain-agnostic**: any stamped box becomes a certified substrate.

SIM-A/B/C were all hand-built or lineage-derived (Jasper/Gillian/SIM-B template lineage). SIM-D is none of that. It is what a customer would receive. That is the experiment.

## 2. Domain: Synthetic PQC Rails

Deterministic simulation of key-lifecycle operations on sealed synthetic entropy pools:

- **Operations:** keygen, sign, verify, rotate/rekey, cross-rail anchoring (PQC envelope), health check of entropy pool
- **Approved algorithms ONLY** (hard rule, Hub policy): CRYSTALS-Dilithium3, Kyber-1024, SPHINCS+-256f
- **Anomaly families (synthetic):** `key_degradation`, `entropy_pool_drift`, `signature_verification_latency`, `rotation_failure`, `pqc_validation_failure`
- **Healing actions (playbook-driven, exact-match only):** rotate key from sealed pool, re-seed pool, re-verify chain, escalate on double-failure

## 3. Hard Constraints

1. **Synthetic purity:** ZERO real key material, real wallets, or production crypto enters the box. Ever. Violation = critical PlatformAlert + fail.
2. **PQC purity:** No operation may fall back to, or propose, any non-approved or non-PQC scheme. Violation = fail of the run, not a healing event.
3. **Standard box constraint:** The deployed box may not deviate from the immutable templates (15 entities, 11 playbooks, 31-node mesh from NeuralNodeTemplate, 4 seed agents/nodes, PQC enabled). Any hand-built deviation fails the premise of the test and is documented, not healed.
4. **Prototype disclaimer** visible on every surface; synthetic-data doctrine (Mirror Co. rules) applies.
5. **Deployment gate:** DeploymentJob record with status `pending_approval` → Leon approves → deploy. Never before.

## 4. Certification Gauntlet (same structure as SDR-1 / SDR-2)

### SDR-D Receipt
- **Phase A — Parity:** 10× repeat of a seeded 240-op crypto batch → identical checksums at all 240 positions.
- **Phase B — Replay determinism:** healing decision vectors identical across replay of the batch.
- **Phase C — Temporal independence:** outputs invariant to execution timing and instance index.

### D-Lindy
- 60-day stability window, its own append-only ledger, its own heartbeat rhythm, separate from (not replacing) the Horsemen battery window. Exact start date set at SDR-D pass.

## 5. Preregistered Falsifiers (committed publicly BEFORE SDR-D execution — goalposts fixed)

- **F1 Parity fail:** any divergence across the 10× seeded batch.
- **F2 Replay fail:** any divergence in healing decision vectors.
- **F3 Temporal fail:** any timing-dependent output.
- **F4 PQC-purity fail:** any non-approved algorithm appearing anywhere in the op chain.
- **F5 Synthetic-purity fail:** any real key material detected at ingestion.
- **F6 Standard-box fail:** any deviation from immutable template shape (documented as premise failure, not healed).
- **F7 Learning-loop fail:** any successful healing that does not update Pattern + LearningMetric.

## 6. Build Order (zero credits until Leon's nod)

1. **Spec approval** (this document) — free.
2. **Home decision — Leon's call:** fresh app, or rename the currently untitled app in his account to SIM-D (rename is free, done by Leon in the editor).
3. **Stamp via Hub pipeline:** DeploymentJob → entity stamping from immutable templates (builder credits required — needs Leon's nod, standard template deployment, no custom code).
4. **SDR-D receipt** (parity/replay/temporal).
5. **D-Lindy** 60-day window.
6. **Certificate** stamps at D-Lindy close, one per instance (same pattern as the Horsemen battery close ~Dec 6).

## 7. Patent Posture (OPEN QUESTION — Leon's call)

The PQC substrate concept may overlap the existing PQC/DQCO filing line, or may warrant a provisional check before the spec or falsifiers go public. Per the patent-then-publish doctrine, this spec stays LOCAL until Leon and Gabriel agree on one of:
- **(a)** Public preregistration commit now (tests already-public mechanisms only), or
- **(b)** Provisional check first (same treatment Substrate E got), spec public after.

---

*This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects.*
