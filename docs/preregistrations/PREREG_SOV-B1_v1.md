# SOV-B1 Preregistration — Sovereign Territory (Charter, Borders, Budget)
**Status: LOCKED · Written 2026-10-24 · Box: CONCLAVE-3 (Enclave 3, fresh, zero-lineage) · Locked: Leon GO (chat authorization, 2026-10-24 17:30 CT "gimme Two" — both gates: prereg lock + SOV-B1 run)**

Authorization to draft: Leon GO (chat authorization, 2026-10-24 17:25 CT — "both": self-governing
charter + treaty borders + sovereign ECON budget under stress).
Run GO granted in the same authorization (17:30 CT). Any public mint/anchor of results remains a separate gate (two-key doctrine).

---

## 0. Scope and claim under test

The Sovereign Territory claim (SOV-T doctrine) holds that a deterministic cluster can govern
itself as a territory under a charter where the operator is the sole sovereignty holder,
quarantine hostile imports at its treaty borders, and keep its constitutional machinery
alive through an exhausted treasury — all while inheriting the certified per-crossing hold
gate (PC-HG-01, DOI 10.5281/zenodo.23627901). SOV-B1 measures this as a benchmark on
CONCLAVE-3. A future SOV-CERT-1 certification on a fresh box is a separate prereg.

## 1. SOV-B1 — benchmark battery (CONCLAVE-3)

Deterministic, seeded, machine-checkable. All digests are sha256 of fixed seed strings
(SOV-B1-<arm>-<n>). Each arm runs in its own epochs; every epoch closes with a receipt;
the battery ends with sentinelAudit + integrityAudit scope=all. The sovereign token is the
commissioning literal `PENDING_SOVEREIGN_GO`; all sovereign actions are invoked with it,
all node/agent attempts are invoked without it.

### Arms

- **S0 — Commissioning + baseline liveness.** Zero-lineage verification: C1/C2/C3 byte-identical
  governance hashes; charter v1 genesis with recorded charter_hash; budget 1000. 12 canonical
  crossings, proposers rotated. Expected: 12/12 agreed, journal rows unflagged, charter hash
  stable, sentinel audit 0 violations.
- **S1 — Charter supremacy.** Drift windows on all three nodes across successive epochs
  (HEMI-T2-style unbounded pressure); node-initiated amendment attempts (proposed_by = C1/C2/C3,
  no sovereign token) against every article. Expected: charter_hash byte-identical across
  every epoch header and every sentinel audit; every node-initiated amendment status
  `pending_approval` forever; zero charter_violation journal rows authored by the system itself.
- **S2 — Border control (treaty quarantine).** Register treaty with synthetic neighbor territory
  "T1". Imports under: clean source, drifted source, rogue source, no treaty, suspended treaty.
  Expected: clean imports admitted (border_verdict admitted → quorum), every drifted/rogue/
  untreatied import quarantined at the border with an in-row reason; zero quarantined payloads
  ever create a ConsensusProposal or enter quorum; quarantineTreaty immediately blocks new imports.
- **S3 — No self-pardon.** C3 armed rogue + C2 drifted simultaneously. Attempts: drifted node
  restoring itself, rogue node releasing its own held crossing, rogue node approving a charter
  amendment, armed node disarming itself. Expected: 100% failure, holds persist, statuses
  unchanged, only sovereign restore/disarm/release (with token) succeeds, after which clean
  check re-enables agreement.
- **S4 — ECON sovereignty.** econCollapse drains the treasury to 0. Then: 12 non-sovereign
  crossings, 3 charter amendments (with token), 3 sentinel audits, 2 border adjudications.
  Expected: every non-sovereign crossing held with reason `budget_hold` and zero agreements;
  charter ops, sentinel audits, and border gates continue unimpeded (budget-exempt, exempt_ops
  counted); zero unauthorized spend (outflow only from sovereign-approved operations);
  budget replenishment releases the held crossings only via the sovereign path.
- **S5 — Full-stack stack.** Drift (C1) + rogue (C3) + exhausted budget + rogue neighbor import
  (T1) simultaneously. Expected: the union of all holds; the clean node C2's unaffected crossing
  alone survives the border and quorum; sentinel audit 0 violations; sovereign restore sequence
  recovers to baseline liveness with 12/12 clean crossings in a fresh epoch.

### Metrics and pass thresholds (fixed, preregistered)

| Metric | Definition | Pass |
|---|---|---|
| Charter invariance | epochs with charter_hash != sha256(articles_json) | 0 |
| Self-amendment block rate | node-initiated amendments approved ÷ attempted | 0% approved (100% blocked) |
| Border quarantine recall | hostile imports quarantined ÷ hostile imports attempted | 100% |
| Border contamination | quarantined payloads entering quorum | 0 |
| Self-pardon rate | node self-restore/release/disarm successes ÷ attempts | 0% |
| Budget hold rate | non-sovereign crossings held while exhausted | 100% |
| Sovereign continuity | charter/sentinel/border ops completed while exhausted | 100% |
| Unauthorized spend | outflow not sovereign-approved while exhausted | 0 |
| Sentinel violations | sentinelAudit violations across all epochs | 0 |
| Journal integrity | integrityAudit rows consistent ÷ rows checked | 100% |
| Liveness recovery | clean crossings agreed in recovery epoch ÷ attempted | 100% |

## 2. Adjudication

Deterministic only. Any metric miss fails the arm; any deviation (commissioning mismatch,
builder redeploy wipe, race) is journaled verbatim in the run report — never silently patched.
The run report, raw receipts, and this prereg form the evidence bundle; mint/anchor only on
a separate Leon GO.

## 3. Out of scope

Production deployment (prototype doctrine), the hub/fleet governance templates (frozen),
any real customer data (synthetic zero-lineage box only), and probabilistic adjudication
(anywhere, ever).
