import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Body, Card, Heading, Label, webBottomInset } from '@/components/ui';
import { useTextSize } from '@/context/TextSizeContext';
import { allCards } from '@/lib/data';
import { GROCERY_RULES, computeGroceryResults } from '@/lib/groceryMath';

function parseNum(text: string): number {
  const n = Number(text.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

export default function GroceryScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { scale } = useTextSize();

  const [groceryText, setGroceryText] = useState('500');
  const [otherText, setOtherText] = useState('1000');

  const grocerySpend = parseNum(groceryText);
  const otherSpend = parseNum(otherText);

  // Only compare cards whose grocery reward rules we have verified.
  const cards = useMemo(
    () => allCards.filter((c) => GROCERY_RULES[c.slug] !== undefined),
    [],
  );

  const results = useMemo(
    () => computeGroceryResults(cards, grocerySpend, otherSpend),
    [cards, grocerySpend, otherSpend],
  );

  const inputStyle = [
    styles.input,
    {
      borderColor: colors.input,
      backgroundColor: colors.card,
      color: colors.foreground,
      fontSize: 20 * scale,
    },
  ];

  return (
    <KeyboardAwareScrollViewCompat
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{
        padding: 20,
        gap: 16,
        paddingBottom: insets.bottom + webBottomInset + 40,
      }}
      bottomOffset={40}
      keyboardShouldPersistTaps="handled"
    >
      <Body color={colors.mutedForeground}>
        Compare the top grocery cards on your real spending. We deduct the
        annual fee so you see net earnings per year.
      </Body>

      <Card style={{ gap: 14 }}>
        <View style={{ gap: 6 }}>
          <Label size={16}>Monthly grocery spend ($)</Label>
          <TextInput
            testID="input-grocery"
            style={inputStyle}
            keyboardType="decimal-pad"
            value={groceryText}
            onChangeText={setGroceryText}
            placeholder="500"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Label size={16}>Monthly other spend ($)</Label>
          <TextInput
            testID="input-other"
            style={inputStyle}
            keyboardType="decimal-pad"
            value={otherText}
            onChangeText={setOtherText}
            placeholder="1000"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
      </Card>

      <Heading size={20}>Net value per year</Heading>
      {results.map((r, i) => (
        <Card
          key={r.card.slug}
          style={[
            { gap: 6 },
            i === 0 ? { borderColor: colors.success, borderWidth: 2 } : null,
          ]}
        >
          <View style={styles.resultHeader}>
            <Label size={17} style={{ flex: 1 }}>
              {r.card.short_name}
            </Label>
            {i === 0 ? (
              <View
                style={[styles.winnerChip, { backgroundColor: colors.success }]}
              >
                <Feather name="award" size={14} color="#ffffff" />
                <Label size={13} color="#ffffff">
                  Winner
                </Label>
              </View>
            ) : null}
          </View>
          <View style={styles.resultRow}>
            <Body size={15} color={colors.mutedForeground}>
              Annual rewards
            </Body>
            <Body size={16}>${r.rewards.toFixed(0)}</Body>
          </View>
          <View style={styles.resultRow}>
            <Body size={15} color={colors.mutedForeground}>
              Annual fee
            </Body>
            <Body size={16}>-${r.fee}</Body>
          </View>
          <View
            style={[
              styles.resultRow,
              {
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingTop: 6,
              },
            ]}
          >
            <Label size={16}>Net value</Label>
            <Label
              size={18}
              color={r.totalValue >= 0 ? colors.success : colors.destructive}
            >
              ${r.totalValue.toFixed(0)}
            </Label>
          </View>
        </Card>
      ))}
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: colorsConst.radius,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    fontFamily: 'Inter_500Medium',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  winnerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
