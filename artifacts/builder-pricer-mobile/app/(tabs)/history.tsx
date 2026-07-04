import React, { useEffect } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useCompany } from '@/context/CompanyContext';
import { useWycenas } from '@/context/WycenasContext';
import { useColors } from '@/hooks/useColors';
import { WycenaCard } from '@/components/WycenaCard';
import { t } from '@/data/translations';

export default function HistoryScreen() {
  const { language } = useApp();
  const { company } = useCompany();
  const { wycenas, removeWycena, clearAll } = useWycenas();
  const navigation = useNavigation();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({ title: t(language, 'history') });
  }, [language]);

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;

  // Group totals by currency
  const currencyTotals = wycenas.reduce<Record<string, { total: number; symbol: string }>>(
    (acc, w) => {
      if (!acc[w.currencyCode]) acc[w.currencyCode] = { total: 0, symbol: w.currencySymbol };
      acc[w.currencyCode].total += w.totalGross;
      return acc;
    }, {},
  );

  const handleClearAll = () => {
    if (!wycenas.length) return;
    Alert.alert(t(language, 'clearAll'), t(language, 'confirmDelete'), [
      { text: t(language, 'cancel'), style: 'cancel' },
      { text: t(language, 'confirm'), style: 'destructive', onPress: clearAll },
    ]);
  };

  return (
    <FlatList
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: topPad, paddingBottom: insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View>
          <View style={styles.pageHeader}>
            <Text style={[styles.pageTitle, { color: colors.foreground }]}>{t(language, 'history')}</Text>
            {wycenas.length > 0 && (
              <Pressable onPress={handleClearAll} hitSlop={8}>
                <Text style={[styles.clearAll, { color: colors.destructive }]}>{t(language, 'clearAll')}</Text>
              </Pressable>
            )}
          </View>

          {wycenas.length > 0 && (
            <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
              <Text style={styles.summaryCountLabel}>
                {wycenas.length} {t(language, 'savedCount')}
              </Text>
              <View style={styles.summaryTotals}>
                {Object.entries(currencyTotals).map(([code, { total, symbol }]) => (
                  <Text key={code} style={styles.summaryValue}>
                    {total.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {symbol}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      }
      data={wycenas}
      keyExtractor={(w) => w.id}
      renderItem={({ item }) => (
        <WycenaCard wycena={item} lang={language} company={company} onDelete={removeWycena} />
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
            <Ionicons name="document-text-outline" size={40} color={colors.mutedForeground} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.foreground }]}>{t(language, 'noEstimates')}</Text>
          <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>{t(language, 'noEstimatesDesc')}</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  pageTitle: { flex: 1, fontSize: 26, fontFamily: 'Inter_700Bold' },
  clearAll: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  summaryCard: { borderRadius: 14, padding: 16, marginBottom: 16, gap: 6 },
  summaryCountLabel: { fontSize: 13, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.75)' },
  summaryTotals: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  summaryValue: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#fff' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 16 },
  emptyIcon: { width: 80, height: 80, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  emptyDesc: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center' },
});
