# Playbook Ledger Repair — Receipt 2026-10-29

Status: complete for the integrity repair. In-house only. No GitHub, no DOI, no on-chain.

## Finding

Aegis playbook success counts were not backed by healing evidence.

- 638 rows, 619 distinct names, 19 duplicate rows across 10 names.
- `PB-011: Integration Failover` existed three times; two rows each claimed 297
  successes. Across 2,244 healing events, exactly one referenced any of those rows.
- `failure_count` was 0 on all 638 rows. Nothing had ever written a failure, so every
  playbook displayed a perfect record.
- Only 27 of 619 playbooks had any non-zero claim; the true executable set was smaller.

## Actions taken

1. Reference audit before deletion: every AegisAnomaly.linked_playbook_id and
   Pattern.recommended_playbook_id pointing at a redundant row.

2. Repointed 7 live references to canonical rows:
   - anomalies: 4 (PB-003, PB-009, PB-008 ×2)
   - patterns: 3 (PB-003, PB-009, PB-011)

3. Deleted 19 duplicate rows. Manifest: `playbook/PB-DEDUPE-MANIFEST-20261029.md`.
   Result: 619 rows, 619 unique names.

4. Deployed `reconcilePlaybookLedger` (backend function). Recomputes success/failure from
   AegisHealingEvent, matching by id then exact name. Dry run first, then applied.

   Dry run: 55 rows disagreed with the ledger. Applied: 55 rows updated, 0 write errors.

5. Recorded 5 gate dispositions that had never been written down, which is why failures
   read as zero:
   - 2 × domain_shift held_under_rule_6 (0.58, 0.61 vs SIP-021 threshold 0.85)
   - 2 × config_drift held_under_rule_6 (0.79, 0.62 vs PB-CORE-013 threshold 0.85)
   - 1 × orphan_node_stale refused_directive_4 (0.88 but 3 active tasks on the node)

6. Updated those 5 anomalies to `held_under_rule_6` / `held_for_human_review`. None were
   marked resolved, because none were healed.

7. Second reconciliation run: 3 rows updated, `measured_failure_total` = 5, no errors.

8. Standing rule written: `.agents/rules/playbook-dispatcher-gate.md`.

## Measured state after repair

| Metric | Before | After |
|---|---|---|
| Playbook rows | 638 | 619 |
| Distinct names | 619 | 619 |
| Claimed successes | 651 (inflated, unearned) | 596 (event-derived) |
| Recorded failures | 0 everywhere | 5 (real gate holds) |
| Playbooks ever executed | 27 claimed | 47 event-verified |

## Not done, deliberately

- No heal was executed. All five open anomalies are correctly held; three are below their
  confidence threshold and one is Directive 4 protected.
- No playbook genesis. SIP-N-B22-01 `clock_skew_cascade` still needs an owner GO under
  Constitutional Art. 2.2.
- No wallet or rail action. The chain spend freeze stands; `wallet_funding_depletion` ×3
  remains watch-only.
- The dispatcher gate is a written rule plus a reconciliation function. A code executor
  that walks anomalies, applies the gate, and runs heals is not built. That is the next
  build, and it should not run unattended before it exists.
