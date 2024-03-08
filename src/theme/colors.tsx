import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }

  interface SimplePaletteColorOptions {
    lightest: string;
    darker: string;
  }

  interface PaletteColor {
    lightest: string;
    darker: string;
  }
}

const withAlphas = (color: {
  lightest?: string;
  light?: string;
  main: any;
  dark?: string;
  darkest?: string;
  contrastText?: string;
}) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  50: '#F8F9FA',
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D2D6DB',
  400: '#9DA4AE',
  500: '#6C737F',
  600: '#4D5761',
  700: '#2F3746',
  800: '#1C2536',
  900: '#111927',
};

export const indigo = withAlphas({
  lightest: '#EDECFF',
  light: '#ced0e9',
  main: '#9EA1D4',
  dark: '#5E63AA',
  darkest: '#38394C',
  contrastText: '#FFFFFF',
});

export const secondary = withAlphas({
  lightest: '#C9E4DE',
  light: '#A8D1D1',
  main: '#76B7B7',
  dark: '#528080',
  darkest: '#4d9393',
  contrastText: '#FFFFFF',
});

export const success = withAlphas({
  lightest: '#C9E4DE',
  light: '#A8D1D1',
  main: '#76B7B7',
  dark: '#528080',
  darkest: '#4d9393',
  contrastText: '#FFFFFF',
});

export const info = withAlphas({
  lightest: '#ECFDFF',
  light: '#CFF9FE',
  main: '#06AED4',
  dark: '#0E7090',
  darkest: '#164C63',
  contrastText: '#FFFFFF',
});

export const warning = withAlphas({
  lightest: '#FFFAEB',
  light: '#FEF0C7',
  main: '#FEC868',
  dark: '#fdac1c',
  darkest: '#e49302',
  contrastText: '#FFFFFF',
});

export const error = withAlphas({
  lightest: '#FEF3F2',
  light: '#FEE4E2',
  main: '#FD8A8A',
  dark: '#B42318',
  darkest: '#7A271A',
  contrastText: '#FFFFFF',
});
