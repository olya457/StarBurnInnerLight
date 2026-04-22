import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  Loader: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  Mood: undefined;
  Journal: undefined;
  JournalEntry: { id?: string; prompt?: string };
  Breathing: undefined;
  BreathingSession: { techniqueId: string };
  Stats: undefined;
  Settings: undefined;
  About: undefined;
  Test: undefined;
  Tips: undefined;
};

export type TabParamList = {
  Home: undefined;
  Crystal: undefined;
  Stories: undefined;
  Wisdom: undefined;
  Saved: undefined;
};

export type RootNavProp = NativeStackNavigationProp<RootStackParamList>;
export type TabNavProp = BottomTabNavigationProp<TabParamList>;
export type AppNavProp = CompositeNavigationProp<TabNavProp, RootNavProp>;
