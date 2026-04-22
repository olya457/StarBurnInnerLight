import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MoodEntry } from '../types';
import { MOOD_OPTIONS, MOOD_TAGS } from '../data/moodData';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';

interface Props {
  entry: MoodEntry;
  onDelete?: (id: string) => void;
}

const MoodEntryCard: React.FC<Props> = ({ entry, onDelete }) => {
  const option = MOOD_OPTIONS.find(o => o.level === entry.level);
  const accent = option?.color ?? colors.accentYellow;
  const tagLabels = entry.tags
    .map(id => MOOD_TAGS.find(t => t.id === id))
    .filter(Boolean);

  const timeLabel = new Date(entry.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View
      style={[
        styles.card,
        {
          borderLeftColor: accent,
        },
      ]}
    >
      <View style={styles.top}>
        <View style={styles.left}>
          <Text style={styles.emoji}>{entry.emoji}</Text>
          <View style={styles.textCol}>
            <Text style={styles.label}>{entry.label}</Text>
            <Text style={styles.meta}>
              {entry.date} · {timeLabel}
            </Text>
          </View>
        </View>
        {onDelete ? (
          <TouchableOpacity
            onPress={() => onDelete(entry.id)}
            style={styles.delBtn}
            activeOpacity={0.75}
          >
            <Text style={styles.delIcon}>🗑️</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {tagLabels.length > 0 ? (
        <View style={styles.tags}>
          {tagLabels.map(t => (
            <View key={t!.id} style={styles.tag}>
              <Text style={styles.tagText}>
                {t!.emoji} {t!.label}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: Radius.lg,
    padding: ms(14),
    borderLeftWidth: 4,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.borderSoft,
    borderRightColor: colors.borderSoft,
    borderBottomColor: colors.borderSoft,
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  emoji: {
    fontSize: fs(28),
  },
  textCol: {
    flex: 1,
  },
  label: {
    color: colors.textPrimary,
    fontSize: fs(14),
    fontWeight: FontWeight.bold as any,
  },
  meta: {
    color: colors.textTertiary,
    fontSize: fs(11),
    marginTop: 2,
  },
  delBtn: {
    padding: 6,
    borderRadius: Radius.sm,
    backgroundColor: colors.cardBgActive,
  },
  delIcon: {
    fontSize: 14,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: colors.cardBgActive,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  tagText: {
    color: colors.textSecondary,
    fontSize: fs(11),
    fontWeight: FontWeight.semibold as any,
  },
});

export default MoodEntryCard;
