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
import { SECTIONS, allCards, allProducts } from '@/lib/data';

export default function HomeScreen() {
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
        <Heading size={32}>The Plain Dollar</Heading>
        <Body color={colors.mutedForeground}>
          Money advice in plain English. No jargon, no pressure.
        </Body>
      </View>

      <Heading size={20} style={{ marginTop: 12 }}>
        Credit cards
      </Heading>
      <NavRow
        testID="nav-cards"
        title="Card reviews"
        subtitle={`${allCards.length} cards, verified and rated`}
        icon="credit-card"
        onPress={() => router.push('/cards')}
      />

      <Heading size={20} style={{ marginTop: 12 }}>
        Products we've reviewed
      </Heading>
      {SECTIONS.map((section) => {
        const count = allProducts.filter(
          (p) => p.section === section.key,
        ).length;
        return (
          <NavRow
            key={section.key}
            testID={`nav-section-${section.key}`}
            title={section.title}
            subtitle={`${section.blurb} · ${count} reviews`}
            icon={
              section.key === 'protect'
                ? 'shield'
                : section.key === 'plan'
                  ? 'clipboard'
                  : section.key === 'save'
                    ? 'trending-up'
                    : 'heart'
            }
            onPress={() => router.push(`/products/${section.key}`)}
          />
        );
      })}

      <Heading size={20} style={{ marginTop: 12 }}>
        Do the math
      </Heading>
      <NavRow
        testID="nav-breakeven"
        title="Annual fee break-even"
        subtitle="Is that annual fee actually worth it?"
        icon="divide-circle"
        onPress={() => router.push('/breakeven')}
      />
      <NavRow
        testID="nav-grocery"
        title="Grocery card math"
        subtitle="Compare cards on your real grocery spend"
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
