const systemFont = 'System';

const family = {
  regular: systemFont,
  medium: systemFont,
  semibold: systemFont,
  bold: systemFont,
};

const size = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  display: 32,
} as const;

const lineHeight = {
  xs: 16,
  sm: 20,
  md: 22,
  lg: 26,
  xl: 32,
  display: 40,
} as const;

const letterSpacing = {
  tight: -0.2,
  normal: 0,
  wide: 0.2,
} as const;

export const typography = {
  family,
  size,
  lineHeight,
  letterSpacing,
  variants: {
    h1: {
      fontSize: size.display,
      lineHeight: lineHeight.display,
      fontFamily: family.bold,
      letterSpacing: letterSpacing.tight,
    },
    h2: {
      fontSize: size.xl,
      lineHeight: lineHeight.xl,
      fontFamily: family.semibold,
      letterSpacing: letterSpacing.tight,
    },
    h3: {
      fontSize: size.lg,
      lineHeight: lineHeight.lg,
      fontFamily: family.semibold,
    },
    h4: {
      fontSize: size.md,
      lineHeight: lineHeight.md,
      fontFamily: family.semibold,
    },
    subtitle: {
      fontSize: size.md,
      lineHeight: lineHeight.lg,
      fontFamily: family.medium,
      letterSpacing: letterSpacing.normal,
    },
    body: {
      fontSize: size.md,
      lineHeight: lineHeight.md,
      fontFamily: family.regular,
    },
    bodyStrong: {
      fontSize: size.md,
      lineHeight: lineHeight.md,
      fontFamily: family.semibold,
    },
    caption: {
      fontSize: size.sm,
      lineHeight: lineHeight.sm,
      fontFamily: family.regular,
      letterSpacing: letterSpacing.wide,
    },
  },
} as const;

export type Typography = typeof typography;
