Reiners Media spacing scale (8px base). Every gap/pad/margin is a multiple of 8px via tokens `--space-1`(4px) … `--space-10`(120px).

## Key values
- `--space-3` 16px (related elements) · `--space-4` 24px (grid gap) · `--space-5` 32px (card padding) · `--space-9` 96px (section vertical padding).
- Grid: 12 columns desktop, `--content-max` 1180px centered, section side padding 56px desktop / 24px mobile.

## Rule
Never use a value off the scale (10px, 18px, 50px are invalid) — round to the nearest token.
