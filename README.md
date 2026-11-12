# Four Horsemen — public research line

Deterministic-machine benchmarks, preregistrations and receipts from the Squirrel OS research
programme. Everything here is a record of something that was run, with the numbers, the pass
conditions and the failures left in place.

> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.

## What is in here

- `docs/benchmarks/` — benchmark runs, each named for the campaign and the date it ran.
- `docs/preregistrations/` — pass conditions written before the run, including the ones that later failed.
- `docs/specs/` — specifications for the cores under test.
- `docs/papers/` — long-form write-ups.
- `docs/receipts/` — machine-readable receipts: hashes, verdicts, counts.
- `docs/curriculum/` — teaching material.
- `llm-guard-30day/` — a live preregistered test of a deterministic claim-checking gate, including its harness.

## What is not in here, and why

This repository was built as a fresh export rather than opened from an existing working
repository. Source material contained operator working files, personal records, credentials in
config files, and third-party data that were never meant to be published. None of it was copied.
The export was produced by allowlist, screened for personal, health, financial, credential,
network and custody identifiers, and every file that tripped a screen was left out rather than
edited.

A receipt that is missing from `docs/receipts/` is not an accident. It either carried a
prohibited identifier or it quoted a private conversation. The omission is deliberate and the
underlying run still happened.

## Reading the receipts

A receipt names the inputs, the checker version and the verdict. A `pass` means the checker found
nothing it could prove wrong. It never means the claim is true. Coverage is bounded by what the
checker can parse, and every preregistration in this repository states that bound for the run it
covers.

## Corrections

Records here are append-only. When a receipt is superseded, the new version names the one it
replaces; nothing is quietly rewritten.
