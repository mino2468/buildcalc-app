---
name: BuildCalc mobile architecture
description: Key architectural decisions for the BuildCalc Expo mobile app (artifacts/builder-pricer-mobile)
---

## UX model: multi-position Wycena builder (ewyceniarka.pl-style)

The app now works like a construction quote builder, not a single-item calculator:
- **Wycena** = one complete estimate document with multiple positions (roboty)
- User adds positions one by one (select work type → dims → area → price → confirm)
- Client name/address optional at top
- VAT picker at bottom (0% / 8% / 23%)
- Save → persists full document; Print → generates professional HTML→PDF kosztorys

**Why:** Owner wanted the flow similar to ewyceniarka.pl (document-centric, not item-centric).

## Context: WycenasContext replaces EstimatesContext

- `context/WycenasContext.tsx` — stores `Wycena[]` in AsyncStorage key `buildcalc_wycenas_v2`
- Sequential numbering uses a `useRef` (counterRef) incremented atomically — prevents duplicate document numbers on rapid taps
- `addWycena()` returns the created `Wycena` synchronously so callers (save+print flow) use the exact same document with its correct number

**How to apply:** Always use the returned value from `addWycena` for post-save operations (e.g. printing). Never read `nextNumber` after calling `addWycena` for the just-created doc — it's already incremented.

## calcStore singleton: always use getter

`getPendingWorkTypeId()` getter must be used in `useFocusEffect` callbacks, not the bare `export let pendingWorkTypeId` (Metro snapshots the value at null).

## Ionicons on Android

`...Ionicons.font` must be included in the `useFonts()` call in `app/_layout.tsx`. Without it, Ionicons renders as empty boxes on Android.

## Translations

Clean, non-duplicate `TranslationKeys` interface. Adding keys: update the interface type block AND all 7 language objects in `data/translations.ts`. Use node script only for simple appends; for structural changes, rewrite the file cleanly to avoid duplicate key TS errors. Never use a generic dedup regex script on this file — it corrupts values.

## Types

`Estimate` is deprecated (kept for backward compat). New types: `WycenaPosition` (one line item) + `Wycena` (full document with positions, VAT, client info, sequential number).

## Print

`utils/printWycena.ts` — generates HTML kosztorys with professional layout (company header, client block, position table with Lp/nazwa/ilość/cena/wartość, VAT rows, brutto total). Uses `expo-print` + `expo-sharing`.
