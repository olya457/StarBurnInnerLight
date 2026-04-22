import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenHeader from '../components/ScreenHeader';
import BreathingCircle from '../components/BreathingCircle';
import { getBreathingTechnique } from '../data/breathingData';
import { recordActivity } from '../storage/streakStore';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';
import { RootStackParamList, RootNavProp } from '../types/navigation';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

const BreathingSessionScreen = () => {
  const navigation = useNavigation<RootNavProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'BreathingSession'>>();
  const technique = getBreathingTechnique(route.params.techniqueId);

  const [phase, setPhase] = useState<Phase>('idle');
  const [seconds, setSeconds] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases = useMemo<Array<{ phase: Phase; seconds: number }>>(() => {
    if (!technique) return [];
    const list: Array<{ phase: Phase; seconds: number }> = [];
    if (technique.inhale > 0) list.push({ phase: 'inhale', seconds: technique.inhale });
    if (technique.hold1 > 0) list.push({ phase: 'hold1', seconds: technique.hold1 });
    if (technique.exhale > 0) list.push({ phase: 'exhale', seconds: technique.exhale });
    if (technique.hold2 > 0) list.push({ phase: 'hold2', seconds: technique.hold2 });
    return list;
  }, [technique]);

  useEffect(() => {
    if (!running || !technique || phases.length === 0) return;

    let phaseIdx = 0;
    let currentSec = phases[0].seconds;
    let currentCycle = 0;

    setPhase(phases[0].phase);
    setSeconds(currentSec);
    setCycle(0);

    timerRef.current = setInterval(() => {
      currentSec -= 1;

      if (currentSec <= 0) {
        phaseIdx += 1;
        if (phaseIdx >= phases.length) {
          phaseIdx = 0;
          currentCycle += 1;
          if (currentCycle >= technique.cycles) {
            if (timerRef.current) clearInterval(timerRef.current);
            setRunning(false);
            setPhase('idle');
            setSeconds(0);
            setCompleted(true);
            recordActivity();
            return;
          }
          setCycle(currentCycle);
        }
        currentSec = phases[phaseIdx].seconds;
        setPhase(phases[phaseIdx].phase);
      }

      setSeconds(currentSec);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running, technique, phases]);

  if (!technique) {
    return (
      <BackgroundWrapper>
        <SafePadding withTabSpace>
          <ScreenHeader title="Not found" onBack={() => navigation.goBack()} />
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  const handleStart = () => {
    setCompleted(false);
    setCycle(0);
    setRunning(true);
  };

  const handleStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
    setPhase('idle');
    setSeconds(0);
  };

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenHeader
          title={technique.name}
          subtitle={`${technique.cycles} cycles`}
          onBack={() => navigation.goBack()}
        />

        <View style={styles.center}>
          <View style={styles.circleWrap}>
            <BreathingCircle
              phase={phase}
              seconds={seconds}
              color={technique.color}
              size={260}
            />
          </View>

          {running ? (
            <Text style={styles.cycleLabel}>
              Cycle {cycle + 1} / {technique.cycles}
            </Text>
          ) : completed ? (
            <Text style={[styles.cycleLabel, { color: colors.accentGreen }]}>
              Session complete ✓
            </Text>
          ) : (
            <Text style={styles.description}>{technique.description}</Text>
          )}
        </View>

        <View style={styles.actions}>
          {running ? (
            <TouchableOpacity style={styles.stopBtn} onPress={handleStop} activeOpacity={0.85}>
              <Text style={styles.stopText}>Stop</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.startBtn, { backgroundColor: technique.color }]}
              onPress={handleStart}
              activeOpacity={0.9}
            >
              <Text style={styles.startText}>
                {completed ? 'Start again' : 'Begin'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrap: {
    marginBottom: 30,
  },
  cycleLabel: {
    color: colors.textSecondary,
    fontSize: fs(14),
    fontWeight: FontWeight.bold as any,
    letterSpacing: 0.5,
    marginTop: 20,
  },
  description: {
    color: colors.textTertiary,
    fontSize: fs(13),
    textAlign: 'center',
    lineHeight: fs(20),
    marginTop: 20,
    paddingHorizontal: 16,
  },
  actions: {
    marginBottom: 10,
  },
  startBtn: {
    paddingVertical: ms(16),
    borderRadius: Radius.pill,
    alignItems: 'center',
  },
  startText: {
    color: colors.textDark,
    fontSize: fs(15),
    fontWeight: FontWeight.extrabold as any,
    letterSpacing: 1,
  },
  stopBtn: {
    paddingVertical: ms(16),
    borderRadius: Radius.pill,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.borderRed,
    backgroundColor: colors.cardBg,
  },
  stopText: {
    color: colors.borderRed,
    fontSize: fs(15),
    fontWeight: FontWeight.extrabold as any,
    letterSpacing: 1,
  },
});

export default BreathingSessionScreen;
