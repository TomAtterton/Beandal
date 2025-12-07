import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Icon } from '@/components/Icon';
import { theme } from '@theme';
import { BaseButton } from './BaseButton';

type Props = Omit<React.ComponentProps<typeof BaseButton>, 'children'> & {
  iconName: React.ComponentProps<typeof Icon>['name'];
  iconSize?: number;
  iconColor?: string;
};

export const IconButton = ({
  iconName,
  iconSize = theme.metrics.iconSize.md,
  iconColor = theme.colors.textPrimary,
  style,
  ...buttonProps
}: Props) => {
  return (
    <BaseButton
      {...buttonProps}
      hitSlop={theme.metrics.spacing.sm}
      style={[styles.button, style] as StyleProp<ViewStyle>}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </BaseButton>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: theme.metrics.spacing.sm,
    paddingVertical: theme.metrics.spacing.xs,
    borderRadius: theme.metrics.radius.md,
  },
});
