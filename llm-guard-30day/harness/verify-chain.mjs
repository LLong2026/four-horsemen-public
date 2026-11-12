const T = process.env.CONCLAVE_BOX_TOKEN;
const A = '6af4f91500f74ce4b3d73f71';
const post = async (n, body) => {
  const r = await fetch(`https://base44.app/api/apps/${A}/functions/${n}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${T}` }, body: JSON.stringify(body) });
  const txt = await r.text();
  try { return JSON.parse(txt); } catch { return { raw: txt.slice(0, 200) }; }
};
const brief = (d) => ({ ok: d.ok, chain_intact: d.chain_intact, checked: d.checked, violations: (d.violations || []).length,
                        repaired_rows: d.repaired_rows, found_before: d.violations_found_before_repair ?? d.found_before_repair ?? d.violations_before ?? null,
                        after_intact: d.chain_intact_after ?? null, keys: Object.keys(d).slice(0, 14) });

console.log('1. baseline audit'); console.log('  ', JSON.stringify(brief(await post('gateAudit', {}))));

const body = { reply_text: 'Revenue grew 12% from 3.4M to 3.9M.', context_text: 'Quarterly update.' };
const N = 160, CONC = 40; let idx = 0, err = 0;
const t0 = performance.now();
async function w() { while (idx < N) { idx++; const r = await fetch(`https://base44.app/api/apps/${A}/functions/gateEvaluate`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${T}`}, body: JSON.stringify(body) }); if (r.status !== 200) err++; await r.text(); } }
await Promise.all(Array.from({ length: CONC }, w));
console.log(`2. burst ${N} @ ${CONC} in ${((performance.now()-t0)/1000).toFixed(1)}s, errors ${err}`);

console.log('3. audit after burst'); console.log('  ', JSON.stringify(brief(await post('gateAudit', {}))));
console.log('4. repair (must report what it found, not claim clean)'); console.log('  ', JSON.stringify(brief(await post('gateAudit', { repair: true }))));
console.log('5. audit after repair'); console.log('  ', JSON.stringify(brief(await post('gateAudit', {}))));
