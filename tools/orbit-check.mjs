// Layout check for the homepage orbit (site#7).
// Computers get the orbit: the eight pieces must not touch each other, the hub or the contact
// strip, and must stay on screen, both in the overview and with each piece open (the open piece is
// the panel, the other seven sit in the round dial at the bottom right). Touch screens and narrow
// windows must get the sheet instead. Usage: node tools/orbit-check.mjs [index.html]
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const pw = await import('playwright').catch(() => import('/opt/node22/lib/node_modules/playwright/index.mjs'));
const url = pathToFileURL(resolve(process.argv[2] || 'index.html')).href;
const DESKTOP = [[1120, 700], [1280, 720], [1366, 768], [1440, 900], [1536, 864], [1920, 1080], [2560, 1440]];
const SHEET = [[393, 852, true], [820, 1180, true], [1180, 820, true], [1366, 1024, true], [1000, 800, false]];
const browser = await pw.chromium.launch(); let bad = 0;
const fail = (what) => { bad++; console.log('  FAIL ' + what); };

const probe = page => page.evaluate(() => {
  const box = el => { const b = el.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; };
  const hit = (a, b) => a.x < b.x + b.w - 1 && b.x < a.x + a.w - 1 && a.y < b.y + b.h - 1 && b.y < a.y + a.h - 1;
  const cards = [...document.querySelectorAll('.ob-card')], open = cards.findIndex(c => c.classList.contains('is-open'));
  const rs = cards.map(box), ids = cards.map(c => c.dataset.id), out = [];
  for (let i = 0; i < rs.length; i++) for (let j = i + 1; j < rs.length; j++) if (hit(rs[i], rs[j])) out.push(`${ids[i]} touches ${ids[j]}`);
  rs.forEach((r, i) => { if (r.x < 0 || r.y < 0 || r.x + r.w > innerWidth || r.y + r.h > innerHeight) out.push(`${ids[i]} off screen`); });
  const contact = box(document.querySelector('.ob-contact'));
  const hub = open < 0 ? [box(document.querySelector('.ob-hub'))] : [box(document.querySelector('.ob-name')), box(document.querySelector('.ob-hub .mark'))];
  rs.forEach((r, i) => { if (i !== open && hub.some(h => hit(r, h))) out.push(`${ids[i]} touches the hub`); if (hit(r, contact)) out.push(`${ids[i]} touches the contact strip`); });
  if (document.documentElement.scrollWidth > innerWidth) out.push('page scrolls sideways');
  return { out, fs: getComputedStyle(document.documentElement).fontSize };
});

for (const [w, h] of DESKTOP) {
  const page = await browser.newPage({ viewport: { width: w, height: h } }); const errs = [];
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.addStyleTag({ content: '.ob, .ob * { animation: none !important; transition: none !important; }' });
  await page.waitForTimeout(500);
  if (!await page.evaluate(() => document.documentElement.classList.contains('ob-on'))) { console.log(`${w}x${h}`); fail('the orbit did not turn on'); await page.close(); continue; }
  const ov = await probe(page); console.log(`${w}x${h}  type ${ov.fs}`); ov.out.forEach(o => fail('overview: ' + o));
  const ids = await page.evaluate(() => [...document.querySelectorAll('.ob-card')].map(c => c.dataset.id));
  for (let k = 0; k < ids.length; k++) {
    await page.evaluate(k => window.__ob.open(k), k); await page.waitForTimeout(80);
    (await probe(page)).out.forEach(o => fail(`${ids[k]} open: ${o}`));
  }
  errs.forEach(e => fail('page error: ' + e)); await page.close();
}
for (const [w, h, touch] of SHEET) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch && w < 900 });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  const st = await page.evaluate(() => ({ orbit: document.documentElement.classList.contains('ob-on'), side: document.documentElement.scrollWidth > innerWidth }));
  console.log(`${w}x${h}${touch ? ' touch' : ''}  sheet`);
  if (st.orbit) fail('the orbit turned on; this size should get the sheet'); if (st.side) fail('page scrolls sideways');
  await page.close();
}
await browser.close();
console.log(bad ? `FAIL: ${bad} problem(s)` : 'PASS: the orbit fits at every computer size, and touch screens get the sheet');
process.exit(bad ? 1 : 0);
