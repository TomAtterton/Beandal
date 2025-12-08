import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

import { TranslatedText } from '@/components/TranslatedText';
import { theme } from '@theme';

type FormTextInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  labelTranslation?: React.ComponentProps<typeof TranslatedText>['translation'];
  children?: React.ReactNode;
} & Pick<
  TextInputProps,
  'placeholder' | 'keyboardType' | 'autoCapitalize' | 'multiline' | 'numberOfLines'
>;

export const FormTextInput = <TFieldValues extends FieldValues>({
  name,
  control,
  labelTranslation,
  children,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  multiline,
  numberOfLines,
}: FormTextInputProps<TFieldValues>) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
      const inputValue = value === undefined || value === null ? '' : String(value);

      const hasLabelContent = Boolean(labelTranslation || children);

      return (
        <View style={styles.field}>
          {hasLabelContent && (
            <TranslatedText translation={labelTranslation} variant="h4" style={styles.label}>
              {children}
            </TranslatedText>
          )}
          <TextInput
            value={inputValue}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
            placeholderTextColor={theme.colors.textMuted}
            selectionColor={theme.colors.accent}
            style={[
              styles.input,
              { borderColor: error ? theme.colors.danger : theme.colors.subtleBorder },
            ]}
          />
          {error ? (
            <TranslatedText style={styles.errorText}>
              {(error as FieldError).message}
            </TranslatedText>
          ) : null}
        </View>
      );
    }}
  />
);

const styles = StyleSheet.create({
  field: {
    marginBottom: theme.metrics.spacing.lg,
  },
  label: {
    marginBottom: theme.metrics.spacing.sm,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderRadius: theme.metrics.radius.md,
    paddingHorizontal: theme.metrics.spacing.md,
    paddingVertical: theme.metrics.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: theme.typography.size.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: theme.typography.size.xs,
    lineHeight: theme.typography.lineHeight.xs,
    marginTop: theme.metrics.spacing.xs,
  },
});
