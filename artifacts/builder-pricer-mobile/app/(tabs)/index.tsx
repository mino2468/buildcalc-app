import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
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
import { useWycenas } from '@/context/WycenasContext';
import { useColors } from '@/hooks/useColors';
import { getWorkTypeById } from '@/data/workTypes';
import { getCountryByCode } from '@/data/countries';
import { getPriceRate } from '@/data/priceRates';
import { t } from '@/data/translations';
import { getPendingWorkTypeId, setPendingWorkTypeId } from '@/utils/calcStore';
import { printWycena } from '@/utils/printWycena';
import type { WycenaPosition } from '@/types';

const VAT_OPTIONS = [0, 8, 23];

export default function CalculatorScreen() {
  const { language, countryCode } = useApp();
  const { company } = useCompany();
  const { nextNumber, addWycena } = useWycenas();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    navigation.setOptions({ title: t(language, 'calculator') });
  }, [language]);

  const country = getCountryByCode(countryCode);

  // — Document state —
  const [positions, setPositions]       = useState<WycenaPosition[]>([]);
  const [clientName, setClientName]     = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [showClient, setShowClient]     = useState(false);
  const [vatRate, setVatRate]           = useState(0);
  const [savedWycena, setSavedWycena] = useState<import('@/types').Wycena | null>(null);

  // — Pending position form —
  const [pendingWTId, setPendingWTId]   = useState<string | null>(null);
  const [dim1, setDim1]                 = useState('');
  const [dim2, setDim2]                 = useState('');
  const [area, setArea]                 = useState('');
  const [price, setPrice]               = useState('');

  const pendingWT = pendingWTId ? getWorkTypeById(pendingWTId) : null;
  const rate       = pendingWT ? getPriceRate(pendingWT.id, countryCode) : null;

  // Auto-compute area from dims
  useEffect(() => {
    if (!pendingWT) return;
    const mt = pendingWT.measurementType;
    if (mt === 'linear' || mt === 'count') {
      // single-dimension: area = dim1 directly
      const d1 = parseFloat(dim1);
      if (d1 > 0) setArea(d1.toString());
    } else {
      const d1 = parseFloat(dim1), d2 = parseFloat(dim2);
      if (d1 > 0 && d2 > 0) setArea((d1 * d2).toFixed(2));
    }
  }, [dim1, dim2, pendingWT?.measurementType]);

  // Pick up pending work type from work-type-select screen
  useFocusEffect(
    useCallback(() => {
      const pending = getPendingWorkTypeId();
      if (pending) {
        setPendingWorkTypeId(null);
        setPendingWTId(pending);
        setDim1(''); setDim2(''); setArea('');
        const r = getPriceRate(pending, countryCode);
        setPrice(r ? r.avg.toString() : '');
        setSavedWycena(null);
        setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 200);
      }
    }, [countryCode]),
  );

  // — Computed totals —
  const totalNet   = positions.reduce((s, p) => s + p.totalPrice, 0);
  const totalVat   = Math.round(totalNet * vatRate / 100 * 100) / 100;
  const totalGross = totalNet + totalVat;

  const areaNum  = parseFloat(area)  || 0;
  const priceNum = parseFloat(price) || (rate?.avg ?? 0);

  // — Dim labels —
  const dim1Label = pendingWT?.measurementType === 'wall' ? t(language, 'width') : t(language, 'length');
  const dim2Label = pendingWT?.measurementType === 'wall' ? t(language, 'height') : t(language, 'width');

  // — Actions —
  const handleAddPosition = () => {
    if (!pendingWT || !country || areaNum === 0) return;
    const name = pendingWT.translations[language]?.name ?? pendingWT.translations['en']?.name ?? pendingWT.slug;
    const pos: WycenaPosition = {
      id: Date.now().toString(),
      workTypeId: pendingWT.id,
      workTypeName: name,
      workTypeEmoji: pendingWT.emoji,
      workTypeUnit: pendingWT.unit,
      area: areaNum,
      pricePerUnit: priceNum,
      totalPrice: Math.round(areaNum * priceNum * 100) / 100,
    };
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPositions((prev) => [...prev, pos]);
    setPendingWTId(null);
    setDim1(''); setDim2(''); setArea(''); setPrice('');
    setSavedWycena(null);
  };

  const handleDeletePosition = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPositions((prev) => prev.filter((p) => p.id !== id));
    setSavedWycena(null);
  };

  const handleSave = () => {
    if (!country || positions.length === 0) return;
    // addWycena returns the created document synchronously (with correct id + number)
    const created = addWycena({
      clientName, clientAddress, countryCode,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      positions, totalNet, vatRate, totalVat, totalGross,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setSavedWycena(created);
  };

  const handlePrint = async () => {
    if (!country || positions.length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Use the already-saved document if available; otherwise build a preview doc.
    // Crucially: we never use nextNumber here — it was already incremented after save.
    const doc = savedWycena ?? {
      id: 'tmp',
      number: nextNumber,
      createdAt: new Date().toISOString(),
      clientName, clientAddress, countryCode,
      currencyCode: country.currencyCode,
      currencySymbol: country.currencySymbol,
      positions, totalNet, vatRate, totalVat, totalGross,
    };
    await printWycena(doc, company);
  };

  const handleNew = () => {
    if (positions.length === 0 && !clientName) return;
    Alert.alert(t(language, 'clearEstimate'), t(language, 'confirmDelete'), [
      { text: t(language, 'cancel'), style: 'cancel' },
      {
        text: t(language, 'confirm'), style: 'destructive',
        onPress: () => {
          setPositions([]);
          setClientName('');
          setClientAddress('');
          setPendingWTId(null);
          setVatRate(0);
          setSavedWycena(null);
        },
      },
    ]);
  };

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;
  const sym = country?.currencySymbol ?? '';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad, paddingBottom: insets.bottom + 96 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* ── Header ───────────────────────────────────────── */}
        <View style={styles.pageHeader}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.pageTitle, { color: colors.foreground }]}>
              {t(language, 'estimateNo')} #{nextNumber}
            </Text>
            <Text style={[styles.pageCountry, { color: colors.mutedForeground }]}>
              {countryCode} · {sym}
            </Text>
          </View>
          {positions.length > 0 && (
            <Pressable onPress={handleNew} hitSlop={8}
              style={({ pressed }) => [styles.newBtn, { borderColor: colors.border, opacity: pressed ? 0.6 : 1 }]}>
              <Ionicons name="add-circle-outline" size={14} color={colors.mutedForeground} />
              <Text style={[styles.newBtnText, { color: colors.mutedForeground }]}>{t(language, 'clearEstimate')}</Text>
            </Pressable>
          )}
        </View>

        {/* ── Client data ──────────────────────────────────── */}
        <Pressable
          onPress={() => setShowClient((v) => !v)}
          style={[styles.clientToggle, { backgroundColor: colors.card, borderColor: colors.border }]}
        >
          <Ionicons name="person-outline" size={15} color={colors.mutedForeground} />
          <Text style={[styles.clientToggleText, { color: clientName ? colors.foreground : colors.mutedForeground }]}>
            {clientName || t(language, 'clientInfo')}
          </Text>
          <Ionicons name={showClient ? 'chevron-up' : 'chevron-down'} size={14} color={colors.mutedForeground} />
        </Pressable>
        {showClient && (
          <View style={[styles.clientForm, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput
              value={clientName}
              onChangeText={setClientName}
              placeholder={t(language, 'clientName')}
              placeholderTextColor={colors.mutedForeground}
              style={[styles.clientInput, { color: colors.foreground, borderColor: colors.border }]}
            />
            <TextInput
              value={clientAddress}
              onChangeText={setClientAddress}
              placeholder={t(language, 'clientAddress')}
              placeholderTextColor={colors.mutedForeground}
              style={[styles.clientInput, { color: colors.foreground, borderColor: colors.border }]}
            />
          </View>
        )}

        {/* ── Positions list ───────────────────────────────── */}
        {positions.length > 0 && (
          <View style={[styles.positionsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
              {t(language, 'positions')} ({positions.length})
            </Text>
            {positions.map((p, i) => (
              <View key={p.id}>
                {i > 0 && <View style={[styles.posDivider, { backgroundColor: colors.border }]} />}
                <View style={styles.posRow}>
                  <Text style={[styles.posNum, { color: colors.mutedForeground }]}>{i + 1}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.posName, { color: colors.foreground }]} numberOfLines={1}>{p.workTypeName}</Text>
                    <Text style={[styles.posMeta, { color: colors.mutedForeground }]}>
                      {p.area} {p.workTypeUnit} × {p.pricePerUnit} {sym}
                    </Text>
                  </View>
                  <Text style={[styles.posTotal, { color: colors.foreground }]}>
                    {p.totalPrice.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {sym}
                  </Text>
                  <Pressable onPress={() => handleDeletePosition(p.id)} hitSlop={10}>
                    <Ionicons name="close-circle-outline" size={20} color={colors.destructive} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ── Pending position form ────────────────────────── */}
        {pendingWT ? (
          <View style={[styles.pendingCard, { backgroundColor: colors.card, borderColor: colors.primary }]}>
            {/* Work type header */}
            <View style={styles.pendingHeader}>
              <Text style={styles.pendingEmoji}>{pendingWT.emoji}</Text>
              <Text style={[styles.pendingWTName, { color: colors.foreground }]} numberOfLines={1}>
                {pendingWT.translations[language]?.name ?? pendingWT.translations['en']?.name}
              </Text>
              <Pressable onPress={() => router.push('/work-type-select')} hitSlop={8}>
                <Text style={[styles.changeLink, { color: colors.primary }]}>{t(language, 'changeWorkType')}</Text>
              </Pressable>
            </View>

            {rate && (
              <Text style={[styles.rateHint, { color: colors.mutedForeground }]}>
                {t(language, 'priceRange')}: {rate.min}–{rate.max} {sym}
              </Text>
            )}

            {/* Dims — single input for linear/count, two-dim for floor/wall */}
            {(pendingWT.measurementType === 'linear' || pendingWT.measurementType === 'count') ? (
              <View style={styles.dimsRow}>
                <View style={[styles.dimCol, { flex: 1 }]}>
                  <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>
                    {pendingWT.measurementType === 'count'
                      ? `${t(language, 'quantity')} (${pendingWT.unit})`
                      : `${t(language, 'length')} (${pendingWT.unit})`}
                  </Text>
                  <TextInput
                    value={dim1}
                    onChangeText={(v) => { const n = v.replace(/[^0-9.]/g, ''); setDim1(n); setArea(n); }}
                    keyboardType="decimal-pad" placeholder="0"
                    placeholderTextColor={colors.mutedForeground} selectTextOnFocus
                    style={[styles.dimInput, { color: colors.foreground, borderColor: colors.border }]}
                  />
                </View>
              </View>
            ) : (
              <>
                <View style={styles.dimsRow}>
                  <View style={styles.dimCol}>
                    <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>{dim1Label} (m)</Text>
                    <TextInput
                      value={dim1} onChangeText={(v) => setDim1(v.replace(/[^0-9.]/g, ''))}
                      keyboardType="decimal-pad" placeholder="0.00"
                      placeholderTextColor={colors.mutedForeground} selectTextOnFocus
                      style={[styles.dimInput, { color: colors.foreground, borderColor: colors.border }]}
                    />
                  </View>
                  <Text style={[styles.dimMul, { color: colors.mutedForeground }]}>×</Text>
                  <View style={styles.dimCol}>
                    <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>{dim2Label} (m)</Text>
                    <TextInput
                      value={dim2} onChangeText={(v) => setDim2(v.replace(/[^0-9.]/g, ''))}
                      keyboardType="decimal-pad" placeholder="0.00"
                      placeholderTextColor={colors.mutedForeground} selectTextOnFocus
                      style={[styles.dimInput, { color: colors.foreground, borderColor: colors.border }]}
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
              </>
            )}

            {/* Area + Price row — for floor/wall also show direct area override */}
            <View style={styles.apRow}>
              {(pendingWT.measurementType === 'floor' || pendingWT.measurementType === 'wall') && (
                <View style={styles.apCol}>
                  <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>{t(language, 'area')}</Text>
                  <TextInput
                    value={area}
                    onChangeText={(v) => { setArea(v.replace(/[^0-9.]/g, '')); setDim1(''); setDim2(''); }}
                    keyboardType="decimal-pad" placeholder="0"
                    placeholderTextColor={colors.mutedForeground} selectTextOnFocus
                    style={[styles.apInput, { color: colors.foreground, borderColor: colors.border }]}
                  />
                </View>
              )}
              <View style={styles.apCol}>
                <Text style={[styles.dimLabel, { color: colors.mutedForeground }]}>
                  {t(language, 'pricePerUnit').replace('m²', pendingWT.unit)} ({sym})
                </Text>
                <TextInput
                  value={price} onChangeText={setPrice}
                  keyboardType="decimal-pad" placeholder={rate?.avg.toString() ?? '0'}
                  placeholderTextColor={colors.mutedForeground} selectTextOnFocus
                  style={[styles.apInput, { color: colors.foreground, borderColor: colors.border }]}
                />
              </View>
            </View>

            {/* Row total preview */}
            {areaNum > 0 && (
              <View style={[styles.rowTotalBar, { borderColor: colors.border }]}>
                <Text style={[styles.rowTotalLabel, { color: colors.mutedForeground }]}>
                  {areaNum} × {priceNum} {sym}
                </Text>
                <Text style={[styles.rowTotalValue, { color: colors.foreground }]}>
                  = {(areaNum * priceNum).toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {sym}
                </Text>
              </View>
            )}

            <Pressable
              onPress={handleAddPosition}
              disabled={areaNum === 0}
              style={({ pressed }) => [
                styles.addPosBtn,
                { backgroundColor: colors.primary, opacity: pressed ? 0.85 : areaNum === 0 ? 0.45 : 1 },
              ]}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addPosBtnText}>{t(language, 'addToEstimate')}</Text>
            </Pressable>
          </View>
        ) : (
          /* ── Add position button ───────────────────────── */
          <Pressable
            onPress={() => router.push('/work-type-select')}
            style={({ pressed }) => [
              styles.addBtn,
              { borderColor: colors.primary, backgroundColor: colors.accent, opacity: pressed ? 0.75 : 1 },
            ]}
          >
            <View style={[styles.addBtnIcon, { backgroundColor: colors.primary }]}>
              <Ionicons name="add" size={24} color="#fff" />
            </View>
            <Text style={[styles.addBtnText, { color: colors.primary }]}>{t(language, 'addPosition')}</Text>
          </Pressable>
        )}

        {/* ── Summary ──────────────────────────────────────── */}
        {positions.length > 0 && (
          <>
            <View style={[styles.summaryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
                {t(language, 'vatRate')}
              </Text>
              <View style={styles.vatRow}>
                {VAT_OPTIONS.map((v) => (
                  <Pressable
                    key={v}
                    onPress={() => setVatRate(v)}
                    style={({ pressed }) => [
                      styles.vatChip,
                      {
                        backgroundColor: vatRate === v ? colors.primary : pressed ? colors.secondary : colors.background,
                        borderColor: vatRate === v ? colors.primary : colors.border,
                      },
                    ]}
                  >
                    <Text style={[styles.vatChipText, { color: vatRate === v ? '#fff' : colors.foreground }]}>
                      {v === 0 ? t(language, 'noVat') : `${v}%`}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={[styles.totalsBlock, { borderTopColor: colors.border }]}>
                <View style={styles.totalRow}>
                  <Text style={[styles.totalLabel, { color: colors.mutedForeground }]}>{t(language, 'totalNet')}</Text>
                  <Text style={[styles.totalValue, { color: colors.foreground }]}>
                    {totalNet.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {sym}
                  </Text>
                </View>
                {vatRate > 0 && (
                  <View style={styles.totalRow}>
                    <Text style={[styles.totalLabel, { color: colors.mutedForeground }]}>VAT {vatRate}%</Text>
                    <Text style={[styles.totalValue, { color: colors.mutedForeground }]}>
                      {totalVat.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {sym}
                    </Text>
                  </View>
                )}
                <View style={[styles.totalRow, styles.grossRow]}>
                  <Text style={[styles.totalLabel, { color: colors.foreground, fontFamily: 'Inter_700Bold' }]}>
                    {vatRate > 0 ? t(language, 'totalGross') : t(language, 'totalNet')}
                  </Text>
                  <Text style={[styles.grossValue, { color: colors.primary }]}>
                    {totalGross.toLocaleString('pl-PL', { maximumFractionDigits: 0 })} {sym}
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsRow}>
              <Pressable
                onPress={handleSave}
                style={({ pressed }) => [
                  styles.saveBtn,
                  { backgroundColor: savedWycena ? colors.success : colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Ionicons name={savedWycena ? 'checkmark-circle' : 'save-outline'} size={18} color="#fff" />
                <Text style={styles.saveBtnText}>
                  {savedWycena ? t(language, 'saved') : t(language, 'saveEstimate')}
                </Text>
              </Pressable>
              <Pressable
                onPress={handlePrint}
                style={({ pressed }) => [
                  styles.printBtn,
                  { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <Ionicons name="print-outline" size={18} color={colors.foreground} />
                <Text style={[styles.printBtnText, { color: colors.foreground }]}>{t(language, 'printEstimate')}</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 16 },

  pageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 10 },
  pageTitle:  { fontSize: 22, fontFamily: 'Inter_700Bold' },
  pageCountry:{ fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  newBtn:     { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  newBtnText: { fontSize: 11, fontFamily: 'Inter_500Medium' },

  clientToggle: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 8 },
  clientToggleText: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  clientForm:  { padding: 12, borderRadius: 10, borderWidth: 1, marginBottom: 8, gap: 8 },
  clientInput: { height: 42, borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, fontSize: 14, fontFamily: 'Inter_400Regular' },

  positionsCard: { borderRadius: 14, borderWidth: 1, marginBottom: 10, padding: 14, gap: 0 },
  sectionLabel:  { fontSize: 10, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 8 },
  posRow:  { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  posDivider: { height: 1 },
  posNum:  { width: 20, fontSize: 12, fontFamily: 'Inter_500Medium', textAlign: 'center' },
  posName: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  posMeta: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 1 },
  posTotal:{ fontSize: 13, fontFamily: 'Inter_600SemiBold', minWidth: 72, textAlign: 'right' },

  pendingCard: { borderRadius: 14, borderWidth: 2, marginBottom: 10, padding: 14, gap: 12 },
  pendingHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pendingEmoji: { fontSize: 20 },
  pendingWTName: { flex: 1, fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  changeLink:    { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  rateHint:      { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: -6 },

  dimsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  dimCol:  { flex: 1, gap: 4 },
  dimLabel:{ fontSize: 11, fontFamily: 'Inter_500Medium' },
  dimInput:{ height: 48, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, fontSize: 20, fontFamily: 'Inter_700Bold', textAlign: 'center' },
  dimMul:  { fontSize: 22, fontFamily: 'Inter_700Bold', paddingBottom: 10 },
  dimResult: { paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  dimResultText: { fontSize: 16, fontFamily: 'Inter_700Bold' },

  apRow:   { flexDirection: 'row', gap: 10 },
  apCol:   { flex: 1, gap: 4 },
  apInput: { height: 48, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, fontSize: 18, fontFamily: 'Inter_700Bold', textAlign: 'center' },

  rowTotalBar:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, paddingTop: 10, marginTop: -4 },
  rowTotalLabel: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  rowTotalValue: { fontSize: 16, fontFamily: 'Inter_700Bold' },

  addPosBtn:     { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 48, borderRadius: 10, gap: 6 },
  addPosBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },

  addBtn:     { flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderStyle: 'dashed', borderRadius: 14, padding: 16, gap: 12, marginBottom: 10 },
  addBtnIcon: { width: 44, height: 44, borderRadius: 11, justifyContent: 'center', alignItems: 'center' },
  addBtnText: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },

  summaryCard:  { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 10, gap: 12 },
  vatRow:       { flexDirection: 'row', gap: 8 },
  vatChip:      { flex: 1, height: 38, borderRadius: 8, borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  vatChipText:  { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  totalsBlock:  { borderTopWidth: 1, paddingTop: 12, gap: 6 },
  totalRow:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel:   { fontSize: 14, fontFamily: 'Inter_400Regular' },
  totalValue:   { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  grossRow:     { marginTop: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: 'transparent' },
  grossValue:   { fontSize: 24, fontFamily: 'Inter_700Bold' },

  actionsRow:   { flexDirection: 'row', gap: 10, marginBottom: 8 },
  saveBtn:      { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 12, gap: 7 },
  saveBtnText:  { fontSize: 15, fontFamily: 'Inter_600SemiBold', color: '#fff' },
  printBtn:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, borderRadius: 12, borderWidth: 1.5, paddingHorizontal: 16, gap: 6 },
  printBtnText: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
});
