# SIM-D — B2B DROPBOX Simulation (Company-to-Company Seed Drop)

**Status:** Infrastructure armed 2026-10-18. Owner: Leon Long. Executor: Gabriel (hub).
**Doctrine refs:** SIP-042 DROPBOX, MHCN-3 seed mode, POL-DISC-001, Sender Identity Gate, two-key gate.

## 1. What this simulates

Two SIMULATED companies exchange a notarized artifact with no third party:

- **SIM-CO-A "Vendor Corp"** (simulated originating company) uploads an artifact into the
  DROPBOX Upload Box (its own dedicated Base44 app — separate from Deterministic Code).
- **The hub** (Gabriel) receives the upload event via webhook, validates, and drops the
  artifact's 32-byte SEED on Bitcoin TESTNET in an OP_RETURN (transfer-only, zero monetary
  function, per SIP-042 invariants).
- **SIM-CO-B "Acquirer Corp"** (simulated receiving company) pulls the seed back from the
  chain using the KEYLESS READER — no account, no keys, no trust in the hub — reconstructs
  the artifact via the TGC engine, and gets a BINARY verdict: MATCH or MISMATCH.

The chain is the courier. The hash is the artifact. Neither company needs to trust the other.

## 2. Separation of boxes (per Leon directive, 2026-10-18 ~10:12 CT)

| Box | Role | Status |
|---|---|---|
| DROPBOX Upload Box | Artifact upload + webhook POST (its own app) | Leon building now |
| Deterministic Code (deterministic-code-dsos) | Genesis Viewer / examiner reconstruction | Unchanged, viewer-only for now |
| Hub (Gabriel) | Webhook handler, writer/reader execution, DropboxDrop journal | Armed |

## 3. Webhook wiring for the Upload Box

- Listener: the workspace webhook shown in the setup card (same shared listener SEAT-B uses;
  events are classified by the body's `event_type` field, so each box gets its own lane).
- The box POSTs this exact JSON on every upload:

```json
{
  "event_type": "artifact_uploaded",
  "upload_id": "upl-20261018-0001",
  "box_app_id": "<the upload box's Base44 app id>",
  "sim_from": "SIM-CO-A Vendor Corp (simulated)",
  "sim_to": "SIM-CO-B Acquirer Corp (simulated)",
  "artifact_name": "b2b-contract-tgc-v1",
  "artifact_sha256": "81d4a5cb97fa972e89a3b65f51076384b64d4b630291a9986bd7b067adc3456c",
  "seed_hex": "4f539b5f...",
  "network": "testnet",
  "requested_action": "drop_and_verify",
  "timestamp": "2026-10-18T15:30:00Z"
}
```

Field rules:
- `event_type` MUST be exactly `artifact_uploaded` (this is the routing key).
- `artifact_sha256`: 64-hex SHA-256 of the artifact — the verification target.
- `seed_hex`: the 32-byte seed as hex (public-by-design; it goes on-chain).
- `sim_from` / `sim_to`: simulated company labels only. The handler HARD-STOPS and creates
  a critical PlatformAlert if anything resembling real customer data or PHI appears.
- `network`: `testnet` during SIM-D. `mainnet` requests are journaled as pending and held
  for Leon's explicit GO (two-key gate) — never automatic.

## 4. Hub-side pipeline (already armed)

Workflow **"DROPBOX Upload Handler (SIM-D)"** — trigger `artifact_uploaded`, then the agent runs:

1. **VALIDATE** — hex format, seed present, simulated-parties guard (fail-closed).
2. **IDEMPOTENCY** — one drop per artifact_sha256 + network; duplicates logged, never re-dropped.
3. **GATE** — non-testnet requests park as `pending`; mainnet needs Leon GO.
4. **TESTNET LEG** — OP_RETURN (seed + sha256 + SIMD marker), broadcast, wait ≥1 confirmation.
   Unfunded wallet → record `pending_coins`, one-line note to Leon.
5. **READER LEG** — keyless chain pull, TGC reconstruction, binary MATCH/MISMATCH verdict.
6. **JOURNAL** — `DropboxDrop` entity record (txid, block, verdict, timestamps) + one-line
   digest to Leon. No ledger entries, no publishes — two-key gate only.

## 5. Gates (deterministic, no LLM in the verdict path)

- G1: reader reconstruction is byte-identical or it is not (binary verdict).
- G2: tx has ≥1 testnet confirmation before the reader leg runs.
- G3: idempotency — a given artifact hash + network is dropped exactly once.
- G4: simulated-parties guard — zero real customer data or PHI in any payload, log, or receipt.
- G5: mainnet isolation — no mainnet broadcast without Leon's explicit GO via the chat gate.

## 6. Journal entity

`DropboxDrop` (hub): drop_id, sim_from, sim_to, artifact_name, artifact_sha256, seed_sha256,
network, txid, block_height, status (pending | dropped | confirmed | verified | pending_coins |
failed), verdict (MATCH | MISMATCH | PENDING), dropped_at, verified_at, upload_ref, notes.

## 7. Known blocker (honest state)

The testnet wallet (`mnZX272MydLLXo6fn9C7fTzdS9Hs9MXyvd`) is still UNFUNDED — public faucets
are captcha-walled or drained. Until coins land, upload events will journal as `pending_coins`.
Fastest unblock: mempool.space testnet4 faucet (GitHub sign-in, one click from Leon's browser),
or I keep grinding testnet.help's reCAPTCHA.
