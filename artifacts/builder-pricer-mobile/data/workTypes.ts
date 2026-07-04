import type { WorkType } from '@/types';

export const WORK_TYPES: WorkType[] = [
  // ── PRACE PRZYGOTOWAWCZE ──────────────────────────────────────────────────
  {
    id: 'demolition-walls', slug: 'demolition-walls', categorySlug: 'prep', unit: 'm²',
    emoji: '🔨', measurementType: 'wall',
    translations: {
      pl: { name: 'Wyburzanie ścian działowych', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Demolition of partition walls', categoryName: 'Preparation' },
      de: { name: 'Abriss von Trennwänden', categoryName: 'Vorbereitung' },
      fr: { name: 'Démolition de cloisons', categoryName: 'Préparation' },
      uk: { name: 'Знесення перегородок', categoryName: 'Підготовчі роботи' },
      es: { name: 'Derribo de tabiques', categoryName: 'Preparación' },
      cs: { name: 'Bourání příčkových stěn', categoryName: 'Přípravné práce' },
    },
  },
  {
    id: 'chipping', slug: 'chipping', categorySlug: 'prep', unit: 'm²',
    emoji: '⛏️', measurementType: 'wall',
    translations: {
      pl: { name: 'Kucie starych kafelków / tynków', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Chipping old tiles / plaster', categoryName: 'Preparation' },
      de: { name: 'Abmeißeln alter Fliesen / Putz', categoryName: 'Vorbereitung' },
      fr: { name: 'Piquage anciens carrelages / enduits', categoryName: 'Préparation' },
      uk: { name: 'Збивання старої плитки / штукатурки', categoryName: 'Підготовчі роботи' },
      es: { name: 'Picado de azulejos / yesos antiguos', categoryName: 'Preparación' },
      cs: { name: 'Sekání starých obkladů / omítek', categoryName: 'Přípravné práce' },
    },
  },
  {
    id: 'dismantling', slug: 'dismantling', categorySlug: 'prep', unit: 'szt.',
    emoji: '🔧', measurementType: 'count',
    translations: {
      pl: { name: 'Demontaż (drzwi, sanitarne, elementy)', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Dismantling (doors, sanitary, elements)', categoryName: 'Preparation' },
      de: { name: 'Demontage (Türen, Sanitär, Elemente)', categoryName: 'Vorbereitung' },
      fr: { name: 'Démontage (portes, sanitaires, éléments)', categoryName: 'Préparation' },
      uk: { name: 'Демонтаж (двері, сантехніка, елементи)', categoryName: 'Підготовчі роботи' },
      es: { name: 'Desmontaje (puertas, sanitarios, elementos)', categoryName: 'Preparación' },
      cs: { name: 'Demontáž (dveře, sanitární, prvky)', categoryName: 'Přípravné práce' },
    },
  },
  {
    id: 'debris-removal', slug: 'debris-removal', categorySlug: 'prep', unit: 'm²',
    emoji: '🗑️', measurementType: 'floor',
    translations: {
      pl: { name: 'Wynoszenie gruzu i odpadów', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Removal of rubble and waste', categoryName: 'Preparation' },
      de: { name: 'Schuttabfuhr und Entsorgung', categoryName: 'Vorbereitung' },
      fr: { name: 'Évacuation des gravats et déchets', categoryName: 'Préparation' },
      uk: { name: 'Вивезення сміття та відходів', categoryName: 'Підготовчі роботи' },
      es: { name: 'Retirada de escombros y residuos', categoryName: 'Preparación' },
      cs: { name: 'Odvoz suti a odpadu', categoryName: 'Přípravné práce' },
    },
  },

  // ── TYNKI I GŁADZIE ───────────────────────────────────────────────────────
  {
    id: 'traditional-plastering', slug: 'traditional-plastering', categorySlug: 'plastering', unit: 'm²',
    emoji: '🪣', measurementType: 'wall',
    translations: {
      pl: { name: 'Tynkowanie tradycyjne / maszynowe', categoryName: 'Tynki i gładzie' },
      en: { name: 'Traditional / machine plastering', categoryName: 'Plastering' },
      de: { name: 'Traditionelles / Maschinenputzen', categoryName: 'Verputzen' },
      fr: { name: 'Plâtrage traditionnel / machine', categoryName: 'Plâtrerie' },
      uk: { name: 'Традиційне / машинне штукатурення', categoryName: 'Штукатурка і шпаклівка' },
      es: { name: 'Yesado tradicional / mecánico', categoryName: 'Enlucidos' },
      cs: { name: 'Tradiční / strojní omítání', categoryName: 'Omítky a stěrky' },
    },
  },
  {
    id: 'smoothing-compound', slug: 'smoothing-compound', categorySlug: 'plastering', unit: 'm²',
    emoji: '🖌️', measurementType: 'wall',
    translations: {
      pl: { name: 'Nakładanie gładzi gipsowej / polimerowej', categoryName: 'Tynki i gładzie' },
      en: { name: 'Applying gypsum / polymer smoothing compound', categoryName: 'Plastering' },
      de: { name: 'Auftragen von Gips-/Polymerglättmasse', categoryName: 'Verputzen' },
      fr: { name: 'Application d\'enduit de lissage', categoryName: 'Plâtrerie' },
      uk: { name: 'Нанесення гіпсової / полімерної шпаклівки', categoryName: 'Штукатурка і шпаклівка' },
      es: { name: 'Aplicación de pasta de enlucir', categoryName: 'Enlucidos' },
      cs: { name: 'Nanášení sádrové / polymerní stěrky', categoryName: 'Omítky a stěrky' },
    },
  },
  {
    id: 'priming', slug: 'priming', categorySlug: 'plastering', unit: 'm²',
    emoji: '🪣', measurementType: 'wall',
    translations: {
      pl: { name: 'Gruntowanie ścian, sufitów i posadzek', categoryName: 'Tynki i gładzie' },
      en: { name: 'Priming walls, ceilings and floors', categoryName: 'Plastering' },
      de: { name: 'Grundierung von Wänden, Decken und Böden', categoryName: 'Verputzen' },
      fr: { name: 'Impression murs, plafonds et sols', categoryName: 'Plâtrerie' },
      uk: { name: 'Ґрунтування стін, стель і підлог', categoryName: 'Штукатурка і шпаклівка' },
      es: { name: 'Imprimación de paredes, techos y suelos', categoryName: 'Enlucidos' },
      cs: { name: 'Penetrace stěn, stropů a podlah', categoryName: 'Omítky a stěrky' },
    },
  },

  // ── MALOWANIE I SUFITY ─────────────────────────────────────────────────────
  {
    id: 'interior-painting', slug: 'interior-painting', categorySlug: 'painting', unit: 'm²',
    emoji: '🎨', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie ścian i sufitów', categoryName: 'Malowanie i sufity' },
      en: { name: 'Painting walls and ceilings', categoryName: 'Painting & Ceilings' },
      de: { name: 'Wände und Decken streichen', categoryName: 'Malen & Decken' },
      fr: { name: 'Peinture murs et plafonds', categoryName: 'Peinture & Plafonds' },
      uk: { name: 'Фарбування стін і стель', categoryName: 'Малярство і стелі' },
      es: { name: 'Pintura de paredes y techos', categoryName: 'Pintura y Techos' },
      cs: { name: 'Malování stěn a stropů', categoryName: 'Malování a stropy' },
    },
  },
  {
    id: 'exterior-painting', slug: 'exterior-painting', categorySlug: 'painting', unit: 'm²',
    emoji: '🏗️', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie elewacji / fasady', categoryName: 'Malowanie i sufity' },
      en: { name: 'Exterior / facade painting', categoryName: 'Painting & Ceilings' },
      de: { name: 'Fassadenmalerei / Außenanstrich', categoryName: 'Malen & Decken' },
      fr: { name: 'Peinture façade / extérieure', categoryName: 'Peinture & Plafonds' },
      uk: { name: 'Фарбування фасаду / зовнішніх стін', categoryName: 'Малярство і стелі' },
      es: { name: 'Pintura de fachada / exterior', categoryName: 'Pintura y Techos' },
      cs: { name: 'Malování fasády / vnějšího povrchu', categoryName: 'Malování a stropy' },
    },
  },
  {
    id: 'partition-walls', slug: 'partition-walls', categorySlug: 'painting', unit: 'm²',
    emoji: '🧱', measurementType: 'wall',
    translations: {
      pl: { name: 'Ściany działowe G-K / sucha zabudowa', categoryName: 'Malowanie i sufity' },
      en: { name: 'Drywall partition walls / plasterboard', categoryName: 'Painting & Ceilings' },
      de: { name: 'Trockenbau-Trennwände / Gipskarton', categoryName: 'Malen & Decken' },
      fr: { name: 'Cloisons sèches / plaque de plâtre', categoryName: 'Peinture & Plafonds' },
      uk: { name: 'Гіпсокартонні перегородки / суха штукатурка', categoryName: 'Малярство і стелі' },
      es: { name: 'Tabiques de pladur / seco', categoryName: 'Pintura y Techos' },
      cs: { name: 'Sádrokartonové příčky / suchá stavba', categoryName: 'Malování a stropy' },
    },
  },
  {
    id: 'suspended-ceiling', slug: 'suspended-ceiling', categorySlug: 'painting', unit: 'm²',
    emoji: '⬜', measurementType: 'floor',
    translations: {
      pl: { name: 'Sufit podwieszany jednopoziomowy', categoryName: 'Malowanie i sufity' },
      en: { name: 'Suspended / false ceiling (single level)', categoryName: 'Painting & Ceilings' },
      de: { name: 'Abgehängte Decke (einlagig)', categoryName: 'Malen & Decken' },
      fr: { name: 'Faux plafond (monocouche)', categoryName: 'Peinture & Plafonds' },
      uk: { name: 'Підвісна стеля (однорівнева)', categoryName: 'Малярство і стелі' },
      es: { name: 'Techo falso (un nivel)', categoryName: 'Pintura y Techos' },
      cs: { name: 'Spuštěný strop (jednoúrovňový)', categoryName: 'Malování a stropy' },
    },
  },

  // ── GLAZURNICTWO I FLIZOWANIE ─────────────────────────────────────────────
  {
    id: 'floor-tiles', slug: 'floor-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '🔲', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie gresu / glazury / terakoty', categoryName: 'Glazurnictwo i flizowanie' },
      en: { name: 'Laying porcelain / ceramic floor tiles', categoryName: 'Tiling' },
      de: { name: 'Verlegen von Feinsteinzeug / Bodenfliesen', categoryName: 'Fliesenlegen' },
      fr: { name: 'Pose de grès / carrelage de sol', categoryName: 'Carrelage' },
      uk: { name: 'Укладання керамограніту / плитки на підлозі', categoryName: 'Плиткування' },
      es: { name: 'Colocación de gres / baldosas de suelo', categoryName: 'Alicatado' },
      cs: { name: 'Pokládka dlažby / keramických dlaždic', categoryName: 'Obkládání' },
    },
  },
  {
    id: 'large-format-tiles', slug: 'large-format-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '⬛', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie płytek wielkoformatowych', categoryName: 'Glazurnictwo i flizowanie' },
      en: { name: 'Large-format tile laying', categoryName: 'Tiling' },
      de: { name: 'Verlegen von großformatigen Fliesen', categoryName: 'Fliesenlegen' },
      fr: { name: 'Pose de grand format', categoryName: 'Carrelage' },
      uk: { name: 'Укладання великоформатної плитки', categoryName: 'Плиткування' },
      es: { name: 'Colocación de gran formato', categoryName: 'Alicatado' },
      cs: { name: 'Pokládka velkoformátových dlaždic', categoryName: 'Obkládání' },
    },
  },
  {
    id: 'wall-tiles', slug: 'wall-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '🔳', measurementType: 'wall',
    translations: {
      pl: { name: 'Układanie płytek ściennych', categoryName: 'Glazurnictwo i flizowanie' },
      en: { name: 'Wall tile laying', categoryName: 'Tiling' },
      de: { name: 'Wandfliesen verlegen', categoryName: 'Fliesenlegen' },
      fr: { name: 'Pose de carrelage mural', categoryName: 'Carrelage' },
      uk: { name: 'Укладання настінної плитки', categoryName: 'Плиткування' },
      es: { name: 'Alicatado de paredes', categoryName: 'Alicatado' },
      cs: { name: 'Pokládka obkladových dlaždic', categoryName: 'Obkládání' },
    },
  },
  {
    id: 'mosaic', slug: 'mosaic', categorySlug: 'tiling', unit: 'm²',
    emoji: '💠', measurementType: 'wall',
    translations: {
      pl: { name: 'Układanie mozaiki', categoryName: 'Glazurnictwo i flizowanie' },
      en: { name: 'Mosaic tile laying', categoryName: 'Tiling' },
      de: { name: 'Mosaikfliesen verlegen', categoryName: 'Fliesenlegen' },
      fr: { name: 'Pose de mosaïque', categoryName: 'Carrelage' },
      uk: { name: 'Укладання мозаїки', categoryName: 'Плиткування' },
      es: { name: 'Colocación de mosaico', categoryName: 'Alicatado' },
      cs: { name: 'Pokládka mozaiky', categoryName: 'Obkládání' },
    },
  },
  {
    id: 'grouting', slug: 'grouting', categorySlug: 'tiling', unit: 'm²',
    emoji: '✏️', measurementType: 'wall',
    translations: {
      pl: { name: 'Fugowanie i silikonowanie', categoryName: 'Glazurnictwo i flizowanie' },
      en: { name: 'Grouting and siliconing', categoryName: 'Tiling' },
      de: { name: 'Verfugen und Silikonfugen', categoryName: 'Fliesenlegen' },
      fr: { name: 'Jointoiement et joints silicone', categoryName: 'Carrelage' },
      uk: { name: 'Затирання швів і силіконування', categoryName: 'Плиткування' },
      es: { name: 'Rejuntado y sellado con silicona', categoryName: 'Alicatado' },
      cs: { name: 'Spárování a silikonování', categoryName: 'Obkládání' },
    },
  },

  // ── WYKOŃCZENIE PODŁÓG ────────────────────────────────────────────────────
  {
    id: 'laminate-lvt', slug: 'laminate-lvt', categorySlug: 'flooring', unit: 'm²',
    emoji: '🪵', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie paneli laminowanych / winylowych (LVT)', categoryName: 'Wykończenie podłóg' },
      en: { name: 'Laminate / vinyl plank flooring (LVT)', categoryName: 'Flooring' },
      de: { name: 'Laminat / Vinyl-Dielenböden (LVT)', categoryName: 'Böden' },
      fr: { name: 'Pose stratifié / parquet vinyle (LVT)', categoryName: 'Sols' },
      uk: { name: 'Укладання ламінату / вінілових панелей (LVT)', categoryName: 'Підлога' },
      es: { name: 'Colocación laminado / vinílico (LVT)', categoryName: 'Suelos' },
      cs: { name: 'Pokládka laminát / vinylová plovoucí podlaha (LVT)', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'hardwood-floor', slug: 'hardwood-floor', categorySlug: 'flooring', unit: 'm²',
    emoji: '🌲', measurementType: 'floor',
    translations: {
      pl: { name: 'Układanie deski barlineckiej / parkietu', categoryName: 'Wykończenie podłóg' },
      en: { name: 'Hardwood / engineered parquet flooring', categoryName: 'Flooring' },
      de: { name: 'Dielen / Parkett verlegen', categoryName: 'Böden' },
      fr: { name: 'Pose parquet massif / contrecollé', categoryName: 'Sols' },
      uk: { name: 'Укладання паркету / дошки', categoryName: 'Підлога' },
      es: { name: 'Instalación parquet / duela', categoryName: 'Suelos' },
      cs: { name: 'Pokládka parketu / dřevěné podlahy', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'self-leveling', slug: 'self-leveling', categorySlug: 'flooring', unit: 'm²',
    emoji: '〰️', measurementType: 'floor',
    translations: {
      pl: { name: 'Wylewka samopoziomująca', categoryName: 'Wykończenie podłóg' },
      en: { name: 'Self-leveling floor compound', categoryName: 'Flooring' },
      de: { name: 'Selbstnivellierende Ausgleichsmasse', categoryName: 'Böden' },
      fr: { name: 'Ragréage auto-lissant', categoryName: 'Sols' },
      uk: { name: 'Самонівелювальна стяжка', categoryName: 'Підлога' },
      es: { name: 'Autonivelante de suelos', categoryName: 'Suelos' },
      cs: { name: 'Samonivelační podlahová hmota', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'screed', slug: 'screed', categorySlug: 'flooring', unit: 'm²',
    emoji: '⬜', measurementType: 'floor',
    translations: {
      pl: { name: 'Wylewka betonowa / jastrych', categoryName: 'Wykończenie podłóg' },
      en: { name: 'Concrete screed / floor topping', categoryName: 'Flooring' },
      de: { name: 'Betonestrich / Zementestrich', categoryName: 'Böden' },
      fr: { name: 'Chape béton / ragréage ciment', categoryName: 'Sols' },
      uk: { name: 'Бетонна стяжка', categoryName: 'Підлога' },
      es: { name: 'Solera de cemento / mortero', categoryName: 'Suelos' },
      cs: { name: 'Betonová mazanina / potěr', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'skirting', slug: 'skirting', categorySlug: 'flooring', unit: 'mb',
    emoji: '📏', measurementType: 'linear',
    translations: {
      pl: { name: 'Montaż listew przypodłogowych', categoryName: 'Wykończenie podłóg' },
      en: { name: 'Skirting board installation', categoryName: 'Flooring' },
      de: { name: 'Sockelleisten montieren', categoryName: 'Böden' },
      fr: { name: 'Pose de plinthes', categoryName: 'Sols' },
      uk: { name: 'Монтаж плінтусів', categoryName: 'Підлога' },
      es: { name: 'Instalación de rodapiés', categoryName: 'Suelos' },
      cs: { name: 'Montáž soklových lišt', categoryName: 'Podlahy' },
    },
  },

  // ── STOLARKA I MONTAŻ ─────────────────────────────────────────────────────
  {
    id: 'door-frames', slug: 'door-frames', categorySlug: 'carpentry', unit: 'szt.',
    emoji: '🚪', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż ościeżnic i skrzydeł drzwiowych', categoryName: 'Stolarka i montaż' },
      en: { name: 'Door frame and leaf installation', categoryName: 'Carpentry & Assembly' },
      de: { name: 'Türzargen und Türblätter montieren', categoryName: 'Schreinerarbeit' },
      fr: { name: 'Pose bâtis et vantaux de portes', categoryName: 'Menuiserie' },
      uk: { name: 'Монтаж дверних коробок і полотен', categoryName: 'Столярка і монтаж' },
      es: { name: 'Montaje de marcos y hojas de puertas', categoryName: 'Carpintería' },
      cs: { name: 'Montáž dveřních zárubní a křídel', categoryName: 'Truhlářství a montáž' },
    },
  },
  {
    id: 'windowsills', slug: 'windowsills', categorySlug: 'carpentry', unit: 'mb',
    emoji: '🪟', measurementType: 'linear',
    translations: {
      pl: { name: 'Montaż parapetów wewnętrznych i glifów', categoryName: 'Stolarka i montaż' },
      en: { name: 'Interior windowsill and reveal installation', categoryName: 'Carpentry & Assembly' },
      de: { name: 'Innenfensterbänke und Laibungen montieren', categoryName: 'Schreinerarbeit' },
      fr: { name: 'Pose appuis de fenêtre intérieurs', categoryName: 'Menuiserie' },
      uk: { name: 'Монтаж підвіконня і укосів', categoryName: 'Столярка і монтаж' },
      es: { name: 'Instalación alféizares interiores', categoryName: 'Carpintería' },
      cs: { name: 'Montáž vnitřních parapetů a ostění', categoryName: 'Truhlářství a montáž' },
    },
  },
  {
    id: 'pipe-boxing', slug: 'pipe-boxing', categorySlug: 'carpentry', unit: 'mb',
    emoji: '📦', measurementType: 'linear',
    translations: {
      pl: { name: 'Zabudowa rur, pionów i stelaży WC', categoryName: 'Stolarka i montaż' },
      en: { name: 'Pipe boxing and WC frame enclosure', categoryName: 'Carpentry & Assembly' },
      de: { name: 'Verkleidung Rohre, Steigstränge, WC-Rahmen', categoryName: 'Schreinerarbeit' },
      fr: { name: 'Habillage tuyaux, colonnes et bâti WC', categoryName: 'Menuiserie' },
      uk: { name: 'Облицювання труб, стояків і рам унітазу', categoryName: 'Столярка і монтаж' },
      es: { name: 'Revestimiento de tuberías y marcos WC', categoryName: 'Carpintería' },
      cs: { name: 'Zakrytí trubek, stoupacích potrubí, WC', categoryName: 'Truhlářství a montáž' },
    },
  },

  // ── INSTALACJE I BIAŁY MONTAŻ ─────────────────────────────────────────────
  {
    id: 'electrical', slug: 'electrical', categorySlug: 'installations', unit: 'm²',
    emoji: '⚡', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja elektryczna / biały montaż elektryczny', categoryName: 'Instalacje i biały montaż' },
      en: { name: 'Electrical installation / white assembly', categoryName: 'Installations' },
      de: { name: 'Elektroinstallation / Unterputz-Montage', categoryName: 'Installationen' },
      fr: { name: 'Installation électrique / appareillage', categoryName: 'Installations' },
      uk: { name: 'Електромонтаж / кінцевий монтаж', categoryName: 'Інсталяції та монтаж' },
      es: { name: 'Instalación eléctrica / mecanismos', categoryName: 'Instalaciones' },
      cs: { name: 'Elektroinstalace / bílá montáž', categoryName: 'Instalace' },
    },
  },
  {
    id: 'plumbing', slug: 'plumbing', categorySlug: 'installations', unit: 'm²',
    emoji: '💧', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja hydrauliczna / biały montaż sanitarny', categoryName: 'Instalacje i biały montaż' },
      en: { name: 'Plumbing installation / sanitary white assembly', categoryName: 'Installations' },
      de: { name: 'Sanitärinstallation / Weißmontage', categoryName: 'Installationen' },
      fr: { name: 'Installation plomberie / sanitaire', categoryName: 'Installations' },
      uk: { name: 'Сантехнічна установка / білий монтаж', categoryName: 'Інсталяції та монтаж' },
      es: { name: 'Instalación fontanería / sanitaria', categoryName: 'Instalaciones' },
      cs: { name: 'Instalatérské práce / bílá montáž', categoryName: 'Instalace' },
    },
  },
];

export const CATEGORY_ORDER = [
  'prep', 'plastering', 'painting', 'tiling', 'flooring', 'carpentry', 'installations',
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
