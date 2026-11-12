# SIM-B Daily Ops Feed — Receipt 2026-11-10 (UTC)

Run at 2026-11-10T12:15Z / 06:15 CT.

## Steps

1. **Idempotency** — hub RateLimitLog scope `simb_daily_ops_feed_2026-11-10`: zero records before the run. Proceeded.
2. **Read** — cross-app read of SIM-B `ServiceTicket` (app 6ab54d69ae4e36276b900629), `-created_date`, limit 5.
   Newest pre-run: MW-TKT-0016 (2026-11-09T12:14:30.444Z). Next sequence: MW-TKT-0017.
3. **Compose** — Mirror West IT Services (SIMULATED), category `software`, P3 / medium urgency / low impact,
   assigned MW-E-003, tags intended `['simulated','daily_ops']`. Topic: QuickBooks Desktop company file
   flipping to single-user mode after RDS session-host reboots; the reset drops mapped drives, the
   database server manager stops advertising the company file, next user gets the read-only prompt;
   lock-file clear plus service restart restores multi-user for a few hours. No change without a backup
   confirmation.
4. **Write** — sanctioned path only: `asServiceRole.functions.invoke('simbWriteOpsTicket', ticket)` via
   `@base44/sdk` against app 6ab54d69ae4e36276b900629. Ticket landed.
   Note on the two failed routes, recorded so the next run does not repeat them:
   - Direct REST `POST /api/apps/6ab54d69ae4e36276b900629/functions/simbWriteOpsTicket` with
     `BASE44_API_KEY` returned `ContainedAppNotFoundError` / HTTP 404. That key is scoped to the Julia
     agent app 69b57683f2623117603736bc and cannot see the SIM-B app over REST.
   - The SDK invoke itself succeeded, but the wrapper script threw when JSON-serialising the SDK response
     (`Converting circular structure to JSON`, the http.ClientRequest circle). That is a response-handling
     fault in the script, **not** a write failure. Confirmed by read-back, step 5.
5. **False-green guard** — cross-app read-back, newest record: ticket_id `MW-TKT-0017`,
   `created_at 2026-11-10T12:15:12.759Z`, status `open`, category `software`, priority `P3`,
   urgency `medium`, impact `low`, title and description intact. **PASS** on ticket_id + today's timestamp.
6. **Stamp** — RateLimitLog created: action_type `simb_daily_ops`, scope `simb_daily_ops_feed_2026-11-10`,
   app_id 6ab54d69ae4e36276b900629, timestamp 2026-11-10T12:15:12Z.
7. **Alerting** — write landed, guard passed. Silent run per spec. No PlatformAlert raised, no message sent.

## Standing defect, unchanged (carried from 2026-11-05 through 2026-11-10)

The write function persists only a subset of its payload:

| field | sent | stored |
|---|---|---|
| customer_name | "Mirror West IT Services (SIMULATED)" | `null` |
| assigned_agent_id | "MW-E-003" | `null` |
| tags | ["simulated","daily_ops"] | `[]` |

MW-TKT-0008 through MW-TKT-0017 store identically on the three dropped fields.

Consequence unchanged: SIMULATED attribution survives only in the title and the description's first
line. Any surface rendering `customer_name` shows an unattributed ticket, and any `tags: simulated`
filter returns nothing. Disclosure erosion path, not cosmetic.

Layer: **gate** (the SIM-B function's field mapping), not payload. Payload was correct for every field
listed. Not remediated: fixing it needs a deploy into the SIM-B app, which this session cannot do.

## Also noted

PROBE2 row (category `bogus_category_for_probe`, priority P9) remains open from the 2026-10-31 schema
probe and still sits inside the tuple the sequence counter reads. Sequence numbering is contiguous
against a counter, not against a clean ticket set.

## Backlog at run time (record only, no alert by mandate)

19 tickets in the entity, 11 `open` after this write. Past the 7-day desk-fault line: MW-TKT-0007
(P3, created 2026-10-27) and PROBE2 (P9, created 2026-10-31). MW-TKT-0009 (2026-11-01) is at the line.
Sequence gap remains: no ticket exists for 2026-11-02.

No customer-identifiable data, no PHI. Simulated demo material only.
