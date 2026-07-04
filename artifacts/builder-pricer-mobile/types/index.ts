export interface WorkType {
  id: string;
  slug: string;
  categorySlug: string;
  unit: string;
  iconName: string;
  translations: Record<string, { name: string; categoryName: string }>;
}

export interface Country {
  code: string;
  currencyCode: string;
  currencySymbol: string;
  translations: Record<string, string>;
}

export interface PriceRate {
  workTypeId: string;
  countryCode: string;
  min: number;
  avg: number;
  max: number;
}

export interface Estimate {
  id: string;
  workTypeId: string;
  workTypeName: string;
  workTypeIconName: string;
  workTypeUnit: string;
  countryCode: string;
  countryName: string;
  area: number;
  pricePerUnit: number;
  totalPrice: number;
  currencyCode: string;
  currencySymbol: string;
  label: string;
  createdAt: string;
}

export type Language = 'pl' | 'en' | 'de' | 'fr' | 'uk' | 'es' | 'cs';
