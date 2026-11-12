const T = process.env.CONCLAVE_BOX_TOKEN;
const A = '6af4f91500f74ce4b3d73f71';
const post = async (b) => {
  const r = await fetch(`https://base44.app/api/apps/${A}/functions/gateEvaluate`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${T}`}, body: JSON.stringify(b) });
  return JSON.parse(await r.text());
};
// Things a careful reader would call wrong, that a checker ought to catch.
const WRONG = [
  ['pct arithmetic',        'Revenue grew 12% from 3.4M to 3.9M.'],
  ['pct rephrased',         'Sales rose from 2.1M to 2.8M, a 25% increase.'],
  ['decrease magnitude',    'Costs fell 40% from 2.0M to 1.4M.'],
  ['unit vs adjective',     'The building is 300 kg tall.'],
  ['unit vs adjective 2',   'The trip was 3 h long.'],
  ['named source absent',   'According to the Harvard Business Review, 78% of firms fail.'],
  ['named source absent 2', 'The Ramirez study found a 30% drop in soil carbon.'],
  ['composition sums',      'The split is 60% domestic and 55% international.'],
  ['impossible value',      'The dataset is 140% of its own total.'],
  ['unit mismatch per se',  'The trip was 3 h long and 12 kg heavy.'],
];
// Things that are true and must not be refused.
const RIGHT = [
  ['correct increase',      'Sales rose 33.33% from 2.1M to 2.8M.'],
  ['correct decrease',      'Costs fell 30% from 2.0M to 1.4M.'],
  ['plain length',          'The cable is 12 m long.'],
  ['plain mass',            'The crate is 40 kg heavy.'],
  ['clean prose',           'The team shipped three features this week.'],
  ['accurate figures',      'We processed 4.2M records at 99.99% accuracy.'],
];
let caught = 0, missed = [];
for (const [n, t] of WRONG) {
  const d = await post({ reply_text: t, context_text: 'No sources provided.' });
  const hit = d.verdict !== 'pass';
  if (hit) caught++;
  console.log(`${hit ? 'CAUGHT  ' : 'MISSED  '} ${n.padEnd(22)} ${String(d.verdict).padEnd(8)} ${(d.catches||[]).map(c=>c.check).join(',') || '-'}`);
}
let clean = 0, refused = [];
for (const [n, t] of RIGHT) {
  const d = await post({ reply_text: t, context_text: 'No sources provided.' });
  const ok = d.verdict === 'pass';
  if (ok) clean++;
  else refused.push(n);
  console.log(`${ok ? 'CLEAN   ' : 'REFUSED '} ${n.padEnd(22)} ${String(d.verdict).padEnd(8)} ${(d.catches||[]).map(c=>`${c.check}:${c.recomputed}`).join(',') || '-'}`);
}
console.log(`\ncatch rate on wrong claims: ${caught}/${WRONG.length}`);
console.log(`true statements left alone: ${clean}/${RIGHT.length}${refused.length ? ' | wrongly refused: ' + refused.join(', ') : ''}`);
