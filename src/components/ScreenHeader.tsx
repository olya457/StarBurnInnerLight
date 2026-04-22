import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';

interface Props {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

const ScreenHeader: React.FC<Props> = ({
  title,
  subtitle,
  onBack,
  rightIcon,
  onRightPress,
}) => {
  return (
    <View style={styles.row}>
      {onBack ? (
        <TouchableOpacity onPress={onBack} activeOpacity={0.7} style={styles.circleBtn}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightIcon && onRightPress ? (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.75} style={styles.circleBtn}>
          <Text style={styles.rightIcon}>{rightIcon}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: ms(8),
    gap: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: fs(20),
    fontWeight: FontWeight.extrabold as any,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textTertiary,
    fontSize: fs(12),
    marginTop: 2,
    textAlign: 'center',
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: Radius.pill,
    backgroundColor: colors.cardBg,
    borderWidth: 1.5,
    borderColor: colors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 38,
    height: 38,
  },
  back: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: FontWeight.bold as any,
    marginTop: -2,
  },
  rightIcon: {
    fontSize: 16,
  },
});

export default ScreenHeader;
