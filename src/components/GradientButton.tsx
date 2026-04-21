import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'green' | 'blue' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const GradientButton: React.FC<Props> = ({ title, onPress, variant = 'green', style, textStyle }) => {
  if (variant === 'outline') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.outline, style]}>
        <Text style={[styles.text, { color: colors.borderCyan }, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }

  const gradient =
    variant === 'green'
      ? [colors.gradientGreenStart, colors.gradientGreenEnd]
      : [colors.gradientBlueStart, colors.gradientBlueEnd];

  const txtColor = variant === 'green' ? colors.textDark : colors.textPrimary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.btn}>
        <Text style={[styles.text, { color: txtColor }, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    height: 56,
    paddingHorizontal: 24,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderCyan,
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default GradientButton;