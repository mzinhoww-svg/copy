# Reiners Media — how to build on this system

Reiners Media is a **studio de comunicação estratégica institucional**. The brand
is sober, precise, permanent — "dourada no detalhe". Fidelity to this system
outranks any aesthetic instinct: never invent a colour, font, radius or spacing
value. When something isn't covered, reuse the nearest existing token.

This is a **foundations design system** — design tokens, three type families,
and a linear icon language. It ships no React components; you compose layouts
yourself using these tokens. Everything is delivered through one stylesheet.

## Setup — no provider, just one stylesheet

```html
<link rel="stylesheet" href="styles.css">
```

`styles.css` is the only file to link. It `@import`s the fonts and every token,
and sets a sober base (Creme ground, Tinta body text in DM Sans at 1.7 leading,
serif headings). There is no JS bundle to load and no React provider to wrap.

## Styling idiom — CSS custom properties

Style with the token variables below. Never hard-code a hex, px, or font name
that a token already carries.

- **Colour** — `--navy` #14243E · `--ouro` #9A7B35 · `--creme` #FAF7F2 · `--tinta` #1A1510 · `--aco` · `--ouro-claro` · `--ouro-palido` · `--pergaminho` · `--medio` · `--claro`. Semantic aliases: `--bg`, `--bg-alt`, `--bg-dark`, `--text`, `--text-secondary`, `--text-on-dark`, `--accent`, `--border`.
- **Type** — families `--serif` (Cormorant Garamond, titles + emphasis italic), `--sans` (DM Sans, body/UI), `--mono` (DM Mono, kickers/labels). Sizes `--fs-h1`…`--fs-kicker`; weights `--weight-light…bold`; `--lh-body` 1.7; `--tracking-kicker` 0.18em. Helper classes: `.rm-h1 .rm-h2 .rm-h3 .rm-body .rm-caption .rm-kicker .rm-em`.
- **Spacing** — `--space-1`(4px) … `--space-10`(120px), all multiples of 8px. Layout: `--content-max` 1180px, 12 columns, `--section-pad-y` 96px.
- **Radius** — `--radius-sm` 4px · `--radius-md` 6px (default) · `--radius-full` 999px.
- **Texture** — `--dot-mesh` (+`--dot-mesh-size`) over Navy · `--photo-scrim` for text over photos · `--gold-fill-soft` for faint fills behind icons.

## Hard rules (this is what keeps it on-brand)

- **60 / 28 / 12** — Creme ground dominates, Navy for contrast blocks, Ouro as accent only. **Gold is never a large fill** (no gold section/card/primary-button background; no small gold body text on Creme — it fails AA).
- **Flat — no `box-shadow`, ever.** There is no shadow token. Show elevation with background contrast (Creme card on Pergaminho) + a 1px `--border` border.
- **No decorative colour gradients.** The only gradients allowed are `--photo-scrim` (legibility over photos) and the monochrome `--dot-mesh`.
- **Three families only.** Serif = titles/emotion, Sans = reading/function, Mono = labels only (never Mono in running text). At most one `--em` gold italic per title. Never a fourth family. Body never below 14px.
- **Icons** are linear, 1.5px stroke, single-colour, no fill, no shadow (24×24 grid).
- **No** emojis, filled/traffic-light badges, illustrations, mascots, or figurative infographics. Represent people/scenes with real documentary photography, not drawings.
- **Buttons**: primary = Navy fill + Creme text, radius 6px, no shadow; secondary = transparent + 1px Ouro border + Ouro text. Hover = slight tone shift (8–10%), never scale or shadow.
- **Voice**: institutional, literary, first-person plural. Avoid: "engajamento", "conteúdo viral", "alcance", "pacote de posts". Prefer: "posicionamento contínuo", "presença institucional", "autoridade de marca". No exclamation marks in brand copy.

## Where the truth lives

Read `styles.css` and its `@import`s (`tokens/colors.css`, `tokens/typography.css`,
`tokens/spacing.css`, `fonts/fonts.css`) for exact values, and each card's
`components/<group>/<Name>/<Name>.prompt.md` for the rule that governs it.

## One idiomatic snippet

```html
<section style="background:var(--creme);padding:var(--space-9) var(--space-7)">
  <p class="rm-kicker">01 — Posicionamento Contínuo</p>
  <h1 class="rm-h1" style="max-width:14ch">Presença que <em class="rm-em">posiciona</em>.</h1>
  <hr style="width:54px;height:1px;background:var(--ouro);border:0;margin:var(--space-4) 0">
  <p class="rm-body" style="max-width:60ch;color:var(--tinta)">
    Não entregamos posts. Entregamos posicionamento.
  </p>
  <a href="#" style="display:inline-block;margin-top:var(--space-5);padding:14px 28px;
     background:var(--navy);color:var(--creme);border-radius:var(--radius-md);
     font-family:var(--sans);font-weight:500;text-decoration:none">Falar com o studio</a>
</section>
```
