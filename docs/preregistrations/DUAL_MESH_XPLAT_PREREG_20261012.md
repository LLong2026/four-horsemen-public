# Dual Mesh Benchmark — Cross-Platform Series (UNEXECUTED)

Preregistered BEFORE any execution. No number in this document is a result.
Series signature: dual_mesh_benchmark_xplat_20261012. Date frozen: 2026-10-12.
Owner authorization: Leon GO ("we need a dual benchmark... let's get it" + cross-platform rerun selection + "do both", Oct 12, 2026, ~10:45-10:48 CT).

## Purpose

The 20261011 benchmark (DOI 10.5281/zenodo.23303081) measured B1 lookup latency in ONE environment and its receipt scoped the result accordingly ("characterizes THIS environment"). This series closes that scoping caveat: the same frozen corpus is resolved through the same protocol from DIFFERENT execution environments (different host) and a DIFFERENT LLM substrate (external model API), establishing host-independence and substrate-independence of the mesh-vs-LLM-loop lookup ratio.

## Frozen corpus

CORPUS_B1.json — byte-identical copy of the 20261011 frozen corpus (200 synthetic anomaly instances, 3 registered anomaly types, no real-system data). Frozen hash: 13295d197be59dd1266814bc2f961f1e55e974c61c642fd9c7a6a389668fee59 (commit 2eb3879). Every leg verifies this hash BEFORE running. Falsifier FB-6: any leg running against a corpus whose sha256 differs = FAIL.

## Legs (fixed; no post-hoc additions)

- **XPLAT-1 — B1-mesh parity rerun (zero LLM calls).** Identical corpus, local reference resolver (in-memory exact-match hash index + decision assembly), n=200, sandbox host. Reports min/median/p95/max per-lookup latency. Expected: run-over-run determinism vs the 20261011 mesh leg (0 misses, ~0.44ms median).
- **XPLAT-2 — B1-baseline ENV-A: GitHub Actions runner host (credit-consuming, ~20 platform API calls).** 20 corpus instances, one single-anomaly resolution each, fresh API conversation per instance, wall-clocked request-to-validated-tuple, executed on an ubuntu-latest GitHub Actions runner (different host/egress than both the 20261011 sandbox leg and the hub). Prompt, roster, and validation identical to the 20261011 baseline leg. Model: platform default (Automatic), memory disabled per conversation freshness. Raw responses preserved verbatim in the repo.
- **XPLAT-3 — B1-baseline ENV-B: external LLM substrate (OpenRouter, from bash).** 20 corpus instances, same prompt and validation, wall-clocked request-to-validated-tuple. Frozen model: deepseek/deepseek-chat (OpenRouter); fallback openai/gpt-4o-mini permitted ONLY with disclosure if the primary is unavailable. **DECLARED PENDING: OpenRouter account balance is $0.00 (verified 2026-10-12). This leg cannot execute until Leon tops up the OpenRouter account. Base44 integration credits cannot pay OpenRouter token usage.**
- **B2 (mesh ingestion): NOT re-run cross-platform.** The platform write wall (documented Oct 8, 2026) prevents synthetic DualMeshNode ingestion into other apps from this session; B2 remains hub-environment-scoped as passed 20261011.
- **B3 (resolution correctness): NOT re-run.** Deterministic local code, passed 20261011 (72/72 replay, 0 mismatches, 0 false positives); it has no environment-dependent component.

## Reported claim (on completion)

Scoped ratio table: mesh (XPLAT-1) vs baseline medians per environment (20261011 hub-sandbox, XPLAT-2 Actions-host, XPLAT-3 external substrate), disclosed as sampled-baseline ratios. No universal performance claim, no extrapolation, no certification language, no supersession of the historical production figures (267x / 800ms->3ms) beyond what was already disclosed.

## Falsifiers

- FB-1 (carried): any published number without preserved raw logs = FAIL.
- FB-2 (carried): any leg using a different corpus or instance count than declared = FAIL.
- FB-3 (carried): any run omitted from the distribution = FAIL.
- FB-4 (carried): any metric added post-execution without prereg amendment = FAIL.
- FB-5 (carried): any PHI, customer identity, or credential in an artifact = FAIL.
- **FB-6 (new): any leg executing against a corpus whose sha256 differs from the frozen hash = FAIL.**
- **FB-7 (new): any benchmark leg touching production entities or non-sim data = FAIL.** Benchmark conversations are fresh, empty, and used only for the benchmark; no entity writes during benchmark legs (results are files/ledger only).

## Gating

- XPLAT-1 (zero credit): runs under this prereg on Leon's standing GO.
- XPLAT-2 (~20 message credits): runs under Leon's "do both" GO of Oct 12.
- XPLAT-3: executes only after OpenRouter top-up; a separate execution note accompanies it when it fires.

## Execution environments note

The Base44 fleet contains exactly ONE Superagent (Gabriel, 69b57683f2623117603736bc); Horseman apps are builder apps without independently addressable agent loops. In-family cross-environment is therefore defined as host-difference (GitHub Actions runner), and true cross-substrate as the external LLM API (OpenRouter). Cloudflare Workers remain the ops scheduler; no production worker config is modified by this series.

This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.

## PREREG AMENDMENT 1 — 2026-10-12, BEFORE any XPLAT-2 execution

XPLAT-2 execution host is amended from "GitHub Actions runner" to "Cloudflare Workers edge runtime". Reason: the squirrel-os-ops OAuth token lacks the `workflow` scope required to create GitHub Actions workflow files (documented limitation, squirrel-os-ops README, Plan D architecture — Cloudflare Workers were selected Oct 7, 2026 for exactly this reason). The amended host is not weaker evidence: the Cloudflare edge is a distinct host/egress from both the 20261011 sandbox leg and the Base44 platform, which is what XPLAT-2 measures. The bench executes on a SEPARATE, purpose-built worker (squirrel-os-bench-xplat) deployed for this leg only; the production squirrel-os-ops worker is not modified (FB-7). All other XPLAT-2 parameters are unchanged: 20 fresh conversations, identical prompt/roster/validation, wall-clock request-to-validated-tuple measured at the executing host, platform default model, raw logs preserved verbatim. The worker is deleted after the leg; receipts (results JSON + echoed corpus instances) are committed as the permanent record.
