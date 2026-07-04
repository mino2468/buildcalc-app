export type MeasurementType = 'floor' | 'wall' | 'linear' | 'count';

export interface WorkType {
  id: string;
  slug: string;
  categorySlug: string;
  unit: string;
  emoji: string;
  measurementType: MeasurementType;
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

/** One line item inside a Wycena document */
export interface WycenaPosition {
  id: string;
  workTypeId: string;
  workTypeName: string;
  workTypeEmoji: string;
  workTypeUnit: string;
  area: number;        // m², mb, or count (szt.) depending on measurementType
  pricePerUnit: number;
  totalPrice: number;
}

/** A complete estimate document (kosztorys) */
export interface Wycena {
  id: string;
  number: number;        // sequential #1, #2, …
  createdAt: string;
  clientName: string;
  clientAddress: string;
  countryCode: string;
  currencyCode: string;
  currencySymbol: string;
  positions: WycenaPosition[];
  totalNet: number;
  vatRate: number;       // 0 | 8 | 23 (percent)
  totalVat: number;
  totalGross: number;
}

/** @deprecated Use Wycena / WycenaPosition instead */
export interface Estimate {
  id: string;
  workTypeId: string;
  workTypeName: string;
  workTypeIconName: string;
  workTypeUnit: string;
  currencyCode: string;
  currencySymbol: string;
  area: number;
  pricePerUnit: number;
  totalPrice: number;
  label: string;
  createdAt: string;
}

export type Language = 'pl' | 'en' | 'de' | 'fr' | 'uk' | 'es' | 'cs';
