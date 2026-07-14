// One-off: fetch the three Reiners Media families from Google Fonts and
// self-host the woff2 so designs render on-brand even under strict CSP.
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const OUT = new URL('../ds-bundle/fonts/', import.meta.url).pathname;

const FAMILIES = [
  'Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600',
  'DM+Sans:ital,wght@0,400;0,500;0,700;1,400',
  'DM+Mono:ital,wght@0,400;0,500',
];
const url = `https://fonts.googleapis.com/css2?family=${FAMILIES.join('&family=')}&display=swap`;

const res = await fetch(url, { headers: { 'User-Agent': UA } });
if (!res.ok) throw new Error(`css fetch ${res.status}`);
const css = await res.text();

// Split into @font-face blocks, each preceded by a /* subset */ comment.
const blocks = css.split('/*').slice(1); // ["subset */ @font-face{...}", ...]
const keepSubsets = new Set(['latin', 'latin-ext']);
let out = '/* Reiners Media — self-hosted brand fonts. Source: Google Fonts (OFL). */\n';
const downloads = new Map(); // localName -> remoteUrl (key by local so no weight is deduped away)
let kept = 0;

for (const b of blocks) {
  const subset = b.slice(0, b.indexOf('*/')).trim();
  if (!keepSubsets.has(subset)) continue;
  let block = '@font-face' + b.slice(b.indexOf('@font-face') + '@font-face'.length);
  block = block.slice(0, block.indexOf('}') + 1);
  const fam = /font-family:\s*'([^']+)'/.exec(block)?.[1] ?? 'font';
  const weight = /font-weight:\s*(\d+)/.exec(block)?.[1] ?? '400';
  const style = /font-style:\s*(\w+)/.exec(block)?.[1] ?? 'normal';
  const m = /url\((https:[^)]+\.woff2)\)/.exec(block);
  if (!m) continue;
  const remote = m[1];
  const slug = fam.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const localName = `${slug}-${weight}${style === 'italic' ? '-italic' : ''}-${subset}.woff2`;
  downloads.set(localName, remote);
  out += block.replace(remote, `./${localName}`).trim() + '\n';
  kept++;
}

for (const [localName, remote] of downloads) {
  const r = await fetch(remote, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`woff2 ${r.status} ${remote}`);
  const buf = Buffer.from(await r.arrayBuffer());
  writeFileSync(join(OUT, localName), buf);
  console.error(`  ↓ ${localName} (${(buf.length / 1024).toFixed(1)}KB)`);
}
writeFileSync(join(OUT, 'fonts.css'), out);
console.error(`\n✓ ${kept} @font-face rules, ${downloads.size} woff2 files → ds-bundle/fonts/`);
