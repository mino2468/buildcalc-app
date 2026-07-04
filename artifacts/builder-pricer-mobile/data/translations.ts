import type { Language } from '@/types';

export const LANGUAGES: { code: Language; label: string; nativeName: string }[] = [
  { code: 'pl', label: 'Polish',    nativeName: 'Polski' },
  { code: 'en', label: 'English',   nativeName: 'English' },
  { code: 'de', label: 'German',    nativeName: 'Deutsch' },
  { code: 'fr', label: 'French',    nativeName: 'Français' },
  { code: 'uk', label: 'Ukrainian', nativeName: 'Українська' },
  { code: 'es', label: 'Spanish',   nativeName: 'Español' },
  { code: 'cs', label: 'Czech',     nativeName: 'Čeština' },
];

type TranslationKeys = {
  // Tabs
  calculator: string; history: string; settings: string;
  // Work type
  selectWorkType: string; changeWorkType: string;
  // Country / currency
  selectCurrency: string; currency: string; selectCountry: string; country: string;
  // Calculator fields
  area: string; pricePerUnit: string; totalPrice: string;
  suggestedPrice: string; priceRange: string;
  // Estimates
  saveEstimate: string; estimateLabel: string; estimateLabelPlaceholder: string;
  noEstimates: string; noEstimatesDesc: string;
  // Language
  language: string; chooseLanguage: string;
  // Welcome
  welcomeTitle: string; welcomeSubtitle: string;
  // Summary labels
  min: string; max: string; avg: string; total: string;
  // Actions
  deleteEstimate: string; confirmDelete: string; cancel: string; confirm: string;
  saved: string; estimateSaved: string;
  enterArea: string; enterPrice: string; calculating: string;
  about: string; version: string; noRateAvailable: string; continueBtn: string;
  // Dimensions
  length: string; width: string; height: string;
  dimensions: string; orEnterDirectly: string;
  // Print
  printEstimate: string;
  // Company
  companyInfo: string; companyName: string; companyAddress: string;
  companyPhone: string; companyEmail: string; companyLogo: string;
  addLogo: string; changeLogo: string;
  companyNamePlaceholder: string; companyAddressPlaceholder: string;
  companyPhonePlaceholder: string; companyEmailPlaceholder: string;
  // Wycena builder
  clearAll: string; ratesOnline: string; savedCount: string;
  newEstimate: string; addPosition: string; addToEstimate: string;
  clientInfo: string; clientName: string; clientAddress: string;
  vatRate: string; noVat: string; totalNet: string; totalGross: string;
  estimateNo: string; noPositions: string; clearEstimate: string;
  positions: string; positionCount: string;
  // linear / count measurement types
  quantity: string;
  categories: {
    // new categories (ewyceniarka.pl)
    prep: string; plastering: string; tiling: string; carpentry: string; installations: string;
    // existing
    flooring: string; painting: string;
    // legacy (kept for compat)
    walls: string; roofing: string; insulation: string; electrical: string; plumbing: string;
  };
};

const translations: Record<Language, TranslationKeys> = {
  pl: {
    calculator: 'Kalkulator', history: 'Historia', settings: 'Ustawienia',
    selectWorkType: 'Wybierz rodzaj pracy', changeWorkType: 'Zmień',
    selectCurrency: 'Wybierz walutę', currency: 'Waluta',
    selectCountry: 'Wybierz kraj', country: 'Kraj',
    area: 'Powierzchnia (m²)', pricePerUnit: 'Cena za m²', totalPrice: 'Łączna cena',
    suggestedPrice: 'Sugerowana cena', priceRange: 'Stawka rynkowa',
    saveEstimate: 'Zapisz kosztorys', estimateLabel: 'Nazwa wyceny',
    estimateLabelPlaceholder: 'np. Łazienka, Salon...',
    noEstimates: 'Brak zapisanych kosztorysów', noEstimatesDesc: 'Utwórz i zapisz swój pierwszy kosztorys',
    language: 'Język', chooseLanguage: 'Wybierz język',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Profesjonalna wycena robót budowlanych',
    min: 'Min', max: 'Maks', avg: 'Śr.', total: 'Razem',
    deleteEstimate: 'Usuń kosztorys', confirmDelete: 'Czy na pewno chcesz usunąć?',
    cancel: 'Anuluj', confirm: 'Usuń',
    saved: 'Zapisano', estimateSaved: 'Kosztorys zapisany',
    enterArea: 'Wpisz powierzchnię', enterPrice: 'Cena za m²', calculating: 'Obliczanie...',
    about: 'O aplikacji', version: 'Wersja',
    noRateAvailable: 'Brak danych cenowych dla tej waluty', continueBtn: 'Kontynuuj',
    length: 'Długość', width: 'Szerokość', height: 'Wysokość',
    dimensions: 'Wymiary', orEnterDirectly: 'lub wpisz m² bezpośrednio',
    printEstimate: 'Drukuj / Udostępnij',
    companyInfo: 'Informacje o firmie', companyName: 'Nazwa firmy',
    companyAddress: 'Adres firmy', companyPhone: 'Telefon', companyEmail: 'Email',
    companyLogo: 'Logo firmy', addLogo: 'Dodaj logo', changeLogo: 'Zmień logo',
    companyNamePlaceholder: 'np. Firma Budowlana Kowalski',
    companyAddressPlaceholder: 'ul. Przykładowa 1, 00-000 Warszawa',
    companyPhonePlaceholder: '+48 123 456 789',
    companyEmailPlaceholder: 'kontakt@firma.pl',
    clearAll: 'Wyczyść wszystko', ratesOnline: 'Stawki aktualne (online)', savedCount: 'zapisanych',
    newEstimate: 'Nowy kosztorys', addPosition: 'Dodaj pozycję', addToEstimate: 'Dodaj do kosztorysu',
    clientInfo: 'Dane klienta', clientName: 'Klient / Firma', clientAddress: 'Adres klienta',
    vatRate: 'VAT', noVat: 'Bez VAT', totalNet: 'Razem netto', totalGross: 'Razem brutto',
    estimateNo: 'Kosztorys', noPositions: 'Brak pozycji', clearEstimate: 'Nowy dokument',
    positions: 'Pozycje', positionCount: 'poz.',
    quantity: 'Ilość',
    categories: {
      prep: 'Prace przygotowawcze', plastering: 'Tynki i gładzie',
      painting: 'Malowanie i sufity', tiling: 'Glazurnictwo i flizowanie',
      flooring: 'Wykończenie podłóg', carpentry: 'Stolarka i montaż',
      installations: 'Instalacje i biały montaż',
      walls: 'Ściany', roofing: 'Dach', insulation: 'Ocieplenie',
      electrical: 'Elektryka', plumbing: 'Hydraulika',
    },
  },
  en: {
    calculator: 'Calculator', history: 'History', settings: 'Settings',
    selectWorkType: 'Select work type', changeWorkType: 'Change',
    selectCurrency: 'Select currency', currency: 'Currency',
    selectCountry: 'Select country', country: 'Country',
    area: 'Area (m²)', pricePerUnit: 'Price per m²', totalPrice: 'Total price',
    suggestedPrice: 'Suggested price', priceRange: 'Market rate',
    saveEstimate: 'Save estimate', estimateLabel: 'Estimate label',
    estimateLabelPlaceholder: 'e.g. Bathroom, Living room...',
    noEstimates: 'No saved estimates', noEstimatesDesc: 'Create and save your first estimate',
    language: 'Language', chooseLanguage: 'Choose language',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Professional construction work estimator',
    min: 'Min', max: 'Max', avg: 'Avg', total: 'Total',
    deleteEstimate: 'Delete estimate', confirmDelete: 'Are you sure you want to delete?',
    cancel: 'Cancel', confirm: 'Delete',
    saved: 'Saved', estimateSaved: 'Estimate saved',
    enterArea: 'Enter area', enterPrice: 'Price per m²', calculating: 'Calculating...',
    about: 'About', version: 'Version',
    noRateAvailable: 'No price data for this currency', continueBtn: 'Continue',
    length: 'Length', width: 'Width', height: 'Height',
    dimensions: 'Dimensions', orEnterDirectly: 'or enter m² directly',
    printEstimate: 'Print / Share',
    companyInfo: 'Company info', companyName: 'Company name',
    companyAddress: 'Company address', companyPhone: 'Phone', companyEmail: 'Email',
    companyLogo: 'Company logo', addLogo: 'Add logo', changeLogo: 'Change logo',
    companyNamePlaceholder: 'e.g. Smith Construction Ltd',
    companyAddressPlaceholder: '1 Example Street, London',
    companyPhonePlaceholder: '+44 123 456 7890',
    companyEmailPlaceholder: 'contact@company.com',
    clearAll: 'Clear all', ratesOnline: 'Rates current (online)', savedCount: 'saved',
    newEstimate: 'New estimate', addPosition: 'Add position', addToEstimate: 'Add to estimate',
    clientInfo: 'Client info', clientName: 'Client / Company', clientAddress: 'Client address',
    vatRate: 'VAT', noVat: 'No VAT', totalNet: 'Total net', totalGross: 'Total gross',
    estimateNo: 'Estimate', noPositions: 'No positions', clearEstimate: 'New document',
    positions: 'Positions', positionCount: 'pos.',
    quantity: 'Quantity',
    categories: {
      prep: 'Preparation', plastering: 'Plastering',
      painting: 'Painting & Ceilings', tiling: 'Tiling',
      flooring: 'Flooring', carpentry: 'Carpentry & Assembly',
      installations: 'Installations',
      walls: 'Walls', roofing: 'Roofing', insulation: 'Insulation',
      electrical: 'Electrical', plumbing: 'Plumbing',
    },
  },
  de: {
    calculator: 'Kalkulator', history: 'Verlauf', settings: 'Einstellungen',
    selectWorkType: 'Arbeitsart wählen', changeWorkType: 'Ändern',
    selectCurrency: 'Währung wählen', currency: 'Währung',
    selectCountry: 'Land wählen', country: 'Land',
    area: 'Fläche (m²)', pricePerUnit: 'Preis pro m²', totalPrice: 'Gesamtpreis',
    suggestedPrice: 'Empfohlener Preis', priceRange: 'Marktpreis',
    saveEstimate: 'Angebot speichern', estimateLabel: 'Bezeichnung',
    estimateLabelPlaceholder: 'z.B. Bad, Wohnzimmer...',
    noEstimates: 'Keine gespeicherten Angebote', noEstimatesDesc: 'Erstellen Sie Ihr erstes Angebot',
    language: 'Sprache', chooseLanguage: 'Sprache wählen',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Professioneller Baukostenrechner',
    min: 'Min', max: 'Max', avg: 'Ø', total: 'Gesamt',
    deleteEstimate: 'Angebot löschen', confirmDelete: 'Möchten Sie wirklich löschen?',
    cancel: 'Abbrechen', confirm: 'Löschen',
    saved: 'Gespeichert', estimateSaved: 'Angebot gespeichert',
    enterArea: 'Fläche eingeben', enterPrice: 'Preis pro m²', calculating: 'Berechnen...',
    about: 'Über die App', version: 'Version',
    noRateAvailable: 'Keine Preisdaten für diese Währung', continueBtn: 'Weiter',
    length: 'Länge', width: 'Breite', height: 'Höhe',
    dimensions: 'Maße', orEnterDirectly: 'oder m² direkt eingeben',
    printEstimate: 'Drucken / Teilen',
    companyInfo: 'Firmeninformationen', companyName: 'Firmenname',
    companyAddress: 'Firmenadresse', companyPhone: 'Telefon', companyEmail: 'E-Mail',
    companyLogo: 'Firmenlogo', addLogo: 'Logo hinzufügen', changeLogo: 'Logo ändern',
    companyNamePlaceholder: 'z.B. Müller Bau GmbH',
    companyAddressPlaceholder: 'Musterstraße 1, 12345 Berlin',
    companyPhonePlaceholder: '+49 123 456789',
    companyEmailPlaceholder: 'info@firma.de',
    clearAll: 'Alle löschen', ratesOnline: 'Preise aktuell (online)', savedCount: 'gespeichert',
    newEstimate: 'Neues Angebot', addPosition: 'Position hinzufügen', addToEstimate: 'Zum Angebot',
    clientInfo: 'Kundendaten', clientName: 'Kunde / Firma', clientAddress: 'Kundenadresse',
    vatRate: 'MwSt.', noVat: 'Ohne MwSt.', totalNet: 'Netto gesamt', totalGross: 'Brutto gesamt',
    estimateNo: 'Angebot', noPositions: 'Keine Positionen', clearEstimate: 'Neues Dokument',
    positions: 'Positionen', positionCount: 'Pos.',
    quantity: 'Menge',
    categories: {
      prep: 'Vorbereitung', plastering: 'Verputzen',
      painting: 'Malen & Decken', tiling: 'Fliesenlegen',
      flooring: 'Böden', carpentry: 'Schreinerarbeit',
      installations: 'Installationen',
      walls: 'Wände', roofing: 'Dach', insulation: 'Dämmung',
      electrical: 'Elektrik', plumbing: 'Sanitär',
    },
  },
  fr: {
    calculator: 'Calculatrice', history: 'Historique', settings: 'Paramètres',
    selectWorkType: 'Choisir le type de travail', changeWorkType: 'Modifier',
    selectCurrency: 'Choisir la devise', currency: 'Devise',
    selectCountry: 'Choisir le pays', country: 'Pays',
    area: 'Surface (m²)', pricePerUnit: 'Prix par m²', totalPrice: 'Prix total',
    suggestedPrice: 'Prix suggéré', priceRange: 'Tarif marché',
    saveEstimate: 'Enregistrer le devis', estimateLabel: 'Nom du devis',
    estimateLabelPlaceholder: 'ex. Salle de bain, Salon...',
    noEstimates: 'Aucun devis enregistré', noEstimatesDesc: 'Créez votre premier devis',
    language: 'Langue', chooseLanguage: 'Choisir la langue',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Estimateur professionnel de travaux',
    min: 'Min', max: 'Max', avg: 'Moy', total: 'Total',
    deleteEstimate: 'Supprimer le devis', confirmDelete: 'Voulez-vous vraiment supprimer ?',
    cancel: 'Annuler', confirm: 'Supprimer',
    saved: 'Enregistré', estimateSaved: 'Devis enregistré',
    enterArea: 'Entrer la surface', enterPrice: 'Prix par m²', calculating: 'Calcul...',
    about: 'À propos', version: 'Version',
    noRateAvailable: 'Pas de données pour cette devise', continueBtn: 'Continuer',
    length: 'Longueur', width: 'Largeur', height: 'Hauteur',
    dimensions: 'Dimensions', orEnterDirectly: 'ou saisir les m² directement',
    printEstimate: 'Imprimer / Partager',
    companyInfo: "Informations d'entreprise", companyName: "Nom de l'entreprise",
    companyAddress: "Adresse de l'entreprise", companyPhone: 'Téléphone', companyEmail: 'Email',
    companyLogo: "Logo d'entreprise", addLogo: 'Ajouter logo', changeLogo: 'Changer logo',
    companyNamePlaceholder: 'ex. Martin Construction SARL',
    companyAddressPlaceholder: '1 rue Exemple, 75001 Paris',
    companyPhonePlaceholder: '+33 1 23 45 67 89',
    companyEmailPlaceholder: 'contact@entreprise.fr',
    clearAll: 'Tout effacer', ratesOnline: 'Tarifs à jour (en ligne)', savedCount: 'enregistrés',
    newEstimate: 'Nouveau devis', addPosition: 'Ajouter un poste', addToEstimate: 'Ajouter au devis',
    clientInfo: 'Infos client', clientName: 'Client / Société', clientAddress: 'Adresse client',
    vatRate: 'TVA', noVat: 'Sans TVA', totalNet: 'Total HT', totalGross: 'Total TTC',
    estimateNo: 'Devis', noPositions: 'Aucun poste', clearEstimate: 'Nouveau document',
    positions: 'Postes', positionCount: 'postes',
    quantity: 'Quantité',
    categories: {
      prep: 'Préparation', plastering: 'Plâtrerie',
      painting: 'Peinture & Plafonds', tiling: 'Carrelage',
      flooring: 'Sols', carpentry: 'Menuiserie',
      installations: 'Installations',
      walls: 'Murs', roofing: 'Toiture', insulation: 'Isolation',
      electrical: 'Électricité', plumbing: 'Plomberie',
    },
  },
  uk: {
    calculator: 'Калькулятор', history: 'Історія', settings: 'Налаштування',
    selectWorkType: 'Вибрати тип роботи', changeWorkType: 'Змінити',
    selectCurrency: 'Вибрати валюту', currency: 'Валюта',
    selectCountry: 'Вибрати країну', country: 'Країна',
    area: 'Площа (м²)', pricePerUnit: 'Ціна за м²', totalPrice: 'Загальна ціна',
    suggestedPrice: 'Рекомендована ціна', priceRange: 'Ринкова ставка',
    saveEstimate: 'Зберегти кошторис', estimateLabel: 'Назва кошторису',
    estimateLabelPlaceholder: 'напр. Ванна, Вітальня...',
    noEstimates: 'Немає збережених кошторисів', noEstimatesDesc: 'Створіть перший кошторис',
    language: 'Мова', chooseLanguage: 'Вибрати мову',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Професійний калькулятор будівельних робіт',
    min: 'Мін', max: 'Макс', avg: 'Сер.', total: 'Разом',
    deleteEstimate: 'Видалити кошторис', confirmDelete: 'Ви впевнені, що хочете видалити?',
    cancel: 'Скасувати', confirm: 'Видалити',
    saved: 'Збережено', estimateSaved: 'Кошторис збережено',
    enterArea: 'Введіть площу', enterPrice: 'Ціна за м²', calculating: 'Обчислення...',
    about: 'Про додаток', version: 'Версія',
    noRateAvailable: 'Немає цінових даних для цієї валюти', continueBtn: 'Продовжити',
    length: 'Довжина', width: 'Ширина', height: 'Висота',
    dimensions: 'Розміри', orEnterDirectly: 'або введіть м² напряму',
    printEstimate: 'Друк / Поділитися',
    companyInfo: 'Інформація про компанію', companyName: 'Назва компанії',
    companyAddress: 'Адреса компанії', companyPhone: 'Телефон', companyEmail: 'Email',
    companyLogo: 'Логотип компанії', addLogo: 'Додати логотип', changeLogo: 'Змінити логотип',
    companyNamePlaceholder: 'напр. Будівельна компанія Коваленко',
    companyAddressPlaceholder: 'вул. Прикладна 1, 01001 Київ',
    companyPhonePlaceholder: '+380 12 345 6789',
    companyEmailPlaceholder: 'info@kompaniya.ua',
    clearAll: 'Очистити все', ratesOnline: 'Ставки актуальні (онлайн)', savedCount: 'збережених',
    newEstimate: 'Новий кошторис', addPosition: 'Додати позицію', addToEstimate: 'Додати до кошторису',
    clientInfo: 'Дані клієнта', clientName: 'Клієнт / Компанія', clientAddress: 'Адреса клієнта',
    vatRate: 'ПДВ', noVat: 'Без ПДВ', totalNet: 'Разом без ПДВ', totalGross: 'Разом з ПДВ',
    estimateNo: 'Кошторис', noPositions: 'Немає позицій', clearEstimate: 'Новий документ',
    positions: 'Позиції', positionCount: 'поз.',
    quantity: 'Кількість',
    categories: {
      prep: 'Підготовчі роботи', plastering: 'Штукатурка і шпаклівка',
      painting: 'Малярство і стелі', tiling: 'Плиткування',
      flooring: 'Підлога', carpentry: 'Столярка і монтаж',
      installations: 'Інсталяції та монтаж',
      walls: 'Стіни', roofing: 'Покрівля', insulation: 'Утеплення',
      electrical: 'Електрика', plumbing: 'Сантехніка',
    },
  },
  es: {
    calculator: 'Calculadora', history: 'Historial', settings: 'Ajustes',
    selectWorkType: 'Seleccionar tipo de trabajo', changeWorkType: 'Cambiar',
    selectCurrency: 'Seleccionar moneda', currency: 'Moneda',
    selectCountry: 'Seleccionar país', country: 'País',
    area: 'Superficie (m²)', pricePerUnit: 'Precio por m²', totalPrice: 'Precio total',
    suggestedPrice: 'Precio sugerido', priceRange: 'Tarifa de mercado',
    saveEstimate: 'Guardar presupuesto', estimateLabel: 'Nombre del presupuesto',
    estimateLabelPlaceholder: 'ej. Baño, Salón...',
    noEstimates: 'No hay presupuestos guardados', noEstimatesDesc: 'Crea tu primer presupuesto',
    language: 'Idioma', chooseLanguage: 'Elegir idioma',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Estimador profesional de obras',
    min: 'Mín', max: 'Máx', avg: 'Med', total: 'Total',
    deleteEstimate: 'Eliminar presupuesto', confirmDelete: '¿Estás seguro de que quieres eliminar?',
    cancel: 'Cancelar', confirm: 'Eliminar',
    saved: 'Guardado', estimateSaved: 'Presupuesto guardado',
    enterArea: 'Introducir superficie', enterPrice: 'Precio por m²', calculating: 'Calculando...',
    about: 'Acerca de', version: 'Versión',
    noRateAvailable: 'No hay datos de precios para esta moneda', continueBtn: 'Continuar',
    length: 'Longitud', width: 'Ancho', height: 'Altura',
    dimensions: 'Dimensiones', orEnterDirectly: 'o introducir m² directamente',
    printEstimate: 'Imprimir / Compartir',
    companyInfo: 'Información de empresa', companyName: 'Nombre de empresa',
    companyAddress: 'Dirección de empresa', companyPhone: 'Teléfono', companyEmail: 'Email',
    companyLogo: 'Logotipo', addLogo: 'Agregar logo', changeLogo: 'Cambiar logo',
    companyNamePlaceholder: 'ej. Construcciones García S.L.',
    companyAddressPlaceholder: 'Calle Ejemplo 1, 28001 Madrid',
    companyPhonePlaceholder: '+34 912 345 678',
    companyEmailPlaceholder: 'info@empresa.es',
    clearAll: 'Borrar todo', ratesOnline: 'Tarifas actualizadas (online)', savedCount: 'guardados',
    newEstimate: 'Nuevo presupuesto', addPosition: 'Añadir partida', addToEstimate: 'Añadir al presupuesto',
    clientInfo: 'Datos del cliente', clientName: 'Cliente / Empresa', clientAddress: 'Dirección del cliente',
    vatRate: 'IVA', noVat: 'Sin IVA', totalNet: 'Total sin IVA', totalGross: 'Total con IVA',
    estimateNo: 'Presupuesto', noPositions: 'Sin partidas', clearEstimate: 'Nuevo documento',
    positions: 'Partidas', positionCount: 'part.',
    quantity: 'Cantidad',
    categories: {
      prep: 'Preparación', plastering: 'Enlucidos',
      painting: 'Pintura y Techos', tiling: 'Alicatado',
      flooring: 'Suelos', carpentry: 'Carpintería',
      installations: 'Instalaciones',
      walls: 'Paredes', roofing: 'Tejado', insulation: 'Aislamiento',
      electrical: 'Electricidad', plumbing: 'Fontanería',
    },
  },
  cs: {
    calculator: 'Kalkulačka', history: 'Historie', settings: 'Nastavení',
    selectWorkType: 'Vybrat typ práce', changeWorkType: 'Změnit',
    selectCurrency: 'Vybrat měnu', currency: 'Měna',
    selectCountry: 'Vybrat zemi', country: 'Země',
    area: 'Plocha (m²)', pricePerUnit: 'Cena za m²', totalPrice: 'Celková cena',
    suggestedPrice: 'Doporučená cena', priceRange: 'Tržní cena',
    saveEstimate: 'Uložit kalkulaci', estimateLabel: 'Název kalkulace',
    estimateLabelPlaceholder: 'např. Koupelna, Obývák...',
    noEstimates: 'Žádné uložené kalkulace', noEstimatesDesc: 'Vytvořte svou první kalkulaci',
    language: 'Jazyk', chooseLanguage: 'Vybrat jazyk',
    welcomeTitle: 'BuildCalc', welcomeSubtitle: 'Profesionální kalkulačka stavebních prací',
    min: 'Min', max: 'Max', avg: 'Prům', total: 'Celkem',
    deleteEstimate: 'Smazat kalkulaci', confirmDelete: 'Opravdu chcete smazat?',
    cancel: 'Zrušit', confirm: 'Smazat',
    saved: 'Uloženo', estimateSaved: 'Kalkulace uložena',
    enterArea: 'Zadejte plochu', enterPrice: 'Cena za m²', calculating: 'Výpočet...',
    about: 'O aplikaci', version: 'Verze',
    noRateAvailable: 'Žádná cenová data pro tuto měnu', continueBtn: 'Pokračovat',
    length: 'Délka', width: 'Šířka', height: 'Výška',
    dimensions: 'Rozměry', orEnterDirectly: 'nebo zadejte m² přímo',
    printEstimate: 'Tisknout / Sdílet',
    companyInfo: 'Informace o firmě', companyName: 'Název firmy',
    companyAddress: 'Adresa firmy', companyPhone: 'Telefon', companyEmail: 'Email',
    companyLogo: 'Logo firmy', addLogo: 'Přidat logo', changeLogo: 'Změnit logo',
    companyNamePlaceholder: 'např. Stavební firma Novák s.r.o.',
    companyAddressPlaceholder: 'Příkladní 1, 110 00 Praha',
    companyPhonePlaceholder: '+420 123 456 789',
    companyEmailPlaceholder: 'info@firma.cz',
    clearAll: 'Vymazat vše', ratesOnline: 'Sazby aktuální (online)', savedCount: 'uložených',
    newEstimate: 'Nová kalkulace', addPosition: 'Přidat položku', addToEstimate: 'Přidat do kalkulace',
    clientInfo: 'Údaje klienta', clientName: 'Klient / Firma', clientAddress: 'Adresa klienta',
    vatRate: 'DPH', noVat: 'Bez DPH', totalNet: 'Celkem bez DPH', totalGross: 'Celkem s DPH',
    estimateNo: 'Kalkulace', noPositions: 'Žádné položky', clearEstimate: 'Nový dokument',
    positions: 'Položky', positionCount: 'pol.',
    quantity: 'Množství',
    categories: {
      prep: 'Přípravné práce', plastering: 'Omítky a stěrky',
      painting: 'Malování a stropy', tiling: 'Obkládání',
      flooring: 'Podlahy', carpentry: 'Truhlářství a montáž',
      installations: 'Instalace',
      walls: 'Stěny', roofing: 'Střecha', insulation: 'Zateplení',
      electrical: 'Elektrika', plumbing: 'Instalatérství',
    },
  },
};

export function t(lang: Language, key: keyof TranslationKeys): string {
  const val = translations[lang]?.[key];
  if (typeof val === 'string') return val;
  return translations['en'][key] as string;
}

export function tCategory(lang: Language, categorySlug: string): string {
  const cats = translations[lang]?.categories ?? translations['en'].categories;
  return (cats as Record<string, string>)[categorySlug] ?? categorySlug;
}

export default translations;
