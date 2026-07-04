---
name: BuildCalc currency & rates model
description: How currency selection, price rates, and Estimate shape work in the mobile app
---

## Currency model
- `CURRENCIES` array (data/currencies.ts): 8 unique currencies — EUR, PLN, GBP, CHF, CZK, SEK, NOK, UAH. No duplicates.
- `AppContext` stores `currencyCode` (not `countryCode`). `setCurrencyCode` persists to AsyncStorage.
- `getCurrencyByCode(code)` and `getCurrencyName(currency, lang)` are the main currency helpers.
- `LANG_DEFAULT_CURRENCY` maps each language to its default currency on first launch.

## Estimate shape
- `Estimate` type: `currencyCode`, `currencySymbol` — no `countryCode` or `countryName`.
- History summary groups totals by currency (summing across currencies is meaningless).

## Rates
- `getPriceRateByCurrency(workTypeId, currencyCode)` — averages EUR-zone countries for EUR, direct lookup for others.
- `setRatesFromServer(rates)` — called in `_layout.tsx` at startup after fetching `GET /api/rates`.
- `EXPO_PUBLIC_API_URL` env var must point to the api-server artifact base URL.

## Print
- `printEstimate(estimate, company)` in utils/printEstimate.ts — HTML template → expo-print → expo-sharing.
- Company info (name, address, phone, email, logoUri as base64) stored in CompanyContext / AsyncStorage.
- expo-print version must be ~15.0.8 and expo-sharing ~14.0.8 for Expo SDK compatibility.

**Why:** Removed country concept entirely to avoid duplicate EUR entries and simplify UX. Currency is the relevant financial unit for pricing.
