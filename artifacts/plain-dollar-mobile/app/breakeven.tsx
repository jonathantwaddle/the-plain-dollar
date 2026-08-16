import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import { KeyboardAwareScrollViewCompat } from '@/components/KeyboardAwareScrollViewCompat';
import { Body, Card, Heading, Label, webBottomInset } from '@/components/ui';
import { useTextSize } from '@/context/TextSizeContext';

function parseNum(text: string): number {
  const n = Number(text.replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function formatCurrency(val: number): string {
  if (!Number.isFinite(val)) return 'Impossible (rate is too low)';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(val);
}

export default function BreakevenScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { scale } = useTextSize();

  const [feeText, setFeeText] = useState('95');
  const [rateText, setRateText] = useState('2');
  const [noFeeRateText, setNoFeeRateText] = useState('1.5');

  const fee = parseNum(feeText);
  const rate = parseNum(rateText);
  const noFeeRate = parseNum(noFeeRateText);

  const basic = rate > 0 ? fee / (rate / 100) : Infinity;
  const incrementalRate = (rate - noFeeRate) / 100;
  const vsNoFee = incrementalRate > 0 ? fee / incrementalRate : Infinity;

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
        Find out exactly how much you need to spend on a card for the annual
        fee to pay for itself.
      </Body>

      <Card style={{ gap: 14 }}>
        <View style={{ gap: 6 }}>
          <Label size={16}>Annual fee ($)</Label>
          <TextInput
            testID="input-fee"
            style={inputStyle}
            keyboardType="decimal-pad"
            value={feeText}
            onChangeText={setFeeText}
            placeholder="95"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Label size={16}>This card's rewards rate (%)</Label>
          <TextInput
            testID="input-rate"
            style={inputStyle}
            keyboardType="decimal-pad"
            value={rateText}
            onChangeText={setRateText}
            placeholder="2"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
        <View style={{ gap: 6 }}>
          <Label size={16}>Optional: your no-fee card's rate (%)</Label>
          <Body size={14} color={colors.mutedForeground}>
            If you already earn rewards for free, compare against it.
          </Body>
          <TextInput
            testID="input-nofee-rate"
            style={inputStyle}
            keyboardType="decimal-pad"
            value={noFeeRateText}
            onChangeText={setNoFeeRateText}
            placeholder="1.5"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>
      </Card>

      <Card style={{ gap: 14, borderColor: colors.primary, borderWidth: 2 }}>
        <Heading size={20}>The math</Heading>
        <View style={{ gap: 4 }}>
          <Body size={15} color={colors.mutedForeground}>
            To offset the fee entirely:
          </Body>
          <Heading size={22} testID="result-basic">
            {Number.isFinite(basic)
              ? `Spend ${formatCurrency(basic)} per year.`
              : 'Impossible — the rate is too low.'}
          </Heading>
        </View>
        {noFeeRate > 0 ? (
          <View
            style={{
              gap: 4,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: 14,
            }}
          >
            <Body size={15} color={colors.mutedForeground}>
              Compared to a {noFeeRate}% no-fee card:
            </Body>
            {incrementalRate > 0 ? (
              <Body size={18} testID="result-vs-nofee">
                You need to spend{' '}
                <Body size={18} style={{ fontFamily: 'Inter_700Bold' }}>
                  {formatCurrency(vsNoFee)}
                </Body>{' '}
                per year to come out ahead.
              </Body>
            ) : (
              <Body size={18} color={colors.destructive} testID="result-vs-nofee">
                This card earns less than your no-fee card. You will never come
                out ahead.
              </Body>
            )}
          </View>
        ) : null}
      </Card>
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
});
