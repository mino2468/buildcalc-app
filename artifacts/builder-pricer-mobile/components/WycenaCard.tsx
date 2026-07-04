import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useColors } from '@/hooks/useColors';
import type { Language } from '@/types';
import type { Wycena } from '@/types';
import { t } from '@/data/translations';
import { printWycena } from '@/utils/printWycena';
import type { CompanyInfo } from '@/context/CompanyContext';

interface Props {
  wycena: Wycena;
  lang: Language;
  company: CompanyInfo;
  onDelete: (id: string) => void;
}

function fmt(n: number, sym: string): string {
  return `${n.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} ${sym}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function WycenaCard({ wycena, lang, company, onDelete }: Props) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = () => {
    Alert.alert(
      t(lang, 'deleteEstimate'),
      t(lang, 'confirmDelete'),
      [
        { text: t(lang, 'cancel'), style: 'cancel' },
        {
          text: t(lang, 'confirm'), style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            onDelete(wycena.id);
          },
        },
      ],
    );
  };

  const handlePrint = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await printWycena(wycena, company);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Header row */}
      <Pressable onPress={() => setExpanded((v) => !v)} style={styles.header}>
        <View style={[styles.numBox, { backgroundColor: colors.primary }]}>
          <Text style={styles.numText}>#{wycena.number}</Text>
        </View>
        <View style={styles.headerInfo}>
          {wycena.clientName
            ? <Text style={[styles.clientName, { color: colors.foreground }]} numberOfLines={1}>{wycena.clientName}</Text>
            : <Text style={[styles.noClient, { color: colors.mutedForeground }]}>{t(lang, 'estimateNo')} {wycena.number}</Text>
          }
          <Text style={[styles.meta, { color: colors.mutedForeground }]}>
            {fmtDate(wycena.createdAt)} · {wycena.positions.length} {t(lang, 'positionCount')}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.total, { color: colors.primary }]}>
            {fmt(wycena.totalGross, wycena.currencySymbol)}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={16} color={colors.mutedForeground}
          />
        </View>
      </Pressable>

      {/* Expanded positions */}
      {expanded && (
        <View style={styles.expanded}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          {wycena.positions.map((p, i) => (
            <View key={p.id} style={styles.posRow}>
              <Text style={[styles.posNum, { color: colors.mutedForeground }]}>{i + 1}.</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.posName, { color: colors.foreground }]} numberOfLines={1}>{p.workTypeName}</Text>
                <Text style={[styles.posMeta, { color: colors.mutedForeground }]}>
                  {p.area} {p.workTypeUnit} × {p.pricePerUnit} {wycena.currencySymbol}
                </Text>
              </View>
              <Text style={[styles.posTotal, { color: colors.foreground }]}>
                {fmt(p.totalPrice, wycena.currencySymbol)}
              </Text>
            </View>
          ))}

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Summary */}
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>{t(lang, 'totalNet')}</Text>
            <Text style={[styles.summaryValue, { color: colors.foreground }]}>{fmt(wycena.totalNet, wycena.currencySymbol)}</Text>
          </View>
          {wycena.vatRate > 0 && (
            <>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>VAT {wycena.vatRate}%</Text>
                <Text style={[styles.summaryValue, { color: colors.foreground }]}>{fmt(wycena.totalVat, wycena.currencySymbol)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { color: colors.foreground, fontFamily: 'Inter_600SemiBold' }]}>{t(lang, 'totalGross')}</Text>
                <Text style={[styles.summaryValue, { color: colors.primary, fontFamily: 'Inter_700Bold' }]}>{fmt(wycena.totalGross, wycena.currencySymbol)}</Text>
              </View>
            </>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <Pressable
              onPress={handlePrint}
              style={({ pressed }) => [styles.printBtn, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
            >
              <Ionicons name="print-outline" size={15} color={colors.foreground} />
              <Text style={[styles.printBtnText, { color: colors.foreground }]}>{t(lang, 'printEstimate')}</Text>
            </Pressable>
            <Pressable onPress={handleDelete} hitSlop={8} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={18} color={colors.destructive} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 14, borderWidth: 1, marginBottom: 10, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  numBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  numText: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#fff' },
  headerInfo: { flex: 1, gap: 2 },
  clientName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  noClient: { fontSize: 14, fontFamily: 'Inter_500Medium' },
  meta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  headerRight: { alignItems: 'flex-end', gap: 4 },
  total: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  expanded: { paddingHorizontal: 14, paddingBottom: 14 },
  divider: { height: 1, marginVertical: 10 },
  posRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, gap: 8 },
  posNum: { width: 20, fontSize: 12, fontFamily: 'Inter_500Medium' },
  posName: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  posMeta: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 1 },
  posTotal: { fontSize: 13, fontFamily: 'Inter_600SemiBold', minWidth: 80, textAlign: 'right' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  summaryLabel: { fontSize: 13, fontFamily: 'Inter_400Regular' },
  summaryValue: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  actions: { flexDirection: 'row', alignItems: 'center', marginTop: 12, gap: 10 },
  printBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 7, flex: 1, justifyContent: 'center' },
  printBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  deleteBtn: { padding: 4 },
});
