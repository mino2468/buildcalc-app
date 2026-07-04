import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language } from '@/types';

const STORAGE_LANG = 'buildcalc_language';
const STORAGE_CURRENCY = 'buildcalc_currency';

interface AppContextValue {
  language: Language;
  currencyCode: string;
  isLoading: boolean;
  hasSetLanguage: boolean;
  setLanguage: (lang: Language) => Promise<void>;
  setCurrencyCode: (code: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue>({
  language: 'pl',
  currencyCode: 'PLN',
  isLoading: true,
  hasSetLanguage: false,
  setLanguage: async () => {},
  setCurrencyCode: async () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang] = useState<Language>('pl');
  const [currencyCode, setCurrency] = useState('PLN');
  const [isLoading, setIsLoading] = useState(true);
  const [hasSetLanguage, setHasSetLanguage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [lang, currency] = await Promise.all([
          AsyncStorage.getItem(STORAGE_LANG),
          AsyncStorage.getItem(STORAGE_CURRENCY),
        ]);
        if (lang) {
          setLang(lang as Language);
          setHasSetLanguage(true);
        }
        if (currency) setCurrency(currency);
      } catch (_) {}
      setIsLoading(false);
    })();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLang(lang);
    setHasSetLanguage(true);
    await AsyncStorage.setItem(STORAGE_LANG, lang);
  };

  const setCurrencyCode = async (code: string) => {
    setCurrency(code);
    await AsyncStorage.setItem(STORAGE_CURRENCY, code);
  };

  return (
    <AppContext.Provider value={{ language, currencyCode, isLoading, hasSetLanguage, setLanguage, setCurrencyCode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
