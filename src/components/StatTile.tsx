import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';

interface Props {
  label: string;
  value: string | number;
  emoji?: string;
  accentColor?: string;
}

const StatTile: React.FC<Props> = ({ label, value, emoji, accentColor }) => {
  return (
    <View style={styles.tile}>
      {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
      <Text
        style={[
          styles.value,
          { color: accentColor ?? colors.textPrimary },
        ]}
      >
        {value}
      </Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    borderRadius: Radius.lg,
    padding: ms(14),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  emoji: {
    fontSize: fs(22),
  },
  value: {
    fontSize: fs(22),
    fontWeight: FontWeight.extrabold as any,
    textAlign: 'center',
  },
  label: {
    color: colors.textTertiary,
    fontSize: fs(11),
    fontWeight: FontWeight.semibold as any,
    textAlign: 'center',
  },
});

export default StatTile;
