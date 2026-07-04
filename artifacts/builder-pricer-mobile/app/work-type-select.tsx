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

// Accent colours per category — maps to CATEGORY_ORDER (13 categories)
const CAT_COLORS = [
  '#F97316', // prep              — orange
  '#3B82F6', // walls-ceilings    — blue
  '#8B5CF6', // drywall           — violet
  '#84CC16', // flooring          — lime
  '#06B6D4', // tiling            — cyan
  '#F43F5E', // bathroom          — rose
  '#F59E0B', // kitchen           — amber
  '#A855F7', // carpentry         — purple
  '#EAB308', // electrical        — yellow
  '#0EA5E9', // plumbing          — sky
  '#EC4899', // decorative        — pink
  '#64748B', // assembly          — slate
  '#6366F1', // finishing         — indigo
];

export default function WorkTypeSelectScreen() {
  const { language } = useApp();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const [query, setQuery]           = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  const byCategory = useMemo(() => getWorkTypesByCategory(), []);

  // Build category cards
  const categories = useMemo(() =>
    CATEGORY_ORDER
      .filter((slug) => byCategory[slug]?.length)
      .map((slug, i) => ({
        slug,
        name: tCategory(language, slug),
        emoji: byCategory[slug][0].emoji,
        count: byCategory[slug].length,
        color: CAT_COLORS[i % CAT_COLORS.length],
      })),
    [language, byCategory],
  );

  // Items visible in the selected category (or search results)
  const visibleItems = useMemo(() => {
    if (query.trim()) {
      const q = query.toLowerCase();
      return WORK_TYPES.filter((wt) => {
        const name = (wt.translations[language]?.name ?? wt.translations['en']?.name ?? '').toLowerCase();
        const cat  = (wt.translations[language]?.categoryName ?? '').toLowerCase();
        return name.includes(q) || cat.includes(q);
      });
    }
    if (selectedCat) return byCategory[selectedCat] ?? [];
    return [];
  }, [query, selectedCat, language, byCategory]);

  const isSearching = query.trim().length > 0;

  const handleSelect = (wt: WorkType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPendingWorkTypeId(wt.id);
    router.back();
  };

  const handleBack = () => {
    if (isSearching) { setQuery(''); return; }   // clear search → back to grid/category
    if (selectedCat) { setSelectedCat(null); return; }
    router.back();
  };

  // ── Render helpers ──────────────────────────────────────────────────────────

  const renderWorkItem = ({ item: wt }: { item: WorkType }) => {
    const name = wt.translations[language]?.name ?? wt.translations['en']?.name ?? wt.slug;
    const catName = isSearching ? tCategory(language, wt.categorySlug) : null;
    return (
      <Pressable
        onPress={() => handleSelect(wt)}
        style={({ pressed }) => [
          styles.workItem,
          { backgroundColor: pressed ? colors.accent : colors.card, borderColor: colors.border },
        ]}
      >
        <View style={[styles.workItemIcon, { backgroundColor: colors.accent }]}>
          <Text style={styles.workItemEmoji}>{wt.emoji}</Text>
        </View>
        <View style={styles.workItemText}>
          <Text style={[styles.workItemName, { color: colors.foreground }]} numberOfLines={2}>{name}</Text>
          {catName && (
            <Text style={[styles.workItemCat, { color: colors.mutedForeground }]}>{catName}</Text>
          )}
        </View>
        <View style={[styles.unitBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.unitText, { color: colors.mutedForeground }]}>{wt.unit}</Text>
        </View>
        <Ionicons name="chevron-forward" size={14} color={colors.mutedForeground} />
      </Pressable>
    );
  };

  const renderCategoryCard = ({ item: cat, index }: { item: typeof categories[0]; index: number }) => (
    <Pressable
      onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setSelectedCat(cat.slug); }}
      style={({ pressed }) => [
        styles.catCard,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
        index % 2 === 0 ? { marginRight: 6 } : { marginLeft: 6 },
      ]}
    >
      {/* Colour bar */}
      <View style={[styles.catBar, { backgroundColor: cat.color }]} />
      <View style={styles.catCardBody}>
        <Text style={styles.catEmoji}>{cat.emoji}</Text>
        <Text style={[styles.catName, { color: colors.foreground }]} numberOfLines={2}>{cat.name}</Text>
        <Text style={[styles.catCount, { color: colors.mutedForeground }]}>{cat.count} usług</Text>
      </View>
    </Pressable>
  );

  // ── Header title & back behaviour ──────────────────────────────────────────

  const headerTitle = isSearching
    ? t(language, 'selectWorkType')
    : selectedCat
      ? tCategory(language, selectedCat)
      : t(language, 'selectWorkType');

  const showBack = selectedCat !== null && !isSearching;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>

      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 12, backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={handleBack}
          style={styles.backBtn}
          hitSlop={8}
        >
          <Ionicons
            name={showBack ? 'arrow-back' : 'close'}
            size={24}
            color={colors.foreground}
          />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.foreground }]} numberOfLines={1}>
          {headerTitle}
        </Text>
        <View style={{ width: 32 }} />
      </View>

      {/* Search */}
      <View style={[styles.searchRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <Ionicons name="search-outline" size={18} color={colors.mutedForeground} style={{ marginLeft: 14 }} />
        <TextInput
          value={query}
          onChangeText={(v) => { setQuery(v); if (v) setSelectedCat(null); }}
          placeholder={t(language, 'selectWorkType') + '...'}
          placeholderTextColor={colors.mutedForeground}
          style={[styles.searchInput, { color: colors.foreground }]}
          returnKeyType="search"
          clearButtonMode="while-editing"
          autoCorrect={false}
        />
      </View>

      {/* Category grid OR item list.
          Each FlatList gets a stable key so React fully remounts when
          switching modes — required because numColumns cannot change on the fly. */}
      {!isSearching && !selectedCat ? (
        /* ── Step 1: Category grid ── */
        <FlatList
          key="category-grid"
          data={categories}
          keyExtractor={(c) => c.slug}
          renderItem={renderCategoryCard}
          numColumns={2}
          contentContainerStyle={styles.catGrid}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <Text style={[styles.gridLabel, { color: colors.mutedForeground }]}>
              Wybierz kategorię
            </Text>
          }
        />
      ) : (
        /* ── Step 2: Work item list (selected category or search results) ── */
        <FlatList
          key="item-list"
          data={visibleItems}
          keyExtractor={(wt) => wt.id}
          renderItem={renderWorkItem}
          contentContainerStyle={styles.itemList}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Brak wyników</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  // Header
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

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingRight: 14,
    height: 48,
  },
  searchInput: { flex: 1, height: 48, paddingHorizontal: 10, fontSize: 16, fontFamily: 'Inter_400Regular' },

  // Category grid
  catGrid: { padding: 16, paddingBottom: 40 },
  gridLabel: { fontSize: 11, fontFamily: 'Inter_600SemiBold', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 12 },
  catCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: 'hidden',
    minHeight: 130,
  },
  catBar: { height: 5 },
  catCardBody: { padding: 14, gap: 6 },
  catEmoji: { fontSize: 32 },
  catName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', lineHeight: 18, marginTop: 2 },
  catCount: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 2 },

  // Work item list
  itemList: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 40 },
  workItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    gap: 10,
  },
  workItemIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  workItemEmoji: { fontSize: 20 },
  workItemText: { flex: 1 },
  workItemName: { fontSize: 14, fontFamily: 'Inter_500Medium', lineHeight: 19 },
  workItemCat: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 1 },
  unitBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, flexShrink: 0 },
  unitText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },

  // Empty / error
  empty: { paddingTop: 60, alignItems: 'center' },
  emptyText: { fontSize: 15, fontFamily: 'Inter_400Regular' },
});
