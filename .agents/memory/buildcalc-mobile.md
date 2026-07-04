---
name: BuildCalc mobile architecture
description: Key decisions for the BuildCalc Expo/React Native app (artifacts/builder-pricer-mobile)
---

## Architecture

- **Frontend-only** — no backend. All data hardcoded in `data/`. Persistence via AsyncStorage.
- **Languages**: pl, en, de, fr, uk, es, cs (7 languages). Stored in `data/translations.ts`.
- **Countries**: PL, DE, GB, FR, NL, BE, AT, CH, CZ, SE, NO, UA, ES (13). Stored in `data/countries.ts`.
- **Work types**: 15 types across 7 categories. Stored in `data/workTypes.ts`.
- **Price rates**: one `PriceRate` per `{workTypeId, countryCode}` pair in `data/priceRates.ts`.

## Cross-screen state: work type selection

Work type picker (`app/work-type-select.tsx`) is a Stack modal. To pass selection back to Calculator tab without router params or extra context, we use a module singleton:

```ts
// utils/calcStore.ts
export let pendingWorkTypeId: string | null = null;
export function setPendingWorkTypeId(id: string | null) { pendingWorkTypeId = id; }
```

Calculator reads it in `useFocusEffect` on screen focus. Set to null after reading.

**Why:** Expo Router doesn't support function callbacks as route params. Context would cause re-renders. Module singleton is simple and effective.

## Price calculation edge case

`customPrice` field uses `customPrice !== '' ? parseFloat(customPrice) : rate.avg` — NOT `parseFloat(customPrice) || rate.avg`, because the `||` form treats "0" as falsy and reverts to avg.

## Language → country defaults

Each language maps to a sensible default country on first launch (in `language-select.tsx`). Spanish ('es') maps to 'ES' (Spain). All countries must exist in `data/countries.ts`.

## Tab layout

Uses `expo-router` Tabs + Ionicons. NativeTabs / expo-glass-effect were removed (Android focus). `expo-blur` is still used for iOS tab bar background.

## Shadow style warning

React Native web shows deprecation warning for `shadow*` style props. Non-critical.
