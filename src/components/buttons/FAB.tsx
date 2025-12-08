import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { GlassView } from 'expo-glass-effect';

import { theme } from '@theme';
import { Icon } from '@/components/Icon';
import { BaseButton } from './BaseButton';

type Props = Omit<React.ComponentProps<typeof BaseButton>, 'children'> & {
  iconName?: React.ComponentProps<typeof Icon>['name'];
  iconSize?: number;
  iconColor?: string;
  tintColor?: string;
};

export const FAB = ({
  iconName = 'add',
  iconSize = theme.metrics.iconSize.md,
  iconColor = theme.colors.accentOn,
  tintColor = theme.colors.accent,
  style,
  ...buttonProps
}: Props) => {
  return (
    <BaseButton style={[styles.container, style] as StyleProp<ViewStyle>} {...buttonProps}>
      <View style={styles.contentContainer}>
        <GlassView
          style={styles.glass}
          tintColor={tintColor}
          glassEffectStyle={'clear'}
          isInteractive
        >
          <Icon name={iconName} size={iconSize} color={iconColor} />
        </GlassView>
      </View>
    </BaseButton>
  );
};

const FAB_SIZE = 48;
const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
  contentContainer: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
  },
  glass: {
    flex: 1,
    borderRadius: FAB_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
