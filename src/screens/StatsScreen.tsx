import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import StatTile from '../components/StatTile';
import MoodChart from '../components/MoodChart';
import { MoodEntry, JournalEntry, StreakData, TestHistoryEntry } from '../types';
import { getMoodEntries, getMoodStats } from '../storage/moodStore';
import { getJournalEntries } from '../storage/journalStore';
import { getStreak } from '../storage/streakStore';
import { getTestHistory } from '../storage/testHistoryStore';
import { MOOD_OPTIONS } from '../data/moodData';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { formatReadable } from '../utils/date';
import { RootNavProp } from '../types/navigation';

const StatsScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [streak, setStreak] = useState<StreakData>({
    current: 0,
    longest: 0,
    lastActive: '',
  });
  const [tests, setTests] = useState<TestHistoryEntry[]>([]);

  const reload = useCallback(async () => {
    const [m, j, s, t] = await Promise.all([
      getMoodEntries(),
      getJournalEntries(),
      getStreak(),
      getTestHistory(),
    ]);
    setMoods(m);
    setJournals(j);
    setStreak(s);
    setTests(t);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const stats = getMoodStats(moods);

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenHeader
          title="Insights"
          subtitle="Your personal rhythm"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
        >
          <View style={styles.statRow}>
            <StatTile
              label="Current streak"
              value={streak.current}
              emoji="🔥"
              accentColor={colors.accentYellow}
            />
            <StatTile
              label="Longest"
              value={streak.longest}
              emoji="🏆"
              accentColor={colors.accentCyan}
            />
          </View>

          <View style={styles.statRow}>
            <StatTile label="Moods logged" value={moods.length} emoji="🌙" />
            <StatTile label="Reflections" value={journals.length} emoji="📓" />
            <StatTile
              label="Avg mood"
              value={stats.average || '–'}
              emoji="📈"
              accentColor={colors.accentGreen}
            />
          </View>

          <Card accent="yellow">
            <Text style={styles.label}>LAST 7 DAYS</Text>
            <View style={{ marginTop: 10 }}>
              <MoodChart entries={moods} days={7} />
            </View>
          </Card>

          <Card accent="cyan">
            <Text style={styles.label}>MOOD DISTRIBUTION</Text>
            <View style={{ gap: 10, marginTop: 10 }}>
              {MOOD_OPTIONS.map(opt => {
                const count = stats.distribution[opt.level] || 0;
                const pct = moods.length > 0 ? Math.round((count / moods.length) * 100) : 0;
                return (
                  <View key={opt.level} style={styles.distRow}>
                    <Text style={styles.distEmoji}>{opt.emoji}</Text>
                    <View style={styles.distBarWrap}>
                      <View style={styles.distHeader}>
                        <Text style={styles.distLabel}>{opt.label}</Text>
                        <Text style={styles.distCount}>
                          {count} · {pct}%
                        </Text>
                      </View>
                      <View style={styles.distTrack}>
                        <View
                          style={[
                            styles.distFill,
                            { width: `${pct}%`, backgroundColor: opt.color },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </Card>

          {tests.length > 0 ? (
            <Card accent="soft">
              <Text style={styles.label}>TEST HISTORY · {tests.length}</Text>
              <View style={{ gap: 6, marginTop: 10 }}>
                {tests.slice(0, 6).map(t => (
                  <View key={t.id} style={styles.testRow}>
                    <Text style={styles.testDate}>{formatReadable(t.date)}</Text>
                    <View style={styles.testBarWrap}>
                      <View style={styles.testTrack}>
                        <View
                          style={[
                            styles.testFill,
                            {
                              width: `${t.percent}%`,
                              backgroundColor:
                                t.percent >= 70
                                  ? colors.accentGreen
                                  : t.percent >= 45
                                  ? colors.accentYellow
                                  : colors.moodLow,
                            },
                          ]}
                        />
                      </View>
                    </View>
                    <Text style={styles.testPercent}>{t.percent}%</Text>
                  </View>
                ))}
              </View>
            </Card>
          ) : null}

          {moods.length === 0 && journals.length === 0 && tests.length === 0 ? (
            <Text style={styles.empty}>
              Log a mood, write a reflection or take a test — insights will appear here.
            </Text>
          ) : null}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    color: colors.textTertiary,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distEmoji: {
    fontSize: 22,
  },
  distBarWrap: {
    flex: 1,
    gap: 4,
  },
  distHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distLabel: {
    color: colors.textPrimary,
    fontSize: fs(12),
    fontWeight: FontWeight.semibold as any,
  },
  distCount: {
    color: colors.textTertiary,
    fontSize: fs(11),
  },
  distTrack: {
    height: ms(8),
    borderRadius: Radius.pill,
    backgroundColor: colors.cardBgActive,
    overflow: 'hidden',
  },
  distFill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  testDate: {
    color: colors.textSecondary,
    fontSize: fs(11),
    width: 76,
  },
  testBarWrap: {
    flex: 1,
  },
  testTrack: {
    height: ms(7),
    backgroundColor: colors.cardBgActive,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  testFill: {
    height: '100%',
    borderRadius: Radius.pill,
  },
  testPercent: {
    color: colors.textPrimary,
    fontSize: fs(12),
    fontWeight: FontWeight.bold as any,
    width: 40,
    textAlign: 'right',
  },
  empty: {
    color: colors.textTertiary,
    fontSize: fs(13),
    textAlign: 'center',
    marginTop: 20,
    lineHeight: fs(20),
    paddingHorizontal: 20,
  },
});

export default StatsScreen;
