import React from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { LANGUAGES } from '@/data/translations';
import { LANG_DEFAULT_CURRENCY } from '@/data/currencies';
import type { Language } from '@/types';

const LANG_COLORS: Record<Language, string> = {
  pl: '#DC143C', en: '#003399', de: '#000000',
  fr: '#002395', uk: '#005BBB', es: '#AA151B', cs: '#D7141A',
};

export default function LanguageSelectScreen() {
  const { setLanguage, setCurrencyCode } = useApp();
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const handleSelect = async (lang: Language) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const defaultCurrency = LANG_DEFAULT_CURRENCY[lang] ?? 'EUR';
    await Promise.all([
      setLanguage(lang),
      setCurrencyCode(defaultCurrency),
    ]);
    router.replace('/(tabs)');
  };

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topInset + 32, paddingBottom: 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoArea}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.logoText}>B</Text>
          </View>
          <Text style={[styles.appName, { color: colors.foreground }]}>BuildCalc</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Professional construction estimator
          </Text>
        </View>

        <View style={styles.grid}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => handleSelect(lang.code)}
              style={({ pressed }) => [
                styles.langCard,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  opacity: pressed ? 0.72 : 1,
                  transform: [{ scale: pressed ? 0.97 : 1 }],
                },
              ]}
            >
              <View style={[styles.langDot, { backgroundColor: LANG_COLORS[lang.code] }]} />
              <Text style={[styles.langNative, { color: colors.foreground }]}>{lang.nativeName}</Text>
              <Text style={[styles.langCode, { color: colors.mutedForeground }]}>
                {lang.code.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          You can change language later in Settings
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20 },
  logoArea: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
    shadowColor: '#EA580C', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 8,
  },
  logoText: { fontSize: 38, fontFamily: 'Inter_700Bold', color: '#fff' },
  appName: { fontSize: 32, fontFamily: 'Inter_700Bold', letterSpacing: -0.5 },
  subtitle: { fontSize: 15, fontFamily: 'Inter_400Regular', marginTop: 6, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  langCard: { width: '47%', padding: 16, borderRadius: 14, borderWidth: 1.5, gap: 8 },
  langDot: { width: 20, height: 8, borderRadius: 4 },
  langNative: { fontSize: 18, fontFamily: 'Inter_600SemiBold' },
  langCode: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  hint: { fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: 28 },
});
