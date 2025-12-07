import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '@theme';
import { ShimmerBlock } from './ShimmerBlock';

const IMAGE_SIZE = 72;

export const RecipeBeanListShimmerItem = () => {
  return (
    <View style={styles.container}>
      <ShimmerBlock height={IMAGE_SIZE} width={IMAGE_SIZE} radius={theme.metrics.radius.md} />
      <View style={styles.body}>
        <ShimmerBlock height={16} width="70%" />
        <ShimmerBlock height={12} width="40%" />
        <ShimmerBlock height={12} width="90%" />
        <View style={styles.metricsRow}>
          <ShimmerBlock height={20} width={70} />
          <ShimmerBlock height={20} width={70} />
          <ShimmerBlock height={20} width={70} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: theme.metrics.spacing.md,
    padding: theme.metrics.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.metrics.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  body: {
    flex: 1,
    gap: theme.metrics.spacing.sm,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: theme.metrics.spacing.xs,
  },
});
