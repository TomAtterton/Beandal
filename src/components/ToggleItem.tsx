import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  Switch,
  SwitchProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { BaseButton } from '@/components/buttons';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

type Props = Omit<React.ComponentProps<typeof BaseButton>, 'children' | 'onPress'> & {
  translation: React.ComponentProps<typeof TranslatedText>['translation'];
  descriptionTranslation?: React.ComponentProps<typeof TranslatedText>['translation'];
  value: boolean;
  onValueChange: (nextValue: boolean) => void;
  switchProps?: Omit<SwitchProps, 'value' | 'onValueChange'>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export const ToggleItem = ({
  translation,
  descriptionTranslation,
  value,
  onValueChange,
  switchProps,
  labelStyle,
  descriptionStyle,
  style,
  ...buttonProps
}: Props) => {
  const handleToggle = useCallback(() => {
    onValueChange(!value);
  }, [onValueChange, value]);

  return (
    <BaseButton
      style={[styles.container, style] as StyleProp<ViewStyle>}
      onPress={handleToggle}
      {...buttonProps}
    >
      <View style={styles.textContainer}>
        <TranslatedText translation={translation} style={[styles.label, labelStyle]} />
        {descriptionTranslation ? (
          <TranslatedText
            translation={descriptionTranslation}
            style={[styles.description, descriptionStyle]}
          />
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={value ? theme.colors.accent : theme.colors.textSecondary}
        trackColor={{ false: theme.colors.subtleBorder, true: theme.colors.accentMuted }}
        {...switchProps}
      />
    </BaseButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.elevated,
    padding: theme.metrics.spacing.lg,
    borderRadius: theme.metrics.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.subtleBorder,
    gap: theme.metrics.spacing.md,
  },
  textContainer: {
    flex: 1,
    gap: theme.metrics.spacing.xs,
  },
  label: {
    ...theme.typography.variants.bodyStrong,
  },
  description: {
    ...theme.typography.variants.body,
    color: theme.colors.textSecondary,
  },
});
