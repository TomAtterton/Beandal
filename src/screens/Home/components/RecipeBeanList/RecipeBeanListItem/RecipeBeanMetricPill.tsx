import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/Icon';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

type Props = {
  icon: React.ComponentProps<typeof Icon>['name'];
  label: string;
  value: string;
};

export const RecipeBeanMetricPill = ({ icon, label, value }: Props) => (
  <View style={styles.metric}>
    <Icon name={icon} size={14} color={theme.colors.accent} />
    <TranslatedText variant="caption" style={styles.metricLabel}>
      {`${label} ${value}`}
    </TranslatedText>
  </View>
);

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.xs / 2,
    paddingHorizontal: theme.metrics.spacing.sm,
    paddingVertical: theme.metrics.spacing.xs,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: theme.metrics.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
  },
  metricLabel: {
    color: theme.colors.textPrimary,
    letterSpacing: 0.2,
  },
});
