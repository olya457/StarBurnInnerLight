import React from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const BackgroundWrapper: React.FC<Props> = ({ children, style }) => {
  return (
    <ImageBackground
      source={require('../assets/bg_main.png')}
      style={[styles.bg, style]}
      resizeMode="cover">
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.bgDark,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
});

export default BackgroundWrapper;