import { Dimensions, PixelRatio, Platform } from 'react-native';

const BASE_W = 390;
const BASE_H = 844;

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getScreen = () => {
  const { width, height } = Dimensions.get('window');
  return { width, height };
};

export const scale = (size: number): number => {
  const { width } = getScreen();
  return (width / BASE_W) * size;
};

export const verticalScale = (size: number): number => {
  const { height } = getScreen();
  return (height / BASE_H) * size;
};

export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

export const fontScale = (size: number): number => {
  const n = moderateScale(size, 0.4);
  return Math.round(PixelRatio.roundToNearestPixel(n));
};

export const rs = scale;
export const vs = verticalScale;
export const ms = moderateScale;
export const fs = fontScale;

export const getScreenSize = () => {
  const { width, height } = getScreen();
  return {
    width,
    height,
    isVerySmall: height < 680,
    isSmall: height < 760,
    isMedium: height >= 760 && height < 900,
    isLarge: height >= 900,
  };
};

export const pick = <T,>(
  values: { xs?: T; sm?: T; md?: T; lg?: T },
  fallback: T
): T => {
  const s = getScreenSize();
  if (s.isVerySmall && values.xs !== undefined) return values.xs;
  if (s.isSmall && values.sm !== undefined) return values.sm;
  if (s.isMedium && values.md !== undefined) return values.md;
  if (s.isLarge && values.lg !== undefined) return values.lg;
  return values.md ?? values.sm ?? values.lg ?? values.xs ?? fallback;
};
