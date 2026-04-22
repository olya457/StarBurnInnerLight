import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MoodEntry } from '../types';
import { colors } from '../theme/colors';
import { MOOD_OPTIONS } from '../data/moodData';
import { getLastNDates, isoDate } from '../utils/date';
import { Radius, FontWeight } from '../theme/spacing';
import { fs } from '../utils/responsive';

interface Props {
  entries: MoodEntry[];
  days?: number;
}

const MoodChart: React.FC<Props> = ({ entries, days = 7 }) => {
  const dates = getLastNDates(days);

  const bars = dates.map(d => {
    const dayEntries = entries.filter(e => e.date === d);
    const avg =
      dayEntries.length > 0
        ? dayEntries.reduce((s, e) => s + e.level, 0) / dayEntries.length
        : 0;
    return { date: d, value: avg, count: dayEntries.length };
  });

  const label = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2);
  };

  const maxHeight = 120;

  return (
    <View style={styles.wrap}>
      <View style={styles.yAxis}>
        {[5, 4, 3, 2, 1].map(lvl => {
          const opt = MOOD_OPTIONS.find(o => o.level === lvl);
          return (
            <View key={lvl} style={styles.yTick}>
              <Text style={styles.tickEmoji}>{opt?.emoji}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.chart}>
        {bars.map((b, i) => {
          const h = (b.value / 5) * maxHeight;
          const bgColor =
            b.value >= 4.5
              ? colors.moodGreat
              : b.value >= 3.5
              ? colors.moodGood
              : b.value >= 2.5
              ? colors.moodOkay
              : b.value >= 1.5
              ? colors.moodLow
              : b.count > 0
              ? colors.moodBad
              : colors.borderSoft;

          return (
            <View key={i} style={styles.barCol}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: h,
                      backgroundColor: bgColor,
                      opacity: b.count > 0 ? 1 : 0.3,
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.dateLabel,
                  { color: b.date === isoDate() ? colors.accentCyan : colors.textTertiary },
                ]}
              >
                {label(b.date)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 170,
  },
  yAxis: {
    justifyContent: 'space-between',
    height: 120,
    marginRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
  },
  yTick: {
    height: 22,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  tickEmoji: {
    fontSize: 14,
    opacity: 0.5,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  barTrack: {
    width: '100%',
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: '100%',
    borderRadius: Radius.sm,
    minHeight: 4,
  },
  dateLabel: {
    fontSize: fs(10),
    fontWeight: FontWeight.semibold as any,
  },
});

export default MoodChart;
