import type { Language } from '@/types';

export const LANGUAGES: { code: Language; label: string; nativeName: string }[] = [
  { code: 'pl', label: 'Polish', nativeName: 'Polski' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'de', label: 'German', nativeName: 'Deutsch' },
  { code: 'fr', label: 'French', nativeName: 'Français' },
  { code: 'uk', label: 'Ukrainian', nativeName: 'Українська' },
  { code: 'es', label: 'Spanish', nativeName: 'Español' },
  { code: 'cs', label: 'Czech', nativeName: 'Čeština' },
];

type TranslationKeys = {
  calculator: string;
  history: string;
  settings: string;
  selectWorkType: string;
  changeWorkType: string;
  selectCountry: string;
  country: string;
  area: string;
  pricePerUnit: string;
  totalPrice: string;
  suggestedPrice: string;
  priceRange: string;
  saveEstimate: string;
  estimateLabel: string;
  estimateLabelPlaceholder: string;
  noEstimates: string;
  noEstimatesDesc: string;
  language: string;
  chooseLanguage: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  min: string;
  max: string;
  avg: string;
  total: string;
  deleteEstimate: string;
  confirmDelete: string;
  cancel: string;
  confirm: string;
  saved: string;
  estimateSaved: string;
  enterArea: string;
  enterPrice: string;
  calculating: string;
  about: string;
  version: string;
  noRateAvailable: string;
  continueBtn: string;
  categories: {
    flooring: string;
    walls: string;
    painting: string;
    roofing: string;
    insulation: string;
    electrical: string;
    plumbing: string;
  };
};

const translations: Record<Language, TranslationKeys> = {
  pl: {
    calculator: 'Kalkulator',
    history: 'Historia',
    settings: 'Ustawienia',
    selectWorkType: 'Wybierz rodzaj pracy',
    changeWorkType: 'Zmień rodzaj pracy',
    selectCountry: 'Wybierz kraj',
    country: 'Kraj',
    area: 'Powierzchnia (m²)',
    pricePerUnit: 'Cena za m²',
    totalPrice: 'Łączna cena',
    suggestedPrice: 'Sugerowana cena',
    priceRange: 'Przedział cenowy',
    saveEstimate: 'Zapisz wycenę',
    estimateLabel: 'Nazwa wyceny',
    estimateLabelPlaceholder: 'np. Łazienka, Salon...',
    noEstimates: 'Brak zapisanych wycen',
    noEstimatesDesc: 'Oblicz wycenę i zapisz ją tutaj',
    language: 'Język',
    chooseLanguage: 'Wybierz język',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Profesjonalna wycena robót budowlanych',
    min: 'Min',
    max: 'Maks',
    avg: 'Śr.',
    total: 'Razem',
    deleteEstimate: 'Usuń wycenę',
    confirmDelete: 'Czy na pewno chcesz usunąć tę wycenę?',
    cancel: 'Anuluj',
    confirm: 'Usuń',
    saved: 'Zapisano',
    estimateSaved: 'Wycena została zapisana',
    enterArea: 'Wpisz powierzchnię',
    enterPrice: 'Cena za m²',
    calculating: 'Obliczanie...',
    about: 'O aplikacji',
    version: 'Wersja',
    noRateAvailable: 'Brak danych cenowych dla tego kraju',
    continueBtn: 'Kontynuuj',
    categories: {
      flooring: 'Podłogi',
      walls: 'Ściany',
      painting: 'Malowanie',
      roofing: 'Dach',
      insulation: 'Ocieplenie',
      electrical: 'Elektryka',
      plumbing: 'Hydraulika',
    },
  },
  en: {
    calculator: 'Calculator',
    history: 'History',
    settings: 'Settings',
    selectWorkType: 'Select work type',
    changeWorkType: 'Change work type',
    selectCountry: 'Select country',
    country: 'Country',
    area: 'Area (m²)',
    pricePerUnit: 'Price per m²',
    totalPrice: 'Total price',
    suggestedPrice: 'Suggested price',
    priceRange: 'Price range',
    saveEstimate: 'Save estimate',
    estimateLabel: 'Estimate label',
    estimateLabelPlaceholder: 'e.g. Bathroom, Living room...',
    noEstimates: 'No saved estimates',
    noEstimatesDesc: 'Calculate an estimate and save it here',
    language: 'Language',
    chooseLanguage: 'Choose language',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Professional construction work estimator',
    min: 'Min',
    max: 'Max',
    avg: 'Avg',
    total: 'Total',
    deleteEstimate: 'Delete estimate',
    confirmDelete: 'Are you sure you want to delete this estimate?',
    cancel: 'Cancel',
    confirm: 'Delete',
    saved: 'Saved',
    estimateSaved: 'Estimate saved',
    enterArea: 'Enter area',
    enterPrice: 'Price per m²',
    calculating: 'Calculating...',
    about: 'About',
    version: 'Version',
    noRateAvailable: 'No price data available for this country',
    continueBtn: 'Continue',
    categories: {
      flooring: 'Flooring',
      walls: 'Walls',
      painting: 'Painting',
      roofing: 'Roofing',
      insulation: 'Insulation',
      electrical: 'Electrical',
      plumbing: 'Plumbing',
    },
  },
  de: {
    calculator: 'Kalkulator',
    history: 'Verlauf',
    settings: 'Einstellungen',
    selectWorkType: 'Arbeitsart wählen',
    changeWorkType: 'Arbeitsart ändern',
    selectCountry: 'Land wählen',
    country: 'Land',
    area: 'Fläche (m²)',
    pricePerUnit: 'Preis pro m²',
    totalPrice: 'Gesamtpreis',
    suggestedPrice: 'Empfohlener Preis',
    priceRange: 'Preisspanne',
    saveEstimate: 'Angebot speichern',
    estimateLabel: 'Bezeichnung',
    estimateLabelPlaceholder: 'z.B. Bad, Wohnzimmer...',
    noEstimates: 'Keine gespeicherten Angebote',
    noEstimatesDesc: 'Berechne ein Angebot und speichere es hier',
    language: 'Sprache',
    chooseLanguage: 'Sprache wählen',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Professioneller Baukostenrechner',
    min: 'Min',
    max: 'Max',
    avg: 'Ø',
    total: 'Gesamt',
    deleteEstimate: 'Angebot löschen',
    confirmDelete: 'Möchten Sie dieses Angebot wirklich löschen?',
    cancel: 'Abbrechen',
    confirm: 'Löschen',
    saved: 'Gespeichert',
    estimateSaved: 'Angebot gespeichert',
    enterArea: 'Fläche eingeben',
    enterPrice: 'Preis pro m²',
    calculating: 'Berechnen...',
    about: 'Über die App',
    version: 'Version',
    noRateAvailable: 'Keine Preisdaten für dieses Land',
    continueBtn: 'Weiter',
    categories: {
      flooring: 'Böden',
      walls: 'Wände',
      painting: 'Malerei',
      roofing: 'Dach',
      insulation: 'Dämmung',
      electrical: 'Elektrik',
      plumbing: 'Sanitär',
    },
  },
  fr: {
    calculator: 'Calculatrice',
    history: 'Historique',
    settings: 'Paramètres',
    selectWorkType: 'Choisir le type de travail',
    changeWorkType: 'Changer le type',
    selectCountry: 'Choisir le pays',
    country: 'Pays',
    area: 'Surface (m²)',
    pricePerUnit: 'Prix par m²',
    totalPrice: 'Prix total',
    suggestedPrice: 'Prix suggéré',
    priceRange: 'Fourchette de prix',
    saveEstimate: 'Enregistrer le devis',
    estimateLabel: 'Nom du devis',
    estimateLabelPlaceholder: 'ex. Salle de bain, Salon...',
    noEstimates: 'Aucun devis enregistré',
    noEstimatesDesc: 'Calculez un devis et enregistrez-le ici',
    language: 'Langue',
    chooseLanguage: 'Choisir la langue',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Estimateur professionnel de travaux',
    min: 'Min',
    max: 'Max',
    avg: 'Moy',
    total: 'Total',
    deleteEstimate: 'Supprimer le devis',
    confirmDelete: 'Voulez-vous vraiment supprimer ce devis ?',
    cancel: 'Annuler',
    confirm: 'Supprimer',
    saved: 'Enregistré',
    estimateSaved: 'Devis enregistré',
    enterArea: 'Entrer la surface',
    enterPrice: 'Prix par m²',
    calculating: 'Calcul en cours...',
    about: 'À propos',
    version: 'Version',
    noRateAvailable: 'Pas de données de prix pour ce pays',
    continueBtn: 'Continuer',
    categories: {
      flooring: 'Sols',
      walls: 'Murs',
      painting: 'Peinture',
      roofing: 'Toiture',
      insulation: 'Isolation',
      electrical: 'Électricité',
      plumbing: 'Plomberie',
    },
  },
  uk: {
    calculator: 'Калькулятор',
    history: 'Історія',
    settings: 'Налаштування',
    selectWorkType: 'Вибрати тип роботи',
    changeWorkType: 'Змінити тип роботи',
    selectCountry: 'Вибрати країну',
    country: 'Країна',
    area: 'Площа (м²)',
    pricePerUnit: 'Ціна за м²',
    totalPrice: 'Загальна ціна',
    suggestedPrice: 'Рекомендована ціна',
    priceRange: 'Діапазон цін',
    saveEstimate: 'Зберегти кошторис',
    estimateLabel: 'Назва кошторису',
    estimateLabelPlaceholder: 'напр. Ванна, Вітальня...',
    noEstimates: 'Немає збережених кошторисів',
    noEstimatesDesc: 'Розрахуйте кошторис та збережіть його',
    language: 'Мова',
    chooseLanguage: 'Вибрати мову',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Професійний калькулятор будівельних робіт',
    min: 'Мін',
    max: 'Макс',
    avg: 'Сер.',
    total: 'Разом',
    deleteEstimate: 'Видалити кошторис',
    confirmDelete: 'Ви впевнені, що хочете видалити цей кошторис?',
    cancel: 'Скасувати',
    confirm: 'Видалити',
    saved: 'Збережено',
    estimateSaved: 'Кошторис збережено',
    enterArea: 'Введіть площу',
    enterPrice: 'Ціна за м²',
    calculating: 'Обчислення...',
    about: 'Про додаток',
    version: 'Версія',
    noRateAvailable: 'Немає цінових даних для цієї країни',
    continueBtn: 'Продовжити',
    categories: {
      flooring: 'Підлога',
      walls: 'Стіни',
      painting: 'Малярство',
      roofing: 'Покрівля',
      insulation: 'Утеплення',
      electrical: 'Електрика',
      plumbing: 'Сантехніка',
    },
  },
  es: {
    calculator: 'Calculadora',
    history: 'Historial',
    settings: 'Ajustes',
    selectWorkType: 'Seleccionar tipo de trabajo',
    changeWorkType: 'Cambiar tipo de trabajo',
    selectCountry: 'Seleccionar país',
    country: 'País',
    area: 'Superficie (m²)',
    pricePerUnit: 'Precio por m²',
    totalPrice: 'Precio total',
    suggestedPrice: 'Precio sugerido',
    priceRange: 'Rango de precios',
    saveEstimate: 'Guardar presupuesto',
    estimateLabel: 'Nombre del presupuesto',
    estimateLabelPlaceholder: 'ej. Baño, Salón...',
    noEstimates: 'No hay presupuestos guardados',
    noEstimatesDesc: 'Calcula un presupuesto y guárdalo aquí',
    language: 'Idioma',
    chooseLanguage: 'Elegir idioma',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Estimador profesional de obras',
    min: 'Mín',
    max: 'Máx',
    avg: 'Med',
    total: 'Total',
    deleteEstimate: 'Eliminar presupuesto',
    confirmDelete: '¿Estás seguro de que quieres eliminar este presupuesto?',
    cancel: 'Cancelar',
    confirm: 'Eliminar',
    saved: 'Guardado',
    estimateSaved: 'Presupuesto guardado',
    enterArea: 'Introducir superficie',
    enterPrice: 'Precio por m²',
    calculating: 'Calculando...',
    about: 'Acerca de',
    version: 'Versión',
    noRateAvailable: 'No hay datos de precios para este país',
    continueBtn: 'Continuar',
    categories: {
      flooring: 'Suelos',
      walls: 'Paredes',
      painting: 'Pintura',
      roofing: 'Tejado',
      insulation: 'Aislamiento',
      electrical: 'Electricidad',
      plumbing: 'Fontanería',
    },
  },
  cs: {
    calculator: 'Kalkulačka',
    history: 'Historie',
    settings: 'Nastavení',
    selectWorkType: 'Vybrat typ práce',
    changeWorkType: 'Změnit typ práce',
    selectCountry: 'Vybrat zemi',
    country: 'Země',
    area: 'Plocha (m²)',
    pricePerUnit: 'Cena za m²',
    totalPrice: 'Celková cena',
    suggestedPrice: 'Doporučená cena',
    priceRange: 'Cenové rozpětí',
    saveEstimate: 'Uložit kalkulaci',
    estimateLabel: 'Název kalkulace',
    estimateLabelPlaceholder: 'např. Koupelna, Obývák...',
    noEstimates: 'Žádné uložené kalkulace',
    noEstimatesDesc: 'Vypočítejte kalkulaci a uložte ji zde',
    language: 'Jazyk',
    chooseLanguage: 'Vybrat jazyk',
    welcomeTitle: 'BuildCalc',
    welcomeSubtitle: 'Profesionální kalkulačka stavebních prací',
    min: 'Min',
    max: 'Max',
    avg: 'Prům',
    total: 'Celkem',
    deleteEstimate: 'Smazat kalkulaci',
    confirmDelete: 'Opravdu chcete smazat tuto kalkulaci?',
    cancel: 'Zrušit',
    confirm: 'Smazat',
    saved: 'Uloženo',
    estimateSaved: 'Kalkulace uložena',
    enterArea: 'Zadejte plochu',
    enterPrice: 'Cena za m²',
    calculating: 'Výpočet...',
    about: 'O aplikaci',
    version: 'Verze',
    noRateAvailable: 'Žádná cenová data pro tuto zemi',
    continueBtn: 'Pokračovat',
    categories: {
      flooring: 'Podlahy',
      walls: 'Stěny',
      painting: 'Malování',
      roofing: 'Střecha',
      insulation: 'Zateplení',
      electrical: 'Elektrika',
      plumbing: 'Instalatérství',
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
