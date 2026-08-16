import React from 'react';
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import { useTextSize } from '@/context/TextSizeContext';

// ---- Typography -----------------------------------------------------------

interface TypeProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  size?: number;
  color?: string;
  numberOfLines?: number;
  testID?: string;
}

/** Serif heading — Lora, navy by default. */
export function Heading({ children, style, size = 26, color, testID }: TypeProps) {
  const colors = useColors();
  const { scale } = useTextSize();
  return (
    <Text
      testID={testID}
      style={[
        {
          fontFamily: 'Lora_600SemiBold',
          fontSize: size * scale,
          lineHeight: size * scale * 1.25,
          color: color ?? colors.primary,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** Body text — Inter, 18px base per The Plain Dollar's accessibility rules. */
export function Body({
  children,
  style,
  size = 18,
  color,
  numberOfLines,
  testID,
}: TypeProps) {
  const colors = useColors();
  const { scale } = useTextSize();
  return (
    <Text
      testID={testID}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: 'Inter_400Regular',
          fontSize: size * scale,
          lineHeight: size * scale * 1.45,
          color: color ?? colors.foreground,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

/** Semibold Inter label. */
export function Label({ children, style, size = 16, color }: TypeProps) {
  const colors = useColors();
  const { scale } = useTextSize();
  return (
    <Text
      style={[
        {
          fontFamily: 'Inter_600SemiBold',
          fontSize: size * scale,
          lineHeight: size * scale * 1.35,
          color: color ?? colors.foreground,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

// ---- Surfaces --------------------------------------------------------------

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const colors = useColors();
  return (
    <View
      style={[
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: colorsConst.radius,
          padding: 16,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

/** Big tap-target row used for navigation lists. */
export function NavRow({
  title,
  subtitle,
  icon,
  onPress,
  testID,
}: {
  title: string;
  subtitle?: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  onPress: () => void;
  testID?: string;
}) {
  const colors = useColors();
  return (
    <Pressable
      testID={testID}
      onPress={() => {
        Haptics.selectionAsync();
        onPress();
      }}
      style={({ pressed }) => [
        styles.navRow,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View
        style={[styles.navIconWrap, { backgroundColor: colors.secondary }]}
      >
        <Feather name={icon} size={22} color={colors.primary} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Label size={18}>{title}</Label>
        {subtitle ? (
          <Body size={15} color={colors.mutedForeground}>
            {subtitle}
          </Body>
        ) : null}
      </View>
      <Feather name="chevron-right" size={22} color={colors.mutedForeground} />
    </Pressable>
  );
}

export function RatingBadge({ rating }: { rating: number }) {
  const colors = useColors();
  const { scale } = useTextSize();
  return (
    <View style={[styles.ratingBadge, { backgroundColor: colors.accent }]}>
      <Feather name="star" size={13 * scale} color={colors.accentForeground} />
      <Text
        style={{
          fontFamily: 'Inter_700Bold',
          fontSize: 14 * scale,
          color: colors.accentForeground,
        }}
      >
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}

// ---- Layout helpers ---------------------------------------------------------

/** Extra web-only insets per platform guidance. */
export const webTopInset = Platform.OS === 'web' ? 67 : 0;
export const webBottomInset = Platform.OS === 'web' ? 34 : 0;

const styles = StyleSheet.create({
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderRadius: colorsConst.radius,
    padding: 16,
    minHeight: 68,
  },
  navIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
});
