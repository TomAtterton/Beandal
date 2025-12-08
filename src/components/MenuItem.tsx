import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { BaseButton } from '@/components/buttons';
import { Icon } from '@/components/Icon';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

type Props = Omit<React.ComponentProps<typeof BaseButton>, 'children'> & {
  translation: React.ComponentProps<typeof TranslatedText>['translation'];
  descriptionTranslation?: React.ComponentProps<typeof TranslatedText>['translation'];
  rightIconName?: React.ComponentProps<typeof Icon>['name'] | null;
  rightIconColor?: string;
  rightComponent?: React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export const MenuItem = ({
  translation,
  descriptionTranslation,
  rightIconName = 'chevron-forward',
  rightIconColor = theme.colors.textSecondary,
  rightComponent,
  labelStyle,
  descriptionStyle,
  style,
  ...buttonProps
}: Props) => {
  return (
    <BaseButton style={[styles.container, style] as StyleProp<ViewStyle>} {...buttonProps}>
      <View style={styles.textContainer}>
        <TranslatedText translation={translation} style={[styles.label, labelStyle]} />
        {descriptionTranslation ? (
          <TranslatedText
            translation={descriptionTranslation}
            style={[styles.description, descriptionStyle]}
          />
        ) : null}
      </View>
      {rightComponent ??
        (rightIconName ? (
          <Icon name={rightIconName} size={theme.metrics.iconSize.md} color={rightIconColor} />
        ) : null)}
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
