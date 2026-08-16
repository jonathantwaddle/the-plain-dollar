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
import { cardsBySlug } from '@/lib/data';

function FactRow({ label, value }: { label: string; value: string }) {
  const colors = useColors();
  return (
    <View style={styles.factRow}>
      <Body size={15} color={colors.mutedForeground} style={{ flex: 1 }}>
        {label}
      </Body>
      <Body size={16} style={{ flex: 2, textAlign: 'right' }}>
        {value}
      </Body>
    </View>
  );
}

export default function CardDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const card = slug ? cardsBySlug[slug] : undefined;

  if (!card) {
    return (
      <View style={[styles.missing, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={32} color={colors.mutedForeground} />
        <Body color={colors.mutedForeground}>
          We couldn't find that card.
        </Body>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: card.short_name }} />
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          padding: 20,
          gap: 16,
          paddingBottom: insets.bottom + webBottomInset + 40,
        }}
      >
        <View style={{ gap: 8 }}>
          <Heading size={26}>{card.name}</Heading>
          <Body size={15} color={colors.mutedForeground}>
            {card.issuer} · {card.network}
          </Body>
          <RatingBadge rating={card.rating} />
          <Body size={16}>{card.rating_reason}</Body>
        </View>

        {card.intro_offer ? (
          <Card style={{ gap: 6, borderColor: colors.accent, borderWidth: 2 }}>
            <Label size={16} color={colors.primary}>
              Welcome offer
            </Label>
            <Heading size={20}>{card.intro_offer.headline}</Heading>
            <Body size={16}>
              Spend {card.intro_offer.spend_requirement}.
            </Body>
            <Body size={15} color={colors.mutedForeground}>
              Our value estimate: {card.intro_offer.our_value_estimate}
            </Body>
          </Card>
        ) : null}

        <Card style={{ gap: 10 }}>
          <Label size={18}>What it earns</Label>
          {card.rewards.map((reward, i) => (
            <View key={i} style={styles.rewardRow}>
              <View
                style={[styles.rateChip, { backgroundColor: colors.secondary }]}
              >
                <Label size={15} color={colors.primary}>
                  {reward.rate}
                </Label>
              </View>
              <Body size={16} style={{ flex: 1 }}>
                {reward.on}
              </Body>
            </View>
          ))}
        </Card>

        <Card style={{ gap: 12 }}>
          <Label size={18}>The numbers</Label>
          <FactRow
            label="Annual fee"
            value={card.annual_fee === 0 ? 'None' : `$${card.annual_fee}`}
          />
          <FactRow label="Regular APR" value={card.regular_apr} />
          {card.intro_apr ? (
            <FactRow label="Intro APR" value={card.intro_apr} />
          ) : null}
          <FactRow
            label="Foreign transaction fee"
            value={card.foreign_transaction_fee}
          />
          <FactRow label="Credit needed" value={card.recommended_credit} />
        </Card>

        <Card style={{ gap: 8 }}>
          <Label size={18}>Best for</Label>
          {card.best_for.map((item, i) => (
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
              {card.skip_if}
            </Body>
          </View>
        </Card>

        <Pressable
          testID="apply-button"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Linking.openURL(card.apply_url);
          }}
          style={({ pressed }) => [
            styles.applyButton,
            { backgroundColor: colors.accent, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Label size={18} color={colors.accentForeground}>
            Apply on {card.issuer}'s site
          </Label>
          <Feather
            name="external-link"
            size={20}
            color={colors.accentForeground}
          />
        </Pressable>
        {card.apply_is_affiliate ? (
          <Body size={13} color={colors.mutedForeground}>
            If you apply through this link, we may earn a commission. It never
            changes our rating.
          </Body>
        ) : null}

        <Body size={13} color={colors.mutedForeground}>
          Details verified on {card.verified_on} by {card.verified_by}. Terms
          can change — confirm on the issuer's site before applying.
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
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rateChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: colorsConst.radius,
    minHeight: 56,
    paddingHorizontal: 20,
  },
});
