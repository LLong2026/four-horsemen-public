# helix_scan v0.5 — Live Run Finding and Evidence Fix (2026-10-29)

First live v0.4 run on the machine, 2026-10-29T21:03:19Z. Hash verified on the user side.

## What v0.4 got right

- File hash matched exactly: D0C4EB887226F20FCA1E2FC01475B98CD1E21F5E1C21015E1166BB35E18668C4
- Both playbook names stamped into the report.
- Gate refused both apps, 0 authorized. steam_client_running true, so the deny was correct
  and the fail-closed path worked on live data for the first time.
- Protection class read as none_detected for both, which is the honest reading: no
  anti-cheat directory exists, and VAC has no disk footprint to find.
- Zero writes. Common Redistributables resolved cleanly, no false missing alert.
- plan_digest e3b0c442...b855 is the SHA-256 of empty input: zero findings, correct.

## What v0.4 got wrong

The report contained no app list. An empty plan plus an empty-input digest is
indistinguishable from a scanner that enumerated nothing, so the run cannot evidence
SP-PB-002 verification step 2 ("every installed app appears, including clean ones").
A clean machine and a broken scan produced identical output. That is the same class of
defect as the historical false-green: the absence of a finding was being read as proof
of health without any measurement behind it.

## v0.5 fix

app_inventory: one row per installed app, emitted unconditionally, carrying app_id, name,
library, raw and decoded StateFlags, depot_count, declared bytes and MB, measured bytes
and MB, drift percent, gate verdict, findings count. apps_installed count added at top level.
Scanner identity string corrected to match the filename.

## Verification

21 of 21 rule checks pass in the Python parity harness, including three new ones:
a clean app still appears with drift_pct 0.0 rather than being omitted, an empty plan
digest is confirmed as sha256(""), and a refused app is inventoried with its verdict.

## Not verified

Still no PowerShell runtime in the sandbox: syntax checked structurally (208 braces,
balanced), logic verified through the mirror, execution unverified. v0.5 has not been run.

## Acceptance check for the next run

app_inventory must contain 218620 PAYDAY 2 with depot_count 5 and declared_mb near 35,482
(the per-depot sum established on 2026-10-29), actual_mb matching it, drift_pct 0.0 or
near, and state_flags_text showing whether the stuck update ever finished. If depot_count
comes back 0, the InstalledDepots parse failed on the real ACF and SP-PB-002 is not measuring.
