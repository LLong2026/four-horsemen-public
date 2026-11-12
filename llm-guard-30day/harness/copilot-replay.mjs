const T = process.env.CONCLAVE_BOX_TOKEN, A = '6af4f91500f74ce4b3d73f71';
const post = async (b) => { const r = await fetch(`https://base44.app/api/apps/${A}/functions/gateEvaluate`, { method:'POST', headers:{'Content-Type':'application/json',Authorization:`Bearer ${T}`}, body: JSON.stringify(b) }); return JSON.parse(await r.text()); };
// Statements in the shape a helpful assistant actually produces, with the ground truth supplied as context.
const ctx = 'Ground truth: OneDrive upload of 2.5 TB requires a 5 TB plan. Microsoft Work Trend Index 2023 reported 64%. Microsoft was founded in 1975. Recordings retain 60 days.';
const rows = [
  ['fabricated stat',   'According to the Microsoft Work Trend Index 2023, 68% of employees use AI daily.', '64% is the real figure'],
  ['fabricated ruling', 'The Ramirez v. Microsoft ruling in 2019 established that cloud storage terms are unconscionable.'],
  ['arithmetic off',    'Sync reduces upload time by 40%, so a 10 minute upload now takes 4 minutes.'],
  ['arithmetic off 2',  'Upgrading to 5 TB costs 25% more than 4 TB, so $12 becomes $16.'],
  ['capacity claim',    'Your account allows 1 TB, so 2.5 TB of files will fit.'],
  ['honest figure',     'Microsoft was founded in 1975.'],
  ['honest retention',  'Recordings are retained for 60 days.'],
  ['unverifiable',      'Copilot supports more than 300 languages and is the most trusted assistant available.'],
];
let caught = 0;
for (const [label, text] of rows) {
  const d = await post({ reply_text: text, context_text: ctx });
  const ch = (d.catches || []).map(c => `${c.check}:${c.stated} -> ${c.recomputed}`).join(' | ') || '-';
  if (d.verdict !== 'pass') caught++;
  console.log(`${String(d.verdict).padEnd(8)} ${label.padEnd(20)} ${ch}`);
}
console.log(`\ncaught ${caught}/${rows.length} on this sample`);
