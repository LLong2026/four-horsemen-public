# Dogfooding the Cage: A Meta-Receipt of Bifurcated Governance Applied to Its Own Production

**Leon Calvin Long II — SQUIRL OS Technologies, LLC**
*Companion piece (non-research). Drafted by Gabriel, the probabilistic agent whose drift it documents. Approved for publication by Leon, the deterministic key.*

---

> **SQUIRL OS RESEARCH DISCLOSURE — READ FIRST**
>
> This is part of an open-book, AI-assisted research program published under an audit-and-correction doctrine. This piece is a **fun companion artifact**, not a research paper; its evidentiary value comes exclusively from the receipts it cites (public ledger commits, DOI version histories, Zenodo logs), all of which are independently verifiable. Errors are corrected only through disclosed, versioned amendments; originals are preserved. Audit ledger: github.com/LLong2026/squirrel-os-lindy-test.
>
> *This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments.*

---

## 1. The Punchline First

SQUIRL OS's core thesis is that probabilistic agents should be governed by a deterministic boundary that validates their outputs against ground truth — the cage. The papers describing this thesis (patent specifications 64/119,191, 64/145,825, 64/114,746, 64/157,915; the Governed Manifold Specification; the Caging Theorem) were themselves **produced inside that exact governance**, by a two-key system:

- **The deterministic key** — Leon, who owns intent, scope, and every approval.
- **The probabilistic key** — Gabriel, an LLM agent, who drafts, proposes, and executes — and occasionally drifts.

The cage was not built after the papers. The papers grew up inside it. Every drift the probabilistic key produced either died at a gate or became a disclosed, receipted correction. That is the dogfood receipt: **the thesis's own production run is a longitudinal test of the thesis.**

We do not claim this as a controlled experiment. We claim it as something rarer and more honest: a paper about catching AI drift, with its own caught-and-corrected drift in the append-only record.

## 2. Specimen 1 — The Misfire That Never Landed (Oct 5, 2026)

**The setup:** A lineage amendment (naming the information-theory ladder Nyquist 1924 → Hartley 1928 → Shannon 1948 → Kolmogorov 1965) was to be added to the Kolmogorov-Shannon Bridge primer record.

**The drift:** The probabilistic key aimed the metadata edit at the wrong Zenodo record — verified from memory of a session, not from the API. Classic LLM drift: plausible, confident, wrong.

**The gate:** The standing rule — *verify the record title AND ID from the API before every metadata edit* — was in force from an earlier lesson. The edit landed, was discovered same-day, and was disclosed immediately in the public append-only ledger (commit `3380865`), then re-applied to the correct record after API verification.

**The receipt:** Ledger commit `3380865` (disclosed misfire + correction). The amendment now lives on the correct record, DOI 10.5281/zenodo.22864620.

**What the cage did:** turned a hallucinated record ID into a permanent, timestamped specimen of drift-caught-at-the-gate.

## 3. Specimen 2 — The Curation Veto (Oct 5, 2026)

**The setup:** The DCAI Zenodo community (zenodo.org/communities/dcai) was curated as a tight thesis shelf: four core AI patent specs, the Governed Manifold Specification, and two operational receipts (N10-ACK, Sovereign Briefing) — seven records, one story.

**The proposal:** Seven additional high-traffic records were floated for inclusion — including the three most-downloaded records in the library (235, 210, and 136 downloads).

**The veto:** The deterministic key's standing scope rule ("the shelf shows the thesis, not the whole library") was applied by the probabilistic key against the probabilistic key's own earlier enthusiasm: three candidates were rejected as off-thesis (crypto-migration canon, broad DSOS archive, multi-rail settlement material). One candidate's own title contained the material class the scope rule explicitly excludes. The shelf held at seven.

**The receipt:** Ledger commit `a7a210a` (community roster expansion + the veto rationale). Zenodo inclusion-request logs for all accepted records.

**What the cage did:** prevented archive-dump dilution of a curated shelf — and demonstrated the asymmetry: the proposer of good ideas is also the enforcer of the rule that says no.

## 4. Specimen 3 — Three Papers That Grew Through the Cage

The corpus's three flagship papers each carry public, versioned evidence of drift caught and corrected:

- **Algebraic Collapse of Neural Computation** (DOI 10.5281/zenodo.23067855): the v1.0 draft contained **six theorem defects** caught in audit — including a false finite-generation claim and an unproven corollary that contradicted its own Theorem 1(iii). The corrected result became the **Caging Theorem**, published as Amendment Edition v1.1 with v1.0 preserved in the DOI version history. The paper's most famous result is the correction.
- **RDC-1** (published Sept 30, 2026, Lindy repo commit `534be77`): internal draft statuses were corrected to match evidence before the public edition shipped — "statuses corrected to match evidence" is the receipt-first doctrine in one sentence.
- **Governed Manifold Specification** (DOI 10.5281/zenodo.23132046): published in an Amendment Edition after disclosed audit and reconciliation to the actually-deployed Constitution rather than an idealized one.

**What the cage did:** made the amendments the evidence. A correction you can click is worth more than a flaw you must trust was never there.

## 5. Specimen 4 — The Claim That Must Never Be Repeated

The corpus carries a standing example of drift at the **claim** level: an early narrative asserted a large live financial settlement that **never occurred**. The correction doctrine is absolute: the claim must never appear in any artifact, every publication runs a sweep for it, and any $250K figure may only ever appear labeled as SIMULATED. The sweep protocol itself is receipted in the ledger.

**What the cage did:** converted the most tempting kind of drift — a flattering claim — into a permanent negative test case that every future artifact must pass.

## 6. Specimen 5 — The Night the Human-in-the-Loop Gate Held (Oct 4, 2026)

During the N10 chaos cycle, a synthetic critical-severity cryptographic anomaly (PQC keyring desync, confidence 0.91) hit a fintech-class flow. Per the operating rules, no auto-heal executed; the anomaly waited, escalated, for the deterministic key's acknowledgment — which was given in chat, then receipted. The full lifecycle (detection → constitutional check → hold → human ACK → resolution → audit log) was published as the **N10-ACK** paper (DOI 10.5281/zenodo.23151356) and companion **Sovereign Briefing** (DOI 10.5281/zenodo.23152634).

**What the cage did:** on the one night it would have been easiest to let the probabilistic layer "fix" a critical financial flow alone, it held until the human turned the second key. That receipt is now citable evidence that the governance works under real alert conditions — on simulated rails, which is precisely the point of the simulation doctrine.

## 7. The Honest Limitations

This piece is fun, and it says so. To keep it honest:

1. **N = 1 probabilistic agent.** One LLM, one operator, one chat-mediated governance loop. No statistics.
2. **The cage here is procedural** — verify-first rules, two-key approvals, append-only ledgers, publication sweeps — not a runtime enforcement engine. The runtime version of the cage is what the patent corpus describes and what the 60-day battery will measure.
3. **The operator is also the author of the rules.** The deterministic key both wrote the constraints and benefits from their story. The mitigation is the append-only public ledger: any reader can check whether the receipts match the claims, which is the only defense that matters.
4. **Success here is survivorship-shaped.** We document the drift that was caught. The ledger cannot show the drift that never surfaced. The battery's falsifier-first preregistrations exist precisely to fix that class of problem.

## 8. The Thesis Quote

> "The irony is beautiful — the tools everyone trusts blindly become the proof that nothing should be trusted blindly."

That is the canon quote of the Cage Thesis (Lindy repo README, commit `8a4862b`), and this piece is its most literal demonstration: the tool everyone trusts blindly (an LLM agent) drafted this very document — inside the boundary that says trust it blindly, never.

## 9. Closing

The papers describe a cage. The production of the papers was run inside one. The drift was real, caught, disclosed, and turned into evidence. The corpus that argues "govern probabilistic agents with deterministic boundaries" was, cell by cell, built exactly that way.

We build, we share, we move forward — and we leave the receipts where anyone can check them.

---

*Leon Calvin Long II, SQUIRL OS — Self-Healing AI Infrastructure*
*github.com/LLong2026 · x.com/leonlongITC1 · zenodo.org/communities/dcai*
