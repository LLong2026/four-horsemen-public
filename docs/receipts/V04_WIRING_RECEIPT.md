# helix_scan v0.4 — Playbook Wiring Receipt (2026-10-29)

Leon GO (chat authorization, 2026-10-29 15:59 CT). SP-PB-001 and SP-PB-002 wired into the scanner.

## Artifacts

| File | sha256 |
|---|---|
| helix_scan_v0.4.ps1 (650 lines) | d0c4eb887226f20fca1e2fc01475b98cd1e21f5e1c21015e1166bb35e18668c4 |
| parity_v04.py | 80ba18942221fda3f452cc50fd3021bf9273d7b82efae53072ee705ed1969371 |

v0.3 is untouched and still present. v0.4 is the script to run.

## What SP-PB-001 does now

The gate runs per app and its verdict is stamped into the report. Deny list, evaluated before any judgement:

- install path missing
- path outside the declared library root, or crossing a reparse point (symlink/junction)
- Steam client running (it rewrites library state concurrently)
- any kernel anti-cheat directory present (EasyAntiCheat, EasyAntiCheat_EOS, BattlEye)
- appid not explicitly allowlisted via -AllowWriteAppIds

VAC has no on-disk footprint, so an app with no anti-cheat directory reads as none_detected, never clean. That is why the allowlist exists: nothing is writable by default. When the gate refuses, any repair-tier policy on that app is rewritten to report_only with the deny reasons attached, so a protected app cannot carry a repair recommendation into a downstream tool.

## What SP-PB-002 does now

Depots are enumerated individually from InstalledDepots with their declared bytes, mounted and shared depot blocks are excluded, and a roster hash is computed over the sorted depot set. A new -StateFile carries the last ACF mtime and roster hash between runs, so a depot appearing or vanishing, or a manifest rewritten after the last scan, becomes its own finding instead of hiding inside a size number.

Honest limit, now recorded on the playbook itself: Steam unpacks every depot into one shared common/<installdir>. Declared bytes are per depot, measured bytes are per app. There is no per-depot disk measurement to take, and the record no longer claims one.

## Verification

16 of 16 rule checks pass in the Python parity harness against filesystem fixtures:

1. depots enumerated individually
2. declared total sums per depot, never the SizeOnDisk header
3. SizeOnDisk header ignored
4. roster hash deterministic across parses
5. roster hash order-insensitive
6. unproven app refused (fail-closed)
7. absent anti-cheat reads as none_detected, not clean
8. allowlisted clean app authorized
9. anti-cheat refuses regardless of allowlist
10. Steam running refuses
11. corrupt flag survives but policy downgraded to report_only
12. drift under the absolute floor stays silent
13. drift fires with no absolute floor
14. roster change flagged
15. mounted depots excluded from the declared sum
16. larger-of tolerance requires both conditions

## Not verified

No PowerShell runtime exists in this sandbox. The script's syntax was checked structurally (braces and parentheses balanced, single definition per function) and its logic was verified through the Python mirror, but it has not been executed. First real run is on the machine:

    powershell -ExecutionPolicy Bypass -File helix_scan_v0.4.ps1 -OutFile scan.json -StateFile helix_state.json

Expect PAYDAY 2 to come back gate verdict "refused" with reason app_not_allowlisted, and no repair policy anywhere. That is the gate working, not a fault. Add -AllowWriteAppIds 218620 only when you actually intend to authorize a repair.

## Note

Steam was mid-update on PAYDAY 2 at 0.5 percent. Until that download finishes, the update_in_progress hold suppresses drift judgement on that app by design.
