import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { FontWeight } from '../theme/spacing';
import { fs } from '../utils/responsive';
import { RootNavProp } from '../types/navigation';

const AboutScreen = () => {
  const navigation = useNavigation<RootNavProp>();

  return (
    <BackgroundWrapper>
      <SafePadding>
        <ScreenHeader title="About StarBurn" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 30 }}
        >
          <Card accent="yellow">
            <Text style={styles.h1}>A quiet space for focus</Text>
            <Text style={styles.body}>
              StarBurn is built around small, honest moments: one mood log, one short
              reflection, one slow breath. No noise, no endless feeds, nothing uploaded
              from this device.
            </Text>
          </Card>

          <Card accent="cyan">
            <Text style={styles.label}>DISCLAIMER</Text>
            <Text style={styles.body}>
              StarBurn is designed for personal reflection and general self-care. It is
              not a medical product, not therapy, and not a substitute for professional
              advice. If you are experiencing a mental health crisis or feel overwhelmed,
              please contact a qualified professional or a local support service.
            </Text>
          </Card>

          <Card accent="cyan">
            <Text style={styles.label}>PRIVACY</Text>
            <Text style={styles.body}>
              All entries you create in StarBurn — moods, reflections, test results,
              saved items and your favorite crystal — are stored locally on this device
              only. Nothing leaves the device. We do not collect analytics, we do not
              use tracking SDKs, and there are no accounts. Clearing app data or
              uninstalling the app deletes everything.
            </Text>
          </Card>

          <Card accent="soft">
            <Text style={styles.label}>HOW TO USE IT</Text>
            <View style={{ gap: 6 }}>
              <Text style={styles.body}>
                <Text style={styles.bold}>Daily:</Text> open Home, pick one mood, read
                one phrase, take one breath.
              </Text>
              <Text style={styles.body}>
                <Text style={styles.bold}>Weekly:</Text> write a short reflection in
                Journal and look at Insights.
              </Text>
              <Text style={styles.body}>
                <Text style={styles.bold}>Anytime:</Text> save what resonates and revisit
                it from Saved.
              </Text>
            </View>
          </Card>

          <Card accent="soft">
            <Text style={styles.label}>CREDITS</Text>
            <Text style={styles.body}>
              All text content and crystal metaphors are original, written for this app.
              Illustrations are part of the StarBurn visual set. Version 1.0.
            </Text>
          </Card>
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  h1: {
    color: colors.textPrimary,
    fontSize: fs(18),
    fontWeight: FontWeight.extrabold as any,
    marginBottom: 8,
  },
  label: {
    color: colors.textTertiary,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  body: {
    color: colors.textSecondary,
    fontSize: fs(13),
    lineHeight: fs(20),
  },
  bold: {
    color: colors.textPrimary,
    fontWeight: FontWeight.bold as any,
  },
});

export default AboutScreen;
