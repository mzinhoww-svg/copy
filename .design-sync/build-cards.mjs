// Emit the foundation preview cards under ds-bundle/components/<Group>/<Name>/.
// Each card is self-contained static HTML linking the real styles.css so the
// DS pane renders it with the brand's own tokens and fonts.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = new URL('../ds-bundle/components/', import.meta.url).pathname;

function card({ group, name, title, kicker, body, prompt }) {
  const dir = join(OUT, group, name);
  mkdirSync(dir, { recursive: true });
  const html = `<!-- @dsCard group="${group}" -->
<!doctype html>
<html lang="en"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../../../styles.css">
  <style>
    body { margin: 0; padding: 40px; background: var(--creme); }
    #root { max-width: 1100px; margin: 0 auto; }
    .rm-doc-kicker { font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; color: var(--ouro); margin: 0 0 10px; }
    .rm-doc-title { font-family: var(--serif); font-weight: 300; font-size: 40px; line-height: 1.05; color: var(--navy); margin: 0 0 8px; }
    .rm-doc-rule { width: 54px; height: 1px; background: var(--ouro); border: 0; margin: 0 0 32px; }
    .rm-note { font-family: var(--sans); font-size: 13px; line-height: 1.6; color: var(--medio); }
  </style>
</head><body>
  <div id="root">
    <p class="rm-doc-kicker">${kicker}</p>
    <h1 class="rm-doc-title">${title}</h1>
    <hr class="rm-doc-rule">
    ${body}
  </div>
</body></html>
`;
  writeFileSync(join(dir, `${name}.html`), html);
  writeFileSync(join(dir, `${name}.prompt.md`), prompt);
  console.error(`  ✓ components/${group}/${name}/`);
}

/* ---------------------------------------------------------------- COLORS -- */
const swatch = (varName, label, hex, role, dark = false) => `
  <figure style="margin:0">
    <div style="height:104px;border-radius:6px;border:1px solid ${dark ? 'rgba(232,217,181,.25)' : 'var(--ouro-palido)'};background:${hex}"></div>
    <figcaption style="padding-top:10px">
      <div style="font-family:var(--sans);font-weight:500;font-size:14px;color:var(--navy)">${label}</div>
      <div style="font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--medio);margin-top:2px">${hex} · ${varName}</div>
      <div style="font-family:var(--sans);font-size:12px;line-height:1.5;color:var(--medio);margin-top:6px">${role}</div>
    </figcaption>
  </figure>`;
const grid = (cells) => `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:24px">${cells}</div>`;

card({
  group: 'Colors', name: 'Palette', title: 'Colour', kicker: '05 — Palette',
  body: `
    <p style="font-family:var(--sans);font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--ouro);margin:0 0 16px">Core</p>
    ${grid([
      swatch('--navy', 'Navy Reiners', '#14243E', 'Institutional base. Dark grounds, titles on light.'),
      swatch('--ouro', 'Ouro', '#9A7B35', 'Primary accent. Details, icons, rules, italics.'),
      swatch('--creme', 'Creme', '#FAF7F2', 'Dominant light ground (60% of usage).'),
      swatch('--tinta', 'Tinta', '#1A1510', 'Body text on light; near-black footers.'),
    ].join(''))}
    <p style="font-family:var(--sans);font-size:12px;text-transform:uppercase;letter-spacing:.14em;color:var(--ouro);margin:36px 0 16px">Support</p>
    ${grid([
      swatch('--aco', 'Aço', '#2C4A72', 'Cool Navy variant — secondary contrast.'),
      swatch('--ouro-claro', 'Ouro Claro', '#C4A15A', 'Gold on dark grounds (Navy / Tinta).'),
      swatch('--ouro-palido', 'Ouro Pálido', '#E8D9B5', 'Hairline rules, secondary text on Navy.'),
      swatch('--pergaminho', 'Pergaminho', '#F0EBE1', 'Alternate light ground for section rhythm.'),
      swatch('--medio', 'Médio', '#5E5549', 'Warm grey — secondary body text.'),
      swatch('--claro', 'Claro', '#9E9287', 'Softer warm grey — metadata, tertiary text.'),
    ].join(''))}
    <div style="display:flex;height:44px;border-radius:6px;overflow:hidden;margin:36px 0 10px;border:1px solid var(--ouro-palido)">
      <div style="flex:60;background:var(--creme)"></div>
      <div style="flex:28;background:var(--navy)"></div>
      <div style="flex:12;background:var(--ouro)"></div>
    </div>
    <p class="rm-note"><strong style="color:var(--navy);font-weight:500">Composition 60 / 28 / 12</strong> — Creme · Navy · Ouro. Gold is accent only: never a large fill (section, card, or primary-button background). No colour outside this palette is permitted.</p>
  `,
  prompt: `Reiners Media colour tokens. The single source of truth for brand colour — use these exact hexes via CSS custom properties, never approximations or off-palette colours.

## Tokens
Core: \`--navy\` #14243E · \`--ouro\` #9A7B35 · \`--creme\` #FAF7F2 · \`--tinta\` #1A1510.
Support: \`--aco\` #2C4A72 · \`--ouro-claro\` #C4A15A · \`--ouro-palido\` #E8D9B5 · \`--pergaminho\` #F0EBE1 · \`--medio\` #5E5549 · \`--claro\` #9E9287.

## Rules
- Global composition ≈ 60% Creme · 28% Navy · 12% Ouro.
- **Gold is accent, never base** — never a section/card/primary-button fill, never small gold body text on Creme (fails AA).
- No red/green. Status is tonal variation + explicit text, never traffic-light colour.
- Approved pairs: Navy→Creme/Ouro Pálido/Ouro Claro · Creme→Tinta/Navy/Médio, Ouro for titles · Tinta→Creme/Claro/Ouro Claro.
`,
});

/* ------------------------------------------------------------ TYPOGRAPHY -- */
card({
  group: 'Type', name: 'Typography', title: 'Typography', kicker: '06 — Type',
  body: `
    <div style="display:grid;grid-template-columns:120px 1fr;gap:28px 32px;align-items:baseline">
      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">H1 · Cormorant 300</div>
      <div style="font-family:var(--serif);font-weight:300;font-size:56px;line-height:1.02;color:var(--navy)">Presença que <em style="font-family:var(--serif);font-style:italic;color:var(--ouro-claro)">posiciona</em>.</div>

      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">H2 · Cormorant 600</div>
      <div style="font-family:var(--serif);font-weight:600;font-size:40px;line-height:1.12;color:var(--navy)">Autoridade se constrói com presença.</div>

      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">H3 · DM Sans 500</div>
      <div style="font-family:var(--sans);font-weight:500;font-size:20px;line-height:1.2;color:var(--navy)">Studio de Comunicação Estratégica Institucional</div>

      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">Body · DM Sans 400</div>
      <div style="font-family:var(--sans);font-weight:400;font-size:16px;line-height:1.7;color:var(--tinta);max-width:60ch">Não produzimos para o feed do dia. Produzimos para a memória institucional. Cada peça é uma linha na história de quem lidera — escrita com o rigor de um estúdio.</div>

      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">Caption · DM Sans</div>
      <div style="font-family:var(--sans);font-size:13px;line-height:1.6;color:var(--medio)">Legenda institucional — Médio sobre fundo claro.</div>

      <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:var(--medio)">Kicker · DM Mono</div>
      <div style="font-family:var(--mono);font-size:12px;text-transform:uppercase;letter-spacing:.18em;color:var(--ouro)">01 — Posicionamento Contínuo</div>
    </div>
    <p class="rm-note" style="margin-top:32px">Three families only — <strong style="color:var(--navy);font-weight:500">Cormorant Garamond</strong> (titles + emphasis italic), <strong style="color:var(--navy);font-weight:500">DM Sans</strong> (body, H3, UI), <strong style="color:var(--navy);font-weight:500">DM Mono</strong> (kickers, labels, numbers). At most one gold serif italic per title. Never Mono in running text; never a fourth family; minimum body 14px.</p>
  `,
  prompt: `Reiners Media typography. Three families, nothing else.

## Families
- \`--serif\` 'Cormorant Garamond' — H1/H2, quotes, emphasis italic.
- \`--sans\` 'DM Sans' — body, H3, UI, buttons, captions.
- \`--mono\` 'DM Mono' — kickers, labels, numbers, specs (uppercase, letter-spacing 0.14–0.2em).

## Hierarchy
H1 Cormorant 300 clamp(40px,6vw,72px)/1.02 · H2 Cormorant 600 ~40px · H3 DM Sans 500 20px · Body DM Sans 400 16px/1.7 · Kicker DM Mono 12px uppercase.

## Rules
- Serif for titles + emotion, Sans for reading + function, Mono only for labels — never Mono in blocks of running text.
- At most ONE gold serif italic (\`.rm-em\`) per title. Never the whole title.
- Never a fourth family. Never Bold Cormorant for body (Bold serif is the wordmark only). Body never below 14px.
`,
});

/* --------------------------------------------------------------- SPACING -- */
const scale = [['--space-1','4px'],['--space-2','8px'],['--space-3','16px'],['--space-4','24px'],['--space-5','32px'],['--space-6','40px'],['--space-7','56px'],['--space-8','64px'],['--space-9','96px'],['--space-10','120px']];
card({
  group: 'Spacing', name: 'Spacing', title: 'Spacing', kicker: '08 — 8px scale',
  body: `
    <div style="display:flex;flex-direction:column;gap:14px">
      ${scale.map(([v, px]) => `
      <div style="display:flex;align-items:center;gap:20px">
        <code style="font-family:var(--mono);font-size:12px;color:var(--navy);width:96px">${v}</code>
        <div style="height:16px;width:${px};background:var(--ouro);border-radius:2px"></div>
        <span style="font-family:var(--mono);font-size:12px;color:var(--medio)">${px}</span>
      </div>`).join('')}
    </div>
    <p class="rm-note" style="margin-top:28px">Everything is a multiple of the <strong style="color:var(--navy);font-weight:500">8px base</strong>. Off-scale values (10px, 18px, 50px) are forbidden — round to the nearest token. Section vertical padding 96px desktop, content max-width 1180px, 12-column grid.</p>
  `,
  prompt: `Reiners Media spacing scale (8px base). Every gap/pad/margin is a multiple of 8px via tokens \`--space-1\`(4px) … \`--space-10\`(120px).

## Key values
- \`--space-3\` 16px (related elements) · \`--space-4\` 24px (grid gap) · \`--space-5\` 32px (card padding) · \`--space-9\` 96px (section vertical padding).
- Grid: 12 columns desktop, \`--content-max\` 1180px centered, section side padding 56px desktop / 24px mobile.

## Rule
Never use a value off the scale (10px, 18px, 50px are invalid) — round to the nearest token.
`,
});

/* ---------------------------------------------------------------- RADIUS -- */
card({
  group: 'Geometry', name: 'Radius', title: 'Geometry', kicker: '14 — Radius & elevation',
  body: `
    <div style="display:flex;gap:40px;flex-wrap:wrap;align-items:flex-end">
      ${[['--radius-sm','4px','Badges, chips'],['--radius-md','6px','Cards, buttons, images'],['--radius-full','999px','Pills, avatars']].map(([v,px,use]) => `
      <figure style="margin:0;text-align:center">
        <div style="width:120px;height:120px;background:var(--creme);border:1px solid var(--ouro-palido);border-radius:${px === '999px' ? '999px' : px}"></div>
        <figcaption style="margin-top:12px">
          <div style="font-family:var(--mono);font-size:12px;color:var(--navy)">${v}</div>
          <div style="font-family:var(--sans);font-size:12px;color:var(--medio);margin-top:2px">${px} · ${use}</div>
        </figcaption>
      </figure>`).join('')}
    </div>
    <div style="margin-top:40px;display:flex;gap:24px;flex-wrap:wrap">
      <div style="flex:1;min-width:240px;background:var(--pergaminho);border-radius:6px;padding:28px">
        <div style="background:var(--creme);border:1px solid var(--ouro-palido);border-radius:6px;padding:20px;font-family:var(--sans);font-size:14px;color:var(--navy)">Elevation without shadow</div>
        <p class="rm-note" style="margin:14px 0 0">Creme card on a Pergaminho ground + 1px Ouro Pálido border. This is how the brand shows "layering".</p>
      </div>
      <div style="flex:1;min-width:240px;padding:28px">
        <p class="rm-note" style="margin:0"><strong style="color:var(--navy);font-weight:500">The brand is flat.</strong> There is no <code>box-shadow</code> token. Elevation comes from background contrast + a 1px border, never a projected shadow. Radius 6px is the geometric signature — never 0, never above 12px.</p>
      </div>
    </div>
  `,
  prompt: `Reiners Media geometry & elevation. Radius tokens: \`--radius-sm\` 4px (badges) · \`--radius-md\` 6px (default: cards, buttons, images) · \`--radius-full\` 999px (pills).

## Elevation — flat by rule
The brand uses NO box-shadow. There is no shadow token. Show layering with background contrast (e.g. a Creme card on a Pergaminho ground) plus a 1px \`--ouro-palido\` border. Never a projected shadow on cards, buttons, modals, dropdowns.

## Rule
6px is the geometric signature — never radius 0 (fully square) on cards/buttons, never above 12px.
`,
});

/* ----------------------------------------------------------------- ICONS -- */
const icon = (label, svg) => `
  <figure style="margin:0;display:flex;flex-direction:column;align-items:center;gap:12px">
    <div style="width:88px;height:88px;display:flex;align-items:center;justify-content:center;background:var(--creme);border:1px solid var(--ouro-palido);border-radius:6px;color:var(--ouro)">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>
    </div>
    <figcaption style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--medio)">${label}</figcaption>
  </figure>`;
card({
  group: 'Icons', name: 'Icons', title: 'Icons', kicker: '09 — Icon system',
  body: `
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:28px">
      ${icon('Estratégia', '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.25"/>')}
      ${icon('Presença', '<path d="M4 12a8 8 0 0 1 16 0"/><path d="M7 12a5 5 0 0 1 10 0"/><path d="M10.5 12a1.5 1.5 0 0 1 3 0"/>')}
      ${icon('Voz', '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0"/><path d="M12 17v3"/><path d="M9 20h6"/>')}
      ${icon('Reputação', '<path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 11.5l2 2 4-4"/>')}
      ${icon('Recorrência', '<path d="M20 8a8 8 0 1 0 1 5"/><path d="M20 3v5h-5"/>')}
      ${icon('In Company', '<path d="M4 21V6l7-3v18"/><path d="M11 21V9l7 3v9"/><path d="M4 21h16"/><path d="M7 9v0M7 13v0M7 17v0"/>')}
    </div>
    <p class="rm-note" style="margin-top:32px">Linear, <strong style="color:var(--navy);font-weight:500">1.5px stroke</strong>, single-colour, 24×24 grid, rounded caps/joins. Ouro on light grounds, Ouro Claro on dark. Never filled, multicolour, or shadowed. Serene geometry — soft curves predominate.</p>
  `,
  prompt: `Reiners Media icon system. Linear line icons on a 24×24 grid: 1.5px uniform stroke, \`fill:none\` + \`stroke\` only, rounded linecap/linejoin, single colour (Ouro on light, Ouro Claro on dark).

## Style
Serene geometry — soft curves predominate. Reference set: Estratégia (concentric circles), Presença (sound waves), Voz (microphone), Reputação (shield + check), Recorrência (circular arrow), In Company (buildings).

## Rules
Never filled/solid, never multicolour, never shadowed. Below 24px simplify the shape. Redraw third-party icons to 1.5px stroke + no fill before use.
`,
});

/* -------------------------------------------------------- WORDMARK/TEXTURE */
card({
  group: 'Brand', name: 'WordmarkTextures', title: 'Wordmark & Textures', kicker: '04 · 18 — Brand marks',
  body: `
    <div style="background:var(--navy);border-radius:6px;padding:56px 40px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:var(--dot-mesh);background-size:var(--dot-mesh-size) var(--dot-mesh-size);opacity:.5"></div>
      <div style="position:relative;text-align:center">
        <div style="font-family:var(--serif);font-weight:700;font-size:34px;letter-spacing:.18em;color:var(--creme)">REINERS <span style="color:var(--ouro-claro)">MEDIA</span></div>
        <div style="font-family:var(--mono);font-size:11px;text-transform:uppercase;letter-spacing:.24em;color:var(--ouro-palido);margin-top:14px">Presença que posiciona</div>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px">
      <figure style="margin:0">
        <div style="height:150px;border-radius:6px;background:var(--navy);position:relative;overflow:hidden">
          <div style="position:absolute;inset:0;background:var(--dot-mesh);background-size:var(--dot-mesh-size) var(--dot-mesh-size);opacity:.6"></div>
        </div>
        <figcaption class="rm-note" style="margin-top:10px"><strong style="color:var(--navy);font-weight:500">Dot mesh (§18.1)</strong> — monochrome radial-gradient dots over Navy. A texture, not a colour transition.</figcaption>
      </figure>
      <figure style="margin:0">
        <div style="height:150px;border-radius:6px;background:var(--creme);border:1px solid var(--ouro-palido);position:relative">
          <span style="position:absolute;top:14px;left:14px;width:34px;height:34px;border-top:2px solid var(--ouro);border-left:2px solid var(--ouro)"></span>
          <span style="position:absolute;bottom:14px;right:14px;width:34px;height:34px;border-bottom:2px solid var(--ouro);border-right:2px solid var(--ouro)"></span>
        </div>
        <figcaption class="rm-note" style="margin-top:10px"><strong style="color:var(--navy);font-weight:500">Corner frame (§18.2)</strong> — two active corners, top-left + bottom-right. Frames photos and highlight blocks.</figcaption>
      </figure>
    </div>
    <p class="rm-note" style="margin-top:24px">The wordmark is "REINERS" in Cormorant 700 (tracking 0.18em) with "MEDIA" in Ouro Claro. The microphone <em style="font-style:normal;color:var(--navy)">symbol</em> ships as a separate SVG asset — never recreate it by hand. Textures never compete: one dominant texture per surface.</p>
  `,
  prompt: `Reiners Media wordmark & signature textures.

## Wordmark
"REINERS" in Cormorant Garamond 700, letter-spacing ~0.18em, + "MEDIA" in \`--ouro-claro\`. On Navy: "REINERS" Creme. On Creme: "REINERS" Navy, "MEDIA" Ouro. Min height 24px. Never distort, rotate, recolour off-palette, add shadow/bevel, or reduce contrast.

## Textures
- Dot mesh (\`--dot-mesh\`, size \`--dot-mesh-size\`): monochrome radial-gradient dots over Navy grounds at container opacity ~0.5. The signature texture.
- Corner frame: two active corners (top-left + bottom-right), 2px Ouro. Frames photos/highlight blocks.
- Photo scrim (\`--photo-scrim\`): the only vertical gradient allowed, for text legibility over photos.

## Rule
The microphone symbol is a separate provided SVG — never hand-recreate it. One dominant texture per surface (mesh, frame and rules never compete).
`,
});

console.error('\n✓ 6 foundation cards written');
