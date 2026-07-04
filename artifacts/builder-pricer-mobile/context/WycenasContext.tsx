import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Wycena } from '@/types';

const STORAGE_KEY    = 'buildcalc_wycenas_v2';
const STORAGE_NUMKEY = 'buildcalc_wycena_counter';

interface WycenasContextValue {
  wycenas: Wycena[];
  nextNumber: number;
  /** Creates and persists a new Wycena; returns the created document (with its id and number). */
  addWycena: (w: Omit<Wycena, 'id' | 'createdAt' | 'number'>) => Wycena;
  removeWycena: (id: string) => void;
  clearAll: () => void;
}

const WycenasContext = createContext<WycenasContextValue>({
  wycenas: [],
  nextNumber: 1,
  addWycena: () => { throw new Error('WycenasProvider not mounted'); },
  removeWycena: () => {},
  clearAll: () => {},
});

export function WycenasProvider({ children }: { children: React.ReactNode }) {
  const [wycenas, setWycenas]       = useState<Wycena[]>([]);
  const [nextNumber, setNextNumber] = useState(1);

  // Ref mirrors the counter so addWycena can read/increment it atomically
  // without waiting for a re-render (prevents duplicate numbers on rapid taps).
  const counterRef = useRef(1);

  useEffect(() => {
    (async () => {
      try {
        const [raw, num] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEY),
          AsyncStorage.getItem(STORAGE_NUMKEY),
        ]);
        if (raw) setWycenas(JSON.parse(raw));
        const parsed = num ? parseInt(num, 10) : 1;
        const safe   = Number.isFinite(parsed) && parsed >= 1 ? parsed : 1;
        counterRef.current = safe;
        setNextNumber(safe);
      } catch (_) {}
    })();
  }, []);

  const persist = useCallback(async (list: Wycena[], counter: number) => {
    try {
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list)),
        AsyncStorage.setItem(STORAGE_NUMKEY, String(counter)),
      ]);
    } catch (_) {}
  }, []);

  const addWycena = useCallback((w: Omit<Wycena, 'id' | 'createdAt' | 'number'>): Wycena => {
    // Atomically grab-and-increment the counter via ref — safe even if called
    // twice before the next render (no duplicate document numbers).
    const num = counterRef.current;
    counterRef.current = num + 1;

    const newWycena: Wycena = {
      ...w,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      number: num,
    };

    setWycenas((prev) => {
      const next = [newWycena, ...prev];
      persist(next, counterRef.current);
      return next;
    });
    setNextNumber(counterRef.current);

    return newWycena;
  }, [persist]);

  const removeWycena = useCallback((id: string) => {
    setWycenas((prev) => {
      const next = prev.filter((w) => w.id !== id);
      persist(next, counterRef.current);
      return next;
    });
  }, [persist]);

  const clearAll = useCallback(() => {
    setWycenas([]);
    persist([], counterRef.current);
  }, [persist]);

  return (
    <WycenasContext.Provider value={{ wycenas, nextNumber, addWycena, removeWycena, clearAll }}>
      {children}
    </WycenasContext.Provider>
  );
}

export function useWycenas() {
  return useContext(WycenasContext);
}
