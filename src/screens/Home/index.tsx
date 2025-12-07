import React, { useCallback, useMemo } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';

import { FAB } from '@/components/buttons/FAB';
import useHydration from '@/hooks/useHydration';
import { RecipeBeanList } from '@/screens/Home/components/RecipeBeanList';
import { useAppStore } from '@/store/appStore';
import { theme } from '@theme';

const Home = () => {
  const router = useRouter();
  const hasHydrated = useHydration();
  const beans = useAppStore((state) => state.beans);
  const recipes = useAppStore((state) => state.recipes);

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

  return (
    <>
      <RecipeBeanList
        beans={beans}
        recipes={recipes}
        isLoading={isLoading}
        error={null}
        onItemPress={handleItemPress}
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
  content: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: theme.metrics.spacing.xl,
    right: theme.metrics.spacing.xl,
  },
});
