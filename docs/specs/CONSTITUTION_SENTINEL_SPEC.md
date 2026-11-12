# SQUIRL OS Constitution — Constitution Sentinel Technical Specification
## Article XII.3 Enforcement Subsystem — v1.0

**Date:** September 5, 2026 | **Repo:** Jasper-OS-Squirrel-v2 (authoritative) | **Governing document:** SQUIRL_OS_CONSTITUTION.md (v2.0, Articles I-XII)
**Amendment authority:** Leon Calvin Long II (Article XII) — governance rules are human-amendable only; the Sentinel may never modify the Constitution or these rules.
**AEGIS:** Amelia's Engine for Governance, Intervention & Self-healing. The Sentinel is AEGIS's governance gate — the deterministic checkpoint every proposal passes before it becomes an action.

> This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.

---

## 1. Design Doctrine

The Constitution Sentinel is a **deterministic Jasper-layer protocol — NOT a probabilistic agent.** Adding an LLM to check LLMs adds hallucination surface; the Sentinel evaluates actions against invariant rules the way the JasperOS runtime validates mesh proposals. Mesh stays 25 nodes / 10 agents. Promotion to a standalone agent is deferred until tenant scale justifies it (revisit at go-live).

Bifurcation holds: **agents propose, the Sentinel disposes.** No healing action, playbook genesis, trust elevation, or tenant-scoped read executes without a Sentinel decision on record.

## 2. Architecture

```
                    +---------------------------+
   Agent action ---->|                           |
   (mesh proposal)   |     SENTINEL GATEWAY      |----> PERMIT  ---------> execute
                      |  (Article I-XII          |----> DENY   ---------> refuse + log
   JasperOS action -->|   evaluation engine)     |----> ESCALATE -------> Leon (SLA §4.4)
   (runtime path)    |                           |----> PENDING_REVIEW -> Leon (Art. 2.2)
                      +-----+-----------+-------+
                            |           |
              +-------------+           +--------------+
              v                                          v
   +---------------------+              +---------------------------+
   | CONSTITUTION STORE  |              | PATTERN FAMILY INDEX      |
   | (signed, versioned  |              | (predicate trees per     |
   |  article packats)   |              |  anomaly family)          |
   +---------------------+              +---------------------------+
              |
              v
   +---------------------+              +---------------------------+
   | AUDIT LEDGER        |<-------------| SENTINEL SHADOW           |
   | (hash-chained,      |   results    | (Jasper inline intercept, |
   |  append-only)       |              |  see §3.2)                |
   +---------------------+              +---------------------------+
```

### 2.1 Component Scopes

| Component | Scope | May do | May NOT do |
|---|---|---|---|
| **Sentinel Gateway** | Evaluation of proposed actions against the Constitution Store + Pattern Family Index | Evaluate, decide (PERMIT/DENY/ESCALATE/PENDING_REVIEW), write ledger entries | Execute actions, modify the Constitution, originate proposals |
| **Constitution Store** | Versioned, signed article packs (v1.0, v2.0, v3.x) | Serve the active article pack; hold last-known-good snapshot | Self-modify; accept unsigned amendments |
| **Pattern Family Index** | Predicate trees mapping anomaly families to articles + playbooks | Match, flag PENDING_REVIEW on family amendment | Deploy playbooks; auto-approve families |
| **Audit Ledger** | Append-only, hash-chained record of every Sentinel decision | Chain entries, emit cadence reports, serve export formats | Rewrite, reorder, or truncate entries |
| **Sentinel Shadow** | Inline intercept inside the JasperOS deterministic validation layer | Block, forward, cache decisions (§3.2) | Initiate actions; bypass the Gateway |

## 3. Enforcement Flows

### 3.1 Standard Pre-Execution Path (agent-sourced proposals)

1. Agent emits an action envelope (playbook execution, entity write, elevation request).
2. Gateway loads the active article pack version for the tenant scope.
3. Gateway evaluates: Articles I-II (authority + action class), III (human-in-loop triggers), VIII (tenantGuard), XII (amendment/idempotency gates).
4. Gateway emits an `EvaluationResult` (schema §3.3) and writes the ledger entry **before** the action executes.
5. On PERMIT, execution proceeds under the recorded decision ID; on DENY/ESCALATE/PENDING_REVIEW, execution does not proceed.

### 3.2 Jasper Inline Path (Sentinel Shadow)

Runtime actions validated by the JasperOS deterministic layer are intercepted by the Shadow at stage 4 (Pre-Ingestion Validation) of the Runtime Era pipeline:

1. Shadow computes the decision cache key (action type + article pack version + tenant scope).
2. Cache hit → inline verdict applied (sub-millisecond). Cache miss → Gateway round-trip, verdict cached.
3. DENY from the Shadow is a hard block — no runtime stage may proceed past it.
4. All Shadow decisions are written to the Audit Ledger asynchronously (never blocking, never dropped; failure to log = fail-closed per §5.1).

### 3.3 EvaluationResult Schema

```json
{
  "decision_id": "sen_20260905T042000Z_000421",
  "article_pack": "v2.0",
  "tenant_scope": "squirlos-real",
  "action": {
    "type": "playbook_execute",
    "target": "PB-QBO-DEMO-CUSTOMER-DRIFT-001",
    "originator": "amelia-aegis"
  },
  "verdict": "PERMIT",
  "articles_evaluated": ["I", "II.2.1", "III.3.1", "VIII.8.3"],
  "human_gate": null,
  "cache": { "shadow": true, "ttl_seconds": 3600 },
  "ledger_entry_hash": "sha256:…",
  "decided_at": "2026-09-05T04:20:00Z"
}
```

## 4. Audit Cycle

### 4.1 Hash-Chained Ledger Entry

```json
{
  "seq": 4211,
  "prev_hash": "sha256:…",
  "entry_hash": "sha256:…",
  "decision_id": "sen_20260905T042000Z_000421",
  "verdict": "PERMIT",
  "article_pack": "v2.0",
  "tenant_scope": "squirlos-real",
  "signed_by": "sentinel-gateway",
  "recorded_at": "2026-09-05T04:20:00Z"
}
```

Chain integrity is verified at every cadence report; any broken link = critical PlatformAlert to Leon (never batched).

### 4.2 Report Cadences

| Cadence | Report | Contents |
|---|---|---|
| **Hourly** | Heartbeat rollup | Decision counts by verdict, Shadow cache hit rate, ledger chain check |
| **Daily** | Pulse summary | ESCALATE queue depth, DENY root-cause classes, fail-closed events |
| **Weekly (Sunday 9pm CT)** | Full 12-article audit | Constitution Sentinel sweep, MetaMonitor record written per Article XII.3 (constitution_compliance_pct, audit_trail_completeness, tenant_isolation_violations, false_positive_rate, pqc_compliance_pct, playbook_coverage_pct) + the weekly tenantGuard self-test (synthetic unfiltered read must be REJECTED) |
| **Per-amendment** | Change report | Diff of amended articles, PENDING_REVIEW families raised, affected ledger epoch |

### 4.3 ESCALATE Queue SLAs

- **Standard escalations:** acknowledged by Leon or answered within **24 hours** — nightly digest carries anything aging past 12h.
- **SBIR / federal-scope escalations:** **4-hour** SLA — immediate critical alert, never batched.

## 5. Failure Handling

### 5.1 Fail-Closed Policy (every failure mode)

| Failure mode | Behavior |
|---|---|
| Constitution Store unreachable | DENY all actions; last-known-good pack governs read-only checks; critical alert |
| Ledger write failure | **No execution proceeds** — a decision that cannot be recorded cannot be honored; retry ×3, then fail-closed + alert |
| Pattern Family Index corrupt | PENDING_REVIEW for all matched families; escalate; no auto-heal executes from a corrupt index |
| Shadow cache invalidation miss | Treat as cache miss → full Gateway evaluation (never stale-permit) |
| Gateway timeout (p99 budget exceeded) | Fail-closed; action returns to originator as DENIED_TIMEOUT with ledger entry |
| Reload protocol exceeds 10s SLA | Hard halt of the affected partition; fail-closed until reload completes (§5.2) |

### 5.2 Sentinel Reload Protocol

1. New signed article pack received (amendment per Article XII).
2. Gateway enters reload: active partition freezes decisions (fail-closed), Shadow serves cached PERMITs only.
3. New pack verified (signature + epoch continuity), ledger epoch rollover entry written.
4. Pattern Family Index re-bound; caches invalidated.
5. **Hard SLA: 10 seconds.** Any reload exceeding 10s = critical alert + partition remains fail-closed.

## 6. Integrations

### 6.1 Playbook Manifest Registration
Every AegisPlaybook registers a Sentinel manifest at genesis: anomaly_type, articles touched, human-approval status. The Sentinel verifies the Article II.2 human-approval cycle **before** any playbook enters the active set — no SelfImprovementProposal deploys without Leon's explicit authorization. Playbooks are immutable at runtime (Amelia Operating Rules 10); changes go SIP → approval → new version → re-registration.

### 6.2 Pattern Family Amendments
Any predicate-tree change to a pattern family sets family status to `PENDING_REVIEW`, freezes auto-heal for that family, and raises a per-amendment report entry. Leon's approval reactivates the family.

### 6.3 Pattern Family Contract Interface

```
PatternFamily {
  family_id, tenant_scope, anomaly_types[],
  predicate_tree:  [AND/OR/NOT nodes over structural metadata only —
                    never over PII, wallet addresses, or transaction amounts],
  articles_bound[], playbook_bindings[],
  state ∈ { DRAFT → ACTIVE → PENDING_REVIEW → DEPRECATED → RETIRED }
}
```

Family lifecycle is a strict FSM — no state may be skipped, no retroactive reactivation without an approval ledger entry.

### 6.4 Jasper Shadow Embedding
The Shadow is embedded at Runtime Era stage 4 (Pre-Ingestion Validation) so every runtime movement inherits Sentinel coverage without a second hop. Cache invalidation triggers: (1) article pack version change, (2) any pattern family state change, (3) ledger epoch rollover, (4) tenantGuard policy change.

### 6.5 Trust Elevation Forwarding
Any elevated scope request is forwarded to the Gateway with the requesting context; Article IX checks apply (incident-scoped, time-boxed, auto-revoking). Elevations that outlive their incident window are force-dropped at the next Sentinel sweep — deterministic kill-grant ordering preserved (kill-grant last).

---

## Dual Mesh Benchmark

267x speedup (800ms → 3ms anomaly-to-playbook lookup) | 25 active nodes (5 read + 13 interconnect + 7 write) | 10 agents collision-free | 3 patents covering (64/119,191, 64/114,746, 19/693,343) | 0 false positives across 700+ stress-test anomalies. **8 patents pending + 5 SBIR tracks.**

---
© 2026 SquirlOS Technologies LLC. Leon Calvin Long, II — SQUIRL OS — Self-Healing AI Infrastructure.
github.com/LLong2026 | x.com/leonlongITC1 | squirlos-technologies.com
