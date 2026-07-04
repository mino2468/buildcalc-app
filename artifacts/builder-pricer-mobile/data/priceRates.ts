import type { PriceRate } from '@/types';

// Labor-cost-adjusted multipliers vs Poland (PLN base).
// Accounts for local wage level × currency exchange rate.
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

  // ── Ściany i sufity ───────────────────────────────────────────────────────
  ...rates('traditional-plastering',  22,  40,   65),  // m²
  ...rates('smoothing-compound',      18,  28,   45),  // m²
  ...rates('priming',                  6,  12,   20),  // m²
  ...rates('interior-painting',       10,  18,   30),  // m²
  ...rates('exterior-painting',       18,  32,   52),  // m²
  ...rates('wallpaper',               20,  35,   55),  // m²

  // ── Zabudowy GK i sufity podwieszane ─────────────────────────────────────
  ...rates('partition-walls',         42,  65,  100),  // m²
  ...rates('suspended-ceiling',       55,  90,  145),  // m²
  ...rates('led-niche',               85, 135,  210),  // m²
  ...rates('pipe-boxing',             90, 150,  240),  // mb

  // ── Podłogi ───────────────────────────────────────────────────────────────
  ...rates('screed',                  22,  38,   62),  // m²
  ...rates('laminate-lvt',            18,  30,   48),  // m²
  ...rates('hardwood-floor',          45,  72,  115),  // m²
  ...rates('self-leveling',           14,  22,   36),  // m² (subfloor prep)
  ...rates('skirting',                16,  26,   42),  // mb

  // ── Płytki i glazura ──────────────────────────────────────────────────────
  ...rates('floor-tiles',             55,  85,  130),  // m²
  ...rates('large-format-tiles',      90, 140,  220),  // m²
  ...rates('wall-tiles',              65,  95,  145),  // m²
  ...rates('mosaic',                 110, 160,  250),  // m²
  ...rates('grouting',                12,  20,   35),  // m²

  // ── Łazienki ──────────────────────────────────────────────────────────────
  ...rates('bathroom-complete',      250, 420,  680),  // m²
  ...rates('toilet-install',         150, 260,  420),  // szt.
  ...rates('shower-install',         300, 520,  850),  // szt.
  ...rates('bathroom-accessories',    40,  85,  160),  // szt.

  // ── Kuchnie ───────────────────────────────────────────────────────────────
  ...rates('kitchen-prep',            25,  45,   80),  // m²
  ...rates('kitchen-cabinets',        60, 100,  165),  // mb
  ...rates('kitchen-worktop',         80, 145,  230),  // mb

  // ── Drzwi i stolarka ──────────────────────────────────────────────────────
  ...rates('door-frames',            280, 450,  700),  // szt.
  ...rates('windowsills',             45,  75,  125),  // mb
  ...rates('door-trim',               80, 140,  220),  // szt.

  // ── Instalacje elektryczne ────────────────────────────────────────────────
  ...rates('electrical',              35,  55,   88),  // m²
  ...rates('lighting-point',          60, 100,  165),  // szt.
  ...rates('electrical-socket',       35,  60,  100),  // szt.

  // ── Instalacje hydrauliczne ───────────────────────────────────────────────
  ...rates('plumbing',                75, 120,  185),  // m²
  ...rates('plumbing-connection',     80, 145,  230),  // szt.
  ...rates('valve-install',           60, 110,  180),  // szt.

  // ── Wykończenia dekoracyjne ───────────────────────────────────────────────
  ...rates('wall-panels',             45,  78,  125),  // m²
  ...rates('decorative-plaster',      55,  92,  148),  // m²
  ...rates('led-accent',              80, 130,  210),  // mb

  // ── Prace montażowe ───────────────────────────────────────────────────────
  ...rates('furniture-assembly',      80, 155,  290),  // szt.
  ...rates('blinds-curtains',         50,  92,  155),  // szt.
  ...rates('minor-repairs',           50, 100,  200),  // szt.

  // ── Prace końcowe ─────────────────────────────────────────────────────────
  ...rates('final-cleanup',           12,  20,   35),  // m²
  ...rates('final-touch',             10,  18,   30),  // mb
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
