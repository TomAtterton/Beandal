import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FAB } from '@/components/buttons/FAB';
import useHydration from '@/hooks/useHydration';
import { RecipeBeanList } from '@/screens/Home/components/RecipeBeanList';
import { useAppStore } from '@/store/appStore';
import { theme } from '@theme';

const Home = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const hasHydrated = useHydration();
  const beans = useAppStore((state) => state.beans);
  const recipes = useAppStore((state) => state.recipes);
  const shotResults = useAppStore((state) => state.shotResults);

  const isLoading = useMemo(() => !hasHydrated, [hasHydrated]);

  const handleAdd = useCallback(() => {
    router.push('/add-bean-recipe');
  }, [router]);

  const handleItemPress = useCallback(
    (beanId: string, recipeId?: string) => {
      const params = recipeId ? { beanId, recipeId } : { beanId };
      router.push({
        pathname: '/add-bean-recipe',
        params,
      });
    },
    [router],
  );

  const handleProfilePress = useCallback(() => {
    router.push('/settings');
  }, [router]);

  const listPaddingTop = useMemo(() => insets.top + theme.metrics.spacing.xl * 2, [insets.top]);

  return (
    <>
      <RecipeBeanList
        beans={beans}
        recipes={recipes}
        shotResults={shotResults}
        isLoading={isLoading}
        error={null}
        onItemPress={handleItemPress}
        contentContainerStyle={[styles.listContent, { paddingTop: listPaddingTop }]}
      />

      <FAB
        accessibilityLabel="Open settings"
        iconName="person-circle-outline"
        onPress={handleProfilePress}
        tintColor="transparent"
        iconColor={theme.colors.textPrimary}
        style={[styles.profileFab, { top: insets.top + theme.metrics.spacing.md }]}
      />

      <FAB accessibilityLabel="Add new item" onPress={handleAdd} style={styles.fab} />

      <StatusBar style="light" />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.metrics.spacing.xl,
    paddingVertical: theme.metrics.spacing.xl,
  },
  listContent: {
    paddingHorizontal: theme.metrics.spacing.xl,
  },
  content: {
    flex: 1,
  },
  profileFab: {
    position: 'absolute',
    right: theme.metrics.spacing.xl,
  },
  fab: {
    position: 'absolute',
    bottom: theme.metrics.spacing.xl,
    right: theme.metrics.spacing.xl,
  },
});
