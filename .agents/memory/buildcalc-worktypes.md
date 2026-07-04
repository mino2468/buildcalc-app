---
name: BuildCalc work types catalog
description: Work type model, categories, measurement types, and price rate generation for the mobile app
---

## Work type catalog

26 work types across 7 categories modelled on ewyceniarka.pl:
- `prep` — Prace przygotowawcze (demolition-walls, chipping, dismantling, debris-removal)
- `plastering` — Tynki i gładzie (traditional-plastering, smoothing-compound, priming)
- `painting` — Malowanie i sufity (interior-painting, exterior-painting, partition-walls, suspended-ceiling)
- `tiling` — Glazurnictwo i flizowanie (floor-tiles, large-format-tiles, wall-tiles, mosaic, grouting)
- `flooring` — Wykończenie podłóg (laminate-lvt, hardwood-floor, self-leveling, screed, skirting)
- `carpentry` — Stolarka i montaż (door-frames, windowsills, pipe-boxing)
- `installations` — Instalacje i biały montaż (electrical, plumbing)

## Measurement types (MeasurementType)

Four values: `'floor' | 'wall' | 'linear' | 'count'`
- `floor` / `wall`: two-dim input (dim1 × dim2 → area m²)
- `linear`: single input → area = mb (e.g. skirting, windowsills, pipe-boxing)
- `count`: single input → area = szt. (e.g. dismantling, door-frames)

**Why:** linear (mb) and count (szt.) items can't use 2D area input; the calculator conditionally renders the right UI.

**How to apply:** in index.tsx, `pendingWT.measurementType === 'linear' || 'count'` shows single dim input. Price label replaces `m²` with the work type's unit dynamically.

## WorkType.emoji (not iconName)

`WorkType` uses `emoji: string` (Text component) instead of `iconName` (Ionicons) to avoid Android font-load timing issues with `newArchEnabled: true`.

**Why:** Ionicons glyph rendering was unreliable on Android with new architecture. Emoji renders natively with no font dependency.

## Price rates model

`data/priceRates.ts` uses a helper `rates(id, min, avg, max)` that multiplies PLN base rates by country factors:
```
PL:1.00 DE:0.82 GB:0.68 FR:0.72 NL:0.90 BE:0.80 AT:0.85
CH:1.28 CZ:4.10 SE:7.20 NO:10.0 UA:3.00 ES:0.62
```
Factors account for both local labor costs and FX rate relative to PLN.

## Static Ionicons font embedding (app.json)

`expo-font` plugin embeds `./assets/fonts/Ionicons.ttf` (copied from `node_modules/@expo/vector-icons/...`). This ensures Ionicons works for UI chrome (chevrons, action icons) in native builds.

## WycenaPosition

Has `workTypeEmoji: string` (not `workTypeIconName`). The deprecated `Estimate` type still has `workTypeIconName` for backward compat — EstimateCard.tsx renders old saved data.
