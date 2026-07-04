import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardTypeOptions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useCompany } from '@/context/CompanyContext';
import { useColors } from '@/hooks/useColors';
import { LANGUAGES, t } from '@/data/translations';
import { COUNTRIES, getCountryName } from '@/data/countries';
import { SelectPickerModal } from '@/components/SelectPickerModal';
import type { Language } from '@/types';

type Colors = ReturnType<typeof useColors>;

export default function SettingsScreen() {
  const { language, countryCode, setLanguage, setCountryCode } = useApp();
  const { company, updateCompany } = useCompany();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [langModal, setLangModal]       = useState(false);
  const [countryModal, setCountryModal] = useState(false);

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;

  const currentLang    = LANGUAGES.find((l) => l.code === language);
  const currentCountry = COUNTRIES.find((c) => c.code === countryCode);

  const handleLang = async (lang: Language) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setLanguage(lang);
  };

  const handleCountry = async (code: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setCountryCode(code);
  };

  const handlePickLogo = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      const uri = asset.base64
        ? `data:image/jpeg;base64,${asset.base64}`
        : asset.uri;
      await updateCompany({ logoUri: uri });
    }
  };

  const langItems = LANGUAGES.map((l) => ({
    value: l.code,
    label: l.nativeName,
    sublabel: l.label,
    badge: l.code.toUpperCase(),
  }));

  const countryItems = COUNTRIES.map((c) => ({
    value: c.code,
    label: getCountryName(c, language),
    sublabel: `${c.currencyCode} · ${c.currencySymbol}`,
    badge: c.code,
  }));

  return (
    <>
      <ScrollView
        style={[styles.root, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.scroll, { paddingTop: topPad, paddingBottom: insets.bottom + 90 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.pageTitle, { color: colors.foreground }]}>
          {t(language, 'settings')}
        </Text>

        {/* ── Language ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            {t(language, 'language').toUpperCase()}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Pressable
              onPress={() => setLangModal(true)}
              style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.secondary : 'transparent' }]}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.badgeText, { color: '#fff' }]}>
                    {language.toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.rowPrimary, { color: colors.foreground }]}>
                    {currentLang?.nativeName ?? language}
                  </Text>
                  <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                    {currentLang?.label ?? ''}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
            </Pressable>
          </View>
        </View>

        {/* ── Country / currency ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            {t(language, 'country').toUpperCase()}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Pressable
              onPress={() => setCountryModal(true)}
              style={({ pressed }) => [styles.row, { backgroundColor: pressed ? colors.secondary : 'transparent' }]}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.badgeText, { color: '#fff' }]}>
                    {countryCode}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.rowPrimary, { color: colors.foreground }]}>
                    {currentCountry ? getCountryName(currentCountry, language) : countryCode}
                  </Text>
                  <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                    {currentCountry ? `${currentCountry.currencyCode} · ${currentCountry.currencySymbol}` : ''}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
            </Pressable>
          </View>
        </View>

        {/* ── Company info ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            {t(language, 'companyInfo').toUpperCase()}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {/* Logo */}
            <View style={styles.logoRow}>
              <Pressable
                onPress={handlePickLogo}
                style={({ pressed }) => [styles.logoBox, { borderColor: colors.border, opacity: pressed ? 0.7 : 1 }]}
              >
                {company.logoUri ? (
                  <Image source={{ uri: company.logoUri }} style={styles.logoImage} resizeMode="contain" />
                ) : (
                  <>
                    <Ionicons name="image-outline" size={28} color={colors.mutedForeground} />
                    <Text style={[styles.logoHint, { color: colors.mutedForeground }]}>
                      {t(language, 'addLogo')}
                    </Text>
                  </>
                )}
              </Pressable>
              <View style={{ flex: 1, gap: 6 }}>
                <Text style={[styles.rowPrimary, { color: colors.foreground }]}>
                  {t(language, 'companyLogo')}
                </Text>
                <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                  {company.logoUri ? t(language, 'changeLogo') : t(language, 'addLogo')}
                </Text>
                {company.logoUri && (
                  <Pressable onPress={() => updateCompany({ logoUri: '' })}>
                    <Text style={[styles.rowSecondary, { color: colors.destructive }]}>✕ Usuń</Text>
                  </Pressable>
                )}
              </View>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <CompanyField label={t(language, 'companyName')} value={company.name}
              placeholder={t(language, 'companyNamePlaceholder')}
              onChangeText={(v) => updateCompany({ name: v })} colors={colors} icon="business-outline" />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <CompanyField label={t(language, 'companyAddress')} value={company.address}
              placeholder={t(language, 'companyAddressPlaceholder')}
              onChangeText={(v) => updateCompany({ address: v })} colors={colors} icon="location-outline" />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <CompanyField label={t(language, 'companyPhone')} value={company.phone}
              placeholder={t(language, 'companyPhonePlaceholder')}
              onChangeText={(v) => updateCompany({ phone: v })} colors={colors} icon="call-outline"
              keyboardType="phone-pad" />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <CompanyField label={t(language, 'companyEmail')} value={company.email}
              placeholder={t(language, 'companyEmailPlaceholder')}
              onChangeText={(v) => updateCompany({ email: v })} colors={colors} icon="mail-outline"
              keyboardType="email-address" />
          </View>
        </View>

        {/* ── About ── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
            {t(language, 'about').toUpperCase()}
          </Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.aboutRow}>
              <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
                <Text style={styles.appIconText}>B</Text>
              </View>
              <View>
                <Text style={[styles.rowPrimary, { color: colors.foreground }]}>BuildCalc</Text>
                <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                  {t(language, 'version')} 1.1.0
                </Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.row}>
              <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                15 · 13 {t(language, 'country').toLowerCase()} · 7 {t(language, 'language').toLowerCase()}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Modals ── */}
      <SelectPickerModal
        visible={langModal}
        title={t(language, 'chooseLanguage')}
        items={langItems}
        selected={language}
        searchPlaceholder="Polski, English…"
        onSelect={(v) => handleLang(v as Language)}
        onClose={() => setLangModal(false)}
      />

      <SelectPickerModal
        visible={countryModal}
        title={t(language, 'selectCountry')}
        items={countryItems}
        selected={countryCode}
        searchPlaceholder="Polska, Germany…"
        onSelect={(v) => handleCountry(v)}
        onClose={() => setCountryModal(false)}
      />
    </>
  );
}

function CompanyField({ label, value, placeholder, onChangeText, colors, icon, keyboardType = 'default' }: {
  label: string; value: string; placeholder: string;
  onChangeText: (v: string) => void; colors: Colors; icon: string; keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <View style={styles.companyFieldRow}>
      <Ionicons name={icon as any} size={18} color={colors.mutedForeground} style={{ marginTop: 14 }} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.fieldLabel, { color: colors.mutedForeground }]}>{label}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          keyboardType={keyboardType}
          autoCapitalize="words"
          style={[styles.fieldInput, { color: colors.foreground }]}
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16 },
  pageTitle: { fontSize: 26, fontFamily: 'Inter_700Bold', marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.8, marginBottom: 8, marginLeft: 4 },
  sectionCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  divider: { height: 1, marginHorizontal: 16 },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 12, gap: 12,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowPrimary: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  rowSecondary: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  badge: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  badgeText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  logoRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 14 },
  logoBox: {
    width: 72, height: 72, borderRadius: 12, borderWidth: 1.5, borderStyle: 'dashed',
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  logoImage: { width: 72, height: 72 },
  logoHint: { fontSize: 10, fontFamily: 'Inter_400Regular', marginTop: 4, textAlign: 'center' },
  companyFieldRow: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 8, gap: 10, alignItems: 'flex-start' },
  fieldLabel: { fontSize: 10, fontFamily: 'Inter_500Medium', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 2 },
  fieldInput: { fontSize: 15, fontFamily: 'Inter_400Regular', paddingVertical: 4 },
  aboutRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14, gap: 12 },
  appIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  appIconText: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#fff' },
});
