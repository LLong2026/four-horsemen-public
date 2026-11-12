# Fleet Sync Pulse receipt — slot 2026-11-10T05:00Z

Signature: eight_app_sync_pulse_2026-11-10T05:00Z
Stamp written first (RateLimitLog idempotency_stamp, 2026-11-10T05:00:00Z), before any fleet read.
Result: CLEAN. 11 of 11 manifests landed. No alert raised.

## Measurements (both, never merged)
- Autonomous telemetry: 4 of 11 under 2h (Conquest 1.0h; Wisemen 1/2/3 under 0.1h).
  7 of 11 sit at 40.7h (Nov 8 12:24Z batch), inside the <72h band.
- Runtime reachability: 11 of 11 read_ok.
- Fleet mean 80.9 over 11 members. That mean is the age ladder, not health: 8 of 11
  self-reports are dated 2026-10-02 or earlier.
- overall_status TELEMETRY_BLIND (mean below 50 threshold is not the trigger here; the
  label is carried because 7 of 11 channels are stale beyond 24h and the self-reports
  are unusable as evidence).

## Per member (ladder score)
SIM-B-Hub 70 | Conquest 100 | War 70 | Famine 70 | Death 70 | Corral 70 |
Hypervisor 70 | Technician 70 | Wiseman 1 100 | Wiseman 2 100 | Wiseman 3 100

Active anomaly sum 10 (War 5, Corral 5, all others 0). Commissioning count 0: all three
Wisemen carry WISEMAN-N-2026-11-09 CONTAINED stamps (13:02-13:04Z Nov 9).

## Writes
- 11 HealthManifest (generated_at 2026-11-10T05:00:00Z), read back = 11, has_more false.
- 11 ConnectedApp rows refreshed by record id, modified_count 1 each.
- 1 SystemHealth rollup PULSE-SYNC-2026-11-10T05:00Z.
- RateLimitLog: idempotency_stamp, freeze_skip (battery_model_pin).

## Watchdog and lateness
- SIM-B ops: newest ServiceTicket MW-TKT-0016 created 2026-11-09T12:14:30Z, 16.9h old.
  Stream ACTIVE. No alert, no stamp.
- Lateness: previous pulse stamp 2026-11-10T03:08Z, gap 1h52m (<3h). No gap alert.
