import React, { useMemo } from 'react';
import { View } from 'react-native';
import { FlashList, FlashListProps } from '@shopify/flash-list';

import { EmptyState } from '@/screens/Home/components/EmptyState';
import { theme } from '@theme';
import { Bean, Recipe, ShotResult } from '@/validation/coffeeSchemas';
import { RecipeBeanListErrorState } from './RecipeBeanListErrorState';
import { RecipeBeanListItem } from './RecipeBeanListItem';
import { RecipeBeanListShimmer } from './RecipeBeanListShimmer';

type BeanWithRecipe = {
  bean: Bean;
  recipe?: Recipe;
  shotResult?: ShotResult;
};

type Props = {
  beans: Bean[];
  recipes: Recipe[];
  shotResults: ShotResult[];
  isLoading?: boolean;
  error?: string | null;
  onItemPress?: (beanId: string, recipeId?: string) => void;
  contentContainerStyle?: FlashListProps<BeanWithRecipe>['contentContainerStyle'];
};

export const RecipeBeanList = ({
  beans,
  recipes,
  shotResults,
  isLoading = false,
  error,
  onItemPress,
  contentContainerStyle,
}: Props) => {
  const estimatedItemHeight = 140;

  const recipeByBeanId = useMemo(() => {
    const map = new Map<string, Recipe>();
    recipes.forEach((recipe) => {
      map.set(recipe.beanId, recipe);
    });
    return map;
  }, [recipes]);

  const shotResultByRecipeId = useMemo(() => {
    const map = new Map<string, ShotResult>();
    shotResults.forEach((shotResult) => {
      map.set(shotResult.recipeId, shotResult);
    });
    return map;
  }, [shotResults]);

  const data = useMemo<BeanWithRecipe[]>(
    () =>
      beans.map((bean) => {
        const recipe = recipeByBeanId.get(bean.id);
        return {
          bean,
          recipe,
          shotResult: recipe ? shotResultByRecipeId.get(recipe.id) : undefined,
        };
      }),
    [beans, recipeByBeanId, shotResultByRecipeId],
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
        <RecipeBeanListItem
          bean={item.bean}
          recipe={item.recipe}
          shotResult={item.shotResult}
          onPress={onItemPress}
        />
      )}
      contentInsetAdjustmentBehavior="automatic"
      keyExtractor={(item) => item.bean.id}
      ItemSeparatorComponent={() => <View style={{ height: theme.metrics.spacing.md }} />}
      contentContainerStyle={[{ paddingBottom: theme.metrics.spacing.xxl }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyState />}
      overrideItemLayout={(layout) => {
        (layout as { size?: number }).size = estimatedItemHeight;
      }}
    />
  );
};
