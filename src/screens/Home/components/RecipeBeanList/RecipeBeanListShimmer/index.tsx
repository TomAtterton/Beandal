import React, { useMemo } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

import { theme } from '@theme';
import { RecipeBeanListShimmerItem } from './RecipeBeanListShimmerItem';

export const RecipeBeanListShimmer = () => {
  const placeholders = useMemo(() => Array.from({ length: 6 }, (_, index) => index), []);

  return (
    <FlashList
      data={placeholders}
      renderItem={() => <RecipeBeanListShimmerItem />}
      keyExtractor={(item) => `placeholder-${item}`}
      contentInsetAdjustmentBehavior="automatic"
      ItemSeparatorComponent={() => <View style={{ height: theme.metrics.spacing.md }} />}
      contentContainerStyle={{ paddingBottom: theme.metrics.spacing.xxl }}
      showsVerticalScrollIndicator={false}
    />
  );
};
