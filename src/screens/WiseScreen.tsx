import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import { wise } from '../data/wise';
import { addSaved, removeSaved, isSaved } from '../storage/storage';
import { colors } from '../theme/colors';

const WiseScreen = () => {
  const [savedMap, setSavedMap] = useState<Record<string, boolean>>({});

  const reload = useCallback(async () => {
    const map: Record<string, boolean> = {};
    for (let i = 0; i < wise.length; i++) {
      const id = `wise_${i}`;
      map[id] = await isSaved(id);
    }
    setSavedMap(map);
  }, []);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const toggle = async (i: number) => {
    const id = `wise_${i}`;
    if (savedMap[id]) {
      await removeSaved(id);
      setSavedMap({ ...savedMap, [id]: false });
    } else {
      await addSaved({ id, type: 'wise', text: wise[i] });
      setSavedMap({ ...savedMap, [id]: true });
    }
  };

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title="WISE COLLECTION" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {wise.map((text, i) => {
            const id = `wise_${i}`;
            return (
              <View key={id} style={styles.card}>
                <Text style={styles.text}>{text}</Text>
                <View style={styles.row}>
                  <BookmarkButton
                    active={!!savedMap[id]}
                    onPress={() => toggle(i)}
                  />
                  <View style={styles.shareWrap}>
                    <ShareButton message={text} compact />
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
  },
  text: {
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

export default WiseScreen;