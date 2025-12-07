import { colors, palette } from './colors';
import { images } from './images';
import { metrics, radius, shadow, spacing } from './metrics';
import { navigationTheme } from './navigation';
import { typography } from './typography';

export const theme = {
  colors,
  palette,
  typography,
  metrics,
  images,
  navigation: navigationTheme,
} as const;

export type Theme = typeof theme;

export { colors, images, metrics, navigationTheme, palette, radius, shadow, spacing, typography };
