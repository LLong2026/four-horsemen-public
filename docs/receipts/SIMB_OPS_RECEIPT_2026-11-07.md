# SIM-B Daily Ops Feed — Receipt 2026-11-07 (UTC)

Run at 2026-11-07T12:04Z / 06:04 CT.

## Steps

1. **Idempotency** — hub RateLimitLog scope `simb_daily_ops_feed_2026-11-07`: zero records before run. Proceeded.
2. **Read** — cross-app read of SIM-B `ServiceTicket` (app 6ab54d69ae4e36276b900629), `-created_date`, limit 5.
   Newest pre-run: MW-TKT-0013 (2026-11-06T12:06:36Z). Next sequence: MW-TKT-0014.
3. **Compose** — Lakeside Dental Group (SIMULATED), category `software`, P3, assigned MW-E-004,
   tags intended `['simulated','daily_ops']`. Topic: dental imaging bridge service failing to start
   (error 1053) on operatory-3 after a workstation OS patch; image capture greyed out on that
   operatory only, manual PDF-attach workaround in place.
4. **Write** — `POST /api/apps/6ab54d69ae4e36276b900629/functions/simbWriteOpsTicket`, HTTP 200,
   `{"ok":true,"id":"6aef13c50ec9881d941993bf","ticket_id":"MW-TKT-0014"}`.
5. **False-green guard** — read-back by ticket_id confirms MW-TKT-0014 present,
   `created_at 2026-11-07T12:04:21.279Z`, status `open`, title and description intact.
   PASS on ticket_id + today's timestamp.
6. **Stamp** — RateLimitLog created: action_type `simb_daily_ops`, scope
   `simb_daily_ops_feed_2026-11-07`, app_id 6ab54d69ae4e36276b900629, timestamp 2026-11-07T12:04:21Z.
   Read back, 1 record.
7. **Alerting** — no write failure, no guard failure. Silent run per spec.

## Standing defect, unchanged (carried from 2026-11-05 and 2026-11-06)

The write function persists only a subset of its payload:

| field | sent | stored |
|---|---|---|
| customer_name | "Lakeside Dental Group (SIMULATED)" | `null` |
| assigned_agent_id | "MW-E-004" | `null` |
| tags | ["simulated","daily_ops"] | `[]` |
| urgency | "medium" | `medium` (mapping unverified this run) |
| impact | "low" | `low` (mapping unverified this run) |

MW-TKT-0008 through MW-TKT-0014 store identically on the three dropped fields.

Consequence unchanged: SIMULATED attribution survives only in the title and the description's first
line. Any surface rendering `customer_name` shows an unattributed ticket, and any `tags: simulated`
filter returns nothing. Disclosure erosion path, not cosmetic.

Layer: **gate** (the SIM-B function's field mapping), not payload. Payload was correct for every
field listed. Not remediated: fixing it needs a deploy into the SIM-B app, which this session cannot do.

## Also noted

PROBE2 row (category `bogus_category_for_probe`, priority P9) remains open from the 2026-10-31
schema probe and still sits inside the tuple the sequence counter reads.

No customer-identifiable data, no PHI. Simulated demo material only.
