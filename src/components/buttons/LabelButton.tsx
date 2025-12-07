import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';
import { BaseButton } from './BaseButton';

type Props = Omit<React.ComponentProps<typeof BaseButton>, 'children'> & {
  translation: React.ComponentProps<typeof TranslatedText>['translation'];
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
};

export const LabelButton = ({
  translation,
  isLoading = false,
  variant = 'primary',
  disabled,
  style,
  ...buttonProps
}: Props) => {
  const buttonStyle = variant === 'primary' ? styles.primary : styles.secondary;
  const labelColorStyle = variant === 'primary' ? styles.labelPrimary : styles.labelSecondary;
  const spinnerColor = variant === 'primary' ? theme.colors.accentOn : theme.colors.textPrimary;

  const isDisabled = disabled || isLoading;

  return (
    <BaseButton disabled={isDisabled} style={[styles.base, buttonStyle, style]} {...buttonProps}>
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : (
          <TranslatedText translation={translation} style={[styles.label, labelColorStyle]} />
        )}
      </View>
    </BaseButton>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.metrics.radius.md,
    paddingVertical: theme.metrics.spacing.md,
    paddingHorizontal: theme.metrics.spacing.lg,
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  secondary: {
    backgroundColor: theme.colors.surface,
  },
  content: {
    minHeight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.typography.variants.bodyStrong.fontSize,
    lineHeight: theme.typography.variants.bodyStrong.lineHeight,
    fontFamily: theme.typography.variants.bodyStrong.fontFamily,
  },
  labelPrimary: {
    color: theme.colors.accentOn,
  },
  labelSecondary: {
    color: theme.colors.textPrimary,
  },
});
