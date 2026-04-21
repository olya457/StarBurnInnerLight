import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import BookmarkButton from '../components/BookmarkButton';
import ShareButton from '../components/ShareButton';
import { getSaved, removeSaved, SavedItem } from '../storage/storage';
import { getStoryImageByKey } from '../data/stories';
import { getMotivationImageByKey } from '../data/motivations';
import { colors } from '../theme/colors';

const { height: SCREEN_H } = Dimensions.get('window');
const IS_SMALL = SCREEN_H < 700;

const SavedScreen = () => {
  const [items, setItems] = useState<SavedItem[]>([]);

  const load = useCallback(async () => {
    setItems(await getSaved());
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const onRemove = async (id: string) => {
    await removeSaved(id);
    load();
  };

  const resolveImage = (item: SavedItem) => {
    if (!item.imageKey) return null;
    if (item.type === 'story') return getStoryImageByKey(item.imageKey);
    if (item.type === 'motivation') return getMotivationImageByKey(item.imageKey);
    return null;
  };

  if (items.length === 0) {
    return (
      <BackgroundWrapper>
        <SafePadding withTabSpace>
          <ScreenTitle title="SAVED" />
          <Text style={styles.empty}>
            There is no saved, but we recommend saving the advice.
          </Text>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title="SAVED" />
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const img = resolveImage(item);
            const isMotivation = item.type === 'motivation';
            const isStory = item.type === 'story';

            return (
              <View style={styles.card}>
                {img && (
                  <View
                    style={[
                      styles.imageWrap,
                      isMotivation && styles.imageWrapMotivation,
                      isStory && styles.imageWrapStory,
                    ]}>
                    <Image
                      source={img}
                      style={styles.image}
                      resizeMode={isMotivation ? 'contain' : 'cover'}
                    />
                  </View>
                )}
                {item.title && <Text style={styles.title}>{item.title}</Text>}
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.row}>
                  <BookmarkButton active={true} onPress={() => onRemove(item.id)} />
                  <View style={styles.shareWrap}>
                    <ShareButton
                      message={item.title ? `${item.title}\n\n${item.text}` : item.text}
                      compact
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  empty: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: IS_SMALL ? 13 : 15,
    marginTop: 40,
    lineHeight: IS_SMALL ? 19 : 22,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: IS_SMALL ? 12 : 14,
    marginBottom: IS_SMALL ? 12 : 14,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
  },
  imageWrap: {
    width: '100%',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapStory: {
    height: IS_SMALL ? 130 : 160,
  },
  imageWrapMotivation: {
    height: IS_SMALL ? 140 : 180,
    paddingVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: colors.textPrimary,
    fontSize: IS_SMALL ? 14 : 15,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: IS_SMALL ? 19 : 20,
  },
  text: {
    color: colors.textPrimary,
    fontSize: IS_SMALL ? 13 : 14,
    lineHeight: IS_SMALL ? 19 : 20,
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

export default SavedScreen;