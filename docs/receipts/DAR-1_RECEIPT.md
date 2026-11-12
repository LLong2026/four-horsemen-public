# DAR-1 — Deterministic Algebra Reducer v1.0 — Build Receipt

**Date:** 2026-10-08 (built 10:11–10:20 CT)
**Built by:** Gabriel (Squirl OS Hub) under the wheel, at Leon's instruction: "build the real thing"
**Predecessor tested:** AgentSpark "Rosetta Window" — verified notation theater (canned `R(F(x)) ~ x` regardless of input). DAR-1 is the real counterpart.

## What it is

A deterministic reducer that translates service/playbook-style JavaScript into a canonical algebraic step-relation form. It parses the actual code (tokenizer → recursive-descent parser → AST → mechanical emission). No canned outputs. Same input, same output, every time — proven by checksum, not by claim.

## Anti-Rosetta clause (honesty contract)

Constructs outside the supported subset are **rejected** with an explicit `UNSUPPORTED` error naming the construct. A rejected reduction is a correct answer, not a failure. Demonstrated live: `rejected_two_loops.js` → `UNSUPPORTED: exactly ONE while loop is required (the step relation)` — while the Rosetta Window would have shown the same canned formula for anything pasted in.

## Supported subset (v1.0)

- one function; pre-loop initialized declarations (state init)
- exactly ONE `while` loop = the step relation
- inside the loop: declarations, assignments, `x++`, `x+=`, queue `push`/`shift`, if / if-else (max 4 combined cases)
- a single `return` after the loop (the result)
- Canonical operators: `head()`, `tail()`, `len()`, `append()`, `∧ ∨ ¬ = ≠ < ≤ > ≥`, termination index `τ`

## Verification run (2026-10-08)

| sample | input_sha256 | output_sha256 | runs 1=2 |
|---|---|---|---|
| drain_queue.js | cb32ad7ad965… | 31607d24bcd3… | IDENTICAL |
| healing_loop.js | 94efed8443ed… | 1d3c51dfc14e… | IDENTICAL |
| rejected_two_loops.js | 1f9b21e68d4e… | 915e71f9fd99… | IDENTICAL (rejection is deterministic too) |
| retry_backoff.js | 1461cc0c08f9… | 8593a939fcf2… | IDENTICAL |

Full hashes and outputs: `outputs/last_run.txt`. Harness: `run_dar1.py` (two isolated subprocess runs per sample, SHA-256 comparison).

## Headline reduction (the drainQueue test that exposed the Rosetta Window)

```
map: drainQueue
state: queue (sequence), drained (scalar)
init:  drained₀ = 0 ; queue₀ = queue
guard: Gₜ ≡ ((len(queueₜ) > 0) ∧ (drainedₜ < limit))
itemₜ = head(queueₜ)
cases:
  (itemₜ.retry) : queueₜ₊₁ = append(tail(queueₜ), itemₜ) ; drainedₜ₊₁ = drainedₜ
  (¬(itemₜ.retry)) : queueₜ₊₁ = tail(queueₜ) ; drainedₜ₊₁ = (drainedₜ + 1)
termination: τ = min{ t ≥ 0 : ¬Gₜ }
result: drained_τ
```

This output is **input-dependent** — it did not exist anywhere before this code was pasted. Contrast: the Rosetta Window returned `R(F(x)) ~ x` for this exact input, which is wrong for this code.

Note on the healing loop: the reducer emits the general step relation `stateₜ₊₁ = verify(heal(isolate(stateₜ, anomalyₜ), anomalyₜ))`. The Rosetta Window's `R(F(x)) ~ x` is the special case where heal inverts fault — an identity claim the canned UI asserted unconditionally.

## Honest limitations

- Guards may reference external predicates (e.g. `system.healthy`) — emitted faithfully; the reducer does not model their dynamics.
- No nested loops, no indexing, no bare side-effect calls, >4 branch cases, or member assignment — all explicitly rejected.
- Bounded-loop behavior (like `limit`) appears as the guard; the reducer does not synthesize closed-form bounds. A closed-form solver would be DAR-2 territory.

## Scope note

DAR-1 currently runs as a pure offline tool (sandbox + CLI). Publishing to the public ledger / wiring into an app UI is a separate step pending Leon's GO (builder credits for any Base44 app integration).

*This artifact is part of the SQUIRL OS receipts-first methodology: preregistration-style scope, tested claim, checksummed proof. Prototype status applies: this software is a prototype for educational and research purposes only.*
