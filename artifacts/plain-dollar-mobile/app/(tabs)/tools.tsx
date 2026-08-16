import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import {
  Body,
  Heading,
  NavRow,
  webBottomInset,
  webTopInset,
} from '@/components/ui';

export default function ToolsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
        <Heading size={30}>Tools</Heading>
        <Body color={colors.mutedForeground}>
          Simple calculators. Type your numbers, see the honest answer.
        </Body>
      </View>

      <NavRow
        testID="tool-breakeven"
        title="Annual fee break-even"
        subtitle="How much you'd need to spend for a fee card to pay for itself"
        icon="divide-circle"
        onPress={() => router.push('/breakeven')}
      />
      <NavRow
        testID="tool-grocery"
        title="Grocery card math"
        subtitle="Net yearly value of top grocery cards, fee already deducted"
        icon="shopping-cart"
        onPress={() => router.push('/grocery')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 12,
  },
});
