import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import { Body, Heading, Label, RatingBadge, webBottomInset } from '@/components/ui';
import { allCards } from '@/lib/data';

const sortedCards = [...allCards].sort((a, b) => b.rating - a.rating);

export default function CardsListScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{
        padding: 20,
        gap: 12,
        paddingBottom: insets.bottom + webBottomInset + 40,
      }}
      data={sortedCards}
      keyExtractor={(item) => item.slug}
      scrollEnabled={sortedCards.length > 0}
      ListHeaderComponent={
        <View style={{ gap: 6, marginBottom: 4 }}>
          <Body color={colors.mutedForeground}>
            Every card reviewed in plain English, sorted by our rating.
          </Body>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          testID={`card-${item.slug}`}
          onPress={() => {
            Haptics.selectionAsync();
            router.push(`/card/${item.slug}`);
          }}
          style={({ pressed }) => [
            styles.row,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <View style={{ flex: 1, gap: 4 }}>
            <Label size={18}>{item.short_name}</Label>
            <Body size={15} color={colors.mutedForeground}>
              {item.issuer} ·{' '}
              {item.annual_fee === 0
                ? 'No annual fee'
                : `$${item.annual_fee} annual fee`}
            </Body>
            <RatingBadge rating={item.rating} />
          </View>
          <Feather
            name="chevron-right"
            size={22}
            color={colors.mutedForeground}
          />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: colorsConst.radius,
    padding: 16,
    minHeight: 68,
  },
});
