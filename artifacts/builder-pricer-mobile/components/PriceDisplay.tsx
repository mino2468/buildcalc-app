import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import type { PriceRate } from '@/types';
import type { Language } from '@/types';
import { t } from '@/data/translations';

interface Props {
  rate: PriceRate;
  lang: Language;
  currencySymbol: string;
}

export function PriceDisplay({ rate, lang, currencySymbol }: Props) {
  const colors = useColors();

  const fmt = (v: number) =>
    v >= 1000
      ? v.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : v.toLocaleString('en-US', { maximumFractionDigits: 2 });

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
      <View style={styles.col}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{t(lang, 'min')}</Text>
        <Text style={[styles.value, { color: colors.foreground }]}>
          {fmt(rate.min)}
          <Text style={[styles.currency, { color: colors.mutedForeground }]}> {currencySymbol}</Text>
        </Text>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={[styles.col, styles.colCenter]}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{t(lang, 'avg')}</Text>
        <Text style={[styles.valueAvg, { color: colors.primary }]}>
          {fmt(rate.avg)}
          <Text style={[styles.currencyAvg, { color: colors.primary }]}> {currencySymbol}</Text>
        </Text>
        <View style={[styles.avgBadge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.avgBadgeText, { color: colors.primary }]}>{t(lang, 'suggestedPrice')}</Text>
        </View>
      </View>
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.col}>
        <Text style={[styles.label, { color: colors.mutedForeground }]}>{t(lang, 'max')}</Text>
        <Text style={[styles.value, { color: colors.foreground }]}>
          {fmt(rate.max)}
          <Text style={[styles.currency, { color: colors.mutedForeground }]}> {currencySymbol}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    gap: 0,
  },
  col: { flex: 1, alignItems: 'center', gap: 4 },
  colCenter: {},
  divider: { width: 1, marginHorizontal: 8, borderRadius: 1 },
  label: { fontSize: 11, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5 },
  value: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  valueAvg: { fontSize: 22, fontFamily: 'Inter_700Bold' },
  currency: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  currencyAvg: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  avgBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  avgBadgeText: { fontSize: 10, fontFamily: 'Inter_600SemiBold' },
});
