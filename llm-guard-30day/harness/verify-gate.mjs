const T = process.env.CONCLAVE_BOX_TOKEN;
const A = '6af4f91500f74ce4b3d73f71';
const U = (n) => `https://base44.app/api/apps/${A}/functions/${n}`;
const post = async (n, body) => {
  const r = await fetch(U(n), { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${T}` }, body: JSON.stringify(body) });
  const txt = await r.text();
  try { return { status: r.status, j: JSON.parse(txt) }; } catch { return { status: r.status, j: null, txt }; }
};

const CASES = [
  // the two fixes, in the order the builder was told to prove them
  ['FIX-1 correct decrease',      'Costs fell 30% from 2.0M to 1.4M.',            'pass',    'decrease verb + negative recomputation agree'],
  ['FIX-1 correct decrease 2',    'Revenue dropped 25% from 4.0M to 3.0M.',       'pass',    'same rule, different verb'],
  ['FIX-1 wrong decrease kept',   'Costs fell 40% from 2.0M to 1.4M.',            'blocked', '40 is not 30, must still fail'],
  ['FIX-2 time as length',        'The trip was 3 h long.',                       'blocked', 'h missing from unit table before'],
  ['FIX-2 length unchanged',      'The cable is 12 m long.',                      'pass',    'must not break the honest case'],
  // regression: everything that already worked must still work
  ['REG percent wrong',           'Revenue grew 12% from 3.4M to 3.9M.',          'blocked', 'recomputes to 14.70%'],
  ['REG percent right',           'Revenue grew 14.7059% from 3.4M to 3.9M.',     'pass',    'matches to stated precision'],
  ['REG units mass as length',    'The building is 300 kg tall.',                 'blocked', 'mass cannot be tall'],
  ['REG citation absent',         'The Ramirez study found a 30% drop in soil carbon.', 'flagged', 'name not in context'],
  ['REG clean prose',             'The team shipped three features this week.',    'pass',    'no claims to disprove'],
  ['REG correct increase',        'Sales rose 33.33% from 2.1M to 2.8M.',         'pass',    'increase verb, positive recomputation'],
];

let pass = 0, fail = 0;
const failures = [];
for (const [name, text, expect, why] of CASES) {
  const a = await post('gateEvaluate', { reply_text: text, context_text: 'No sources provided.' });
  const b = await post('gateEvaluate', { reply_text: text, context_text: 'No sources provided.' });
  const v1 = a.j?.verdict, v2 = b.j?.verdict;
  const det = v1 === v2;
  const ok = v1 === expect && det;
  if (ok) pass++; else { fail++; failures.push({ name, expect, got: v1, det, text }); }
  const ch = (a.j?.catches || []).map(c => `${c.check}:${c.recomputed}`).join(', ') || '-';
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name.padEnd(28)} ${String(v1).padEnd(8)} ${det ? 'det' : 'NONDET'}  ${ch}`);
}
console.log(`\n${pass}/${CASES.length} cases pass, ${fail} fail`);
if (failures.length) console.log('FAILURES:', JSON.stringify(failures, null, 1));
