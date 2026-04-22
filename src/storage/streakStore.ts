import AsyncStorage from '@react-native-async-storage/async-storage';
import { StreakData } from '../types';
import { daysBetween, todayIso } from '../utils/date';

const KEY = 'starburn_streak';

export const getStreak = async (): Promise<StreakData> => {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { current: 0, longest: 0, lastActive: '' };
};

export const recordActivity = async (): Promise<StreakData> => {
  const current = await getStreak();
  const today = todayIso();

  if (current.lastActive === today) {
    return current;
  }

  let newCurrent = current.current;
  if (!current.lastActive) {
    newCurrent = 1;
  } else {
    const diff = daysBetween(current.lastActive, today);
    if (diff === 1) {
      newCurrent = current.current + 1;
    } else if (diff > 1) {
      newCurrent = 1;
    } else {
      newCurrent = current.current;
    }
  }

  const longest = Math.max(current.longest, newCurrent);
  const next: StreakData = { current: newCurrent, longest, lastActive: today };

  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(next));
  } catch {}

  return next;
};

export const resetStreak = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {}
};
