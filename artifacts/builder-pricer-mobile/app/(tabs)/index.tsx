import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useCompany } from '@/context/CompanyContext';
import { useEstimates } from '@/context/EstimatesContext';
import { useColors } from '@/hooks/useColors';
import { PriceDisplay } from '@/components/PriceDisplay';
import { getWorkTypeById } from '@/data/workTypes';
import { CURRENCIES, getCurrencyByCode, getCurrencyName } from '@/data/currencies';
import { getPriceRateByCurrency } from '@/data/priceRates';
import { t } from '@/data/translations';
import { pendingWorkTypeId, setPendingWorkTypeId } from '@/utils/calcStore';
import { printEstimate } from '@/utils/printEstimate';
import type { Estimate } from '@/types';

export default function CalculatorScreen() {
  const { language, currencyCode, setCurrencyCode } = useApp();
  const { company } = useCompany();
  const { addEstimate } = useEstimates();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: t(language, 'calculator') });
  }, [language]);

  const [workTypeId, setWorkTypeId] = useState<string | null>(null);
  const [dim1, setDim1] = useState('');
  const [dim2, setDim2] = useState('');
  const [area, setArea] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [label, setLabel] = useState('');
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<Estimate | null>(null);

  const workType = workTypeId ? getWorkTypeById(workTypeId) : null;
  const rate = workType ? getPriceRateByCurrency(workType.id, currencyCode) : null;
  const currency = getCurrencyByCode(currencyCode);

  // Auto-calculate area when both dimensions are set
  useEffect(() => {
    const d1 = parseFloat(dim1);
    const d2 = parseFloat(dim2);
    if (d1 > 0 && d2 > 0) {
      setArea((d1 * d2).toFixed(2));
    }
  }, [dim1, dim2]);

  useFocusEffect(
    useCallback(() => {
      if (pendingWorkTypeId) {
        const newId = pendingWorkTypeId;
        setPendingWorkTypeId(null);
        setWorkTypeId(newId);
        setDim1('');
        setDim2('');
        setArea('');
        const newRate = getPriceRateByCurrency(newId, currencyCode);
        if (newRate) setCustomPrice(newRate.avg.toString());
        setJustSaved(false);
        setLastSaved(null);
      }
    }, [currencyCode]),
  );

  const areaNum = parseFloat(area) || 0;
  const priceNum = customPrice !== '' ? (parseFloat(customPrice) || 0) : (rate?.avg ?? 0);
  const total = areaNum * priceNum;

  const dim1Label = workType?.measurementType === 'wall' ? t(language, 'width') : t(language, 'length');
  const dim2Label = workType?.measurementType === 'wall' ? t(language, 'height') : t(language, 'width');

  const handleSave = () => {
    if (!workType || !currency || areaNum === 0) return;
    const workTypeName =
      workType.translations[language]?.name ?? workType.translations['en']?.name ?? workType.slug;
    const est: Omit<Estimate, 'id' | 'createdAt'> = {
      workTypeId: workType.id,
      workTypeName,
      workTypeIconName: workType.iconName,
      workTypeUnit: workType.unit,
      currencyCode: currency.code,
      currencySymbol: currency.symbol,
      area: areaNum,
      pricePerUnit: priceNum,
      totalPrice: total,
      label: label.trim(),
    };
    addEstimate(est);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setJustSaved(true);
    // Keep lastSaved for print
    setLastSaved({
      ...est,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    });
    setLabel('');
    setTimeout(() => setJustSaved(false), 3000);
  };

  const handlePrint = async () => {
    if (!lastSaved) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await printEstimate(lastSaved, company);
  };

  const fmtTotal =
    total >= 1000
      ? total.toLocaleString('en-US', { maximumFractionDigits: 0 })
      : total.toFixed(2);

  const workTypeName = workType
    ? (workType.translations[language]?.name ?? workType.translations['en']?.name)
    : null;

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.foreground }]}>
            {t(language, 'calculator')}
          </Text>
          <Pressable
            onPress={() => setShowCurrencyPicker(true)}
            style={({ pressed }) => [
              styles.currencyPill,
              { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={[styles.currencySymbol, { color: colors.primary }]}>{currency?.symbol}</Text>
            <Text style={[styles.currencyCode, { color: colors.mutedForeground }]}>{currencyCode}</Text>
            <Ionicons name="chevron-down" size={13} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {/* Work type selector */}
        <Pressable
          onPress={() => router.push('/work-type-select')}
          style={({ pressed }) => [
            styles.workTypeBtn,
            {
              backgroundColor: workType ? colors.card : colors.accent,
              borderColor: workType ? colors.border : colors.primary,
              borderStyle: workType ? 'solid' : 'dashed',
              opacity: pressed ? 0.75 : 1,
            },
          ]}
        >
          {workType ? (
            <>
              <View style={[styles.wtIcon, { backgroundColor: colors.accent }]}>
                <Ionicons name={workType.iconName as any} size={24} color={colors.primary} />
              </View>
              <View style={styles.wtTextWrap}>
                <Text style={[styles.wtName, { color: colors.foreground }]} numberOfLines={2}>
                  {workTypeName}
                </Text>
                <Text style={[styles.wtUnit, { color: colors.mutedForeground }]}>
                  {t(language, 'pricePerUnit')}
                </Text>
              </View>
              <Text style={[styles.changeText, { color: colors.primary }]}>
                {t(language, 'changeWorkType')}
              </Text>
            </>
          ) : (
            <>
              <View style={[styles.wtIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="add" size={28} color="#fff" />
              </View>
              <Text style={[styles.selectText, { color: colors.primary }]}>
                {t(language, 'selectWorkType')}
              </Text>
            </>
          )}
        </Pressable>

        {workType && (
          <>
            {/* Market rate hint */}
            {rate ? (
              <PriceDisplay rate={rate} lang={language} currencySymbol={currency?.symbol ?? ''} />
            ) : (
              <View style={[styles.noRate, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                <Ionicons name="information-circle-outline" size={18} color={colors.mutedForeground} />
                <Text style={[styles.noRateText, { color: colors.mutedForeground }]}>
                  {t(language, 'noRateAvailable')}
                </Text>
              </View>
            )}

            {/* Dimension calculator */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>
                {t(language, 'dimensions')}
              </Text>
              <View style={styles.dimsRow}>
                <View style={styles.dimBox}>
                  <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>{dim1Label} (m)</Text>
                  <TextInput
                    value={dim1}
                    onChangeText={(v) => setDim1(v.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={colors.mutedForeground}
                    style={[styles.dimInput, { color: colors.foreground, borderColor: colors.border }]}
                    selectTextOnFocus
                  />
                </View>
                <Text style={[styles.dimMul, { color: colors.mutedForeground }]}>×</Text>
                <View style={styles.dimBox}>
                  <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>{dim2Label} (m)</Text>
                  <TextInput
                    value={dim2}
                    onChangeText={(v) => setDim2(v.replace(/[^0-9.]/g, ''))}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor={colors.mutedForeground}
                    style={[styles.dimInput, { color: colors.foreground, borderColor: colors.border }]}
                    selectTextOnFocus
                  />
                </View>
              </View>
              {dim1 && dim2 && parseFloat(dim1) > 0 && parseFloat(dim2) > 0 && (
                <View style={[styles.dimResult, { backgroundColor: colors.accent }]}>
                  <Text style={[styles.dimResultText, { color: colors.primary }]}>
                    = {(parseFloat(dim1) * parseFloat(dim2)).toFixed(2)} m²
                  </Text>
                </View>
              )}
              <Text style={[styles.dimOr, { color: colors.mutedForeground }]}>
                {t(language, 'orEnterDirectly')}
              </Text>
            </View>

            {/* Area input */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>
                {t(language, 'area')}
              </Text>
              <View style={styles.areaRow}>
                <Pressable
                  onPress={() => {
                    const n = Math.max(0, (parseFloat(area) || 0) - 1);
                    setArea(n.toFixed(n % 1 === 0 ? 0 : 2));
                    setDim1(''); setDim2('');
                  }}
                  style={[styles.stepBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
                >
                  <Ionicons name="remove" size={20} color={colors.foreground} />
                </Pressable>
                <TextInput
                  value={area}
                  onChangeText={(v) => { setArea(v.replace(/[^0-9.]/g, '')); setDim1(''); setDim2(''); }}
                  keyboardType="decimal-pad"
                  placeholder="0"
                  placeholderTextColor={colors.mutedForeground}
                  style={[styles.areaInput, { color: colors.foreground, borderColor: colors.border }]}
                  selectTextOnFocus
                />
                <Pressable
                  onPress={() => {
                    const n = (parseFloat(area) || 0) + 1;
                    setArea(n.toFixed(0));
                    setDim1(''); setDim2('');
                  }}
                  style={[styles.stepBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
                >
                  <Ionicons name="add" size={20} color={colors.foreground} />
                </Pressable>
              </View>
              <View style={styles.quickRow}>
                {[5, 10, 25, 50, 100].map((d) => (
                  <Pressable
                    key={d}
                    onPress={() => {
                      const n = (parseFloat(area) || 0) + d;
                      setArea(n.toFixed(0));
                      setDim1(''); setDim2('');
                    }}
                    style={({ pressed }) => [
                      styles.quickBtn,
                      { backgroundColor: pressed ? colors.primary : colors.secondary, borderColor: colors.border },
                    ]}
                  >
                    <Text style={[styles.quickBtnText, { color: colors.mutedForeground }]}>+{d}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Price per unit */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>
                {t(language, 'pricePerUnit')} ({currency?.symbol})
              </Text>
              <TextInput
                value={customPrice}
                onChangeText={setCustomPrice}
                keyboardType="decimal-pad"
                placeholder={rate ? rate.avg.toString() : '0'}
                placeholderTextColor={colors.mutedForeground}
                style={[styles.priceInput, { color: colors.foreground, borderColor: colors.border }]}
                selectTextOnFocus
              />
              {rate && (
                <Text style={[styles.rangeHint, { color: colors.mutedForeground }]}>
                  {t(language, 'priceRange')}: {rate.min} – {rate.max} {currency?.symbol}
                </Text>
              )}
            </View>

            {/* Total */}
            <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
              <Text style={[styles.totalLabel, { color: 'rgba(255,255,255,0.75)' }]}>
                {t(language, 'totalPrice')} · {areaNum} {workType.unit}
              </Text>
              <Text style={styles.totalValue}>
                {fmtTotal}{' '}
                <Text style={styles.totalCurrency}>{currency?.symbol}</Text>
              </Text>
            </View>

            {/* Save & Print */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>
                {t(language, 'estimateLabel')}
              </Text>
              <TextInput
                value={label}
                onChangeText={setLabel}
                placeholder={t(language, 'estimateLabelPlaceholder')}
                placeholderTextColor={colors.mutedForeground}
                style={[styles.labelInput, { color: colors.foreground, borderColor: colors.border }]}
                returnKeyType="done"
              />
              <Pressable
                onPress={handleSave}
                disabled={areaNum === 0}
                style={({ pressed }) => [
                  styles.saveBtn,
                  {
                    backgroundColor: justSaved ? colors.success : colors.primary,
                    opacity: pressed ? 0.85 : areaNum === 0 ? 0.45 : 1,
                  },
                ]}
              >
                <Ionicons name={justSaved ? 'checkmark-circle' : 'bookmark-outline'} size={18} color="#fff" />
                <Text style={styles.saveBtnText}>
                  {justSaved ? t(language, 'saved') : t(language, 'saveEstimate')}
                </Text>
              </Pressable>

              {lastSaved && (
                <Pressable
                  onPress={handlePrint}
                  style={({ pressed }) => [
                    styles.printBtn,
                    { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
                  ]}
                >
                  <Ionicons name="print-outline" size={18} color={colors.foreground} />
                  <Text style={[styles.printBtnText, { color: colors.foreground }]}>
                    {t(language, 'printEstimate')}
                  </Text>
                </Pressable>
              )}
            </View>
          </>
        )}

        <View style={{ height: insets.bottom + 90 }} />
      </ScrollView>

      {/* Currency picker modal */}
      <Modal
        visible={showCurrencyPicker}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCurrencyPicker(false)}
      >
        <View style={[styles.modalRoot, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: insets.top + 12 }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              {t(language, 'selectCurrency')}
            </Text>
            <Pressable onPress={() => setShowCurrencyPicker(false)} hitSlop={8}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </Pressable>
          </View>
          <FlatList
            data={CURRENCIES}
            keyExtractor={(c) => c.code}
            renderItem={({ item: c }) => {
              const selected = c.code === currencyCode;
              return (
                <Pressable
                  onPress={() => {
                    setCurrencyCode(c.code);
                    if (workTypeId) {
                      const r = getPriceRateByCurrency(workTypeId, c.code);
                      if (r) setCustomPrice(r.avg.toString());
                    }
                    setShowCurrencyPicker(false);
                  }}
                  style={({ pressed }) => [
                    styles.currencyRow,
                    {
                      backgroundColor: selected ? colors.accent : pressed ? colors.secondary : colors.card,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <View style={[styles.currSymbolBox, { backgroundColor: selected ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.currSymbolBoxText, { color: selected ? '#fff' : colors.foreground }]}>
                      {c.symbol}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.currRowCode, { color: colors.foreground }]}>{c.code}</Text>
                    <Text style={[styles.currRowName, { color: colors.mutedForeground }]} numberOfLines={1}>
                      {getCurrencyName(c, language)}
                    </Text>
                  </View>
                  {selected && <Ionicons name="checkmark" size={18} color={colors.primary} />}
                </Pressable>
              );
            }}
            contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16 },
  pageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  pageTitle: { flex: 1, fontSize: 26, fontFamily: 'Inter_700Bold' },
  currencyPill: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, gap: 5,
  },
  currencySymbol: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  currencyCode: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  workTypeBtn: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 14, borderWidth: 2, gap: 12, marginBottom: 14, minHeight: 80,
  },
  wtIcon: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  wtTextWrap: { flex: 1 },
  wtName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  wtUnit: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  changeText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  selectText: { flex: 1, fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  noRate: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 10, borderWidth: 1, gap: 8, marginBottom: 14,
  },
  noRateText: { fontSize: 13, fontFamily: 'Inter_400Regular', flex: 1 },
  card: { padding: 16, borderRadius: 14, borderWidth: 1, marginTop: 12, gap: 10 },
  cardLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5 },
  // Dimension calculator
  dimsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  dimBox: { flex: 1, gap: 6 },
  dimLabel: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  dimInput: {
    height: 52, borderWidth: 1, borderRadius: 10,
    paddingHorizontal: 12, fontSize: 22, fontFamily: 'Inter_700Bold', textAlign: 'center',
  },
  dimMul: { fontSize: 24, fontFamily: 'Inter_700Bold', paddingBottom: 12 },
  dimResult: { paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  dimResultText: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  dimOr: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: 2 },
  // Area
  areaRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: { width: 46, height: 46, borderRadius: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  areaInput: {
    flex: 1, textAlign: 'center', fontSize: 30, fontFamily: 'Inter_700Bold',
    height: 56, borderWidth: 1, borderRadius: 10,
  },
  quickRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  quickBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  quickBtnText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  priceInput: {
    fontSize: 24, fontFamily: 'Inter_700Bold', height: 54,
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, textAlign: 'center',
  },
  rangeHint: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: -4 },
  totalCard: {
    padding: 20, borderRadius: 16, marginTop: 12, alignItems: 'center',
    shadowColor: '#EA580C', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28, shadowRadius: 12, elevation: 6,
  },
  totalLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  totalValue: { fontSize: 44, fontFamily: 'Inter_700Bold', color: '#fff', lineHeight: 52 },
  totalCurrency: { fontSize: 24, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.78)' },
  labelInput: { height: 46, borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, fontSize: 15, fontFamily: 'Inter_400Regular' },
  saveBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 52, borderRadius: 12, gap: 8 },
  saveBtnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  printBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: 46, borderRadius: 12, borderWidth: 1.5, gap: 8,
  },
  printBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  modalRoot: { flex: 1 },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingBottom: 14, borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  currencyRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 12, borderWidth: 1.5, marginBottom: 8, gap: 12,
  },
  currSymbolBox: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  currSymbolBoxText: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  currRowCode: { fontSize: 16, fontFamily: 'Inter_700Bold' },
  currRowName: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});
