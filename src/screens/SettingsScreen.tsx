import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { motivations } from '../data/motivations';
import { getFavoriteCrystal, setFavoriteCrystal } from '../storage/settingsStore';
import { clearMoodEntries } from '../storage/moodStore';
import { clearJournalEntries } from '../storage/journalStore';
import { resetStreak } from '../storage/streakStore';
import { clearTestHistory } from '../storage/testHistoryStore';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { RootNavProp } from '../types/navigation';

const SettingsScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const [favId, setFavId] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setFavId(await getFavoriteCrystal());
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const pickFav = async (id: string) => {
    if (favId === id) {
      await setFavoriteCrystal(null);
      setFavId(null);
    } else {
      await setFavoriteCrystal(id);
      setFavId(id);
    }
  };

  const confirmReset = () => {
    Alert.alert(
      'Reset all local data?',
      'This deletes moods, reflections, streak and test history on this device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await Promise.all([
              clearMoodEntries(),
              clearJournalEntries(),
              resetStreak(),
              clearTestHistory(),
            ]);
            Alert.alert('Done', 'All local data has been cleared.');
          },
        },
      ],
    );
  };

  return (
    <BackgroundWrapper>
      <SafePadding>
        <ScreenHeader title="Settings" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 30 }}
        >
          <Card accent="yellow">
            <Text style={styles.label}>FAVORITE CRYSTAL</Text>
            <Text style={styles.hint}>
              Your favorite crystal becomes your daily crystal on Home. Tap again to unset.
            </Text>
            <View style={styles.crystalGrid}>
              {motivations.map(m => {
                const active = favId === m.id;
                return (
                  <TouchableOpacity
                    key={m.id}
                    onPress={() => pickFav(m.id)}
                    activeOpacity={0.85}
                    style={[
                      styles.crystalTile,
                      {
                        borderColor: active ? colors.accentYellow : colors.borderSoft,
                        backgroundColor: active ? colors.cardBgActive : colors.cardBg,
                      },
                    ]}
                  >
                    <Image source={m.image} style={styles.crystalImg} resizeMode="contain" />
                    <Text style={styles.crystalName} numberOfLines={2}>
                      {m.title.split('—')[0].trim()}
                    </Text>
                    {active ? <Text style={styles.activeMark}>★</Text> : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          <Card accent="cyan">
            <Text style={styles.label}>DATA & PRIVACY</Text>
            <TouchableOpacity style={styles.rowBtn} onPress={confirmReset}>
              <Text style={styles.rowBtnText}>Reset all local data</Text>
              <Text style={styles.rowArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.rowBtn}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.rowBtnText}>About & Disclaimer</Text>
              <Text style={styles.rowArrow}>›</Text>
            </TouchableOpacity>
          </Card>

          <Card accent="soft">
            <Text style={styles.smallNote}>
              StarBurn stores all your data locally on this device. Nothing is uploaded or
              shared. Version 1.0
            </Text>
          </Card>
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
    marginBottom: 8,
  },
  hint: {
    color: colors.textSecondary,
    fontSize: fs(12),
    lineHeight: fs(18),
    marginBottom: 12,
  },
  crystalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  crystalTile: {
    width: '31%',
    aspectRatio: 0.82,
    borderWidth: 1.5,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(8),
    position: 'relative',
  },
  crystalImg: {
    width: 52,
    height: 52,
    marginBottom: 6,
  },
  crystalName: {
    color: colors.textPrimary,
    fontSize: fs(10),
    fontWeight: FontWeight.bold as any,
    textAlign: 'center',
  },
  activeMark: {
    position: 'absolute',
    top: 6,
    right: 8,
    color: colors.accentYellow,
    fontSize: 14,
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ms(10),
  },
  rowBtnText: {
    color: colors.textPrimary,
    fontSize: fs(14),
    fontWeight: FontWeight.semibold as any,
  },
  rowArrow: {
    color: colors.textTertiary,
    fontSize: 18,
    fontWeight: FontWeight.bold as any,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 4,
  },
  smallNote: {
    color: colors.textTertiary,
    fontSize: fs(12),
    lineHeight: fs(18),
    textAlign: 'center',
  },
});

export default SettingsScreen;
