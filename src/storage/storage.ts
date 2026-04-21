import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_KEY = 'saved_items';
const ONBOARDING_KEY = 'onboarding_done';

export type SavedItem = {
  id: string;
  type: 'tip' | 'wise' | 'story' | 'motivation';
  text: string;
  title?: string;
  imageKey?: string;
};

export const getSaved = async (): Promise<SavedItem[]> => {
  try {
    const data = await AsyncStorage.getItem(SAVED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addSaved = async (item: SavedItem): Promise<void> => {
  const items = await getSaved();
  const exists = items.find(i => i.id === item.id);
  if (!exists) {
    items.unshift(item);
    await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(items));
  }
};

export const removeSaved = async (id: string): Promise<void> => {
  const items = await getSaved();
  const filtered = items.filter(i => i.id !== id);
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(filtered));
};

export const isSaved = async (id: string): Promise<boolean> => {
  const items = await getSaved();
  return items.some(i => i.id === id);
};

export const setOnboardingDone = async (): Promise<void> => {
  await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
};

export const getOnboardingDone = async (): Promise<boolean> => {
  const v = await AsyncStorage.getItem(ONBOARDING_KEY);
  return v === 'true';
};