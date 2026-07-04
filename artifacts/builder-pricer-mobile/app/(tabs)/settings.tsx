import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { LANGUAGES, t } from '@/data/translations';
import { COUNTRIES, getCountryName } from '@/data/countries';
import type { Language } from '@/types';

export default function SettingsScreen() {
  const { language, countryCode, setLanguage, setCountryCode } = useApp();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 80 : insets.top + 16;

  const handleLang = async (lang: Language) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setLanguage(lang);
  };

  const handleCountry = async (code: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setCountryCode(code);
  };

  return (
    <ScrollView
      style={[styles.root, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.scroll, { paddingTop: topPad, paddingBottom: insets.bottom + 90 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Page header */}
      <Text style={[styles.pageTitle, { color: colors.foreground }]}>
        {t(language, 'settings')}
      </Text>

      {/* Language section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
          {t(language, 'language').toUpperCase()}
        </Text>
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {LANGUAGES.map((lang, idx) => {
            const selected = lang.code === language;
            return (
              <React.Fragment key={lang.code}>
                {idx > 0 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
                <Pressable
                  onPress={() => handleLang(lang.code)}
                  style={({ pressed }) => [
                    styles.row,
                    { backgroundColor: pressed ? colors.secondary : 'transparent' },
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <View
                      style={[
                        styles.langBadge,
                        { backgroundColor: selected ? colors.primary : colors.secondary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.langBadgeText,
                          { color: selected ? '#fff' : colors.mutedForeground },
                        ]}
                      >
                        {lang.code.toUpperCase()}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.rowPrimary, { color: colors.foreground }]}>
                        {lang.nativeName}
                      </Text>
                      <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                        {lang.label}
                      </Text>
                    </View>
                  </View>
                  {selected ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  ) : (
                    <View style={[styles.emptyCheck, { borderColor: colors.border }]} />
                  )}
                </Pressable>
              </React.Fragment>
            );
          })}
        </View>
      </View>

      {/* Country (default) section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
          {t(language, 'country').toUpperCase()}
        </Text>
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {COUNTRIES.map((c, idx) => {
            const selected = c.code === countryCode;
            return (
              <React.Fragment key={c.code}>
                {idx > 0 && (
                  <View style={[styles.divider, { backgroundColor: colors.border }]} />
                )}
                <Pressable
                  onPress={() => handleCountry(c.code)}
                  style={({ pressed }) => [
                    styles.row,
                    { backgroundColor: pressed ? colors.secondary : 'transparent' },
                  ]}
                >
                  <View style={styles.rowLeft}>
                    <View
                      style={[
                        styles.codeBadge,
                        { backgroundColor: selected ? colors.primary : colors.secondary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.codeBadgeText,
                          { color: selected ? '#fff' : colors.mutedForeground },
                        ]}
                      >
                        {c.code}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.rowPrimary, { color: colors.foreground }]}>
                        {getCountryName(c, language)}
                      </Text>
                      <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                        {c.currencyCode} · {c.currencySymbol}
                      </Text>
                    </View>
                  </View>
                  {selected ? (
                    <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  ) : (
                    <View style={[styles.emptyCheck, { borderColor: colors.border }]} />
                  )}
                </Pressable>
              </React.Fragment>
            );
          })}
        </View>
      </View>

      {/* About section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
          {t(language, 'about').toUpperCase()}
        </Text>
        <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.aboutRow}>
            <View style={[styles.logoMini, { backgroundColor: colors.primary }]}>
              <Text style={styles.logoMiniText}>B</Text>
            </View>
            <View>
              <Text style={[styles.rowPrimary, { color: colors.foreground }]}>BuildCalc</Text>
              <Text style={[styles.rowSecondary, { color: colors.mutedForeground }]}>
                {t(language, 'version')} 1.0.0
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.row}>
            <Text style={[styles.rowPrimary, { color: colors.mutedForeground }]}>
              15 {t(language, 'selectWorkType').split(' ').pop()} types · 12 countries
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 16 },
  pageTitle: { fontSize: 26, fontFamily: 'Inter_700Bold', marginBottom: 24 },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: { borderRadius: 14, borderWidth: 1, overflow: 'hidden' },
  divider: { height: 1, marginHorizontal: 16 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  rowPrimary: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  rowSecondary: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  langBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  langBadgeText: { fontSize: 12, fontFamily: 'Inter_700Bold' },
  codeBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBadgeText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  emptyCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
  },
  logoMini: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoMiniText: { fontSize: 22, fontFamily: 'Inter_700Bold', color: '#fff' },
});
