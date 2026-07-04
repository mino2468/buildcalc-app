import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import type { WorkType } from '@/types';
import type { Language } from '@/types';
import { tCategory } from '@/data/translations';

interface Props {
  workType: WorkType;
  lang: Language;
  onPress?: () => void;
  selected?: boolean;
  compact?: boolean;
}

export function WorkTypeCard({ workType, lang, onPress, selected, compact }: Props) {
  const colors = useColors();
  const name = workType.translations[lang]?.name ?? workType.translations['en']?.name ?? workType.slug;
  const catName = tCategory(lang, workType.categorySlug);

  if (compact) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.compactCard,
          {
            backgroundColor: selected ? colors.accent : colors.card,
            borderColor: selected ? colors.primary : colors.border,
            opacity: pressed ? 0.75 : 1,
          },
        ]}
      >
        <View style={[styles.compactIconWrap, { backgroundColor: selected ? colors.primary : colors.secondary }]}>
          <Ionicons
            name={workType.iconName as any}
            size={20}
            color={selected ? colors.primaryForeground : colors.primary}
          />
        </View>
        <View style={styles.compactText}>
          <Text style={[styles.compactName, { color: colors.foreground }]} numberOfLines={2}>{name}</Text>
          <Text style={[styles.compactCat, { color: colors.mutedForeground }]}>{catName}</Text>
        </View>
        {selected && (
          <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={{ marginLeft: 4 }} />
        )}
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border, opacity: pressed ? 0.75 : 1 },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: colors.accent }]}>
        <Ionicons name={workType.iconName as any} size={28} color={colors.primary} />
      </View>
      <View style={styles.textWrap}>
        <Text style={[styles.name, { color: colors.foreground }]} numberOfLines={2}>{name}</Text>
        <View style={[styles.catBadge, { backgroundColor: colors.secondary }]}>
          <Text style={[styles.catText, { color: colors.mutedForeground }]}>{catName}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    marginBottom: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: { flex: 1, gap: 4 },
  name: { fontSize: 15, fontFamily: 'Inter_600SemiBold', lineHeight: 20 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  catText: { fontSize: 11, fontFamily: 'Inter_500Medium' },
  // compact
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    gap: 10,
    marginBottom: 6,
  },
  compactIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactText: { flex: 1 },
  compactName: { fontSize: 14, fontFamily: 'Inter_600SemiBold', lineHeight: 18 },
  compactCat: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 1 },
});
