# Benchmark scope clarification, October 10, 2026

The offline validator benchmark DID complete: 6,000 checks, 3,000 expected-valid responses accepted, 3,000 adversarial responses rejected, zero unexpected acceptances or rejections in this finite fixture sample.

The multi-model concurrency benchmark DID NOT execute. Its blocker was fresh-conversation provisioning through the attempted Agent API route in the scheduled workflow environment. The worker reported repeated returns of its default conversation rather than the eight separate empty conversations required by the protocol. This is an infrastructure/instrumentation setup limitation, NOT an observed failure, saturation point or capacity limit of the model runtime. No model inference calls were made in that phase.

Do not generalize that attempted-route result into a universal claim that Base44 cannot support multiple conversations. Earlier browser-created fresh conversations were successfully used for the v2 replay. Whether an alternate creation path works inside the scheduled workflow remains unverified.

Runtime concurrency, capacity and action containment under model load remain UNMEASURED. A setup blocker does not establish either a runtime limit or unlimited runtime capability. Validator timing cannot stand in for model timing.

Forward-only correction to the earlier 'no degradation' wording: zero acceptance errors were observed; latency was not unchanged. Valid-response p50 increased from 0.0942 ms (one worker) to 0.1306 ms (two) and 0.1300 ms (four). The published baseline used a mixed valid/mutant latency sample and a different mutation corpus; direct numerical comparisons are not controlled like-for-like capacity estimates. Increasing check count per stage is not proof of a tenfold request-arrival-rate increase.

The native settings read on this clarification turn confirmed Gabriel configured as GPT-6.1 Sol. No model change was requested or performed.

## Dual Mesh Benchmark

NOT MEASURED.

This clarification is private, supplementary and forward-only. The original report, raw measurement receipt and runner remain unchanged. No Zenodo or GitHub update is authorized by this clarification alone.

This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.
