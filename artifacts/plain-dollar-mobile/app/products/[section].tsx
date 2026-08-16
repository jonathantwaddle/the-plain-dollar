import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colorsConst from '@/constants/colors';
import { useColors } from '@/hooks/useColors';
import { Body, Label, RatingBadge, webBottomInset } from '@/components/ui';
import { SECTIONS, allProducts } from '@/lib/data';

export default function ProductSectionScreen() {
  const { section } = useLocalSearchParams<{ section: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const meta = SECTIONS.find((s) => s.key === section);
  const products = allProducts
    .filter((p) => p.section === section)
    .sort((a, b) => b.rating - a.rating);

  return (
    <>
      <Stack.Screen options={{ title: meta?.title ?? 'Products' }} />
      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          padding: 20,
          gap: 12,
          paddingBottom: insets.bottom + webBottomInset + 40,
        }}
        data={products}
        keyExtractor={(item) => item.slug}
        scrollEnabled={products.length > 0}
        ListHeaderComponent={
          meta ? (
            <Body color={colors.mutedForeground} style={{ marginBottom: 4 }}>
              {meta.blurb}.
            </Body>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="inbox" size={30} color={colors.mutedForeground} />
            <Body color={colors.mutedForeground}>
              No reviews in this section yet.
            </Body>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            testID={`product-${item.slug}`}
            onPress={() => {
              Haptics.selectionAsync();
              router.push(`/product/${item.slug}`);
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
              <Label size={18}>{item.name}</Label>
              <Body size={15} color={colors.mutedForeground}>
                {item.price.headline}
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
    </>
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
  empty: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 60,
  },
});
