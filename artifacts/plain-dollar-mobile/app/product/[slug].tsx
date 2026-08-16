import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import {
  Body,
  Card,
  Heading,
  Label,
  RatingBadge,
  webBottomInset,
} from '@/components/ui';
import { productsBySlug } from '@/lib/data';

export default function ProductDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const product = slug ? productsBySlug[slug] : undefined;

  if (!product) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
        <Body color={colors.mutedForeground}>
          We couldn't find that product.
        </Body>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          padding: 20,
          gap: 16,
          paddingBottom: insets.bottom + webBottomInset + 40,
        }}
      >
        <View style={{ gap: 8 }}>
          <Heading size={26}>{product.name}</Heading>
          <Body size={15} color={colors.mutedForeground}>
            {product.brand}
            {product.hands_on ? ' · Hands-on tested' : ''}
          </Body>
          <RatingBadge rating={product.rating} />
          <Body size={16}>{product.rating_reason}</Body>
        </View>

        <Card style={{ gap: 4 }}>
          <Label size={16} color={colors.primary}>
            Price
          </Label>
          <Heading size={20}>{product.price.headline}</Heading>
          {product.price.upfront ? (
            <Body size={15} color={colors.mutedForeground}>
              Upfront: {product.price.upfront}
            </Body>
          ) : null}
          {product.price.note ? (
            <Body size={15} color={colors.mutedForeground}>
              {product.price.note}
            </Body>
          ) : null}
        </Card>

        <Card style={{ gap: 12 }}>
          <Label size={18}>Key facts</Label>
          {product.key_facts.map((fact, i) => (
            <View key={i} style={styles.factRow}>
              <Body size={15} color={colors.mutedForeground} style={{ flex: 1 }}>
                {fact.label}
              </Body>
              <Body size={16} style={{ flex: 2, textAlign: 'right' }}>
                {fact.value}
              </Body>
            </View>
          ))}
        </Card>

        <Card style={{ gap: 8 }}>
          <Label size={18}>What we like</Label>
          {product.pros.map((pro, i) => (
            <View key={i} style={styles.bulletRow}>
              <Feather name="check" size={18} color={colors.success} />
              <Body size={16} style={{ flex: 1 }}>
                {pro}
              </Body>
            </View>
          ))}
          <Label size={18} style={{ marginTop: 8 }}>
            What we don't
          </Label>
          {product.cons.map((con, i) => (
            <View key={i} style={styles.bulletRow}>
              <Feather name="x" size={18} color={colors.destructive} />
              <Body size={16} style={{ flex: 1 }}>
                {con}
              </Body>
            </View>
          ))}
        </Card>

        <Card style={{ gap: 8 }}>
          <Label size={18}>Best for</Label>
          {product.best_for.map((item, i) => (
            <View key={i} style={styles.bulletRow}>
              <Feather name="check" size={18} color={colors.success} />
              <Body size={16} style={{ flex: 1 }}>
                {item}
              </Body>
            </View>
          ))}
          <Label size={16} style={{ marginTop: 6 }}>
            Skip it if
          </Label>
          <View style={styles.bulletRow}>
            <Feather name="x" size={18} color={colors.destructive} />
            <Body size={16} style={{ flex: 1 }}>
              {product.skip_if}
            </Body>
          </View>
        </Card>

        <Pressable
          testID="buy-button"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Linking.openURL(product.buy_url);
          }}
          style={({ pressed }) => [
            styles.buyButton,
            { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Label size={18} color={colors.accentForeground}>
            See it on {product.brand}'s site
          </Label>
          <Feather
            name="external-link"
            size={20}
            color={colors.accentForeground}
          />
        </Pressable>
        {product.buy_is_affiliate ? (
          <Body size={13} color={colors.mutedForeground}>
            If you buy through this link, we may earn a commission. It never
            changes our rating.
          </Body>
        ) : null}

        <Body size={13} color={colors.mutedForeground}>
          Details verified on {product.verified_on} by {product.verified_by}.
        </Body>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 24,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  buyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: colorsConst.radius,
    minHeight: 56,
    paddingHorizontal: 20,
  },
});
