import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TOptions } from 'i18next';

import type en from '@i18n/locales/en.json';
import { theme } from '@theme';

type Variant = keyof typeof theme.typography.variants;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<typeof en>;

type TranslationInput =
  | TranslationKey
  | {
      key: TranslationKey;
      values?: TOptions;
    };

type Props = Omit<TextProps, 'children'> & {
  translation: TranslationInput;
  variant?: Variant;
};

const normalize = (input: TranslationInput): { key: TranslationKey; values?: TOptions } => {
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
