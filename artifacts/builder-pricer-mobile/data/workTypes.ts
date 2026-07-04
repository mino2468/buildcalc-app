import type { MeasurementType, WorkType } from '@/types';

export const WORK_TYPES: WorkType[] = [
  // FLOORING
  {
    id: 'tile-floor', slug: 'tile-floor', categorySlug: 'flooring', unit: 'm²',
    iconName: 'grid-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie płytek podłogowych', categoryName: 'Podłogi' },
      en: { name: 'Floor tile laying', categoryName: 'Flooring' },
      de: { name: 'Bodenfliesen legen', categoryName: 'Böden' },
      fr: { name: 'Pose de carrelage sol', categoryName: 'Sols' },
      uk: { name: 'Укладка плитки на підлозі', categoryName: 'Підлога' },
      es: { name: 'Colocación de azulejos en suelo', categoryName: 'Suelos' },
      cs: { name: 'Pokládka podlahových dlaždic', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'hardwood-floor', slug: 'hardwood-floor', categorySlug: 'flooring', unit: 'm²',
    iconName: 'reorder-four-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie parkietu', categoryName: 'Podłogi' },
      en: { name: 'Hardwood floor installation', categoryName: 'Flooring' },
      de: { name: 'Parkett verlegen', categoryName: 'Böden' },
      fr: { name: 'Pose de parquet', categoryName: 'Sols' },
      uk: { name: 'Укладання паркету', categoryName: 'Підлога' },
      es: { name: 'Instalación de parquet', categoryName: 'Suelos' },
      cs: { name: 'Pokládka parketu', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'laminate-floor', slug: 'laminate-floor', categorySlug: 'flooring', unit: 'm²',
    iconName: 'menu-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie paneli laminowanych', categoryName: 'Podłogi' },
      en: { name: 'Laminate flooring installation', categoryName: 'Flooring' },
      de: { name: 'Laminat verlegen', categoryName: 'Böden' },
      fr: { name: 'Pose de stratifié', categoryName: 'Sols' },
      uk: { name: 'Укладання ламінату', categoryName: 'Підлога' },
      es: { name: 'Instalación de laminado', categoryName: 'Suelos' },
      cs: { name: 'Pokládka laminátové podlahy', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'screed', slug: 'screed', categorySlug: 'flooring', unit: 'm²',
    iconName: 'remove-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Wylewka betonowa / jastrych', categoryName: 'Podłogi' },
      en: { name: 'Concrete screed', categoryName: 'Flooring' },
      de: { name: 'Estrich gießen', categoryName: 'Böden' },
      fr: { name: 'Chape de béton', categoryName: 'Sols' },
      uk: { name: 'Бетонна стяжка', categoryName: 'Підлога' },
      es: { name: 'Solera de cemento', categoryName: 'Suelos' },
      cs: { name: 'Betonová mazanina', categoryName: 'Podlahy' },
    },
  },
  // WALLS
  {
    id: 'wall-tile', slug: 'wall-tile', categorySlug: 'walls', unit: 'm²',
    iconName: 'apps-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Kafelkowanie ścian', categoryName: 'Ściany' },
      en: { name: 'Wall tiling', categoryName: 'Walls' },
      de: { name: 'Wandfliesen legen', categoryName: 'Wände' },
      fr: { name: 'Carrelage mural', categoryName: 'Murs' },
      uk: { name: 'Укладка плитки на стінах', categoryName: 'Стіни' },
      es: { name: 'Alicatado de paredes', categoryName: 'Paredes' },
      cs: { name: 'Obkládání stěn', categoryName: 'Stěny' },
    },
  },
  {
    id: 'plastering', slug: 'plastering', categorySlug: 'walls', unit: 'm²',
    iconName: 'layers-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Tynkowanie ścian', categoryName: 'Ściany' },
      en: { name: 'Plastering walls', categoryName: 'Walls' },
      de: { name: 'Wände verputzen', categoryName: 'Wände' },
      fr: { name: 'Plâtrage des murs', categoryName: 'Murs' },
      uk: { name: 'Штукатурення стін', categoryName: 'Стіни' },
      es: { name: 'Enlucido de paredes', categoryName: 'Paredes' },
      cs: { name: 'Omítkování stěn', categoryName: 'Stěny' },
    },
  },
  {
    id: 'drywall', slug: 'drywall', categorySlug: 'walls', unit: 'm²',
    iconName: 'albums-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Gipsokartony / sucha zabudowa', categoryName: 'Ściany' },
      en: { name: 'Drywall / plasterboard', categoryName: 'Walls' },
      de: { name: 'Trockenbau / Gipskarton', categoryName: 'Wände' },
      fr: { name: 'Cloison sèche / plaque de plâtre', categoryName: 'Murs' },
      uk: { name: 'Гіпсокартон / суха штукатурка', categoryName: 'Стіни' },
      es: { name: 'Pladur / tabique seco', categoryName: 'Paredes' },
      cs: { name: 'Sádrokarton / suchá stavba', categoryName: 'Stěny' },
    },
  },
  // PAINTING
  {
    id: 'interior-painting', slug: 'interior-painting', categorySlug: 'painting', unit: 'm²',
    iconName: 'color-palette-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie wnętrz', categoryName: 'Malowanie' },
      en: { name: 'Interior painting', categoryName: 'Painting' },
      de: { name: 'Innenmalerei', categoryName: 'Malerei' },
      fr: { name: 'Peinture intérieure', categoryName: 'Peinture' },
      uk: { name: 'Фарбування приміщень', categoryName: 'Малярство' },
      es: { name: 'Pintura interior', categoryName: 'Pintura' },
      cs: { name: 'Malování interiérů', categoryName: 'Malování' },
    },
  },
  {
    id: 'exterior-painting', slug: 'exterior-painting', categorySlug: 'painting', unit: 'm²',
    iconName: 'brush-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie elewacji / fasady', categoryName: 'Malowanie' },
      en: { name: 'Exterior / facade painting', categoryName: 'Painting' },
      de: { name: 'Fassadenmalerei / Außenmalerei', categoryName: 'Malerei' },
      fr: { name: 'Peinture façade / extérieure', categoryName: 'Peinture' },
      uk: { name: 'Фарбування фасаду', categoryName: 'Малярство' },
      es: { name: 'Pintura de fachada', categoryName: 'Pintura' },
      cs: { name: 'Malování fasády', categoryName: 'Malování' },
    },
  },
  // ROOFING
  {
    id: 'roof-tiles', slug: 'roof-tiles', categorySlug: 'roofing', unit: 'm²',
    iconName: 'triangle-outline', measurementType: 'roof',
    translations: {
      pl: { name: 'Krycie dachu dachówką', categoryName: 'Dach' },
      en: { name: 'Roof tile installation', categoryName: 'Roofing' },
      de: { name: 'Dachziegel verlegen', categoryName: 'Dach' },
      fr: { name: 'Pose de tuiles de toit', categoryName: 'Toiture' },
      uk: { name: 'Укладка черепиці', categoryName: 'Покрівля' },
      es: { name: 'Colocación de tejas', categoryName: 'Tejado' },
      cs: { name: 'Pokládka střešní krytiny', categoryName: 'Střecha' },
    },
  },
  {
    id: 'metal-roofing', slug: 'metal-roofing', categorySlug: 'roofing', unit: 'm²',
    iconName: 'radio-button-on-outline', measurementType: 'roof',
    translations: {
      pl: { name: 'Blachodachówka / blacha', categoryName: 'Dach' },
      en: { name: 'Metal roofing / sheet metal', categoryName: 'Roofing' },
      de: { name: 'Metallblech-Dachdeckung', categoryName: 'Dach' },
      fr: { name: 'Couverture en métal', categoryName: 'Toiture' },
      uk: { name: 'Металочерепиця / профнастил', categoryName: 'Покрівля' },
      es: { name: 'Cubierta metálica', categoryName: 'Tejado' },
      cs: { name: 'Plechová střecha', categoryName: 'Střecha' },
    },
  },
  // INSULATION
  {
    id: 'wall-insulation', slug: 'wall-insulation', categorySlug: 'insulation', unit: 'm²',
    iconName: 'thermometer-outline', measurementType: 'wall',
    translations: {
      pl: { name: 'Ocieplenie ścian / elewacji', categoryName: 'Ocieplenie' },
      en: { name: 'Wall / facade insulation', categoryName: 'Insulation' },
      de: { name: 'Wanddämmung / Fassadendämmung', categoryName: 'Dämmung' },
      fr: { name: 'Isolation des murs / façade', categoryName: 'Isolation' },
      uk: { name: 'Утеплення стін / фасаду', categoryName: 'Утеплення' },
      es: { name: 'Aislamiento de fachada', categoryName: 'Aislamiento' },
      cs: { name: 'Zateplení stěn / fasády', categoryName: 'Zateplení' },
    },
  },
  {
    id: 'roof-insulation', slug: 'roof-insulation', categorySlug: 'insulation', unit: 'm²',
    iconName: 'cloudy-outline', measurementType: 'roof',
    translations: {
      pl: { name: 'Ocieplenie dachu / poddasza', categoryName: 'Ocieplenie' },
      en: { name: 'Roof / attic insulation', categoryName: 'Insulation' },
      de: { name: 'Dachdämmung / Dachbodendämmung', categoryName: 'Dämmung' },
      fr: { name: 'Isolation toiture / combles', categoryName: 'Isolation' },
      uk: { name: 'Утеплення даху / горища', categoryName: 'Утеплення' },
      es: { name: 'Aislamiento de tejado', categoryName: 'Aislamiento' },
      cs: { name: 'Zateplení střechy / podkroví', categoryName: 'Zateplení' },
    },
  },
  // ELECTRICAL
  {
    id: 'electrical', slug: 'electrical', categorySlug: 'electrical', unit: 'm²',
    iconName: 'flash-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja elektryczna', categoryName: 'Elektryka' },
      en: { name: 'Electrical installation', categoryName: 'Electrical' },
      de: { name: 'Elektroinstallation', categoryName: 'Elektrik' },
      fr: { name: 'Installation électrique', categoryName: 'Électricité' },
      uk: { name: 'Електромонтаж', categoryName: 'Електрика' },
      es: { name: 'Instalación eléctrica', categoryName: 'Electricidad' },
      cs: { name: 'Elektroinstalace', categoryName: 'Elektrika' },
    },
  },
  // PLUMBING
  {
    id: 'plumbing', slug: 'plumbing', categorySlug: 'plumbing', unit: 'm²',
    iconName: 'water-outline', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja hydrauliczna', categoryName: 'Hydraulika' },
      en: { name: 'Plumbing installation', categoryName: 'Plumbing' },
      de: { name: 'Sanitärinstallation', categoryName: 'Sanitär' },
      fr: { name: 'Installation de plomberie', categoryName: 'Plomberie' },
      uk: { name: 'Сантехнічна установка', categoryName: 'Сантехніка' },
      es: { name: 'Instalación de fontanería', categoryName: 'Fontanería' },
      cs: { name: 'Instalatérské práce', categoryName: 'Instalatérství' },
    },
  },
];

export const CATEGORY_ORDER = [
  'flooring', 'walls', 'painting', 'roofing', 'insulation', 'electrical', 'plumbing',
];

export function getWorkTypesByCategory(): Record<string, WorkType[]> {
  const result: Record<string, WorkType[]> = {};
  for (const wt of WORK_TYPES) {
    const cat = wt.categorySlug;
    if (!result[cat]) result[cat] = [];
    result[cat].push(wt);
  }
  return result;
}

export function getWorkTypeById(id: string): WorkType | undefined {
  return WORK_TYPES.find((w) => w.id === id);
}
