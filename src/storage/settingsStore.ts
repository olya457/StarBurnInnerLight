import AsyncStorage from '@react-native-async-storage/async-storage';

const FAV_CRYSTAL_KEY = 'starburn_favorite_crystal';
const DAILY_SEED_KEY = 'starburn_daily_seed';

export const getFavoriteCrystal = async (): Promise<string | null> => {
  try {
    const v = await AsyncStorage.getItem(FAV_CRYSTAL_KEY);
    return v;
  } catch {
    return null;
  }
};

export const setFavoriteCrystal = async (id: string | null): Promise<void> => {
  try {
    if (id === null) {
      await AsyncStorage.removeItem(FAV_CRYSTAL_KEY);
    } else {
      await AsyncStorage.setItem(FAV_CRYSTAL_KEY, id);
    }
  } catch {}
};

export interface DailySeed {
  date: string;
  crystalIndex: number;
  phraseIndex: number;
  tipIndex: number;
  wiseIndex: number;
}

export const getDailySeed = async (): Promise<DailySeed | null> => {
  try {
    const raw = await AsyncStorage.getItem(DAILY_SEED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setDailySeed = async (seed: DailySeed): Promise<void> => {
  try {
    await AsyncStorage.setItem(DAILY_SEED_KEY, JSON.stringify(seed));
  } catch {}
};
