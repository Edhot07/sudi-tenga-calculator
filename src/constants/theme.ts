export interface ColorTheme {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceInput: string;
  border: string;
  borderHover: string;
  borderFocus: string;

  text: string;
  textSecondary: string;
  textMuted: string;

  // Accents
  primary: string;
  primaryGradientStart: string;
  primaryGradientEnd: string;
  primaryTint: string;

  success: string;
  successTint: string;
  successBorder: string;

  danger: string;
  dangerTint: string;
  dangerBorder: string;

  accentGold: string;
  accentGoldTint: string;

  badgeBackground: string;
  badgeText: string;
}

export const Colors: { dark: ColorTheme; light: ColorTheme } = {
  dark: {
    background: '#0B0F19',
    surface: '#131B2E',
    surfaceElevated: '#1A243F',
    surfaceInput: '#0E1526',
    border: '#24304F',
    borderHover: '#33436D',
    borderFocus: '#3B82F6',

    text: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',

    // Accents
    primary: '#2563EB',
    primaryGradientStart: '#3B82F6',
    primaryGradientEnd: '#1D4ED8',
    primaryTint: 'rgba(37, 99, 235, 0.15)',

    success: '#10B981',
    successTint: 'rgba(16, 185, 129, 0.12)',
    successBorder: 'rgba(16, 185, 129, 0.3)',

    danger: '#EF4444',
    dangerTint: 'rgba(239, 68, 68, 0.12)',
    dangerBorder: 'rgba(239, 68, 68, 0.3)',

    accentGold: '#F59E0B',
    accentGoldTint: 'rgba(245, 158, 11, 0.15)',

    badgeBackground: '#1E293B',
    badgeText: '#38BDF8',
  },
  light: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#F1F5F9',
    surfaceInput: '#FFFFFF',
    border: '#E2E8F0',
    borderHover: '#CBD5E1',
    borderFocus: '#2563EB',

    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',

    // Accents
    primary: '#2563EB',
    primaryGradientStart: '#3B82F6',
    primaryGradientEnd: '#1D4ED8',
    primaryTint: 'rgba(37, 99, 235, 0.08)',

    success: '#059669',
    successTint: 'rgba(5, 150, 105, 0.1)',
    successBorder: 'rgba(5, 150, 105, 0.25)',

    danger: '#DC2626',
    dangerTint: 'rgba(220, 38, 38, 0.08)',
    dangerBorder: 'rgba(220, 38, 38, 0.25)',

    accentGold: '#D97706',
    accentGoldTint: 'rgba(217, 119, 6, 0.12)',

    badgeBackground: '#E0F2FE',
    badgeText: '#0284C7',
  },
};

// Default theme reference for static / fallback contexts
export const Theme: ColorTheme = Colors.dark;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const BorderRadius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  round: 9999,
} as const;

export const MaxContentWidth = 600;
