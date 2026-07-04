import React, { useEffect } from 'react';
import {
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
import { useEstimates } from '@/context/EstimatesContext';
import { useColors } from '@/hooks/useColors';
import { EstimateCard } from '@/components/EstimateCard';
import { t } from '@/data/translations';

export default function HistoryScreen() {
  const { language } = useApp();
  const { estimates, removeEstimate, clearAll } = useEstimates();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ title: t(language, 'history') });
  }, [language]);
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;

  const totalSum = estimates.reduce((acc, e) => acc + e.totalPrice, 0);

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <FlatList
        data={estimates}
        keyExtractor={(e) => e.id}
        renderItem={({ item }) => (
          <EstimateCard estimate={item} lang={language} onDelete={removeEstimate} />
        )}
        contentContainerStyle={[styles.list, { paddingTop: topPad, paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Page header */}
            <View style={styles.pageHeader}>
              <Text style={[styles.pageTitle, { color: colors.foreground }]}>
                {t(language, 'history')}
              </Text>
              {estimates.length > 0 && (
                <Pressable
                  onPress={clearAll}
                  hitSlop={8}
                  style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
                >
                  <Ionicons name="trash-outline" size={20} color={colors.mutedForeground} />
                </Pressable>
              )}
            </View>

            {/* Summary card */}
            {estimates.length > 0 && (
              <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: colors.foreground }]}>
                    {estimates.length}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    {estimates.length === 1 ? 'estimate' : 'estimates'}
                  </Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: colors.primary }]}>
                    {totalSum >= 1000
                      ? totalSum.toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : totalSum.toFixed(2)}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
                    total value
                  </Text>
                </View>
              </View>
            )}

            {estimates.length > 0 && (
              <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                SAVED ESTIMATES
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.secondary }]}>
              <Ionicons name="time-outline" size={36} color={colors.mutedForeground} />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              {t(language, 'noEstimates')}
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.mutedForeground }]}>
              {t(language, 'noEstimatesDesc')}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  list: { paddingHorizontal: 16 },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  pageTitle: { flex: 1, fontSize: 26, fontFamily: 'Inter_700Bold' },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: 26, fontFamily: 'Inter_700Bold' },
  summaryLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  summaryDivider: { width: 1, height: 40, marginHorizontal: 16 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  empty: { paddingTop: 80, alignItems: 'center', gap: 12 },
  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  emptyDesc: { fontSize: 14, fontFamily: 'Inter_400Regular', textAlign: 'center', maxWidth: 260 },
});
