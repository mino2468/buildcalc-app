import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';
import { useColors } from '@/hooks/useColors';

export default function Index() {
  const { isLoading, hasSetLanguage } = useApp();
  const colors = useColors();

  useEffect(() => {
    if (!isLoading) {
      if (hasSetLanguage) {
        router.replace('/(tabs)');
      } else {
        router.replace('/language-select');
      }
    }
  }, [isLoading, hasSetLanguage]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
