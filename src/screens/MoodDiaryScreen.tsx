import React, { useCallback, useMemo, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import Chip from '../components/Chip';
import MoodPicker from '../components/MoodPicker';
import MoodEntryCard from '../components/MoodEntryCard';
import { MoodEntry, MoodOption } from '../types';
import { MOOD_REFLECTIONS, MOOD_TAGS } from '../data/moodData';
import {
  addMoodEntry,
  deleteMoodEntry,
  getMoodEntries,
} from '../storage/moodStore';
import { recordActivity } from '../storage/streakStore';
import { todayIso, isoDate } from '../utils/date';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { RootNavProp } from '../types/navigation';

const MoodDiaryScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selected, setSelected] = useState<MoodOption | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const reload = useCallback(async () => {
    setEntries(await getMoodEntries());
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const toggleTag = (id: string) => {
    setTags(prev => (prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]));
  };

  const handleSave = async () => {
    if (!selected) return;
    const entry: MoodEntry = {
      id: Date.now().toString(),
      level: selected.level,
      emoji: selected.emoji,
      label: selected.label,
      tags,
      createdAt: Date.now(),
      date: todayIso(),
    };
    await addMoodEntry(entry);
    await recordActivity();
    setSelected(null);
    setTags([]);
    reload();
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete entry?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteMoodEntry(id);
          reload();
        },
      },
    ]);
  };

  const todayIsoStr = todayIso();
  const todayEntries = useMemo(
    () => entries.filter(e => e.date === todayIsoStr),
    [entries, todayIsoStr],
  );
  const olderEntries = useMemo(
    () => entries.filter(e => e.date !== todayIsoStr),
    [entries, todayIsoStr],
  );

  const reflection = useMemo(() => {
    if (!selected) return null;
    const list = MOOD_REFLECTIONS[selected.level];
    return list[Math.floor(Math.random() * list.length)];
  }, [selected]);

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenHeader
          title="Mood Diary"
          subtitle="Track how your days feel"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
        >
          <Card accent="yellow">
            <Text style={styles.label}>HOW ARE YOU FEELING?</Text>
            <View style={{ marginTop: 10 }}>
              <MoodPicker selected={selected?.level ?? null} onSelect={setSelected} />
            </View>

            {selected ? (
              <>
                <Text style={[styles.label, { marginTop: 16 }]}>OPTIONAL TAGS</Text>
                <View style={styles.tagsRow}>
                  {MOOD_TAGS.map(t => (
                    <Chip
                      key={t.id}
                      label={t.label}
                      emoji={t.emoji}
                      selected={tags.includes(t.id)}
                      onPress={() => toggleTag(t.id)}
                    />
                  ))}
                </View>

                {reflection ? (
                  <View style={styles.reflection}>
                    <Text style={styles.reflectionEmoji}>💭</Text>
                    <Text style={styles.reflectionText}>{reflection}</Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={handleSave}
                  activeOpacity={0.85}
                  style={[styles.saveBtn, { backgroundColor: selected.color }]}
                >
                  <Text style={styles.saveBtnText}>Save entry</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.hint}>Tap a mood to continue</Text>
            )}
          </Card>

          {todayEntries.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>
                Today · {todayEntries.length} {todayEntries.length === 1 ? 'entry' : 'entries'}
              </Text>
              <View style={{ gap: 10, marginTop: 8 }}>
                {todayEntries.map(e => (
                  <MoodEntryCard key={e.id} entry={e} onDelete={handleDelete} />
                ))}
              </View>
            </View>
          ) : null}

          {olderEntries.length > 0 ? (
            <View>
              <Text style={styles.sectionTitle}>Earlier</Text>
              <View style={{ gap: 10, marginTop: 8 }}>
                {olderEntries.slice(0, 20).map(e => (
                  <MoodEntryCard key={e.id} entry={e} onDelete={handleDelete} />
                ))}
              </View>
            </View>
          ) : null}

          {entries.length === 0 ? (
            <Text style={styles.empty}>
              Your mood entries will appear here. Pick a mood above to begin.
            </Text>
          ) : null}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.textTertiary,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  reflection: {
    marginTop: 14,
    backgroundColor: colors.cardBgActive,
    borderRadius: Radius.md,
    padding: ms(12),
    flexDirection: 'row',
    gap: 10,
  },
  reflectionEmoji: {
    fontSize: 18,
  },
  reflectionText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: fs(13),
    lineHeight: fs(19),
  },
  saveBtn: {
    marginTop: 16,
    paddingVertical: ms(14),
    borderRadius: Radius.md,
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.textDark,
    fontSize: fs(15),
    fontWeight: FontWeight.extrabold as any,
    letterSpacing: 0.5,
  },
  hint: {
    color: colors.textTertiary,
    fontSize: fs(12),
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fs(14),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 0.3,
    marginTop: 8,
  },
  empty: {
    color: colors.textTertiary,
    fontSize: fs(13),
    textAlign: 'center',
    marginTop: 20,
    lineHeight: fs(20),
  },
});

export default MoodDiaryScreen;
