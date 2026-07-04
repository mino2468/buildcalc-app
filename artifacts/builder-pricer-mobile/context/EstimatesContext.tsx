import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Estimate } from '@/types';

const STORAGE_KEY = 'buildcalc_estimates';

interface EstimatesContextValue {
  estimates: Estimate[];
  addEstimate: (e: Omit<Estimate, 'id' | 'createdAt'>) => void;
  removeEstimate: (id: string) => void;
  clearAll: () => void;
}

const EstimatesContext = createContext<EstimatesContextValue>({
  estimates: [],
  addEstimate: () => {},
  removeEstimate: () => {},
  clearAll: () => {},
});

export function EstimatesProvider({ children }: { children: React.ReactNode }) {
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => { if (raw) setEstimates(JSON.parse(raw)); })
      .catch(() => {});
  }, []);

  const addEstimate = useCallback((e: Omit<Estimate, 'id' | 'createdAt'>) => {
    const newEst: Estimate = {
      ...e,
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      createdAt: new Date().toISOString(),
    };
    setEstimates((prev) => {
      const next = [newEst, ...prev];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const removeEstimate = useCallback((id: string) => {
    setEstimates((prev) => {
      const next = prev.filter((e) => e.id !== id);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setEstimates([]);
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
  }, []);

  return (
    <EstimatesContext.Provider value={{ estimates, addEstimate, removeEstimate, clearAll }}>
      {children}
    </EstimatesContext.Provider>
  );
}

export function useEstimates() {
  return useContext(EstimatesContext);
}
