import React from 'react';
import { Share, StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type Props = {
  message: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  compact?: boolean;
};

const ShareButton: React.FC<Props> = ({ message, style, textStyle, compact }) => {
  const onShare = async () => {
    try {
      await Share.share({ message });
    } catch {}
  };

  return (
    <TouchableOpacity onPress={onShare} activeOpacity={0.85} style={style}>
      <LinearGradient
        colors={[colors.gradientBlueStart, colors.gradientBlueEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.btn, compact && styles.btnCompact]}>
        <Text style={[styles.text, compact && styles.textCompact, textStyle]}>Share</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '100%',
    height: 54,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCompact: {
    width: '100%',
    height: 42,
    borderRadius: 14,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textAlign: 'center',
    includeFontPadding: false,
    lineHeight: 20,
  },
  textCompact: {
    fontSize: 14,
    lineHeight: 18,
  },
});

export default ShareButton;