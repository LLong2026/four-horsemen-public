# PREREG — XTR-1 (The XRP Transfer Rail)

**Frozen:** 2026-10-19, pre-run. **Authorization:** Leon GO (chat authorization, 2026-10-19
~10:53 CT — "lets show them what the use of XRP on a transfer rail really looks like. i'll
need speeds as well for the transfer").

**Riding digest (sha256, THE_XTR-1_SPEC.md v1.0):** c10e1899d093b2ec1c4f10f1ee6a64f6629258c9cc3feff1fab08ba9b02ce165

## Hops (each 700,000 drops = 0.7 XRP, memo SQDR-XTR-1 + HOP:n + digest)
Sequential custody chain, value ends HOME AT A after 5 ownership changes:
- H1: B→A — B seq 107745086
- H2: A→B — A seq 107745085
- H3: B→A — B seq 107745087
- H4: A→B — A seq 107745086
- H5: B→A — B seq 107745088

B sends 3 (0.7 from its 2.00006 balance, replenished each inbound), A sends 2.

## Timing protocol (spec §2)
Per hop: t0 (immediately before submit), t_engine (tesSUCCESS returned), t_validated
(first validated=true read). Sequential discipline: hop n+1 broadcasts only after hop n
validates. End-to-end = sum of per-hop broadcast-to-finality. Record ledger_index per hop.

## Cost
5 × 10 drops = 50 drops (~$0.003). Cheapest custody chain in program history.

MEASURED (scoped): deterministic gates, no LLM in any decision path (program benchmark DOI
10.5281/zenodo.23321637). No production, customer, or personal data (POL-DISC-001).
Prototype disclaimer applies.
