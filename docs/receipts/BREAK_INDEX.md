# Break Index — what broke, what it took, and how each one closed

Started 2026-11-10 on owner instruction (chat, 2026-11-10 01:09 CT): the breaks and fixes
are the part worth keeping, because a record of wins alone shows nothing about the work.

**Rule for this file.** Every row carries failing evidence, the layer, and a commit. A row
without a receipt is a claim, and this index does not accept claims. If a break cannot be
shown failing before the fix and passing after it, it is listed as OPEN or DOCUMENTED-LIMIT,
never as repaired.

**Closure types.** These are not interchangeable, and collapsing them is the flattering
failure mode:

| type | means | reader should conclude |
|---|---|---|
| REPAIRED | fault reproduced, fixed at the failing layer, re-run proves fault now fails and honest path passes | this is fixed |
| REPAIRED-IN-PART | some of the surface fixed, remainder named | fixed where stated, not elsewhere |
| REFUSED-BY-DESIGN | the system declines to act, on purpose, and says so | nothing is broken; a boundary exists |
| DOCUMENTED-LIMIT | a known limit we chose to live with, with its size stated | this is not fixed and is not hidden |
| CORRECTED | a claim we published was wrong; the correction is the fix | trust the correction, not the original |
| OPEN | known, not yet closed | still true today |

## State-change convention

A large change closes one record and opens another rather than editing history in place. The
closing entry states the last state under the old meaning. The opening entry states the
boundary, what caused it, and which published figures are not retracted but are now read under
the old lens. A value that did not move is still recorded as a boundary if its meaning moved.

---

## Index

| id | what broke | layer | evidence | closure | where |
|---|---|---|---|---|---|
| B-01 | reconcile deduped by row id only: two rows sharing an event_id counted as two successes for one event | audit | re-proved failing: dupes 1, dangling 1, coverage false, closure 2385=2385, then clean 2382 drift 0 | REPAIRED | `ad8edd0` A18_E2E_20261110.md |
| B-02 | attribution precedence cliff: one id-linked event moved 12 name-attributed successes out of a playbook's totals (shadowed 49 -> 61, measured 12 -> 1) | audit | reported on both sides, not dropped | DOCUMENTED-LIMIT | `ad8edd0` A18_E2E_20261110.md |
| B-03 | learning was not idempotent against its own evidence: two passes double-stepped the same 227 graded outcomes | gate | second apply over unchanged evidence now changes zero rows | REPAIRED | `6a6315d` (A18_DISPATCH_LIVE) then `f8ec390` (A18_TWO_NUMBERS) |
| B-04 | learning scan capped at 500 of 2,382 events | storage | cap named in the run, corpus size named beside it | REPAIRED | `f8ec390` A18_TWO_NUMBERS_20261110.md |
| B-05 | gate playbook read capped at 1,000 rows against a 962-row corpus | storage | `cap_applied: false` now reported | REPAIRED | `fe5cb15` A18_K_LIMITS_CLOSED_20261110.md |
| B-06 | gate idempotency set was the newest 500 events: an anomaly evaluated outside that window looked unevaluated and would be scored twice | gate | full scan on a unique key | REPAIRED | `fe5cb15` A18_K_LIMITS_CLOSED_20261110.md |
| B-07 | gate swept a literal eight classes, so 954 of 962 playbook rows could never be evaluated and "nothing to do" read as health | gate | sweep set now derived from open records | REPAIRED | `6a6315d` A18_DISPATCH_LIVE_20261110.md |
| B-08 | seven readers disagreed about the same corpus, each with its own classifier and precedence | audit | one reader, declared classifier, hard 500 when buckets do not sum | REPAIRED | `1a43341` A18_CENSUS_20261110.md |
| B-09 | 1,637 events referenced playbooks that did not exist | storage | 293 rows reconstructed with provenance stamps; 147 assigned to named test-campaign lines; 100% resolution | REPAIRED | A18_PLAYBOOK_RECONSTRUCTION_20261110.md |
| B-10 | eleven `sim:anomaly:*` nodes were outside the derivation and never updated | gate | 9 now derived (heartbeat_miss 0.48 -> 0.996, model_degradation 0.48 -> 0.10) | REPAIRED | `fe5cb15` A18_K_LIMITS_CLOSED_20261110.md |
| B-11 | published claim that the gate read NeuralNode weight was false: no decision path read it | description | corrected in the same commit that made it true | CORRECTED | `fe5cb15` A18_K_LIMITS_CLOSED_20261110.md |
| B-12 | zero-evidence classes were reported with a fabricated 0.5 prior, a neutral dressed as a measurement | description | now `no_evidence_in_ledger_untouched`, weight left alone, nothing written | REPAIRED | `fe5cb15` A18_K_LIMITS_CLOSED_20261110.md |
| B-13 | first reliability rule required confidence >= class weight, making the BEST classes hardest to dispatch | gate | live row bound in the wrong direction (integration_degraded 0.90 held against weight 0.9231) | REPAIRED | `37984e2` A18_L_MESH_20261110.md |
| B-14 | learned mesh covered 11 of 962 playbook classes, so the reliability floor was absent rather than low | gate | 40 nodes created on an evidence rule, 11 -> 51 dispatchable classes | REPAIRED-IN-PART | `37984e2` A18_L_MESH_20261110.md |
| B-15 | ESCAPE-2B probe delivery failed on both legs: HTTP 403 AccountApiKeyBlockedError, account API keys no longer accepted | transport | read path 200 on LS1 after owner token; write path 404 on a non-existent id proves acceptance before resource lookup | REPAIRED | `32b1ccc` |
| B-16 | 33 anomaly classes had real evidence and no dispatching playbook | gate | genesis rows written; re-measured: 1 class of 38 still has evidence and no playbook | REPAIRED | `37984e2` + meshplan 2026-11-10T07:1xZ |
| B-17 | 37 classes carry 1 to 2 graded observations and stay unmodeled; their floor would rest on noise | gate | held back by an explicit minimum, counted | DOCUMENTED-LIMIT | `37984e2` A18_L_MESH_20261110.md |
| B-18 | the ledger graded a containment notice as a success, so learning was rewarded for containing, not for repairing | audit | two lenses now computed on every row and never merged; standing basis is repair | REPAIRED | A18_M_GRADING_LENS_20261110.md |
| B-19 | 2026-11-09 and 2026-11-10 probe days were never observed: recorded UNKNOWN, not clean | observation | both dates stay UNKNOWN; last verified responses 2026-11-08 | DOCUMENTED-LIMIT | `32b1ccc` |
| B-20 | the first repair lens keyed on the outcome string, so it stripped real successes from two playbooks whose action IS containment (ransomware isolation, wallet stall recovery) | audit | 2 of 6 notices misclassified; lens now keyed on the playbook's declared action | REPAIRED | A18_M_GRADING_LENS_20261110.md |
| B-22 | the fault-injection record said C2 and C3 had never been injected, while storage carried substitution and restore stamps from both boxes on 2026-11-10 | description | re-injected fresh on both boxes and stamped with their own timestamps; the older stamps stand as evidence the record was wrong | CORRECTED | A18_N_CERT_READINESS_20261110.md |
| B-23 | A16 recorded the referential v9 fix as undeployable on the box apps; the live audit now pages to 570 and 582 vote rows with 0 stale dispositions | description | behaviour verified on the live functions, not inferred from the commit | CORRECTED | A18_N_CERT_READINESS_20261110.md |
| B-24 | C1's integrity audit has no `probe_missing_ids` path, so its referential check cannot be shown to fail the way C2 and C3's can | audit | fail direction proven instead by an injected unsigned vote row (`unsigned_vote_row`, critical), withdrawn to clean | DOCUMENTED-LIMIT | A18_N_CERT_READINESS_20261110.md |
| B-21 | a fix applied one layer above its fault: the reliability rule compared confidence to weight and punished the best classes | description | caught by measurement, not by review; see B-13 | CORRECTED | `37984e2` |

---

## The ones worth reading

### B-13 — the rule that was backwards

The most expensive mistake of the night, and it looked like caution.

The first wiring required `confidence >= class weight`. That compares two unrelated
quantities: how sure the detector is that an anomaly is real, against how often that class's
containment has succeeded. The consequence is inverted. A class with 45 clean outcomes and
no failures weighs 0.9787, so it would need a 0.98 detector to act, while a class that fails
half the time would act at 0.5. Learning would ratchet against its own best evidence.

Replaced with a permission floor: below 0.70 reliability a class does not auto-act at any
confidence, and the playbook threshold decides the rest untouched.

    injected candidate  conditional_access_baseline_drift, conf 0.95, threshold 0.95, weight 0.40
    weightRule off      contained                 bound_by playbook_threshold
    weightRule on       held_under_rule_6          bound_by class_reliability_hold
    candidate withdrawn

A reader down range should take one thing from this: the fix was not the hard part. Noticing
that the first version punished success was, and only the measurement showed it.

### B-11 — a claim that was wrong when published

`A18_J` said the gate read the class weight. It did not. `calibrateFromLedger` derived the
playbook threshold from the measured failure frontier, and the weight was written in the same
pass and read by nothing. The commit that made the claim true also records that it had been
false. Left uncorrected, every downstream report citing "the gate reads weight" would have
been repeating a decoration.

### B-06 — the cap that scored work twice

The gate's idempotency set was the newest 500 events. An anomaly evaluated outside that
window looked unevaluated on the next pass and would be scored again, writing a second event
for work already done. A capped read is not a smaller view of the truth; it changes which
records exist as far as the decision is concerned.

### B-18 — the one still open, by owner decision

The ledger grades `contained` as a success. So the mesh's numbers say a class is reliable
when its playbook filed a clean escalation, which is not the same as repairing anything.
Left as-is on owner call, because re-grading would re-price every historical figure,
including what is already published. Recorded here so nobody reads the success rate as a
repair rate.

---

## How to add a row

1. Reproduce the fault and capture the failing output before touching anything.
2. Name the layer: payload, gate, audit, storage, transport, or description.
3. State the change, one line.
4. Re-run and prove both directions: the fault now fails, the honest path still passes.
5. Pick the closure type honestly. If step 4 is only half done, the row is REPAIRED-IN-PART
   or OPEN, and it says so.
6. Add the commit. No commit, no row.
| B-25 | votes on all three Conclave boxes were stored with `voter_signature` null, and C1's audit flagged nine rows as fabrication | writer, then audit | `castVote` on C1, C2, C3 restored to verify the seat's ML-DSA-87 signature over `CONCLAVE-VOTE-V1\|proposal_id\|payload_hash\|vote\|voter_node_id` and store it with key id and state; C1's audit stopped counting uncast slots as votes and names six pre-fix rows as a closed set it reports every run as `pre_signing_restore_defect` | REPAIRED | `c9724cac` |
