import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CrystalScreen from '../screens/CrystalScreen';
import StoriesScreen from '../screens/StoriesScreen';
import WiseScreen from '../screens/WiseScreen';
import TestScreen from '../screens/TestScreen';
import TipsScreen from '../screens/TipsScreen';
import SavedScreen from '../screens/SavedScreen';
import { colors } from '../theme/colors';

export type TabParamList = {
  Crystal: undefined;
  Stories: undefined;
  Wise: undefined;
  Test: undefined;
  Tips: undefined;
  Saved: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_EMOJIS: Record<keyof TabParamList, string> = {
  Crystal: '🔮',
  Stories: '📖',
  Wise: '💡',
  Test: '📝',
  Tips: '✨',
  Saved: '🔖',
};

const TAB_ORDER: (keyof TabParamList)[] = ['Crystal', 'Stories', 'Wise', 'Test', 'Tips', 'Saved'];

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomOffset = Platform.OS === 'android' ? 30 : 20;

  return (
    <View
      style={[
        styles.wrapper,
        { bottom: insets.bottom + bottomOffset },
      ]}>
      <View style={styles.bar}>
        {state.routes.map((route, idx) => {
          const focused = state.index === idx;
          const emoji = TAB_EMOJIS[route.name as keyof TabParamList];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              activeOpacity={0.8}
              style={styles.item}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Text style={styles.emoji}>{emoji}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Crystal" component={CrystalScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Wise" component={WiseScreen} />
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="Tips" component={TipsScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 20,
    right: 20,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.tabBarBg,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.tabBorder,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.accentYellow,
  },
  emoji: {
    fontSize: 22,
  },
});

export default TabNavigator;