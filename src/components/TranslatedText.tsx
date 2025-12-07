import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';

import { theme } from '@theme';

type Variant = keyof typeof theme.typography.variants;

type TranslationInput =
  | string
  | {
      key: string;
      values?: Record<string, unknown>;
    };

type Props = Omit<TextProps, 'children'> & {
  translation: TranslationInput;
  variant?: Variant;
};

const normalize = (input: TranslationInput) => {
  if (typeof input === 'string') {
    return { key: input, values: undefined };
  }
  return { key: input.key, values: input.values };
};

export const TranslatedText = ({ translation, variant = 'body', style, ...rest }: Props) => {
  const { t } = useTranslation();
  const variantStyle = theme.typography.variants[variant];
  const { key, values } = normalize(translation);

  return (
    <Text style={[{ color: theme.colors.textPrimary }, variantStyle, style]} {...rest}>
      {t(key, values)}
    </Text>
  );
};
