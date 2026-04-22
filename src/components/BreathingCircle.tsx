import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fs } from '../utils/responsive';
import { FontWeight } from '../theme/spacing';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'idle';

interface Props {
  phase: Phase;
  seconds: number;
  color: string;
  size?: number;
}

const LABELS: Record<Phase, string> = {
  inhale: 'Inhale',
  hold1: 'Hold',
  exhale: 'Exhale',
  hold2: 'Hold',
  idle: 'Ready',
};

const BreathingCircle: React.FC<Props> = ({ phase, seconds, color, size = 240 }) => {
  const scale = useRef(new Animated.Value(0.7)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (phase === 'idle') {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.7,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    if (phase === 'inhale') {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (phase === 'exhale') {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.7,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: seconds * 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase, seconds, scale, opacity]);

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            opacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.25],
            }),
            transform: [{ scale }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.innerCircle,
          {
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: (size * 0.55) / 2,
            borderColor: color,
            transform: [{ scale }],
          },
        ]}
      />
      <View style={styles.textWrap}>
        <Text style={[styles.phase, { color }]}>{LABELS[phase]}</Text>
        {phase !== 'idle' ? (
          <Text style={styles.seconds}>{seconds}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
  innerCircle: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  textWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phase: {
    fontSize: fs(22),
    fontWeight: FontWeight.extrabold as any,
    letterSpacing: 2,
  },
  seconds: {
    color: colors.textSecondary,
    fontSize: fs(40),
    fontWeight: FontWeight.bold as any,
    marginTop: 4,
  },
});

export default BreathingCircle;
