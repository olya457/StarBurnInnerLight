export type MoodLevel = 1 | 2 | 3 | 4 | 5;

export interface MoodEntry {
  id: string;
  level: MoodLevel;
  emoji: string;
  label: string;
  tags: string[];
  createdAt: number;
  date: string;
}

export interface JournalEntry {
  id: string;
  prompt?: string;
  text: string;
  createdAt: number;
  date: string;
}

export interface StreakData {
  current: number;
  longest: number;
  lastActive: string;
}

export interface TestHistoryEntry {
  id: string;
  percent: number;
  createdAt: number;
  date: string;
}

export interface BreathingTechnique {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  cycles: number;
  color: string;
}

export interface MoodOption {
  level: MoodLevel;
  emoji: string;
  label: string;
  color: string;
}
