import { getLocales } from 'expo-localization';

export const fallbackLng = 'en';

export const getLanguage = (): string | undefined => {
  const locales = getLocales();
  const deviceLocale = locales[0]?.languageCode;
  return deviceLocale || undefined;
};
