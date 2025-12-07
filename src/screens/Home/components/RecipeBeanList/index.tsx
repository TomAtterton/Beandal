import React, { useMemo } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { EmptyState } from '@/screens/Home/components/EmptyState';
import { theme } from '@theme';
import { Bean, Recipe } from '@/validation/coffeeSchemas';
import { RecipeBeanListErrorState } from './RecipeBeanListErrorState';
import { RecipeBeanListItem } from './RecipeBeanListItem';
import { RecipeBeanListShimmer } from './RecipeBeanListShimmer';

type BeanWithRecipe = {
  bean: Bean;
  recipe?: Recipe;
};

type Props = {
  beans: Bean[];
  recipes: Recipe[];
  isLoading?: boolean;
  error?: string | null;
  onItemPress?: (beanId: string, recipeId?: string) => void;
};

export const RecipeBeanList = ({
  beans,
  recipes,
  isLoading = false,
  error,
  onItemPress,
}: Props) => {
  const data = useMemo<BeanWithRecipe[]>(
    () =>
      beans.map((bean) => ({
        bean,
        recipe: recipes.find((recipe) => recipe.beanId === bean.id),
      })),
    [beans, recipes],
  );

  if (isLoading) {
    return <RecipeBeanListShimmer />;
  }

  if (error) {
    return <RecipeBeanListErrorState message={error} />;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item }) => (
        <RecipeBeanListItem bean={item.bean} recipe={item.recipe} onPress={onItemPress} />
      )}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => item.bean.id}
      ItemSeparatorComponent={() => <View style={{ height: theme.metrics.spacing.md }} />}
      contentContainerStyle={{ paddingBottom: theme.metrics.spacing.xxl }}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyState />}
    />
  );
};
