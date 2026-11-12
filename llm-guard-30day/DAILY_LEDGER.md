# LLM Guard 30-Day Test — daily ledger

Append-only. One entry per day, newest last. No entry may be edited after the fact; corrections are new entries.

## T0 — 2026-11-11 (pre-window baseline)

Instrument state at filing:
- Regression suite: 11/11 pass, each case run twice with identical verdicts.
- Coverage battery: 10/10 wrong claims caught, 6/6 true statements left alone.
- Assistant-style sample, 8 statements with ground truth in context: 4 caught, 1 missed, 3 correctly passed. The miss is fabricated case law, which the grammar does not model.
- Chain: 781 rows, 0 violations, intact after repair.
- Chain fork behaviour: simultaneous double submit forks the chain, 150 ms apart does not. Single-flight is the mitigation; per-person scope accepted.
- Concurrency is out of scope by owner direction: per-person functionality, not hosted multi-tenant.

Preflight:
- Published URL: reachable, login wall, no anonymous access.
- Functions live: gateEvaluate, gateVerify, gateAudit, gateChat, llmGatePing.
- gateChat with no key: refuses, does not call the provider, message is clear.
- gateChat with a rejected key: returns the provider error, does not echo the key.
- Test traffic currently in GateRun: verification rows from tonight. Purge before grading real replies.

Window opens 2026-11-12. Graded replies: 0.

## T0b — 2026-11-11 (pre-window cleanup, after the baseline entry)

Cleared the verification corpus so the window opens on an empty ledger.
- GateRun rows before: 781. Rows deleted: 781. The delete was issued with a stated expected cardinality of 781 and the returned count matched exactly, so the write is recorded as intent-consistent rather than assumed.
- Empty-state audit after the delete: `checked 0`, `chain_intact true`, zero violations. The audit handles an empty chain without erroring.
- Genesis row: one deliberate evaluation, seq 1, prev_hash `genesis`, verdict blocked on the 12% case, recomputed 14.70%. Audit after: `checked 1`, intact, zero violations.
- Note on the mechanism: no purge backend function is deployed. The clear was done through operator tooling, not from inside the app. If the app's own maintenance control is to be the recovery path during the window, that control needs to exist and be tested before it is relied on.

Window opens 2026-11-12 with a clean chain at seq 1.
