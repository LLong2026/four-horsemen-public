const T = process.env.CONCLAVE_BOX_TOKEN, A = '6af4f91500f74ce4b3d73f71';
const post = async (n, b) => { const r = await fetch(`https://base44.app/api/apps/${A}/functions/${n}`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${T}`}, body: JSON.stringify(b) }); const t = await r.text(); try { return JSON.parse(t); } catch { return { raw: t.slice(0,120) }; } };
const body = { reply_text: 'Revenue grew 12% from 3.4M to 3.9M.', context_text: 'Quarterly update.' };
const N = 120, C = 24, lat = []; let idx = 0, err = 0, wrong = 0;
const t0 = performance.now();
async function w() { while (idx < N) { idx++; const t = performance.now(); const r = await fetch(`https://base44.app/api/apps/${A}/functions/gateEvaluate`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${T}`}, body: JSON.stringify(body) }); const txt = await r.text(); lat.push(performance.now()-t); if (r.status !== 200) err++; else { try { if (JSON.parse(txt).verdict !== 'blocked') wrong++; } catch { wrong++; } } } }
await Promise.all(Array.from({length:C}, w));
const wall = (performance.now()-t0)/1000; lat.sort((a,b)=>a-b);
const p = q => Math.round(lat[Math.floor(q*lat.length)]);
console.log(`LOAD ${N} @ ${C}: ${wall.toFixed(1)}s, ${(N/wall).toFixed(2)} req/s, p50 ${p(0.5)}ms p95 ${p(0.95)}ms max ${Math.round(lat[lat.length-1])}ms, errors ${err}, wrong ${wrong}`);
const before = await post('gateAudit', {});
const rep = await post('gateAudit', { repair: true });
const after = await post('gateAudit', {});
console.log(`audit after load: intact=${before.chain_intact} checked=${before.checked} violations=${(before.violations||[]).length}`);
console.log(`repair: intact_before=${rep.chain_intact} violations_found=${(rep.violations||[]).length} repaired=${rep.repaired_rows} intact_after=${rep.chain_intact_after}`);
console.log(`audit final: intact=${after.chain_intact} checked=${after.checked} violations=${(after.violations||[]).length}`);
