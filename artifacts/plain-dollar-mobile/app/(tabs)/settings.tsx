import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import {
  Body,
  Card,
  Heading,
  Label,
  webBottomInset,
  webTopInset,
} from '@/components/ui';
import { TEXT_SIZES, useTextSize } from '@/context/TextSizeContext';

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { sizeKey, setSizeKey } = useTextSize();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + webTopInset + 16,
          paddingBottom: insets.bottom + webBottomInset + 100,
        },
      ]}
    >
      <View style={{ gap: 6, marginBottom: 8 }}>
        <Heading size={30}>Settings</Heading>
        <Body color={colors.mutedForeground}>
          Make the app comfortable to read.
        </Body>
      </View>

      <Card style={{ gap: 4 }}>
        <Label size={18}>Text size</Label>
        <Body size={15} color={colors.mutedForeground} style={{ marginBottom: 8 }}>
          Applies everywhere in the app, and it's saved for next time.
        </Body>
        {TEXT_SIZES.map((option) => {
          const selected = option.key === sizeKey;
          return (
            <Pressable
              key={option.key}
              testID={`text-size-${option.key}`}
              onPress={() => {
                Haptics.selectionAsync();
                setSizeKey(option.key);
              }}
              style={({ pressed }) => [
                styles.option,
                {
                  borderColor: selected ? colors.primary : colors.border,
                  backgroundColor: selected
                    ? colors.secondary
                    : colors.card,
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <Body
                style={{ fontSize: 18 * option.scale, flex: 1 }}
              >
                {option.label}
              </Body>
              {selected ? (
                <Feather name="check" size={22} color={colors.primary} />
              ) : null}
            </Pressable>
          );
        })}
      </Card>

      <Card style={{ gap: 6 }}>
        <Label size={18}>Preview</Label>
        <Body>
          A good card is the one you'll actually use. The math below every
          review shows you exactly why we picked it.
        </Body>
      </Card>

      <Card style={{ gap: 6 }}>
        <Label size={18}>About</Label>
        <Body size={16} color={colors.mutedForeground}>
          The Plain Dollar reviews cards and products in plain English. We show
          our math, we date our checks, and we never let a commission change a
          rating. This app uses the same reviews as the website.
        </Body>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderRadius: colorsConst.radius,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 56,
    marginTop: 8,
  },
});
