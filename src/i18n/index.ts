import { locale } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { defaultNS, resources } from './resources';
import { fallbackLng, getLanguage } from './utils';
export * from './utils';

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage() || locale || fallbackLng,
  fallbackLng,
  ns: [defaultNS],
  defaultNS,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
