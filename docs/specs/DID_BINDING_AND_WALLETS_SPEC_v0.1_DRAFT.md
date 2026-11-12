# DID Binding, Wallets and Form Factors — Spec v0.1 (DRAFT)

Status: draft for Leon review. Not a build order. Pairs with `SQUIRLBOOK_BLUEPRINT.md` (appliance image),
`SQUIRL_ACCOUNT_RECOVERY_CARD.md` (account recovery, no secrets) and the ingest/label/hash receipt path.

Purpose: define how a person's DID is bound to physical media, what the wallet must actually do, and
what has to be true before the three manuals can be written.

---

## 1. Two form factors, one receipt format

| | USB (SQUIRLSTICK) | Box (SQUIRLBOOK, office) |
|---|---|---|
| Primary case | On the go, one machine, price-sensitive | Office, fixed desk, multiple people |
| Software runs | From the stick, nothing installed on the host | On the box |
| Host disk holds | Nothing sensitive | The records |
| Key material | Split, share held by stick | Split, share held by box secure element |
| Record bytes | On the stick, encrypted | On the box disk |
| Receipt output | Identical bytes | Identical bytes |

Rule: a verifier must not be able to tell which form factor produced a receipt. Same canonical
record, same chunk digests, same root, same signature envelope. If the two paths diverge, they are
two products and both have to be tested separately forever.

"Why not the laptop" answer, stated plainly: the laptop is untrusted hardware. It may be stolen,
shared, or already compromised. The stick is the identity, the laptop is a keyboard and a screen.

---

## 2. The binding problem, and the only answer that survives theft

Two failures to hold simultaneously:

- Laptop stolen, stick in the desk drawer. Attacker must not be able to impersonate the owner.
- Stick found in a parking lot, owner's laptop elsewhere. Finder must not be able to impersonate.

A secret that lives wholly on either one fails a case. The answer is a **split secret**:

```
device share  = random 256-bit, sealed to the host TPM (or box secure element), never leaves it
stick share   = random 256-bit, stored on the stick's own controller
signing key   = KDF(device share || stick share), derived in memory, never written to either medium
```

Neither medium holds the key. Both are required. Steal one and you hold half of a secret that has no
independent value.

Custody of the two halves is what makes the $100 claim defensible: replacing a lost stick costs a
stick, not the identity, because the device share was never on it.

Constraints this puts on implementation:

- The derived key exists only in volatile memory for the duration of a signing operation.
- The stick never exposes the share over USB as a plain file. It is read by a small on-stick program
  (or a smart-card style challenge-response), so malware on the host cannot simply copy it.
- A stick whose share has been read out is a burned stick. Any design where the share can be copied
  with `dd` is not this design.
- TPM unavailable (older laptop, most cheap Chromebooks) means fall back to a passphrase-derived
  device share. Weaker, must be labelled weaker in the UI, not silently equivalent.

---

## 3. First move: enrollment receipt, not a watermark

The instinct is that the stick should "watermark" itself on first use. DRM-style self-marking is
weak, because firmware can be reflashed and the mark means nothing to anyone else. What actually
holds is a **signed enrollment event in the append-only registry**:

1. Person registers a DID (public key + method + creation time).
2. They complete one real move: ingest a document, label it, hash it, produce a receipt.
3. That first receipt is co-signed by the DID and records the enrollment: device fingerprint hash,
   stick serial hash, form factor, software version, timestamp.
4. The DID moves to `active`. Before this it is `registered` only.

Why this is better than a watermark: it is public, verifiable by a third party, and it can never be
quietly undone. A reflashed stick produces a new enrollment event, and the old one stays visible
forever. The mark is the history, not the plastic.

Registry entry for rotation (why it must be forward-only, learned the hard way):

```
DID  did:squirl:abc123
  2026-11-14T10:02Z  enrolled   device=d4f1..  stick=9a02..  software=0.1.0
  2027-03-02T18:44Z  rotated    old_key=retired  new_key=...  reason=stick_lost
```

A restore from a recovery stick is a **rotation**, never a silent rebind: old key marked retired in
the same registry we already run for seat keys, new key signed in, both visible permanently. This is
the identical defect that produced eight false forged-vote criticals on the A16 deploy when the audit
verified against the current key instead of the one recorded on the row. Doing it correctly from the
first box costs nothing. Doing it later costs a rewrite.

---

## 4. Wallet requirements (what we specify, not necessarily build)

The wallet is not ours to invent. We specify what a wallet must be able to do before it is allowed to
hold a SQUIRL DID, and we ship a reference implementation only if nothing on the market qualifies.

Required:

1. **ML-DSA-87 signing** (FIPS 204, Category 5). Not Dilithium3, not a pre-standard Falcon. If a
   wallet cannot sign with a post-quantum key, it cannot hold the DID.
2. **DID custodianship** — the DID and its key history live with the owner, not on a server we run.
3. **No plaintext seed export.** A phrase that can be photographed is a phrase that will be.
4. **Revocable device enrollment** — multiple devices under one DID, each revocable individually.
   This is the moveability answer, see §5.
5. **Challenge-response against the stick**, so the host never sees the share.
6. **Offline signing.** No network required to sign a receipt. Networks are for publishing roots.
7. **Verifiable receipts out** — the wallet must be able to hand a third party the bytes to check,
   not just a green checkmark of its own.

Explicitly out of scope for v1: token custody, yield, exchange integration, fiat on-ramps, transfer
of value. Those are the things that drag KYC/AML in (§6).

---

## 5. Moveability — the open problem, stated honestly

The unsolved part is: the stick is bound to a device, and people change devices, travel, and use two
machines. Options, in order of preference:

**A. Second enrolled device under the same DID (recommended).**
Enrolling a second device creates a second `device share` and its own binding event, signed by the
existing key. Both devices work. Each is revocable without touching the other. Losing one does not
break the other, and the registry shows exactly which devices could sign at any time. This gets
travel and office-plus-home without weakening theft resistance at all.

**B. Recovery stick (already planned).** A second stick holding a recovery share, kept in a different
physical place. Restore = rotation, per §3. This is the death-recovery path, not the everyday path.

**C. Portable mode with a passphrase-only device share.** Works on any host, weakest of the three,
must be labelled as such in the UI and in the manual. Reasonable for a shared-computer case, never
the default.

Do not do: a stick that is bound to nothing and works anywhere. That is the lost-stick case with a
friendly interface.

---

## 6. Regulatory scope — the honest version of "no KYC"

The saving is real, and it is structural rather than a loophole: **KYC/AML attaches to moving value
and to holding customer funds, not to attesting records.** While the product does nothing but
ingest, label, hash, sign and publish roots, there is:

- no money transmission, so no state MTL regime and no FinCEN MSB registration,
- no customer funds held, so no BSA program, no CIP, no SAR/CTR obligation,
- no securities offered, so no transfer-agent or broker-dealer question,
- no custody of customer keys, so no qualified-custodian problem.

That is a large, genuine cost avoidance for a small startup, and it is a selling point to a fintech
customer precisely because *their* KYC stays theirs.

Where the line actually sits, stated so nobody is surprised later:

- If a customer puts a transferable token of value into the wallet, the questions belong to whoever
  operates that rail, and adjacency is enough to make us a party in a regulator's reading.
- If we ever accept payment in a way that holds customer funds even briefly, we are in scope.
- Title transfer of land still runs through the county recorder. A receipt is evidence, not a deed.
  Recorded instruments and notarization have their own statutory requirements that a hash does not
  satisfy.
- A fintech or licensed institution buying this will send a security questionnaire. Not KYC, but the
  same procurement muscle, and it should be answered from the architecture (keys never leave the
  customer), not from policy language.

The claim that survives a lawyer: *we never take custody of value or of customer keys*. That one is
architecturally true and defensible. "We are not regulated" is not a claim to make out loud.

---

## 7. WASM — right layer, wrong layer

Worth being precise, because it is easy to oversell.

Right layer: document handling. Every ingested file is untrusted input. PDFs, Office files and scans
are the most attacked surface in this entire product. A WASM module gives a memory-safe, sandboxed,
deterministic parser that behaves identically on every host class, which is exactly what a receipt
needs (same input, same digest, any machine). Labeling, chunking and hashing all belong here.

Wrong layer: key custody. A WASM module in a browser runs in memory the page owner controls, and
anything the module can compute, they can debug. WASM does not protect a key; a TPM, a secure
element, or the stick's own microcontroller does.

So: WASM for parsing and hashing, hardware or on-stick for signing, and the two meet at a narrow
interface that passes a digest one way and a signature back. That interface is worth writing down as
its own contract before any code exists.

---

## 8. The document set (three manuals, one source)

All three derive from one master spec so they cannot drift. Draft outline:

**HOW TO (marketing + first run, ~4 pages)**
What the receipt proves and does not prove. What you need (machine, stick, wallet). The first hour:
register DID, set up wallet, ingest one document, prove it, move it once. What "activated" means.

**End-user instruction manual (product doc, illustrated)**
1. Register your DID.
2. Set up your wallet (which types, what to refuse, seed handling).
3. Do your first move (ingest → label → hash → receipt).
4. Activation: your enrollment receipt is signed and your DID goes live.
5. Adding a second device.
6. Losing a stick, losing a laptop, replacing a machine.
7. What to do when a receipt fails to verify.
8. What the merkle root proves (committed, included, unaltered since) and does not (it does not
   contain the bytes; the stick or box does).

**DevOps manual (operator doc)**
Image build and versioning, image hash per release, enrollment/rotation registry operations, recovery
drills, key ceremony and custody, backup and restore verification, upgrade and rollback, telemetry
and self-heal receipts, escalation paths, and the standing rule that a repair which cannot verify
reports rather than papers over.

---

## 9. Corrections flagged in existing docs

- `SQUIRLBOOK_BLUEPRINT.md` §3 states the PQC posture as "Dilithium3 / Kyber-1024 / SPHINCS+-256f".
  Current canon is **ML-DSA-87** (FIPS 204), **ML-KEM-1024** (FIPS 203), AES-256, SHA-384/512, and
  **SLH-DSA is not approved for NSS use**. That line needs a forward-only amendment before the
  blueprint is handed to anyone outside.
- Same doc still says "8 patents pending"; the standing count is 13.

## 10. Open questions for Leon

1. Second enrolled device vs recovery stick as the default travel story? (Spec recommends second
   device as everyday, recovery stick as death-only.)
2. Passphrase fallback for machines with no TPM: allowed at all, or refuse and require TPM?
3. Is the stick hardware ours (custom controller) or off-the-shelf with our firmware? Cost and
   security diverge sharply here.
4. Does the box ship with the software pre-enrolled, or does every box require the same first-move
   activation as a stick?
