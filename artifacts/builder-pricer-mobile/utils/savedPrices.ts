/**
 * Persist user's own price rates per work-type ID.
 * Stored as a flat JSON object: { [workTypeId]: price }
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'saved_prices_v1';

type PriceMap = Record<string, number>;

async function load(): Promise<PriceMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PriceMap) : {};
  } catch {
    return {};
  }
}

/** Get the saved price for a single work type (null if never saved). */
export async function getSavedPrice(workTypeId: string): Promise<number | null> {
  const map = await load();
  const v = map[workTypeId];
  return v != null ? v : null;
}

/** Persist a price for a work type. */
export async function setSavedPrice(workTypeId: string, price: number): Promise<void> {
  try {
    const map = await load();
    map[workTypeId] = price;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // silent — non-critical
  }
}

/** Remove a saved price (e.g. user taps again to un-save). */
export async function deleteSavedPrice(workTypeId: string): Promise<void> {
  try {
    const map = await load();
    delete map[workTypeId];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {}
}

/** Get all saved prices at once (for display purposes). */
export async function getAllSavedPrices(): Promise<PriceMap> {
  return load();
}
