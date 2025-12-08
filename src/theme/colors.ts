export const palette = {
  background: {
    primary: '#120F0B',
    secondary: '#1B1713',
    tertiary: '#241F1A',
  },
  gradient: {
    start: '#120F0B',
    end: '#2C1306',
  },
  text: {
    primary: '#E6E2DD',
    secondary: '#C2BDB7',
    tertiary: '#9E9891',
  },
  bean: '#A25F3C',
  accent: '#A25F3C',
  accentMuted: '#7C4A30',
  divider: {
    light: '#2D261F',
    medium: '#3A322A',
    strong: '#4A4037',
  },
  surface: {
    flat: '#1A1613',
    raised: '#231E1A',
    overlay: 'rgba(18,15,11,0.6)',
  },
  border: '#2F271F',
  status: {
    success: '#4C9A6A',
    successMuted: '#365E46',
    error: '#D1604D',
    errorMuted: '#8F3F32',
    warning: '#E3A04F',
    warningMuted: '#A87339',
    danger: '#B3362E',
    dangerMuted: '#7F2522',
  },
} as const;

export const colors = {
  background: palette.background.primary,
  backgroundAlt: palette.background.secondary,
  surface: palette.surface.flat,
  elevated: palette.surface.raised,
  overlay: palette.surface.overlay,
  border: palette.border,
  subtleBorder: palette.divider.light,
  strongBorder: palette.divider.strong,
  textPrimary: palette.text.primary,
  textSecondary: palette.text.secondary,
  textMuted: palette.text.tertiary,
  accent: palette.accent,
  accentMuted: palette.accentMuted,
  accentOn: palette.text.primary,
  bean: palette.bean,
  success: palette.status.success,
  successMuted: palette.status.successMuted,
  warning: palette.status.warning,
  warningMuted: palette.status.warningMuted,
  danger: palette.status.danger,
  dangerMuted: palette.status.dangerMuted,
  gradient: palette.gradient,
} as const;

export type Palette = typeof palette;
export type Colors = typeof colors;
