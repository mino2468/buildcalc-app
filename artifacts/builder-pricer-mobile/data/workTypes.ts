import type { WorkType } from '@/types';

export const WORK_TYPES: WorkType[] = [

  // ── 1. PRACE PRZYGOTOWAWCZE ───────────────────────────────────────────────
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
      pl: { name: 'Skucie płytek, tynków lub starej farby', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Chipping tiles, plaster or old paint', categoryName: 'Preparation' },
      de: { name: 'Fliesen, Putz oder alte Farbe abmeißeln', categoryName: 'Vorbereitung' },
      fr: { name: 'Piquage carrelage, enduit ou ancienne peinture', categoryName: 'Préparation' },
      uk: { name: 'Збивання плитки, штукатурки або старої фарби', categoryName: 'Підготовчі роботи' },
      es: { name: 'Picado de azulejos, yeso o pintura antigua', categoryName: 'Preparación' },
      cs: { name: 'Sekání obkladů, omítky nebo staré barvy', categoryName: 'Přípravné práce' },
    },
  },
  {
    id: 'dismantling', slug: 'dismantling', categorySlug: 'prep', unit: 'szt.',
    emoji: '🔧', measurementType: 'count',
    translations: {
      pl: { name: 'Demontaż (drzwi, sanitariatów, mebli, sufitów)', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Dismantling (doors, sanitary, furniture, ceilings)', categoryName: 'Preparation' },
      de: { name: 'Demontage (Türen, Sanitär, Möbel, Decken)', categoryName: 'Vorbereitung' },
      fr: { name: 'Démontage (portes, sanitaires, meubles, plafonds)', categoryName: 'Préparation' },
      uk: { name: 'Демонтаж (двері, сантехніка, меблі, стелі)', categoryName: 'Підготовчі роботи' },
      es: { name: 'Desmontaje (puertas, sanitarios, muebles, techos)', categoryName: 'Preparación' },
      cs: { name: 'Demontáž (dveře, sanitární, nábytek, stropy)', categoryName: 'Přípravné práce' },
    },
  },
  {
    id: 'debris-removal', slug: 'debris-removal', categorySlug: 'prep', unit: 'm²',
    emoji: '🗑️', measurementType: 'floor',
    translations: {
      pl: { name: 'Wynoszenie gruzu, odpadów i utylizacja', categoryName: 'Prace przygotowawcze' },
      en: { name: 'Rubble removal, waste and disposal', categoryName: 'Preparation' },
      de: { name: 'Schuttabfuhr, Entsorgung und Abfallbeseitigung', categoryName: 'Vorbereitung' },
      fr: { name: 'Évacuation gravats, déchets et élimination', categoryName: 'Préparation' },
      uk: { name: 'Вивезення сміття, відходів та утилізація', categoryName: 'Підготовчі роботи' },
      es: { name: 'Retirada escombros, residuos y eliminación', categoryName: 'Preparación' },
      cs: { name: 'Odvoz suti, odpadu a likvidace', categoryName: 'Přípravné práce' },
    },
  },

  // ── 2. ŚCIANY I SUFITY ────────────────────────────────────────────────────
  {
    id: 'traditional-plastering', slug: 'traditional-plastering', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🪣', measurementType: 'wall',
    translations: {
      pl: { name: 'Tynkowanie, szpachlowanie i naprawa ubytków', categoryName: 'Ściany i sufity' },
      en: { name: 'Plastering, skim coating and filling repairs', categoryName: 'Walls & Ceilings' },
      de: { name: 'Verputzen, Glättspachtel und Schadensreparatur', categoryName: 'Wände & Decken' },
      fr: { name: 'Plâtrage, enduit lissé et réparation', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Штукатурення, шпаклювання та ремонт дефектів', categoryName: 'Стіни і стелі' },
      es: { name: 'Enlucido, estucado y reparación de defectos', categoryName: 'Paredes y Techos' },
      cs: { name: 'Omítání, stěrkování a oprava závad', categoryName: 'Stěny a stropy' },
    },
  },
  {
    id: 'smoothing-compound', slug: 'smoothing-compound', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🖌️', measurementType: 'wall',
    translations: {
      pl: { name: 'Gładź gipsowa / polimerowa dwuwarstwowa', categoryName: 'Ściany i sufity' },
      en: { name: 'Gypsum / polymer smoothing compound (2 coats)', categoryName: 'Walls & Ceilings' },
      de: { name: 'Gips-/Polymerglättmasse zweilagig', categoryName: 'Wände & Decken' },
      fr: { name: 'Enduit de lissage gypse/polymère double couche', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Гіпсова / полімерна шпаклівка двошарова', categoryName: 'Стіни і стелі' },
      es: { name: 'Pasta de enlucir yeso/polímero doble capa', categoryName: 'Paredes y Techos' },
      cs: { name: 'Sádrová / polymerní stěrka dvouvrstvá', categoryName: 'Stěny a stropy' },
    },
  },
  {
    id: 'priming', slug: 'priming', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🫧', measurementType: 'wall',
    translations: {
      pl: { name: 'Gruntowanie ścian i sufitów', categoryName: 'Ściany i sufity' },
      en: { name: 'Priming walls and ceilings', categoryName: 'Walls & Ceilings' },
      de: { name: 'Grundierung von Wänden und Decken', categoryName: 'Wände & Decken' },
      fr: { name: 'Impression murs et plafonds', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Ґрунтування стін і стель', categoryName: 'Стіни і стелі' },
      es: { name: 'Imprimación de paredes y techos', categoryName: 'Paredes y Techos' },
      cs: { name: 'Penetrace stěn a stropů', categoryName: 'Stěny a stropy' },
    },
  },
  {
    id: 'interior-painting', slug: 'interior-painting', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🎨', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie ścian i sufitów (dwukrotne)', categoryName: 'Ściany i sufity' },
      en: { name: 'Painting walls and ceilings (2 coats)', categoryName: 'Walls & Ceilings' },
      de: { name: 'Wände und Decken streichen (zweilagig)', categoryName: 'Wände & Decken' },
      fr: { name: 'Peinture murs et plafonds (double couche)', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Фарбування стін і стель (двошарове)', categoryName: 'Стіни і стелі' },
      es: { name: 'Pintura paredes y techos (dos manos)', categoryName: 'Paredes y Techos' },
      cs: { name: 'Malování stěn a stropů (dvouvrstvé)', categoryName: 'Stěny a stropy' },
    },
  },
  {
    id: 'exterior-painting', slug: 'exterior-painting', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🏗️', measurementType: 'wall',
    translations: {
      pl: { name: 'Malowanie elewacji / fasady zewnętrznej', categoryName: 'Ściany i sufity' },
      en: { name: 'Exterior facade / wall painting', categoryName: 'Walls & Ceilings' },
      de: { name: 'Fassadenmalerei / Außenwandanstrich', categoryName: 'Wände & Decken' },
      fr: { name: 'Peinture façade / mur extérieur', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Фарбування фасаду / зовнішньої стіни', categoryName: 'Стіни і стелі' },
      es: { name: 'Pintura fachada / pared exterior', categoryName: 'Paredes y Techos' },
      cs: { name: 'Malování fasády / vnější stěny', categoryName: 'Stěny a stropy' },
    },
  },
  {
    id: 'wallpaper', slug: 'wallpaper', categorySlug: 'walls-ceilings', unit: 'm²',
    emoji: '🖼️', measurementType: 'wall',
    translations: {
      pl: { name: 'Tapetowanie ścian (tapeta, fototapeta, dekoracyjna)', categoryName: 'Ściany i sufity' },
      en: { name: 'Wallpapering (standard, photo, decorative)', categoryName: 'Walls & Ceilings' },
      de: { name: 'Tapezieren (Standard, Foto, Dekorativ)', categoryName: 'Wände & Decken' },
      fr: { name: 'Tapisserie (standard, photo, décorative)', categoryName: 'Murs et Plafonds' },
      uk: { name: 'Обклеювання шпалерами (звичайні, фото, декоративні)', categoryName: 'Стіни і стелі' },
      es: { name: 'Papel pintado (estándar, foto, decorativo)', categoryName: 'Paredes y Techos' },
      cs: { name: 'Tapetování (standardní, foto, dekorativní)', categoryName: 'Stěny a stropy' },
    },
  },

  // ── 3. ZABUDOWY GK I SUFITY PODWIESZANE ──────────────────────────────────
  {
    id: 'partition-walls', slug: 'partition-walls', categorySlug: 'drywall', unit: 'm²',
    emoji: '🧱', measurementType: 'wall',
    translations: {
      pl: { name: 'Ścianki działowe GK (konstrukcja + płyty + szpachlowanie)', categoryName: 'Zabudowy GK i sufity' },
      en: { name: 'Drywall partitions (frame + boards + plastering)', categoryName: 'Drywall & Ceilings' },
      de: { name: 'Trockenbau-Trennwände (Profil + Platten + Spachteln)', categoryName: 'Trockenbau & Decken' },
      fr: { name: 'Cloisons sèches (ossature + plaques + enduit)', categoryName: 'Plaques de plâtre' },
      uk: { name: 'Гіпсокартонні перегородки (каркас + плити + шпаклівка)', categoryName: 'Гіпсокартон і стелі' },
      es: { name: 'Tabiques pladur (estructura + placas + yeso)', categoryName: 'Pladur y Techos' },
      cs: { name: 'Příčky ze sádrokartonu (profily + desky + stěrkování)', categoryName: 'Sádrokarton a stropy' },
    },
  },
  {
    id: 'suspended-ceiling', slug: 'suspended-ceiling', categorySlug: 'drywall', unit: 'm²',
    emoji: '⬜', measurementType: 'floor',
    translations: {
      pl: { name: 'Sufit podwieszany jednopoziomowy GK', categoryName: 'Zabudowy GK i sufity' },
      en: { name: 'Single-level suspended drywall ceiling', categoryName: 'Drywall & Ceilings' },
      de: { name: 'Einstöckige abgehängte GK-Decke', categoryName: 'Trockenbau & Decken' },
      fr: { name: 'Faux plafond monocouche en plaques de plâtre', categoryName: 'Plaques de plâtre' },
      uk: { name: 'Підвісна стеля одноярусна ГКЛ', categoryName: 'Гіпсокартон і стелі' },
      es: { name: 'Techo pladur colgante monocapa', categoryName: 'Pladur y Techos' },
      cs: { name: 'Jednoúrovňový podhled ze sádrokartonu', categoryName: 'Sádrokarton a stropy' },
    },
  },
  {
    id: 'led-niche', slug: 'led-niche', categorySlug: 'drywall', unit: 'm²',
    emoji: '💡', measurementType: 'floor',
    translations: {
      pl: { name: 'Sufit wielopoziomowy z wnęką LED', categoryName: 'Zabudowy GK i sufity' },
      en: { name: 'Multi-level ceiling with LED niche', categoryName: 'Drywall & Ceilings' },
      de: { name: 'Mehrstufige Decke mit LED-Nische', categoryName: 'Trockenbau & Decken' },
      fr: { name: 'Plafond multi-niveaux avec niche LED', categoryName: 'Plaques de plâtre' },
      uk: { name: 'Багаторівнева стеля з нішею LED', categoryName: 'Гіпсокартон і стелі' },
      es: { name: 'Techo multinivel con nicho LED', categoryName: 'Pladur y Techos' },
      cs: { name: 'Víceúrovňový podhled s LED nikou', categoryName: 'Sádrokarton a stropy' },
    },
  },
  {
    id: 'pipe-boxing', slug: 'pipe-boxing', categorySlug: 'drywall', unit: 'mb',
    emoji: '📦', measurementType: 'linear',
    translations: {
      pl: { name: 'Zabudowa rur, pionów i stelaży GK', categoryName: 'Zabudowy GK i sufity' },
      en: { name: 'Pipe boxing and WC frame enclosure (drywall)', categoryName: 'Drywall & Ceilings' },
      de: { name: 'GK-Verkleidung Rohre, Steigstränge, Vorwandinstallation', categoryName: 'Trockenbau & Decken' },
      fr: { name: 'Habillage tuyaux, colonnes et bâti WC', categoryName: 'Plaques de plâtre' },
      uk: { name: 'Облицювання труб, стояків і рам ГКЛ', categoryName: 'Гіпсокартон і стелі' },
      es: { name: 'Revestimiento tuberías, columnas y bastidores', categoryName: 'Pladur y Techos' },
      cs: { name: 'Zakrytí trubek, stoupacích potrubí ze SDK', categoryName: 'Sádrokarton a stropy' },
    },
  },

  // ── 4. PODŁOGI ───────────────────────────────────────────────────────────
  {
    id: 'screed', slug: 'screed', categorySlug: 'flooring', unit: 'm²',
    emoji: '⬜', measurementType: 'floor',
    translations: {
      pl: { name: 'Wylewka betonowa / masa samopoziomująca', categoryName: 'Podłogi' },
      en: { name: 'Concrete screed / self-leveling compound', categoryName: 'Flooring' },
      de: { name: 'Betonestrich / Selbstnivelliermasse', categoryName: 'Böden' },
      fr: { name: 'Chape béton / ragréage auto-lissant', categoryName: 'Sols' },
      uk: { name: 'Бетонна стяжка / самонівелювальна маса', categoryName: 'Підлога' },
      es: { name: 'Solera de cemento / autonivelante', categoryName: 'Suelos' },
      cs: { name: 'Betonová mazanina / samonivelační hmota', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'laminate-lvt', slug: 'laminate-lvt', categorySlug: 'flooring', unit: 'm²',
    emoji: '🪵', measurementType: 'floor',
    translations: {
      pl: { name: 'Panele laminowane / winylowe LVT', categoryName: 'Podłogi' },
      en: { name: 'Laminate / vinyl plank (LVT) flooring', categoryName: 'Flooring' },
      de: { name: 'Laminat / Vinyl-Dielenboden (LVT)', categoryName: 'Böden' },
      fr: { name: 'Stratifié / parquet vinyle (LVT)', categoryName: 'Sols' },
      uk: { name: 'Ламінат / вінілові панелі LVT', categoryName: 'Підлога' },
      es: { name: 'Laminado / vinílico LVT', categoryName: 'Suelos' },
      cs: { name: 'Laminát / vinylová plovoucí podlaha (LVT)', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'hardwood-floor', slug: 'hardwood-floor', categorySlug: 'flooring', unit: 'm²',
    emoji: '🌲', measurementType: 'floor',
    translations: {
      pl: { name: 'Parkiet, deska barlinecka / podłoga drewniana', categoryName: 'Podłogi' },
      en: { name: 'Parquet / engineered hardwood flooring', categoryName: 'Flooring' },
      de: { name: 'Parkett / Mehrschicht-Dielenboden', categoryName: 'Böden' },
      fr: { name: 'Parquet massif / contrecollé', categoryName: 'Sols' },
      uk: { name: 'Паркет / дерев\'яна підлога', categoryName: 'Підлога' },
      es: { name: 'Parquet / tarima flotante', categoryName: 'Suelos' },
      cs: { name: 'Parket / dřevěná podlaha', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'self-leveling', slug: 'self-leveling', categorySlug: 'flooring', unit: 'm²',
    emoji: '〰️', measurementType: 'floor',
    translations: {
      pl: { name: 'Przygotowanie podłoża (czyszczenie, gruntowanie, wyrównanie)', categoryName: 'Podłogi' },
      en: { name: 'Subfloor preparation (cleaning, priming, levelling)', categoryName: 'Flooring' },
      de: { name: 'Untergrundvorbereitung (Reinigen, Grundieren, Ausgleichen)', categoryName: 'Böden' },
      fr: { name: 'Préparation support (nettoyage, impression, nivellement)', categoryName: 'Sols' },
      uk: { name: 'Підготовка основи (очищення, ґрунтування, вирівнювання)', categoryName: 'Підлога' },
      es: { name: 'Preparación base (limpieza, imprimación, nivelación)', categoryName: 'Suelos' },
      cs: { name: 'Příprava podkladu (čištění, penetrace, vyrovnání)', categoryName: 'Podlahy' },
    },
  },
  {
    id: 'skirting', slug: 'skirting', categorySlug: 'flooring', unit: 'mb',
    emoji: '📏', measurementType: 'linear',
    translations: {
      pl: { name: 'Listwy przypodłogowe (MDF / PCV / drewniane)', categoryName: 'Podłogi' },
      en: { name: 'Skirting boards (MDF / PVC / wooden)', categoryName: 'Flooring' },
      de: { name: 'Sockelleisten (MDF / PVC / Holz)', categoryName: 'Böden' },
      fr: { name: 'Plinthes (MDF / PVC / bois)', categoryName: 'Sols' },
      uk: { name: 'Плінтуси (МДФ / ПВХ / дерев\'яні)', categoryName: 'Підлога' },
      es: { name: 'Rodapiés (MDF / PVC / madera)', categoryName: 'Suelos' },
      cs: { name: 'Soklové lišty (MDF / PVC / dřevo)', categoryName: 'Podlahy' },
    },
  },

  // ── 5. PŁYTKI I GLAZURA ───────────────────────────────────────────────────
  {
    id: 'floor-tiles', slug: 'floor-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '🔲', measurementType: 'floor',
    translations: {
      pl: { name: 'Gres / glazura / terakota podłogowa', categoryName: 'Płytki i glazura' },
      en: { name: 'Porcelain / ceramic floor tiles', categoryName: 'Tiles & Ceramics' },
      de: { name: 'Feinsteinzeug / Bodenfliesen / Keramik', categoryName: 'Fliesen & Keramik' },
      fr: { name: 'Grès / carrelage de sol', categoryName: 'Carrelage' },
      uk: { name: 'Керамограніт / плитка підлогова', categoryName: 'Плитка і кераміка' },
      es: { name: 'Gres / baldosas de suelo / cerámica', categoryName: 'Azulejos y cerámica' },
      cs: { name: 'Dlažba / keramické dlaždice', categoryName: 'Obklady a dlažba' },
    },
  },
  {
    id: 'large-format-tiles', slug: 'large-format-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '⬛', measurementType: 'floor',
    translations: {
      pl: { name: 'Płytki wielkoformatowe (powyżej 60×60 cm)', categoryName: 'Płytki i glazura' },
      en: { name: 'Large-format tiles (over 60×60 cm)', categoryName: 'Tiles & Ceramics' },
      de: { name: 'Großformatfliesen (über 60×60 cm)', categoryName: 'Fliesen & Keramik' },
      fr: { name: 'Grand format (plus de 60×60 cm)', categoryName: 'Carrelage' },
      uk: { name: 'Великоформатна плитка (понад 60×60 см)', categoryName: 'Плитка і кераміка' },
      es: { name: 'Gran formato (más de 60×60 cm)', categoryName: 'Azulejos y cerámica' },
      cs: { name: 'Velkoformátové dlaždice (nad 60×60 cm)', categoryName: 'Obklady a dlažba' },
    },
  },
  {
    id: 'wall-tiles', slug: 'wall-tiles', categorySlug: 'tiling', unit: 'm²',
    emoji: '🔳', measurementType: 'wall',
    translations: {
      pl: { name: 'Płytki ścienne / obkładanie ścian w łazience', categoryName: 'Płytki i glazura' },
      en: { name: 'Wall tiles / bathroom wall cladding', categoryName: 'Tiles & Ceramics' },
      de: { name: 'Wandfliesen / Badezimmerwandverkleidung', categoryName: 'Fliesen & Keramik' },
      fr: { name: 'Carrelage mural / revêtement salle de bain', categoryName: 'Carrelage' },
      uk: { name: 'Настінна плитка / облицювання стін ванної', categoryName: 'Плитка і кераміка' },
      es: { name: 'Azulejos de pared / revestimiento baño', categoryName: 'Azulejos y cerámica' },
      cs: { name: 'Obklady stěn / obložení koupelny', categoryName: 'Obklady a dlažba' },
    },
  },
  {
    id: 'mosaic', slug: 'mosaic', categorySlug: 'tiling', unit: 'm²',
    emoji: '💠', measurementType: 'wall',
    translations: {
      pl: { name: 'Mozaika / dekory / obróbki narożnikowe', categoryName: 'Płytki i glazura' },
      en: { name: 'Mosaic / decorative tiles / corner trims', categoryName: 'Tiles & Ceramics' },
      de: { name: 'Mosaik / Dekorationsplatten / Eckprofile', categoryName: 'Fliesen & Keramik' },
      fr: { name: 'Mosaïque / carreaux décoratifs / profilés angle', categoryName: 'Carrelage' },
      uk: { name: 'Мозаїка / декоративна плитка / кутні профілі', categoryName: 'Плитка і кераміка' },
      es: { name: 'Mosaico / azulejos decorativos / perfiles rincón', categoryName: 'Azulejos y cerámica' },
      cs: { name: 'Mozaika / dekorativní obklady / rohové profily', categoryName: 'Obklady a dlažba' },
    },
  },
  {
    id: 'grouting', slug: 'grouting', categorySlug: 'tiling', unit: 'm²',
    emoji: '✏️', measurementType: 'wall',
    translations: {
      pl: { name: 'Fugowanie, silikonowanie i hydroizolacja', categoryName: 'Płytki i glazura' },
      en: { name: 'Grouting, siliconing and waterproofing', categoryName: 'Tiles & Ceramics' },
      de: { name: 'Verfugen, Silikonfugen und Abdichtung', categoryName: 'Fliesen & Keramik' },
      fr: { name: 'Jointoiement, silicone et étanchéité', categoryName: 'Carrelage' },
      uk: { name: 'Затирання швів, силіконування і гідроізоляція', categoryName: 'Плитка і кераміка' },
      es: { name: 'Rejuntado, silicona e impermeabilización', categoryName: 'Azulejos y cerámica' },
      cs: { name: 'Spárování, silikonování a hydroizolace', categoryName: 'Obklady a dlažba' },
    },
  },

  // ── 6. ŁAZIENKI ──────────────────────────────────────────────────────────
  {
    id: 'bathroom-complete', slug: 'bathroom-complete', categorySlug: 'bathroom', unit: 'm²',
    emoji: '🛁', measurementType: 'floor',
    translations: {
      pl: { name: 'Kompleksowe wykończenie łazienki', categoryName: 'Łazienki' },
      en: { name: 'Complete bathroom renovation', categoryName: 'Bathrooms' },
      de: { name: 'Komplette Badsanierung', categoryName: 'Bäder' },
      fr: { name: 'Rénovation complète salle de bain', categoryName: 'Salles de bain' },
      uk: { name: 'Комплексне оздоблення ванної кімнати', categoryName: 'Ванні кімнати' },
      es: { name: 'Renovación completa de baño', categoryName: 'Baños' },
      cs: { name: 'Kompletní rekonstrukce koupelny', categoryName: 'Koupelny' },
    },
  },
  {
    id: 'toilet-install', slug: 'toilet-install', categorySlug: 'bathroom', unit: 'szt.',
    emoji: '🚽', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż WC / stelaża podtynkowego / umywalki', categoryName: 'Łazienki' },
      en: { name: 'Toilet / concealed cistern / washbasin installation', categoryName: 'Bathrooms' },
      de: { name: 'WC / Vorwandinstallation / Waschbecken montieren', categoryName: 'Bäder' },
      fr: { name: 'Pose WC / bâti-support / lavabo', categoryName: 'Salles de bain' },
      uk: { name: 'Монтаж унітазу / інсталяції / умивальника', categoryName: 'Ванні кімнати' },
      es: { name: 'Instalación WC / bastidor / lavabo', categoryName: 'Baños' },
      cs: { name: 'Montáž WC / podomítkového rámu / umyvadla', categoryName: 'Koupelny' },
    },
  },
  {
    id: 'shower-install', slug: 'shower-install', categorySlug: 'bathroom', unit: 'szt.',
    emoji: '🚿', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż wanny / kabiny prysznicowej / brodzika', categoryName: 'Łazienki' },
      en: { name: 'Bath / shower cabin / shower tray installation', categoryName: 'Bathrooms' },
      de: { name: 'Badewanne / Duschkabine / Duschwanne montieren', categoryName: 'Bäder' },
      fr: { name: 'Pose baignoire / cabine douche / receveur', categoryName: 'Salles de bain' },
      uk: { name: 'Монтаж ванни / душової кабіни / піддону', categoryName: 'Ванні кімнати' },
      es: { name: 'Instalación bañera / cabina ducha / plato', categoryName: 'Baños' },
      cs: { name: 'Montáž vany / sprchového koutu / vaničky', categoryName: 'Koupelny' },
    },
  },
  {
    id: 'bathroom-accessories', slug: 'bathroom-accessories', categorySlug: 'bathroom', unit: 'szt.',
    emoji: '🪞', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż baterii, lustra, półek i akcesoriów', categoryName: 'Łazienki' },
      en: { name: 'Taps, mirror, shelves and accessories installation', categoryName: 'Bathrooms' },
      de: { name: 'Armaturen, Spiegel, Regale und Zubehör montieren', categoryName: 'Bäder' },
      fr: { name: 'Pose robinetterie, miroir, étagères, accessoires', categoryName: 'Salles de bain' },
      uk: { name: 'Монтаж змішувачів, дзеркала, полиць і аксесуарів', categoryName: 'Ванні кімнати' },
      es: { name: 'Instalación grifería, espejo, estantes, accesorios', categoryName: 'Baños' },
      cs: { name: 'Montáž baterií, zrcadla, polic a příslušenství', categoryName: 'Koupelny' },
    },
  },

  // ── 7. KUCHNIE ───────────────────────────────────────────────────────────
  {
    id: 'kitchen-prep', slug: 'kitchen-prep', categorySlug: 'kitchen', unit: 'm²',
    emoji: '🍳', measurementType: 'floor',
    translations: {
      pl: { name: 'Przygotowanie kuchni / demontaż starej zabudowy', categoryName: 'Kuchnie' },
      en: { name: 'Kitchen preparation / old unit removal', categoryName: 'Kitchens' },
      de: { name: 'Küchenvorbereitung / Abbau alter Einbauten', categoryName: 'Küchen' },
      fr: { name: 'Préparation cuisine / dépose ancienne installation', categoryName: 'Cuisines' },
      uk: { name: 'Підготовка кухні / демонтаж старих меблів', categoryName: 'Кухні' },
      es: { name: 'Preparación cocina / desmontaje instalación antigua', categoryName: 'Cocinas' },
      cs: { name: 'Příprava kuchyně / demontáž staré zástavby', categoryName: 'Kuchyně' },
    },
  },
  {
    id: 'kitchen-cabinets', slug: 'kitchen-cabinets', categorySlug: 'kitchen', unit: 'mb',
    emoji: '🗄️', measurementType: 'linear',
    translations: {
      pl: { name: 'Montaż szafek kuchennych dolnych i wiszących', categoryName: 'Kuchnie' },
      en: { name: 'Kitchen cabinet installation (upper and lower)', categoryName: 'Kitchens' },
      de: { name: 'Küchenschränke (Unter- und Hängeschränke) montieren', categoryName: 'Küchen' },
      fr: { name: 'Pose meubles bas et hauts de cuisine', categoryName: 'Cuisines' },
      uk: { name: 'Монтаж нижніх і верхніх кухонних шаф', categoryName: 'Кухні' },
      es: { name: 'Montaje muebles de cocina bajos y altos', categoryName: 'Cocinas' },
      cs: { name: 'Montáž spodních a horních kuchyňských skříněk', categoryName: 'Kuchyně' },
    },
  },
  {
    id: 'kitchen-worktop', slug: 'kitchen-worktop', categorySlug: 'kitchen', unit: 'mb',
    emoji: '🔪', measurementType: 'linear',
    translations: {
      pl: { name: 'Montaż blatu, zlewu, baterii i sprzętu AGD', categoryName: 'Kuchnie' },
      en: { name: 'Worktop, sink, tap and appliance installation', categoryName: 'Kitchens' },
      de: { name: 'Arbeitsplatte, Spüle, Armatur und Geräte montieren', categoryName: 'Küchen' },
      fr: { name: 'Pose plan de travail, évier, robinet et électroménager', categoryName: 'Cuisines' },
      uk: { name: 'Монтаж стільниці, мийки, змішувача і побутової техніки', categoryName: 'Кухні' },
      es: { name: 'Instalación encimera, fregadero, grifo y electrodomésticos', categoryName: 'Cocinas' },
      cs: { name: 'Montáž pracovní desky, dřezu, baterie a spotřebičů', categoryName: 'Kuchyně' },
    },
  },

  // ── 8. DRZWI I STOLARKA ───────────────────────────────────────────────────
  {
    id: 'door-frames', slug: 'door-frames', categorySlug: 'carpentry', unit: 'szt.',
    emoji: '🚪', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż ościeżnic i skrzydeł drzwiowych', categoryName: 'Drzwi i stolarka' },
      en: { name: 'Door frame and leaf installation', categoryName: 'Doors & Carpentry' },
      de: { name: 'Türzargen und Türblätter montieren', categoryName: 'Türen & Schreinerarbeit' },
      fr: { name: 'Pose bâtis et vantaux de portes', categoryName: 'Portes et menuiserie' },
      uk: { name: 'Монтаж дверних коробок і полотен', categoryName: 'Двері і столярка' },
      es: { name: 'Montaje marcos y hojas de puertas', categoryName: 'Puertas y carpintería' },
      cs: { name: 'Montáž dveřních zárubní a křídel', categoryName: 'Dveře a truhlářství' },
    },
  },
  {
    id: 'windowsills', slug: 'windowsills', categorySlug: 'carpentry', unit: 'mb',
    emoji: '🪟', measurementType: 'linear',
    translations: {
      pl: { name: 'Montaż parapetów wewnętrznych i glifów', categoryName: 'Drzwi i stolarka' },
      en: { name: 'Interior windowsill and reveal installation', categoryName: 'Doors & Carpentry' },
      de: { name: 'Innenfensterbänke und Laibungen montieren', categoryName: 'Türen & Schreinerarbeit' },
      fr: { name: 'Pose appuis de fenêtre intérieurs et tableaux', categoryName: 'Portes et menuiserie' },
      uk: { name: 'Монтаж підвіконня і укосів', categoryName: 'Двері і столярка' },
      es: { name: 'Instalación alféizares interiores y jambas', categoryName: 'Puertas y carpintería' },
      cs: { name: 'Montáž vnitřních parapetů a ostění', categoryName: 'Dveře a truhlářství' },
    },
  },
  {
    id: 'door-trim', slug: 'door-trim', categorySlug: 'carpentry', unit: 'szt.',
    emoji: '🔩', measurementType: 'count',
    translations: {
      pl: { name: 'Obróbka futryn, montaż progów i maskownic', categoryName: 'Drzwi i stolarka' },
      en: { name: 'Door frame trims, thresholds and cover strips', categoryName: 'Doors & Carpentry' },
      de: { name: 'Zargenverkleidungen, Türschwellen und Abdeckleisten', categoryName: 'Türen & Schreinerarbeit' },
      fr: { name: 'Habillage bâtis, seuils et couvre-joints', categoryName: 'Portes et menuiserie' },
      uk: { name: 'Оздоблення коробок, монтаж порогів і накладок', categoryName: 'Двері і столярка' },
      es: { name: 'Tapajuntas, umbrales y cubrecantos de puerta', categoryName: 'Puertas y carpintería' },
      cs: { name: 'Opracování zárubní, montáž prahů a krycích lišt', categoryName: 'Dveře a truhlářství' },
    },
  },

  // ── 9. INSTALACJE ELEKTRYCZNE ─────────────────────────────────────────────
  {
    id: 'electrical', slug: 'electrical', categorySlug: 'electrical', unit: 'm²',
    emoji: '⚡', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja elektryczna (okablowanie, puszki, trasy)', categoryName: 'Instalacje elektryczne' },
      en: { name: 'Electrical installation (wiring, boxes, conduits)', categoryName: 'Electrical' },
      de: { name: 'Elektroinstallation (Verkabelung, Dosen, Leitungswege)', categoryName: 'Elektroinstallation' },
      fr: { name: 'Installation électrique (câblage, boîtes, chemins)', categoryName: 'Électricité' },
      uk: { name: 'Електромонтаж (кабелі, коробки, траси)', categoryName: 'Електромонтаж' },
      es: { name: 'Instalación eléctrica (cableado, cajas, conductos)', categoryName: 'Electricidad' },
      cs: { name: 'Elektroinstalace (kabeláž, krabice, trasy)', categoryName: 'Elektroinstalace' },
    },
  },
  {
    id: 'lighting-point', slug: 'lighting-point', categorySlug: 'electrical', unit: 'szt.',
    emoji: '💡', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż punktu oświetleniowego (lampa, kinkiet, plafon)', categoryName: 'Instalacje elektryczne' },
      en: { name: 'Lighting point installation (ceiling, wall, pendant)', categoryName: 'Electrical' },
      de: { name: 'Lichtpunkt montieren (Decke, Wand, Hängelampe)', categoryName: 'Elektroinstallation' },
      fr: { name: 'Pose point lumineux (plafond, mur, suspension)', categoryName: 'Électricité' },
      uk: { name: 'Монтаж точки освітлення (стеля, стіна, підвісна)', categoryName: 'Електромонтаж' },
      es: { name: 'Instalación punto de luz (techo, pared, colgante)', categoryName: 'Electricidad' },
      cs: { name: 'Montáž světelného bodu (strop, stěna, závěsné)', categoryName: 'Elektroinstalace' },
    },
  },
  {
    id: 'electrical-socket', slug: 'electrical-socket', categorySlug: 'electrical', unit: 'szt.',
    emoji: '🔌', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż gniazdka / włącznika / osprzętu elektrycznego', categoryName: 'Instalacje elektryczne' },
      en: { name: 'Socket / switch / electrical accessory installation', categoryName: 'Electrical' },
      de: { name: 'Steckdose / Schalter / Elektrozubehör montieren', categoryName: 'Elektroinstallation' },
      fr: { name: 'Pose prise / interrupteur / appareillage électrique', categoryName: 'Électricité' },
      uk: { name: 'Монтаж розетки / вимикача / електроарматури', categoryName: 'Електромонтаж' },
      es: { name: 'Instalación enchufe / interruptor / mecanismo eléctrico', categoryName: 'Electricidad' },
      cs: { name: 'Montáž zásuvky / spínače / elektrické armatury', categoryName: 'Elektroinstalace' },
    },
  },

  // ── 10. INSTALACJE HYDRAULICZNE ───────────────────────────────────────────
  {
    id: 'plumbing', slug: 'plumbing', categorySlug: 'plumbing', unit: 'm²',
    emoji: '💧', measurementType: 'floor',
    translations: {
      pl: { name: 'Instalacja hydrauliczna (rury, zawory, podłączenia)', categoryName: 'Instalacje hydrauliczne' },
      en: { name: 'Plumbing installation (pipes, valves, connections)', categoryName: 'Plumbing' },
      de: { name: 'Sanitärinstallation (Rohre, Ventile, Anschlüsse)', categoryName: 'Sanitärinstallation' },
      fr: { name: 'Installation plomberie (tuyaux, vannes, raccordements)', categoryName: 'Plomberie' },
      uk: { name: 'Сантехнічна установка (труби, крани, з\'єднання)', categoryName: 'Сантехніка' },
      es: { name: 'Instalación fontanería (tuberías, válvulas, conexiones)', categoryName: 'Fontanería' },
      cs: { name: 'Instalatérské práce (potrubí, ventily, přípojky)', categoryName: 'Instalatérství' },
    },
  },
  {
    id: 'plumbing-connection', slug: 'plumbing-connection', categorySlug: 'plumbing', unit: 'szt.',
    emoji: '🔗', measurementType: 'count',
    translations: {
      pl: { name: 'Podłączenie urządzenia sanitarnego (pralka, zmywarka, WC)', categoryName: 'Instalacje hydrauliczne' },
      en: { name: 'Sanitary appliance connection (washer, dishwasher, WC)', categoryName: 'Plumbing' },
      de: { name: 'Sanitärgerät anschließen (Waschmaschine, Spüler, WC)', categoryName: 'Sanitärinstallation' },
      fr: { name: 'Raccordement appareil sanitaire (lave-linge, lave-vaisselle, WC)', categoryName: 'Plomberie' },
      uk: { name: 'Підключення санприладу (пральна машина, посудомийка, WC)', categoryName: 'Сантехніка' },
      es: { name: 'Conexión aparato sanitario (lavadora, lavavajillas, WC)', categoryName: 'Fontanería' },
      cs: { name: 'Připojení sanitárního spotřebiče (pračka, myčka, WC)', categoryName: 'Instalatérství' },
    },
  },
  {
    id: 'valve-install', slug: 'valve-install', categorySlug: 'plumbing', unit: 'szt.',
    emoji: '🔧', measurementType: 'count',
    translations: {
      pl: { name: 'Wymiana / przesunięcie zaworów, syfonów i uszczelnień', categoryName: 'Instalacje hydrauliczne' },
      en: { name: 'Valve replacement / relocation, syphons and seals', categoryName: 'Plumbing' },
      de: { name: 'Ventile tauschen / versetzen, Siphon und Dichtungen', categoryName: 'Sanitärinstallation' },
      fr: { name: 'Remplacement / déplacement vannes, siphon et joints', categoryName: 'Plomberie' },
      uk: { name: 'Заміна / перенесення кранів, сифонів і ущільнень', categoryName: 'Сантехніка' },
      es: { name: 'Sustitución / traslado válvulas, sifón y sellados', categoryName: 'Fontanería' },
      cs: { name: 'Výměna / přesunutí ventilů, sifonů a těsnění', categoryName: 'Instalatérství' },
    },
  },

  // ── 11. WYKOŃCZENIA DEKORACYJNE ───────────────────────────────────────────
  {
    id: 'wall-panels', slug: 'wall-panels', categorySlug: 'decorative', unit: 'm²',
    emoji: '🪵', measurementType: 'wall',
    translations: {
      pl: { name: 'Panele ścienne / lamele drewniane / listwy ścienne', categoryName: 'Wykończenia dekoracyjne' },
      en: { name: 'Wall panels / wooden slats / wall strips', categoryName: 'Decorative Finishes' },
      de: { name: 'Wandpaneele / Holzlamellen / Wandleisten', categoryName: 'Dekorative Ausführung' },
      fr: { name: 'Panneaux muraux / lames bois / listels muraux', categoryName: 'Finitions décoratives' },
      uk: { name: 'Настінні панелі / дерев\'яні рейки / листи', categoryName: 'Декоративне оздоблення' },
      es: { name: 'Paneles de pared / lamas madera / listones', categoryName: 'Acabados decorativos' },
      cs: { name: 'Nástěnné panely / dřevěné lamely / lišty', categoryName: 'Dekorativní povrchy' },
    },
  },
  {
    id: 'decorative-plaster', slug: 'decorative-plaster', categorySlug: 'decorative', unit: 'm²',
    emoji: '🏺', measurementType: 'wall',
    translations: {
      pl: { name: 'Tynk dekoracyjny / beton dekoracyjny / sztukateria', categoryName: 'Wykończenia dekoracyjne' },
      en: { name: 'Decorative plaster / concrete effect / stucco', categoryName: 'Decorative Finishes' },
      de: { name: 'Dekorputz / Betonoptik / Stuck', categoryName: 'Dekorative Ausführung' },
      fr: { name: 'Enduit décoratif / béton ciré / stuc', categoryName: 'Finitions décoratives' },
      uk: { name: 'Декоративна штукатурка / бетон / ліпнина', categoryName: 'Декоративне оздоблення' },
      es: { name: 'Estuco decorativo / efecto hormigón / molduras', categoryName: 'Acabados decorativos' },
      cs: { name: 'Dekorativní omítka / efekt betonu / štukatérie', categoryName: 'Dekorativní povrchy' },
    },
  },
  {
    id: 'led-accent', slug: 'led-accent', categorySlug: 'decorative', unit: 'mb',
    emoji: '✨', measurementType: 'linear',
    translations: {
      pl: { name: 'Wnęki / zabudowy dekoracyjne LED (ściana TV, kominek)', categoryName: 'Wykończenia dekoracyjne' },
      en: { name: 'LED decorative niches / TV wall / fireplace enclosure', categoryName: 'Decorative Finishes' },
      de: { name: 'LED-Nischen / TV-Wand / Kaminverkleidung', categoryName: 'Dekorative Ausführung' },
      fr: { name: 'Niches LED / mur TV / habillage cheminée', categoryName: 'Finitions décoratives' },
      uk: { name: 'Ніші / декоративні конструкції LED (ТВ-стіна, камін)', categoryName: 'Декоративне оздоблення' },
      es: { name: 'Nichos / revestimientos LED (muro TV, chimenea)', categoryName: 'Acabados decorativos' },
      cs: { name: 'LED niky / TV stěna / obložení krbu', categoryName: 'Dekorativní povrchy' },
    },
  },

  // ── 12. PRACE MONTAŻOWE ───────────────────────────────────────────────────
  {
    id: 'furniture-assembly', slug: 'furniture-assembly', categorySlug: 'assembly', unit: 'szt.',
    emoji: '🛋️', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż mebli wolnostojących, szafek i wyposażenia', categoryName: 'Prace montażowe' },
      en: { name: 'Freestanding furniture, cabinet and equipment assembly', categoryName: 'Assembly & Fitting' },
      de: { name: 'Möbel, Schränke und Ausstattung montieren', categoryName: 'Montagearbeiten' },
      fr: { name: 'Montage meubles, armoires et équipements', categoryName: 'Travaux de pose' },
      uk: { name: 'Збирання меблів, шаф і обладнання', categoryName: 'Монтажні роботи' },
      es: { name: 'Montaje muebles, armarios y equipamiento', categoryName: 'Trabajos de montaje' },
      cs: { name: 'Montáž nábytku, skříní a vybavení', categoryName: 'Montážní práce' },
    },
  },
  {
    id: 'blinds-curtains', slug: 'blinds-curtains', categorySlug: 'assembly', unit: 'szt.',
    emoji: '🪟', measurementType: 'count',
    translations: {
      pl: { name: 'Montaż rolet, karniszy, żaluzji i telewizora', categoryName: 'Prace montażowe' },
      en: { name: 'Blinds, curtain rails, shutters and TV mounting', categoryName: 'Assembly & Fitting' },
      de: { name: 'Rollos, Gardinenstangen, Jalousien und TV montieren', categoryName: 'Montagearbeiten' },
      fr: { name: 'Pose stores, tringles, jalousies et fixation TV', categoryName: 'Travaux de pose' },
      uk: { name: 'Монтаж ролет, карнизів, жалюзі і кріплення телевізора', categoryName: 'Монтажні роботи' },
      es: { name: 'Instalación persianas, rieles, estores y TV', categoryName: 'Trabajos de montaje' },
      cs: { name: 'Montáž rolet, tyčí, žaluzií a uchycení TV', categoryName: 'Montážní práce' },
    },
  },
  {
    id: 'minor-repairs', slug: 'minor-repairs', categorySlug: 'assembly', unit: 'szt.',
    emoji: '🔨', measurementType: 'count',
    translations: {
      pl: { name: 'Drobne naprawy, regulacje zawiasów i poprawki', categoryName: 'Prace montażowe' },
      en: { name: 'Minor repairs, hinge adjustments and touch-ups', categoryName: 'Assembly & Fitting' },
      de: { name: 'Kleinreparaturen, Scharnier und Ausbesserungen', categoryName: 'Montagearbeiten' },
      fr: { name: 'Menues réparations, réglages charnières et retouches', categoryName: 'Travaux de pose' },
      uk: { name: 'Дрібний ремонт, регулювання петель і виправлення', categoryName: 'Монтажні роботи' },
      es: { name: 'Pequeñas reparaciones, ajuste bisagras y retoques', categoryName: 'Trabajos de montaje' },
      cs: { name: 'Drobné opravy, seřízení závěsů a záplaty', categoryName: 'Montážní práce' },
    },
  },

  // ── 13. PRACE KOŃCOWE ─────────────────────────────────────────────────────
  {
    id: 'final-cleanup', slug: 'final-cleanup', categorySlug: 'finishing', unit: 'm²',
    emoji: '🧹', measurementType: 'floor',
    translations: {
      pl: { name: 'Sprzątanie po remoncie / mycie i odkurzanie', categoryName: 'Prace końcowe' },
      en: { name: 'Post-renovation cleaning / washing and vacuuming', categoryName: 'Final Works' },
      de: { name: 'Baureinigung nach Renovierung / Wischen und Staubsaugen', categoryName: 'Abschlussarbeiten' },
      fr: { name: 'Nettoyage post-travaux / lavage et aspiration', categoryName: 'Travaux finaux' },
      uk: { name: 'Прибирання після ремонту / миття і пилосос', categoryName: 'Завершальні роботи' },
      es: { name: 'Limpieza post-obra / fregado y aspirado', categoryName: 'Trabajos finales' },
      cs: { name: 'Úklid po rekonstrukci / mytí a vysávání', categoryName: 'Závěrečné práce' },
    },
  },
  {
    id: 'final-touch', slug: 'final-touch', categorySlug: 'finishing', unit: 'mb',
    emoji: '✅', measurementType: 'linear',
    translations: {
      pl: { name: 'Akrylowanie narożników, silikonowanie i poprawki malarskie', categoryName: 'Prace końcowe' },
      en: { name: 'Acrylic sealing, siliconing and painting touch-ups', categoryName: 'Final Works' },
      de: { name: 'Acrylieren, Silikonfugen und Ausbesserungsstreichen', categoryName: 'Abschlussarbeiten' },
      fr: { name: 'Joints acryliques, silicone et retouches peinture', categoryName: 'Travaux finaux' },
      uk: { name: 'Акрилювання кутів, силіконування і малярські виправлення', categoryName: 'Завершальні роботи' },
      es: { name: 'Sellado acrílico, silicona y retoques de pintura', categoryName: 'Trabajos finales' },
      cs: { name: 'Akrylování rohů, silikonování a malířské záplaty', categoryName: 'Závěrečné práce' },
    },
  },
];

export const CATEGORY_ORDER = [
  'prep', 'walls-ceilings', 'drywall', 'flooring', 'tiling',
  'bathroom', 'kitchen', 'carpentry', 'electrical', 'plumbing',
  'decorative', 'assembly', 'finishing',
];

export function getWorkTypesByCategory(): Record<string, WorkType[]> {
  const result: Record<string, WorkType[]> = {};
  for (const wt of WORK_TYPES) {
    if (!result[wt.categorySlug]) result[wt.categorySlug] = [];
    result[wt.categorySlug].push(wt);
  }
  return result;
}

export function getWorkTypeById(id: string): WorkType | undefined {
  return WORK_TYPES.find((w) => w.id === id);
}
