import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type Props = {
  active: boolean;
  onPress: () => void;
  style?: ViewStyle;
  size?: 'small' | 'large';
};

const BookmarkButton: React.FC<Props> = ({ active, onPress, style, size = 'small' }) => {
  const isLarge = size === 'large';

  if (active) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={style}>
        <LinearGradient
          colors={[colors.gradientBlueStart, colors.gradientBlueEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.btn, isLarge && styles.btnLarge]}>
          <Text style={[styles.icon, isLarge && styles.iconLarge]}>🔖</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.outline, isLarge && styles.btnLarge, style]}>
      <Text style={[styles.icon, isLarge && styles.iconLarge, { opacity: 0.6 }]}>🔖</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 52,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLarge: {
    width: '100%',
    height: 54,
    borderRadius: 18,
  },
  outline: {
    width: 52,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderCyan,
    backgroundColor: 'transparent',
  },
  icon: {
    fontSize: 18,
  },
  iconLarge: {
    fontSize: 24,
  },
});

export default BookmarkButton;