import { Platform } from 'react-native';

/**
 * Paleta do Profe Sr.: fundo escuro estilo editor de código,
 * com o azul do React como cor principal.
 */
export const Colors = {
  background: '#0B1020',
  surface: '#151B2E',
  surfaceRaised: '#1C2440',
  border: '#2A3455',
  text: '#EEF1F8',
  textMuted: '#97A0B8',

  react: '#61DAFB',
  reactDark: '#2BA8CC',

  success: '#3DDC97',
  successDark: '#23A872',
  successBg: '#12352B',

  error: '#FF6B6B',
  errorDark: '#D14848',
  errorBg: '#3A1B24',

  warning: '#FFD166',
  warningDark: '#D9A93A',

  purple: '#B794F6',
  purpleDark: '#8B67D1',

  onAccent: '#0B1020',
} as const;

export const Fonts = {
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  pill: 999,
} as const;

export const MaxContentWidth = 560;
