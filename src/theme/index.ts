import { colors, palette } from './colors';
import { metrics, radius, shadow, spacing } from './metrics';
import { navigationTheme } from './navigation';
import { typography } from './typography';

export const theme = {
  colors,
  palette,
  typography,
  metrics,
  navigation: navigationTheme,
} as const;

export type Theme = typeof theme;

export { colors, metrics, navigationTheme, palette, radius, shadow, spacing, typography };
