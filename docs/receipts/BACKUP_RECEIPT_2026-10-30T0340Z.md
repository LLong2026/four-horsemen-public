# Hub Backup Receipt — 2026-10-30T03:40Z

Snapshot ID: `HUB-STATE-2026-10-30T0340Z`
Snapshot digest: `b6e1bb914ab5e982ce2d716a8224fccc9b54dcd3b2ac77e7a0820672f090f0cc`
Entities covered: 59
Records covered: 20,729
Taken by: Gabriel, on Leon's instruction ("make a backup of the system in this state"), 2026-10-29 22:25 CT.

## What the backup consists of

1. **Byte archive of configuration** — `.agents/` (rules, skills, identity, MCP config) and
   `base44/` (workflows, entity schemas, connectors).
   `hub-state-20261030T032541Z.tar.gz`, 199,699 bytes, 294 entries
   sha256 `e5f8980813a63651b2ae728858627ce6c6a02bc5e614087b489d7ae259a77020`

2. **Byte archive of workspace source and documents** — `functions/` (45 files, every
   deployed function's source), `notes/`, `docs/`, `playbook/`, and top-level Markdown.
   Binary artifacts (ISO, zip, pdf, pptx, xlsx, mp4, wav, png, jpg, docx) and `incoming_files/`
   are excluded by design; the archives are text and code.
   `hub-workspace-20261030T032541Z.tar.gz`, 485,158 bytes
   sha256 `2a5df875e908bbeeb8800c94eed16718e83f713bf4c46243f527e45eb45f2af8`

3. **Entity-state fingerprints** — one `BackupManifest` row per entity carrying its record
   count and SHA-256 over the canonical serialisation of every record, sorted by id. Query
   them with `snapshot_id = HUB-STATE-2026-10-30T0340Z`. This is the part that lets anyone
   prove later what this state was without trusting a summary.

Both archives are stored private (owner-only), never public.

## Verification procedure

Call `exportHubSnapshot` with `{ dryRun: true }` and compare digests per entity.

- A **match** proves that entity has not changed since 03:40Z.
- A **mismatch** proves it has changed. It is not evidence of corruption, and the current
  digest is not evidence of a fault. State the difference, name the entity, and only then
  ask whether the change was expected.
- Entities that write continuously (heartbeats, rate limits, manifests, anomalies) will not
  match within minutes. That is the system working. Compare the entities that should be
  frozen (playbooks, customers, wallet registry, policies) when testing the instrument.

Reproducibility was proven before the snapshot was written: two dry runs 60 seconds apart
returned the identical snapshot digest `6317dfebe8eafcf1b076c68592d6b41a8eac6e51a2fba4ea23ef0a587ed8fd48`.
The applied snapshot reads `b6e1bb91…` because one record landed in a live entity between
the proof runs and the write. Both facts are recorded rather than smoothed.

## A failed instrument, kept on purpose

The first attempt, snapshot `HUB-STATE-2026-10-30T0325Z` (59 rows, digest `e23e760f…`), is
retained and marked superseded. It paginated on `created_date`, where bulk-inserted records
share a timestamp, so skip-based paging served some records twice and stepped over others.
Its digests therefore described the pagination rather than the data, and two runs minutes
apart disagreed about unchanged entities. The fix was to paginate on `id` and de-duplicate,
with every duplicate dropped reported. The superseded rows stay in place as the sample that
exposed the flaw, not deleted to tidy the record.

## What this does not cover

- The 65 roster rows whose pre-incident values were destroyed remain unknown and are marked
  as such. A backup cannot restore data that was lost before it was taken.
- Live entity writes after 03:40Z are not in the snapshot; the digests describe the moment.
- Content of the excluded binaries is not archived. If any ISO, deck, spreadsheet or image
  matters, say which and it gets its own archive.
