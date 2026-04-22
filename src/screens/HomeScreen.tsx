import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import Card from '../components/Card';
import MoodPicker from '../components/MoodPicker';
import StatTile from '../components/StatTile';
import { AppNavProp } from '../types/navigation';
import { MoodEntry, MoodOption, StreakData } from '../types';
import { addMoodEntry, getTodayMood } from '../storage/moodStore';
import { getStreak, recordActivity } from '../storage/streakStore';
import { getFavoriteCrystal } from '../storage/settingsStore';
import { motivations } from '../data/motivations';
import { tips } from '../data/tips';
import { wise } from '../data/wise';
import { getDayOfYear, todayIso, formatLong } from '../utils/date';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms, getScreenSize } from '../utils/responsive';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<AppNavProp>();
  const { isVerySmall } = getScreenSize();

  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastActive: '' });
  const [favCrystalId, setFavCrystalId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setTodayMood(await getTodayMood());
    setStreak(await getStreak());
    setFavCrystalId(await getFavoriteCrystal());
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const doy = getDayOfYear();

  const crystal =
    motivations.find(m => m.id === favCrystalId) ?? motivations[doy % motivations.length];
  const phrase = crystal.phrases[doy % crystal.phrases.length];
  const tip = tips[doy % tips.length];
  const wiseItem = wise[doy % wise.length];

  const handleMood = async (opt: MoodOption) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      level: opt.level,
      emoji: opt.emoji,
      label: opt.label,
      tags: [],
      createdAt: Date.now(),
      date: todayIso(),
    };
    await addMoodEntry(entry);
    const nextStreak = await recordActivity();
    setTodayMood(entry);
    setStreak(nextStreak);
  };

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>Today</Text>
            <Text style={styles.date}>{formatLong(todayIso())}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.7}
            style={styles.settingsBtn}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingTop: 4 }}
        >
          <View style={styles.statRow}>
            <StatTile
              label="Day streak"
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
            <StatTile
              label="Today"
              value={todayMood ? todayMood.emoji : '–'}
              emoji="🌙"
            />
          </View>

          <Card accent="yellow">
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>YOUR CRYSTAL OF THE DAY</Text>
            </View>
            <View style={styles.crystalRow}>
              <Image source={crystal.image} style={styles.crystalImg} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={styles.crystalTitle}>{crystal.title.split('—')[0].trim()}</Text>
                <Text style={styles.crystalSub} numberOfLines={2}>
                  {crystal.title.split('—')[1]?.trim() ?? ''}
                </Text>
              </View>
            </View>
            <View style={styles.phraseBox}>
              <Text style={styles.phraseText}>{phrase}</Text>
            </View>
            <TouchableOpacity
              style={styles.openLink}
              onPress={() => navigation.navigate('Crystal')}
              activeOpacity={0.8}
            >
              <Text style={styles.openLinkText}>Open full crystal →</Text>
            </TouchableOpacity>
          </Card>

          {!todayMood ? (
            <Card accent="cyan">
              <Text style={styles.sectionTitle}>How do you feel right now?</Text>
              <Text style={styles.sectionSub}>One tap. No judgment.</Text>
              <View style={{ marginTop: 10 }}>
                <MoodPicker onSelect={handleMood} />
              </View>
            </Card>
          ) : (
            <Card accent="cyan">
              <Text style={styles.sectionTitle}>Mood logged ✓</Text>
              <Text style={styles.sectionSub}>
                You marked today as {todayMood.emoji} {todayMood.label}.
              </Text>
              <TouchableOpacity
                style={styles.openLink}
                onPress={() => navigation.navigate('Mood')}
                activeOpacity={0.8}
              >
                <Text style={styles.openLinkText}>View mood diary →</Text>
              </TouchableOpacity>
            </Card>
          )}

          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickTile}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Breathing')}
            >
              <LinearGradient
                colors={[colors.gradientBlueStart, colors.gradientBlueEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.quickEmoji}>🫁</Text>
              <Text style={styles.quickLabel}>Breathe</Text>
              <Text style={styles.quickSub}>3 techniques</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickTile}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Journal')}
            >
              <LinearGradient
                colors={[colors.gradientVioletStart, colors.gradientVioletEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.quickEmoji}>📓</Text>
              <Text style={styles.quickLabel}>Journal</Text>
              <Text style={styles.quickSub}>Reflect</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickTile}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Stats')}
            >
              <LinearGradient
                colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <Text style={styles.quickEmoji}>📊</Text>
              <Text style={[styles.quickLabel, { color: colors.textDark }]}>Stats</Text>
              <Text style={[styles.quickSub, { color: colors.textDark }]}>Insights</Text>
            </TouchableOpacity>
          </View>

          <Card accent="soft">
            <Text style={styles.smallLabel}>TIP OF THE DAY</Text>
            <Text style={styles.cardText}>{tip}</Text>
          </Card>

          <Card accent="soft">
            <Text style={styles.smallLabel}>WISDOM</Text>
            <Text style={styles.cardText}>"{wiseItem}"</Text>
          </Card>

          <View style={{ height: isVerySmall ? 10 : 20 }} />
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  greeting: {
    color: colors.textPrimary,
    fontSize: fs(28),
    fontWeight: FontWeight.black as any,
    letterSpacing: 1,
  },
  date: {
    color: colors.textTertiary,
    fontSize: fs(13),
    marginTop: 2,
  },
  settingsBtn: {
    width: 42,
    height: 42,
    borderRadius: Radius.pill,
    backgroundColor: colors.cardBg,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsIcon: {
    fontSize: fs(18),
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardLabel: {
    color: colors.accentYellow,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
  },
  crystalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  crystalImg: {
    width: 66,
    height: 66,
  },
  crystalTitle: {
    color: colors.textPrimary,
    fontSize: fs(16),
    fontWeight: FontWeight.extrabold as any,
  },
  crystalSub: {
    color: colors.textTertiary,
    fontSize: fs(12),
    marginTop: 2,
  },
  phraseBox: {
    backgroundColor: colors.cardBgActive,
    borderRadius: Radius.md,
    padding: ms(12),
    marginBottom: 10,
  },
  phraseText: {
    color: colors.textPrimary,
    fontSize: fs(14),
    lineHeight: fs(20),
    fontStyle: 'italic',
  },
  openLink: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  openLinkText: {
    color: colors.accentCyan,
    fontSize: fs(13),
    fontWeight: FontWeight.bold as any,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: fs(16),
    fontWeight: FontWeight.extrabold as any,
  },
  sectionSub: {
    color: colors.textTertiary,
    fontSize: fs(12),
    marginTop: 4,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickTile: {
    flex: 1,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    paddingVertical: ms(16),
    paddingHorizontal: ms(10),
    alignItems: 'center',
    gap: 2,
  },
  quickEmoji: {
    fontSize: fs(22),
    marginBottom: 2,
  },
  quickLabel: {
    color: colors.textPrimary,
    fontSize: fs(13),
    fontWeight: FontWeight.bold as any,
  },
  quickSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: fs(10),
    fontWeight: FontWeight.semibold as any,
  },
  smallLabel: {
    color: colors.textTertiary,
    fontSize: fs(10),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  cardText: {
    color: colors.textPrimary,
    fontSize: fs(14),
    lineHeight: fs(21),
  },
});

export default HomeScreen;
