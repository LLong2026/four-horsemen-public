All three processes are now adversarially receipted.

An agentic AI system does three things: an engine PROPOSES an action, a gate
DECIDES if it executes, and a mesh LEARNS from the outcome. We just finished
red-teaming all three — with published, chain-anchored receipts for each.

1) DECIDE — the DOORS series. Production-reach red-team of every deterministic
action gate: 8/8 seats in DOORS-1, zero true bypasses. DOORS-2, the clustered
door (two adjudication nodes, one shared approval registry): cache skew →
fail-closed; stale revocation → enforced; cross-node duplicate →
exactly-once. Honest part: the first run FAILED — failing log preserved
byte-exact in the bundle, harness fixed, re-run 5/5 with 4/4 pre-stated
falsifiers clean. Anchored on Bitcoin (blocks 972862/972863), Stellar, XRP.

2) LEARN — the SBR series. Seven published adversarial exams of the
bounded-learning mesh, starting with SBR-1: a seeded-random draw (seed
committed before the draw) hit the brain with band-evasion lookalikes, a live
roster-override attack, planted PHI/PII payloads — 6/6 held, zero leakage,
100/100 lineage clean. Later exams attacked it hot (weights mid-epoch),
adaptive, and slow-drip: no structural gradient exists.

3) PROPOSE — the Dual Mesh Benchmark. Eleven engine columns on the frozen
20-instance corpus, including tonight's frontier legs: Claude Opus 5.5 and
GPT-6.1 Sol, each 20/20 on decision-tuple correctness, zero normalization
needed. The deterministic mesh's in-memory lookup: 0.0004 ms. Engines propose
correctly at seconds-scale; the mesh adjudicates at microseconds.

That's the whole loop, closed under fire: propose, decide, learn.

Receipts:
• DOORS-1: doi.org/10.5281/zenodo.23607572
• DOORS-2: doi.org/10.5281/zenodo.23608157
• SBR-1: doi.org/10.5281/zenodo.23331224
• DMB matrix: doi.org/10.5281/zenodo.23321637
• DMB frontier leg: doi.org/10.5281/zenodo.23609232
• DMB frontier leg (tonight): doi.org/10.5281/zenodo.23609232
• DMB frontier leg: doi.org/10.5281/zenodo.23609232
• Everything: squirl-vault-core.base44.app

Scope, plainly: demonstrated under the tested conditions — single/two-node
adjudication, seeded probe draws, sampled engine baselines. No universal
containment or certification claim.

This software is a prototype, provided for educational and research purposes
only. Not for production use, commercial deployment, or safety-critical
environments.

#AIgovernance #DeterministicAI #LLMSecurity #AIAgents
