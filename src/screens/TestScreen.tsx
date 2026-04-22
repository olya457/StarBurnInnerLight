import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundWrapper from '../components/BackgroundWrapper';
import SafePadding from '../components/SafePadding';
import ScreenTitle from '../components/ScreenTitle';
import ShareButton from '../components/ShareButton';
import { testQuestions, calculateResult, getResultText } from '../data/testQuestions';
import { addTestResult } from '../storage/testHistoryStore';
import { recordActivity } from '../storage/streakStore';
import { todayIso } from '../utils/date';
import { colors } from '../theme/colors';

const TestScreen = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<('A' | 'B' | 'C')[]>([]);
  const [done, setDone] = useState(false);

  const onAnswer = async (key: 'A' | 'B' | 'C') => {
    const next = [...answers, key];
    setAnswers(next);
    if (step + 1 < testQuestions.length) {
      setStep(step + 1);
    } else {
      const percent = calculateResult(next);
      await addTestResult({
        id: Date.now().toString(),
        percent,
        createdAt: Date.now(),
        date: todayIso(),
      });
      await recordActivity();
      setDone(true);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setDone(false);
  };

  if (done) {
    const percent = calculateResult(answers);
    const text = getResultText(percent);

    return (
      <BackgroundWrapper>
        <SafePadding withTabSpace>
          <ScreenTitle title={'Test: "Level of inner clarity\nand motivation"'} small />

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>Your result: {percent}%</Text>
              <Text style={styles.resultText}>{text}</Text>

              <TouchableOpacity onPress={restart} activeOpacity={0.85} style={styles.actionWrap}>
                <LinearGradient
                  colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.actionText}>Restart test</Text>
              </TouchableOpacity>

              <View style={styles.shareWrap}>
                <ShareButton message={`My result: ${percent}%\n\n${text}`} />
              </View>
            </View>
          </ScrollView>
        </SafePadding>
      </BackgroundWrapper>
    );
  }

  const q = testQuestions[step];

  return (
    <BackgroundWrapper>
      <SafePadding withTabSpace>
        <ScreenTitle title={'Test: "Level of inner clarity\nand motivation"'} small />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.questionCard}>
            <Text style={styles.qNum}>QUESTION {q.id}:</Text>
            <Text style={styles.qText}>{q.question}</Text>
          </View>

          {q.options.map(opt => (
            <TouchableOpacity
              key={opt.key}
              activeOpacity={0.85}
              onPress={() => onAnswer(opt.key)}
              style={styles.optBtn}>
              <LinearGradient
                colors={[colors.gradientGreenStart, colors.gradientGreenEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.optText}>
                {opt.key}) {opt.text}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafePadding>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: colors.borderRed,
    alignItems: 'center',
  },
  qNum: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  qText: {
    color: colors.textPrimary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  optBtn: {
    marginBottom: 14,
    width: '100%',
    minHeight: 70,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  optText: {
    color: colors.textDark,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  resultCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1.5,
    borderColor: colors.borderYellow,
    alignItems: 'center',
  },
  resultTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
    textAlign: 'center',
  },
  resultText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 22,
  },
  actionWrap: {
    width: '100%',
    minHeight: 58,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textDark,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  shareWrap: {
    width: '100%',
  },
});

export default TestScreen;