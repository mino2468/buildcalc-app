import React, { useCallback, useState } from 'react';
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
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useEstimates } from '@/context/EstimatesContext';
import { useColors } from '@/hooks/useColors';
import { PriceDisplay } from '@/components/PriceDisplay';
import { getWorkTypeById } from '@/data/workTypes';
import { COUNTRIES, getCountryByCode, getCountryName } from '@/data/countries';
import { getPriceRate } from '@/data/priceRates';
import { t } from '@/data/translations';
import { pendingWorkTypeId, setPendingWorkTypeId } from '@/utils/calcStore';

export default function CalculatorScreen() {
  const { language, countryCode, setCountryCode } = useApp();
  const { addEstimate } = useEstimates();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [workTypeId, setWorkTypeId] = useState<string | null>(null);
  const [area, setArea] = useState('10');
  const [customPrice, setCustomPrice] = useState('');
  const [label, setLabel] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const workType = workTypeId ? getWorkTypeById(workTypeId) : null;
  const rate = workType ? getPriceRate(workType.id, countryCode) : null;
  const country = getCountryByCode(countryCode);

  useFocusEffect(
    useCallback(() => {
      if (pendingWorkTypeId) {
        const newId = pendingWorkTypeId;
        setPendingWorkTypeId(null);
        setWorkTypeId(newId);
        const newRate = getPriceRate(newId, countryCode);
        if (newRate) setCustomPrice(newRate.avg.toString());
        setJustSaved(false);
      }
    }, [countryCode]),
  );

  const areaNum = parseFloat(area) || 0;
  const priceNum = customPrice !== '' ? (parseFloat(customPrice) || 0) : (rate?.avg ?? 0);
  const total = areaNum * priceNum;

  const adjustArea = (delta: number) => {
    const current = parseFloat(area) || 0;
    const next = Math.max(0, current + delta);
    setArea(next % 1 === 0 ? next.toString() : next.toFixed(1));
  };

  const handleSave = () => {
    if (!workType || !country || areaNum === 0) return;
    const workTypeName =
      workType.translations[language]?.name ?? workType.translations['en']?.name ?? workType.slug;
    addEstimate({
      workTypeId: workType.id,
      workTypeName,
      workTypeIconName: workType.iconName,
      workTypeUnit: workType.unit,
      countryCode: country.code,
      countryName: getCountryName(country, language),
      area: areaNum,
      pricePerUnit: priceNum,
      totalPrice: total,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      label: label.trim(),
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setJustSaved(true);
    setLabel('');
    setTimeout(() => setJustSaved(false), 2500);
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
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad }]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Page header */}
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
            <Text style={[styles.countryPillCode, { color: colors.primary }]}>{countryCode}</Text>
            <Text style={[styles.countryPillName, { color: colors.mutedForeground }]}>
              {country ? getCountryName(country, language) : countryCode}
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
                  {t(language, 'pricePerUnit').replace('m²', workType.unit)}
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
            {/* Price range display */}
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

            {/* Area input */}
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.cardLabel, { color: colors.mutedForeground }]}>
                {t(language, 'area')}
              </Text>
              <View style={styles.areaRow}>
                <Pressable
                  onPress={() => adjustArea(-1)}
                  style={[styles.stepBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
                >
                  <Ionicons name="remove" size={20} color={colors.foreground} />
                </Pressable>
                <TextInput
                  value={area}
                  onChangeText={(v) => setArea(v.replace(/[^0-9.]/g, ''))}
                  keyboardType="decimal-pad"
                  style={[styles.areaInput, { color: colors.foreground, borderColor: colors.border }]}
                  selectTextOnFocus
                />
                <Pressable
                  onPress={() => adjustArea(1)}
                  style={[styles.stepBtn, { backgroundColor: colors.secondary, borderColor: colors.border }]}
                >
                  <Ionicons name="add" size={20} color={colors.foreground} />
                </Pressable>
              </View>
              <View style={styles.quickRow}>
                {[5, 10, 25, 50, 100].map((d) => (
                  <Pressable
                    key={d}
                    onPress={() => adjustArea(d)}
                    style={({ pressed }) => [
                      styles.quickBtn,
                      {
                        backgroundColor: pressed ? colors.primary : colors.secondary,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.quickBtnText, { color: colors.mutedForeground }]}>
                      +{d}
                    </Text>
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
            <View style={[styles.totalCard, { backgroundColor: colors.primary }]}>
              <Text style={[styles.totalLabel, { color: 'rgba(255,255,255,0.75)' }]}>
                {t(language, 'totalPrice')} · {areaNum} {workType.unit}
              </Text>
              <Text style={styles.totalValue}>
                {fmtTotal}{' '}
                <Text style={styles.totalCurrency}>{country?.currencySymbol}</Text>
              </Text>
            </View>

            {/* Save estimate */}
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
                <Ionicons
                  name={justSaved ? 'checkmark-circle' : 'bookmark-outline'}
                  size={18}
                  color="#fff"
                />
                <Text style={styles.saveBtnText}>
                  {justSaved ? t(language, 'saved') : t(language, 'saveEstimate')}
                </Text>
              </Pressable>
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
                    if (workTypeId) {
                      const r = getPriceRate(workTypeId, c.code);
                      if (r) setCustomPrice(r.avg.toString());
                    }
                    setShowCountryPicker(false);
                  }}
                  style={({ pressed }) => [
                    styles.countryRow,
                    {
                      backgroundColor: selected
                        ? colors.accent
                        : pressed
                        ? colors.secondary
                        : colors.card,
                      borderColor: selected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.countryRowCode, { color: colors.primary }]}>{c.code}</Text>
                  <Text style={[styles.countryRowName, { color: colors.foreground }]}>
                    {getCountryName(c, language)}
                  </Text>
                  <Text style={[styles.countryRowCurr, { color: colors.mutedForeground }]}>
                    {c.currencyCode} ({c.currencySymbol})
                  </Text>
                  {selected && (
                    <Ionicons name="checkmark" size={18} color={colors.primary} style={{ marginLeft: 6 }} />
                  )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  countryPillCode: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  countryPillName: { fontSize: 11, fontFamily: 'Inter_400Regular', maxWidth: 90 },
  workTypeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    gap: 12,
    marginBottom: 14,
    minHeight: 80,
  },
  wtIcon: { width: 50, height: 50, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  wtTextWrap: { flex: 1 },
  wtName: { fontSize: 15, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  wtUnit: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 },
  changeText: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  selectText: { flex: 1, fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  noRate: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
    marginBottom: 14,
  },
  noRateText: { fontSize: 13, fontFamily: 'Inter_400Regular', flex: 1 },
  card: { padding: 16, borderRadius: 14, borderWidth: 1, marginTop: 12, gap: 10 },
  cardLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5 },
  areaRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stepBtn: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'Inter_700Bold',
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
  },
  quickRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  quickBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  quickBtnText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  priceInput: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    height: 54,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    textAlign: 'center',
  },
  rangeHint: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: -4 },
  totalCard: {
    padding: 20,
    borderRadius: 16,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: '#EA580C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  totalLabel: { fontSize: 11, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  totalValue: { fontSize: 44, fontFamily: 'Inter_700Bold', color: '#fff', lineHeight: 52 },
  totalCurrency: { fontSize: 24, fontFamily: 'Inter_500Medium', color: 'rgba(255,255,255,0.78)' },
  labelInput: {
    height: 46,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: 12,
    gap: 8,
  },
  saveBtnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  modalRoot: { flex: 1 },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  modalTitle: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 8,
    gap: 10,
  },
  countryRowCode: { fontSize: 13, fontFamily: 'Inter_700Bold', width: 28 },
  countryRowName: { flex: 1, fontSize: 15, fontFamily: 'Inter_500Medium' },
  countryRowCurr: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});
