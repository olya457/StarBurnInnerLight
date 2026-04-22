import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoaderScreen from '../screens/LoaderScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import TabNavigator from './TabNavigator';
import MoodDiaryScreen from '../screens/MoodDiaryScreen';
import JournalScreen from '../screens/JournalScreen';
import BreathingScreen from '../screens/BreathingScreen';
import BreathingSessionScreen from '../screens/BreathingSessionScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import TestScreen from '../screens/TestScreen';
import TipsScreen from '../screens/TipsScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loader"
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Loader" component={LoaderScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="Mood"
        component={MoodDiaryScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Journal"
        component={JournalScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Breathing"
        component={BreathingScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="BreathingSession"
        component={BreathingSessionScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Stats"
        component={StatsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Test"
        component={TestScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Tips"
        component={TipsScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
