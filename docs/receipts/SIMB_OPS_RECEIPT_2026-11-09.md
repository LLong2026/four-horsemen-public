# SIM-B Daily Ops Feed — Receipt 2026-11-09 (UTC)

Run at 2026-11-09T12:14Z / 06:14 CT.

## Steps

1. **Idempotency** — hub RateLimitLog scope `simb_daily_ops_feed_2026-11-09`: zero records before the run. Proceeded.
2. **Read** — cross-app read of SIM-B `ServiceTicket` (app 6ab54d69ae4e36276b900629), `-created_date`, limit 5.
   Newest pre-run: MW-TKT-0015 (2026-11-08T12:07:38Z). Next sequence: MW-TKT-0016.
3. **Compose** — Hill Country Realty (SIMULATED), category `network`, P3, assigned MW-E-002,
   tags intended `['simulated','daily_ops']`. Topic: site-to-site IPsec tunnels rekeying hourly
   instead of on the 8h lifetime; phase 2 fails once then succeeds on retry; satellite-office
   mapped drives and listing-photo share drop for 30-90s per cycle; remote client-VPN users unaffected.
4. **Write** — `POST /api/apps/6ab54d69ae4e36276b900629/functions/simbWriteOpsTicket`, HTTP 200,
   `{"ok":true,"id":"6af1b926a699d54808b78969","ticket_id":"MW-TKT-0016"}`.
5. **False-green guard** — cross-app read-back, newest record: ticket_id `MW-TKT-0016`,
   `created_at 2026-11-09T12:14:30.444Z`, status `open`, category `network`, priority `P3`,
   title intact. PASS on ticket_id + today's timestamp.
6. **Stamp** — RateLimitLog created: action_type `simb_daily_ops`, scope `simb_daily_ops_feed_2026-11-09`,
   app_id 6ab54d69ae4e36276b900629, timestamp 2026-11-09T12:14:30Z, id `6af1b9433a816431e9c2e575`.
   Read back, 1 record.
7. **Alerting** — no write failure, no guard failure. Silent run per spec. No PlatformAlert raised.

## Standing defect, unchanged (carried from 2026-11-05, 11-06, 11-07, 11-08)

The write function persists only a subset of its payload:

| field | sent | stored |
|---|---|---|
| customer_name | "Hill Country Realty (SIMULATED)" | `null` |
| assigned_agent_id | "MW-E-002" | `null` |
| tags | ["simulated","daily_ops"] | `[]` |

MW-TKT-0008 through MW-TKT-0016 store identically on the three dropped fields.

Consequence unchanged: SIMULATED attribution survives only in the title and the description's first
line. Any surface rendering `customer_name` shows an unattributed ticket, and any `tags: simulated`
filter returns nothing. Disclosure erosion path, not cosmetic.

Layer: **gate** (the SIM-B function's field mapping), not payload. Payload was correct for every
field listed. Not remediated: fixing it needs a deploy into the SIM-B app, which this session cannot do.

## Also noted

PROBE2 row (category `bogus_category_for_probe`, priority P9) remains open from the 2026-10-31
schema probe and still sits inside the tuple the sequence counter reads. Sequence numbering is
therefore contiguous against a counter, not against a clean ticket set.

## Backlog at run time (for the record, no alert by mandate)

18 tickets in the entity, 10 `open` after this write. Past the 7-day desk-fault line: MW-TKT-0007
(P3, created 2026-10-27) and PROBE2 (P9, created 2026-10-31). MW-TKT-0009 (2026-11-01) is at the line.
Sequence gap noted: no ticket exists for 2026-11-02.

No customer-identifiable data, no PHI. Simulated demo material only.
