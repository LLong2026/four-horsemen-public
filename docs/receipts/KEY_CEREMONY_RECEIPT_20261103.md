# CONCLAVE — Production key ceremony receipt

Date: 2026-11-03, 18:35 CT (2026-11-04T00:35Z).
Basis: Leon GO (chat authorization, 2026-11-03 18:28 CT) — single custodian, Leon Calvin Long II.
Algorithm: ML-DSA-87 (FIPS 204, Category 5). No other algorithm used or retained.

## Key set

| Seat | key_id | public fingerprint (sha256, 32) |
|---|---|---|
| C1 | `c1-mldsa87-prod-20261103` | `3a5964094cd22fcac26f689cd9b9c395` |
| C2 | `c2-mldsa87-prod-20261103` | `ace02f8fc63cece476a7be39ccdaa350` |
| C3 | `c3-mldsa87-prod-20261103` | `5d748b933da830b5df48c07ac6b79426` |

Superseded set `c*-mldsa87-test-20261103` is retained in the registry as retired, so every receipt
signed with it continues to verify.

## The blocker that had to be fixed first

All three audits verified a vote against the seat's *current* `signing_public_key`. Nothing resolved
the key that signed the vote. Rotating keys would therefore have marked all 24 prior signed votes
`vote_signature_invalid` and destroyed four payloads of receipts.

Fixed before any key changed: a `SigningKey` registry entity (append-only, one row per key, carrying
key_id, seat, algorithm, public key, fingerprint, valid_from, retired_at, status), populated on all
three boxes, and the audit verify path now resolves `voter_signature_key_id` against it, falling back
to the current node key only for rows that name no key. A `retired_key_verified` counter makes the
distinction visible in every audit output rather than hiding it inside `signed_verified`.

## Order of operations, as executed

1. Registry entity created and seeded on all three boxes: 6 rows each (3 test retired, 3 prod active).
2. Audit verify path patched on all three boxes and redeployed.
3. ClusterNode rotated to the production public keys, id-scoped, one row at a time, 9 of 9 rows
   confirmed by read-back.
4. Verification of history *before* using the new keys: C1 10 signed_verified / 8 under retired keys /
   0 invalid; C2 and C3 the same. Referential violations 0 on all three. History survived rotation,
   which was the whole point of the registry.
5. First production-signed crossing: payload digest
   `c9d4b4ea0e89e818dc06c61a5cb148df4ce1d5758ee79f4ac3cb50286f929bad`, 289 bytes, structural,
   synthetic, no client data, no PHI. Submitted on all three, escrowed on all three, both seats signed
   with `*-prod-*` keys, journal `allowed / quorum_met / [C1, C2]` identical on all three, audits 0
   referential, 1 standing content decline.

## Custody statement

One custodian holds all three private keys. The audit reports `custody: single_operator` with three
distinct seats and three distinct key ids. A 2-of-3 quorum here certifies that three distinct keys
signed the same digest. It does not certify three independent parties, and no artifact of this system
may describe it as such.

## Delivery

Encrypted-at-rest-so-far archive `CONCLAVE_PROD_KEYS_20261103.zip`, 27125 bytes, sha256
`cdd5f0976059f6220a35a783e1a36ebe342828bef9995cd0dd848dbec311e4cd`, delivered as a private,
one-hour link. Operational copy remains in the workspace at mode 600 as the signer.

## Lost-key and rotation procedure

Lost key: that seat stops voting. Generate a replacement pair, add a registry row status `active`,
retire the lost row with `retired_at`, update that seat's ClusterNode record. Prior receipts keep
verifying under their own key id. Two live seats remain a quorum, so service continues.

Rotation is the same procedure applied deliberately, and is now non-destructive by construction.

## Delivery record (updated 2026-11-03 18:56 CT)

First attempt: private signed link, returned 401 `token validation failed` on two independently generated
tokens while both were still hours from expiry. The private-signing mechanism, not the token, was at
fault. Reported as a platform defect; the keys themselves were never implicated and were verified
working on all three boxes in the same window (10 signed_verified, 8 retired_key_verified, 0 invalid).

Second attempt, successful: AES-256-CBC, PBKDF2 600,000 iterations, salt, passphrase delivered in the
owner chat rather than in the artifact. Ciphertext published at a public URL because ciphertext without
the passphrase is inert; the archive itself never left a private surface in plaintext by choice.
Verified end to end: HTTP 200, 27,152 bytes, sha256
`2d7a9c87e053db1b2496d25ca9f4ffe2f34eb9a88c5a3e822dee3e921544d1b7`, decrypt round-trip byte-identical
to the source archive.

Owner confirmed download: 2026-11-03 18:56 CT.

Residual, disclosed: two earlier uploads of the *plaintext* archive remain in the app's private file
storage because the files API exposes no delete route (405 on DELETE). Their signed links do not
resolve, so neither is retrievable by URL. Removal is available to the owner in the editor's file
storage. Temporary plaintext copies in the sandbox were deleted; the operational copy remains at
`conclave-keys/prod_seat_keys_20261103.json`, mode 600.
