import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { Radius, FontWeight } from '../theme/spacing';
import { fs, ms } from '../utils/responsive';

interface Props {
  label: string;
  emoji?: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  accentColor?: string;
}

const Chip: React.FC<Props> = ({ label, emoji, selected, onPress, style, accentColor }) => {
  const active = accentColor ?? colors.borderCyan;
  const bg = selected ? active : 'transparent';
  const borderColor = selected ? active : colors.borderSoft;
  const textColor = selected ? colors.textDark : colors.textPrimary;

  const base = [
    styles.chip,
    {
      backgroundColor: bg,
      borderColor,
      borderRadius: Radius.pill,
      paddingHorizontal: ms(14),
      paddingVertical: ms(8),
    },
    style,
  ];

  const content = (
    <>
      {emoji ? (
        <Text
          style={{
            fontSize: fs(13),
            lineHeight: fs(18),
            marginRight: 6,
          }}
        >
          {emoji}
        </Text>
      ) : null}
      <Text
        style={[
          styles.label,
          { color: textColor, fontSize: fs(13), lineHeight: fs(18) },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={base}>
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={base}>{content}</View>;
};

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: FontWeight.semibold as any,
  },
});

export default Chip;
