---
name: BuildCalc work types catalog
description: Work type model, categories, measurement types, and price rate generation for the mobile app
---

## Work type catalog — 13 categories, 48 work types

Matches ewyceniarka.pl full interior-finishing catalog:

| # | slug | Polish name | items |
|---|------|-------------|-------|
| 1 | `prep` | Prace przygotowawcze | 4 |
| 2 | `walls-ceilings` | Ściany i sufity | 6 |
| 3 | `drywall` | Zabudowy GK i sufity | 4 |
| 4 | `flooring` | Podłogi | 5 |
| 5 | `tiling` | Płytki i glazura | 5 |
| 6 | `bathroom` | Łazienki | 4 |
| 7 | `kitchen` | Kuchnie | 3 |
| 8 | `carpentry` | Drzwi i stolarka | 3 |
| 9 | `electrical` | Instalacje elektryczne | 3 |
| 10 | `plumbing` | Instalacje hydrauliczne | 3 |
| 11 | `decorative` | Wykończenia dekoracyjne | 3 |
| 12 | `assembly` | Prace montażowe | 3 |
| 13 | `finishing` | Prace końcowe | 2 |

## Measurement types (MeasurementType)

Four values: `'floor' | 'wall' | 'linear' | 'count'`
- `floor` / `wall`: two-dim input (dim1 × dim2 → area m²)
- `linear`: single input → length in mb (skirting, windowsills, pipe-boxing, LED accents...)
- `count`: single input → quantity in szt. (doors, fixtures, accessories...)

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

## Category slug note

`'walls-ceilings'` has a hyphen — must be quoted in TypeScript object keys: `'walls-ceilings': string` in TranslationKeys.categories type.
Legacy slugs (`plastering`, `painting`, `installations`, `walls`, `roofing`, `insulation`) kept in translations for backward compat but no work types reference them anymore.

## work-type-select.tsx two-step picker

Step 1: 2-column grid (FlatList numColumns=2). CAT_COLORS array must have exactly 13 entries matching CATEGORY_ORDER order.
Step 2: work items list for selected category.
Search overrides both steps. Back button clears search (not router.back) when query is non-empty.
