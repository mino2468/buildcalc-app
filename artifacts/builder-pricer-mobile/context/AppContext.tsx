import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language } from '@/types';

const STORAGE_LANG    = 'buildcalc_language';
const STORAGE_COUNTRY = 'buildcalc_country';

interface AppContextValue {
  language: Language;
  countryCode: string;
  isLoading: boolean;
  hasSetLanguage: boolean;
  setLanguage: (lang: Language) => Promise<void>;
  setCountryCode: (code: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue>({
  language: 'pl',
  countryCode: 'PL',
  isLoading: true,
  hasSetLanguage: false,
  setLanguage: async () => {},
  setCountryCode: async () => {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLang]       = useState<Language>('pl');
  const [countryCode, setCountry] = useState('PL');
  const [isLoading, setIsLoading] = useState(true);
  const [hasSetLanguage, setHasSetLanguage] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [lang, country] = await Promise.all([
          AsyncStorage.getItem(STORAGE_LANG),
          AsyncStorage.getItem(STORAGE_COUNTRY),
        ]);
        if (lang) { setLang(lang as Language); setHasSetLanguage(true); }
        if (country) setCountry(country);
      } catch (_) {}
      setIsLoading(false);
    })();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLang(lang);
    setHasSetLanguage(true);
    await AsyncStorage.setItem(STORAGE_LANG, lang);
  };

  const setCountryCode = async (code: string) => {
    setCountry(code);
    await AsyncStorage.setItem(STORAGE_COUNTRY, code);
  };

  return (
    <AppContext.Provider value={{ language, countryCode, isLoading, hasSetLanguage, setLanguage, setCountryCode }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
