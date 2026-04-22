import { MoodOption } from '../types';
import { colors } from '../theme/colors';

export const MOOD_OPTIONS: MoodOption[] = [
  { level: 5, emoji: '🔥', label: 'Amazing', color: colors.moodGreat },
  { level: 4, emoji: '✨', label: 'Good', color: colors.moodGood },
  { level: 3, emoji: '🌙', label: 'Okay', color: colors.moodOkay },
  { level: 2, emoji: '🌧️', label: 'Low', color: colors.moodLow },
  { level: 1, emoji: '⛈️', label: 'Heavy', color: colors.moodBad },
];

export const MOOD_TAGS = [
  { id: 'clarity', label: 'Clarity', emoji: '💡' },
  { id: 'focus', label: 'Focus', emoji: '🎯' },
  { id: 'calm', label: 'Calm', emoji: '🌊' },
  { id: 'energy', label: 'Energy', emoji: '⚡' },
  { id: 'rest', label: 'Rest', emoji: '😴' },
  { id: 'creative', label: 'Creative', emoji: '🎨' },
  { id: 'stress', label: 'Stress', emoji: '🌪️' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
  { id: 'motivated', label: 'Motivated', emoji: '🚀' },
  { id: 'tired', label: 'Tired', emoji: '🥱' },
  { id: 'social', label: 'Social', emoji: '👥' },
  { id: 'alone', label: 'Alone', emoji: '🌌' },
];

export const MOOD_REFLECTIONS: Record<number, string[]> = {
  5: [
    'Amazing days are gifts. Note what made this one shine so you can build more like it.',
    'Energy like this deserves to flow. Share a little warmth with someone today.',
    'Capture this feeling — it is easier to return to a place you remember clearly.',
  ],
  4: [
    'A good day is still a real day. Let yourself rest inside it.',
    'Small wins stack into something bigger. Take a breath to recognize this one.',
    'Good energy is best spent on what matters most. Pick one thing worth attention.',
  ],
  3: [
    'Okay is a valid state. You do not owe anyone more than this today.',
    'Middle days are when patience builds. Move slow, stay steady.',
    'Try one small act of care for yourself. Not to change the day — just to honor it.',
  ],
  2: [
    'Low days pass. Try slowing the breath: in for 4, out for 6.',
    'Be gentle today. Less demand, more permission to simply exist.',
    'One honest sentence of reflection often weighs less than carrying it silently.',
  ],
  1: [
    'Heavy days ask for less, not more. Protect your energy.',
    'If today feels like too much, find one ordinary anchor: water, a window, a walk.',
    'You do not have to fix anything right now. Rest is allowed.',
  ],
};
