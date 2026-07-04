import type { PriceRate } from '@/types';

// Labor-cost-adjusted multipliers vs Poland (PLN base).
// Accounts for both local wage level and currency exchange rate.
const F: Record<string, number> = {
  PL: 1.00, DE: 0.82, GB: 0.68, FR: 0.72, NL: 0.90,
  BE: 0.80, AT: 0.85, CH: 1.28, CZ: 4.10, SE: 7.20,
  NO: 10.0, UA: 3.00, ES: 0.62,
};
const COUNTRIES = Object.keys(F);

function rates(id: string, min: number, avg: number, max: number): PriceRate[] {
  return COUNTRIES.map((cc) => ({
    workTypeId: id,
    countryCode: cc,
    min:  Math.round(min * F[cc]),
    avg:  Math.round(avg * F[cc]),
    max:  Math.round(max * F[cc]),
  }));
}

// Price per unit in PLN (2024 Polish construction market averages).
// Units: m² for area-work, mb for linear-work, szt. for count-work.
export let PRICE_RATES: PriceRate[] = [
  // ── Prace przygotowawcze ──────────────────────────────────────────────────
  ...rates('demolition-walls',        60,  95,  150),  // m²
  ...rates('chipping',                30,  55,   85),  // m²
  ...rates('dismantling',             80, 150,  280),  // szt.
  ...rates('debris-removal',          30,  55,   90),  // m²

  // ── Tynki i gładzie ───────────────────────────────────────────────────────
  ...rates('traditional-plastering',  22,  40,   65),  // m²
  ...rates('smoothing-compound',      18,  28,   45),  // m²
  ...rates('priming',                  6,  12,   20),  // m²

  // ── Malowanie i sufity ────────────────────────────────────────────────────
  ...rates('interior-painting',       10,  18,   30),  // m²
  ...rates('exterior-painting',       18,  32,   52),  // m²
  ...rates('partition-walls',         42,  65,  100),  // m²
  ...rates('suspended-ceiling',       55,  90,  145),  // m²

  // ── Glazurnictwo i flizowanie ─────────────────────────────────────────────
  ...rates('floor-tiles',             55,  85,  130),  // m²
  ...rates('large-format-tiles',      90, 140,  220),  // m²
  ...rates('wall-tiles',              65,  95,  145),  // m²
  ...rates('mosaic',                 110, 160,  250),  // m²
  ...rates('grouting',                12,  20,   35),  // m²

  // ── Wykończenie podłóg ────────────────────────────────────────────────────
  ...rates('laminate-lvt',            18,  30,   48),  // m²
  ...rates('hardwood-floor',          45,  72,  115),  // m²
  ...rates('self-leveling',           18,  28,   45),  // m²
  ...rates('screed',                  22,  38,   62),  // m²
  ...rates('skirting',                16,  26,   42),  // mb

  // ── Stolarka i montaż ─────────────────────────────────────────────────────
  ...rates('door-frames',            280, 450,  700),  // szt.
  ...rates('windowsills',             45,  75,  125),  // mb
  ...rates('pipe-boxing',             90, 150,  240),  // mb

  // ── Instalacje i biały montaż ─────────────────────────────────────────────
  ...rates('electrical',              35,  55,   88),  // m²
  ...rates('plumbing',                75, 120,  185),  // m²
];

/** Replace PRICE_RATES with fresh data fetched from the server. */
export function setRatesFromServer(incoming: PriceRate[]) {
  if (incoming && incoming.length > 0) PRICE_RATES = incoming;
}

/** Rate for a work type + country. */
export function getPriceRate(workTypeId: string, countryCode: string): PriceRate | undefined {
  return PRICE_RATES.find(
    (r) => r.workTypeId === workTypeId && r.countryCode === countryCode,
  );
}
