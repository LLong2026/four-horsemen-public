# SIM-B Daily Ops Feed — Receipt 2026-11-05 (UTC)

Run at 2026-11-05T12:03Z / 06:03 CT.

## Steps

1. **Idempotency** — hub RateLimitLog scope `simb_daily_ops_feed_2026-11-05`: zero records before run. Proceeded.
2. **Read** — cross-app read of SIM-B `ServiceTicket` (app 6ab54d69ae4e36276b900629), `-created_date`, limit 5.
   Newest: MW-TKT-0011 (2026-11-04T12:02:19Z). Also present: a PROBE2 row (2026-10-31, category
   `bogus_category_for_probe`, priority P9) from a schema probe. Next sequence: MW-TKT-0012.
3. **Compose** — Mirror West IT Services (SIMULATED), hardware, P3, assigned MW-E-003,
   tags intended `['simulated','daily_ops']`, description opens `SIMULATED customer and workload.`
4. **Write** — `POST /api/apps/6ab54d69ae4e36276b900629/functions/simbWriteOpsTicket`, HTTP 200,
   `{"ok":true,"id":"6aec708137a613cdd4d2dd58","ticket_id":"MW-TKT-0012"}`.
5. **False-green guard** — read-back by ticket_id confirms MW-TKT-0012 present,
   `created_at 2026-11-05T12:03:13.794Z`, status `open`. PASS on ticket_id + today's timestamp.
6. **Stamp** — RateLimitLog created: action_type `simb_daily_ops`, scope
   `simb_daily_ops_feed_2026-11-05`, app_id 6ab54d69ae4e36276b900629, timestamp 2026-11-05T12:03:13Z.
   Read back, 1 record.

## Finding — partial write, three fields dropped

Read-back of the full record shows:

| field | sent | stored |
|---|---|---|
| customer_name | "Mirror West IT Services (SIMULATED)" | `null` |
| assigned_agent_id | "MW-E-003" | `null` |
| tags | ["simulated","daily_ops"] | `[]` |

This is not new. MW-TKT-0008, 0009, 0010 and 0011 all store `customer_name: null` and `tags: []`.
The write function accepts the payload and reports ok, then persists only a subset.

Consequence: the SIMULATED attribution now survives **only** in the title and the first line of the
description. Any surface that renders `customer_name` will show an unattributed ticket, and any filter
on `tags: simulated` returns nothing. That is a disclosure erosion path, not a cosmetic gap.

Layer: **gate** (the write function's field mapping), not payload. Payload was correct for all three fields.

Not remediated: fixing it needs a deploy into the SIM-B app, which this session cannot do. Named here
so the next fix starts at the function, not at the caller.

## Also noted

PROBE2 row (category `bogus_category_for_probe`, priority P9) is still open in the stream from a
2026-10-31 schema probe. It is test residue inside a demo desk; harmless but it sits in the tuple
the sequence counter reads.

No customer-identifiable data, no PHI. Simulated demo material.
