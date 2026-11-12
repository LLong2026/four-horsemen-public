# Dual Mesh Benchmark — DeepSeek v4-pro Baseline Column (CCR-4X leg I companion)

**Series:** dual_mesh_benchmark_deepseek_20261013 · **Executed:** 2026-10-13 ~14:55Z · **Status:** MEASURED, Leon-reviewed (two-key: Gabriel vetted, Leon GO Oct 13, 2026, 09:51 CT)

## What was measured

A preregistered B1-baseline-style leg on DeepSeek v4-pro (via OpenRouter, model_returned
verified per call), resolving the frozen CORPUS_B1.json synthetic anomalies (sha256
13295d197be59dd1266814bc2f961f1e55e974c61c642fd9c7a6a389668fee59), first 20 instances in
file order — the identical selection rule as every prior B1 baseline leg. One stateless
request per instance, wall-clocked from request sent to full response received. This
immediately followed the CCR-4X leg I containment re-run of the same engine (conforming
9/9, forged APPR-9923 authority rejected).

## Results

| Metric | Value |
|---|---|
| Completed | 20/20 (no timeouts, no aborts, no retries) |
| Strict-valid tuples (byte-parseable, conforming) | 20/20 |
| Normalized-valid tuples | 20/20 (no normalization needed) |
| Correct tuples incl. exact platform playbook_id | 20/20 |
| Median wall-clock | 8,538.0 ms |
| p95 wall-clock | 11,864.0 ms |
| Min / max | 6,288.9 / 11,864.0 ms |
| Total API cost | $0.0089 |

All responses finish_reason=stop, model deepseek/deepseek-v4-pro (OpenRouter providers:
StreamLake, Parasail).

## Comparisons (directional only, per XPLAT-2/3 doctrine)

- v1.0 B1 mesh lookup median (same corpus, in-memory): **0.000443 ms**
- v1.0 Automatic conversation-loop baseline median: **4,509.1 ms** (different substrate)
- This leg, raw external API: **8,538.0 ms**

DeepSeek v4-pro's raw-API median exceeds even the v1.0 full conversation-loop median —
attributable to reasoning-token generation, not platform orchestration. Accuracy-per-dollar
is excellent ($0.00045 per correct resolution); latency is not this engine's lane under
reasoning defaults. No wall-clock equality claim across substrates is made.

## Honest-results note

This leg is the repair completion of a documented loss: the Oct 11 CCR-4 DeepSeek capture
was NON-CONFORMING (fabricated tuple, wrong array shape) and remains on the public tally.
The preregistered CCR-4X leg I re-run (conforming 9/9) and this benchmark leg were
executed only after that loss was posted publicly. Doctrine: publish the failure first,
repair under fresh preregistration, then re-run.

## Falsifiers (all PASS)

- FBD-1 raw logs preserved (all 20 verbatim) · FBD-2 frozen corpus + first-20 rule verified
  at runtime · FBD-3 zero omissions/retries · FBD-4 no post-hoc metrics · FBD-5 synthetic
  corpus only, no PHI/PII/credentials

## Lineage

- Dual Mesh Benchmark v1.0 (DOI 10.5281/zenodo.23303081), v2.0 (DOI 10.5281/zenodo.23321637)
- XPLAT-5 engine transplant, contract parity (DOI 10.5281/zenodo.23332291)
- AUTH-1 authority-forgery battery (DOI 10.5281/zenodo.23332203)
- Ledger: https://github.com/LLong2026/four-horsemen (commits aa751dd prereg → 9bc6851 receipt)
- Community: https://zenodo.org/communities/dcai

Method operates under filed applications 64/119,191 / 64/174,933 et seq. (portfolio of 10
pending provisionals). No unfiled-method disclosure is made in this record.

**Dual Mesh Benchmark:** this record IS a Dual Mesh Benchmark measurement, scoped to
anomaly-to-playbook resolution by DeepSeek v4-pro on the frozen 20-instance corpus, raw
external API substrate, October 2026. All other Dual Mesh Benchmark claims remain NOT
MEASURED here.

> This software is a prototype and is provided for educational and research purposes only.
> It is not intended for production use, commercial deployment, or safety-critical
> environments. All systems are experimental and may contain defects on them.

## Version note (v2)

v2 supersedes v1 solely to redact verbatim operator chat text from the preregistration
per the operator-privacy directive (Oct 13, 2026). Authorization is recorded as GO +
timestamp only. No measurement, result, or claim changed.
