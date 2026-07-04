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
import { COUNTRIES, getCountryByCode, getCountryName } from '@/data/countries';
import { getPriceRate } from '@/data/priceRates';
import { t } from '@/data/translations';
import { getPendingWorkTypeId, setPendingWorkTypeId } from '@/utils/calcStore';
import { printEstimate } from '@/utils/printEstimate';
import type { Estimate } from '@/types';

export default function CalculatorScreen() {
  const { language, countryCode, setCountryCode } = useApp();
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
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [lastSaved, setLastSaved] = useState<Estimate | null>(null);

  const workType = workTypeId ? getWorkTypeById(workTypeId) : null;
  const country = getCountryByCode(countryCode);
  const rate = workType ? getPriceRate(workType.id, countryCode) : null;

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
      const pending = getPendingWorkTypeId();
      if (pending) {
        const newId = pending;
        setPendingWorkTypeId(null);
        setWorkTypeId(newId);
        setDim1('');
        setDim2('');
        setArea('');
        const newRate = getPriceRate(newId, countryCode);
        if (newRate) setCustomPrice(newRate.avg.toString());
        setJustSaved(false);
        setLastSaved(null);
      }
    }, [countryCode]),
  );

  // When country changes, refresh the suggested price
  useEffect(() => {
    if (workTypeId) {
      const newRate = getPriceRate(workTypeId, countryCode);
      if (newRate) setCustomPrice(newRate.avg.toString());
      else setCustomPrice('');
    }
  }, [countryCode, workTypeId]);

  const areaNum = parseFloat(area) || 0;
  const priceNum = customPrice !== '' ? (parseFloat(customPrice) || 0) : (rate?.avg ?? 0);
  const total = areaNum * priceNum;

  const dim1Label = workType?.measurementType === 'wall' ? t(language, 'width') : t(language, 'length');
  const dim2Label = workType?.measurementType === 'wall' ? t(language, 'height') : t(language, 'width');

  const handleSave = () => {
    if (!workType || !country || areaNum === 0) return;
    const workTypeName =
      workType.translations[language]?.name ?? workType.translations['en']?.name ?? workType.slug;
    const est: Omit<Estimate, 'id' | 'createdAt'> = {
      workTypeId: workType.id,
      workTypeName,
      workTypeIconName: workType.iconName,
      workTypeUnit: workType.unit,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      area: areaNum,
      pricePerUnit: priceNum,
      totalPrice: total,
      label: label.trim(),
    };
    addEstimate(est);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setJustSaved(true);
    setLastSaved({ ...est, id: Date.now().toString(), createdAt: new Date().toISOString() });
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
            onPress={() => setShowCountryPicker(true)}
            style={({ pressed }) => [
              styles.countryPill,
              { backgroundColor: colors.secondary, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={[styles.pillCode, { color: colors.primary }]}>{countryCode}</Text>
            <Text style={[styles.pillSymbol, { color: colors.mutedForeground }]}>
              {country?.currencySymbol}
            </Text>
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
              <PriceDisplay rate={rate} lang={language} currencySymbol={country?.currencySymbol ?? ''} />
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
                {t(language, 'pricePerUnit')} ({country?.currencySymbol})
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
                  {t(language, 'priceRange')}: {rate.min} – {rate.max} {country?.currencySymbol}
                </Text>
              )}
            </View>

            {/* Total */}
            <View style={[styles.totalCard, { borderColor: colors.border }]}>
              <View style={[styles.totalAccent, { backgroundColor: colors.primary }]} />
              <View style={styles.totalInner}>
                <Text style={[styles.totalLabel, { color: colors.mutedForeground }]}>
                  {t(language, 'totalPrice')}
                </Text>
                <Text style={[styles.totalMeta, { color: colors.mutedForeground }]}>
                  {areaNum} {workType.unit} × {priceNum} {country?.currencySymbol}
                </Text>
              </View>
              <View style={styles.totalAmountWrap}>
                <Text style={[styles.totalValue, { color: colors.foreground }]}>{fmtTotal}</Text>
                <Text style={[styles.totalCurrency, { color: colors.primary }]}>{country?.currencySymbol}</Text>
              </View>
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

      {/* Country picker modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={[styles.modalRoot, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { borderBottomColor: colors.border, paddingTop: insets.top + 12 }]}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              {t(language, 'selectCountry')}
            </Text>
            <Pressable onPress={() => setShowCountryPicker(false)} hitSlop={8}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </Pressable>
          </View>
          <FlatList
            data={COUNTRIES}
            keyExtractor={(c) => c.code}
            renderItem={({ item: c }) => {
              const selected = c.code === countryCode;
              return (
                <Pressable
                  onPress={() => {
                    setCountryCode(c.code);
                    setShowCountryPicker(false);
                  }}
                  style={({ pressed }) => [
                    styles.countryRow,
                    {
                      backgroundColor: selected ? colors.accent : pressed ? colors.secondary : colors.card,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <View style={[styles.codeBox, { backgroundColor: selected ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.codeBoxText, { color: selected ? '#fff' : colors.foreground }]}>
                      {c.code}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.countryName, { color: colors.foreground }]}>
                      {getCountryName(c, language)}
                    </Text>
                    <Text style={[styles.countryCurrency, { color: colors.mutedForeground }]}>
                      {c.currencyCode} · {c.currencySymbol}
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
  countryPill: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, gap: 5,
  },
  pillCode: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  pillSymbol: { fontSize: 12, fontFamily: 'Inter_500Medium' },
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
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 14, marginTop: 12,
    overflow: 'hidden',
  },
  totalAccent: { width: 3, alignSelf: 'stretch' },
  totalInner: { flex: 1, paddingVertical: 16, paddingHorizontal: 14, gap: 3 },
  totalLabel: { fontSize: 10, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.8 },
  totalMeta: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  totalAmountWrap: { flexDirection: 'row', alignItems: 'baseline', paddingRight: 16, gap: 4 },
  totalValue: { fontSize: 32, fontFamily: 'Inter_700Bold' },
  totalCurrency: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
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
  countryRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: 14, borderRadius: 12, borderWidth: 1.5, marginBottom: 8, gap: 12,
  },
  codeBox: { width: 46, height: 46, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  codeBoxText: { fontSize: 13, fontFamily: 'Inter_700Bold' },
  countryName: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  countryCurrency: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
});
