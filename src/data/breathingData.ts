import { BreathingTechnique } from '../types';
import { colors } from '../theme/colors';

export const BREATHING_TECHNIQUES: BreathingTechnique[] = [
  {
    id: 'four-seven-eight',
    name: '4-7-8 Calming',
    description:
      'Inhale 4, hold 7, exhale 8. Used to slow the nervous system and ease into rest.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    cycles: 4,
    color: colors.accentCyan,
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description:
      'Equal 4 counts: inhale, hold, exhale, hold. Clears the head and steadies focus.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    cycles: 5,
    color: colors.accentGreen,
  },
  {
    id: 'coherent',
    name: 'Coherent Breathing',
    description:
      'Slow 5 in, 5 out. Brings heart and breath into a calm steady rhythm.',
    inhale: 5,
    hold1: 0,
    exhale: 5,
    hold2: 0,
    cycles: 8,
    color: colors.accentViolet,
  },
];

export const getBreathingTechnique = (id: string) =>
  BREATHING_TECHNIQUES.find(t => t.id === id);
