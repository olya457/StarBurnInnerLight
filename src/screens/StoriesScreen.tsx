import React, { useCallback, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import { stories, Story } from '../data/stories';
import { addSaved, removeSaved, isSaved } from '../storage/storage';
import { colors } from '../theme/colors';

const StoriesScreen = () => {
  const [selected, setSelected] = useState<Story | null>(null);
  const [saved, setSaved] = useState(false);

  const reload = useCallback(async () => {
    if (!selected) return;
    setSaved(await isSaved(selected.id));
  }, [selected]);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  const toggleSave = async () => {
    if (!selected) return;
    if (saved) {
      await removeSaved(selected.id);
      setSaved(false);
    } else {
      await addSaved({
        id: selected.id,
        type: 'story',
        title: selected.title,
        text: selected.text,
        imageKey: selected.imageKey,
      });
      setSaved(true);
    }
  };

  if (selected) {
    return (
      <BackgroundWrapper>
        <SafePadding withTabSpace>
          <TouchableOpacity onPress={() => setSelected(null)} style={styles.backRow}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backTitle}>Stories</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.detailCard}>
              <Image source={selected.image} style={styles.detailImage} resizeMode="cover" />
              <Text style={styles.detailTitle}>{selected.title}</Text>
              <Text style={styles.detailText}>{selected.text}</Text>

              <View style={styles.actions}>
                <BookmarkButton active={saved} onPress={toggleSave} />
                <View style={styles.flex}>
                  <ShareButton
                    message={`${selected.title}\n\n${selected.text}`}
                    compact
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title="Stories" small />

        <FlatList
          data={stories}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listCard}>
              <Image source={item.image} style={styles.listImage} resizeMode="cover" />
              <Text style={styles.listTitle}>{item.title}</Text>

              <TouchableOpacity
                onPress={() => setSelected(item)}
                activeOpacity={0.85}
                style={styles.openBtnWrap}>
                <LinearGradient
                  colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.openBtnText}>Open</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  listCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
  },
  listImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginBottom: 12,
  },
  listTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  openBtnWrap: {
    width: '100%',
    minHeight: 54,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  openBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 1,
    textAlign: 'center',
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backArrow: {
    color: colors.textPrimary,
    fontSize: 24,
    marginRight: 12,
  },
  backTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
  },
  detailCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    marginBottom: 12,
  },
  detailTitle: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  detailText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flex: {
    flex: 1,
  },
});

export default StoriesScreen;