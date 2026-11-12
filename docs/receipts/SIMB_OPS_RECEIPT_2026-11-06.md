# SIM-B Daily Ops Feed — Receipt 2026-11-06 (UTC)

Run at 2026-11-06T12:06Z / 06:06 CT.

## Steps

1. **Idempotency** — hub RateLimitLog scope `simb_daily_ops_feed_2026-11-06`: zero records before run. Proceeded.
2. **Read** — cross-app read of SIM-B `ServiceTicket` (app 6ab54d69ae4e36276b900629), `-created_date`, limit 5.
   Newest pre-run: MW-TKT-0012 (2026-11-05T12:03:13Z). Next sequence: MW-TKT-0013.
3. **Compose** — Hill Country Realty (SIMULATED), category `backup`, P2, assigned MW-E-002,
   tags intended `['simulated','daily_ops']`. Topic: nightly image backup failing 3 nights on a
   VSS writer timeout (0x800423F4), last good restore point 2026-11-02.
4. **Write** — `POST /api/apps/6ab54d69ae4e36276b900629/functions/simbWriteOpsTicket`, HTTP 200,
   `{"ok":true,"id":"6aedc2ccde9c420f4367f4c3","ticket_id":"MW-TKT-0013"}`.
5. **False-green guard** — read-back confirms MW-TKT-0013 at the top of `-created_date`,
   `created_at 2026-11-06T12:06:36.255Z`, status `open`, description intact. PASS on ticket_id + today's timestamp.
6. **Stamp** — RateLimitLog created: action_type `simb_daily_ops`, scope
   `simb_daily_ops_feed_2026-11-06`, app_id 6ab54d69ae4e36276b900629, timestamp 2026-11-06T12:06:36Z.
   Read back, 1 record.

## Standing defect, unchanged (carried from 2026-11-05)

The write function persists only a subset of its payload:

| field | sent | stored |
|---|---|---|
| customer_name | "Hill Country Realty (SIMULATED)" | `null` |
| assigned_agent_id | "MW-E-002" | `null` |
| tags | ["simulated","daily_ops"] | `[]` |
| urgency | "2" | `medium` |
| impact | "2" | `low` |

New detail this run: `urgency` and `impact` are coerced from numeric to word values, so a caller
sending the 1-3 scale silently gets a different encoding. MW-TKT-0008 through 0013 store identically.

Consequence unchanged: SIMULATED attribution survives only in the title and the description's first
line. Any surface rendering `customer_name` shows an unattributed ticket, and any `tags: simulated`
filter returns nothing. This is a disclosure erosion path, not a cosmetic gap.

Layer: **gate** (the SIM-B function's field mapping), not payload. Payload was correct for every
field listed. Not remediated: fixing it needs a deploy into the SIM-B app, which this session cannot do.

## Also noted

PROBE2 row (category `bogus_category_for_probe`, priority P9) remains open from the 2026-10-31
schema probe and still sits inside the tuple the sequence counter reads.

No customer-identifiable data, no PHI. Simulated demo material only.
