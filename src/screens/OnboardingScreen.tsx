import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import { RootStackParamList } from '../navigation/RootNavigator';
import { colors } from '../theme/colors';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

type Slide = {
  image: any;
  title: string;
  text: string;
  btn: string;
};

const slides: Slide[] = [
  {
    image: require('../assets/onboard_1.png'),
    title: 'Your Focus Point',
    text: 'There is no noise or clutter here.\nOnly thoughts that help you gather and move on.\nChoose your crystal and start simple.',
    btn: 'CONTINUE',
  },
  {
    image: require('../assets/onboard_2.png'),
    title: 'Choose your crystal',
    text: 'Each crystal has its own mood.\nEnergy, clarity, balance or peace.\nOne choice — and you get phrases that are right for you right now.',
    btn: 'OKAY',
  },
  {
    image: require('../assets/onboard_3.png'),
    title: 'Understand your state',
    text: 'Take a short test and see how focused and resourceful you are right now.\nNo grades — just an honest result.',
    btn: 'NEXT',
  },
  {
    image: require('../assets/onboard_4.png'),
    title: 'Move at your own pace',
    text: 'Read stories, find thoughts, save what is important.\nCome back when you need to.\nEverything here works for you.',
    btn: 'START',
  },
];

const { height: SCREEN_H } = Dimensions.get('window');
const IS_SMALL = SCREEN_H < 700;

const OnboardingScreen = () => {
  const navigation = useNavigation<Nav>();
  const [index, setIndex] = useState(0);

  const onPress = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Tabs' }] });
    }
  };

  const slide = slides[index];

  return (
    <BackgroundWrapper>
      <SafePadding>
        <View style={styles.imageBox}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.text}>{slide.text}</Text>

          <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.btnTouchable}>
            <LinearGradient
              colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
            <Text style={styles.btnText}>{slide.btn}</Text>
          </TouchableOpacity>
        </View>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: IS_SMALL ? 10 : 20,
  },
  image: {
    width: '75%',
    height: '100%',
    maxHeight: IS_SMALL ? 200 : 280,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: IS_SMALL ? 16 : 22,
    borderWidth: 1.5,
    borderColor: colors.borderYellow,
    marginBottom: 10,
  },
  title: {
    fontSize: IS_SMALL ? 19 : 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: IS_SMALL ? 8 : 12,
  },
  text: {
    fontSize: IS_SMALL ? 13 : 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: IS_SMALL ? 18 : 20,
    marginBottom: IS_SMALL ? 16 : 20,
  },
  btnTouchable: {
    width: '100%',
    minHeight: 58,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default OnboardingScreen;