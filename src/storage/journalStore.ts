import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalEntry } from '../types';

const KEY = 'starburn_journal_entries';

export const getJournalEntries = async (): Promise<JournalEntry[]> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const list: JournalEntry[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
};

export const addJournalEntry = async (entry: JournalEntry): Promise<void> => {
  try {
    const list = await getJournalEntries();
    list.unshift(entry);
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
};

export const updateJournalEntry = async (entry: JournalEntry): Promise<void> => {
  try {
    const list = await getJournalEntries();
    const idx = list.findIndex(e => e.id === entry.id);
    if (idx >= 0) {
      list[idx] = entry;
      await AsyncStorage.setItem(KEY, JSON.stringify(list));
    }
  } catch {}
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  try {
    const list = await getJournalEntries();
    const filtered = list.filter(e => e.id !== id);
    await AsyncStorage.setItem(KEY, JSON.stringify(filtered));
  } catch {}
};

export const getJournalEntry = async (id: string): Promise<JournalEntry | null> => {
  const list = await getJournalEntries();
  return list.find(e => e.id === id) ?? null;
};

export const clearJournalEntries = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
};
