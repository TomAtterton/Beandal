import { DarkTheme, Theme as NavigationTheme } from '@react-navigation/native';

import { colors } from './colors';

export const navigationTheme: NavigationTheme = {
  ...DarkTheme,
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: colors.accent,
    background: colors.background,
    card: colors.backgroundAlt,
    text: colors.textPrimary,
    border: colors.border,
    notification: colors.accentMuted,
  },
};
