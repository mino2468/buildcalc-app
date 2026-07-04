import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';
import { WORK_TYPES, CATEGORY_ORDER, getWorkTypesByCategory } from '@/data/workTypes';
import { tCategory, t } from '@/data/translations';
import { setPendingWorkTypeId } from '@/utils/calcStore';
import type { WorkType } from '@/types';

export default function WorkTypeSelectScreen() {
  const { language } = useApp();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return WORK_TYPES.filter((wt) => {
      const name = (wt.translations[language]?.name ?? wt.translations['en']?.name ?? '').toLowerCase();
      const cat = (wt.translations[language]?.categoryName ?? '').toLowerCase();
      return name.includes(q) || cat.includes(q);
    });
  }, [query, language]);

  const sections = useMemo(() => {
    if (filteredItems) return [];
    const byCategory = getWorkTypesByCategory();
    return CATEGORY_ORDER
      .filter((cat) => byCategory[cat]?.length)
      .map((cat) => ({
        categorySlug: cat,
        categoryName: tCategory(language, cat),
        items: byCategory[cat],
      }));
  }, [filteredItems, language]);

  const handleSelect = (wt: WorkType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPendingWorkTypeId(wt.id);
    router.back();
  };

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const renderItem = (wt: WorkType) => {
    const name = wt.translations[language]?.name ?? wt.translations['en']?.name ?? wt.slug;
    const catName = tCategory(language, wt.categorySlug);
    return (
      <Pressable
        key={wt.id}
        onPress={() => handleSelect(wt)}
        style={({ pressed }) => [
          styles.item,
          { backgroundColor: pressed ? colors.accent : colors.card, borderColor: colors.border },
        ]}
      >
        <View style={[styles.iconWrap, { backgroundColor: colors.accent }]}>
          <Ionicons name={wt.iconName as any} size={20} color={colors.primary} />
        </View>
        <View style={styles.itemText}>
          <Text style={[styles.itemName, { color: colors.foreground }]} numberOfLines={2}>{name}</Text>
          <Text style={[styles.itemCat, { color: colors.mutedForeground }]}>{catName}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={colors.mutedForeground} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 12, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="close" size={24} color={colors.foreground} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]}>
          {t(language, 'selectWorkType')}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Ionicons name="search-outline" size={18} color={colors.mutedForeground} style={{ marginLeft: 14 }} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor={colors.mutedForeground}
          style={[styles.searchInput, { color: colors.foreground }]}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
      </View>

      {/* List */}
      {filteredItems ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(wt) => wt.id}
          renderItem={({ item }) => renderItem(item)}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No results</Text>
            </View>
          }
        />
      ) : (
        <FlatList
          data={sections}
          keyExtractor={(s) => s.categorySlug}
          renderItem={({ item: section }) => (
            <View>
              <View style={[styles.sectionHeader, { backgroundColor: colors.secondary }]}>
                <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>
                  {section.categoryName.toUpperCase()}
                </Text>
              </View>
              {section.items.map(renderItem)}
            </View>
          )}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    gap: 8,
  },
  backBtn: { width: 32, alignItems: 'center' },
  headerTitle: { flex: 1, fontSize: 17, fontFamily: 'Inter_600SemiBold', textAlign: 'center' },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingRight: 14,
    height: 48,
  },
  searchInput: { flex: 1, height: 48, paddingHorizontal: 10, fontSize: 16, fontFamily: 'Inter_400Regular' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40, paddingTop: 8 },
  sectionHeader: {
    paddingHorizontal: 4,
    paddingVertical: 6,
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 6,
  },
  sectionTitle: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 6,
    gap: 12,
  },
  iconWrap: { width: 36, height: 36, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  itemText: { flex: 1 },
  itemName: { fontSize: 14, fontFamily: 'Inter_500Medium', lineHeight: 18 },
  itemCat: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  empty: { paddingTop: 40, alignItems: 'center' },
  emptyText: { fontSize: 15, fontFamily: 'Inter_400Regular' },
});
