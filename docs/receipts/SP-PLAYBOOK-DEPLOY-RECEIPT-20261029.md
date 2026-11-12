# SteamPulse Playbook Deployment — Receipt 2026-10-29

Leon GO (chat authorization, 2026-10-29 15:57 CT). Read-only playbooks for a local Steam host. No game file, memory, or anti-cheat surface is touched by either record.

## Deployed

Entity `Playbook` created in SteamPulse (app 6ae3a2559823504fbd08ed08). Data-only addition: no existing entity, page, or record modified, no automation, workflow, or function attached.

| Code | Name | Tier | Writes | Record id |
|---|---|---|---|---|
| SP-PB-001 | Modification Refusal Gate | guard (safety floor) | no | 6ae3b347a421f5fbf8afc99f |
| SP-PB-002 | Depot Drift | detect_only | no | 6ae3b347a421f5fbf8afc9a0 |

Source definition: `SP-PLAYDEF-001-002.json`, sha256 e96b6e2631320c51754be50c0941401b6ca12cdcf278df93f4ce5bc6d1b3512f.

## Verified

- Read back both records: code, name, anomaly_type, tier, writes_anything false, trigger, steps and verification steps match the source definition byte for byte.
- Both created by the owner account, status active, version 1.0.
- Existing data intact: SteamGame still holds PAYDAY 2 (218620, healthy, 0.0 drift) and Steamworks Common Redistributables (228980, healthy, 0.0 drift).
- Nothing in the app was deleted, repointed, or rewritten.

## Semantics worth keeping straight

SP-PB-001 is a gate, not a repair. Its correct output is usually a refusal, and a refusal counts as a completed run. Unknown protection class is treated as protected, so the default answer is no.

SP-PB-002 is a measurement, not a fix. It reads per-depot declared bytes and compares them to per-depot on-disk bytes. The stale SizeOnDisk header is explicitly forbidden as a source, because it once produced a false 1.2 GB excess on PAYDAY 2 by omitting soundtrack DLC depots.

## Not deployed

No repair-tier playbook exists yet. Shader Cache Reclaim, Depot Cache Sweep, Stuck Download Requeue and Save Conflict are specified but not written into the app, because each moves or deletes something and wants its own gate review first.

No scanner wiring. The records describe the playbooks; the PowerShell scanner does not yet emit findings against SP-PB-002's per-depot tolerance or check SP-PB-001 before acting.
