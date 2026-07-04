import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

export interface PickerItem {
  value: string;
  label: string;
  sublabel?: string;
  badge?: string;
}

interface Props {
  visible: boolean;
  title: string;
  items: PickerItem[];
  selected: string;
  searchPlaceholder?: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export function SelectPickerModal({
  visible, title, items, selected,
  searchPlaceholder = 'Szukaj…', onSelect, onClose,
}: Props) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');

  // Reset search when modal opens
  useEffect(() => {
    if (visible) setQuery('');
  }, [visible]);

  const filtered = query.trim()
    ? items.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        (i.sublabel ?? '').toLowerCase().includes(query.toLowerCase()) ||
        (i.badge ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* Sheet */}
      <View
        style={[
          styles.sheet,
          { backgroundColor: colors.background, paddingBottom: insets.bottom + 16 },
        ]}
      >
        {/* Drag handle */}
        <View style={[styles.handle, { backgroundColor: colors.border }]} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
          <Pressable onPress={onClose} hitSlop={12}>
            <Ionicons name="close" size={22} color={colors.mutedForeground} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
          <Ionicons name="search-outline" size={16} color={colors.mutedForeground} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={searchPlaceholder}
            placeholderTextColor={colors.mutedForeground}
            style={[styles.searchInput, { color: colors.foreground }]}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Ionicons name="close-circle" size={16} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>

        {/* Items */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.value}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = item.value === selected;
            return (
              <Pressable
                onPress={() => { onSelect(item.value); onClose(); }}
                style={({ pressed }) => [
                  styles.item,
                  { backgroundColor: pressed ? colors.secondary : 'transparent' },
                ]}
              >
                {item.badge != null && (
                  <View style={[styles.badge, { backgroundColor: isSelected ? colors.primary : colors.secondary }]}>
                    <Text style={[styles.badgeText, { color: isSelected ? '#fff' : colors.mutedForeground }]}>
                      {item.badge}
                    </Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.itemLabel, { color: colors.foreground }]}>{item.label}</Text>
                  {item.sublabel != null && (
                    <Text style={[styles.itemSublabel, { color: colors.mutedForeground }]}>{item.sublabel}</Text>
                  )}
                </View>
                {isSelected
                  ? <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                  : <View style={[styles.emptyCheck, { borderColor: colors.border }]} />}
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => (
            <View style={[styles.sep, { backgroundColor: colors.border }]} />
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    maxHeight: '82%',
    // Android elevation for shadow
    elevation: 24,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
  },
  handle: {
    width: 36, height: 4, borderRadius: 2,
    alignSelf: 'center', marginTop: 10, marginBottom: 2,
  },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  title: { fontSize: 17, fontFamily: 'Inter_600SemiBold' },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 16, marginBottom: 10,
    paddingHorizontal: 12, paddingVertical: 9,
    borderRadius: 10, borderWidth: 1, gap: 8,
  },
  searchInput: {
    flex: 1, fontSize: 15, fontFamily: 'Inter_400Regular', padding: 0,
  },
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 13, gap: 12,
  },
  badge: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { fontSize: 11, fontFamily: 'Inter_700Bold' },
  itemLabel: { fontSize: 15, fontFamily: 'Inter_500Medium' },
  itemSublabel: { fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 1 },
  sep: { height: 1, marginHorizontal: 20 },
  emptyCheck: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5 },
});
