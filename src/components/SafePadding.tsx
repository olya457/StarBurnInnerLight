import React from 'react';
import { Platform, View, ViewStyle, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  withTabSpace?: boolean;
};

const SafePadding: React.FC<Props> = ({ children, style, withTabSpace }) => {
  const insets = useSafeAreaInsets();
  const topExtra = Platform.OS === 'android' ? 20 : 0;
  const tabHeight = 70;
  const tabOffset = Platform.OS === 'android' ? 30 : 20;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + topExtra,
          paddingBottom: withTabSpace
            ? insets.bottom + tabOffset + tabHeight + 10
            : insets.bottom + (Platform.OS === 'android' ? 20 : 0),
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default SafePadding;