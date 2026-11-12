# V2 supplementary fresh-conversation replay protocol

Authorized October 10, 2026 by Leon: "Do it then", referring to fresh model replays of the revised contract. Results stay local pending a separate two-key publication gate.

## Frozen input and preregistration limits

The core prompt, 12-case instrument and validator were locally frozen before any V2 generation, in `PRETEST_FREEZE.json`. Prompt SHA-256 `c3d4aac852e9eaaee256467d7a1570e7536bc77a1c2ca5b2110ca855bb7bf367`. Expected canonical tuple hash `ba71f6d6f1299632281798ae86247ae26d419eb6ce16fcb260013c52b38fa504`.

This is not public preregistration. Local fixture tests preceded model replays. Original PENTA v1 public registration and results remain unchanged; these are supplementary v2 observations, not retroactive repairs or full model certificates.

## Capture procedure

1. Native settings read established original chat model GPT-6.1 Sol and memory enabled with cross-conversation context enabled.
2. Native settings PATCH disabled memory. That call timed out, but a read-back confirmed disabled; no duplicate PATCH was made.
3. Native `set_agent_model` pins each engine. Confirmed responses show both the selected model id and memory disabled. Attribution is by platform configuration, not independent provider attestation.
4. The Agent API's default-conversation POST returned an existing id. A uniqueness guard stopped without sending a test prompt. This excluded setup attempt is preserved, not counted.
5. Browser `New conversation` creates separate empty conversation ids. Unsent composer drafts allocated ids; these drafts are not conversational inputs. GET preflight verifies zero messages immediately before the frozen prompt is sent.
6. Each fresh id receives exactly one user message via the supported Agent API, whose content is read directly from the frozen prompt file. No browser transcription or short wrapper substitutes for the prompt.
7. The response body and exact returned assistant content are saved. Final content is checked by the frozen validator. Model mismatch, malformed output or extra prose remains a failure. No string trimming, step repair or post-generation instruction is allowed.
8. Server conversation records are fetched afterward to verify one user message equals the frozen file and captured final content equals the stored assistant response. API POSTs are never repeated to resolve response-format or transport errors; saved responses and GET reads are used instead.
9. Both captures complete before moving the global model pin. Original chat model and memory configuration are restored and read back at the end.

## Differences and caveats

V1 observations were browser-rendered/transcribed captures. V2 uses browser-created fresh conversations with API message delivery and raw returned content capture. The prompt also expands from 6 to 12 cases and makes the step delimiter explicit. These changes prevent a controlled causal claim that a single phrase alone fixed a model.

Fresh ids demonstrate conversation separation, not statistical independence or provider-side isolation. The same agent instructions, workspace, skills and expected answers remain accessible. Memory off does not remove all context or make the experiment blind. Tool usage is recorded where visible in response/usage metadata; tool calls returned on a final message alone are not a complete trace of earlier tool activity.

No real healing, cryptographic validation, financial approval flow, stress/load, throughput, tenant-isolation or generalized reliability claim follows. Correct detected/escalated fields are synthetic decisions, not runtime enforcement proof.

## Dual Mesh Benchmark

Not measured. No comparison of mesh activation, learning, latency, resource use or recovery is part of these replays.

This software is a prototype and is provided for educational and research purposes only. It is not intended for production use, commercial deployment, or safety-critical environments. All systems are experimental and may contain defects on them.
