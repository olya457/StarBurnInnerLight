import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { JournalEntry } from '../types';
import {
  addJournalEntry,
  deleteJournalEntry,
  getJournalEntries,
} from '../storage/journalStore';
import { recordActivity } from '../storage/streakStore';
import { getPromptForToday, JOURNAL_PROMPTS } from '../data/journalPrompts';
import { todayIso, formatReadable } from '../utils/date';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { RootNavProp } from '../types/navigation';

const JournalScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [text, setText] = useState('');
  const [promptIndex, setPromptIndex] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setEntries(await getJournalEntries());
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const todayPrompt = getPromptForToday();
  const activePrompt = promptIndex !== null ? JOURNAL_PROMPTS[promptIndex] : todayPrompt;

  const shufflePrompt = () => {
    const next = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    setPromptIndex(next);
  };

  const handleSave = async () => {
    if (!text.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      prompt: activePrompt,
      text: text.trim(),
      createdAt: Date.now(),
      date: todayIso(),
    };
    await addJournalEntry(entry);
    await recordActivity();
    setText('');
    setPromptIndex(null);
    reload();
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete entry?', 'This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteJournalEntry(id);
          reload();
        },
      },
    ]);
  };

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenHeader
          title="Journal"
          subtitle="Private, on this device only"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <Card accent="cyan">
            <View style={styles.promptHeader}>
              <Text style={styles.promptLabel}>TODAY'S PROMPT</Text>
              <TouchableOpacity onPress={shufflePrompt} activeOpacity={0.75}>
                <Text style={styles.shuffleText}>Shuffle ↻</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.promptText}>{activePrompt}</Text>

            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Write a few sentences…"
              placeholderTextColor={colors.textTertiary}
              multiline
              style={styles.input}
              maxLength={2000}
            />

            <View style={styles.actionsRow}>
              <Text style={styles.counter}>{text.length}/2000</Text>
              <TouchableOpacity
                disabled={!text.trim()}
                onPress={handleSave}
                activeOpacity={0.85}
                style={[
                  styles.saveBtn,
                  { opacity: text.trim() ? 1 : 0.4 },
                ]}
              >
                <Text style={styles.saveBtnText}>Save reflection</Text>
              </TouchableOpacity>
            </View>
          </Card>

          {entries.length === 0 ? (
            <Text style={styles.empty}>
              No reflections yet. Start with one honest sentence above.
            </Text>
          ) : (
            <View style={{ gap: 10 }}>
              <Text style={styles.sectionTitle}>Your reflections · {entries.length}</Text>
              {entries.map(e => (
                <View key={e.id} style={styles.entryCard}>
                  <View style={styles.entryTop}>
                    <Text style={styles.entryDate}>{formatReadable(e.date)}</Text>
                    <TouchableOpacity
                      onPress={() => handleDelete(e.id)}
                      activeOpacity={0.7}
                      style={styles.delBtn}
                    >
                      <Text style={styles.delIcon}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                  {e.prompt ? <Text style={styles.entryPrompt}>{e.prompt}</Text> : null}
                  <Text style={styles.entryText}>{e.text}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  promptLabel: {
    color: colors.accentCyan,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
  },
  shuffleText: {
    color: colors.textSecondary,
    fontSize: fs(12),
    fontWeight: FontWeight.semibold as any,
  },
  promptText: {
    color: colors.textPrimary,
    fontSize: fs(15),
    fontWeight: FontWeight.semibold as any,
    lineHeight: fs(22),
    marginBottom: 12,
  },
  input: {
    backgroundColor: colors.cardBgActive,
    borderRadius: Radius.md,
    padding: ms(12),
    color: colors.textPrimary,
    fontSize: fs(14),
    lineHeight: fs(20),
    minHeight: 110,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  counter: {
    color: colors.textTertiary,
    fontSize: fs(11),
  },
  saveBtn: {
    backgroundColor: colors.accentCyan,
    paddingHorizontal: ms(16),
    paddingVertical: ms(10),
    borderRadius: Radius.pill,
  },
  saveBtnText: {
    color: colors.textDark,
    fontSize: fs(13),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 0.5,
  },
  empty: {
    color: colors.textTertiary,
    fontSize: fs(13),
    textAlign: 'center',
    marginTop: 20,
    lineHeight: fs(20),
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fs(14),
    fontWeight: FontWeight.bold as any,
    marginTop: 8,
  },
  entryCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    borderRadius: Radius.lg,
    padding: ms(14),
    gap: 6,
  },
  entryTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryDate: {
    color: colors.accentYellow,
    fontSize: fs(12),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 0.5,
  },
  delBtn: {
    padding: 6,
    borderRadius: Radius.sm,
    backgroundColor: colors.cardBgActive,
  },
  delIcon: {
    fontSize: 12,
  },
  entryPrompt: {
    color: colors.textTertiary,
    fontSize: fs(12),
    fontStyle: 'italic',
    marginBottom: 2,
  },
  entryText: {
    color: colors.textPrimary,
    fontSize: fs(14),
    lineHeight: fs(21),
  },
});

export default JournalScreen;
