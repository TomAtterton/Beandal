export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  pill: 999,
} as const;

export const shadow = {
  soft: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 6,
  },
} as const;

export const metrics = {
  spacing,
  radius,
  shadow,
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
  },
  touchTarget: 44,
  maxContentWidth: 960,
} as const;

export type Metrics = typeof metrics;
