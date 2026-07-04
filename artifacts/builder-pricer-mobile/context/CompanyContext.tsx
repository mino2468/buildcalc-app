import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'buildcalc_company';

export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  /** base64 data URI (data:image/...) or empty string */
  logoUri: string;
}

const DEFAULT_COMPANY: CompanyInfo = {
  name: '', address: '', phone: '', email: '', logoUri: '',
};

interface CompanyContextValue {
  company: CompanyInfo;
  updateCompany: (patch: Partial<CompanyInfo>) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextValue>({
  company: DEFAULT_COMPANY,
  updateCompany: async () => {},
});

export function CompanyProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState<CompanyInfo>(DEFAULT_COMPANY);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try { setCompany({ ...DEFAULT_COMPANY, ...JSON.parse(raw) }); } catch (_) {}
      }
    });
  }, []);

  const updateCompany = async (patch: Partial<CompanyInfo>) => {
    const next = { ...company, ...patch };
    setCompany(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <CompanyContext.Provider value={{ company, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  return useContext(CompanyContext);
}
