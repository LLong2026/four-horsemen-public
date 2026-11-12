# DID DESIGN v0.1 — identity that can be checked, not asserted

Attesta · SQUIRL OS · 2026-11-10
Status: first slice specified for implementation. Levels 2 and 3 are policy, not code, and require a human decision.

## 1. What problem this solves, stated without flattery

Today the vault knows a title, a digest, and an email address. An email address is a claim, not a credential: it is typed by whoever fills the form, it is not signed, and nothing stops two people from using the same one. So the vault can currently prove that a record has not changed. It cannot prove who sealed it, and it cannot prove that the party who acknowledged receipt is the party who was meant to.

A DID fixes exactly that, and nothing more: it makes a signer's key discoverable and self-certifying, so a signature on a pack or an acknowledgment can be verified later by a stranger, offline, without calling Attesta. It does not establish who a person legally is. That distinction is the spine of this document.

## 2. Method choice, and why the obvious alternatives are refused

Chosen: **did:key** as the per-person identity, **did:web** as the optional organizational identity.

- `did:key` needs no registry, no network, no chain, no account. The identifier *is* the public key, encoded. Verification is pure arithmetic: decode the DID, get the key, check the signature. That fits a classroom where thirty students have no wallets and no patience, and it fits an offline archive that must still verify in ten years.
- `did:web` is a DID whose document is served from `https://<domain>/.well-known/did.json`. It binds an identity to control of a domain, which is the strongest claim this system can make without a legal review. Used for the organization, not for individuals.

Refused, and the refusal is policy:

- Chain-anchored DID methods (did:ion, did:ethr, did:sol, did:pkh and relatives) require a live chain and, in several cases, a funded key. That collides directly with the standing chain-usage posture for this app and adds a dependency with no benefit that did:key does not already provide.
- Any "DID registry" hosted by Attesta alone. A registry that only its operator can read is a database with a fashionable name, and it would recreate the trust problem it claims to solve.

## 3. Identifier construction

Key type: ECDSA P-256 (already generated in-browser by the Settings key panel, non-extractable private key, public key exportable).

DID: `did:key:z<base58btc(0x80 0x24 || compressed_point_33_bytes)>`

- `0x1200` is the multicodec code for p256-pub; as an unsigned varint it encodes to bytes `0x80 0x24`.
- The compressed point is 33 bytes: one parity byte, then X.
- `z` is the multibase prefix for base58btc.
- The fragment is `#key-1`, so a verification method id reads `did:key:zDnae...#key-1`.

Reference implementation lives in the app as `did.js`, with a selftest that encodes a known key and checks the round trip. No dependencies.

## 4. DID document, generated locally

```json
{
  "@context": ["https://www.w3.org/ns/did/v1"],
  "id": "did:key:zDnae...",
  "verificationMethod": [{
    "id": "did:key:zDnae...#key-1",
    "type": "JsonWebKey2020",
    "controller": "did:key:zDnae...",
    "publicKeyJwk": { "kty": "EC", "crv": "P-256", "x": "...", "y": "..." }
  }],
  "authentication": ["did:key:zDnae...#key-1"],
  "assertionMethod": ["did:key:zDnae...#key-1"],
  "capabilityInvocation": ["did:key:zDnae...#key-1"]
}
```

Downloadable as JSON from the identity panel. It is derived, never stored as truth: any verifier can regenerate it from the DID string alone, which is the point of a self-certifying identifier.

## 5. Signing contract

Two things get signed, and both signatures bind to a digest, never to a human-readable string.

- **Pack seal.** Signed payload: the canonical pack JSON exactly as it is hashed for `pack_digest`. Domain separator prefix `attesta/pack/v1\n`.
- **Acknowledgment.** Signed payload: `ack_digest = sha256(canonical({record_digest, transfer_ref, statement, kind, did_of_signer, sequence}))`. Domain separator `attesta/ack/v1\n`. Signing a digest rather than the fields prevents the signature from being lifted onto a different statement later.

Stored per signature: `signer_did`, `signer_key_id`, `algorithm` (ES256), `signature_b64` (raw r||s, 64 bytes, not DER), `signed_payload_digest`, `key_version`, `signed_at`.

Verification is offline: rebuild the DID document from the DID string, rebuild the payload from the record, verify. Three states only: `VALID`, `INVALID`, `UNVERIFIABLE` (key not decodable, algorithm unknown, or payload fields missing). Never a fourth state that means "probably fine".

## 6. Binding levels, the ladder from cryptography to a legal person

Each level is a separate, visible claim. The vault never merges them into a single badge.

- **L0 self-asserted.** A DID exists and controls a key. Proves key control. Nothing else.
- **L1 mailbox control.** The DID signed the acknowledgment from a link delivered to an address, and that address received a working token. Proves control of a mailbox at a moment in time. Not that the person is who they say they are.
- **L2 domain control.** `did:web` document resolves at the claimed domain and lists the same key. Proves control of a domain. This is the strongest non-legal binding available, and it is the one that matters for institutions.
- **L3 legal entity.** An officer of a named legal entity signed under an instrument that identifies the entity (EIN or DUNS reference, jurisdiction, officer capacity). **Human-approved, never automated.** Requires Leon's explicit sign-off per binding; no code path may grant L3.

The honest sentence for the UI, and it should appear wherever a badge does: *a DID proves control of a key. Legitimacy comes from what that key is bound to, and from the law that applies to the record.*

## 7. What enforcement actually means here, concretely

The vault enforces at the state machine, not in prose:

1. A transfer cannot reach `complete` until both DIDs have signed their half. No signature, no completion, no receipt. This is the difference between a form and an instrument.
2. A pack cannot be sealed as `dual_signed` unless the sealer's signature verifies against the sealer's DID at verification time. A stored signature that fails verification renders the pack `SIGNATURE_INVALID` and blocks export of a clean receipt.
3. Acknowledgment signatures carry the digest they signed. If the record's digest changes afterwards, the signature is `STALE` and the transfer shows it plainly rather than silently re-pointing.
4. The receipt prints both DIDs, both key ids, both payload digests, and the verification result. A stranger can check it without Attesta being online or cooperative.

## 8. Rotation and revocation, without a registry

- The key panel supports rotation: generate a new key, sign a rotation statement with the old key (`attesta/rotate/v1\n` over old_did || new_did || nonce), store both, and mark the old key `retired_at` while keeping it verifiable forever.
- Signatures made before retirement remain valid, and the record states the key version used. Retiring a key does not retroactively invalidate history, because history is what happened.
- Revocation of a *binding* (not a key) is an explicit row: `revoked_at`, `revoked_by`, `reason`. The receipt of a revoked binding still verifies; the binding is shown as revoked with its date.
- No CRL, no OCSP, no live lookup. A revocation file may be exported and signed so a verifier can check it offline.

## 9. Threat model, what a DID kit does not fix

- **Key theft.** Whoever holds the private key acts as that DID. Non-extractable browser keys reduce casual export, not malware.
- **Coerced signing.** A signature proves the key moved, not that the signer was free or understood. Undue-influence claims live outside this system.
- **Malicious counterparty.** A valid DID signs a false statement perfectly well. The signature dates the assertion; it does not vouch for it.
- **Legal capacity.** A minor, an entity in dissolution, or someone without authority can hold a valid DID. Only L3 with human review, and the applicable law, address capacity.
- **Lost keys.** No recovery agent exists in this build. A lost key means a new DID, and every historical signature remains attached to the old one.

## 10. What must never be said, in any interface or document

- "Verified identity." Say "key control verified."
- "Legally binding" as a blanket claim. Say what the signature does and let the applicable law be named.
- "Notarized." A DID is not an officer, a seal, or a journal entry.
- Any level badge implying L1 or L2 is a legal identity. L3 is manual, named, and dated, or it does not exist.

## 11. Slice 1, what gets built now

- `did.js`: DID encode/decode, DID document build, ES256 sign/verify over a digest, selftest.
- Identity panel in Settings: DID string, copy, DID document download, key version, rotation button.
- Signing on pack seal and on acknowledgment, with the stored fields in §5.
- Verification badge on the record, the transfer, and the receipt: VALID / INVALID / UNVERIFIABLE / STALE, with the DID shown beside it.
- Receipt prints both DIDs and both key ids.
- No L3 anything. No chain. No registry. No network call except an optional did:web fetch that is off by default.

## 12. Open decisions for Leon

1. Whether did:web is offered at all in the student labs, or kept for the institutional tier only.
2. Whether L3 is ever granted in this app, or if it stays a manual annotation recorded outside it.
3. Whether the acknowledgment signature becomes mandatory for completion, which changes existing transfers to "incomplete until signed".
