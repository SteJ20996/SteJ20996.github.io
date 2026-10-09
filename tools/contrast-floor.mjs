// Worst-case text contrast on the homepage glass.
// For every text block it samples what sits under the glyph pixels themselves (tile, blurred
// photo and text halo included), takes the darkest 5% and reports the contrast ratio against
// the text colour. Usage: node tools/contrast-floor.mjs [index.html] [floor]   (default 4.5)
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
const pw = await import('playwright').catch(() => import('/opt/node22/lib/node_modules/playwright/index.mjs'));
const file = resolve(process.argv[2] || 'index.html'); const floor = Number(process.argv[3] || 4.5);
const SEL = '.tile:not(.quidence) h1, .tile:not(.quidence) h3, .tile:not(.quidence) p, .tile:not(.quidence) small, .tile:not(.quidence) .yr, .tile:not(.quidence) .tile-label, .tile:not(.quidence) a, .mast-tag, .mast-over, .foot .copy, .foot a';
const browser = await pw.chromium.launch(); let worstOverall = Infinity;
for (const [w, h] of [[1440, 900], [1280, 720]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(400);
  const boxes = await page.evaluate(SEL => [...document.querySelectorAll(SEL)].map(el => { const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height, color: getComputedStyle(el).color, tag: (el.className || el.tagName) + '' }; }).filter(b => b.w >= 4 && b.h >= 4), SEL);
  const hide = '.glyph, .mast-art { visibility: hidden !important; }';
  const mask = await page.addStyleTag({ content: `* { color: rgb(255,0,0) !important; text-shadow: none !important; } ${hide}` });
  await page.waitForTimeout(100); const maskPng = (await page.screenshot()).toString('base64');
  await page.evaluate(el => el.remove(), mask);
  await page.addStyleTag({ content: `* { color: transparent !important; } ${hide}` });   // halo stays, text goes
  await page.waitForTimeout(100); const bgPng = (await page.screenshot()).toString('base64');
  const rows = await page.evaluate(async ({ maskPng, bgPng, boxes }) => {
    const load = src => new Promise(ok => { const i = new Image(); i.onload = () => ok(i); i.src = 'data:image/png;base64,' + src; });
    const [mi, bi] = await Promise.all([load(maskPng), load(bgPng)]);
    const data = img => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const g = c.getContext('2d'); g.drawImage(img, 0, 0); return g.getImageData(0, 0, c.width, c.height); };
    const M = data(mi), B = data(bi), W = M.width, scale = W / innerWidth;
    const lin = c => { c /= 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; };
    const lum = (r, g, b) => .2126 * lin(r) + .7152 * lin(g) + .0722 * lin(b);
    const out = [];
    for (const b of boxes) {
      const [tr, tg, tb] = b.color.match(/\d+/g).map(Number); const tl = lum(tr, tg, tb); const ls = [];
      for (let y = Math.floor(b.y * scale); y < Math.ceil((b.y + b.h) * scale); y++) for (let x = Math.floor(b.x * scale); x < Math.ceil((b.x + b.w) * scale); x++) {
        const i = (y * W + x) * 4; if (M.data[i] - M.data[i + 1] > 150 && M.data[i] - M.data[i + 2] > 150) ls.push(lum(B.data[i], B.data[i + 1], B.data[i + 2]));
      }
      if (ls.length < 20) continue; ls.sort((a, b) => a - b); const bg = ls[Math.floor(ls.length / 20)];
      out.push({ color: b.color, tag: b.tag, ratio: (Math.max(bg, tl) + .05) / (Math.min(bg, tl) + .05) });
    }
    return out;
  }, { maskPng, bgPng, boxes });
  const worst = new Map();
  for (const r of rows) if (!worst.has(r.color) || r.ratio < worst.get(r.color).ratio) worst.set(r.color, r);
  console.log(`${w}x${h}`);
  for (const [color, r] of [...worst].sort((a, b) => a[1].ratio - b[1].ratio)) { console.log(`  ${r.ratio.toFixed(2)}:1  ${color.padEnd(18)} (${r.tag})`); worstOverall = Math.min(worstOverall, r.ratio); }
  await page.close();
}
await browser.close();
console.log(worstOverall >= floor ? `PASS: every text colour is at least ${floor}:1 (worst ${worstOverall.toFixed(2)})` : `FAIL: worst ${worstOverall.toFixed(2)}:1 is under the ${floor}:1 floor`);
process.exit(worstOverall >= floor ? 0 : 1);
