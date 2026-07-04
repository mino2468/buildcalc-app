// Unique currencies used across all supported countries.
// For EUR (multiple countries) we average rates across all EUR countries.

export interface CurrencyDef {
  code: string;
  symbol: string;
  /** Country codes that use this currency (for rate averaging) */
  countryCodes: string[];
  /** Human-readable names per UI language */
  names: Record<string, string>;
}

export const CURRENCIES: CurrencyDef[] = [
  {
    code: 'EUR', symbol: '€',
    countryCodes: ['DE', 'FR', 'NL', 'BE', 'AT', 'ES'],
    names: { pl: 'Euro (strefa euro)', en: 'Euro (eurozone)', de: 'Euro (Eurozone)', fr: 'Euro (zone euro)', uk: 'Євро (єврозона)', es: 'Euro (zona euro)', cs: 'Euro (eurozóna)' },
  },
  {
    code: 'PLN', symbol: 'zł',
    countryCodes: ['PL'],
    names: { pl: 'Złoty polski', en: 'Polish Złoty', de: 'Polnischer Złoty', fr: 'Zloty polonais', uk: 'Польський злотий', es: 'Esloti polaco', cs: 'Polský zlotý' },
  },
  {
    code: 'GBP', symbol: '£',
    countryCodes: ['GB'],
    names: { pl: 'Funt szterling', en: 'British Pound', de: 'Britisches Pfund', fr: 'Livre sterling', uk: 'Британський фунт', es: 'Libra esterlina', cs: 'Britská libra' },
  },
  {
    code: 'CHF', symbol: 'CHF',
    countryCodes: ['CH'],
    names: { pl: 'Frank szwajcarski', en: 'Swiss Franc', de: 'Schweizer Franken', fr: 'Franc suisse', uk: 'Швейцарський франк', es: 'Franco suizo', cs: 'Švýcarský frank' },
  },
  {
    code: 'CZK', symbol: 'Kč',
    countryCodes: ['CZ'],
    names: { pl: 'Korona czeska', en: 'Czech Koruna', de: 'Tschechische Krone', fr: 'Couronne tchèque', uk: 'Чеська крона', es: 'Corona checa', cs: 'Česká koruna' },
  },
  {
    code: 'SEK', symbol: 'kr',
    countryCodes: ['SE'],
    names: { pl: 'Korona szwedzka', en: 'Swedish Krona', de: 'Schwedische Krone', fr: 'Couronne suédoise', uk: 'Шведська крона', es: 'Corona sueca', cs: 'Švédská koruna' },
  },
  {
    code: 'NOK', symbol: 'kr',
    countryCodes: ['NO'],
    names: { pl: 'Korona norweska', en: 'Norwegian Krone', de: 'Norwegische Krone', fr: 'Couronne norvégienne', uk: 'Норвезька крона', es: 'Corona noruega', cs: 'Norská koruna' },
  },
  {
    code: 'UAH', symbol: '₴',
    countryCodes: ['UA'],
    names: { pl: 'Hrywna ukraińska', en: 'Ukrainian Hryvnia', de: 'Ukrainische Hrywnja', fr: 'Hryvnia ukrainienne', uk: 'Українська гривня', es: 'Grivna ucraniana', cs: 'Ukrajinská hřivna' },
  },
];

export function getCurrencyByCode(code: string): CurrencyDef | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

export function getCurrencyName(currency: CurrencyDef, lang: string): string {
  return currency.names[lang] ?? currency.names['en'] ?? currency.code;
}

/** Default currency per UI language (for first-launch setup). */
export const LANG_DEFAULT_CURRENCY: Record<string, string> = {
  pl: 'PLN', en: 'GBP', de: 'EUR', fr: 'EUR', uk: 'UAH', es: 'EUR', cs: 'CZK',
};
