import React, { useCallback, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import { motivations, Motivation } from '../data/motivations';
import { addSaved, removeSaved, isSaved } from '../storage/storage';
import { colors } from '../theme/colors';

const CrystalScreen = () => {
  const [selected, setSelected] = useState<Motivation | null>(null);
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});

  const reload = useCallback(async () => {
    if (!selected) return;
    const map: Record<string, boolean> = {};
    for (let i = 0; i < selected.phrases.length; i++) {
      const id = `${selected.id}_${i}`;
      map[id] = await isSaved(id);
    }
    setSavedMap(map);
  }, [selected]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const toggleSave = async (idx: number, phrase: string) => {
    if (!selected) return;
    const id = `${selected.id}_${idx}`;
    if (savedMap[id]) {
      await removeSaved(id);
      setSavedMap({ ...savedMap, [id]: false });
    } else {
      await addSaved({
        id,
        type: 'motivation',
        text: phrase,
        title: selected.title,
        imageKey: selected.imageKey,
      });
      setSavedMap({ ...savedMap, [id]: true });
    }
  };

  if (selected) {
    return (
      <BackgroundWrapper>
        <SafePadding withTabSpace>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageBox}>
              <Image source={selected.image} style={styles.crystalImage} resizeMode="contain" />
            </View>
            <Text style={styles.motTitle}>{selected.title}</Text>

            {selected.phrases.map((phrase, i) => {
              const id = `${selected.id}_${i}`;
              return (
                <View key={id} style={styles.phraseCard}>
                  <Text style={styles.phraseText}>{phrase}</Text>
                  <View style={styles.row}>
                    <BookmarkButton
                      active={!!savedMap[id]}
                      onPress={() => toggleSave(i, phrase)}
                    />
                    <View style={styles.shareWrap}>
                      <ShareButton message={phrase} compact />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title="CRYSTALS" />
        <Text style={styles.subtitle}>Choose your crystal to reveal its wisdom</Text>

        <FlatList
          data={motivations}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.crystalCard}
              onPress={() => setSelected(item)}>
              <Image source={item.image} style={styles.thumb} resizeMode="contain" />
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title.split('—')[0].trim()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  grid: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  crystalCard: {
    width: '48%',
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderRed,
  },
  thumb: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  back: {
    paddingVertical: 8,
    marginBottom: 8,
  },
  backText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  imageBox: {
    alignItems: 'center',
    marginVertical: 10,
  },
  crystalImage: {
    width: 140,
    height: 140,
  },
  motTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginVertical: 14,
  },
  phraseCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
  },
  phraseText: {
    color: colors.textPrimary,
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  shareWrap: {
    flex: 1,
  },
});

export default CrystalScreen;