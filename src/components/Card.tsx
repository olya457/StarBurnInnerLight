import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { Radius } from '../theme/spacing';
import { ms } from '../utils/responsive';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  padded?: boolean;
  accent?: 'red' | 'yellow' | 'cyan' | 'soft';
}

const Card: React.FC<Props> = ({ children, style, onPress, padded = true, accent = 'red' }) => {
  const borderColor =
    accent === 'yellow'
      ? colors.borderYellow
      : accent === 'cyan'
      ? colors.borderCyan
      : accent === 'soft'
      ? colors.borderSoft
      : colors.borderRed;

  const base = [
    styles.card,
    {
      borderColor,
      padding: padded ? ms(14) : 0,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={base}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={base}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
  },
});

export default Card;
