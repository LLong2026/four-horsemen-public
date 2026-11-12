# JASPEROS — ISO Build Spec v1.0 (STAGED — build starts after Oct 1 chaos fire)

> **JasperOS — powered by SQUIRL OS.** A deterministic, purpose-built operating system image
> guaranteed to run the Jasper Box boot sequence identically every time. This spec stages the
> build; execution gate = Oct 1 chaos fire receipted + Leon GO.
>
> Status: SPEC ONLY. Nothing in this file has been built yet. No benchmarks claimed yet.

## 1. What this is (and is not)

- **Is:** a minimal, immutable-boot Linux image where the Jasper runtime IS the operating
  environment: kernel hands control straight to Jasper as PID 1. No desktop, no shell, no
  package manager, no services we do not choose.
- **Is not:** a from-scratch kernel (Steam/Valve lesson: SteamOS is Arch underneath — the
  differentiator is owning the stack ABOVE the kernel, not writing a kernel).
- **Is not:** production-ready. Prototype disclaimer verbatim on boot splash and every surface.
  Buyers complete production hardening themselves (tier doctrine).

## 2. Why (the guarantee Leon is buying)

The problem with the current local-install rail is determinism risk: a general-purpose host can
drift a thousand ways. JasperOS removes the host: pinned kernel, pinned packages, no state,
Jasper as init. "Runs in the Jasper Box as the test pilot every damn time" becomes a
**checksummed receipt**, same standard as SDR-1 (0xc5f88dcf parity discipline).

## 3. Build approach

- **Buildroot** (chosen over Yocto for round 1: smaller, faster first image, single .config).
  Round 2 may move to Yocto if board support demands it.
- **Pinned everything**: exact kernel version (LTS), exact package versions, build from a
  locked source tree committed to the public repo (provenance standard = repo commit BEFORE
  execution, per doctrine; falsifier spec committed before first build).
- **Jasper runtime as PID 1**: a small Rust static binary (`jasper-init`) that mounts /ro,
  runs integrity self-check (image checksum), verifies the PQC-signed lineage certificate,
  then hands control to the Jasper Box boot sequence ("Jasper Begin"). Fail any check =
  fail closed, no boot into setup.
- **Immutable root**: read-only squashfs; per-boot RAM overlay. No persistence between boots
  except the receipts partition (append-only, same doctrine as the ledger).
- **Boot chain**: UEFI + BIOS dual target for round 1 (QEMU/OVMF + VirtualBox test matrix).
- **PQC only**: lineage certs signed Dilithium3 / Kyber-1024 / SPHINCS+-256f. Never non-PQC.

## 4. Determinism receipts (the product)

1. **ISO build receipt**: two clean builds from the same tree = byte-identical ISO,
   sha256 recorded. Build script logs every input (toolchain, config, source hash).
2. **Boot receipt**: boot in QEMU + VirtualBox → identical boot audit trail (stage timings
   to ms, checksum of loaded rootfs, Jasper Begin handshake hash).
3. **Lineage receipt**: every ISO carries a PQC-signed lineage certificate registered to
   the Hub (extends the Phase 3 distributor model — no unsigned boxes, ever).

## 5. Build pipeline (staged, credit-budgeted)

| Phase | Work | Wall-clock | Message credits (est.) |
|---|---|---|---|
| A | Repo tree, pinned Buildroot config, jasper-init skeleton | 1-2 days | ~10 |
| B | First bootable ISO (Jasper splash + init + self-check) | 2-3 days (compiles run idle in tmux, near-zero credit) | ~15 |
| C | Determinism receipts: rebuild-verify, QEMU/VBox boot matrix | 2-3 days | ~15 |
| D | PQC lineage cert + Hub registration wiring | 1-2 days | ~10 |
| E | Receipt + ledger entry + spec-falsifier write-up | 0.5 day | ~10 |

Total: ~60 message credits of the ~240/month budget; wall-clock 1.5-2 weeks with compiles
running unattended. Integration credits: negligible (all local sandbox). Cannot realistically
stop mid-build from credit exhaustion; build state persists in files, any session resumes.

## 6. Gates

- **GO gate**: Oct 1 chaos fire receipted + Leon GO. Build does not preempt Oct 1/Oct 7.
- **First ISO demo**: target between Oct 1 and Oct 7 — spec'd by kickoff, not finished by it.
- **No benchmark claims** until receipts exist (per Leon: "no need for benchmarks yet, lol").

## 7. Down-range (parked, not in this build — Leon, Sept 26)

**The Blueprint Builder**: our own custom builder that reads engineering/operations system
specs (EOS-style: an operator drops in their spec, the builder forges the deterministic box
for their industry). The key positioning Leon set: **we keep the boxes as unique builds for
the industry — blueprints are ours, not the client's designs.** Clients get the product; the
factory and the blueprint library stay in-house. This pairs with the Base44 drop-in-builder
app for investor optics: "he achieved SDR-1, ran Lindy 30 days, built a second sim, is at
local installs — and his boxes come from his own builder." Parked until after Oct 7 kickoff;
no benchmarks, no public claims yet.

## 8. Doctrine (unchanged, applies to this build)

Verbatim prototype disclaimer on the ISO boot splash and every artifact. No client names,
PHI, credentials, wallet addresses on any surface. Fail closed on any integrity check.
All public artifacts append-only. Patent framing: 8 patents pending + 5 SBIR tracks.
