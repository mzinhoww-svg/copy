# Reiners Media Design System — sync notes

## What this is
A **foundations-only, off-script** design system synced to claude.ai/design
(project `c4b78d79-ba01-4cb7-822b-86a29ba5e6ba`, "Reiners Media Design System").
Built by hand from two brand documents (the Brand Guideline Edição 02 and the
LLM System Prompt), because this repo has **no source component library** to run
the design-sync converter against. The uploaded bundle lives in `ds-bundle/`.

## How the bundle is (re)built — deterministic, no converter
The `ds-bundle/` is authored by three scripts in `.design-sync/`:
1. `node .design-sync/fetch-fonts.mjs` — downloads the three brand families
   (Cormorant Garamond, DM Sans, DM Mono; latin + latin-ext subsets) from Google
   Fonts and self-hosts the woff2 under `ds-bundle/fonts/` with a local `fonts.css`.
   Keyed by local filename so no weight is deduped away.
3. `node .design-sync/build-cards.mjs` — emits the 6 foundation preview cards
   under `ds-bundle/components/<group>/<Name>/` (`.html` + `.prompt.md`).
Hand-maintained files: `ds-bundle/tokens/{colors,typography,spacing}.css`,
`ds-bundle/styles.css`, `ds-bundle/_ds_bundle.js` (empty-bodied, `components:[]`),
`ds-bundle/.ds-build-meta.json` (`componentCount` must equal the number of cards),
`ds-bundle/README.md` (= `.design-sync/conventions.md` + a short body).

## Verify
`node .ds-sync/package-validate.mjs ./ds-bundle` must exit 0. Playwright **1.56.0**
matches the pre-installed Chromium build **1194** at `/opt/pw-browsers`; other
versions fail to launch. Install into `.ds-sync/` (`cd .ds-sync && npm i playwright@1.56.0`).

## Contract notes learned
- `_ds_bundle.js` header must keep `components:[]` so validate skips the
  `[BUNDLE_EXPORT]` smoke check (there are no `window.ReinersMedia.*` components).
- `.ds-build-meta.json` `componentCount` MUST equal the number of `<Name>.html`
  files, or validate fails a count mismatch. It is 6 today (one per card).
- `_ds_sync.json` is intentionally **omitted** — legitimate for an off-script
  layout (validate warns, non-blocking). Consequence: every future sync
  re-verifies from scratch (fine at this size).
- Fonts are self-hosted, so no `[FONT_MISSING]`. If a card ever uses a glyph
  outside latin/latin-ext, extend `keepSubsets` in `fetch-fonts.mjs`.

## Re-sync risks / what can go stale
- **Fonts are network-fetched at build time.** A fresh clone must re-run
  `fetch-fonts.mjs` (the woff2 are committed, so normally not needed).
- Playwright/Chromium version pin (1.56.0 ↔ build 1194) can drift if the base
  image updates — re-check `/opt/pw-browsers/chromium-*` and match the version.
- Adding/removing a card means updating `componentCount` in `.ds-build-meta.json`
  by the same delta.
- This is off-script: the design-sync converter (`package-build.mjs`) is NOT the
  build path. Don't try to `--force` a converter run against this repo.

## Adding real components later
If the user later wants composed components (buttons, cards, badges, etc.),
build them as a real React package with a `dist/` and switch to the standard
converter flow, or extend `build-cards.mjs` to emit static component cards.
