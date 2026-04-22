import AsyncStorage from '@react-native-async-storage/async-storage';
import { MoodEntry, MoodLevel } from '../types';
import { isoDate } from '../utils/date';

const KEY = 'starburn_mood_entries';

export const getMoodEntries = async (): Promise<MoodEntry[]> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const list: MoodEntry[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
};

export const addMoodEntry = async (entry: MoodEntry): Promise<void> => {
  try {
    const list = await getMoodEntries();
    list.unshift(entry);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
};

export const deleteMoodEntry = async (id: string): Promise<void> => {
  try {
    const list = await getMoodEntries();
    const filtered = list.filter(e => e.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
  } catch {}
};

export const clearMoodEntries = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
};

export const getTodayMood = async (): Promise<MoodEntry | null> => {
  const list = await getMoodEntries();
  const today = isoDate();
  return list.find(e => e.date === today) ?? null;
};

export const getMoodStats = (entries: MoodEntry[]) => {
  if (entries.length === 0) {
    return {
      total: 0,
      average: 0,
      distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<MoodLevel, number>,
      bestDate: null as string | null,
    };
  }

  const distribution: Record<MoodLevel, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let sum = 0;
  let best: MoodEntry = entries[0];

  for (const e of entries) {
    distribution[e.level] += 1;
    sum += e.level;
    if (e.level > best.level) best = e;
  }

  return {
    total: entries.length,
    average: Math.round((sum / entries.length) * 10) / 10,
    distribution,
    bestDate: best.date,
  };
};
