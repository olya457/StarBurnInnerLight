import AsyncStorage from '@react-native-async-storage/async-storage';
import { TestHistoryEntry } from '../types';

const KEY = 'starburn_test_history';

export const getTestHistory = async (): Promise<TestHistoryEntry[]> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const list: TestHistoryEntry[] = raw ? JSON.parse(raw) : [];
    return list.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
};

export const addTestResult = async (entry: TestHistoryEntry): Promise<void> => {
  try {
    const list = await getTestHistory();
    list.unshift(entry);
    const trimmed = list.slice(0, 30);
    await AsyncStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {}
};

export const clearTestHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
};
