import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { BaseButton } from '@/components/buttons/BaseButton';
import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

const ROAST_OPTIONS = [
  { value: 'light', labelTranslation: 'form.roastLight' as const },
  { value: 'medium', labelTranslation: 'form.roastMedium' as const },
  { value: 'medium_dark', labelTranslation: 'form.roastMediumDark' as const },
  { value: 'dark', labelTranslation: 'form.roastDark' as const },
] as const;

type RoastLevel = (typeof ROAST_OPTIONS)[number]['value'];

type Props = {
  value?: RoastLevel;
  onChange: (value: RoastLevel) => void;
};

export const RoastLevelPicker = ({ value, onChange }: Props) => {
  const options = useMemo(() => ROAST_OPTIONS, []);

  return (
    <View style={styles.container}>
      <TranslatedText translation="form.roastLevel" variant="h4" style={styles.label} />
      <View style={styles.options}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <BaseButton
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[
                styles.pill,
                {
                  borderColor: isSelected ? theme.colors.accent : theme.colors.subtleBorder,
                  backgroundColor: isSelected ? theme.colors.accent : theme.colors.surface,
                },
              ]}
              accessibilityRole="button"
            >
              <TranslatedText
                translation={option.labelTranslation}
                style={[
                  styles.pillLabel,
                  { color: isSelected ? theme.colors.accentOn : theme.colors.textPrimary },
                ]}
              />
            </BaseButton>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.metrics.spacing.xs,
  },
  label: {
    marginBottom: theme.metrics.spacing.xs,
    fontStyle: 'italic',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.metrics.spacing.xs,
  },
  pill: {
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.xs,
    borderRadius: theme.metrics.radius.pill,
    borderWidth: 1,
  },
  pillLabel: {
    fontSize: theme.typography.size.sm,
  },
});
