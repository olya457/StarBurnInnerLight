import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MOOD_OPTIONS } from '../data/moodData';
import { MoodOption } from '../types';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';

interface Props {
  selected?: number | null;
  onSelect: (option: MoodOption) => void;
  compact?: boolean;
}

const MoodPicker: React.FC<Props> = ({ selected, onSelect, compact }) => {
  return (
    <View style={styles.row}>
      {MOOD_OPTIONS.map(opt => {
        const active = selected === opt.level;
        return (
          <TouchableOpacity
            key={opt.level}
            onPress={() => onSelect(opt)}
            activeOpacity={0.85}
            style={[
              styles.option,
              {
                backgroundColor: active ? opt.color : colors.cardBg,
                borderColor: active ? opt.color : colors.borderSoft,
                paddingVertical: compact ? ms(10) : ms(14),
                borderRadius: Radius.md,
              },
            ]}
          >
            <Text style={[styles.emoji, { fontSize: compact ? fs(22) : fs(28) }]}>
              {opt.emoji}
            </Text>
            {!compact ? (
              <Text
                style={[
                  styles.label,
                  {
                    color: active ? colors.textDark : colors.textSecondary,
                    fontSize: fs(11),
                  },
                ]}
              >
                {opt.label}
              </Text>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  option: {
    flex: 1,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 4,
  },
  emoji: {
    textAlign: 'center',
  },
  label: {
    fontWeight: FontWeight.semibold as any,
    textAlign: 'center',
  },
});

export default MoodPicker;
