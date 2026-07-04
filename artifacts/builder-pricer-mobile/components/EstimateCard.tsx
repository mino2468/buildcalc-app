import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import type { Estimate } from '@/types';
import type { Language } from '@/types';
import { t } from '@/data/translations';

interface Props {
  estimate: Estimate;
  lang: Language;
  onDelete: (id: string) => void;
}

function formatPrice(value: number, currencySymbol: string): string {
  const formatted =
    value >= 1000
      ? value.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return `${formatted} ${currencySymbol}`;
}

function formatDate(iso: string, lang: Language): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'uk' ? 'uk-UA' : lang === 'cs' ? 'cs-CZ' : lang + '-' + lang.toUpperCase(), {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso.slice(0, 10);
  }
}

export function EstimateCard({ estimate, lang, onDelete }: Props) {
  const colors = useColors();

  const handleDelete = () => {
    Alert.alert(
      t(lang, 'deleteEstimate'),
      t(lang, 'confirmDelete'),
      [
        { text: t(lang, 'cancel'), style: 'cancel' },
        {
          text: t(lang, 'confirm'),
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            onDelete(estimate.id);
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accent }]}>
        <Ionicons name={estimate.workTypeIconName as any} size={22} color={colors.primary} />
      </View>
      <View style={styles.content}>
        {!!estimate.label && (
          <Text style={[styles.label, { color: colors.primary }]} numberOfLines={1}>{estimate.label}</Text>
        )}
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>
          {estimate.workTypeName}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
            {estimate.area} {estimate.workTypeUnit}
          </Text>
          <Text style={[styles.metaDot, { color: colors.border }]}> · </Text>
          <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
            {estimate.countryName}
          </Text>
          <Text style={[styles.metaDot, { color: colors.border }]}> · </Text>
          <Text style={[styles.metaText, { color: colors.mutedForeground }]}>
            {formatDate(estimate.createdAt, lang)}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.pricePerUnit, { color: colors.mutedForeground }]}>
            {estimate.pricePerUnit} {estimate.currencySymbol}/{estimate.workTypeUnit}
          </Text>
          <Text style={[styles.total, { color: colors.primary }]}>
            {formatPrice(estimate.totalPrice, estimate.currencySymbol)}
          </Text>
        </View>
      </View>
      <Pressable
        onPress={handleDelete}
        hitSlop={8}
        style={({ pressed }) => [styles.deleteBtn, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Ionicons name="trash-outline" size={18} color={colors.destructive} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  content: { flex: 1, gap: 3 },
  label: { fontSize: 11, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.5 },
  name: { fontSize: 14, fontFamily: 'Inter_600SemiBold', lineHeight: 19 },
  meta: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  metaText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  metaDot: { fontSize: 12 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  pricePerUnit: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  total: { fontSize: 17, fontFamily: 'Inter_700Bold' },
  deleteBtn: { paddingTop: 2 },
});
