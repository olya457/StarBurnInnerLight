import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  title: string;
  style?: TextStyle;
  small?: boolean;
};

const ScreenTitle: React.FC<Props> = ({ title, style, small }) => {
  return <Text style={[styles.title, small && styles.small, style]}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: 20,
    marginTop: 10,
  },
  small: {
    fontSize: 20,
    letterSpacing: 0.5,
  },
});

export default ScreenTitle;