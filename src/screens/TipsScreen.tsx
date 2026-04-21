import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import ShareButton from '../components/ShareButton';
import BookmarkButton from '../components/BookmarkButton';
import { tips } from '../data/tips';
import { addSaved, removeSaved, isSaved } from '../storage/storage';
import { colors } from '../theme/colors';

const { height: SCREEN_H } = Dimensions.get('window');
const IS_SMALL = SCREEN_H < 700;

const TipsScreen = () => {
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState(false);

  const id = `tip_${index}`;
  const current = tips[index];

  useFocusEffect(
    useCallback(() => {
      (async () => setSaved(await isSaved(id)))();
    }, [id]),
  );

  const nextTip = () => {
    const n = (index + 1) % tips.length;
    setIndex(n);
  };

  const toggle = async () => {
    if (saved) {
      await removeSaved(id);
      setSaved(false);
    } else {
      await addSaved({ id, type: 'tip', text: current });
      setSaved(true);
    }
  };

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title="TIPS" />

        <View style={styles.card}>
          <Text style={styles.title}>Tips for life:</Text>
          <Text style={styles.text}>{current}</Text>

          <ShareButton message={current} style={styles.shareBtn} />
          <BookmarkButton active={saved} onPress={toggle} size="large" style={styles.bookmark} />
        </View>

        <TouchableOpacity onPress={nextTip} activeOpacity={0.85} style={styles.nextBtn}>
          <LinearGradient
            colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.nextBtnText}>NEXT TIP</Text>
        </TouchableOpacity>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: IS_SMALL ? 16 : 22,
    borderWidth: 1.5,
    borderColor: colors.borderYellow,
    marginBottom: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: IS_SMALL ? 19 : 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: IS_SMALL ? 8 : 12,
  },
  text: {
    color: colors.textSecondary,
    fontSize: IS_SMALL ? 14 : 15,
    lineHeight: IS_SMALL ? 20 : 22,
    textAlign: 'center',
    marginBottom: IS_SMALL ? 16 : 20,
  },
  shareBtn: {
    width: '100%',
    marginBottom: 12,
  },
  bookmark: {
    width: '100%',
  },
  nextBtn: {
    width: '100%',
    minHeight: 58,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default TipsScreen;