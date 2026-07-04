import type { Country } from '@/types';

export const COUNTRIES: Country[] = [
  {
    code: 'PL', currencyCode: 'PLN', currencySymbol: 'zł',
    translations: { pl: 'Polska', en: 'Poland', de: 'Polen', fr: 'Pologne', uk: 'Польща', es: 'Polonia', cs: 'Polsko' },
  },
  {
    code: 'DE', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Niemcy', en: 'Germany', de: 'Deutschland', fr: 'Allemagne', uk: 'Німеччина', es: 'Alemania', cs: 'Německo' },
  },
  {
    code: 'GB', currencyCode: 'GBP', currencySymbol: '£',
    translations: { pl: 'Wielka Brytania', en: 'United Kingdom', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni', uk: 'Велика Британія', es: 'Reino Unido', cs: 'Velká Británie' },
  },
  {
    code: 'FR', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Francja', en: 'France', de: 'Frankreich', fr: 'France', uk: 'Франція', es: 'Francia', cs: 'Francie' },
  },
  {
    code: 'NL', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Holandia', en: 'Netherlands', de: 'Niederlande', fr: 'Pays-Bas', uk: 'Нідерланди', es: 'Países Bajos', cs: 'Nizozemsko' },
  },
  {
    code: 'BE', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Belgia', en: 'Belgium', de: 'Belgien', fr: 'Belgique', uk: 'Бельгія', es: 'Bélgica', cs: 'Belgie' },
  },
  {
    code: 'AT', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Austria', en: 'Austria', de: 'Österreich', fr: 'Autriche', uk: 'Австрія', es: 'Austria', cs: 'Rakousko' },
  },
  {
    code: 'CH', currencyCode: 'CHF', currencySymbol: 'CHF',
    translations: { pl: 'Szwajcaria', en: 'Switzerland', de: 'Schweiz', fr: 'Suisse', uk: 'Швейцарія', es: 'Suiza', cs: 'Švýcarsko' },
  },
  {
    code: 'CZ', currencyCode: 'CZK', currencySymbol: 'Kč',
    translations: { pl: 'Czechy', en: 'Czech Republic', de: 'Tschechien', fr: 'République tchèque', uk: 'Чехія', es: 'República Checa', cs: 'Česká republika' },
  },
  {
    code: 'SE', currencyCode: 'SEK', currencySymbol: 'kr',
    translations: { pl: 'Szwecja', en: 'Sweden', de: 'Schweden', fr: 'Suède', uk: 'Швеція', es: 'Suecia', cs: 'Švédsko' },
  },
  {
    code: 'NO', currencyCode: 'NOK', currencySymbol: 'kr',
    translations: { pl: 'Norwegia', en: 'Norway', de: 'Norwegen', fr: 'Norvège', uk: 'Норвегія', es: 'Noruega', cs: 'Norsko' },
  },
  {
    code: 'UA', currencyCode: 'UAH', currencySymbol: '₴',
    translations: { pl: 'Ukraina', en: 'Ukraine', de: 'Ukraine', fr: 'Ukraine', uk: 'Україна', es: 'Ucrania', cs: 'Ukrajina' },
  },
  {
    code: 'ES', currencyCode: 'EUR', currencySymbol: '€',
    translations: { pl: 'Hiszpania', en: 'Spain', de: 'Spanien', fr: 'Espagne', uk: 'Іспанія', es: 'España', cs: 'Španělsko' },
  },
];

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getCountryName(country: Country, lang: string): string {
  return country.translations[lang] ?? country.translations['en'] ?? country.code;
}
