# LLM Guard 30-Day Test — Preregistration v1.0

Filed: 2026-11-11 (America/Chicago). Frozen before the first graded reply.
Window: 2026-11-12 through 2026-12-11 inclusive (30 days).
Target of test: the published app `https://llm-guard-b3d73f71.base44.app`, backend `6af4f91500f74ce4b3d73f71`.

> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.

## 1. What is being claimed, and what is not

Claim under test: a deterministic gate can refuse provably false statements produced by a language model, show the recomputation that proves them false, and leave every true statement alone.

Not claimed: that a pass means the statement is true. A pass means the gate found nothing it could prove wrong. Coverage is bounded by the gate's grammar, and this test measures the boundary rather than assuming it away.

## 2. Instrument under test

Five deployed functions in the app: `gateEvaluate`, `gateVerify`, `gateAudit`, `gateChat`, and `llmGatePing`.
Checks exercised: exact rational percentage recomputation with stated precision, reduction and increase arithmetic, eight-axis unit-vector conflicts, citation shape absent from supplied context, cross-subject-safe contradiction, composition shares exceeding a whole, numeric comparison against a supplied ground-truth context.

Instrument state at filing, measured tonight, same day as this document: 11 of 11 regression cases pass twice identically; 10 of 10 deliberately wrong claims caught; 6 of 6 true statements refused none; receipt chain intact at 781 rows after repair.

## 3. Subjects

Per-person use, one evaluation at a time. Each tester brings their own model account or pastes a model's reply. No key is stored by the app; the key lives in the browser tab for the duration of the session. Testers are named to the owner, not to this document; no third-party personal data is recorded here.

## 4. Metrics, fixed in advance

M1 False refusals. A true statement the gate blocked. Counted per graded reply. This is the trust metric and it is weighted above every other number in this test.

M2 Proven-wrong catches. Statements refused where the recomputation is correct and the original claim was false. Each catch is checked by hand against the arithmetic before it counts.

M3 Misses. Statements a human judge calls false that the gate passed. Each miss is recorded verbatim with the rule class it belongs to, and becomes a coverage backlog item. Misses are expected and are the main output of the test.

M4 Instrument health. Daily: regression suite, coverage battery, chain audit. Green means 11/11, 10/10 with 6/6, and zero chain violations.

M5 Receipt integrity. At close: `gateAudit` clean over the full row set, plus a spot verification of 20 runs through `gateVerify` including one deliberately tampered row to prove the check can fail.

## 5. Decision rule, set before the data exists

The test passes only if all four hold:

1. M1 is zero across all graded replies.
2. M4 is green on at least 27 of the 30 days.
3. M5 is clean at close.
4. At least 20 distinct rule classes appear in the M3 miss log, each with a verbatim example.

Anything else is a failed test, and the failure names the clause. A failed test is the useful outcome if it burns the instrument to the ground first, because that is what the miss log is for. It is forbidden after the fact to move M1 to a percentage threshold, to exclude a refusal as "edge case", or to describe the gate as verified on the strength of a clean M4.

## 6. Stopping rules

- Normal stop: 2026-12-11 23:59 CT, or 200 graded replies, whichever comes first.
- Early halt: three false refusals within one calendar day. The instrument is considered broken, the test halts, a critical PlatformAlert is raised, and no further replies are graded until the fault is fixed and the fix is proven in both directions.
- Any halt is recorded in the daily ledger with the clause that triggered it.

## 7. Independence honesty

Single operator. The same person wrote the gate, wrote the test cases, and judges the misses. Construct validity is therefore limited: the test proves internal consistency and refusal behaviour, and it cannot prove that the rule set anticipates claims nobody thought of. Receipts are signed by one key held by one person, so a 2-of-3 statement here would certify agreement between three labels, not three principals.

## 8. Preflight findings, recorded at filing

- The published URL resolves to a login wall. Every tester needs a Base44 account with access before they can open the app. This is recorded as a known friction point, not a defect, and it caps the tester set at people the owner invites.
- The harness fails closed without a key, with a plain explanation and no call to the provider.
- A rejected provider key returns the provider's own error and does not echo the key back to the page.
- Reduction arithmetic ("40% off a 10 minute upload, so 4 minutes") was missed by the instrument earlier tonight and is now caught, recomputing 6 minutes. Fabricated case law is still not caught, because a court case is not a citation shape the grammar recognises. That miss is expected to appear in the miss log.

## 9. Publication

Append-only from filing. Any amendment is a new version that states what changed and why, and the superseded text stays in the record.
