import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import Card from '../components/Card';
import { BREATHING_TECHNIQUES } from '../data/breathingData';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { RootNavProp } from '../types/navigation';

const BreathingScreen = () => {
  const navigation = useNavigation<RootNavProp>();

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenHeader
          title="Breathe"
          subtitle="Three techniques, no equipment"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ gap: 14, paddingBottom: 20 }}
        >
          <Card accent="cyan">
            <Text style={styles.label}>WHY BREATHING?</Text>
            <Text style={styles.body}>
              Slow, intentional breathing engages the parasympathetic nervous system —
              it is the body's built-in brake pedal. A few minutes can shift your state
              without changing anything around you.
            </Text>
          </Card>

          {BREATHING_TECHNIQUES.map(t => (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('BreathingSession', { techniqueId: t.id })}
              style={styles.techCard}
            >
              <LinearGradient
                colors={[t.color + '33', t.color + '11']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.techTopRow}>
                <View style={[styles.techDot, { backgroundColor: t.color }]} />
                <Text style={[styles.techName, { color: colors.textPrimary }]}>{t.name}</Text>
              </View>
              <Text style={styles.techDesc}>{t.description}</Text>
              <View style={styles.techMeta}>
                <View style={styles.techStep}>
                  <Text style={styles.techStepNum}>{t.inhale}</Text>
                  <Text style={styles.techStepLbl}>in</Text>
                </View>
                {t.hold1 > 0 ? (
                  <>
                    <Text style={styles.sep}>·</Text>
                    <View style={styles.techStep}>
                      <Text style={styles.techStepNum}>{t.hold1}</Text>
                      <Text style={styles.techStepLbl}>hold</Text>
                    </View>
                  </>
                ) : null}
                <Text style={styles.sep}>·</Text>
                <View style={styles.techStep}>
                  <Text style={styles.techStepNum}>{t.exhale}</Text>
                  <Text style={styles.techStepLbl}>out</Text>
                </View>
                {t.hold2 > 0 ? (
                  <>
                    <Text style={styles.sep}>·</Text>
                    <View style={styles.techStep}>
                      <Text style={styles.techStepNum}>{t.hold2}</Text>
                      <Text style={styles.techStepLbl}>hold</Text>
                    </View>
                  </>
                ) : null}
                <View style={{ flex: 1 }} />
                <View style={[styles.cyclesBadge, { borderColor: t.color }]}>
                  <Text style={[styles.cyclesText, { color: t.color }]}>
                    {t.cycles} cycles
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.accentCyan,
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  body: {
    color: colors.textSecondary,
    fontSize: fs(13),
    lineHeight: fs(20),
  },
  techCard: {
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    overflow: 'hidden',
    padding: ms(16),
    gap: 8,
  },
  techTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  techDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  techName: {
    fontSize: fs(16),
    fontWeight: FontWeight.extrabold as any,
  },
  techDesc: {
    color: colors.textSecondary,
    fontSize: fs(13),
    lineHeight: fs(19),
  },
  techMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  techStep: {
    alignItems: 'center',
  },
  techStepNum: {
    color: colors.textPrimary,
    fontSize: fs(16),
    fontWeight: FontWeight.extrabold as any,
  },
  techStepLbl: {
    color: colors.textTertiary,
    fontSize: fs(10),
    fontWeight: FontWeight.semibold as any,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sep: {
    color: colors.textTertiary,
    fontSize: 16,
  },
  cyclesBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  cyclesText: {
    fontSize: fs(11),
    fontWeight: FontWeight.bold as any,
  },
});

export default BreathingScreen;
